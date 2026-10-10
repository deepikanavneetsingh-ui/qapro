import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Award,
  Calendar,
  Lock,
  ExternalLink,
  FileCheck,
  Building2,
  Fingerprint,
  Sparkles
} from 'lucide-react';
import { safeFetchJson } from '../utils/safeApi';

interface VerificationRecord {
  valid: boolean;
  certificateCode?: string;
  recipientName?: string;
  courseName?: string;
  issuedDate?: string;
  specialization?: string;
  grade?: string;
  status?: string;
  verifyingAuthority?: string;
  ledgerHash?: string;
  message?: string;
}

export const CertificateView: React.FC = () => {
  const [verifyCode, setVerifyCode] = useState('QA-PRO-8492-X9');
  const [verificationResult, setVerificationResult] = useState<VerificationRecord | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Auto-verify initial sample code on load so visitors see how verification looks
  useEffect(() => {
    handleVerify('QA-PRO-8492-X9');
  }, []);

  const handleVerify = async (codeToVerify: string) => {
    if (!codeToVerify.trim()) return;
    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const result = await safeFetchJson<VerificationRecord>(`/api/certificates/verify/${encodeURIComponent(codeToVerify.trim())}`);
      if (result.ok && result.data) {
        setVerificationResult(result.data);
      } else {
        setVerificationResult({
          valid: false,
          message: result.error || `Certificate code "${codeToVerify}" could not be verified in the registry.`
        });
      }
    } catch (e) {
      console.error('Verification error:', e);
      setVerificationResult({
        valid: false,
        message: 'Unable to connect to the QAPro certificate registry. Please try again later.'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const sampleCodes = [
    { code: 'QA-PRO-8492-X9', name: 'Alex Rivera', track: 'Master Program' },
    { code: 'QA-PRO-9182-E4', name: 'Priya Sharma', track: 'FinTech Compliance' },
    { code: 'QA-PRO-3819-B2', name: 'David Chen', track: 'Healthcare HIPAA' },
    { code: 'QA-PRO-7741-K8', name: 'Sarah Jenkins', track: 'SaaS & AI Support' }
  ];

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Portal Header */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Accredited Public Registry</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
          Public Credential Verification Portal
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Employers, hiring directors, and organizations can instantly authenticate any Certified Quality Assurance Professional (CQAP™) credential against our permanent accreditation ledger.
        </p>
      </div>

      {/* Verification Search Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
            Enter Credential Code / Certificate ID:
          </label>
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify(verifyCode)}
                placeholder="e.g. QA-PRO-8492-X9"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono uppercase tracking-wider"
              />
            </div>
            <button
              onClick={() => handleVerify(verifyCode)}
              disabled={isVerifying}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Ledger...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Credential</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Test Codes */}
        <div className="pt-2 border-t border-slate-800/80">
          <span className="text-[11px] font-medium text-slate-400 block mb-2">
            Click to test verifiable sample credentials on record:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleCodes.map((s) => (
              <button
                key={s.code}
                onClick={() => {
                  setVerifyCode(s.code);
                  handleVerify(s.code);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border flex items-center gap-1.5 ${
                  verifyCode.toUpperCase() === s.code
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <FileCheck className="w-3 h-3 text-emerald-400" />
                <span className="font-bold">{s.code}</span>
                <span className="text-[10px] text-slate-400 font-sans">({s.name} • {s.track})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Verification Dossier Result */}
        {verificationResult && (
          <div className="pt-2">
            {verificationResult.valid ? (
              <div className="bg-slate-950 border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn shadow-2xl relative overflow-hidden">
                {/* Background accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* Status Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
                          Official Authenticated Credential
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                          {verificationResult.status || 'Active & Valid'}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        Ledger Code: <strong className="text-white">{verificationResult.certificateCode}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="text-right sm:text-right text-xs">
                    <span className="text-slate-400 block text-[11px]">Issued Date</span>
                    <span className="text-slate-200 font-medium">{verificationResult.issuedDate}</span>
                  </div>
                </div>

                {/* Credential Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">
                      Certified Candidate Name
                    </span>
                    <div className="text-lg sm:text-xl font-bold text-white font-heading">
                      {verificationResult.recipientName}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">
                      Awarded Designation
                    </span>
                    <div className="text-sm font-bold text-indigo-300 font-heading">
                      {verificationResult.courseName}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">
                      Domain Specialization & Competencies
                    </span>
                    <div className="text-xs text-slate-200">
                      {verificationResult.specialization}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">
                      Examination Standing & Honors
                    </span>
                    <div className="text-xs text-emerald-400 font-semibold">
                      {verificationResult.grade}
                    </div>
                  </div>
                </div>

                {/* Authority & Cryptographic Proof */}
                <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span>
                      Authority: <strong className="text-slate-300">{verificationResult.verifyingAuthority}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Fingerprint className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="truncate">
                      Ledger Hash: <span className="font-mono text-slate-400">{verificationResult.ledgerHash}</span>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-rose-950/30 border border-rose-500/40 rounded-2xl p-6 text-xs text-rose-200 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-sm text-rose-300">
                  <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  <span>Credential Verification Failed</span>
                </div>
                <p className="text-xs text-rose-200/90 leading-relaxed">
                  The certificate code <strong className="text-white font-mono">{verifyCode}</strong> could not be validated against the QAPro public accreditation registry. Please ensure the code is spelled correctly including the <span className="font-mono text-rose-300">QA-PRO-</span> prefix.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Trust & Verification Standards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <Fingerprint className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white font-heading">Cryptographic Hash Protection</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Every CQAP™ credential is generated with a unique SHA-256 verification hash to prevent diploma tampering and credential spoofing.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white font-heading">Permanent Public Ledger</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Certificates remain permanently recorded on the public registry, enabling employers to authenticate candidate qualifications 24/7.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white font-heading">Standardized Evaluation</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Candidates must pass rigorous proctored audits across omnichannel call analysis, compliance standards, and DMAIC root cause analysis.
          </p>
        </div>
      </div>
    </div>
  );
};
