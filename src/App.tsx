import React, { useState, useEffect } from 'react';
import { TabType, User, ThemeMode } from './types';
import { COURSES as COURSE_MODULES } from './data/courses';
import { QUESTIONS as QUIZ_QUESTIONS } from './data/questions';
import { AUDIT_SCENARIOS } from './data/audit-scenarios';
import { DOMAINS } from './data/domains';
import { INTERVIEW_SCENARIOS } from './data/interview-questions';

import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { DashboardView } from './components/DashboardView';
import { CurriculumView } from './components/CurriculumView';
import { AssessmentView } from './components/AssessmentView';
import { AuditSimulatorView } from './components/AuditSimulatorView';
import { InterviewSimulatorView } from './components/InterviewSimulatorView';
import { DomainsView } from './components/DomainsView';
import { TutorView } from './components/TutorView';
import { ProgressView } from './components/ProgressView';
import { CertificateView } from './components/CertificateView';
import { AdminPortalView } from './components/AdminPortalView';
import { PaywallGate } from './components/PaywallGate';
import { AuthModal } from './components/AuthModal';
import { UserAccountModal } from './components/UserAccountModal';
import { ShieldCheck, Heart, ExternalLink, Lock } from 'lucide-react';
import { safeFetchJson } from './utils/safeApi';

