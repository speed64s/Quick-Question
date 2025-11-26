import React, { useState } from 'react';
import { Language, QuizQuestion, UserAnswer } from '../types';

interface Props {
  questions: QuizQuestion[];
  lang: Language;
  onComplete: (answers: UserAnswer[]) => void;
}

export const QuizScreen: React.FC<Props> = ({ questions, lang, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);

  const handleOptionClick = (optionId: string, optionText: string, score: number) => {
    const currentQuestion = questions[currentIndex];
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      selectedOptionId: optionId,
      selectedOptionText: optionText,
      score: score
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 250); // Small delay for visual feedback
    } else {
      onComplete(newAnswers);
    }
  };

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto w-full p-6 animate-in slide-in-from-bottom-10 duration-500">
      {/* Progress Bar */}
      <div className="w-full h-6 border-4 border-black rounded-full mb-8 bg-white relative overflow-hidden">
        <div 
          className="h-full bg-green-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="mb-4 text-right font-bold text-gray-500">
        {lang === 'vi' ? 'Câu hỏi' : 'Question'} {currentIndex + 1} / {questions.length}
      </div>

      {/* Question Card */}
      <div className="bg-white border-4 border-black p-8 rounded-xl pop-shadow mb-8 relative">
        <div className="absolute -top-5 -left-5 bg-purple-500 text-white font-black text-xl w-12 h-12 flex items-center justify-center rounded-full border-4 border-black">
          {currentIndex + 1}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold leading-tight text-gray-900">
          {currentQ.text}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {currentQ.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option.id, option.text, option.score)}
            className="w-full text-left p-4 md:p-6 text-lg md:text-xl font-semibold bg-white border-4 border-black rounded-lg transition-all hover:bg-yellow-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};