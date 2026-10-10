import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Clock, 
  RotateCcw, 
  Award, 
  ArrowRight, 
  Filter, 
  CheckSquare,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { QuizQuestion, CourseModule } from '../types';

interface AssessmentViewProps {
  questions: QuizQuestion[];
  modules: CourseModule[];
  initialModuleId?: string;
  onQuizCompleted: (score: number, maxScore: number, percentage: number) => void;
  onNavigateToCourse: (moduleId: string) => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  questions,
  modules,
  initialModuleId,
  onQuizCompleted,
  onNavigateToCourse
}) => {
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>(initialModuleId || 'all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIndex: number]: number }>({});
  const [revealedAnswers, setRevealedAnswers] = useState<{ [qIndex: number]: boolean }>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);

  // Filter questions based on selected module
  const filteredQuestions = selectedModuleFilter === 'all'
    ? questions
    : questions.filter(q => q.moduleId === selectedModuleFilter);

  // Sync initialModuleId if changed
  useEffect(() => {
    if (initialModuleId) {
      setSelectedModuleFilter(initialModuleId);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setRevealedAnswers({});
      setIsCompleted(false);
    }
  }, [initialModuleId]);

  // Timer loop
  useEffect(() => {
    let interval: any = null;
    if (isTimerActive && !isCompleted) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, isCompleted]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];

  const handleSelectOption = (optIndex: number) => {
    if (revealedAnswers[currentQuestionIndex]) return; // already locked
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optIndex
    }));
  };

  const handleCheckAnswer = () => {
    setRevealedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: true
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setIsCompleted(true);
    setIsTimerActive(false);

    // Calculate score
    let correctCount = 0;
    filteredQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const percentage = Math.round((correctCount / filteredQuestions.length) * 100);
    onQuizCompleted(correctCount, filteredQuestions.length, percentage);

    // Save to server
    try {
      await fetch('/api/quizzes/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: selectedModuleFilter === 'all' ? 'CQAP™ Comprehensive Practice Exam' : `Module Assessment (${selectedModuleFilter})`,
          score: correctCount,
          maxScore: filteredQuestions.length,
          percentage,
          passed: percentage >= 80,
          date: new Date().toISOString()
        })
      });
    } catch (e) {
      console.error('Failed to save quiz to server', e);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setRevealedAnswers({});
    setIsCompleted(false);
    setTimerSeconds(0);
    setIsTimerActive(true);
  };

  // Compute live scores for completed state
  let scoreTotal = 0;
  if (isCompleted) {
    filteredQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        scoreTotal += 1;
      }
    });
  }
  const scorePercent = isCompleted ? Math.round((scoreTotal / filteredQuestions.length) * 100) : 0;
  const isPassed = scorePercent >= 80;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider border border-indigo-500/20">
              Exam Engine
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {formatTimer(timerSeconds)}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-heading">
            CQAP™ Knowledge Assessments
          </h1>
        </div>

        {/* Module Scope Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedModuleFilter}
            onChange={(e) => {
              setSelectedModuleFilter(e.target.value);
              setCurrentQuestionIndex(0);
              setSelectedAnswers({});
              setRevealedAnswers({});
              setIsCompleted(false);
            }}
            className="bg-slate-950 border border-slate-700 text-xs rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Full Comprehensive Exam (40 Questions)</option>
            {modules.map((m) => (
              <option key={m.id} value={m.id}>
                Module {m.number}: {m.title.substring(0, 32)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {!isCompleted ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Question {currentQuestionIndex + 1} of {filteredQuestions.length}</span>
              <span className="font-mono text-indigo-400">
                {Math.round(((currentQuestionIndex + 1) / filteredQuestions.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Stem */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700">
                {currentQ.category}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                currentQ.difficulty === 'Foundation' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' :
                currentQ.difficulty === 'Practitioner' ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' :
                'bg-purple-500/10 text-purple-300 border-purple-500/20'
              }`}>
                {currentQ.difficulty}
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Options List */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === idx;
              const isRevealed = revealedAnswers[currentQuestionIndex];
              const isCorrect = idx === currentQ.correctIndex;

              let optionStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300';
              if (isSelected && !isRevealed) {
                optionStyle = 'bg-indigo-950/60 border-indigo-500 text-white shadow-sm shadow-indigo-500/10';
              }
              if (isRevealed) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-100 font-medium';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-rose-950/50 border-rose-500 text-rose-200 line-through';
                } else {
                  optionStyle = 'bg-slate-950/50 border-slate-800 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 text-xs sm:text-sm ${optionStyle}`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 border ${
                    isSelected ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{option}</span>

                  {isRevealed && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  )}
                  {isRevealed && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Rationale / Explanation Box */}
          {revealedAnswers[currentQuestionIndex] && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs space-y-1.5 animate-fadeIn">
              <div className="flex items-center gap-1.5 font-bold text-indigo-400 uppercase tracking-wider text-[11px]">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Auditor Rationale & Standard</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Pass Benchmark: <span className="text-emerald-400 font-semibold">80%</span>
            </span>

            <div className="flex items-center gap-3">
              {!revealedAnswers[currentQuestionIndex] ? (
                <button
                  disabled={selectedAnswers[currentQuestionIndex] === undefined}
                  onClick={handleCheckAnswer}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-semibold transition-colors"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  <span>{currentQuestionIndex < filteredQuestions.length - 1 ? 'Next Question' : 'Finish Assessment'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center p-1 bg-gradient-to-tr from-indigo-500 to-emerald-400 shadow-xl shadow-emerald-500/10">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
              {isPassed ? (
                <Award className="w-10 h-10 text-emerald-400" />
              ) : (
                <RotateCcw className="w-10 h-10 text-amber-400" />
              )}
            </div>
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-white font-heading">
              {isPassed ? 'Assessment Passed with Distinction!' : 'Assessment Complete — Review Recommended'}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isPassed 
                ? 'Outstanding performance! You have demonstrated mastery of core QA methodologies, metrics, and compliance standards.'
                : 'You scored below the 80% CQAP™ certification threshold. Review the module lessons and attempt the quiz again to solidify your knowledge.'}
            </p>
          </div>

          {/* Score Card */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <div className="text-xs text-slate-400">Score</div>
              <div className="text-xl font-bold text-white mt-1">{scoreTotal} / {filteredQuestions.length}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Percentage</div>
              <div className={`text-xl font-bold mt-1 ${isPassed ? 'text-emerald-400' : 'text-amber-400'}`}>
                {scorePercent}%
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Time Taken</div>
              <div className="text-xl font-bold text-white mt-1 font-mono">{formatTimer(timerSeconds)}</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <button
              onClick={restartQuiz}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Assessment</span>
            </button>

            {selectedModuleFilter !== 'all' && (
              <button
                onClick={() => onNavigateToCourse(selectedModuleFilter)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Review Course Lessons</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
