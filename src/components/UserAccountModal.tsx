import React from 'react';
import { 
  X, 
  User as UserIcon, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Unlock, 
  LogOut, 
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';
import { User } from '../types';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onLogout: () => void;
  onUpgradeClick: (packageType: 'practice_pass' | 'certification') => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogout,
  onUpgradeClick
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Card */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-lg font-heading">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white font-heading">{user.name}</h3>
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                user.role === 'admin' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              }`}>
                {user.role}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">{user.email}</p>
            {user.phone && <p className="text-[11px] text-slate-500">📞 {user.phone}</p>}
          </div>
        </div>

        {/* Active Access Tiers */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Your Access Levels & Status
          </h4>

          {/* Tier 1: Free Dashboard & Curriculum */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-xs font-semibold text-white">Student Dashboard & Curriculum</div>
                <div className="text-[11px] text-slate-400">12 Core Modules & 23 Lessons</div>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              Active (Free)
            </span>
          </div>

          {/* Tier 2: QA Practice Pass (₹1,000) */}
          <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
            user.access.hasPracticePass
              ? 'bg-indigo-950/30 border-indigo-500/30'
              : 'bg-slate-950 border-slate-800'
          }`}>
            <div className="flex items-center gap-2.5">
              {user.access.hasPracticePass ? (
                <Unlock className="w-5 h-5 text-indigo-400" />
              ) : (
                <Lock className="w-5 h-5 text-slate-500" />
              )}
              <div>
                <div className="text-xs font-semibold text-white">QA Practice & Simulator Pass</div>
                <div className="text-[11px] text-slate-400">Audits, Interview AI, 27 Domains, AI Tutor (₹1,000)</div>
              </div>
            </div>

            {user.access.hasPracticePass ? (
              <span className="text-[11px] font-semibold text-indigo-400 px-2.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                Active
              </span>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onUpgradeClick('practice_pass');
                }}
                className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-colors shadow-sm"
              >
                Pay ₹1,000
              </button>
            )}
          </div>

          {/* Tier 3: Certification (₹1,500) */}
          <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
            user.access.hasCertification
              ? 'bg-emerald-950/30 border-emerald-500/30'
              : 'bg-slate-950 border-slate-800'
          }`}>
            <div className="flex items-center gap-2.5">
              {user.access.hasCertification ? (
                <Award className="w-5 h-5 text-emerald-400" />
              ) : (
                <Lock className="w-5 h-5 text-slate-500" />
              )}
              <div>
                <div className="text-xs font-semibold text-white">Official CQAP™ Certification</div>
                <div className="text-[11px] text-slate-400">Proctored Exam, Credential & Public Registry (₹1,500)</div>
              </div>
            </div>

            {user.access.hasCertification ? (
              <span className="text-[11px] font-semibold text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                Active
              </span>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onUpgradeClick('certification');
                }}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition-colors shadow-sm"
              >
                Pay ₹1,500
              </button>
            )}
          </div>
        </div>

        {/* Payment History */}
        {user.paymentRequests && user.paymentRequests.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Submitted Payment Requests
            </h4>

            <div className="space-y-2 max-h-36 overflow-y-auto">
              {user.paymentRequests.map((req) => (
                <div 
                  key={req.id}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-white capitalize">
                      {req.packageType.replace('_', ' ')} (₹{req.amount})
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">UTR: {req.utrNumber}</div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    req.status === 'approved' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : req.status === 'pending'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-800">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
