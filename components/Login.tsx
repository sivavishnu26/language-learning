import React, { useState } from 'react';
import { Button } from './Button';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { login, signUp } from '../services/authService';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await login(email, password);
      }
      // Success is handled by App.tsx's auth state listener, 
      // but we can call this to be safe or if unrelated logic is simpler.
      onLoginSuccess();
    } catch (err: any) {
      console.error("Auth error:", err);
      let msg = 'Something went wrong. Please try again.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        msg = 'Invalid email or password.';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = 'Email already in use. Please sign in.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      }
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full animate-in fade-in duration-700">

      {/* Visual Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-teal-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[20%] right-[10%] w-48 h-48 bg-purple-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="glass p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-slate-800 mb-2">{isSignUp ? 'Join Gently' : 'Welcome Back'}</h1>
          <p className="text-slate-500">Breathe in, {isSignUp ? 'sign up' : 'log in'}, and learn.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                required
                className="w-full pl-12 pr-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-all text-slate-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full pl-12 pr-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-all text-slate-700"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">{error}</p>}

          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            className="flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? (isSignUp ? 'Joining...' : 'Signing in...') : (
              <>
                <span>{isSignUp ? 'Create Account' : 'Start Learning'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            {isSignUp ? 'Already have an account?' : 'No account?'}
            <button
              onClick={toggleMode}
              className="ml-1 text-teal-600 hover:underline font-medium focus:outline-none"
              type="button"
            >
              {isSignUp ? 'Sign In' : 'Join gently.'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};