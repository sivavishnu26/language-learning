import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { Button } from './components/Button';
import { Login } from './components/Login';
import { LanguageBubbles } from './components/LanguageBubbles';
import { WordCard } from './components/WordCard';
import { ProgressBar } from './components/ProgressBar';
import { generateDailyLesson } from './services/geminiService';
import {
  getStoredState,
  saveState,
  markWordAsPracticed,
  resetDailyIfNewDay
} from './services/storageService';
import { logout, subscribeToAuthChanges } from './services/authService';
import { AppState, ViewState, Language } from './types';
import { Loader2, CheckCircle2, BookOpen, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    language: null,
    currentLesson: null,
    completedToday: false,
    streak: 0,
    lastVisit: null
  });
  const [view, setView] = useState<ViewState>('loading');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const loadAppData = useCallback(async () => {
    const stored = getStoredState();

    // Check if it's a new day and reset the daily lesson logic if needed
    const processedState = resetDailyIfNewDay(stored);
    setState(processedState);

    if (!processedState.language) {
      setView('onboarding');
    } else if (processedState.currentLesson) {
      // If we have a lesson but haven't finished it
      if (processedState.completedToday) {
        setView('summary');
      } else {
        // Find the first uncompleted word
        const nextIndex = processedState.currentLesson.words.findIndex(w => !w.practiced);
        setCurrentWordIndex(nextIndex === -1 ? 0 : nextIndex);
        setView('lesson');
      }
    } else {
      // Language selected, but no lesson generated for today yet
      await loadNewLesson(processedState.language);
    }
  }, []);

  // Initialize app
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user) {
        // Only load data if we are not already in a valid authenticated view to avoid re-loading
        // Actually, logic is safe to run.
        if (view === 'login' || view === 'loading') {
          loadAppData();
        }
      } else {
        setView('login');
      }
    });
    return () => unsubscribe();
  }, [loadAppData, view]);

  const handleLoginSuccess = () => {
    // Auth state listener will handle the transition
  };

  const handleLogout = () => {
    logout();
    setView('login');
    // Optional: clear local state or keep it for next login?
    // For MVP we keep local state in localStorage so it persists.
  };

  const loadNewLesson = async (lang: Language) => {
    setView('generating');
    setLoadingMessage(`Crafting a calm ${lang} lesson for you...`);
    try {
      const newLesson = await generateDailyLesson(lang);

      setState(prev => {
        const newState = {
          ...prev,
          language: lang,
          currentLesson: newLesson,
          completedToday: false,
          lastVisit: new Date().toISOString()
        };
        saveState(newState);
        return newState;
      });
      setCurrentWordIndex(0);
      setView('lesson');
    } catch (error) {
      console.error(error);
      setLoadingMessage("We couldn't generate the lesson right now. Please check your connection.");
    }
  };

  const handleLanguageSelect = (lang: Language) => {
    setState(prev => ({ ...prev, language: lang }));
    loadNewLesson(lang);
  };

  const handleChangeLanguage = () => {
    // Allow user to switch language (resetting current progress for the day essentially)
    setView('onboarding');
  };

  const handleWordComplete = useCallback(() => {
    if (!state.currentLesson) return;

    // Mark current word as practiced
    const updatedLesson = markWordAsPracticed(state.currentLesson, currentWordIndex);

    // Update state
    setState(prev => {
      const newState = { ...prev, currentLesson: updatedLesson };
      saveState(newState);
      return newState;
    });

    // Move to next word or finish
    if (currentWordIndex < state.currentLesson.words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      // Lesson complete
      setState(prev => {
        const newState = {
          ...prev,
          completedToday: true,
          streak: prev.streak + 1
        };
        saveState(newState);
        return newState;
      });
      setView('summary');
    }
  }, [state.currentLesson, currentWordIndex]);

  const renderContent = () => {
    switch (view) {
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-teal-600" />
            <p>Breathe in...</p>
          </div>
        );

      case 'login':
        return <Login onLoginSuccess={handleLoginSuccess} />;

      case 'generating':
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-600 animate-pulse">
            <BookOpen className="w-10 h-10 mb-4 text-teal-600" />
            <p className="serif text-lg">{loadingMessage}</p>
          </div>
        );

      case 'onboarding':
        return <LanguageBubbles onSelect={handleLanguageSelect} />;

      case 'lesson':
        if (!state.currentLesson) return null;
        const progress = ((currentWordIndex) / state.currentLesson.words.length) * 100;

        return (
          <div className="flex flex-col h-full max-w-lg mx-auto w-full">
            <div className="mb-8 pt-4">
              <div className="flex justify-between text-xs text-slate-400 font-medium tracking-widest uppercase mb-2">
                <span>Today's Session</span>
                <span>{currentWordIndex + 1} / {state.currentLesson.words.length}</span>
              </div>
              <ProgressBar progress={progress} />
            </div>

            <div className="flex-grow flex flex-col justify-center">
              <WordCard
                word={state.currentLesson.words[currentWordIndex]}
                onComplete={handleWordComplete}
                language={state.language || 'Spanish'}
              />
            </div>

            <div className="h-8 text-center text-slate-300 text-sm mt-4">
              Take your time. There is no rush.
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6 max-w-md mx-auto animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 className="w-10 h-10 text-teal-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl text-slate-800 serif">Session Complete</h2>
              <p className="text-slate-500 text-lg">You've successfully practiced today.</p>
            </div>

            <div className="glass p-6 rounded-2xl shadow-sm border border-slate-100 w-full">
              <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold mb-1">Total Progress</p>
              <p className="text-4xl text-slate-800 font-medium">
                {state.streak} <span className="text-lg text-slate-400 font-normal">days learned</span>
              </p>
            </div>

            <div className="flex gap-4 w-full">
              <Button variant="secondary" fullWidth onClick={handleChangeLanguage}>
                Change Language
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout>
      {/* Optional Logout button in header area */}
      {view !== 'login' && view !== 'loading' && (
        <div className="fixed top-6 right-6 z-50">
          <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-slate-600 transition-colors" title="Log out">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      )}
      {renderContent()}
    </Layout>
  );
};

export default App;