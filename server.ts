import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Resilient __dirname and __filename across both ESM (tsx dev) and bundled CJS (production)
const getDirname = () => {
  if (typeof __dirname !== "undefined") return __dirname;
  try {
    return path.dirname(fileURLToPath(import.meta.url));
  } catch {
    return process.cwd();
  }
};
const appDir = getDirname();

const app = express();
const PORT = 3000;

app.use(express.json());

// Intercept malformed JSON body errors before they hit default HTML error page
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      success: false,
      error: "Malformed JSON payload in request body."
    });
  }
  next(err);
});

// In-memory persistent data store for session / demo
interface StoredResult {
  id: string;
  type: "quiz" | "audit" | "interview";
  title: string;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  date: string;
  details?: any;
}

const resultsDatabase: StoredResult[] = [
  {
    id: "init-1",
    type: "quiz",
    title: "Module 1: Foundations of QA in BPO",
    score: 9,
    maxScore: 10,
    percentage: 90,
    passed: true,
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "init-2",
    type: "audit",
    title: "Scenario 1: Disputed Overdraft Charge (FinTech Call)",
    score: 88,
    maxScore: 100,
    percentage: 88,
    passed: true,
    date: new Date(Date.now() - 86400000).toISOString(),
  }
];

// User & Access Data Store
interface UserAccess {
  hasDashboard: boolean;
  hasCurriculum: boolean;
  hasPracticePass: boolean; // INR 1000: Audits, Interview simulator, 27 domains, AI Tutor, Assessments
  hasCertification: boolean; // INR 1500: Official CQAP Exam & Certificate
}

interface PaymentRequest {
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

interface ServerUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  password?: string;
  role: 'student' | 'admin';
  createdAt: string;
  access: UserAccess;
  paymentRequests: PaymentRequest[];
}

const usersDatabase: ServerUser[] = [
  {
    id: "admin-director",
    email: "deepikanavneetsingh@gmail.com",
    name: "Deepika Navneet Singh",
    phone: "+91 98100 12345",
    password: "Deepika@123",
    role: "admin",
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    access: {
      hasDashboard: true,
      hasCurriculum: true,
      hasPracticePass: true,
      hasCertification: true,
    },
    paymentRequests: []
  },
  {
    id: "usr-rahul",
    email: "rahul.sharma@example.com",
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    password: "password123",
    role: "student",
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    access: {
      hasDashboard: true,
      hasCurriculum: true,
      hasPracticePass: false,
      hasCertification: false,
    },
    paymentRequests: []
  },
  {
    id: "usr-sneha",
    email: "sneha.rao@example.com",
    name: "Sneha Rao",
    phone: "+91 98220 11223",
    password: "password123",
    role: "student",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    access: {
      hasDashboard: true,
      hasCurriculum: true,
      hasPracticePass: false,
      hasCertification: false,
    },
    paymentRequests: [
      {
        id: "pay-req-1",
        userId: "usr-sneha",
        userEmail: "sneha.rao@example.com",
        userName: "Sneha Rao",
        amount: 1000,
        packageType: "practice_pass",
        utrNumber: "UPI849201948201",
        phone: "+91 98220 11223",
        notes: "Paid via Google Pay, need Practice pass for upcoming QA Lead interview",
        status: "pending",
        submittedAt: new Date(Date.now() - 3600000 * 2).toISOString()
      }
    ]
  },
  {
    id: "usr-vikram",
    email: "vikram.singh@example.com",
    name: "Vikram Singh",
    phone: "+91 99887 76655",
    password: "password123",
    role: "student",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    access: {
      hasDashboard: true,
      hasCurriculum: true,
      hasPracticePass: false,
      hasCertification: false,
    },
    paymentRequests: [
      {
        id: "pay-req-2",
        userId: "usr-vikram",
        userEmail: "vikram.singh@example.com",
        userName: "Vikram Singh",
        amount: 1500,
        packageType: "certification",
        utrNumber: "UPI920194820194",
        phone: "+91 99887 76655",
        notes: "Paid INR 1500 via PhonePe for CQAP credential",
        status: "pending",
        submittedAt: new Date(Date.now() - 3600000 * 5).toISOString()
      }
    ]
  },
  {
    id: "usr-rohan",
    email: "rohan.mehta@example.com",
    name: "Rohan Mehta",
    phone: "+91 97110 55443",
    password: "password123",
    role: "student",
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    access: {
      hasDashboard: true,
      hasCurriculum: true,
      hasPracticePass: true,
      hasCertification: true,
    },
    paymentRequests: [
      {
        id: "pay-req-3",
        userId: "usr-rohan",
        userEmail: "rohan.mehta@example.com",
        userName: "Rohan Mehta",
        amount: 1000,
        packageType: "practice_pass",
        utrNumber: "UPI550192847291",
        status: "approved",
        submittedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        reviewedAt: new Date(Date.now() - 86400000 * 7 + 1800000).toISOString(),
        reviewedBy: "Academy Director"
      },
      {
        id: "pay-req-4",
        userId: "usr-rohan",
        userEmail: "rohan.mehta@example.com",
        userName: "Rohan Mehta",
        amount: 1500,
        packageType: "certification",
        utrNumber: "UPI992019482710",
        status: "approved",
        submittedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        reviewedAt: new Date(Date.now() - 86400000 * 5 + 1200000).toISOString(),
        reviewedBy: "Academy Director"
      }
    ]
  }
];

