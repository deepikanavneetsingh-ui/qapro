import React, { useState, useEffect } from 'react';
import { 
  Headphones, 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Info, 
  Award, 
  Send,
  MessageSquare,
  Sparkles,
  ShieldAlert,
  ChevronDown
} from 'lucide-react';
import { AuditScenario, AuditCriterion } from '../types';

interface AuditSimulatorViewProps {
  scenarios: AuditScenario[];
  initialScenarioId?: string;
  onAuditCompleted: (score: number, maxScore: number, percentage: number) => void;
}

export const AuditSimulatorView: React.FC<AuditSimulatorViewProps> = ({
  scenarios,
  initialScenarioId,
  onAuditCompleted
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    initialScenarioId || scenarios[0]?.id || 'audit-sc-1'
  );
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioPlaybackSec, setAudioPlaybackSec] = useState(0);

  // User scorecard inputs: mapping criterion id -> user score (0 to maxPoints)
  const [criterionScores, setCriterionScores] = useState<{ [id: string]: number }>({});
  const [fatalOverride, setFatalOverride] = useState<boolean>(false);
  const [coachingRemarks, setCoachingRemarks] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'transcript' | 'details'>('transcript');

  const scenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];

  // Initialize default scores when switching scenario
  useEffect(() => {
    const defaults: { [id: string]: number } = {};
    scenario.criteria.forEach(c => {
      defaults[c.id] = c.maxPoints; // start with full points
    });
    setCriterionScores(defaults);
    setFatalOverride(false);
    setCoachingRemarks('');
    setIsSubmitted(false);
    setIsPlayingAudio(false);
    setAudioPlaybackSec(0);
  }, [scenario.id]);

  // Audio simulator timer
  useEffect(() => {
    let timer: any = null;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioPlaybackSec(prev => {
          if (prev >= 282) { // approx 4.7 mins
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio]);

  const handleScoreChange = (criterion: AuditCriterion, newPoints: number) => {
    setCriterionScores(prev => ({
      ...prev,
      [criterion.id]: newPoints
    }));

    // If criterion is fatal and user awarded 0 or triggered fail
    if (criterion.isFatal && newPoints === 0) {
      setFatalOverride(true);
    }
  };

  // Calculate live score
  const totalMaxPoints = scenario.criteria.reduce((acc, c) => acc + c.maxPoints, 0);
  const rawEarnedPoints = scenario.criteria.reduce((acc, c) => acc + (criterionScores[c.id] ?? c.maxPoints), 0);
  
  // Check if any fatal item is 0
  const hasFatalZero = scenario.criteria.some(c => c.isFatal && (criterionScores[c.id] ?? c.maxPoints) === 0) || fatalOverride;
  const finalPercentage = hasFatalZero ? 0 : Math.round((rawEarnedPoints / totalMaxPoints) * 100);

  const handleSubmitAudit = async () => {
    setIsSubmitted(true);
    onAuditCompleted(hasFatalZero ? 0 : rawEarnedPoints, totalMaxPoints, finalPercentage);

    // Sync to backend
    try {
      await fetch('/api/audits/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: scenario.title,
          score: hasFatalZero ? 0 : rawEarnedPoints,
          maxScore: totalMaxPoints,
          percentage: finalPercentage,
          passed: finalPercentage >= 80,
          details: {
            scenarioId: scenario.id,
            calibrationVariance: Math.abs(finalPercentage - scenario.benchmarkScore),
            fatalTriggered: hasFatalZero,
            coachingRemarks
          }
        })
      });
    } catch (e) {
      console.error('Failed to save audit result', e);
    }
  };

  const calibrationVariance = Math.abs(finalPercentage - scenario.benchmarkScore);
  const isCalibrated = calibrationVariance <= 5;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Scenario Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider border border-emerald-500/20">
              Interactive Lab
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Channel: {scenario.channel} • {scenario.domain}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-heading">
            QA Audit & Calibration Simulator
          </h1>
        </div>

        {/* Dropdown to switch scenarios */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-medium whitespace-nowrap">Scenario:</label>
          <select
            value={selectedScenarioId}
            onChange={(e) => setSelectedScenarioId(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-xs rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
          >
            {scenarios.map(s => (
              <option key={s.id} value={s.id}>
                {s.title} ({s.channel})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Split Grid: Left Interaction Viewer, Right Evaluation Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 Cols on large screen): Audio Player & Interaction Transcript */}
        <div className="lg:col-span-6 space-y-4">
          {/* Interaction Player Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">{scenario.channel}</span>
                <span className="text-slate-400">Agent: <strong className="text-slate-200">{scenario.agentName}</strong></span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                scenario.customerSentiment === 'Frustrated' ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' :
                scenario.customerSentiment === 'Distressed' ? 'bg-rose-500/10 text-rose-300 border-rose-500/20' :
                'bg-blue-500/10 text-blue-300 border-blue-500/20'
              }`}>
                Customer: {scenario.customerSentiment}
              </span>
            </div>

            {/* Simulated Audio Waveform & Player */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center transition-all shadow-md shadow-emerald-500/20"
                  >
                    {isPlayingAudio ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>
                  <div>
                    <div className="text-xs font-semibold text-white">Call Recording Playback</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {Math.floor(audioPlaybackSec / 60)}:{(audioPlaybackSec % 60).toString().padStart(2, '0')} / {scenario.duration}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Headphones className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">16kHz Stereo Dual-Channel</span>
                </div>
              </div>

              {/* Animated Waveform Bars */}
              <div className="flex items-center gap-1 h-9 px-2 bg-slate-900 rounded-lg overflow-hidden">
                {Array.from({ length: 36 }).map((_, i) => {
                  const isCurrent = (i / 36) <= (audioPlaybackSec / 282);
                  const randomHeight = isPlayingAudio 
                    ? Math.max(20, Math.sin(i * 0.5 + audioPlaybackSec * 0.4) * 80 + 20)
                    : (i % 3 === 0 ? 60 : i % 2 === 0 ? 30 : 45);
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-150 ${
                        isCurrent ? 'bg-emerald-400' : 'bg-slate-700'
                      }`}
                      style={{ height: `${randomHeight}%` }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Context Summary */}
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <strong className="text-white block mb-0.5">Interaction Briefing:</strong>
              {scenario.scenarioSummary}
            </p>
          </div>

          {/* Transcript Viewer */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[520px]">
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                <span>Synchronized Interaction Transcript</span>
              </span>
              <span className="text-[11px] text-slate-400">
                {scenario.transcript.length} Messages
              </span>
            </div>

            <div className="p-4 overflow-y-auto space-y-3.5 flex-1">
              {scenario.transcript.map((line, idx) => {
                const isAgent = line.speaker === 'agent';
                const isSystem = line.speaker === 'system';

                if (isSystem) {
                  return (
                    <div key={idx} className="text-center text-[11px] text-slate-400 italic py-1">
                      --- {line.text} [{line.timestamp}] ---
                    </div>
                  );
                }

                return (
                  <div 
                    key={idx}
                    className={`flex flex-col text-xs space-y-1 ${isAgent ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                      <span>{isAgent ? `Agent (${scenario.agentName})` : `Customer (${scenario.customerName})`}</span>
                      <span>•</span>
                      <span>{line.timestamp}</span>
                    </div>

                    <div className={`p-3 rounded-xl max-w-[88%] leading-relaxed ${
                      isAgent 
                        ? 'bg-indigo-950/50 border border-indigo-500/30 text-indigo-100 rounded-tr-none'
                        : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}>
                      <p>{line.text}</p>
                    </div>

                    {line.isKeyMoment && (
                      <div className="flex items-center gap-1 text-[10px] font-medium text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 max-w-[88%]">
                        <Sparkles className="w-3 h-3 text-amber-400 flex-shrink-0" />
                        <span>Key Moment: {line.annotation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (6 Cols on large screen): Interactive Evaluation Form */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
            {/* Scorecard Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white font-heading">
                  Auditor Evaluation Form (Scorecard)
                </h3>
                <p className="text-xs text-slate-400">Score each parameter against the behavioral rubric.</p>
              </div>

              {/* Live Score Widget */}
              <div className="text-right">
                <div className="text-xs text-slate-400">Calculated Score</div>
                <div className={`text-2xl font-bold font-mono ${
                  hasFatalZero ? 'text-rose-400' :
                  finalPercentage >= 80 ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {finalPercentage}%
                </div>
              </div>
            </div>

            {/* Fatal Alert Banner if active */}
            {hasFatalZero && (
              <div className="bg-rose-950/60 border border-rose-500/50 rounded-xl p-3.5 flex items-start gap-3 text-rose-200 text-xs animate-pulse">
                <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-rose-300">AUTO-FAIL: Critical Compliance Defect Triggered</strong>
                  An auto-fail criterion scored 0 points. By policy, the entire audit defaults to an overall score of 0%.
                </div>
              </div>
            )}

            {/* Criteria List */}
            <div className="space-y-4">
              {scenario.criteria.map((criterion) => {
                const currentVal = criterionScores[criterion.id] ?? criterion.maxPoints;
                const isFatal = criterion.isFatal;

                return (
                  <div 
                    key={criterion.id}
                    className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
                            {criterion.category}
                          </span>
                          {isFatal && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                              FATAL PROTOCOL
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                          {criterion.label}
                        </h4>
                      </div>

                      {/* Score Selector / Input */}
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max={criterion.maxPoints}
                          value={currentVal}
                          onChange={(e) => handleScoreChange(criterion, Number(e.target.value))}
                          className="w-24 sm:w-28 accent-indigo-500"
                        />
                        <span className="font-mono text-xs font-bold text-white w-12 text-right">
                          {currentVal}/{criterion.maxPoints}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {criterion.description}
                    </p>

                    <div className="text-[11px] text-slate-300 bg-slate-900 p-2.5 rounded border border-slate-800/80">
                      <span className="font-semibold text-slate-200">Rubric Standard: </span>
                      {criterion.scoringGuide}
                    </div>

                    {/* Quick Fatal Toggle button for testing fatal scenarios */}
                    {isFatal && (
                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={() => handleScoreChange(criterion, currentVal === 0 ? criterion.maxPoints : 0)}
                          className={`text-[10px] font-medium px-2 py-1 rounded transition-colors ${
                            currentVal === 0 
                              ? 'bg-rose-600 text-white' 
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {currentVal === 0 ? 'Fatal Flagged (0 Pts)' : 'Flag as Fatal Error (0 Pts)'}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Auditor Coaching Remarks */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-white block">
                Auditor Coaching Notes & Observations
              </label>
              <textarea
                value={coachingRemarks}
                onChange={(e) => setCoachingRemarks(e.target.value)}
                placeholder="Write specific, actionable coaching feedback using the SBI (Situation-Behavior-Impact) model..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            {/* Submission & Calibration Check */}
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAudit}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Evaluation & Compare Calibration Benchmark</span>
              </button>
            ) : (
              /* Calibration Comparison Card */
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-400" />
                    <h4 className="text-sm font-bold text-white font-heading">
                      Calibration Session Result
                    </h4>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
                    isCalibrated 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    {isCalibrated ? 'CALIBRATION PASSED' : 'VARIANCE DRIFT'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-slate-400 text-[11px]">Your Score</div>
                    <div className="text-lg font-bold text-white mt-0.5">{finalPercentage}%</div>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-slate-400 text-[11px]">Master Score</div>
                    <div className="text-lg font-bold text-emerald-400 mt-0.5">{scenario.benchmarkScore}%</div>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-slate-400 text-[11px]">Variance</div>
                    <div className={`text-lg font-bold mt-0.5 ${isCalibrated ? 'text-emerald-400' : 'text-amber-400'}`}>
                      ±{calibrationVariance}%
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <strong className="text-white block mb-1">Master Benchmark Commentary:</strong>
                  {scenario.benchmarkNotes}
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                >
                  Edit Audit Score
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
