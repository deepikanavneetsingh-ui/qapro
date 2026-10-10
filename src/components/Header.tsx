import React from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  CheckSquare, 
  Headphones, 
  Users, 
  Globe2, 
  Bot, 
  BarChart3, 
  Award, 
  Flame, 
  Search,
  Home,
  Lock,
  User as UserIcon,
  Crown,
  KeyRound,
  Sparkles,
  ArrowRight,
  Sun,
  Moon
} from 'lucide-react';
import { TabType, User, ThemeMode } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  streakDays: number;
  certReadiness: number;
  user: User | null;
  onOpenAuth: (mode: 'login' | 'register' | 'admin') => void;
  onOpenProfile: () => void;
  onUpgradeClick?: (pkg: 'practice_pass' | 'certification') => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  streakDays,
  certReadiness,
  user,
  onOpenAuth,
  onOpenProfile,
  onUpgradeClick,
  theme,
  onToggleTheme
}) => {
  // Navigation items when logged in
  const loggedInNavItems: { 
    id: TabType; 
    label: string; 
    icon: React.ComponentType<{ className?: string }>;
    locked?: boolean;
    tierLabel?: string;
  }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'courses', label: 'Curriculum', icon: BookOpen },
    { 
      id: 'audits', 
      label: 'Audit Simulator', 
      icon: Headphones,
      locked: !user?.access?.hasPracticePass,
      tierLabel: '₹1k'
    },
    { 
      id: 'interviews', 
      label: 'AI Interviewer', 
      icon: Users,
      locked: !user?.access?.hasPracticePass,
      tierLabel: '₹1k'
    },
    { 
      id: 'domains', 
      label: '27 Domains', 
      icon: Globe2,
      locked: !user?.access?.hasPracticePass,
      tierLabel: '₹1k'
    },
    { 
      id: 'tutor', 
      label: 'AI QA Tutor', 
      icon: Bot,
      locked: !user?.access?.hasPracticePass,
      tierLabel: '₹1k'
    },
    { 
      id: 'assessments', 
      label: 'Quizzes', 
      icon: CheckSquare,
      locked: !user?.access?.hasPracticePass,
      tierLabel: '₹1k'
    },
    { 
      id: 'verify', 
      label: 'Verify Credential', 
      icon: Search,
      locked: false
    },
  ];

  if (user?.role === 'admin') {
    loggedInNavItems.push({
      id: 'admin',
      label: 'Admin Portal',
      icon: Crown,
      locked: false
    });
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => onSelectTab(user ? 'home' : 'home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-indigo-400 group-hover:text-emerald-400 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-xl tracking-tight text-white">
                  QA<span className="text-emerald-400">Pro</span>
                </span>
                <span className="text-xs uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Academy
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Certified Quality Assurance Professional (CQAP™)
              </p>
            </div>
          </div>

          {/* Right Actions: Authenticated vs Public Guest */}
          {user ? (
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Streak Badge */}
              <div 
                title="Daily Active Learning Streak"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="font-bold">{streakDays}d Streak</span>
              </div>

              {/* Admin quick access button if admin */}
              {user.role === 'admin' ? (
                <button
                  onClick={() => onSelectTab('admin')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    currentTab === 'admin'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                      : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/60'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5 text-amber-300" />
                  <span>Admin Portal</span>
                </button>
              ) : (
                /* Upgrade button if practice pass not active */
                !user.access.hasPracticePass && onUpgradeClick && (
                  <button
                    onClick={() => onUpgradeClick('practice_pass')}
                    className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Unlock Practice (₹1,000)</span>
                  </button>
                )
              )}

              {/* Verification portal link */}
              <button
                onClick={() => onSelectTab('verify')}
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors border border-slate-700"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Verify</span>
              </button>

              {/* Light Theme Toggle Button */}
              <button
                onClick={onToggleTheme}
                type="button"
                aria-label={theme === 'light' ? 'Switch to Dark Pro theme' : 'Switch to Ripe Lemon Light theme'}
                title={theme === 'light' ? 'Active: Ripe Lemon Light Theme. Click for Dark Mode' : 'Active: Dark Pro Theme. Click for Ripe Lemon Light Theme'}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  theme === 'light'
                    ? 'bg-[#CBE828] text-slate-900 border-[#B2D41B] shadow-sm hover:bg-[#C2E020]'
                    : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700 hover:text-amber-200 hover:border-slate-600'
                }`}
              >
                {theme === 'light' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-600 fill-amber-400" />
                    <span className="hidden sm:inline font-bold text-slate-900">Lemon Light</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline text-slate-300 font-medium">Light Theme</span>
                  </>
                )}
              </button>

              {/* User Profile Pill */}
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-white transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-[11px]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate hidden sm:inline">{user.name.split(' ')[0]}</span>
                {user.role === 'admin' ? (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">ADMIN</span>
                ) : user.access.hasPracticePass ? (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">PRO</span>
                ) : (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-700 text-slate-300">FREE</span>
                )}
              </button>
            </div>
          ) : (
            /* Guest public visitors */
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => onSelectTab('verify')}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white text-xs font-medium transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Verify Credential</span>
              </button>

              <button
                onClick={() => onOpenAuth('admin')}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors"
                title="Administrator Sign In"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>

              {/* Light Theme Toggle Button */}
              <button
                onClick={onToggleTheme}
                type="button"
                aria-label={theme === 'light' ? 'Switch to Dark Pro theme' : 'Switch to Ripe Lemon Light theme'}
                title={theme === 'light' ? 'Active: Ripe Lemon Light Theme. Click for Dark Mode' : 'Active: Dark Pro Theme. Click for Ripe Lemon Light Theme'}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  theme === 'light'
                    ? 'bg-[#CBE828] text-slate-900 border-[#B2D41B] shadow-sm hover:bg-[#C2E020]'
                    : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700 hover:text-amber-200 hover:border-slate-600'
                }`}
              >
                {theme === 'light' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-600 fill-amber-400" />
                    <span className="hidden sm:inline font-bold text-slate-900">Lemon Light</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline text-slate-300 font-medium">Light Theme</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
              >
                Sign In
              </button>

              <button
                onClick={() => onOpenAuth('register')}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1"
              >
                <span>Register Free</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Sub-Bar */}
      <div className="bg-slate-950/80 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none items-center">
            {user ? (
              loggedInNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                const isLocked = item.locked;

                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-150 ${
                      isActive
                        ? item.id === 'admin' 
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                        : isLocked
                          ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/80'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : isLocked ? 'text-slate-500' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                    {isLocked && (
                      <span className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                        <Lock className="w-2.5 h-2.5" />
                        <span>{item.tierLabel}</span>
                      </span>
                    )}
                  </button>
                );
              })
            ) : (
              /* Guest Navigation */
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => onSelectTab('home')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 font-medium rounded-lg ${
                    currentTab === 'home' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Homepage</span>
                </button>

                <button
                  onClick={() => onOpenAuth('register')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-slate-400 hover:text-white font-medium"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>12-Module Curriculum (Free with Registration)</span>
                </button>

                <button
                  onClick={() => onOpenAuth('register')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-slate-400 hover:text-white font-medium"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Student Dashboard (Requires Login)</span>
                </button>

                <button
                  onClick={() => onSelectTab('verify')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 font-medium rounded-lg ${
                    currentTab === 'verify' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Public Certificate Verification</span>
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
