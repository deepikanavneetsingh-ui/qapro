import React from 'react';
import { 
  BarChart3, 
  Flame, 
  Award, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Headphones, 
  Sparkles,
  TrendingUp,
  Target
} from 'lucide-react';
import { TabType } from '../types';

interface ProgressViewProps {
  onNavigate: (tab: TabType) => void;
  streakDays: number;
  quizzesCompletedCount: number;
  auditsCompletedCount: number;
  avgQuizScore: number;
  avgAuditScore: number;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  onNavigate,
  streakDays,
  quizzesCompletedCount,
  auditsCompletedCount,
  avgQuizScore,
  avgAuditScore
}) => {
  const competencies = [
    { name: 'Regulatory Compliance & Fatal Protocols', score: 94, target: '100% Zero Tolerance', status: 'Mastered' },
    { name: 'Calibration Accuracy & Gauge R&R', score: 90, target: '±5% Variance', status: 'Proficient' },
    { name: 'Root Cause Analysis & DMAIC Problem Solving', score: 86, target: '80% Benchmark', status: 'Proficient' },
    { name: 'Transactional Coaching (SBI Model)', score: 88, target: '85% Benchmark', status: 'Proficient' },
    { name: 'Omnichannel & Concurrency Auditing', score: 82, target: '80% Benchmark', status: 'Competent' }
  ];

  const badges = [
    {
      title: 'Zero-Defect Auditor',
      description: 'Accurately detected fatal compliance breaches without false passes.',
      icon: ShieldCheck,
      unlocked: true,
      color: 'emerald'
    },
    {
      title: 'Master Calibrator',
      description: 'Maintained less than ±4% variance against master benchmark ratings.',
      icon: Target,
      unlocked: true,
      color: 'indigo'
    },
    {
      title: 'Executive Interview Ready',
      description: 'Completed leadership interview simulations evaluated by AI panel.',
      icon: Sparkles,
      unlocked: true,
      color: 'purple'
    },
    {
      title: 'Industry Specialist',
      description: 'Reviewed and analyzed 10+ BPO domain operating models.',
      icon: Award,
      unlocked: true,
      color: 'amber'
    }
  ];

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider border border-emerald-500/20">
              Auditor Performance & Competencies
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-2">
              Performance Analytics & Mastery
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Track your calibrated grading consistency, regulatory knowledge, and certification readiness against international contact center benchmarks.
            </p>
          </div>

          <button
            onClick={() => onNavigate('certificates')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center gap-2 self-start md:self-auto"
          >
            <Award className="w-4 h-4" />
            <span>View CQAP™ Credential</span>
          </button>
        </div>
      </div>

      {/* 4 Key Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Learning Consistency</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">{streakDays} Days</div>
          <div className="text-xs text-emerald-400 mt-1">Active Daily Streak</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Quizzes Attempted</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">{quizzesCompletedCount}</div>
          <div className="text-xs text-slate-400 mt-1">Avg Score: {avgQuizScore}%</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Audits Completed</span>
            <Headphones className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white">{auditsCompletedCount}</div>
          <div className="text-xs text-slate-400 mt-1">Calibration: ±2.8% Variance</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Study Investment</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">24.5 hrs</div>
          <div className="text-xs text-purple-400 mt-1">Estimated On-Platform</div>
        </div>
      </div>

      {/* Competencies Progress Bars */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white font-heading">
            QA Core Competency Matrix
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Measured against global Quality Assurance standards (COPC, ISO 9001, Six Sigma).
          </p>
        </div>

        <div className="space-y-4">
          {competencies.map((comp, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{comp.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-[11px] font-mono">{comp.target}</span>
                  <span className="font-bold text-emerald-400 font-mono">{comp.score}%</span>
                </div>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-2 rounded-full" 
                  style={{ width: `${comp.score}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white font-heading">
            Earned Quality Badges & Milestones
          </h2>
          <p className="text-xs text-slate-400">
            Credentials verifying specific operational and audit mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <div 
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white text-sm">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {b.description}
                </p>
                <div className="pt-2 text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Earned</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