export default function App() {
  // Default to 'home' on initial webpage open as strictly mandated
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [activeModuleContext, setActiveModuleContext] = useState<string | undefined>(undefined);
  const [activeAuditContext, setActiveAuditContext] = useState<string | undefined>(undefined);

  // Authentication State
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('qapro_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'admin'>('login');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Theme Management (Supports Ripe Lemon Light theme and Dark Pro theme)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('qapro_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return 'dark'; // Default theme
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    try {
      localStorage.setItem('qapro_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // User stats & progress metrics
  const [streakDays, setStreakDays] = useState(6);
  const [quizzesCompletedCount, setQuizzesCompletedCount] = useState(3);
  const [auditsCompletedCount, setAuditsCompletedCount] = useState(2);
  const [avgQuizScore, setAvgQuizScore] = useState(88);
  const [avgAuditScore, setAvgAuditScore] = useState(86);
  const [certReadiness, setCertReadiness] = useState(82);

  // Sync current user status with server (in case admin approved payment or toggled access)
  const refreshCurrentUser = async () => {
    if (!user?.id) return;
    try {
      const res = await safeFetchJson<User>(`/api/auth/users/current/${user.id}`);
      if (res.ok && res.data) {
        setUser(res.data);
        localStorage.setItem('qapro_user', JSON.stringify(res.data));
      }
    } catch (e) {
      console.warn('Could not sync current user profile with server', e);
    }
  };

  useEffect(() => {
    refreshCurrentUser();
  }, []);

  // Sync initial stats with backend if available
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await safeFetchJson<any>('/api/progress/summary');
        if (res.ok && res.data) {
          const data = res.data;
          if (data.quizzesTaken > 0) setQuizzesCompletedCount(data.quizzesTaken);
          if (data.auditsEvaluated > 0) setAuditsCompletedCount(data.auditsEvaluated);
          if (data.avgQuizScore > 0) setAvgQuizScore(data.avgQuizScore);
          if (data.avgAuditScore > 0) setAvgAuditScore(data.avgAuditScore);
          if (data.streakDays > 0) setStreakDays(data.streakDays);
          if (data.certReadiness > 0) setCertReadiness(data.certReadiness);
        }
      } catch (err) {
        console.warn('Backend progress summary offline, using client store', err);
      }
    };
    fetchSummary();
  }, []);

  const handleOpenAuth = (mode: 'login' | 'register' | 'admin' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('qapro_user', JSON.stringify(loggedInUser));
    // If admin signs in, direct to admin portal; if student signs in, direct to dashboard
    if (loggedInUser.role === 'admin') {
      setCurrentTab('admin');
    } else {
      setCurrentTab('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('qapro_user');
    setCurrentTab('home');
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('qapro_user', JSON.stringify(updatedUser));
  };

  const handleNavigate = (tab: TabType, context?: any) => {
    // If guest attempts to open any gated tab, intercept with auth modal
    if (!user && tab !== 'home' && tab !== 'verify') {
      handleOpenAuth(tab === 'admin' ? 'admin' : 'register');
      return;
    }

    setCurrentTab(tab);
    if (context?.moduleId) {
      setActiveModuleContext(context.moduleId);
    }
    if (context?.scenarioId) {
      setActiveAuditContext(context.scenarioId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizCompleted = (score: number, maxScore: number, percentage: number) => {
    setQuizzesCompletedCount(prev => prev + 1);
    setAvgQuizScore(prev => Math.round((prev + percentage) / 2));
    setCertReadiness(prev => Math.min(100, prev + 5));
  };

  const handleAuditCompleted = (score: number, maxScore: number, percentage: number) => {
    setAuditsCompletedCount(prev => prev + 1);
    setAvgAuditScore(prev => Math.round((prev + percentage) / 2));
    setCertReadiness(prev => Math.min(100, prev + 6));
  };

  // Helper check for practice pass
  const hasPracticePass = user?.access?.hasPracticePass || user?.role === 'admin';
  const hasCertification = user?.access?.hasCertification || user?.role === 'admin';

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'light-theme bg-[#D6F144] text-slate-900' : 'bg-slate-950 text-slate-100'} flex flex-col font-sans transition-colors duration-200`}>
      {/* Sticky Top Header Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleNavigate}
        streakDays={streakDays}
        certReadiness={certReadiness}
        user={user}
        onOpenAuth={handleOpenAuth}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onUpgradeClick={(pkg) => {
          if (pkg === 'practice_pass') setCurrentTab('audits');
          else setCurrentTab('certificates');
        }}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* 1. Public Homepage (Default view for anyone opening the webpage) */}
        {currentTab === 'home' && (
          <HomeView
            modules={COURSE_MODULES}
            onOpenAuth={handleOpenAuth}
            onNavigateToVerify={() => setCurrentTab('verify')}
          />
        )}

        {/* 2. Free Tier Gated: Dashboard */}
        {currentTab === 'dashboard' && (
          user ? (
            <DashboardView
              onNavigate={handleNavigate}
              modules={COURSE_MODULES}
              audits={AUDIT_SCENARIOS}
              quizzesCompletedCount={quizzesCompletedCount}
              auditsCompletedCount={auditsCompletedCount}
              avgQuizScore={avgQuizScore}
              avgAuditScore={avgAuditScore}
            />
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white font-heading">
                Student Login Required
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                You must log in to your registered student account to access the progress dashboard.
              </p>
              <button
                onClick={() => handleOpenAuth('login')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Sign In to Student Dashboard
              </button>
            </div>
          )
        )}

        {/* 3. Free Tier Gated: Curriculum */}
        {currentTab === 'courses' && (
          user ? (
            <CurriculumView
              modules={COURSE_MODULES}
              initialModuleId={activeModuleContext}
              onTakeQuiz={(moduleId) => {
                setActiveModuleContext(moduleId);
                setCurrentTab('assessments');
              }}
            />
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white font-heading">
                Student Registration Required
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Register a free student account to unlock all 12 modules, 23 lessons, and formula calculators.
              </p>
              <button
                onClick={() => handleOpenAuth('register')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Register Free for Curriculum
              </button>
            </div>
          )
        )}

        {/* 4. Tier 2 (INR 1,000 Practice Pass Gated): Audit Simulator */}
        {currentTab === 'audits' && (
          !user ? (
            <div className="text-center py-16 space-y-4">
              <Lock className="w-8 h-8 text-amber-400 mx-auto" />
              <h2 className="text-lg font-bold text-white">Login Required for Audit Simulator</h2>
              <button onClick={() => handleOpenAuth('login')} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold">
                Sign In
              </button>
            </div>
          ) : !hasPracticePass ? (
            <PaywallGate
              requiredPackage="practice_pass"
              user={user}
              onPaymentSubmitted={handleUserUpdate}
              featureTitle="Multi-Channel QA Audit Simulator (Locked)"
              featureDescription="Access 5 real call center recordings with 16kHz audio waveform playback, speaker diarization transcripts, auto-fail fatal error tags, and master calibration scoring. Requires INR 1,000 QA Practice Pass and manual admin activation."
            />
          ) : (
            <AuditSimulatorView
              scenarios={AUDIT_SCENARIOS}
              initialScenarioId={activeAuditContext}
              onAuditCompleted={handleAuditCompleted}
            />
          )
        )}

        {/* 5. Tier 2 (INR 1,000 Practice Pass Gated): AI Interviewer */}
        {currentTab === 'interviews' && (
          !user ? (
            <div className="text-center py-16 space-y-4">
              <Lock className="w-8 h-8 text-amber-400 mx-auto" />
              <h2 className="text-lg font-bold text-white">Login Required for AI Interviewer</h2>
              <button onClick={() => handleOpenAuth('login')} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold">
                Sign In
              </button>
            </div>
          ) : !hasPracticePass ? (
            <PaywallGate
              requiredPackage="practice_pass"
              user={user}
              onPaymentSubmitted={handleUserUpdate}
              featureTitle="AI Virtual Interview Simulator (Locked)"
              featureDescription="Practice live BPO & Tech QA job interview rounds evaluated by Gemini AI across Junior Analyst, Senior Auditor, Quality Team Lead, and QA Operations Manager tracks. Requires INR 1,000 QA Practice Pass and manual admin activation."
            />
          ) : (
            <InterviewSimulatorView
              scenarios={INTERVIEW_SCENARIOS}
            />
          )
        )}

        {/* 6. Tier 2 (INR 1,000 Practice Pass Gated): 27 Domains */}
        {currentTab === 'domains' && (
          !user ? (
            <div className="text-center py-16 space-y-4">
              <Lock className="w-8 h-8 text-amber-400 mx-auto" />
              <h2 className="text-lg font-bold text-white">Login Required for 27 Domains Atlas</h2>
              <button onClick={() => handleOpenAuth('login')} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold">
                Sign In
              </button>
            </div>
          ) : !hasPracticePass ? (
            <PaywallGate
              requiredPackage="practice_pass"
              user={user}
              onPaymentSubmitted={handleUserUpdate}
              featureTitle="27 BPO & Tech Domain Specializations (Locked)"
              featureDescription="Comprehensive operational guides for FinTech, Healthcare HIPAA, SaaS, E-Commerce, Trust & Safety, Travel, Logistics, and Gaming QA. Requires INR 1,000 QA Practice Pass and manual admin activation."
            />
          ) : (
            <DomainsView
              domains={DOMAINS}
              onSelectDomainForAudit={(domainName) => {
                setCurrentTab('audits');
              }}
            />
          )
        )}

        {/* 7. Tier 2 (INR 1,000 Practice Pass Gated): AI QA Tutor */}
        {currentTab === 'tutor' && (
          !user ? (
            <div className="text-center py-16 space-y-4">
              <Lock className="w-8 h-8 text-amber-400 mx-auto" />
              <h2 className="text-lg font-bold text-white">Login Required for AI QA Tutor</h2>
              <button onClick={() => handleOpenAuth('login')} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold">
                Sign In
              </button>
            </div>
          ) : !hasPracticePass ? (
            <PaywallGate
              requiredPackage="practice_pass"
              user={user}
              onPaymentSubmitted={handleUserUpdate}
              featureTitle="AI Master QA Director Tutor (Locked)"
              featureDescription="24/7 dedicated AI coaching from Coach Avery (Senior QA Director) for calibration variance calculations, coaching roleplays, and compliance audits. Requires INR 1,000 QA Practice Pass and manual admin activation."
            />
          ) : (
            <TutorView />
          )
        )}

        {/* 8. Tier 2 (INR 1,000 Practice Pass Gated): Quizzes & Assessments */}
        {currentTab === 'assessments' && (
          !user ? (
            <div className="text-center py-16 space-y-4">
              <Lock className="w-8 h-8 text-amber-400 mx-auto" />
              <h2 className="text-lg font-bold text-white">Login Required for Quizzes</h2>
              <button onClick={() => handleOpenAuth('login')} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold">
                Sign In
              </button>
            </div>
          ) : !hasPracticePass ? (
            <PaywallGate
              requiredPackage="practice_pass"
              user={user}
              onPaymentSubmitted={handleUserUpdate}
              featureTitle="Practice Assessments & Question Bank (Locked)"
              featureDescription="Interactive test question bank with 40+ scenario questions, instant rationales, and category mastery scoring. Requires INR 1,000 QA Practice Pass and manual admin activation."
            />
          ) : (
            <AssessmentView
              questions={QUIZ_QUESTIONS}
              modules={COURSE_MODULES}
              initialModuleId={activeModuleContext}
              onQuizCompleted={handleQuizCompleted}
              onNavigateToCourse={(moduleId) => {
                setActiveModuleContext(moduleId);
                setCurrentTab('courses');
              }}
            />
          )
        )}

        {/* 9. Progress Tracking */}
        {currentTab === 'progress' && (
          user ? (
            <ProgressView
              onNavigate={handleNavigate}
              streakDays={streakDays}
              quizzesCompletedCount={quizzesCompletedCount}
              auditsCompletedCount={auditsCompletedCount}
              avgQuizScore={avgQuizScore}
              avgAuditScore={avgAuditScore}
            />
          ) : (
            <div className="text-center py-16 space-y-4">
              <Lock className="w-8 h-8 text-indigo-400 mx-auto" />
              <h2 className="text-lg font-bold text-white">Login Required for Progress View</h2>
              <button onClick={() => handleOpenAuth('login')} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold">
                Sign In
              </button>
            </div>
          )
        )}

        {/* 10. Tier 3 (INR 1,500 Certification Gated): Credentials */}
        {/* 10. Public Credential Verification Portal (Accessible to all visitors & students) */}
        {(currentTab === 'certificates' || currentTab === 'verify') && (
          <CertificateView />
        )}

        {/* 12. Administrator Portal (Exclusive to Director / Admin role) */}
        {currentTab === 'admin' && (
          user?.role === 'admin' ? (
            <AdminPortalView
              currentAdminEmail={user.email}
              onUserAccessChanged={refreshCurrentUser}
            />
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white font-heading">
                Administrator Access Required
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                The Admin Portal is reserved for the Academy Director & QA Leadership. Please sign in with your administrator credentials.
              </p>
              <button
                onClick={() => handleOpenAuth('admin')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md"
              >
                Sign In to Admin Portal
              </button>
            </div>
          )
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-400">QAPro Academy</span>
            <span>•</span>
            <span>Certified Quality Assurance Professional (CQAP™) Standard</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleNavigate('home')} 
              className="hover:text-slate-300 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigate('courses')} 
              className="hover:text-slate-300 transition-colors"
            >
              Curriculum (Free)
            </button>
            <button 
              onClick={() => handleNavigate('audits')} 
              className="hover:text-slate-300 transition-colors"
            >
              Practice Pass (₹1,000)
            </button>
            <button 
              onClick={() => handleNavigate('certificates')} 
              className="hover:text-slate-300 transition-colors"
            >
              Certification (₹1,500)
            </button>
            <button 
              onClick={() => handleNavigate('verify')} 
              className="hover:text-slate-300 transition-colors"
            >
              Verify Credential
            </button>
            {user?.role === 'admin' ? (
              <button 
                onClick={() => handleNavigate('admin')} 
                className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              >
                Admin Portal
              </button>
            ) : (
              <button 
                onClick={() => handleOpenAuth('admin')} 
                className="hover:text-slate-400 transition-colors"
              >
                Admin Login
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Auth Modal (Register / Login / Admin) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authModalMode}
      />

      {/* User Account / Profile Modal */}
      {user && (
        <UserAccountModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          user={user}
          onLogout={handleLogout}
          onUpgradeClick={(pkg) => {
            if (pkg === 'practice_pass') setCurrentTab('audits');
            else setCurrentTab('certificates');
          }}
        />
      )}
    </div>
  );
}