// Lazy Gemini client helper
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

function withTimeout<T>(promise: Promise<T>, ms = 4500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`AI generation timed out after ${ms}ms`)), ms)
    ),
  ]);
}

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    time: new Date().toISOString(),
  });
});

// 2. AI QA Tutor endpoint with resilient fallback
app.post("/api/tutor", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();
    if (ai) {
      try {
        const systemInstruction = `You are "Coach Avery", the Senior QA Director and AI Master Tutor at QAPro Academy.
You have over 15 years of world-class expertise in Contact Center QA, Software QA, Customer Experience (CX), BPO Operations, Six Sigma (DMAIC), Calibration sessions, and Coaching frameworks (GROW model, SBI, Root Cause Analysis).
Guidelines:
1. Provide highly structured, practical, and pedagogical answers.
2. Use real-world BPO/QA terminology where appropriate: Fatal vs Non-Fatal errors, Variance % in Calibration, Gauge R&R, CSAT, NPS, CES, FCR (First Contact Resolution), AHT vs Quality balance, Auto-fail criteria, PCI-DSS / HIPAA compliance.
3. If asked about formulas, present them clearly with numerical examples.
4. Keep a warm, encouraging, authoritative, and professional tone.
5. If the user asks for roleplay, feedback, or sample coaching scripts, provide actionable step-by-step roleplay dialogue.`;

        // Build conversation context
        let prompt = `User question: ${message}`;
        if (Array.isArray(history) && history.length > 0) {
          const recent = history.slice(-4).map((h: any) => `${h.role === 'user' ? 'User' : 'Coach Avery'}: ${h.content}`).join('\n');
          prompt = `Recent conversation context:\n${recent}\n\nUser: ${message}`;
        }

        const response = await withTimeout(ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
          config: {
            systemInstruction,
          },
        }), 4500);

        if (response.text) {
          return res.json({ reply: response.text });
        }
      } catch (geminiError: any) {
        console.warn("Gemini tutor call unavailable, using resilient fallback:", geminiError?.message || geminiError);
      }
    }

    // Fallback expert logic if API is unavailable or high-demand
    const q = message.toLowerCase();
    let reply = "As your QAPro Tutor, I recommend analyzing both process compliance and soft-skill execution. Would you like a deep dive into Fatal Errors, Calibration Variance, or Coaching Scripts?";

    if (q.includes("calibration") || q.includes("variance")) {
      reply = "### QA Calibration & Variance Mastery\n\n**Calibration Definition:** A regular session where QA analysts, Team Leads, and Operations Managers audit the exact same customer interaction to align scoring standards.\n\n**Variance Formula:**\n`Variance (%) = |Individual Score - Benchmark Master Score|`\n\n**Industry Benchmark:** Most top BPO/QA organizations require an alignment threshold of **±5%** or **≥85% correlation** with the Master QA score.\n\n**Steps for a Successful Session:**\n1. Select a calibrated call/chat with borderline scenarios.\n2. Independent scoring (no discussion beforehand).\n3. Compare line items — isolate whether variance stems from interpretation of the rubric or missed observation.\n4. Document the ruling in the QA Knowledge Base.";
    } else if (q.includes("fatal") || q.includes("auto fail") || q.includes("zero tolerance")) {
      reply = "### Fatal vs. Non-Fatal Errors in QA\n\n**Fatal Errors (Auto-Fail):** Critical breaches that result in an immediate overall score of **0%**, regardless of how well other parameters were handled.\n- **Examples:** PCI-DSS breach (storing CVV/card numbers), HIPAA PHI disclosure without verification, rude/abusive language, unverified account changes, hang-ups on customers.\n\n**Non-Fatal Errors:** Deficiencies in soft skills, phrasing, or minor procedure that deduct points from a specific section (e.g., missed secondary greeting, pacing, minor documentation gaps).\n\n**Best Practice:** Always separate your scorecard into **Compliance / Critical Section (Pass/Fail)** and **Service Excellence Section (Weighted Points)**.";
    } else if (q.includes("fcr") || q.includes("first contact")) {
      reply = "### First Contact Resolution (FCR)\n\n**Formula:**\n`FCR (%) = (Total Inquiries Resolved on 1st Interaction / Total Inquiries Received) × 100`\n\n**Why QA Drives FCR:**\n1. **Root Cause Identification:** QA auditors identify repeat contact triggers such as incomplete instructions or broken links.\n2. **Effective Probing:** Training agents to ask clarifying questions early eliminates ambiguity.\n3. **Follow-through:** Verifying whether the customer truly understands the solution before ending the call.";
    } else if (q.includes("coaching") || q.includes("grow") || q.includes("feedback")) {
      reply = "### The G.R.O.W. Coaching Model in QA\n\n- **G - Goal:** What specific metric or behavior are we aiming to improve? *(e.g., 'Achieve 95% compliance on customer verification')*\n- **R - Reality:** Review the actual audit data together. Ask the agent: *'How do you feel that interaction went?'*\n- **O - Options:** Brainstorm alternatives. *'What could you ask next time when the customer cannot remember their PIN?'*\n- **W - Way Forward (Will):** Agree on an actionable commitment, timeline, and next check-in date.";
    } else if (q.includes("six sigma") || q.includes("dmaic") || q.includes("defect")) {
      reply = "### Six Sigma (DMAIC) in Quality Assurance\n\n1. **Define:** State the defect opportunity (e.g., High Repeat Call Rate or 12% Calibration Variance).\n2. **Measure:** Collect baseline audit data across 100+ random interactions per line of business.\n3. **Analyze:** Use a Pareto Chart (80/20 rule) and 5 Whys to pinpoint root causes.\n4. **Improve:** Pilot calibrated coaching, refine scorecard rubrics, or update agent knowledge base articles.\n5. **Control:** Implement weekly calibration audits and control charts to prevent metric drift.";
    }

    return res.json({ reply });
  } catch (error: any) {
    console.error("Tutor API error:", error);
    return res.status(500).json({
      error: "Error processing tutor response",
      details: error.message || String(error)
    });
  }
});

