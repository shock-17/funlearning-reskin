import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Character } from '../components/Character';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';

export function ProfileSelectionPage() {
  const navigate = useNavigate();
  const { user, selectKidProfile } = useAuth();

  if (!user) return null;

  const handleSelectProfile = (profileId: string) => {
    selectKidProfile(profileId);
    navigate('/subjects');
  };

  const pastelColors = ['bg-[#97aaf6]', 'bg-[#bbf697]', 'bg-[#fed878]', 'bg-[#6ef8fb]'];

  return (
    <div className="min-h-[100svh] bg-[#f7f7f5] flex items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#000000] mb-3 tracking-tight">
          Who's Playing?
        </h1>
        <p className="text-lg text-[#666662] mb-12">
          Select your explorer profile to resume adventures
        </p>

        {user.kidProfiles.length === 0 ? (
          <div className="bg-[#ffffff] rounded-2xl p-12 max-w-md mx-auto border border-[#ebebe8] mb-8">
            <p className="text-lg text-[#666662] mb-6">
              No profiles created yet. Let's create your first player!
            </p>
            <Button onClick={() => navigate('/kid-profiles')} variant="primary" size="medium">
              Create a Player Profile
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {user.kidProfiles.map((profile, index) => {
              const colorBg = pastelColors[index % pastelColors.length];
              return (
                <button
                  key={profile.id}
                  onClick={() => handleSelectProfile(profile.id)}
                  className={`${colorBg} rounded-2xl p-6 transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-black text-center`}
                >
                  <Character type={profile.avatar} className="w-28 h-28 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-[#000000]">
                    {profile.name}
                  </h2>
                </button>
              );
            })}
          </div>
        )}

        <div>
          <Button onClick={() => navigate('/kid-profiles')} size="small" variant="secondary">
            Manage Profiles & Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
