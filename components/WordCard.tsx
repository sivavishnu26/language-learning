import React, { useState, useEffect } from 'react';
import { Volume2, Check } from 'lucide-react';
import { VocabularyWord, Language } from '../types';
import { Button } from './Button';
import { LANGUAGE_CODES } from '../constants';

interface WordCardProps {
  word: VocabularyWord;
  language: Language;
  onComplete: () => void;
}

export const WordCard: React.FC<WordCardProps> = ({ word, language, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Reset local state when word changes
  useEffect(() => {
    setIsPlaying(false);
  }, [word]);

  const handlePlayAudio = () => {
    if (isPlaying) return;

    // Use Web Speech API for low-latency TTS
    const utterance = new SpeechSynthesisUtterance(word.targetWord);
    utterance.lang = LANGUAGE_CODES[language] || 'en-US';
    utterance.rate = 0.8; // Slightly slower for clarity
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* The Card */}
      <div className="bg-white w-full rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-6">
        
        {/* Target Word */}
        <div className="space-y-2">
            <h2 className="text-5xl font-serif text-slate-800 tracking-tight">
            {word.targetWord}
            </h2>
            <p className="text-slate-400 font-mono text-sm tracking-wide">
            /{word.pronunciationGuide}/
            </p>
        </div>

        {/* Audio Button */}
        <button 
            onClick={handlePlayAudio}
            disabled={isPlaying}
            className={`p-4 rounded-full transition-colors ${isPlaying ? 'bg-teal-100 text-teal-700' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-teal-600'}`}
            aria-label="Play pronunciation"
        >
            <Volume2 className={`w-8 h-8 ${isPlaying ? 'animate-pulse' : ''}`} />
        </button>

        <hr className="w-16 border-t-2 border-slate-100" />

        {/* Meaning */}
        <div>
            <p className="text-2xl text-slate-600 font-medium">{word.nativeMeaning}</p>
        </div>
      </div>

      {/* Example Context (Optional / Collapsible could be added here, currently kept simple) */}
      <div className="w-full bg-white/50 p-6 rounded-2xl border border-slate-100 text-center">
          <p className="text-lg text-slate-700 font-serif italic">"{word.exampleSentenceTarget}"</p>
          <p className="text-slate-400 mt-2 text-sm">{word.exampleSentenceNative}</p>
      </div>

      {/* Action Area */}
      <div className="w-full pt-4">
        <Button onClick={onComplete} fullWidth className="flex items-center justify-center gap-2">
            <Check className="w-5 h-5" />
            <span>I've practiced this</span>
        </Button>
      </div>

    </div>
  );
};