import React from 'react';
import { Language } from '../types';

interface LanguageBubblesProps {
  onSelect: (lang: Language) => void;
}

const languages: { code: Language; label: string; color: string; emoji: string }[] = [
  { code: 'Spanish', label: 'Español', color: 'bg-amber-100 text-amber-800 border-amber-200', emoji: '🇪🇸' },
  { code: 'French', label: 'Français', color: 'bg-blue-100 text-blue-800 border-blue-200', emoji: '🇫🇷' },
  { code: 'Italian', label: 'Italiano', color: 'bg-green-100 text-green-800 border-green-200', emoji: '🇮🇹' },
  { code: 'German', label: 'Deutsch', color: 'bg-red-100 text-red-800 border-red-200', emoji: '🇩🇪' },
  { code: 'Japanese', label: '日本語', color: 'bg-rose-100 text-rose-800 border-rose-200', emoji: '🇯🇵' },
];

// Duplicate for seamless loop
const allBubbles = [...languages, ...languages, ...languages];

export const LanguageBubbles: React.FC<LanguageBubblesProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full overflow-hidden py-12">
      <div className="text-center mb-12 space-y-4 px-4 z-10">
        <h2 className="text-4xl md:text-5xl font-serif text-slate-800">
            Pick your path
        </h2>
        <p className="text-slate-500 text-lg">Select a bubble to begin your daily practice.</p>
      </div>

      <div className="w-full relative py-12">
        {/* Gradient Masks for fade effect on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        {/* The Sliding Track */}
        <div className="overflow-hidden w-full">
            <div className="animate-slide flex gap-8 px-8 items-center">
                {allBubbles.map((lang, index) => (
                    <button
                        key={`${lang.code}-${index}`}
                        onClick={() => onSelect(lang.code)}
                        className={`
                            group relative flex flex-col items-center justify-center 
                            w-40 h-40 md:w-48 md:h-48 rounded-full 
                            shrink-0 cursor-pointer 
                            transition-all duration-300 transform hover:scale-110 
                            border-4 ${lang.color} glass shadow-lg hover:shadow-xl
                        `}
                    >
                        <span className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300 filter drop-shadow-sm">
                            {lang.emoji}
                        </span>
                        <span className="font-serif font-bold text-lg">{lang.label}</span>
                        
                        {/* Shine effect */}
                        <div className="absolute top-4 left-6 w-8 h-4 bg-white/40 rounded-full -rotate-45 blur-sm" />
                    </button>
                ))}
            </div>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-slate-400">
        Stop the slide by hovering. Click to start.
      </p>
    </div>
  );
};