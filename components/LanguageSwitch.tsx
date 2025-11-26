import React from 'react';
import { Language } from '../types';

interface Props {
  currentLang: Language;
  onToggle: (lang: Language) => void;
}

export const LanguageSwitch: React.FC<Props> = ({ currentLang, onToggle }) => {
  return (
    <div className="absolute top-4 right-4 z-50 flex gap-2">
      <button
        onClick={() => onToggle('en')}
        className={`px-3 py-1 font-bold rounded-lg border-2 border-black transition-all ${
          currentLang === 'en' 
            ? 'bg-purple-500 text-white pop-shadow-sm' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onToggle('vi')}
        className={`px-3 py-1 font-bold rounded-lg border-2 border-black transition-all ${
          currentLang === 'vi' 
            ? 'bg-red-500 text-white pop-shadow-sm' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        VN
      </button>
    </div>
  );
};