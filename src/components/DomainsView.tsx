import React, { useState } from 'react';
import { 
  Globe2, 
  Search, 
  ShieldAlert, 
  Target, 
  Scale, 
  Briefcase, 
  Filter, 
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { DomainSpecialization } from '../types';

interface DomainsViewProps {
  domains: DomainSpecialization[];
  onSelectDomainForAudit?: (domainName: string) => void;
}

export const DomainsView: React.FC<DomainsViewProps> = ({
  domains,
  onSelectDomainForAudit
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDomain, setSelectedDomain] = useState<DomainSpecialization | null>(null);

  const categories = [
    'All',
    'Financial Services',
    'Healthcare & Life Sciences',
    'Technology & SaaS',
    'Consumer & Retail',
    'Operations & Trust'
  ];

  const filteredDomains = domains.filter(dom => {
    const matchesSearch = dom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dom.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dom.regulatoryMandates.some(r => r.toLowerCase().includes(searchQuery.toLowerCase())) ||
      dom.careerRoles.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || dom.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider border border-amber-500/20">
              Industry Atlas
            </span>
            <span className="text-xs text-slate-400">
              27 Specialized BPO & Technology Verticals
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            QA Domain Specializations
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            Explore industry-specific KPIs, fatal compliance traps, regulatory mandates, and weighted scorecards across modern contact center and back-office operations.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search domains, HIPAA, PCI, SaaS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-full md:w-72"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of 27 Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDomains.map((dom) => (
          <div
            key={dom.id}
            onClick={() => setSelectedDomain(dom)}
            className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 cursor-pointer transition-all hover:shadow-lg hover:shadow-indigo-500/5 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium border border-slate-700/80">
                  {dom.category}
                </span>
                <span className="text-[11px] text-indigo-400 font-mono">
                  {dom.regulatoryMandates[0]?.split(' ')[0]}
                </span>
              </div>

              <h2 className="text-base font-bold text-white font-heading group-hover:text-indigo-300 transition-colors">
                {dom.name}
              </h2>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {dom.summary}
              </p>

              {/* Critical Metrics preview */}
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 space-y-1.5">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                  <Target className="w-3 h-3" />
                  <span>Key Target Metric:</span>
                </div>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="text-slate-300 truncate max-w-[170px]">{dom.criticalMetrics[0]?.metric}</span>
                  <span className="font-mono font-bold text-white">{dom.criticalMetrics[0]?.target}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-slate-400">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>{dom.fatalErrorTraps.length} Fatal Traps</span>
              </div>

              <span className="text-indigo-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Inspect Playbook</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Domain Detail Modal */}
      {selectedDomain && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider border border-indigo-500/20">
                  {selectedDomain.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mt-1">
                  {selectedDomain.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedDomain(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedDomain.summary}
            </p>

            {/* Scorecard Focus */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                Standard Scorecard Weighting:
              </span>
              <p className="text-xs text-slate-300 font-mono">{selectedDomain.scorecardFocus}</p>
            </div>

            {/* Critical Metrics */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4" />
                <span>Critical Operating Metrics & Benchmarks</span>
              </h3>
              <div className="space-y-2">
                {selectedDomain.criticalMetrics.map((cm, i) => (
                  <div key={i} className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 flex items-start justify-between gap-3 text-xs">
                    <div>
                      <div className="font-semibold text-white">{cm.metric}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{cm.importance}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold whitespace-nowrap">
                      {cm.target}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fatal Error Traps */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>Zero-Tolerance Fatal Error Traps (0% Auto-Fail)</span>
              </h3>
              <ul className="space-y-2 text-xs">
                {selectedDomain.fatalErrorTraps.map((trap, i) => (
                  <li key={i} className="bg-rose-950/20 p-2.5 rounded-lg border border-rose-500/20 text-rose-200 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                    <span>{trap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regulatory Mandates & Career Paths */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1 text-slate-300 font-bold">
                  <Scale className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Statutory Regulations:</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedDomain.regulatoryMandates.map((reg, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                      {reg}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1 text-slate-300 font-bold">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Target Career Roles:</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedDomain.careerRoles.map((role, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300 text-[11px]">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedDomain(null)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
              >
                Close Playbook
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