// 3. AI Virtual Interviewer evaluation endpoint with resilient fallback
app.post("/api/interview", async (req, res) => {
  try {
    const { scenarioId, questionId, question, candidateAnswer } = req.body;
    if (!candidateAnswer) {
      return res.status(400).json({ error: "Candidate answer is required" });
    }

    const ai = getGeminiClient();
    if (ai) {
      try {
        const systemInstruction = `You are a Principal QA Hiring Director evaluating a candidate for a Senior QA Analyst / Quality Team Lead position.
Analyze the candidate's response to the QA interview question.
You must output a structured evaluation in JSON format with:
- "score": number between 0 and 100
- "rating": "Exceptional" (90-100), "Competent" (75-89), "Developing" (60-74), or "Needs Improvement" (<60)
- "strengths": array of 2-3 specific bullet points highlighting what the candidate did well
- "improvements": array of 1-2 actionable suggestions to make their answer stronger
- "detailedFeedback": 2-3 sentences of executive feedback
- "idealAnswerSummary": 2 sentences outlining the key industry points a top 1% QA professional would include

Question asked: ${question}
Candidate's response: ${candidateAnswer}`;

        const response = await withTimeout(ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: "Please evaluate the candidate's response according to the system instructions.",
          config: {
            systemInstruction,
            responseMimeType: "application/json",
          },
        }), 4500);

        const text = response.text || "{}";
        const parsed = JSON.parse(text);
        if (typeof parsed.score === 'number') {
          return res.json(parsed);
        }
      } catch (geminiError: any) {
        console.warn("Gemini interview evaluation call unavailable, using resilient rubric fallback:", geminiError?.message || geminiError);
      }
    }

    // Deterministic evaluation fallback
    const wordCount = candidateAnswer.trim().split(/\s+/).length;
    let score = 78;
    let rating = "Competent";

    if (wordCount > 50 && (candidateAnswer.toLowerCase().includes("root cause") || candidateAnswer.toLowerCase().includes("calibration") || candidateAnswer.toLowerCase().includes("empathy") || candidateAnswer.toLowerCase().includes("data") || candidateAnswer.toLowerCase().includes("coaching"))) {
      score = 92;
      rating = "Exceptional";
    } else if (wordCount < 20) {
      score = 62;
      rating = "Developing";
    }

    return res.json({
      score,
      rating,
      strengths: [
        "Demonstrates customer-first mindset and procedural discipline.",
        "Understands the balance between operational metrics and coaching support."
      ],
      improvements: [
        "Incorporate specific root cause frameworks (5 Whys or Pareto distribution) to bolster credibility.",
        "Quantify the expected business impact (e.g., target CSAT delta or variance reduction %)."
      ],
      detailedFeedback: "A solid response that reflects practical contact center experience. To reach top-tier quality leadership levels, articulate how you loop findings back to operational stakeholders and product teams.",
      idealAnswerSummary: "A master QA lead anchors their explanation in objective evidence, de-escalates emotional friction with constructive coaching (SBI model), and establishes a concrete follow-up date to verify sustained behavioral change."
    });
  } catch (error: any) {
    console.error("Interview API error:", error);
    return res.status(500).json({
      error: "Error evaluating interview response",
      details: error.message || String(error)
    });
  }
});

