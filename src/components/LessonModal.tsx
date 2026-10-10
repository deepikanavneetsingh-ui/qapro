import React from 'react';
import { X, Clock, CheckCircle2, Calculator, Lightbulb, ArrowRight, BookOpen } from 'lucide-react';
import { CourseModule, Lesson } from '../types';

interface LessonModalProps {
  module: CourseModule;
  lesson: Lesson;
  onClose: () => void;
  onNextLesson?: () => void;
  onTakeQuiz: (moduleId: string) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  module,
  lesson,
  onClose,
  onNextLesson,
  onTakeQuiz
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-start justify-between bg-slate-950/60 sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
              <span>Module {module.number}: {module.title}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
              {lesson.title}
            </h2>
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {lesson.durationMinutes} Minutes
              </span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 font-medium">
                {module.level} Level
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Overview */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 text-slate-300 text-sm leading-relaxed">
            <span className="font-semibold text-white block mb-1 text-xs uppercase tracking-wider">Lesson Summary</span>
            {lesson.overview}
          </div>

          {/* Core Content */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Core Instructional Principles</span>
            </h3>

            <div className="space-y-3">
              {lesson.content.map((paragraph, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 text-slate-200 text-sm leading-relaxed"
                >
                  <p>{paragraph}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Formula Breakout if present */}
          {lesson.formula && (
            <div className="bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-950 border border-indigo-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm">
                <Calculator className="w-4 h-4 text-indigo-400" />
                <span>Standard Formula: {lesson.formula.name}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-emerald-400 text-sm">
                {lesson.formula.expression}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lesson.formula.description}
              </p>
              <div className="text-xs text-slate-400 bg-slate-900/80 p-2.5 rounded border border-slate-800">
                <span className="font-semibold text-slate-200">Numerical Example: </span>
                {lesson.formula.example}
              </div>
            </div>
          )}

          {/* Key Takeaways */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Key Auditor Takeaways</span>
            </h3>
            <ul className="space-y-2">
              {lesson.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/50 p-3 rounded-lg border border-slate-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practical Application */}
          {lesson.practicalApplication && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-200 leading-relaxed">
              <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block mb-0.5 text-amber-300">On-The-Floor Practical Application</span>
                {lesson.practicalApplication}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3 sticky bottom-0">
          <button
            onClick={() => onTakeQuiz(module.id)}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
          >
            Take Practice Quiz
          </button>

          <div className="flex items-center gap-2">
            {onNextLesson ? (
              <button
                onClick={onNextLesson}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shadow-sm shadow-indigo-600/20"
              >
                <span>Next Lesson</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
              >
                Complete Lesson
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
