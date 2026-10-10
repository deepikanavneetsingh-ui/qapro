import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  QrCode, 
  Copy, 
  Check, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { User } from '../types';
import { safeFetchJson } from '../utils/safeApi';

interface PaywallGateProps {
  requiredPackage: 'practice_pass' | 'certification';
  user: User;
  onPaymentSubmitted: (updatedUser: User) => void;
  featureTitle?: string;
  featureDescription?: string;
}

export const PaywallGate: React.FC<PaywallGateProps> = ({
  requiredPackage,
  user,
  onPaymentSubmitted,
  featureTitle,
  featureDescription
}) => {
  const isPractice = requiredPackage === 'practice_pass';
  const amount = isPractice ? 1000 : 1500;
  const packageName = isPractice 
    ? 'QA Practice & Simulator Pass' 
    : 'Official CQAP™ Certification Access';

  const [utrNumber, setUtrNumber] = useState('');
  const [phone, setPhone] = useState(user.phone || '');
  const [notes, setNotes] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Check if user already has a pending payment request for this package
  const existingPending = user.paymentRequests?.find(
    r => r.packageType === requiredPackage && r.status === 'pending'
  );

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('qaproacademy@okaxis');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmitUtr = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!utrNumber.trim()) {
      setError('Please enter your 12-digit UPI / UTR transaction reference number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await safeFetchJson<{ success: boolean; user: User }>('/api/payments/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          amount,
          packageType: requiredPackage,
          utrNumber: utrNumber.trim(),
          phone: phone.trim(),
          notes: notes.trim()
        })
      });

      if (!result.ok || !result.data?.user) {
        throw new Error(result.error || 'Failed to submit payment reference.');
      }

      setSuccessMsg('Payment reference submitted successfully! Admin will verify and activate your access.');
      onPaymentSubmitted(result.data.user);
    } catch (err: any) {
      setError(err.message || 'Submission error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4">
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Lock Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-lg shadow-amber-500/10">
            <Lock className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <span>Manual Admin Activation Required</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            {featureTitle || `${packageName} Required`}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {featureDescription || (
              isPractice 
                ? 'This hands-on simulator and coaching module is included in the QA Practice Pass. As per academy policy, all remaining tools require payment of INR 1,000 and manual activation.'
                : 'The official certification examination, diploma issuance, and public registry listing require the Certification Fee of INR 1,500 and manual activation.'
            )}
          </p>
        </div>

        {/* Pending Request Status Banner if already submitted */}
        {existingPending && (
          <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
                <h4 className="text-sm font-bold text-amber-300 font-heading">
                  Payment Submitted — Pending Admin Verification
                </h4>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                PENDING
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              We received your payment reference for <strong className="text-white">INR {existingPending.amount}</strong>. 
              Our Academy Administrator will verify your transaction against our bank ledger and activate your access shortly.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1 border-t border-amber-500/20">
              <div>
                <span className="text-slate-400 block text-[11px]">UTR Reference:</span>
                <span className="font-mono text-amber-200 font-bold">{existingPending.utrNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Package:</span>
                <span className="text-white capitalize">{existingPending.packageType.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Submitted:</span>
                <span className="text-slate-300">{new Date(existingPending.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        )}

        {/* Two Column Layout: Payment Info & UTR Submission Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Bank / UPI Details */}
          <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Payment Instructions
              </span>
              <span className="text-sm font-extrabold text-white font-heading">
                Amount: ₹{amount} INR
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Transfer exactly <strong className="text-white font-semibold">INR {amount}</strong> using any UPI App (GPay, PhonePe, Paytm, BHIM) or Bank IMPS:
            </p>

            {/* UPI Box */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-[11px] text-slate-400 font-medium">Official Academy UPI ID:</div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-white font-bold tracking-wide">
                  qaproacademy@okaxis
                </span>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-colors flex items-center gap-1"
                >
                  {copiedUpi ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy UPI</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* QR Mock Display */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-xl p-2 flex flex-col items-center justify-center text-slate-900 flex-shrink-0 shadow-md">
                <QrCode className="w-14 h-14 text-slate-900" />
                <span className="text-[7px] font-bold uppercase font-mono tracking-tighter">
                  ₹{amount} INR
                </span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="font-semibold text-white">Scan with any UPI App</div>
                <div className="text-[11px] text-slate-400">
                  Google Pay • PhonePe • Paytm • Cred • Amazon Pay
                </div>
                <div className="text-[11px] text-emerald-400 font-medium">
                  Instant receipt generation
                </div>
              </div>
            </div>

            {/* Bank IMPS info */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] space-y-1 text-slate-400">
              <div className="font-semibold text-slate-300">Bank Transfer (IMPS / NEFT):</div>
              <div>Account Name: <strong className="text-slate-200">QAPro Academy Pvt Ltd</strong></div>
              <div>Bank: <strong className="text-slate-200">HDFC Bank Ltd</strong></div>
              <div>Account No: <strong className="font-mono text-slate-200">50200084920194</strong></div>
              <div>IFSC Code: <strong className="font-mono text-slate-200">HDFC0001234</strong></div>
            </div>
          </div>

          {/* Right Column: UTR Reference Submission Form */}
          <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white font-heading">
                Step 2: Submit 12-Digit UTR Number
              </h3>
              <p className="text-xs text-slate-400">
                After transferring the fee, submit your transaction ID below for the admin to manually activate your access.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-xs text-emerald-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmitUtr} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  12-Digit UPI / UTR Transaction ID <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  placeholder="e.g. 428901928301 or UPI92830192"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Found in your payment app under "Transaction Details" or "UPI Ref ID".
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Contact / WhatsApp Number <span className="text-slate-500">(For confirmation)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Optional Note to Admin
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Paid from Google Pay account"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting Reference...</span>
                ) : (
                  <>
                    <span>Submit Payment for Manual Activation</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Our Administrator will review your UTR and activate your package within 1-2 hours.</span>
            </div>
          </div>
        </div>

        {/* Feature preview checklist */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            What is unlocked with the {packageName}:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
            {isPractice ? (
              <>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>5 Multi-Channel QA Audits with 16kHz Audio Playback</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Master Benchmark Calibration Variance Calculator</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>AI Virtual Interview Simulator with Gemini Feedback</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>27 BPO & Technology Domain Specializations Atlas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>24/7 AI Master QA Director Coach ("Coach Avery")</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Full Practice Quizzes & Question Rationale Explanations</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Official CQAP™ Proctored Examination Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Certified Quality Assurance Professional Digital Diploma</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Accreditation Seal with Unique Credential Code</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Permanent Public Registry Verification Entry</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
