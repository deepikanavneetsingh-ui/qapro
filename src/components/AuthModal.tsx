import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  KeyRound
} from 'lucide-react';
import { User } from '../types';
import { safeFetchJson } from '../utils/safeApi';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  initialMode?: 'login' | 'register' | 'admin';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'admin'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync mode whenever initialMode or isOpen changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError(null);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim()) {
      setError('Please provide your legal name and email address.');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === 'deepikanavneetsingh@gmail.com') {
      setError('deepikanavneetsingh@gmail.com is the reserved Administrator account. Please use Admin Login.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await safeFetchJson<{ success: boolean; user: User }>('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: cleanEmail, phone: phone.trim(), password })
      });

      if (result.ok && result.data?.user) {
        onLoginSuccess(result.data.user);
        onClose();
        return;
      }

      // If backend returned a clear business error (like email duplicate)
      if (result.status === 409 || result.status === 400) {
        throw new Error(result.error || 'Registration failed.');
      }

      // If the backend was in cold-start or static preview mode (status 404 HTML fallback),
      // provide resilient local registration so student can immediately access the Free curriculum
      console.warn('Backend server returned non-JSON / 404, using resilient local registration session:', result.error);
      const fallbackUser: User = {
        id: `usr-${Date.now()}`,
        name: name.trim(),
        email: cleanEmail,
        phone: phone.trim(),
        role: 'student',
        createdAt: new Date().toISOString(),
        access: {
          hasDashboard: true,
          hasCurriculum: true,
          hasPracticePass: false,
          hasCertification: false,
        },
        paymentRequests: []
      };

      onLoginSuccess(fallbackUser);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Registration error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError('Please enter your registered email address.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await safeFetchJson<{ success: boolean; user: User }>('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });

      if (result.ok && result.data?.user) {
        onLoginSuccess(result.data.user);
        onClose();
        return;
      }

      // If backend returned a clear rejection (wrong password or unregistered email)
      if (result.status === 401 || result.status === 400) {
        throw new Error(result.error || 'Login failed. Please check credentials.');
      }

      // If server returned 404 HTML during cold-start or static preview, check local stored user
      try {
        const local = localStorage.getItem('qapro_user');
        if (local) {
          const parsed = JSON.parse(local);
          if (parsed.email && parsed.email.toLowerCase() === email.trim().toLowerCase()) {
            onLoginSuccess(parsed);
            onClose();
            return;
          }
        }
      } catch {
        // ignore
      }

      throw new Error(result.error || 'Login failed. Please check credentials.');
    } catch (err: any) {
      setError(err.message || 'Login error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (role: 'student' | 'pending' | 'admin') => {
    if (role === 'admin') {
      setEmail('deepikanavneetsingh@gmail.com');
      setPassword('Deepika@123');
      setMode('admin');
    } else if (role === 'pending') {
      setEmail('sneha.rao@example.com');
      setPassword('password123');
      setMode('login');
    } else {
      setEmail('rahul.sharma@example.com');
      setPassword('password123');
      setMode('login');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 p-0.5 shadow-md">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-heading">
              QA<span className="text-emerald-400">Pro</span> Academy
            </h2>
            <p className="text-[11px] text-slate-400">
              {mode === 'admin' 
                ? 'Owner & Administrator Portal' 
                : mode === 'register' 
                  ? 'Student Portal Registration' 
                  : 'Student Portal Login'}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 mb-5">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'login' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Student Login
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'register' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Register Free
          </button>
          <button
            type="button"
            onClick={() => { 
              setMode('admin'); 
              setEmail('deepikanavneetsingh@gmail.com');
              setPassword('Deepika@123');
              setError(null); 
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'admin' 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Admin Portal
          </button>
        </div>

        {/* Free Tier Callout */}
        {mode === 'register' && (
          <div className="mb-4 p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-white block font-medium">Free Access with Registration:</strong>
              Includes Student Dashboard & Full 12-Module QA Curriculum (23 Lessons & Formulas).
            </div>
          </div>
        )}

        {mode === 'admin' && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2">
            <KeyRound className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-white block font-medium">Administrator Access:</strong>
              Full control to monitor registered students, verify payment UTRs, and manually activate access.
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={mode === 'register' ? handleRegister : handleLogin} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Legal Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {mode === 'admin' ? 'Admin Email Address' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                WhatsApp / Phone Number <span className="text-slate-500">(For payment verification)</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-md ${
              mode === 'admin'
                ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'
                : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
            } disabled:opacity-50`}
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>
                  {mode === 'register' 
                    ? 'Complete Free Registration' 
                    : mode === 'admin' 
                      ? 'Sign In to Admin Portal' 
                      : 'Sign In to Student Portal'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Accounts Helper */}
        <div className="mt-5 pt-4 border-t border-slate-800 text-center">
          <span className="text-[11px] text-slate-500 block mb-2 font-medium">
            Quick fill test accounts:
          </span>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold transition-colors"
            >
              👑 Academy Director (Admin)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('student')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[10px] font-medium transition-colors"
            >
              👤 Free Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('pending')}
              className="px-2.5 py-1 rounded-lg bg-amber-950/60 hover:bg-amber-900/60 text-amber-400 border border-amber-500/30 text-[10px] font-medium transition-colors"
            >
              ⏳ Pending Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
