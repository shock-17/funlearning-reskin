import React, { useEffect, useState, createContext, useContext } from 'react';

export type KidProfile = {
  id: string;
  name: string;
  avatar: 'fox' | 'bear' | 'rabbit' | 'owl' | 'turtle';
  scores: {
    id: string;
    subject: string;
    difficulty: string;
    score: number;
    date: string;
  }[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'child';
  kidProfiles: KidProfile[];
  activeKidProfile?: KidProfile;
};

type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: 'parent' | 'child';
  kidProfiles: KidProfile[];
  activeKidProfile?: KidProfile;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearDeviceData: () => void;
  addKidProfile: (name: string, avatar: KidProfile['avatar']) => void;
  deleteKidProfile: (profileId: string) => void;
  updateKidProfile: (profileId: string, name: string, avatar: KidProfile['avatar']) => void;
  selectKidProfile: (profileId: string) => void;
  updateKidScore: (subject: string, difficulty: string, score: number) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const USERS_STORAGE_KEY = 'registeredUsers';

// Helper: Securely hash a password with a cryptographic salt using Web Crypto SHA-256
async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(`${salt}:${password}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // taste-skill-ignore
}

// Helper: Generate a cryptographically random salt
function generateSalt(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(''); // taste-skill-ignore
}

// Helper: Generate cryptographically random ID
function generateSecureId(prefix = ''): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    const raw = crypto.randomUUID().replace(/-/g, '').substring(0, 10);
    return prefix ? `${prefix}_${raw}` : raw;
  }
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  const raw = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(''); // taste-skill-ignore
  return prefix ? `${prefix}_${raw}` : raw;
}

export function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUserStr = localStorage.getItem('user');
      if (savedUserStr) {
        const parsed = JSON.parse(savedUserStr);
        // Validate user object structure
        if (
          parsed &&
          typeof parsed === 'object' &&
          typeof parsed.id === 'string' &&
          typeof parsed.email === 'string' &&
          (parsed.role === 'parent' || parsed.role === 'child') &&
          Array.isArray(parsed.kidProfiles)
        ) {
          // Verify that this user ID and email exist in registered users list
          const registeredUsers: any[] = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
          const exists = registeredUsers.some(u => u.id === parsed.id && u.email === parsed.email);
          if (exists) {
            // Strip any sensitive properties if present
            const { password: _p, passwordHash: _ph, salt: _s, ...cleanUser } = parsed;
            setUser(cleanUser as User);
          } else {
            // Inconsistent or injected state; clean up
            localStorage.removeItem('user');
          }
        } else {
          localStorage.removeItem('user');
        }
      }
    } catch {
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const registeredUsers: any[] = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const foundUserIndex = registeredUsers.findIndex(u => u.email === email);
    if (foundUserIndex === -1) {
      throw new Error('Invalid email or password');
    }

    const candidate = registeredUsers[foundUserIndex];
    let isValid = false;

    if (candidate.passwordHash && candidate.salt) {
      const computedHash = await hashPassword(password, candidate.salt);
      isValid = computedHash === candidate.passwordHash;
    } else if (candidate.password) {
      // Automatic transparent migration for legacy entries stored in cleartext
      isValid = candidate.password === password;
      if (isValid) {
        const newSalt = generateSalt();
        candidate.salt = newSalt;
        candidate.passwordHash = await hashPassword(password, newSalt);
        delete candidate.password;
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(registeredUsers));
      }
    }

    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    // Clean session user without password or hash
    const cleanUser: User = {
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      role: candidate.role || 'parent',
      kidProfiles: candidate.kidProfiles || [],
      activeKidProfile: candidate.activeKidProfile
    };

    setUser(cleanUser);
    localStorage.setItem('user', JSON.stringify(cleanUser));
  };

  const register = async (name: string, email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const registeredUsers: any[] = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    if (registeredUsers.some(u => u.email === email)) {
      throw new Error('Email already registered');
    }

    const salt = generateSalt();
    const passwordHash = await hashPassword(password, salt);

    const storedUser: StoredUser = {
      id: generateSecureId('usr'),
      name,
      email,
      passwordHash,
      salt,
      role: 'parent',
      kidProfiles: []
    };

    const updatedUsers = [...registeredUsers, storedUser];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

    // Active session does not retain credentials
    const cleanUser: User = {
      id: storedUser.id,
      name: storedUser.name,
      email: storedUser.email,
      role: storedUser.role,
      kidProfiles: storedUser.kidProfiles
    };

    setUser(cleanUser);
    localStorage.setItem('user', JSON.stringify(cleanUser));
  };

  const addKidProfile = (name: string, avatar: KidProfile['avatar']) => {
    if (!user) return;
    const newProfile: KidProfile = {
      id: generateSecureId('kid'),
      name,
      avatar,
      scores: []
    };
    const updatedUser: User = {
      ...user,
      kidProfiles: [...user.kidProfiles, newProfile]
    };
    updateUserState(updatedUser);
  };

  const updateKidProfile = (profileId: string, name: string, avatar: KidProfile['avatar']) => {
    if (!user) return;
    const profileIndex = user.kidProfiles.findIndex(profile => profile.id === profileId);
    if (profileIndex === -1) return;

    const updatedProfiles = JSON.parse(JSON.stringify(user.kidProfiles));
    updatedProfiles[profileIndex].name = name;
    updatedProfiles[profileIndex].avatar = avatar;

    const isActiveProfile = user.activeKidProfile?.id === profileId;
    const updatedUser: User = {
      ...user,
      kidProfiles: updatedProfiles,
      activeKidProfile: isActiveProfile ? {
        ...user.activeKidProfile!,
        name,
        avatar
      } : user.activeKidProfile
    };
    updateUserState(updatedUser);
  };

  const deleteKidProfile = (profileId: string) => {
    if (!user) return;
    const isActiveProfile = user.activeKidProfile?.id === profileId;
    const updatedProfiles = user.kidProfiles.filter(profile => profile.id !== profileId);
    const updatedUser: User = {
      ...user,
      kidProfiles: updatedProfiles,
      activeKidProfile: isActiveProfile ? undefined : user.activeKidProfile
    };
    updateUserState(updatedUser);
  };

  const selectKidProfile = (profileId: string) => {
    if (!user) return;
    const profile = user.kidProfiles.find(p => p.id === profileId);
    if (!profile) return;
    const profileCopy = JSON.parse(JSON.stringify(profile));
    const updatedUser: User = {
      ...user,
      activeKidProfile: profileCopy
    };
    updateUserState(updatedUser);
  };

  const updateKidScore = (subject: string, difficulty: string, score: number) => {
    if (!user?.activeKidProfile) return;
    const newScore = {
      id: generateSecureId('score'),
      subject,
      difficulty,
      score,
      date: new Date().toISOString()
    };

    const activeProfileId = user.activeKidProfile.id;
    const activeProfileIndex = user.kidProfiles.findIndex(p => p.id === activeProfileId);
    if (activeProfileIndex === -1) return;

    const updatedProfiles = JSON.parse(JSON.stringify(user.kidProfiles));
    if (!updatedProfiles[activeProfileIndex].scores) {
      updatedProfiles[activeProfileIndex].scores = [];
    }
    updatedProfiles[activeProfileIndex].scores.push(newScore);

    const updatedActiveProfile = JSON.parse(JSON.stringify(updatedProfiles[activeProfileIndex]));
    const updatedUser: User = {
      ...user,
      kidProfiles: updatedProfiles,
      activeKidProfile: updatedActiveProfile
    };
    updateUserState(updatedUser);
  };

  // Helper function to update user in state and localStorage cleanly
  const updateUserState = (updatedUser: User) => {
    const { password: _p, passwordHash: _ph, salt: _s, ...cleanUser } = updatedUser as any;
    setUser(cleanUser);
    localStorage.setItem('user', JSON.stringify(cleanUser));

    const registeredUsers: any[] = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const updatedUsers = registeredUsers.map((u: any) => {
      if (u.id === cleanUser.id) {
        return {
          ...u,
          name: cleanUser.name,
          email: cleanUser.email,
          role: cleanUser.role,
          kidProfiles: cleanUser.kidProfiles,
          activeKidProfile: cleanUser.activeKidProfile
        };
      }
      return u;
    });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Device data reset helper for shared family or classroom tablets
  const clearDeviceData = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem(USERS_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        clearDeviceData,
        addKidProfile,
        deleteKidProfile,
        updateKidProfile,
        selectKidProfile,
        updateKidScore
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
