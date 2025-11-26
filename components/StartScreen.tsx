import React from 'react';
import { Language } from '../types';
import { User } from 'lucide-react';

interface Props {
  lang: Language;
  onStart: () => void;
  onOpenProfile: () => void;
}

export const StartScreen: React.FC<Props> = ({ lang, onStart, onOpenProfile }) => {
  const content = {
    en: {
      title: "Quirky Persona",
      subtitle: "Discover your true, slightly weird self.",
      description: "Answer 5 absolutely ridiculous questions and let our trolling AI judge your soul. Are you ready to be roasted?",
      button: "Let's Go!",
      profile: "My Profile"
    },
    vi: {
      title: "Tính Cách Lầy Lội",
      subtitle: "Khám phá con người thật (và hơi dị) của bạn.",
      description: "Trả lời 5 câu hỏi ngớ ngẩn và để AI 'thánh phán' soi mói tâm hồn bạn. Bạn đã sẵn sàng bị cà khịa chưa?",
      button: "Chơi Luôn!",
      profile: "Hồ Sơ Của Tui"
    }
  };

  const t = content[lang];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center animate-in fade-in zoom-in duration-500 relative">
      <button 
        onClick={onOpenProfile}
        className="absolute top-0 left-4 md:left-8 flex items-center gap-2 bg-white border-2 border-black px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors pop-shadow-sm"
      >
        <User size={20} />
        {t.profile}
      </button>

      <div className="mb-8 relative mt-12 md:mt-0">
        <div className="absolute -top-10 -right-10 text-6xl animate-bounce delay-700">🤪</div>
        <div className="absolute -bottom-5 -left-10 text-6xl animate-bounce">🔮</div>
        <h1 className="text-6xl md:text-8xl font-black text-purple-600 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] tracking-tighter">
          {t.title}
        </h1>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-white border-2 border-black px-4 py-2 rotate-2 pop-shadow-sm">
        {t.subtitle}
      </h2>
      
      <p className="max-w-md text-xl font-medium mb-12 text-gray-700 leading-relaxed">
        {t.description}
      </p>

      <button
        onClick={onStart}
        className="text-2xl font-black bg-yellow-400 px-12 py-6 rounded-2xl border-4 border-black pop-shadow hover:translate-y-1 hover:shadow-none transition-all active:translate-y-2"
      >
        {t.button}
      </button>
    </div>
  );
};