import React from 'react';
import { Flame, BookOpen } from 'lucide-react';

interface ProgressStatsProps {
    streak: number;
    totalWords: number;
}

export const ProgressStats: React.FC<ProgressStatsProps> = ({ streak, totalWords }) => {
    return (
        <div className="flex gap-4 justify-center animate-in slide-in-from-top-4 duration-700">
            <div className="flex items-center gap-2 bg-orange-50/80 text-orange-600 px-4 py-2 rounded-full border border-orange-100 shadow-sm backdrop-blur-sm">
                <Flame className={`w-4 h-4 ${streak > 0 ? 'fill-orange-400' : ''}`} />
                <span className="font-semibold text-sm">{streak} Day Streak</span>
            </div>

            <div className="flex items-center gap-2 bg-blue-50/80 text-blue-600 px-4 py-2 rounded-full border border-blue-100 shadow-sm backdrop-blur-sm">
                <BookOpen className="w-4 h-4" />
                <span className="font-semibold text-sm">{totalWords} Words</span>
            </div>
        </div>
    );
};
