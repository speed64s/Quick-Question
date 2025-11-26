export type Language = 'en' | 'vi';

export interface QuizOption {
  id: string;
  text: string;
  score: number; // 1-10 points for "quirkiness"
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: QuizOption[];
}

export interface UserAnswer {
  questionId: number;
  questionText: string;
  selectedOptionId: string;
  selectedOptionText: string;
  score: number;
}

export interface PersonalityResult {
  title: string;
  description: string;
  spiritEmoji: string;
  roast: string;
  totalScore: number; // Added score field
  maxPossibleScore: number;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  result: PersonalityResult;
}

export interface UserProfile {
  name: string;
  avatar?: string;
  history: HistoryItem[];
}

export interface AppState {
  screen: 'start' | 'loading_quiz' | 'quiz' | 'analyzing' | 'result' | 'profile';
  language: Language;
  questions: QuizQuestion[];
  answers: UserAnswer[];
  result: PersonalityResult | null;
  userProfile: UserProfile;
}