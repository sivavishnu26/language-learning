import { AppState, DailyLesson } from "../types";
import { APP_STORAGE_KEY } from "../constants";

const initialState: AppState = {
  language: null,
  currentLesson: null,
  completedToday: false,
  streak: 0,
  lastVisit: null
};

export const getStoredState = (): AppState => {
  try {
    const stored = localStorage.getItem(APP_STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialState;
  } catch (e) {
    console.error("Failed to load state", e);
    return initialState;
  }
};

export const saveState = (state: AppState) => {
  try {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save state", e);
  }
};

export const resetDailyIfNewDay = (state: AppState): AppState => {
  const today = new Date().toISOString().split('T')[0];
  const lastLessonDate = state.currentLesson?.id;

  // If the stored lesson is from a previous day, we need to reset for a new lesson
  if (lastLessonDate && lastLessonDate !== today) {
    return {
      ...state,
      currentLesson: null, // Clear lesson to trigger regeneration
      completedToday: false,
      // Logic for streak could be improved here (e.g. check if yesterday was missed)
      // For MVP, we just keep the streak number unless reset logic is stricter.
    };
  }
  return state;
};

export const markWordAsPracticed = (lesson: DailyLesson, index: number): DailyLesson => {
  const newWords = [...lesson.words];
  newWords[index] = { ...newWords[index], practiced: true };
  return { ...lesson, words: newWords };
};