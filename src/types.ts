export type ThemeMode = 'dark' | 'light';

export type TabType = 
  | 'home'
  | 'dashboard' 
  | 'courses' 
  | 'assessments' 
  | 'audits' 
  | 'interviews' 
  | 'domains' 
  | 'tutor' 
  | 'progress' 
  | 'certificates' 
  | 'verify'
  | 'admin';

export interface UserAccess {
  hasDashboard: boolean;
  hasCurriculum: boolean;
  hasPracticePass: boolean; // INR 1000 package
  hasCertification: boolean; // INR 1500 package
}

export interface PaymentRequest {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  amount: number; // 1000 or 1500
  packageType: 'practice_pass' | 'certification';
  utrNumber: string;
  phone?: string;
  notes?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'student' | 'admin';
  createdAt: string;
  access: UserAccess;
  paymentRequests?: PaymentRequest[];
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  overview: string;
  content: string[];
  keyTakeaways: string[];
  practicalApplication?: string;
  formula?: {
    name: string;
    expression: string;
    description: string;
    example: string;
  };
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  shortDescription: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalDurationHours: number;
  iconName: string;
  lessons: Lesson[];
  prerequisites?: string[];
  learningOutcomes: string[];
}

export interface QuizQuestion {
  id: string;
  moduleId: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Foundation' | 'Practitioner' | 'Mastery';
}

export interface AuditCriterion {
  id: string;
  category: 'Greeting & Verification' | 'Empathy & Soft Skills' | 'Resolution & Accuracy' | 'Compliance & Security' | 'Wrap-up & Tool Usage';
  label: string;
  description: string;
  maxPoints: number;
  isFatal: boolean; // If failed, entire audit fails (0%)
  benchmarkScore: number;
  scoringGuide: string;
}

export interface AuditScenario {
  id: string;
  title: string;
  channel: 'Voice Call' | 'Live Chat' | 'Email Ticket' | 'Escalated Tier 2' | 'Social Care';
  domain: string;
  duration: string;
  agentName: string;
  customerName: string;
  difficulty: 'Standard' | 'Challenging' | 'Expert';
  scenarioSummary: string;
  customerSentiment: 'Frustrated' | 'Distressed' | 'Confused' | 'Demanding' | 'Neutral';
  transcript: {
    speaker: 'agent' | 'customer' | 'system';
    timestamp: string;
    text: string;
    isKeyMoment?: boolean;
    annotation?: string;
  }[];
  audioDurationSeconds?: number;
  criteria: AuditCriterion[];
  benchmarkScore: number;
  benchmarkNotes: string;
}

export interface InterviewQuestionItem {
  id: string;
  question: string;
  intent: string;
  keyLookouts: string[];
  sampleStrongPoint: string;
}

export interface InterviewScenario {
  id: string;
  roleTitle: string;
  companyProfile: string;
  level: 'Junior QA Analyst' | 'Senior QA Specialist' | 'Quality Team Lead' | 'Global QA Manager';
  briefing: string;
  questions: InterviewQuestionItem[];
}

export interface DomainSpecialization {
  id: string;
  name: string;
  category: 'Financial Services' | 'Healthcare & Life Sciences' | 'Technology & SaaS' | 'Consumer & Retail' | 'Operations & Trust';
  badgeColor: string;
  summary: string;
  criticalMetrics: {
    metric: string;
    target: string;
    importance: string;
  }[];
  fatalErrorTraps: string[];
  regulatoryMandates: string[];
  scorecardFocus: string;
  careerRoles: string[];
}

export interface CertificateRecord {
  id: string;
  code: string;
  recipientName: string;
  program: string;
  issueDate: string;
  grade: string;
  overallScore: number;
  modulesCompleted: number;
  auditsPassed: number;
  qrHash: string;
}

export interface InterviewEvaluation {
  score: number;
  rating: string;
  strengths: string[];
  improvements: string[];
  detailedFeedback: string;
  idealAnswerSummary?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
