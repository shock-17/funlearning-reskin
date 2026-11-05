import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Character } from '../components/Character';
import { ScoreGraph } from '../components/ScoreGraph';
import { useAuth } from '../context/AuthContext';
import { LogOutIcon, EditIcon, TrashIcon, PlayIcon, BarChart2Icon, ListIcon } from 'lucide-react';

type ScoreEntry = {
  playerName: string;
  profileId: string;
  scoreId: string;
  subject: string;
  difficulty: string;
  score: number;
  date: string;
};

export function KidProfilesPage() {
  const navigate = useNavigate();
  const {
    user,
    addKidProfile,
    logout,
    selectKidProfile,
    deleteKidProfile,
    updateKidProfile,
    clearDeviceData
  } = useAuth();

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<Character['type']>('fox');
  const [viewMode, setViewMode] = useState<'table' | 'graph'>('graph');
  const avatarOptions: Character['type'][] = ['fox', 'bear', 'rabbit', 'owl', 'turtle'];

  const scoreEntries = useMemo(() => {
    if (!user || !user.kidProfiles.length) return [];
    const entries: ScoreEntry[] = [];
    user.kidProfiles.forEach(profile => {
      if (!profile.scores || !profile.scores.length) return;
      profile.scores.forEach(score => {
        entries.push({
          playerName: profile.name,
          profileId: profile.id,
          scoreId: score.id || `${profile.id}-${score.date}`,
          subject: score.subject,
          difficulty: score.difficulty,
          score: score.score,
          date: score.date
        });
      });
    });
    return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [user]);

  const handleAddProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addKidProfile(newName.trim(), selectedAvatar);
    setIsAdding(false);
    setNewName('');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleStartGame = (profileId: string) => {
    selectKidProfile(profileId);
    navigate('/subjects');
  };

  const handleEditProfile = (profileId: string) => {
    setIsEditing(profileId);
    const profile = user?.kidProfiles.find(p => p.id === profileId);
    if (profile) {
      setNewName(profile.name);
      setSelectedAvatar(profile.avatar);
    }
  };

  const handleUpdateProfile = (profileId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    updateKidProfile(profileId, newName.trim(), selectedAvatar);
    setIsEditing(null);
  };

  const handleDeleteProfile = (profileId: string) => {
    deleteKidProfile(profileId);
    setShowDeleteConfirm(null);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'table' ? 'graph' : 'table');
  };

  if (!user) return null;

  const pastelColors = ['bg-[#97aaf6]', 'bg-[#bbf697]', 'bg-[#fed878]', 'bg-[#6ef8fb]'];

  return (
    <div className="min-h-[100svh] bg-[#f7f7f5] p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#000000] tracking-tight">
              Parent Dashboard
            </h1>
            <p className="text-[#666662] text-sm mt-1">
              Signed in as {user.name} ({user.email})
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => navigate('/profile-selection')} size="small" variant="primary">
              Play Game
            </Button>
            <Button onClick={handleLogout} size="small" variant="secondary" className="flex items-center">
              <LogOutIcon size={16} className="mr-1.5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Section Heading */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#000000] tracking-tight">
            Learner Profiles
          </h2>
          {user.kidProfiles.length < 5 && !isAdding && (
            <Button onClick={() => setIsAdding(true)} size="small" variant="secondary">
              + Add Player
            </Button>
          )}
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {user.kidProfiles.map((profile, index) => {
            const cardBg = pastelColors[index % pastelColors.length];
            return (
              <div
                key={profile.id}
                className={`${cardBg} rounded-2xl p-6 relative flex flex-col items-center justify-between min-h-[220px]`}
              >
                <Character type={profile.avatar} className="w-20 h-20 mb-3" />
                <h3 className="text-xl font-bold text-center text-[#000000] mb-4">
                  {profile.name}
                </h3>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleStartGame(profile.id)}
                    className="bg-[#000000] hover:bg-[#222222] text-[#ffffff] p-2.5 rounded-full transition-transform duration-150 hover:scale-105"
                    title="Start Game"
                  >
                    <PlayIcon size={16} />
                  </button>
                  <button
                    onClick={() => handleEditProfile(profile.id)}
                    className="bg-[#ffffff] hover:bg-[#f0f0f0] text-[#000000] p-2.5 rounded-full transition-transform duration-150 hover:scale-105"
                    title="Edit Profile"
                  >
                    <EditIcon size={16} />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(profile.id)}
                    className="bg-[#d0106f] hover:bg-[#b50d5e] text-[#ffffff] p-2.5 rounded-full transition-transform duration-150 hover:scale-105"
                    title="Delete Profile"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>

                {showDeleteConfirm === profile.id && (
                  <div className="absolute inset-0 bg-[#ffffff] rounded-2xl flex flex-col items-center justify-center p-4 z-10 border border-[#ebebe8]">
                    <p className="text-[#d0106f] font-bold text-sm text-center mb-3">
                      Delete profile for {profile.name}?
                    </p>
                    <div className="flex gap-2">
                      <Button size="small" variant="danger" onClick={() => handleDeleteProfile(profile.id)}>
                        Delete
                      </Button>
                      <Button size="small" variant="secondary" onClick={() => setShowDeleteConfirm(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {user.kidProfiles.length === 0 && !isAdding && (
            <div className="col-span-full p-8 text-center bg-[#ffffff] rounded-2xl border border-[#ebebe8]">
              <p className="text-base text-[#666662] mb-4">
                No profiles created yet. Add a learner to begin trackable educational games.
              </p>
              <Button onClick={() => setIsAdding(true)} size="medium" variant="primary">
                Create First Profile
              </Button>
            </div>
          )}
        </div>

        {/* Add Profile Modal */}
        {isAdding && (
          <div className="bg-[#ffffff] rounded-2xl p-6 md:p-8 border border-[#ebebe8] max-w-md mx-auto mb-12">
            <h2 className="text-2xl font-bold text-[#000000] mb-6 text-center">
              Create Learner Profile
            </h2>
            <form onSubmit={handleAddProfile} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2" htmlFor="name">
                  Child Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f7f7f5] border border-[#ebebe8] rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#000000] mb-2">
                  Choose Animal Companion
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {avatarOptions.map(avatar => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`p-2 rounded-xl transition-transform duration-150 ${selectedAvatar === avatar ? 'bg-[#97aaf6] ring-2 ring-black' : 'bg-[#f7f7f5] hover:bg-[#ebebe8]'}`}
                    >
                      <Character type={avatar} className="w-10 h-10" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="secondary" className="w-full" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="w-full">
                  Create Profile
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Edit Profile Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-[#000000] bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-[#ffffff] rounded-2xl p-6 md:p-8 max-w-md w-full border border-[#ebebe8]">
              <h2 className="text-2xl font-bold text-[#000000] mb-6 text-center">
                Edit Learner Profile
              </h2>
              <form onSubmit={e => handleUpdateProfile(isEditing, e)} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2" htmlFor="editName">
                    Child Name
                  </label>
                  <input
                    id="editName"
                    type="text"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f7f7f5] border border-[#ebebe8] rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#000000] mb-2">
                    Choose Animal Companion
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {avatarOptions.map(avatar => (
                      <button
                        key={avatar}
                        type="button"
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`p-2 rounded-xl transition-transform duration-150 ${selectedAvatar === avatar ? 'bg-[#97aaf6] ring-2 ring-black' : 'bg-[#f7f7f5] hover:bg-[#ebebe8]'}`}
                      >
                        <Character type={avatar} className="w-10 h-10" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="secondary" className="w-full" onClick={() => setIsEditing(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="w-full">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Progress Tracking Section */}
        <div className="mt-14">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#000000] tracking-tight">
              Progress Tracking
            </h2>
            <button
              onClick={toggleViewMode}
              className="flex items-center gap-2 bg-[#ebebe8] hover:bg-[#deded9] text-[#000000] px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              {viewMode === 'table' ? (
                <>
                  <BarChart2Icon size={16} />
                  <span>Graph View</span>
                </>
              ) : (
                <>
                  <ListIcon size={16} />
                  <span>Table View</span>
                </>
              )}
            </button>
          </div>

          {viewMode === 'graph' ? (
            <ScoreGraph scores={scoreEntries} />
          ) : (
            <div className="bg-[#ffffff] rounded-2xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#ebebe8]">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-[#000000]">Player</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#000000]">Subject</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#000000]">Difficulty</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#000000]">Score</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#000000]">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {scoreEntries.length > 0 ? (
                    scoreEntries.slice(0, 50).map(scoreEntry => (
                      <tr key={scoreEntry.scoreId} className="even:bg-[#f7f7f5] hover:bg-[#efefe9]">
                        <td className="px-6 py-4 text-sm font-medium text-[#000000]">{scoreEntry.playerName}</td>
                        <td className="px-6 py-4 text-sm text-[#000000] capitalize">{scoreEntry.subject}</td>
                        <td className="px-6 py-4 text-sm text-[#000000] capitalize">{scoreEntry.difficulty}</td>
                        <td className="px-6 py-4 text-sm font-bold text-[#000000]">{scoreEntry.score} / 10</td>
                        <td className="px-6 py-4 text-sm text-[#666662]">{new Date(scoreEntry.date).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-sm text-[#666662] text-center">
                        {user.kidProfiles.length === 0
                          ? 'No profiles created yet. Add a profile above to get started.'
                          : 'No scores recorded yet. Play a game to record scores.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
