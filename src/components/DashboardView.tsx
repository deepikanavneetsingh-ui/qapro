import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckSquare, 
  Headphones, 
  Users, 
  Award, 
  ArrowRight, 
  Sparkles, 
  Calculator, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Flame,
  Globe2,
  Bot
} from 'lucide-react';
import { TabType, CourseModule, AuditScenario } from '../types';

interface DashboardViewProps {
  onNavigate: (tab: TabType, context?: any) => void;
  modules: CourseModule[];
  audits: AuditScenario[];
  quizzesCompletedCount: number;
  auditsCompletedCount: number;
  avgQuizScore: number;
  avgAuditScore: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  modules,
  audits,
  quizzesCompletedCount,
  auditsCompletedCount,
  avgQuizScore,
  avgAuditScore
}) => {
  // Quick interactive QA formula mini-calculator state
  const [calcType, setCalcType] = useState<'variance' | 'fcr' | 'nps'>('variance');
  const [calcInput1, setCalcInput1] = useState<number>(92);
  const [calcInput2, setCalcInput2] = useState<number>(86);

  const calculateResult = () => {
    if (calcType === 'variance') {
      const diff = Math.abs(calcInput1 - calcInput2);
      const isWithinTolerance = diff <= 5;
      return {
        val: `${diff.toFixed(1)}%`,
        status: isWithinTolerance ? 'Within ±5% Tolerance (Pass)' : 'Exceeds Tolerance (Re-calibrate)',
        pass: isWithinTolerance,
        formula: '|Auditor Score - Master Benchmark|'
      };
    } else if (calcType === 'fcr') {
      const resolved = Math.min(calcInput1, calcInput2);
      const total = Math.max(calcInput1, calcInput2, 1);
      const fcr = (resolved / total) * 100;
      return {
        val: `${fcr.toFixed(1)}%`,
        status: fcr >= 80 ? 'World-Class Target Met (≥80%)' : 'Below Target (<80%)',
        pass: fcr >= 80,
        formula: '(First Contact Resolved / Total Inquiries) × 100'
      };
    } else {
      const promoters = calcInput1;
      const detractors = calcInput2;
      const nps = promoters - detractors;
      return {
        val: `${nps > 0 ? '+' : ''}${nps}`,
        status: nps >= 50 ? 'Excellent Customer Loyalty' : 'Needs CX Improvement',
        pass: nps >= 30,
        formula: '% Promoters (9-10) - % Detractors (0-6)'
      };
    }
  };

  const calcResult = calculateResult();

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-slate-800 p-6 sm:p-8">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Certified Quality Assurance Professional (CQAP™) Program</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Master the Craft of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Quality Assurance</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Elevate from subjective grading to operational excellence. Complete 12 specialized QA modules, practice real call & chat audit simulations with master calibration benchmarks, and earn your globally recognized credential.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('courses')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-md shadow-indigo-600/20"
            >
              <BookOpen className="w-4 h-4" />
              <span>Continue Curriculum</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('audits')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-all border border-slate-700"
            >
              <Headphones className="w-4 h-4 text-emerald-400" />
              <span>Launch Audit Simulator</span>
            </button>

            <button
              onClick={() => onNavigate('tutor')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-indigo-300 font-medium text-sm transition-all border border-indigo-500/30"
            >
              <Bot className="w-4 h-4 text-indigo-400" />
              <span>Ask AI QA Director</span>
            </button>
          </div>
        </div>

        {/* Ambient subtle glow background */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-semibold tracking-wider">Curriculum</span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white">12 Modules</div>
          <div className="text-xs text-slate-400 mt-1">23 Lessons • 45+ Learning Hours</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-semibold tracking-wider">Quiz Average</span>
            <CheckSquare className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">{avgQuizScore}%</div>
          <div className="text-xs text-slate-400 mt-1">{quizzesCompletedCount} Quizzes Attempted (80% Pass)</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-semibold tracking-wider">Audit Evaluations</span>
            <Headphones className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{auditsCompletedCount} Audits</div>
          <div className="text-xs text-slate-400 mt-1">Avg Calibration Variance: ±2.8%</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-semibold tracking-wider">Specializations</span>
            <Globe2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">27 Domains</div>
          <div className="text-xs text-slate-400 mt-1">Healthcare, FinTech, SaaS, Retail</div>
        </div>
      </div>

      {/* Main Core Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols wide on desktop): Quick Learning Tracks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white font-heading">Core Training Tracks</h2>
            <button 
              onClick={() => onNavigate('courses')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>View All 12 Modules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.slice(0, 4).map((mod) => (
              <div 
                key={mod.id}
                onClick={() => onNavigate('courses', { moduleId: mod.id })}
                className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg hover:shadow-indigo-500/5 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Module {mod.number}
                  </span>
                  <span className="text-xs text-slate-400">{mod.totalDurationHours} hrs</span>
                </div>
                <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                  {mod.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {mod.shortDescription}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>{mod.lessons.length} Lessons</span>
                  <span className="text-indigo-400 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Start <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Simulation Highlights */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-heading">Interactive QA Audit Lab</h3>
                <p className="text-xs text-slate-400">Evaluate realistic multi-channel interactions against official calibration rubrics.</p>
              </div>
              <button 
                onClick={() => onNavigate('audits')}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
              >
                Launch Simulator
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {audits.slice(0, 2).map((audit) => (
                <div 
                  key={audit.id}
                  onClick={() => onNavigate('audits', { scenarioId: audit.id })}
                  className="bg-slate-950 border border-slate-800/80 rounded-lg p-3.5 hover:border-slate-700 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">{audit.channel}</span>
                    <span className="text-slate-400">{audit.duration}</span>
                  </div>
                  <h4 className="text-sm font-medium text-white truncate">{audit.title}</h4>
                  <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
                    <span>{audit.domain}</span>
                    <span className="text-emerald-400 font-medium">Master: {audit.benchmarkScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: QA Interactive Formula Lab & Certification Readiness */}
        <div className="space-y-6">
          {/* Certification Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white font-heading">CQAP™ Certification</h3>
              <Award className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Modules Completed</span>
                </div>
                <span className="font-semibold text-white">4 / 12</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '33%' }}></div>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Quizzes Passed (≥80%)</span>
                </div>
                <span className="font-semibold text-white">{quizzesCompletedCount} / 5</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (quizzesCompletedCount / 5) * 100)}%` }}></div>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Calibrated Audits</span>
                </div>
                <span className="font-semibold text-white">{auditsCompletedCount} / 3</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (auditsCompletedCount / 3) * 100)}%` }}></div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('certificates')}
              className="w-full py-2.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors text-center"
            >
              View Credential & Verification Portal
            </button>
          </div>

          {/* Interactive Formula Sandbox */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-indigo-400" />
                <h3 className="text-base font-bold text-white font-heading">QA Metric Calculator</h3>
              </div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 px-2 py-0.5 rounded bg-slate-800">
                Live Tool
              </span>
            </div>

            {/* Formula Type Pills */}
            <div className="flex gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => { setCalcType('variance'); setCalcInput1(92); setCalcInput2(86); }}
                className={`flex-1 py-1 rounded font-medium transition-colors ${calcType === 'variance' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Calibration
              </button>
              <button
                onClick={() => { setCalcType('fcr'); setCalcInput1(820); setCalcInput2(1000); }}
                className={`flex-1 py-1 rounded font-medium transition-colors ${calcType === 'fcr' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                FCR Rate
              </button>
              <button
                onClick={() => { setCalcType('nps'); setCalcInput1(65); setCalcInput2(15); }}
                className={`flex-1 py-1 rounded font-medium transition-colors ${calcType === 'nps' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                NPS
              </button>
            </div>

            {/* Dynamic Inputs */}
            <div className="space-y-3 text-xs">
              {calcType === 'variance' && (
                <>
                  <div>
                    <label className="text-slate-400 block mb-1">Auditor Score (%): {calcInput1}%</label>
                    <input 
                      type="range" 
                      min="50" 
                      max="100" 
                      value={calcInput1} 
                      onChange={(e) => setCalcInput1(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Master Benchmark Score (%): {calcInput2}%</label>
                    <input 
                      type="range" 
                      min="50" 
                      max="100" 
                      value={calcInput2} 
                      onChange={(e) => setCalcInput2(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </>
              )}

              {calcType === 'fcr' && (
                <>
                  <div>
                    <label className="text-slate-400 block mb-1">Inquiries Resolved on 1st Contact: {calcInput1}</label>
                    <input 
                      type="number" 
                      value={calcInput1} 
                      onChange={(e) => setCalcInput1(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Total Inbound Volume: {calcInput2}</label>
                    <input 
                      type="number" 
                      value={calcInput2} 
                      onChange={(e) => setCalcInput2(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                    />
                  </div>
                </>
              )}

              {calcType === 'nps' && (
                <>
                  <div>
                    <label className="text-slate-400 block mb-1">% Promoters (Scores 9-10): {calcInput1}%</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="100" 
                      value={calcInput1} 
                      onChange={(e) => setCalcInput1(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">% Detractors (Scores 0-6): {calcInput2}%</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="100" 
                      value={calcInput2} 
                      onChange={(e) => setCalcInput2(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                    />
                  </div>
                </>
              )}

              {/* Output Display */}
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-1">
                <div className="text-[11px] text-slate-400 font-mono">{calcResult.formula}</div>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-xs text-slate-300">Result:</span>
                  <span className={`text-lg font-bold ${calcResult.pass ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {calcResult.val}
                  </span>
                </div>
                <div className={`text-[11px] font-medium ${calcResult.pass ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {calcResult.status}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
