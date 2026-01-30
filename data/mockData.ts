/**
 * Mock Data for LingoCalm
 * Used for demos, testing, and fallback when AI is unavailable
 */
import { DailyLesson, VocabularyWord, Language } from '../types';

// ============ MOCK VOCABULARY BY LANGUAGE ============

const spanishWords: VocabularyWord[] = [
    {
        targetWord: 'Hola',
        nativeMeaning: 'Hello',
        pronunciationGuide: 'OH-lah',
        exampleSentenceTarget: 'Hola, ¿cómo estás?',
        exampleSentenceNative: 'Hello, how are you?',
        practiced: false
    },
    {
        targetWord: 'Gracias',
        nativeMeaning: 'Thank you',
        pronunciationGuide: 'GRAH-see-ahs',
        exampleSentenceTarget: 'Muchas gracias por tu ayuda.',
        exampleSentenceNative: 'Thank you very much for your help.',
        practiced: false
    },
    {
        targetWord: 'Amor',
        nativeMeaning: 'Love',
        pronunciationGuide: 'ah-MOR',
        exampleSentenceTarget: 'El amor es hermoso.',
        exampleSentenceNative: 'Love is beautiful.',
        practiced: false
    },
    {
        targetWord: 'Sol',
        nativeMeaning: 'Sun',
        pronunciationGuide: 'sohl',
        exampleSentenceTarget: 'El sol brilla hoy.',
        exampleSentenceNative: 'The sun is shining today.',
        practiced: false
    },
    {
        targetWord: 'Agua',
        nativeMeaning: 'Water',
        pronunciationGuide: 'AH-gwah',
        exampleSentenceTarget: 'Necesito un vaso de agua.',
        exampleSentenceNative: 'I need a glass of water.',
        practiced: false
    }
];

const frenchWords: VocabularyWord[] = [
    {
        targetWord: 'Bonjour',
        nativeMeaning: 'Hello / Good day',
        pronunciationGuide: 'bohn-ZHOOR',
        exampleSentenceTarget: 'Bonjour, comment allez-vous?',
        exampleSentenceNative: 'Hello, how are you?',
        practiced: false
    },
    {
        targetWord: 'Merci',
        nativeMeaning: 'Thank you',
        pronunciationGuide: 'mehr-SEE',
        exampleSentenceTarget: 'Merci beaucoup!',
        exampleSentenceNative: 'Thank you very much!',
        practiced: false
    },
    {
        targetWord: 'Amour',
        nativeMeaning: 'Love',
        pronunciationGuide: 'ah-MOOR',
        exampleSentenceTarget: "L'amour est dans l'air.",
        exampleSentenceNative: 'Love is in the air.',
        practiced: false
    },
    {
        targetWord: 'Soleil',
        nativeMeaning: 'Sun',
        pronunciationGuide: 'soh-LAY',
        exampleSentenceTarget: 'Le soleil se lève.',
        exampleSentenceNative: 'The sun is rising.',
        practiced: false
    },
    {
        targetWord: 'Eau',
        nativeMeaning: 'Water',
        pronunciationGuide: 'oh',
        exampleSentenceTarget: "Je voudrais de l'eau, s'il vous plaît.",
        exampleSentenceNative: 'I would like some water, please.',
        practiced: false
    }
];

const italianWords: VocabularyWord[] = [
    {
        targetWord: 'Ciao',
        nativeMeaning: 'Hello / Goodbye',
        pronunciationGuide: 'CHOW',
        exampleSentenceTarget: 'Ciao, come stai?',
        exampleSentenceNative: 'Hi, how are you?',
        practiced: false
    },
    {
        targetWord: 'Grazie',
        nativeMeaning: 'Thank you',
        pronunciationGuide: 'GRAH-tsee-eh',
        exampleSentenceTarget: 'Grazie mille!',
        exampleSentenceNative: 'Thanks a lot!',
        practiced: false
    },
    {
        targetWord: 'Amore',
        nativeMeaning: 'Love',
        pronunciationGuide: 'ah-MOH-reh',
        exampleSentenceTarget: "L'amore è bellissimo.",
        exampleSentenceNative: 'Love is beautiful.',
        practiced: false
    },
    {
        targetWord: 'Sole',
        nativeMeaning: 'Sun',
        pronunciationGuide: 'SOH-leh',
        exampleSentenceTarget: 'Il sole splende oggi.',
        exampleSentenceNative: 'The sun is shining today.',
        practiced: false
    },
    {
        targetWord: 'Acqua',
        nativeMeaning: 'Water',
        pronunciationGuide: 'AH-kwah',
        exampleSentenceTarget: "Vorrei un bicchiere d'acqua.",
        exampleSentenceNative: 'I would like a glass of water.',
        practiced: false
    }
];

