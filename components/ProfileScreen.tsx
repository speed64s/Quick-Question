import React, { useState } from 'react';
import { HistoryItem, Language, UserProfile } from '../types';
import { ArrowLeft, Trash2, User, Trophy, Calendar } from 'lucide-react';

interface Props {
  profile: UserProfile;
  lang: Language;
  onUpdateName: (name: string) => void;
  onClearHistory: () => void;
  onBack: () => void;
}

export const ProfileScreen: React.FC<Props> = ({ profile, lang, onUpdateName, onClearHistory, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(profile.name);

  const handleSaveName = () => {
    onUpdateName(tempName);
    setIsEditing(false);
  };

  const getScoreColor = (score: number, max: number) => {
    const pct = (score / max) * 100;
    if (pct < 30) return 'text-blue-500';
    if (pct < 70) return 'text-yellow-600';
    return 'text-red-500';
  };

  // Calculate Average Quirk Score
  const totalGames = profile.history.length;
  const avgScore = totalGames > 0 
    ? Math.round(profile.history.reduce((acc, curr) => acc + ((curr.result.totalScore / curr.result.maxPossibleScore) * 100), 0) / totalGames)
    : 0;

  return (
    <div className="max-w-2xl mx-auto w-full p-6 animate-in slide-in-from-right duration-500">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 font-bold text-gray-700 hover:text-black transition-colors"
      >
        <ArrowLeft size={24} />
        {lang === 'vi' ? 'Quay lại' : 'Back'}
      </button>

      {/* Profile Card */}
      <div className="bg-white border-4 border-black p-6 rounded-2xl pop-shadow mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-200 rounded-bl-full -mr-4 -mt-4 z-0"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-purple-100 rounded-full border-4 border-black flex items-center justify-center text-4xl">
             {profile.avatar || '👤'}
          </div>
          
          <div className="flex-grow text-center md:text-left">
            {isEditing ? (
              <div className="flex gap-2 justify-center md:justify-start">
                <input 
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="border-2 border-black px-2 py-1 rounded text-xl font-bold w-40"
                  autoFocus
                />
                <button onClick={handleSaveName} className="bg-green-400 border-2 border-black px-3 rounded font-bold hover:bg-green-300">✓</button>
              </div>
            ) : (
              <h2 onClick={() => setIsEditing(true)} className="text-3xl font-black cursor-pointer hover:underline decoration-wavy decoration-purple-500">
                {profile.name || (lang === 'vi' ? 'Người Chơi' : 'Player')} ✏️
              </h2>
            )}
            <p className="text-gray-600 font-medium mt-1">
              {lang === 'vi' ? 'Cấp độ Lầy Lội:' : 'Quirk Level:'} <span className="font-bold text-purple-600">{avgScore}%</span>
            </p>
          </div>

          <div className="text-center bg-gray-100 p-3 rounded-xl border-2 border-gray-300">
            <div className="text-sm font-bold text-gray-500 uppercase">{lang === 'vi' ? 'Lượt chơi' : 'Games'}</div>
            <div className="text-2xl font-black">{totalGames}</div>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <HistoryIcon />
          {lang === 'vi' ? 'Lịch Sử Đấu' : 'Match History'}
        </h3>
        {profile.history.length > 0 && (
          <button onClick={onClearHistory} className="text-red-500 font-bold hover:underline flex items-center gap-1 text-sm">
            <Trash2 size={16} /> {lang === 'vi' ? 'Xóa' : 'Clear'}
          </button>
        )}
      </div>

      <div className="space-y-4">
        {profile.history.length === 0 ? (
          <div className="text-center py-10 text-gray-500 italic border-2 border-dashed border-gray-300 rounded-xl">
            {lang === 'vi' ? 'Chưa chơi ván nào. Sợ à?' : 'No games played yet. Scared?'}
          </div>
        ) : (
          [...profile.history].reverse().map((item) => (
            <div key={item.id} className="bg-white border-2 border-black rounded-xl p-4 hover:translate-x-1 transition-transform cursor-default">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-lg">{item.result.title} {item.result.spiritEmoji}</h4>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(item.timestamp).toLocaleDateString()}
                  </div>
                </div>
                <div className={`font-black text-xl ${getScoreColor(item.result.totalScore, item.result.maxPossibleScore)}`}>
                   {Math.round((item.result.totalScore / item.result.maxPossibleScore) * 100)}pts
                </div>
              </div>
              <p className="text-sm text-gray-600 italic line-clamp-2">"{item.result.roast}"</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const HistoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
    <path d="M3 3v5h5"/>
    <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/>
    <path d="M12 7v5l4 2"/>
  </svg>
);
