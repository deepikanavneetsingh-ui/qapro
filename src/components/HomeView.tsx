import React from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Headphones, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Globe2, 
  Bot, 
  Lock, 
  Check, 
  Clock, 
  HelpCircle,
  QrCode
} from 'lucide-react';
import { CourseModule } from '../types';

interface HomeViewProps {
  modules: CourseModule[];
  onOpenAuth: (mode: 'login' | 'register' | 'admin') => void;
  onNavigateToVerify: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  modules,
  onOpenAuth,
  onNavigateToVerify
}) => {
  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative pt-6 sm:pt-12 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Accredited Global QA Standard • CQAP™ 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.15]">
          Master Contact Center <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-emerald-300 to-teal-200">
            Quality Assurance & Calibration
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          The premier professional training and simulation ecosystem for QA Analysts, Team Leaders, and CX Operations Managers. Register today to access the official curriculum and progress dashboard.
        </p>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onOpenAuth('register')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 group"
          >
            <span>Register Free Student Account</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => onOpenAuth('login')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all border border-slate-700 flex items-center justify-center gap-2"
          >
            <span>Student Portal Sign In</span>
          </button>
        </div>

        {/* Free access notice pill */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Registration includes instant free access to Student Dashboard & 12 Curriculum Modules.</span>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-heading">12 Master Curriculum Modules</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            23 in-depth lessons covering QA lifecycle, fatal compliance errors, calibration variance math, DMAIC root cause analysis, and SBI coaching frameworks.
          </p>
          <span className="inline-block text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Free with Registration
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Headphones className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-heading">Multi-Channel QA Simulator</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Real contact center calls with 16kHz audio waveform playback, synced customer transcripts, and master benchmark calibration scoring.
          </p>
          <span className="inline-block text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            Practice Pass • INR 1,000
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-heading">CQAP™ Official Credential</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Certified Quality Assurance Professional credential with accredited digital badge, printable diploma, and public verification registry entry.
          </p>
          <span className="inline-block text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Certification Fee • INR 1,500
          </span>
        </div>
      </div>

      {/* Transparent Access & Pricing Tiers */}
      <div id="pricing" className="space-y-6 pt-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">
            Transparent Access Structure
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Choose Your Learning Path
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Start free with the complete curriculum. Upgrade to the live simulator suite and official credential exam whenever you are ready.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 items-stretch">
          {/* Tier 1: Free Registration */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold">
                  Free Student Tier
                </span>
                <span className="text-xs text-slate-400 font-medium">Instant Access</span>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white font-heading">₹0</span>
                  <span className="text-xs text-slate-400">Free forever</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Complete access to training lessons and student dashboard upon registration.
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-300 border-t border-slate-800">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Student Analytics & Progress Dashboard</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>All 12 Comprehensive Curriculum Modules (23 Lessons)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Interactive Formulas (FCR, CSAT, NPS, Variance)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>SBI Coaching Model & Rubric Methodology Guides</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-500">
                  <Lock className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                  <span>Audit & Audio Waveform Simulator (Locked)</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-500">
                  <Lock className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                  <span>AI Virtual Interview Simulator (Locked)</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-500">
                  <Lock className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                  <span>Official CQAP™ Examination & Credential (Locked)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenAuth('register')}
              className="mt-8 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors border border-slate-700"
            >
              Register Free Account
            </button>
          </div>

          {/* Tier 2: Practice Pass (INR 1,000) */}
          <div className="bg-slate-900 border-2 border-indigo-500/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative shadow-xl shadow-indigo-600/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
              Most Popular for Job Seekers
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                  QA Practice & Simulator Pass
                </span>
                <span className="text-xs text-amber-400 font-medium">Manual Activation</span>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white font-heading">₹1,000</span>
                  <span className="text-xs text-slate-400">INR One-Time</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Full hands-on simulation tools to clear BPO & Tech QA interviews.
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-300 border-t border-slate-800">
                <div className="flex items-start gap-2.5 font-medium text-white">
                  <Check className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Everything in Free Student Tier, plus:</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>5 Multi-Channel QA Audits with 16kHz Audio & Transcripts</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Master Benchmark Calibration Variance Calculator</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>AI Virtual Interview Simulator with Gemini Feedback</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>27 BPO & Tech Domain Specialization Atlas</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>24/7 AI Master QA Director Tutor ("Coach Avery")</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Full Practice Quizzes & Exam Question Bank (40+ Questions)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenAuth('login')}
              className="mt-8 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/25"
            >
              Sign In to Pay INR 1,000
            </button>
          </div>

          {/* Tier 3: Official CQAP Certification (INR 1,500) */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  Official CQAP™ Certification
                </span>
                <span className="text-xs text-amber-400 font-medium">Manual Activation</span>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white font-heading">₹1,500</span>
                  <span className="text-xs text-slate-400">INR One-Time</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Official evaluation, credential issuance, and public ledger validation.
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-300 border-t border-slate-800">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Official Proctored CQAP™ Comprehensive Examination</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Certified Quality Assurance Professional Digital Diploma</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Accreditation Seal with Unique Credential Code</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Permanent Public Registry Verification for Employers</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>PDF Export & High-Resolution Print Ready Formatting</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenAuth('login')}
              className="mt-8 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors border border-slate-700"
            >
              Sign In to Pay INR 1,500
            </button>
          </div>
        </div>
      </div>

      {/* Manual Activation Process Notice */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white font-heading">
            How Manual Activation Works
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs mb-2">
              1
            </span>
            <div className="font-semibold text-white">Register Account</div>
            <div className="text-slate-400">Sign up with your email and name to get immediate access to Dashboard & Curriculum.</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs mb-2">
              2
            </span>
            <div className="font-semibold text-white">Transfer Fees</div>
            <div className="text-slate-400">Transfer INR 1,000 or INR 1,500 via UPI (Google Pay, PhonePe, Paytm) or Bank IMPS.</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs mb-2">
              3
            </span>
            <div className="font-semibold text-white">Submit 12-digit UTR</div>
            <div className="text-slate-400">Enter your UPI / Bank reference number in the student portal upgrade form.</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs mb-2">
              4
            </span>
            <div className="font-semibold text-white">Admin Activates</div>
            <div className="text-slate-400">The Academy Administrator verifies payment and manually activates your tools within 1-2 hours.</div>
          </div>
        </div>
      </div>

      {/* Curriculum Syllabus Preview */}
      <div className="space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
              Complete Syllabus
            </span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">
              Curriculum Roadmap Preview (12 Modules)
            </h2>
          </div>

          <button
            onClick={() => onOpenAuth('register')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
          >
            <span>Register to unlock all 23 lessons</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => (
            <div 
              key={m.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2.5 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  Module {m.number}
                </span>
                <span className="text-[11px] text-slate-400">{m.totalDurationHours} hrs • {m.lessons.length} Lessons</span>
              </div>

              <h4 className="text-sm font-bold text-white font-heading line-clamp-1">
                {m.title}
              </h4>

              <p className="text-xs text-slate-400 line-clamp-2">
                {m.shortDescription}
              </p>

              <div className="pt-2 flex items-center justify-between text-[11px] text-emerald-400 border-t border-slate-800/80">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Free with Registration</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Public Credential Verification Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left max-w-xl">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Public Verification Registry</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
            Verify an Existing CQAP™ Credential
          </h3>
          <p className="text-xs text-slate-300">
            Employers, clients, and partners can authenticate any QAPro certificate instantly using its unique credential ID.
          </p>
        </div>

        <button
          onClick={onNavigateToVerify}
          className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors border border-slate-700 whitespace-nowrap shadow-md"
        >
          Open Credential Verification
        </button>
      </div>
    </div>
  );
};
