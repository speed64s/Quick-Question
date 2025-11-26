import React, { useEffect, useState } from 'react';
import { Language } from '../types';

interface Props {
  lang: Language;
  mode: 'generating' | 'analyzing';
}

export const LoadingOverlay: React.FC<Props> = ({ lang, mode }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const messages = {
    en: {
      generating: [
        "Consulting the meme gods",
        "Cooking up weird questions",
        "Distilling pure chaos",
        "Loading sense of humor"
      ],
      analyzing: [
        "Judging your life choices",
        "Calculating your cringe level",
        "Reading your aura (it's weird)",
        "Consulting the stars"
      ]
    },
    vi: {
      generating: [
        "Đang triệu hồi thánh lầy",
        "Đang nấu bánh chưng nhân 'bựa'",
        "Đang tải dữ liệu tấu hài",
        "Đang suy nghĩ câu hỏi hóc búa"
      ],
      analyzing: [
        "Đang phán xét nhân phẩm",
        "Đang soi mói quá khứ của bạn",
        "Đang chấm điểm độ mặn",
        "Chờ xíu, ca này hơi khó"
      ]
    }
  };

  const currentMessages = messages[lang][mode];
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % currentMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [currentMessages.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <div className="w-24 h-24 mb-8 border-8 border-black border-t-purple-500 rounded-full animate-spin"></div>
      <h3 className="text-3xl font-bold bg-white border-2 border-black px-6 py-3 pop-shadow-sm">
        {currentMessages[msgIndex]}{dots}
      </h3>
    </div>
  );
};