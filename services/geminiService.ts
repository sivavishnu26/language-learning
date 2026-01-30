import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DailyLesson, Language, VocabularyWord } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const vocabularySchema: Schema = {
  type: Type.OBJECT,
  properties: {
    words: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          targetWord: { type: Type.STRING, description: "The word in the target language" },
          nativeMeaning: { type: Type.STRING, description: "The meaning in English" },
          pronunciationGuide: { type: Type.STRING, description: "Phonetic pronunciation guide for English speakers" },
          exampleSentenceTarget: { type: Type.STRING, description: "Simple example sentence in target language" },
          exampleSentenceNative: { type: Type.STRING, description: "English translation of the example sentence" },
        },
        required: ["targetWord", "nativeMeaning", "pronunciationGuide", "exampleSentenceTarget", "exampleSentenceNative"]
      }
    }
  }
};

export const generateDailyLesson = async (language: Language): Promise<DailyLesson> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // We request 5 words for a "calm" micro-lesson
    const prompt = `Generate 5 beginner-friendly vocabulary words for a ${language} learner (English speaker). 
    Focus on a specific calm theme if possible (e.g., Nature, Home, Greetings, Colors). 
    Ensure the words are basic and useful.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: vocabularySchema,
        systemInstruction: "You are a gentle language tutor. Provide accurate, simple, and encouraging content."
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const data = JSON.parse(text) as { words: Omit<VocabularyWord, 'practiced'>[] };
    
    return {
      id: today,
      words: data.words.map(w => ({ ...w, practiced: false })),
      completed: false
    };

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    // Fallback static lesson if AI fails, to prevent app crash during demo
    return {
      id: new Date().toISOString().split('T')[0],
      completed: false,
      words: [
        {
          targetWord: "Hola",
          nativeMeaning: "Hello",
          pronunciationGuide: "oh-lah",
          exampleSentenceTarget: "Hola, amigo.",
          exampleSentenceNative: "Hello, friend.",
          practiced: false
        }
      ]
    };
  }
};