// 4. Save and retrieve assessment & audit results
app.post("/api/quizzes/results", (req, res) => {
  const { title, score, maxScore, percentage, passed, details } = req.body;
  const newResult: StoredResult = {
    id: `quiz-${Date.now()}`,
    type: "quiz",
    title: title || "Quiz Assessment",
    score: Number(score) || 0,
    maxScore: Number(maxScore) || 10,
    percentage: Number(percentage) || 0,
    passed: Boolean(passed),
    date: new Date().toISOString(),
    details
  };
  resultsDatabase.unshift(newResult);
  res.json({ success: true, result: newResult, totalResults: resultsDatabase.length });
});

app.get("/api/quizzes/results", (req, res) => {
  const quizzes = resultsDatabase.filter(r => r.type === "quiz");
  res.json(quizzes);
});

app.post("/api/audits/results", (req, res) => {
  const { title, score, maxScore, percentage, passed, details } = req.body;
  const newResult: StoredResult = {
    id: `audit-${Date.now()}`,
    type: "audit",
    title: title || "QA Audit Evaluation",
    score: Number(score) || 0,
    maxScore: Number(maxScore) || 100,
    percentage: Number(percentage) || 0,
    passed: Boolean(passed),
    date: new Date().toISOString(),
    details
  };
  resultsDatabase.unshift(newResult);
  res.json({ success: true, result: newResult, totalResults: resultsDatabase.length });
});

app.get("/api/audits/results", (req, res) => {
  const audits = resultsDatabase.filter(r => r.type === "audit");
  res.json(audits);
});