const germanWords: VocabularyWord[] = [
    {
        targetWord: 'Hallo',
        nativeMeaning: 'Hello',
        pronunciationGuide: 'HAH-loh',
        exampleSentenceTarget: 'Hallo, wie geht es dir?',
        exampleSentenceNative: 'Hello, how are you?',
        practiced: false
    },
    {
        targetWord: 'Danke',
        nativeMeaning: 'Thank you',
        pronunciationGuide: 'DAHN-keh',
        exampleSentenceTarget: 'Danke schön!',
        exampleSentenceNative: 'Thank you very much!',
        practiced: false
    },
    {
        targetWord: 'Liebe',
        nativeMeaning: 'Love',
        pronunciationGuide: 'LEE-beh',
        exampleSentenceTarget: 'Liebe ist wunderbar.',
        exampleSentenceNative: 'Love is wonderful.',
        practiced: false
    },
    {
        targetWord: 'Sonne',
        nativeMeaning: 'Sun',
        pronunciationGuide: 'ZON-neh',
        exampleSentenceTarget: 'Die Sonne scheint heute.',
        exampleSentenceNative: 'The sun is shining today.',
        practiced: false
    },
    {
        targetWord: 'Wasser',
        nativeMeaning: 'Water',
        pronunciationGuide: 'VAH-ser',
        exampleSentenceTarget: 'Ich möchte ein Glas Wasser.',
        exampleSentenceNative: 'I would like a glass of water.',
        practiced: false
    }
];

const japaneseWords: VocabularyWord[] = [
    {
        targetWord: 'こんにちは',
        nativeMeaning: 'Hello',
        pronunciationGuide: 'kon-NEE-chee-wah',
        exampleSentenceTarget: 'こんにちは、元気ですか？',
        exampleSentenceNative: 'Hello, how are you?',
        practiced: false
    },
    {
        targetWord: 'ありがとう',
        nativeMeaning: 'Thank you',
        pronunciationGuide: 'ah-ree-GAH-toh',
        exampleSentenceTarget: 'ありがとうございます。',
        exampleSentenceNative: 'Thank you very much.',
        practiced: false
    },
    {
        targetWord: '愛',
        nativeMeaning: 'Love',
        pronunciationGuide: 'ah-ee',
        exampleSentenceTarget: '愛は美しいです。',
        exampleSentenceNative: 'Love is beautiful.',
        practiced: false
    },
    {
        targetWord: '太陽',
        nativeMeaning: 'Sun',
        pronunciationGuide: 'tah-ee-YOH',
        exampleSentenceTarget: '今日は太陽が輝いています。',
        exampleSentenceNative: 'The sun is shining today.',
        practiced: false
    },
    {
        targetWord: '水',
        nativeMeaning: 'Water',
        pronunciationGuide: 'mee-zoo',
        exampleSentenceTarget: '水を一杯ください。',
        exampleSentenceNative: 'Please give me a glass of water.',
        practiced: false
    }
];

// ============ MOCK DATA EXPORTS ============

export const mockVocabulary: Record<Language, VocabularyWord[]> = {
    Spanish: spanishWords,
    French: frenchWords,
    Italian: italianWords,
    German: germanWords,
    Japanese: japaneseWords
};

/**
 * Get a mock daily lesson for a given language
 */
export const getMockLesson = (language: Language): DailyLesson => {
    const today = new Date().toISOString().split('T')[0];
    return {
        id: today,
        words: mockVocabulary[language].map(w => ({ ...w, practiced: false })),
        completed: false
    };
};

/**
 * Get a random subset of words for variety
 */
export const getRandomMockLesson = (language: Language, count: number = 5): DailyLesson => {
    const today = new Date().toISOString().split('T')[0];
    const allWords = mockVocabulary[language];

    // Shuffle and pick random words
    const shuffled = [...allWords].sort(() => Math.random() - 0.5);
    const selectedWords = shuffled.slice(0, Math.min(count, shuffled.length));

    return {
        id: today,
        words: selectedWords.map(w => ({ ...w, practiced: false })),
        completed: false
    };
};

// ============ DEMO USER DATA ============

export const mockUserStats = {
    totalLessons: 12,
    totalWords: 60,
    currentStreak: 5,
    preferredLanguage: 'Spanish' as Language
};

export const mockLessonHistory = [
    { date: '2026-01-29', language: 'Spanish', wordsCount: 5 },
    { date: '2026-01-28', language: 'Spanish', wordsCount: 5 },
    { date: '2026-01-27', language: 'French', wordsCount: 5 },
    { date: '2026-01-26', language: 'Spanish', wordsCount: 5 },
    { date: '2026-01-25', language: 'Spanish', wordsCount: 5 }
];
