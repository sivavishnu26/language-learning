export type Language = 'Spanish' | 'French' | 'Italian' | 'German' | 'Japanese';

export interface VocabularyWord {
  targetWord: string;
  nativeMeaning: string;
  pronunciationGuide: string;
  exampleSentenceTarget: string;
  exampleSentenceNative: string;
  practiced: boolean;
}

export interface DailyLesson {
  id: string; // usually YYYY-MM-DD
  words: VocabularyWord[];
  completed: boolean;
}

export interface AppState {
  language: Language | null;
  currentLesson: DailyLesson | null;
  completedToday: boolean;
  streak: number;
  lastVisit: string | null; // ISO Date string
}

export type ViewState = 'login' | 'loading' | 'onboarding' | 'generating' | 'lesson' | 'summary';