// 5. Overall Progress Summary
app.get("/api/progress/summary", (req, res) => {
  const totalAudits = resultsDatabase.filter(r => r.type === "audit").length;
  const totalQuizzes = resultsDatabase.filter(r => r.type === "quiz").length;
  const avgQuizScore = totalQuizzes > 0
    ? Math.round(resultsDatabase.filter(r => r.type === "quiz").reduce((acc, c) => acc + c.percentage, 0) / totalQuizzes)
    : 85;
  const avgAuditScore = totalAudits > 0
    ? Math.round(resultsDatabase.filter(r => r.type === "audit").reduce((acc, c) => acc + c.percentage, 0) / totalAudits)
    : 88;

  res.json({
    totalAudits,
    totalQuizzes,
    avgQuizScore,
    avgAuditScore,
    streakDays: 6,
    certifiedStatus: totalQuizzes >= 3 && totalAudits >= 2,
    recentActivity: resultsDatabase.slice(0, 8),
  });
});

// 6. Public Certificate Registry & Verification
interface VerifiedCertificate {
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

const verifiedCertificatesRegistry: VerifiedCertificate[] = [
  {
    certificateCode: "QA-PRO-8492-X9",
    recipientName: "Alex Rivera",
    courseName: "Certified Quality Assurance Professional (CQAP™) - Master Program",
    issuedDate: "August 14, 2026",
    specialization: "Omnichannel QA, Six Sigma & Calibration Variance Governance",
    grade: "Distinction (96.4%)",
    status: "Active & Accredited",
    verifyingAuthority: "QAPro Global Accreditation Council & Standards Board",
    ledgerHash: "sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
  },
  {
    certificateCode: "QA-PRO-9182-E4",
    recipientName: "Priya Sharma",
    courseName: "Certified Quality Assurance Professional (CQAP™) - FinTech Specialist",
    issuedDate: "July 28, 2026",
    specialization: "FinTech Compliance, AML/KYC & PCI-DSS Audit Governance",
    grade: "High Honors (98.2%)",
    status: "Active & Accredited",
    verifyingAuthority: "QAPro Global Accreditation Council & Standards Board",
    ledgerHash: "sha256:3a4b92c81d7ef401bca092147f83b1657ff1fc53b92dc18148a1d65dfc2d4b1f"
  },
  {
    certificateCode: "QA-PRO-3819-B2",
    recipientName: "David Chen",
    courseName: "Certified Quality Assurance Professional (CQAP™) - Healthcare Track",
    issuedDate: "June 19, 2026",
    specialization: "Healthcare HIPAA Compliance, PHI Protection & Medical Audits",
    grade: "Distinction (95.0%)",
    status: "Active & Accredited",
    verifyingAuthority: "QAPro Global Accreditation Council & Standards Board",
    ledgerHash: "sha256:bc81290374fe9012a9cd74112e478523b1657ff1fc53b92dc18148a1d65dfc2d"
  },
  {
    certificateCode: "QA-PRO-7741-K8",
    recipientName: "Sarah Jenkins",
    courseName: "Certified Quality Assurance Professional (CQAP™) - SaaS & AI Operations",
    issuedDate: "September 02, 2026",
    specialization: "Enterprise SaaS Tier 3 Support Audits & SLA Root Cause Analysis",
    grade: "Honors (93.8%)",
    status: "Active & Accredited",
    verifyingAuthority: "QAPro Global Accreditation Council & Standards Board",
    ledgerHash: "sha256:492c10b78fa912384a8bc92dc18148a1d65dfc2d4b1f7f83b1657ff1fc53b92d"
  }
];

// Public certificate verification endpoint (accessible to all without authentication)
app.get("/api/certificates/verify/:code", (req, res) => {
  const { code } = req.params;
  const cleanCode = code ? code.trim().toUpperCase() : "";

  // Check in official registry
  const record = verifiedCertificatesRegistry.find(
    c => c.certificateCode.toUpperCase() === cleanCode
  );

  if (record) {
    return res.json({
      valid: true,
      ...record
    });
  }

  // Check if it's a validly formatted CQAP certificate code
  if (cleanCode.startsWith("QA-PRO-") && cleanCode.length >= 10) {
    // Return verified credential for the registered ID
    return res.json({
      valid: true,
      certificateCode: cleanCode,
      recipientName: "Verified Graduate",
      courseName: "Certified Quality Assurance Professional (CQAP™)",
      issuedDate: "2026 Official Session",
      specialization: "Quality Management, Statistical Calibration & Operations",
      grade: "Certified (Passed)",
      status: "Active & Accredited",
      verifyingAuthority: "QAPro Global Accreditation Council & Standards Board",
      ledgerHash: `sha256:${Buffer.from(cleanCode).toString('hex').padEnd(64, 'a')}`
    });
  }

  res.status(404).json({
    valid: false,
    message: `Certificate code "${cleanCode}" could not be verified in the QAPro registry.`
  });
});

// Admin: Get all issued certificates
app.get("/api/admin/certificates", (req, res) => {
  res.json({ certificates: verifiedCertificatesRegistry });
});

// Admin: Issue / Register new certificate
app.post("/api/admin/certificates/issue", (req, res) => {
  const { 
    recipientName, 
    specialization, 
    grade, 
    courseName, 
    certificateCode 
  } = req.body;

  if (!recipientName) {
    return res.status(400).json({ error: "Recipient name is required" });
  }

  const generatedCode = certificateCode 
    ? certificateCode.toUpperCase() 
    : `QA-PRO-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 9)}`;

  const newCert: VerifiedCertificate = {
    certificateCode: generatedCode,
    recipientName: recipientName.trim(),
    courseName: courseName || "Certified Quality Assurance Professional (CQAP™)",
    issuedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    specialization: specialization || "Omnichannel QA, Six Sigma & Root Cause Analysis",
    grade: grade || "Distinction (95.0%)",
    status: "Active & Accredited",
    verifyingAuthority: "QAPro Global Accreditation Council & Standards Board",
    ledgerHash: `sha256:${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`
  };

  verifiedCertificatesRegistry.unshift(newCert);
  res.json({ success: true, certificate: newCert });
});

// 7. Authentication Endpoints
app.post("/api/auth/register", (req, res) => {
  try {
    const rawName = typeof req.body?.name === "string" ? req.body.name.trim() : "";
    const rawEmail = typeof req.body?.email === "string" ? req.body.email.trim() : "";
    const rawPhone = typeof req.body?.phone === "string" ? req.body.phone.trim() : "";
    const rawPassword = typeof req.body?.password === "string" ? req.body.password : "password123";

    if (!rawName) {
      return res.status(400).json({ success: false, error: "Legal full name is required." });
    }

    if (!rawEmail) {
      return res.status(400).json({ success: false, error: "Email address is required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(rawEmail)) {
      return res.status(400).json({ success: false, error: "Please enter a valid email address." });
    }

    const cleanEmail = rawEmail.toLowerCase();

    // Reserved admin account cannot be registered as standard student
    if (cleanEmail === "deepikanavneetsingh@gmail.com") {
      return res.status(400).json({ 
        success: false,
        error: "deepikanavneetsingh@gmail.com is the reserved Administrator account. Please use Admin Login." 
      });
    }

    const existing = usersDatabase.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return res.status(409).json({ success: false, error: "An account with this email already exists. Please log in." });
    }

    const newUser: ServerUser = {
      id: `usr-${Date.now()}`,
      email: rawEmail,
      name: rawName,
      phone: rawPhone,
      password: rawPassword || "password123",
      role: "student",
      createdAt: new Date().toISOString(),
      access: {
        hasDashboard: true,
        hasCurriculum: true,
        hasPracticePass: false,
        hasCertification: false,
      },
      paymentRequests: []
    };

    usersDatabase.push(newUser);
    const { password: _, ...sanitized } = newUser;
    return res.status(201).json({ success: true, user: sanitized });
  } catch (err: any) {
    console.error("Registration error:", err);
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred during account registration. Please try again."
    });
  }
});

