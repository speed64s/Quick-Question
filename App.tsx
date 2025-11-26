import React, { useState, useEffect } from 'react';
import { LanguageSwitch } from './components/LanguageSwitch';
import { StartScreen } from './components/StartScreen';
import { LoadingOverlay } from './components/LoadingOverlay';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AppState, HistoryItem, Language, UserAnswer, UserProfile } from './types';
import { analyzePersonality, generateQuestions } from './services/geminiService';

const STORAGE_KEY = 'quirky_persona_data';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    screen: 'start',
    language: 'en',
    questions: [],
    answers: [],
    result: null,
    userProfile: {
      name: '',
      history: []
    }
  });

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(prev => ({
          ...prev,
          userProfile: parsed
        }));
      } catch (e) {
        console.error("Failed to load profile", e);
      }
    }
  }, []);

  // Save to local storage whenever profile changes
  useEffect(() => {
    if (state.userProfile.history.length > 0 || state.userProfile.name) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.userProfile));
    }
  }, [state.userProfile]);

  const handleToggleLanguage = (lang: Language) => {
    setState(prev => ({ ...prev, language: lang }));
  };

  const handleStart = async () => {
    setState(prev => ({ ...prev, screen: 'loading_quiz' }));
    
    // Fetch questions from Gemini (or fallback to static data)
    const questions = await generateQuestions(state.language);
    
    if (questions && questions.length > 0) {
      setState(prev => ({ ...prev, screen: 'quiz', questions }));
    } else {
      setState(prev => ({ ...prev, screen: 'start' })); 
      alert(state.language === 'vi' ? "Lỗi kết nối vũ trụ!" : "Connection to the cosmos failed!");
    }
  };

  const handleQuizComplete = async (answers: UserAnswer[]) => {
    setState(prev => ({ ...prev, screen: 'analyzing', answers }));

    // Calculate Scores locally
    const totalScore = answers.reduce((acc, curr) => acc + curr.score, 0);
    const maxScore = answers.length * 10; // Assuming max score per question is 10

    // Analyze results with Gemini using the score as context
    const result = await analyzePersonality(answers, totalScore, maxScore, state.language);
    
    // Save to history
    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      result: result
    };

    setState(prev => ({ 
      ...prev, 
      screen: 'result', 
      result,
      userProfile: {
        ...prev.userProfile,
        history: [...prev.userProfile.history, historyItem]
      }
    }));
  };

  const handleRetry = () => {
    setState(prev => ({
      ...prev,
      screen: 'start',
      questions: [],
      answers: [],
      result: null
    }));
  };

  // Profile Handlers
  const handleOpenProfile = () => {
    setState(prev => ({ ...prev, screen: 'profile' }));
  };

  const handleUpdateName = (name: string) => {
    setState(prev => ({
      ...prev,
      userProfile: { ...prev.userProfile, name }
    }));
  };

  const handleClearHistory = () => {
    if (confirm(state.language === 'vi' ? 'Bạn chắc chắn muốn xóa hết quá khứ huy hoàng này?' : 'Are you sure you want to erase your glorious past?')) {
      setState(prev => ({
        ...prev,
        userProfile: { ...prev.userProfile, history: [] }
      }));
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col min-h-screen relative">
      <LanguageSwitch currentLang={state.language} onToggle={handleToggleLanguage} />

      <main className="flex-grow flex flex-col justify-center py-12">
        {state.screen === 'start' && (
          <StartScreen 
            lang={state.language} 
            onStart={handleStart} 
            onOpenProfile={handleOpenProfile}
          />
        )}

        {state.screen === 'loading_quiz' && (
          <LoadingOverlay lang={state.language} mode="generating" />
        )}

        {state.screen === 'quiz' && (
          <QuizScreen 
            questions={state.questions} 
            lang={state.language} 
            onComplete={handleQuizComplete} 
          />
        )}

        {state.screen === 'analyzing' && (
          <LoadingOverlay lang={state.language} mode="analyzing" />
        )}

        {state.screen === 'result' && state.result && (
          <ResultScreen 
            result={state.result} 
            lang={state.language} 
            onRetry={handleRetry} 
          />
        )}

        {state.screen === 'profile' && (
          <ProfileScreen
            profile={state.userProfile}
            lang={state.language}
            onUpdateName={handleUpdateName}
            onClearHistory={handleClearHistory}
            onBack={() => setState(prev => ({ ...prev, screen: 'start' }))}
          />
        )}
      </main>
      
      <footer className="p-4 text-center text-gray-500 font-bold text-sm">
        Powered by Gemini 2.5 Flash • Created by AI
      </footer>
    </div>
  );
};

export default App;