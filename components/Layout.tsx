import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 flex flex-col font-sans">
      <header className="p-6 flex justify-center">
        <div className="text-teal-700 font-serif font-bold text-xl tracking-wide flex items-center gap-2">
          <span>🌿</span> LingoCalm
        </div>
      </header>
      
      <main className="flex-grow flex flex-col px-6 pb-12 max-w-4xl mx-auto w-full">
        {children}
      </main>
      
      <footer className="p-4 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} LingoCalm. Breath. Learn.</p>
      </footer>
    </div>
  );
};