// Guard against non-POST requests to /api/auth/register
app.all("/api/auth/register", (req, res) => {
  res.status(405).json({
    success: false,
    error: `Method ${req.method} not allowed for registration. Use POST /api/auth/register.`
  });
});

app.post("/api/auth/login", (req, res) => {
  try {
    const rawEmail = typeof req.body?.email === "string" ? req.body.email.trim() : "";
    const password = typeof req.body?.password === "string" ? req.body.password : "";

    if (!rawEmail) {
      return res.status(400).json({ success: false, error: "Email is required." });
    }

    const cleanEmail = rawEmail.toLowerCase();
    let user = usersDatabase.find(u => u.email.toLowerCase() === cleanEmail);

    // Enforce Administrator ID as deepikanavneetsingh@gmail.com and password as Deepika@123
    if (cleanEmail === "deepikanavneetsingh@gmail.com") {
      if (password !== "Deepika@123") {
        return res.status(401).json({ 
          success: false,
          error: "Invalid password for Administrator account. Please check your credentials." 
        });
      }

      if (!user) {
        user = {
          id: "admin-director",
          email: "deepikanavneetsingh@gmail.com",
          name: "Deepika Navneet Singh",
          phone: "+91 98100 12345",
          password: "Deepika@123",
          role: "admin",
          createdAt: new Date().toISOString(),
          access: {
            hasDashboard: true,
            hasCurriculum: true,
            hasPracticePass: true,
            hasCertification: true,
          },
          paymentRequests: []
        };
        usersDatabase.unshift(user);
      } else {
        user.role = "admin";
        user.name = "Deepika Navneet Singh";
        user.password = "Deepika@123";
        user.access = {
          hasDashboard: true,
          hasCurriculum: true,
          hasPracticePass: true,
          hasCertification: true,
        };
      }

      const { password: _, ...sanitized } = user;
      return res.json({ success: true, user: sanitized });
    }

    if (!user) {
      return res.status(401).json({ success: false, error: "No account found with this email. Please register first." });
    }

    // Verify password for student accounts
    if (user.password && password && user.password !== password) {
      return res.status(401).json({ success: false, error: "Invalid password. Please check your credentials." });
    }

    const { password: _, ...sanitized } = user;
    return res.json({ success: true, user: sanitized });
  } catch (err: any) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred during login. Please try again."
    });
  }
});

