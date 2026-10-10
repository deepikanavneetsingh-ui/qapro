import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  FileSpreadsheet, 
  AlertOctagon, 
  Sliders, 
  LineChart, 
  MessageSquareQuote, 
  Lock, 
  Cpu, 
  Share2, 
  Sparkles, 
  PieChart, 
  Award,
  Search,
  CheckSquare
} from 'lucide-react';
import { CourseModule, Lesson } from '../types';
import { LessonModal } from './LessonModal';

interface CurriculumViewProps {
  modules: CourseModule[];
  onTakeQuiz: (moduleId: string) => void;
  initialModuleId?: string;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  modules,
  onTakeQuiz,
  initialModuleId
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [activeLesson, setActiveLesson] = useState<{ module: CourseModule; lesson: Lesson } | null>(null);

  // Icon map
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return ShieldCheck;
      case 'FileSpreadsheet': return FileSpreadsheet;
      case 'AlertOctagon': return AlertOctagon;
      case 'Sliders': return Sliders;
      case 'LineChart': return LineChart;
      case 'MessageSquareQuote': return MessageSquareQuote;
      case 'Lock': return Lock;
      case 'Cpu': return Cpu;
      case 'Share2': return Share2;
      case 'Sparkles': return Sparkles;
      case 'PieChart': return PieChart;
      case 'Award': return Award;
      default: return BookOpen;
    }
  };

  const filteredModules = modules.filter(mod => {
    const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.lessons.some(l => l.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLevel = selectedLevel === 'All' || mod.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            CQAP™ Curriculum Roadmap
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            12 comprehensive modules and 23 structured lessons covering the full spectrum of contact center and tech QA.
          </p>
        </div>

        {/* Search & Level Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search lessons or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-48 sm:w-60"
            />
          </div>

          <div className="flex p-0.5 bg-slate-900 rounded-lg border border-slate-800 text-xs">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  selectedLevel === level
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredModules.map((mod) => {
          const Icon = getIcon(mod.iconName);
          return (
            <div
              key={mod.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                        Module {mod.number}
                      </span>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                        mod.level === 'Beginner' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' :
                        mod.level === 'Intermediate' ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' :
                        'bg-purple-500/10 text-purple-300 border-purple-500/20'
                      }`}>
                        {mod.level}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{mod.totalDurationHours}h</span>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-white font-heading mb-2">
                  {mod.title}
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {mod.shortDescription}
                </p>

                {/* Lessons List inside card */}
                <div className="space-y-2 mb-4">
                  <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
                    Lessons in this module:
                  </span>
                  {mod.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      onClick={() => setActiveLesson({ module: mod, lesson })}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-950 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center gap-2 text-xs text-slate-300 group-hover:text-white truncate">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                        <span className="truncate">{lesson.title}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 flex-shrink-0">
                        <span>{lesson.durationMinutes}m</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => onTakeQuiz(mod.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold transition-colors border border-slate-700"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Module Quiz</span>
                </button>

                <button
                  onClick={() => setActiveLesson({ module: mod, lesson: mod.lessons[0] })}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <span>Start Module</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lesson Reader Modal */}
      {activeLesson && (
        <LessonModal
          module={activeLesson.module}
          lesson={activeLesson.lesson}
          onClose={() => setActiveLesson(null)}
          onNextLesson={() => {
            const currentIdx = activeLesson.module.lessons.findIndex(l => l.id === activeLesson.lesson.id);
            if (currentIdx < activeLesson.module.lessons.length - 1) {
              setActiveLesson({
                module: activeLesson.module,
                lesson: activeLesson.module.lessons[currentIdx + 1]
              });
            } else {
              setActiveLesson(null);
            }
          }}
          onTakeQuiz={(moduleId) => {
            setActiveLesson(null);
            onTakeQuiz(moduleId);
          }}
        />
      )}
    </div>
  );
};
