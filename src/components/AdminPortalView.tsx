import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Clock, 
  IndianRupee, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  UserPlus, 
  RefreshCw, 
  Check, 
  X, 
  Lock, 
  Unlock, 
  Copy, 
  ExternalLink,
  Sliders,
  AlertCircle,
  Award,
  Sparkles,
  Phone,
  Mail,
  Trash2,
  Printer,
  FileCheck,
  Building2,
  QrCode,
  Fingerprint
} from 'lucide-react';
import { User, PaymentRequest } from '../types';
import { safeFetchJson } from '../utils/safeApi';

interface AdminPortalViewProps {
  currentAdminEmail?: string;
  onUserAccessChanged?: () => void;
}

interface IssuedCertificate {
  certificateCode: string;
  recipientName: string;
  courseName: string;
  issuedDate: string;
  specialization: string;
  grade: string;
  status: string;
  verifyingAuthority: string;
  ledgerHash: string;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({
  currentAdminEmail = 'deepikanavneetsingh@gmail.com',
  onUserAccessChanged
}) => {
  const [adminSubTab, setAdminSubTab] = useState<'students' | 'diplomaStudio'>('students');
  const [users, setUsers] = useState<User[]>([]);
  const [allRequests, setAllRequests] = useState<PaymentRequest[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingRequestsCount: 0,
    totalRevenueINR: 0,
    practicePassActiveCount: 0,
    certificationActiveCount: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'pending' | 'free' | 'practice' | 'certified'>('all');

  // Modal states for adding student
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserPracticePass, setNewUserPracticePass] = useState(false);
  const [newUserCertification, setNewUserCertification] = useState(false);

  // Status message toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Official Diploma Studio State (Admin Exclusive)
  const [diplomaName, setDiplomaName] = useState('Alex Rivera');
  const [diplomaCode, setDiplomaCode] = useState('QA-PRO-8492-X9');
  const [diplomaTrack, setDiplomaTrack] = useState('Omnichannel QA, Six Sigma & Calibration Variance');
  const [diplomaGrade, setDiplomaGrade] = useState('Distinction (96.4%)');
  const [diplomaDate, setDiplomaDate] = useState('September 22, 2026');
  const [issuedCertificates, setIssuedCertificates] = useState<IssuedCertificate[]>([]);
  const [isPublishingCert, setIsPublishingCert] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const [usersRes, certsRes] = await Promise.all([
        safeFetchJson<{ users: User[]; allRequests: PaymentRequest[]; stats: any }>('/api/admin/users'),
        safeFetchJson<{ certificates: IssuedCertificate[] }>('/api/admin/certificates')
      ]);

      if (usersRes.ok && usersRes.data) {
        setUsers(usersRes.data.users || []);
        setAllRequests(usersRes.data.allRequests || []);
        if (usersRes.data.stats) setStats(usersRes.data.stats);
      }

      if (certsRes.ok && certsRes.data) {
        setIssuedCertificates(certsRes.data.certificates || []);
      }
    } catch (e) {
      console.error('Failed to fetch admin data:', e);
      showToast('Could not fetch updated data from server.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleApprovePayment = async (requestId: string) => {
    try {
      const result = await safeFetchJson(`/api/admin/payments/${requestId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminEmail: currentAdminEmail || 'deepikanavneetsingh@gmail.com' })
      });
      if (!result.ok) throw new Error(result.error || 'Failed to approve');

      showToast('Payment verified! Access activated for student.');
      fetchAdminData();
      if (onUserAccessChanged) onUserAccessChanged();
    } catch (err: any) {
      showToast(err.message || 'Error approving payment', 'error');
    }
  };

  const handleRejectPayment = async (requestId: string) => {
    const reason = prompt('Enter rejection reason (optional):') || 'UTR verification failed';
    try {
      const result = await safeFetchJson(`/api/admin/payments/${requestId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: reason })
      });
      if (!result.ok) throw new Error(result.error || 'Failed to reject');

      showToast('Payment request marked as rejected.', 'error');
      fetchAdminData();
    } catch (err: any) {
      showToast(err.message || 'Error rejecting payment', 'error');
    }
  };

  const handleToggleAccess = async (user: User, field: 'hasPracticePass' | 'hasCertification') => {
    const updatedAccess = {
      ...user.access,
      [field]: !user.access[field]
    };

    try {
      const result = await safeFetchJson(`/api/admin/users/${user.id}/access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAccess)
      });
      if (!result.ok) throw new Error(result.error || 'Failed to update access');

      showToast(`Updated access for ${user.name}`);
      fetchAdminData();
      if (onUserAccessChanged) onUserAccessChanged();
    } catch (err: any) {
      showToast(err.message || 'Error toggling access', 'error');
    }
  };

  const handleGrantAllAccess = async (user: User) => {
    try {
      const result = await safeFetchJson(`/api/admin/users/${user.id}/access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hasDashboard: true,
          hasCurriculum: true,
          hasPracticePass: true,
          hasCertification: true
        })
      });
      if (!result.ok) throw new Error(result.error || 'Failed to grant full access');

      showToast(`Granted Full VIP Access to ${user.name}`);
      fetchAdminData();
      if (onUserAccessChanged) onUserAccessChanged();
    } catch (err: any) {
      showToast(err.message || 'Error', 'error');
    }
  };

  const handleResetToFree = async (user: User) => {
    try {
      const result = await safeFetchJson(`/api/admin/users/${user.id}/access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hasDashboard: true,
          hasCurriculum: true,
          hasPracticePass: false,
          hasCertification: false
        })
      });
      if (!result.ok) throw new Error(result.error || 'Failed to reset access');

      showToast(`Reset ${user.name} to Free tier only`);
      fetchAdminData();
      if (onUserAccessChanged) onUserAccessChanged();
    } catch (err: any) {
      showToast(err.message || 'Error', 'error');
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (!confirm(`Are you sure you want to delete student account "${user.name}" (${user.email})?`)) {
      return;
    }

    try {
      const result = await safeFetchJson(`/api/admin/users/${user.id}`, { method: 'DELETE' });
      if (!result.ok) throw new Error(result.error || 'Failed to delete user');

      showToast(`Deleted student account: ${user.name}`);
      fetchAdminData();
    } catch (err: any) {
      showToast(err.message || 'Error deleting account', 'error');
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      showToast('Name and email are required.', 'error');
      return;
    }

    try {
      const result = await safeFetchJson<{ user: User }>('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newUserName.trim(),
          email: newUserEmail.trim(),
          phone: newUserPhone.trim(),
          hasPracticePass: newUserPracticePass,
          hasCertification: newUserCertification
        })
      });
      if (!result.ok || !result.data?.user) throw new Error(result.error || 'Failed to create student');

      showToast(`Created student account for ${result.data.user.name}`);
      setIsAddUserModalOpen(false);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPhone('');
      setNewUserPracticePass(false);
      setNewUserCertification(false);
      fetchAdminData();
    } catch (err: any) {
      showToast(err.message || 'Error creating user', 'error');
    }
  };

  // Open diploma studio prefilled for a student
  const handleOpenDiplomaForStudent = (student: User) => {
    setDiplomaName(student.name);
    setDiplomaCode(`QA-PRO-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 9)}`);
    setDiplomaDate(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
    setAdminSubTab('diplomaStudio');
  };

  // Generate random code for diploma
  const handleGenerateNewCode = () => {
    const randomCode = `QA-PRO-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 9)}`;
    setDiplomaCode(randomCode);
    showToast(`Generated new Credential ID: ${randomCode}`);
  };

  // Publish / Register diploma to verification ledger
  const handlePublishDiploma = async () => {
    if (!diplomaName.trim()) {
      showToast('Please specify a graduate name.', 'error');
      return;
    }

    setIsPublishingCert(true);
    try {
      const result = await safeFetchJson('/api/admin/certificates/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientName: diplomaName.trim(),
          certificateCode: diplomaCode,
          specialization: diplomaTrack,
          grade: diplomaGrade,
          courseName: 'Certified Quality Assurance Professional (CQAP™) - Master Program'
        })
      });
      if (!result.ok) throw new Error(result.error || 'Failed to register certificate');

      showToast(`Published ${diplomaCode} to Public Verification Registry!`);
      fetchAdminData();
    } catch (err: any) {
      showToast(err.message || 'Failed to publish certificate', 'error');
    } finally {
      setIsPublishingCert(false);
    }
  };

  // Print official diploma
  const handlePrintDiploma = () => {
    window.print();
  };

  // Filter students
  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      u.name.toLowerCase().includes(q) || 
      u.email.toLowerCase().includes(q) ||
      (u.phone && u.phone.includes(q));

    if (!matchesSearch) return false;

    if (filterTab === 'pending') {
      return u.paymentRequests?.some(r => r.status === 'pending');
    }
    if (filterTab === 'free') {
      return !u.access.hasPracticePass && !u.access.hasCertification && u.role !== 'admin';
    }
    if (filterTab === 'practice') {
      return u.access.hasPracticePass;
    }
    if (filterTab === 'certified') {
      return u.access.hasCertification;
    }
    return true;
  });

  const pendingRequests = allRequests.filter(r => r.status === 'pending');

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl border shadow-xl flex items-center gap-2 text-xs font-semibold animate-fadeIn ${
          toast.type === 'success' 
            ? 'bg-slate-900 border-emerald-500/50 text-emerald-300' 
            : 'bg-slate-900 border-rose-500/50 text-rose-300'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Admin Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider border border-emerald-500/20">
              Admin Workspace
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Logged in: <strong className="text-white">{currentAdminEmail || 'deepikanavneetsingh@gmail.com'}</strong>
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white font-heading mt-1">
            QAPro Academy Admin & Access Control Portal
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor registered students, verify payment UTRs, manage tiered access, and issue accredited CQAP™ diplomas.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/20"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Student</span>
          </button>

          <button
            onClick={fetchAdminData}
            disabled={isLoading}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Refresh Registry"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Primary Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setAdminSubTab('students')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            adminSubTab === 'students'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Student Directory & Access</span>
          {pendingRequests.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold animate-pulse">
              {pendingRequests.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminSubTab('diplomaStudio')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            adminSubTab === 'diplomaStudio'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Official Credential Studio (Admin Only)</span>
        </button>
      </div>

      {/* VIEW 1: STUDENT DIRECTORY & ACCESS CONTROL */}
      {adminSubTab === 'students' && (
        <div className="space-y-6">
          {/* Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
              <span className="text-slate-400 text-xs flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <span>Total Students</span>
              </span>
              <div className="text-2xl font-extrabold text-white font-heading">{stats.totalUsers}</div>
              <span className="text-[10px] text-slate-500">Registered accounts</span>
            </div>

            <div className={`border rounded-xl p-4 space-y-1 ${
              stats.pendingRequestsCount > 0 
                ? 'bg-amber-950/30 border-amber-500/40 text-amber-200' 
                : 'bg-slate-900 border-slate-800'
            }`}>
              <span className="text-xs flex items-center gap-1.5 font-medium">
                <Clock className={`w-3.5 h-3.5 ${stats.pendingRequestsCount > 0 ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
                <span>Pending UTRs</span>
              </span>
              <div className="text-2xl font-extrabold text-white font-heading">{stats.pendingRequestsCount}</div>
              <span className="text-[10px] text-amber-400 font-medium">Needs activation</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
              <span className="text-slate-400 text-xs flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                <span>Total Revenue</span>
              </span>
              <div className="text-2xl font-extrabold text-emerald-400 font-heading">
                ₹{stats.totalRevenueINR.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-slate-500">From manual activations</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
              <span className="text-slate-400 text-xs flex items-center gap-1.5">
                <Unlock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Practice Pass (₹1k)</span>
              </span>
              <div className="text-2xl font-extrabold text-indigo-300 font-heading">
                {stats.practicePassActiveCount}
              </div>
              <span className="text-[10px] text-slate-500">Active simulator users</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
              <span className="text-slate-400 text-xs flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>Certified (₹1.5k)</span>
              </span>
              <div className="text-2xl font-extrabold text-emerald-300 font-heading">
                {stats.certificationActiveCount}
              </div>
              <span className="text-[10px] text-slate-500">Awarded CQAP™ tier</span>
            </div>
          </div>

          {/* Pending Payment Review Section */}
          {pendingRequests.length > 0 && (
            <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                    <Clock className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-heading">
                      Pending Manual Payment Verification ({pendingRequests.length})
                    </h3>
                    <span className="text-[11px] text-amber-300/80">
                      Verify student UTR in your bank ledger and click "Approve & Activate"
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {pendingRequests.map((req) => (
                  <div 
                    key={req.id}
                    className="bg-slate-950 border border-amber-500/30 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-white font-heading">{req.userName}</h4>
                        <span className="text-xs text-slate-400 font-mono">{req.userEmail}</span>
                        {req.phone && (
                          <span className="text-xs text-slate-400 block mt-0.5">📞 {req.phone}</span>
                        )}
                      </div>

                      <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-xs font-bold font-mono">
                        ₹{req.amount} INR
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1 font-mono">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-500">Package:</span>
                        <strong className="text-white capitalize">{req.packageType.replace('_', ' ')}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-500">UTR / Ref:</span>
                        <span className="text-amber-300 font-bold tracking-wider">{req.utrNumber}</span>
                      </div>
                      {req.notes && (
                        <div className="text-[11px] text-slate-400 pt-1 font-sans italic border-t border-slate-800">
                          "{req.notes}"
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleApprovePayment(req.id)}
                        className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/20"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve & Activate</span>
                      </button>

                      <button
                        onClick={() => handleRejectPayment(req.id)}
                        className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 text-xs font-semibold transition-colors border border-slate-700"
                        title="Reject UTR"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Student Directory Table Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white font-heading">
                  Student Registry & Access Management
                </h3>
                <p className="text-xs text-slate-400">
                  Manage individual student permissions or toggle access instantly.
                </p>
              </div>

              {/* Search & Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, phone..."
                    className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-48 sm:w-64"
                  />
                </div>

                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
                  <button
                    onClick={() => setFilterTab('all')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${filterTab === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    All ({users.length})
                  </button>
                  <button
                    onClick={() => setFilterTab('pending')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${filterTab === 'pending' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Pending ({pendingRequests.length})
                  </button>
                  <button
                    onClick={() => setFilterTab('free')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${filterTab === 'free' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Free Only
                  </button>
                  <button
                    onClick={() => setFilterTab('practice')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${filterTab === 'practice' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Practice (₹1k)
                  </button>
                  <button
                    onClick={() => setFilterTab('certified')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${filterTab === 'certified' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Certified (₹1.5k)
                  </button>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Student Details</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-3 text-center">Dashboard & Curriculum</th>
                    <th className="py-3 px-3 text-center">Practice Pass (₹1,000)</th>
                    <th className="py-3 px-3 text-center">Certification (₹1,500)</th>
                    <th className="py-3 px-4 text-right">Actions & Diplomas</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">
                        No students found matching your search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => {
                      const hasPending = user.paymentRequests?.some(r => r.status === 'pending');
                      const isAdmin = user.role === 'admin';

                      return (
                        <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                          {/* Name & Email */}
                          <td className="py-3.5 px-4 space-y-0.5">
                            <div className="font-semibold text-white flex items-center gap-1.5">
                              <span>{user.name}</span>
                              {hasPending && (
                                <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                                  UTR Submitted
                                </span>
                              )}
                            </div>
                            <div className="text-slate-400 text-[11px] font-mono">{user.email}</div>
                            {user.phone && (
                              <div className="text-slate-500 text-[10px]">📞 {user.phone}</div>
                            )}
                          </td>

                          {/* Role */}
                          <td className="py-3.5 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                              isAdmin 
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                                : 'bg-slate-800 text-slate-300'
                            }`}>
                              {user.role}
                            </span>
                          </td>

                          {/* Free Tier */}
                          <td className="py-3.5 px-3 text-center">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold">
                              <Check className="w-3 h-3" />
                              <span>Active (Free)</span>
                            </span>
                          </td>

                          {/* Practice Pass */}
                          <td className="py-3.5 px-3 text-center">
                            <button
                              disabled={isAdmin}
                              onClick={() => handleToggleAccess(user, 'hasPracticePass')}
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                                user.access.hasPracticePass
                                  ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40 hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-500/40'
                                  : 'bg-slate-950 text-slate-500 border-slate-800 hover:bg-indigo-600 hover:text-white hover:border-indigo-500'
                              } disabled:opacity-50`}
                              title={user.access.hasPracticePass ? 'Click to Revoke' : 'Click to Activate'}
                            >
                              {user.access.hasPracticePass ? (
                                <>
                                  <Unlock className="w-3 h-3 text-indigo-400" />
                                  <span>Active</span>
                                </>
                              ) : (
                                <>
                                  <Lock className="w-3 h-3 text-slate-500" />
                                  <span>Blocked (₹1k)</span>
                                </>
                              )}
                            </button>
                          </td>

                          {/* Certification */}
                          <td className="py-3.5 px-3 text-center">
                            <button
                              disabled={isAdmin}
                              onClick={() => handleToggleAccess(user, 'hasCertification')}
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                                user.access.hasCertification
                                  ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40 hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-500/40'
                                  : 'bg-slate-950 text-slate-500 border-slate-800 hover:bg-emerald-600 hover:text-white hover:border-emerald-500'
                              } disabled:opacity-50`}
                              title={user.access.hasCertification ? 'Click to Revoke' : 'Click to Activate'}
                            >
                              {user.access.hasCertification ? (
                                <>
                                  <Award className="w-3 h-3 text-emerald-400" />
                                  <span>Active</span>
                                </>
                              ) : (
                                <>
                                  <Lock className="w-3 h-3 text-slate-500" />
                                  <span>Blocked (₹1.5k)</span>
                                </>
                              )}
                            </button>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Open in Diploma Studio */}
                              <button
                                onClick={() => handleOpenDiplomaForStudent(user)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/70 text-emerald-300 text-[11px] font-semibold border border-emerald-500/40 flex items-center gap-1"
                                title="Issue & Print Official Diploma (Admin Exclusive)"
                              >
                                <Award className="w-3 h-3 text-emerald-400" />
                                <span>Issue Diploma</span>
                              </button>

                              <button
                                onClick={() => handleGrantAllAccess(user)}
                                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700"
                                title="Grant Full VIP Access"
                              >
                                VIP
                              </button>

                              <button
                                onClick={() => handleResetToFree(user)}
                                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-[11px] font-medium border border-slate-700"
                                title="Reset to Free Tier"
                              >
                                Reset
                              </button>

                              {!isAdmin && (
                                <button
                                  onClick={() => handleDeleteUser(user)}
                                  className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                                  title="Delete Student"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: OFFICIAL CREDENTIAL STUDIO (ADMIN ONLY) */}
      {adminSubTab === 'diplomaStudio' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-emerald-950/50 via-slate-900 to-indigo-950/40 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Exclusive • Official CQAP™ Credential Issuer</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                Official Credential Studio & High-Res Diploma Generator
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                As Director, customize accredited CQAP™ diplomas for certified graduates, print physical or PDF diplomas with gold accreditation crests, and publish certificates directly to the Public Verification Registry.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <button
                onClick={handlePrintDiploma}
                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Diploma (PDF)</span>
              </button>

              <button
                onClick={handlePublishDiploma}
                disabled={isPublishingCert}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <FileCheck className="w-4 h-4" />
                <span>{isPublishingCert ? 'Publishing...' : 'Publish to Public Registry'}</span>
              </button>
            </div>
          </div>

          {/* Studio Controls Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span>Diploma Configuration Controls</span>
              </h3>
              <span className="text-[11px] text-slate-400">
                Changes reflect in real-time on the diploma canvas below
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* Recipient Name */}
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">Graduate Recipient Name</label>
                <input
                  type="text"
                  value={diplomaName}
                  onChange={(e) => setDiplomaName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Specialization Track */}
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">Accredited Specialization Track</label>
                <select
                  value={diplomaTrack}
                  onChange={(e) => setDiplomaTrack(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Omnichannel QA, Six Sigma & Calibration Variance">Omnichannel QA, Six Sigma & Variance</option>
                  <option value="FinTech Compliance, AML/KYC & PCI-DSS Audit Governance">FinTech Compliance, AML/KYC & PCI-DSS</option>
                  <option value="Healthcare HIPAA Compliance, PHI & Medical Audits">Healthcare HIPAA & Medical Auditing</option>
                  <option value="Enterprise SaaS Tier 3 Support Audits & SLA Governance">Enterprise SaaS Support & SLA Governance</option>
                  <option value="Global Contact Center Operations & Quality Calibration">Global Operations & Quality Calibration</option>
                </select>
              </div>

              {/* Honors / Grade */}
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">Standing / Grade</label>
                <select
                  value={diplomaGrade}
                  onChange={(e) => setDiplomaGrade(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Distinction (96.4%)">Distinction (96.4%)</option>
                  <option value="High Honors (98.2%)">High Honors (98.2%)</option>
                  <option value="Master Calibration Standing (95.0%)">Master Calibration Standing (95.0%)</option>
                  <option value="Honors (93.8%)">Honors (93.8%)</option>
                  <option value="Certified (Passed 91.2%)">Certified (Passed 91.2%)</option>
                </select>
              </div>

              {/* Credential Code */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-semibold block">Credential ID</label>
                  <button
                    onClick={handleGenerateNewCode}
                    className="text-[10px] text-emerald-400 hover:text-emerald-300 font-mono"
                  >
                    Generate New
                  </button>
                </div>
                <input
                  type="text"
                  value={diplomaCode}
                  onChange={(e) => setDiplomaCode(e.target.value.toUpperCase())}
                  placeholder="QA-PRO-8492-X9"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* The High-Resolution Official Diploma Canvas */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-semibold uppercase tracking-wider text-[11px] text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Live High-Resolution Diploma Canvas</span>
              </span>
              <span>Formatted for A4 / Letter Landscape physical print</span>
            </div>

            {/* Official Diploma Printable Canvas */}
            <div 
              id="official-diploma-print-area"
              className="relative w-full rounded-2xl bg-[#090e17] border-4 border-[#c5a059] p-8 sm:p-14 text-center overflow-hidden shadow-2xl"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 0 40px rgba(197, 160, 89, 0.15)'
              }}
            >
              {/* Inner Decorative Golden Border */}
              <div className="absolute inset-3 sm:inset-4 border border-[#c5a059]/40 pointer-events-none rounded-lg" />
              <div className="absolute inset-5 sm:inset-6 border border-dashed border-[#c5a059]/20 pointer-events-none rounded" />

              {/* Subtle watermark seal in background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-2xl pointer-events-none" />

              <div className="relative space-y-6 max-w-3xl mx-auto">
                {/* Header Crest */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#c5a059] to-[#8a6825] p-0.5 shadow-lg shadow-[#c5a059]/20 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#090e17] flex items-center justify-center text-[#c5a059]">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                  </div>

                  <span className="text-[11px] font-bold tracking-[0.25em] text-[#c5a059] uppercase font-sans">
                    QAPro Global Accreditation Council & AI Studio
                  </span>
                  
                  <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-wider font-heading uppercase">
                    Certificate of Excellence
                  </h3>
                  <span className="text-xs text-slate-400 font-sans tracking-widest uppercase">
                    Accredited Professional Qualification • CQAP™ 2026
                  </span>
                </div>

                {/* Subtitle */}
                <p className="text-xs text-slate-300 italic font-serif">
                  This official document certifies that
                </p>

                {/* Recipient Full Name */}
                <div className="py-2">
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 font-serif tracking-tight border-b-2 border-[#c5a059]/40 pb-3 max-w-xl mx-auto">
                    {diplomaName || 'Alex Rivera'}
                  </h2>
                </div>

                {/* Conferral Text */}
                <p className="text-xs text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
                  has successfully completed all rigorous proctored requirements, practical audit simulations, and calibrated benchmark evaluations, and is hereby awarded the accredited designation of
                </p>

                {/* Course Award Title */}
                <div className="space-y-1">
                  <div className="text-base sm:text-xl font-bold text-indigo-300 font-heading">
                    Certified Quality Assurance Professional (CQAP™)
                  </div>
                  <div className="text-xs text-emerald-400 font-semibold font-mono">
                    Specialization: {diplomaTrack}
                  </div>
                  <div className="text-[11px] text-amber-300/90 font-medium">
                    Standing: {diplomaGrade}
                  </div>
                </div>

                {/* Signatures & Seal Section */}
                <div className="pt-8 grid grid-cols-3 items-end gap-4 text-xs border-t border-slate-800/80">
                  {/* Left Signature */}
                  <div className="space-y-1 text-center">
                    <div className="font-serif italic text-base text-slate-300 border-b border-slate-700 pb-1">
                      Avery Vance, Ph.D.
                    </div>
                    <span className="text-[10px] text-slate-400 block font-sans">
                      Lead Calibrations Director
                    </span>
                  </div>

                  {/* Center Golden Seal */}
                  <div className="flex flex-col items-center space-y-1">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#e8c67c] via-[#c5a059] to-[#8a6825] p-1 shadow-lg shadow-[#c5a059]/30 flex items-center justify-center">
                      <div className="w-full h-full rounded-full border border-dashed border-[#090e17] flex flex-col items-center justify-center text-[#090e17] text-[8px] font-black uppercase text-center leading-none">
                        <span>OFFICIAL</span>
                        <Award className="w-3.5 h-3.5 my-0.5" />
                        <span>SEAL</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-[#c5a059] uppercase tracking-wider font-bold">
                      ISO 9001:2015 QA
                    </span>
                  </div>

                  {/* Right Signature */}
                  <div className="space-y-1 text-center">
                    <div className="font-serif italic text-base text-slate-300 border-b border-slate-700 pb-1">
                      Elena Rostova
                    </div>
                    <span className="text-[10px] text-slate-400 block font-sans">
                      Global Standards Board
                    </span>
                  </div>
                </div>

                {/* Bottom Verification Footer */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/40">
                  <div>
                    <span>Date of Issuance: </span>
                    <strong className="text-slate-200">{diplomaDate}</strong>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-emerald-400">
                    <Fingerprint className="w-3.5 h-3.5" />
                    <span>Credential ID: <strong className="text-white">{diplomaCode}</strong></span>
                  </div>

                  <div className="text-slate-400">
                    Verify at: <span className="font-mono text-indigo-300">/verify</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Published Verification Registry (Admin Record) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <span>Public Ledger Database ({issuedCertificates.length} Records)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  All certificates below can be publicly authenticated on the verification portal by anyone.
                </p>
              </div>

              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                Public Ledger Active
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Credential Code</th>
                    <th className="py-3 px-3">Graduate Name</th>
                    <th className="py-3 px-3">Specialization Track</th>
                    <th className="py-3 px-3">Honors / Grade</th>
                    <th className="py-3 px-3">Issued Date</th>
                    <th className="py-3 px-4 text-right">Admin Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                  {issuedCertificates.map((cert) => (
                    <tr key={cert.certificateCode} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                        {cert.certificateCode}
                      </td>
                      <td className="py-3 px-3 font-semibold text-white">
                        {cert.recipientName}
                      </td>
                      <td className="py-3 px-3 text-slate-300 max-w-xs truncate">
                        {cert.specialization}
                      </td>
                      <td className="py-3 px-3 text-amber-300 font-mono">
                        {cert.grade}
                      </td>
                      <td className="py-3 px-3 text-slate-400">
                        {cert.issuedDate}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setDiplomaName(cert.recipientName);
                            setDiplomaCode(cert.certificateCode);
                            setDiplomaTrack(cert.specialization);
                            setDiplomaGrade(cert.grade);
                            setDiplomaDate(cert.issuedDate);
                            showToast(`Loaded ${cert.certificateCode} into canvas`);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium border border-slate-700"
                        >
                          Load into Canvas
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white font-heading">
                Create New Student Account
              </h3>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Legal Full Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Ananya Sen"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="ananya@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">WhatsApp / Phone</label>
                <input
                  type="tel"
                  value={newUserPhone}
                  onChange={(e) => setNewUserPhone(e.target.value)}
                  placeholder="+91 98765 00000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">Initial Access Activation:</span>
                
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newUserPracticePass}
                    onChange={(e) => setNewUserPracticePass(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
                  />
                  <span>Activate QA Practice & Simulator Pass (₹1,000)</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newUserCertification}
                    onChange={(e) => setNewUserCertification(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-700 text-emerald-600 focus:ring-0"
                  />
                  <span>Activate CQAP™ Official Certification (₹1,500)</span>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 shadow-md"
                >
                  Create & Activate Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