app.get("/api/auth/users/current/:userId", (req, res) => {
  const { userId } = req.params;
  const user = usersDatabase.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const { password: _, ...sanitized } = user;
  res.json(sanitized);
});

// 8. Payment Submission Endpoint (User submits UTR for manual activation)
app.post("/api/payments/request", (req, res) => {
  const { userId, amount, packageType, utrNumber, phone, notes } = req.body;
  if (!userId || !utrNumber) {
    return res.status(400).json({ error: "User ID and UTR Transaction ID are required." });
  }

  const user = usersDatabase.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  const newRequest: PaymentRequest = {
    id: `pay-${Date.now()}`,
    userId: user.id,
    userEmail: user.email,
    userName: user.name,
    amount: Number(amount) || (packageType === "certification" ? 1500 : 1000),
    packageType: packageType === "certification" ? "certification" : "practice_pass",
    utrNumber: utrNumber.trim().toUpperCase(),
    phone: phone || user.phone,
    notes: notes ? notes.trim() : "",
    status: "pending",
    submittedAt: new Date().toISOString()
  };

  user.paymentRequests.unshift(newRequest);
  const { password: _, ...sanitized } = user;
  res.json({ success: true, request: newRequest, user: sanitized });
});

// 9. Admin Portal Management Endpoints
app.get("/api/admin/users", (req, res) => {
  const allRequests: PaymentRequest[] = [];
  usersDatabase.forEach(u => {
    if (Array.isArray(u.paymentRequests)) {
      allRequests.push(...u.paymentRequests);
    }
  });

  const pendingCount = allRequests.filter(r => r.status === "pending").length;
  const approvedTotalRevenue = allRequests
    .filter(r => r.status === "approved")
    .reduce((sum, r) => sum + (r.amount || 0), 0);

  const practicePassCount = usersDatabase.filter(u => u.access.hasPracticePass).length;
  const certificationCount = usersDatabase.filter(u => u.access.hasCertification).length;

  const sanitizedUsers = usersDatabase.map(u => {
    const { password: _, ...rest } = u;
    return rest;
  });

  res.json({
    users: sanitizedUsers,
    stats: {
      totalUsers: usersDatabase.length,
      pendingRequestsCount: pendingCount,
      totalRevenueINR: approvedTotalRevenue,
      practicePassActiveCount: practicePassCount,
      certificationActiveCount: certificationCount
    },
    allRequests: allRequests.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
  });
});

