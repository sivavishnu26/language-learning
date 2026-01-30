import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full h-3 bg-slate-100/80 rounded-full overflow-hidden backdrop-blur-sm border border-slate-100">
      <div
        className="h-full bg-gradient-to-r from-teal-300 to-teal-500 transition-all duration-700 ease-out rounded-full shadow-[0_0_10px_rgba(45,212,191,0.3)]"
        style={{ width: `${Math.max(progress, 2)}%` }}
      />
    </div>
  );
};