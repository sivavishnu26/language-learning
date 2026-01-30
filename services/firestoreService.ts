/**
 * Firestore Service for User Progress Persistence
 * Handles storing and retrieving user learning data from Firestore
 */
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { AppState, DailyLesson, Language } from '../types';

// ============ USER PROGRESS ============

interface UserProgress {
    language: Language | null;
    currentLesson: DailyLesson | null;
    completedToday: boolean;
    streak: number;
    lastVisit: string | null;
    totalLessonsCompleted: number;
    totalWordsLearned: number;
    updatedAt: Timestamp | null;
}

const initialProgress: UserProgress = {
    language: null,
    currentLesson: null,
    completedToday: false,
    streak: 0,
    lastVisit: null,
    totalLessonsCompleted: 0,
    totalWordsLearned: 0,
    updatedAt: null
};

/**
 * Get user progress from Firestore
 */
export const getUserProgress = async (userId: string): Promise<AppState> => {
    try {
        const progressDoc = await getDoc(doc(db, 'userProgress', userId));

        if (progressDoc.exists()) {
            const data = progressDoc.data() as UserProgress;
            return {
                language: data.language,
                currentLesson: data.currentLesson,
                completedToday: data.completedToday,
                streak: data.streak,
                lastVisit: data.lastVisit
            };
        }

        // Create initial progress document if it doesn't exist
        await setDoc(doc(db, 'userProgress', userId), {
            ...initialProgress,
            updatedAt: serverTimestamp()
        });

        return {
            language: null,
            currentLesson: null,
            completedToday: false,
            streak: 0,
            lastVisit: null
        };
    } catch (error: any) {
        if (error.code === 'permission-denied') {
            console.warn('Firestore permission denied. Using default local state. Check firestore.rules.');
        } else {
            console.error('Error getting user progress:', error);
        }

        // Return default state on error
        return {
            language: null,
            currentLesson: null,
            completedToday: false,
            streak: 0,
            lastVisit: null
        };
    }
};

/**
 * Save user progress to Firestore
 */
export const saveUserProgress = async (userId: string, state: AppState): Promise<void> => {
    try {
        const progressRef = doc(db, 'userProgress', userId);
        const progressDoc = await getDoc(progressRef);

        const updateData = {
            language: state.language,
            currentLesson: state.currentLesson,
            completedToday: state.completedToday,
            streak: state.streak,
            lastVisit: state.lastVisit,
            updatedAt: serverTimestamp()
        };

        if (progressDoc.exists()) {
            await updateDoc(progressRef, updateData);
        } else {
            await setDoc(progressRef, {
                ...updateData,
                totalLessonsCompleted: 0,
                totalWordsLearned: 0
            });
        }
    } catch (error: any) {
        if (error.code === 'permission-denied') {
            console.warn('Firestore permission denied. User progress will not be saved. Check firestore.rules.');
            // Do not throw, allows app to continue in "demo" mode
            return;
        }
        console.error('Error saving user progress:', error);
        // We still don't throw to prevent app crash, but log it
    }
};

/**
 * Reset daily progress if it's a new day
 */
export const resetDailyIfNewDay = (state: AppState): AppState => {
    const today = new Date().toISOString().split('T')[0];
    const lastLessonDate = state.currentLesson?.id;

    if (lastLessonDate && lastLessonDate !== today) {
        return {
            ...state,
            currentLesson: null,
            completedToday: false
        };
    }
    return state;
};

/**
 * Mark a word as practiced in a lesson
 */
export const markWordAsPracticed = (lesson: DailyLesson, index: number): DailyLesson => {
    const newWords = [...lesson.words];
    newWords[index] = { ...newWords[index], practiced: true };
    return { ...lesson, words: newWords };
};

// ============ LESSON HISTORY ============

interface LessonHistory {
    lessonId: string;
    language: Language;
    wordsCount: number;
    completedAt: Timestamp;
    words: string[];
}

/**
 * Save completed lesson to history for analytics
 */
export const saveLessonHistory = async (
    userId: string,
    lesson: DailyLesson,
    language: Language
): Promise<void> => {
    try {
        const historyRef = doc(collection(db, 'users', userId, 'lessonHistory'));
        await setDoc(historyRef, {
            lessonId: lesson.id,
            language,
            wordsCount: lesson.words.length,
            completedAt: serverTimestamp(),
            words: lesson.words.map(w => w.targetWord)
        });

        // Update total stats in user progress
        const progressRef = doc(db, 'userProgress', userId);
        const progressDoc = await getDoc(progressRef);

        if (progressDoc.exists()) {
            const data = progressDoc.data() as UserProgress;
            await updateDoc(progressRef, {
                totalLessonsCompleted: (data.totalLessonsCompleted || 0) + 1,
                totalWordsLearned: (data.totalWordsLearned || 0) + lesson.words.length
            });
        }
    } catch (error) {
        console.error('Error saving lesson history:', error);
    }
};

/**
 * Get user's lesson history for analytics
 */
export const getLessonHistory = async (
    userId: string,
    limitCount: number = 30
): Promise<LessonHistory[]> => {
    try {
        const historyRef = collection(db, 'users', userId, 'lessonHistory');
        const q = query(historyRef, orderBy('completedAt', 'desc'), limit(limitCount));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => doc.data() as LessonHistory);
    } catch (error) {
        console.error('Error getting lesson history:', error);
        return [];
    }
};

/**
 * Get user statistics for dashboard/analytics
 */
export const getUserStats = async (userId: string): Promise<{
    totalLessons: number;
    totalWords: number;
    currentStreak: number;
    preferredLanguage: Language | null;
}> => {
    try {
        const progressDoc = await getDoc(doc(db, 'userProgress', userId));

        if (progressDoc.exists()) {
            const data = progressDoc.data() as UserProgress;
            return {
                totalLessons: data.totalLessonsCompleted || 0,
                totalWords: data.totalWordsLearned || 0,
                currentStreak: data.streak || 0,
                preferredLanguage: data.language
            };
        }

        return {
            totalLessons: 0,
            totalWords: 0,
            currentStreak: 0,
            preferredLanguage: null
        };
    } catch (error) {
        console.error('Error getting user stats:', error);
        return {
            totalLessons: 0,
            totalWords: 0,
            currentStreak: 0,
            preferredLanguage: null
        };
    }
};