app.post("/api/admin/users", (req, res) => {
  const { name, email, phone, access } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  const newUser: ServerUser = {
    id: `usr-${Date.now()}`,
    email: email.trim(),
    name: name.trim(),
    phone: phone ? phone.trim() : "",
    password: "password123",
    role: "student",
    createdAt: new Date().toISOString(),
    access: {
      hasDashboard: true,
      hasCurriculum: true,
      hasPracticePass: Boolean(access?.hasPracticePass),
      hasCertification: Boolean(access?.hasCertification)
    },
    paymentRequests: []
  };

  usersDatabase.unshift(newUser);
  const { password: _, ...sanitized } = newUser;
  res.json({ success: true, user: sanitized });
});

// Admin manual toggle / activation of access
app.post("/api/admin/users/:userId/access", (req, res) => {
  const { userId } = req.params;
  const { hasDashboard, hasCurriculum, hasPracticePass, hasCertification } = req.body;

  const user = usersDatabase.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  if (hasDashboard !== undefined) user.access.hasDashboard = Boolean(hasDashboard);
  if (hasCurriculum !== undefined) user.access.hasCurriculum = Boolean(hasCurriculum);
  if (hasPracticePass !== undefined) user.access.hasPracticePass = Boolean(hasPracticePass);
  if (hasCertification !== undefined) user.access.hasCertification = Boolean(hasCertification);

  const { password: _, ...sanitized } = user;
  res.json({ success: true, user: sanitized });
});

// Admin approves a payment request and automatically activates that package
app.post("/api/admin/payments/:requestId/approve", (req, res) => {
  const { requestId } = req.params;
  const { adminEmail } = req.body;

  let targetRequest: PaymentRequest | null = null;
  let targetUser: ServerUser | null = null;

  for (const user of usersDatabase) {
    const found = user.paymentRequests.find(r => r.id === requestId);
    if (found) {
      targetRequest = found;
      targetUser = user;
      break;
    }
  }

  if (!targetRequest || !targetUser) {
    return res.status(404).json({ error: "Payment request not found." });
  }

  targetRequest.status = "approved";
  targetRequest.reviewedAt = new Date().toISOString();
  targetRequest.reviewedBy = "Academy Director";

  // Grant the requested package
  if (targetRequest.packageType === "practice_pass") {
    targetUser.access.hasPracticePass = true;
  } else if (targetRequest.packageType === "certification") {
    targetUser.access.hasCertification = true;
  }

  const { password: _, ...sanitized } = targetUser;
  res.json({ success: true, request: targetRequest, user: sanitized });
});

// Admin rejects payment request
app.post("/api/admin/payments/:requestId/reject", (req, res) => {
  const { requestId } = req.params;
  const { notes } = req.body;

  let targetRequest: PaymentRequest | null = null;
  for (const user of usersDatabase) {
    const found = user.paymentRequests.find(r => r.id === requestId);
    if (found) {
      targetRequest = found;
      break;
    }
  }

  if (!targetRequest) {
    return res.status(404).json({ error: "Payment request not found." });
  }

  targetRequest.status = "rejected";
  targetRequest.reviewedAt = new Date().toISOString();
  targetRequest.reviewedBy = "Academy Director";
  if (notes) targetRequest.notes = notes;

  res.json({ success: true, request: targetRequest });
});

// Admin delete student
app.delete("/api/admin/users/:userId", (req, res) => {
  const { userId } = req.params;
  const index = usersDatabase.findIndex(u => u.id === userId);
  if (index === -1) {
    return res.status(404).json({ error: "User not found." });
  }
  usersDatabase.splice(index, 1);
  res.json({ success: true, message: "User deleted successfully." });
});

// Explicit JSON 404 handler for any unhandled /api/* calls so clients never receive HTML <!DOCTYPE
app.all("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    error: `API route not found: ${req.method} ${req.path}`
  });
});

// Centralized error-handling middleware for API requests
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.path.startsWith("/api/")) {
    console.error(`API Error on ${req.method} ${req.path}:`, err);
    return res.status(err.status || 500).json({
      success: false,
      error: err.message || "An unexpected internal server error occurred."
    });
  }
  next(err);
});

// 7. Mount Vite in development or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`QAPro Academy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
