import { CourseModule } from '../types';

export const COURSES: CourseModule[] = [
  {
    id: 'mod-1',
    number: 1,
    title: 'Foundations of QA in BPO & Tech Support',
    shortDescription: 'Core principles of Transaction Monitoring, Quality Assurance cycles, and the role of QA in organizational excellence.',
    level: 'Beginner',
    totalDurationHours: 3.5,
    iconName: 'ShieldCheck',
    learningOutcomes: [
      'Understand the distinction between Quality Assurance (QA) and Quality Control (QC)',
      'Map the end-to-end QA lifecycle from transaction capture to agent coaching',
      'Explain how QA directly drives customer retention, CSAT, and cost efficiency'
    ],
    lessons: [
      {
        id: 'l-101',
        title: 'The QA Philosophy: From Policeman to Strategic Coach',
        durationMinutes: 45,
        overview: 'Examines the historic evolution of QA in contact centers and modern tech support, shifting from punitive scorecards to empowering performance enhancement.',
        content: [
          'Historically, quality management in BPO centers acted as punitive policing—auditing calls solely to spot agent errors and apply disciplinary actions.',
          'Modern high-performing organizations view Quality Assurance as an operational sensor network: detecting broken software bugs, vague knowledge articles, poor customer journey UX, and agent training gaps.',
          'The Triple Constraint of Contact Centers: Balancing Quality (accuracy and customer delight), Efficiency (Average Handle Time, occupancy), and Cost (labor, rework).'
        ],
        keyTakeaways: [
          'QA is primarily a business intelligence tool, not merely an agent grading mechanism.',
          'Focusing exclusively on score percentages without root-cause feedback leads to friction and turnover.'
        ],
        practicalApplication: 'When reviewing an agent with repeated errors, verify whether the internal knowledge base was updated before attributing fault to the agent.'
      },
      {
        id: 'l-102',
        title: 'Key Operational Metrics: QA, CSAT, NPS, and FCR Interplay',
        durationMinutes: 50,
        overview: 'Deep dive into how internal quality scores correlate with external customer satisfaction and operational throughput.',
        content: [
          'A common failure in QA teams is the "Green Score, Red Customer" paradox: where internal QA scores average 95%+, yet CSAT is declining.',
          'This divergence occurs when scorecards over-index on superficial robotic scripts (e.g. mandatory branding sentences) rather than actual problem resolution.',
          'True quality aligns internal benchmarks directly with customer sentiment drivers: speed of resolution, agent empathy, and first-contact fix.'
        ],
        keyTakeaways: [
          'Internal Quality Score (IQS) must calibrate with Customer Satisfaction (CSAT).',
          'First Contact Resolution (FCR) is often the single highest driver of customer loyalty.'
        ],
        formula: {
          name: 'First Contact Resolution (FCR) Rate',
          expression: 'FCR (%) = (Resolved on First Interaction / Total Inquiries) × 100',
          description: 'Measures the proportion of customer issues resolved without requiring repeat contacts or callbacks.',
          example: 'If 820 tickets out of 1,000 required no follow-up, FCR = (820 / 1000) * 100 = 82.0%'
        }
      }
    ]
  },
  {
    id: 'mod-2',
    number: 2,
    title: 'Scorecard Architecture & Transaction Monitoring',
    shortDescription: 'How to design, weight, and calibrate evaluation forms for Voice, Chat, and Email channels.',
    level: 'Beginner',
    totalDurationHours: 4.0,
    iconName: 'FileSpreadsheet',
    learningOutcomes: [
      'Design balanced scorecards with appropriate category weighting',
      'Select relevant behavior indicators across different communication channels',
      'Avoid common scorecard anti-patterns that create auditor subjectivity'
    ],
    lessons: [
      {
        id: 'l-201',
        title: 'Category Weighting & Objective Scoring Rubrics',
        durationMinutes: 55,
        overview: 'Mathematical and operational principles for assigning weights to greeting, soft skills, technical accuracy, and procedure.',
        content: [
          'A balanced scorecard allocates weights proportional to customer impact and business risk.',
          'Standard distribution model: Technical Accuracy & Problem Resolution (40-50%), Soft Skills & Active Listening (25-30%), Compliance & Security (Pass/Fail or 15-20%), Procedure & Wrap-up (10-15%).',
          'Every score item must have an explicit behavioral rubric with zero room for auditor ambiguity: clear definitions for Full Marks, Partial Credit, and Zero.'
        ],
        keyTakeaways: [
          'Never leave scoring criteria open to auditor "mood" or intuition.',
          'Each criterion must answer: "What specific observable behavior constitutes a pass?"'
        ],
        formula: {
          name: 'Weighted Section QA Score',
          expression: 'Total Score = Σ (Section Score % × Section Weight %)',
          description: 'Calculates the overall quality performance across weighted modules.',
          example: 'Resolution (95% * 0.40) + Soft Skills (90% * 0.30) + Compliance (100% * 0.20) + Wrap-up (80% * 0.10) = 38 + 27 + 20 + 8 = 93.0%'
        }
      },
      {
        id: 'l-202',
        title: 'Channel Nuance: Voice vs. Live Chat vs. Email Audits',
        durationMinutes: 45,
        overview: 'Tailoring parameters for async vs. real-time, written tone, concurrent chat handling, and audio voice dynamics.',
        content: [
          'Voice QA demands scrutiny of tone of voice, pacing, dead air (unexplained silence > 10s), active listening cues, and interruptive speech.',
          'Live Chat QA emphasizes typing speed, concurrent session management (handling 2-3 customers simultaneously), grammar, and contextual macro customization.',
          'Email QA focuses on comprehensive reading comprehension, structured formatting (bullet points, clear CTAs), and preventing back-and-forth email ping-pong.'
        ],
        keyTakeaways: [
          'Do not reuse a Voice evaluation form for Live Chat without adapting for concurrency and written tone.',
          'Dead air on voice calls is psychologically equivalent to an unacknowledged pause in chat.'
        ]
      }
    ]
  },
  {
    id: 'mod-3',
    number: 3,
    title: 'Fatal vs. Non-Fatal Errors & Zero-Tolerance Protocols',
    shortDescription: 'Isolating business-critical security breaches, legal risks, and customer harm from coachable soft-skill gaps.',
    level: 'Intermediate',
    totalDurationHours: 3.5,
    iconName: 'AlertOctagon',
    learningOutcomes: [
      'Classify defects into Auto-Fail (Fatal) vs. Non-Fatal coachable variances',
      'Implement bulletproof security protocols for PCI-DSS, HIPAA, and GDPR in audits',
      'Handle the human factor of coaching an agent through a zero-score interaction'
    ],
    lessons: [
      {
        id: 'l-301',
        title: 'The Anatomy of an Auto-Fail (Critical Business Defect)',
        durationMinutes: 50,
        overview: 'Why certain infractions must trigger an instant overall score of 0%, and how to define them with absolute precision.',
        content: [
          'An Auto-Fail (Fatal Error) is any action or omission that causes severe regulatory penalties, direct financial loss, account compromise, or irreparable brand damage.',
          'Common Auto-Fail Categories: Customer Identification Verification failure, unauthorized disclosure of PII/PHI, failure to pause call recording during credit card CVV entry (PCI-DSS), abusive language, and intentional call avoidance (cold hang-up).',
          'When an audit triggers a Fatal Error, the overall evaluation score drops to 0%, but the non-fatal items are still graded for coaching visibility.'
        ],
        keyTakeaways: [
          'Never dilute a fatal error into a mere point deduction—safety requires zero tolerance.',
          'Always audit non-critical items even on failed calls so the agent receives a complete diagnostic.'
        ]
      },
      {
        id: 'l-302',
        title: 'Non-Fatal Errors: Point Deductions and Repeat Trend Analysis',
        durationMinutes: 45,
        overview: 'Managing minor procedural deviations, grammar slips, and missed secondary offers without demoralizing frontline agents.',
        content: [
          'Non-fatal errors are coachable behaviors where the customer outcome was preserved, but operational standards were missed.',
          'Examples: speaking too quickly, minor delay in thanking the customer, forgetting to mention a survey, or minor documentation omissions in CRM.',
          'Threshold systems: If an agent incurs three consecutive non-fatal errors in the same category over 14 days, it triggers a structured coaching intervention.'
        ],
        keyTakeaways: [
          'Distinguish between skill gaps (training needed) and will gaps (deliberate negligence).',
          'Trend tracking over time is far more predictive than a single snapshot score.'
        ]
      }
    ]
  },
  {
    id: 'mod-4',
    number: 4,
    title: 'Calibration Methodologies & Variance Minimization',
    shortDescription: 'Aligning QA evaluators, Team Leaders, and Operations Managers to eliminate subjectivity and scoring bias.',
    level: 'Intermediate',
    totalDurationHours: 4.5,
    iconName: 'Sliders',
    learningOutcomes: [
      'Structure and facilitate productive weekly QA calibration sessions',
      'Calculate variance percentage, standard deviation, and Gauge R&R',
      'Resolve scoring disagreements using evidence-based rubric arbitration'
    ],
    lessons: [
      {
        id: 'l-401',
        title: 'Conducting High-Impact Calibration Sessions',
        durationMinutes: 60,
        overview: 'A step-by-step framework to run weekly calibration meetings that bring QA and Operations onto the exact same wavelength.',
        content: [
          'Calibration is the process by which multiple evaluators score the exact same interaction independently and then compare their scores to a Master Benchmark.',
          'The golden rule: No discussion or score peaking prior to the session. Every attendee must enter with an uninfluenced score.',
          'Facilitator technique: Focus 80% of meeting time on criteria where variance exceeded 5%, not where everyone agreed.'
        ],
        keyTakeaways: [
          'Calibration builds trust between operations and quality—preventing the "QA is out to get us" sentiment.',
          'Document every calibration ruling in a public living FAQ to prevent recurring disputes.'
        ],
        formula: {
          name: 'Auditor Variance Percentage',
          expression: 'Variance (%) = |Evaluator Score - Master Benchmark Score|',
          description: 'Calculates the absolute difference between an auditor or team lead and the master consensus.',
          example: 'If Master Benchmark is 88% and Evaluator scored 82%, Variance = |82 - 88| = 6.0% (Exceeds typical ±5% tolerance)'
        }
      },
      {
        id: 'l-402',
        title: 'Statistical Alignment: Gauge R&R and Correlation Coefficients',
        durationMinutes: 50,
        overview: 'Applying statistical rigor to ensure repeatability (same auditor over time) and reproducibility (different auditors across teams).',
        content: [
          'Gauge R&R (Repeatability and Reproducibility) tests whether measurement variation stems from actual agent performance or inconsistencies in the evaluators.',
          'Repeatability: Can Auditor A evaluate the same masked call a month later and give within ±3% of their original score?',
          'Reproducibility: Do Auditor A, Auditor B, and Team Lead C give the exact same ratings across a sample of 20 randomized interactions?'
        ],
        keyTakeaways: [
          'Without calibration, agent performance evaluations become a lottery depending on which QA analyst reviewed their ticket.',
          'Target alignment threshold in enterprise BPOs is ≥85% across all rubric line items.'
        ]
      }
    ]
  },
  {
    id: 'mod-5',
    number: 5,
    title: 'Customer Experience Metrics: CSAT, NPS, CES & FCR',
    shortDescription: 'Mastering the mathematical formulas, benchmarks, survey methodologies, and QA correlations of core CX indicators.',
    level: 'Intermediate',
    totalDurationHours: 4.0,
    iconName: 'LineChart',
    learningOutcomes: [
      'Calculate CSAT, Net Promoter Score (NPS), and Customer Effort Score (CES)',
      'Analyze why high QA scores can coexist with poor CSAT (the disconnect audit)',
      'Deploy correlation matrices to discover which QA behaviors genuinely move the needle on NPS'
    ],
    lessons: [
      {
        id: 'l-501',
        title: 'Calculating & Benchmarking CSAT, NPS, and CES',
        durationMinutes: 55,
        overview: 'Examines the survey mechanisms, mathematical formulas, and business implications of customer perception metrics.',
        content: [
          'CSAT (Customer Satisfaction Score): Typically measured via a 1-5 scale asking "How satisfied were you with the service provided today?". Top-box scoring counts % of 4s and 5s.',
          'NPS (Net Promoter Score): Measured on an 11-point scale (0-10) asking "How likely are you to recommend us to a colleague?". Promoters (9-10) minus Detractors (0-6). Passives (7-8) are omitted from the calculation.',
          'CES (Customer Effort Score): Focuses on ease of experience. "The company made it easy for me to handle my issue." High effort is the single largest predictor of customer churn.'
        ],
        keyTakeaways: [
          'NPS measures long-term brand loyalty; CSAT measures transactional satisfaction; CES measures friction.',
          'A customer who had their issue resolved quickly but with zero fluff will often give a higher CES than someone subjected to excessive scripted sympathy.'
        ],
        formula: {
          name: 'Net Promoter Score (NPS) Formula',
          expression: 'NPS = % Promoters (9-10) - % Detractors (0-6)',
          description: 'Calculates the net advocacy score, ranging from -100 to +100.',
          example: 'In 500 responses: 350 Promoters (70%), 50 Passives (10%), 100 Detractors (20%). NPS = 70 - 20 = +50.'
        }
      },
      {
        id: 'l-502',
        title: 'The QA-CSAT Correlation Matrix',
        durationMinutes: 45,
        overview: 'How to plot QA scorecard line items against customer survey responses to identify what truly impacts customer loyalty.',
        content: [
          'Conducting a regression analysis between specific QA criteria (e.g. Greeting, Empathy, Verification, Resolution) and the corresponding customer CSAT survey.',
          'Frequently, "Accurate Resolution" and "Follow-through" show a 0.82 correlation with CSAT, whereas "Mentioned Company Tagline" shows a 0.04 correlation.',
          'Using this data to prune low-value parameters from the scorecard, streamlining audits and improving agent morale.'
        ],
        keyTakeaways: [
          'Scorecards must evolve based on empirical data, not executive preferences.',
          'If a line item has zero statistical relationship with CSAT or Compliance, eliminate it.'
        ]
      }
    ]
  },
  {
    id: 'mod-6',
    number: 6,
    title: 'Transformational Coaching: GROW, SBI & Root Cause Analysis',
    shortDescription: 'How QA professionals turn audit scores into lasting behavioral change through psychological and structural coaching.',
    level: 'Intermediate',
    totalDurationHours: 4.0,
    iconName: 'MessageSquareQuote',
    learningOutcomes: [
      'Master the G.R.O.W. and Situation-Behavior-Impact (SBI) coaching models',
      'Perform effective Root Cause Analysis using 5 Whys and Fishbone diagrams',
      'Turn resistant agents into collaborative problem solvers during feedback sessions'
    ],
    lessons: [
      {
        id: 'l-601',
        title: 'The G.R.O.W. Framework in Contact Center Coaching',
        durationMinutes: 50,
        overview: 'A structured, conversational framework that guides the agent to self-discover their opportunities rather than being lectured.',
        content: [
          'Goal: Establish what the agent wants to achieve. "What would a perfect resolution look like on this refund request?"',
          'Reality: Examine the current situation objectively using the audit recording and customer transcript. "How long did that hold time feel to the customer?"',
          'Options: Brainstorm alternatives. "What two other resources could you have consulted when the tool threw error 404?"',
          'Will / Way Forward: Secure commitment. "Which specific technique will you test on your next shift, and when shall we check in?"'
        ],
        keyTakeaways: [
          'When agents identify their own solutions, retention and compliance increase by over 300% compared to top-down directives.',
          'Never start a session with the score; start with the interaction recording and the customer perspective.'
        ]
      },
      {
        id: 'l-602',
        title: 'Root Cause Analysis: 5 Whys for Performance Gaps',
        durationMinutes: 45,
        overview: 'Diagnosing whether performance deficits stem from Knowledge, Tool, Process, or Motivation issues.',
        content: [
          'Problem: Agent gave incorrect information about warranty coverage.',
          'Why 1: They cited the 30-day policy instead of the extended 90-day policy.',
          'Why 2: They recalled an outdated training memo from six months ago.',
          'Why 3: The internal knowledge base article was not updated when the product launched.',
          'Why 4: The product team did not loop in technical documentation during release.',
          'Why 5: Lack of formal SLA between product engineering and customer support operations.'
        ],
        keyTakeaways: [
          'Treating the symptom (coaching the agent) without fixing the root cause guarantees that another agent will make the exact same error.',
          'Great QA teams fix the system so that good people can do great work.'
        ]
      }
    ]
  },
  {
    id: 'mod-7',
    number: 7,
    title: 'Regulatory Compliance & Data Privacy: PCI-DSS, HIPAA, GDPR',
    shortDescription: 'Protecting the enterprise from multimillion-dollar fines through rigorous compliance auditing in customer interactions.',
    level: 'Advanced',
    totalDurationHours: 4.5,
    iconName: 'Lock',
    learningOutcomes: [
      'Audit payment card handling under PCI-DSS Requirement 3 (no CVV/PIN recording)',
      'Enforce HIPAA Protected Health Information (PHI) disclosure rules in healthcare support',
      'Implement GDPR Right to be Forgotten and customer data handling safeguards'
    ],
    lessons: [
      {
        id: 'l-701',
        title: 'PCI-DSS Compliance & Audio Masking Audits',
        durationMinutes: 55,
        overview: 'Standards for auditing telephone and digital credit card transactions, secure pause/resume, and zero-storage rules.',
        content: [
          'PCI-DSS (Payment Card Industry Data Security Standard) strictly forbids storing Card Verification Value (CVV/CVC) or PIN data post-authorization under any circumstances—including in call audio or screen recordings.',
          'Auditors must verify that DTMF masking (keypad tones) or automated pause-and-resume software triggered correctly before the customer voiced their payment details.',
          'If an agent manually types card details into a notepad or personal document, this constitutes an immediate critical security breach requiring account lock and escalation.'
        ],
        keyTakeaways: [
          'Never record or write down a 3-digit CVV number—under any exception or client pressure.',
          'Auditors must immediately escalate unmasked card numbers discovered in historic audio repositories for secure purge.'
        ]
      },
      {
        id: 'l-702',
        title: 'HIPAA & Healthcare Privacy: PHI Disclosure Protocols',
        durationMinutes: 50,
        overview: 'Auditing Protected Health Information (PHI) in health insurance, pharmacy, and medical assistance contact centers.',
        content: [
          'Under HIPAA, disclosing medical diagnoses, treatment plans, or prescription histories to unauthorized third parties carries severe civil and criminal penalties.',
          'Verification rigor: Before uttering any medical detail, the agent must verify minimum 3 distinct patient identifiers (e.g., Full Legal Name, Date of Birth, Policy ID or Last 4 SSN).',
          'Authorized Representative verification: Inquiring whether power of attorney or explicit verbal authorization is on file before speaking to spouses or adult children.'
        ],
        keyTakeaways: [
          'Assumption is the number one cause of HIPAA violations in contact centers.',
          'Even confirming that an individual is a patient at a specific facility can constitute an impermissible disclosure if not verified.'
        ]
      }
    ]
  },
  {
    id: 'mod-8',
    number: 8,
    title: 'Six Sigma & Lean QA: DMAIC, Pareto 80/20 & Fishbone RCA',
    shortDescription: 'Applying engineering precision and statistical process control to eliminate systematic variation and rework in support operations.',
    level: 'Advanced',
    totalDurationHours: 4.5,
    iconName: 'Cpu',
    learningOutcomes: [
      'Execute the 5 phases of DMAIC (Define, Measure, Analyze, Improve, Control) in support teams',
      'Construct Pareto 80/20 defect charts to focus coaching resources where impact is highest',
      'Utilize Ishikawa (Fishbone) diagrams to categorize multi-factorial service failures'
    ],
    lessons: [
      {
        id: 'l-801',
        title: 'The DMAIC Framework in Quality Engineering',
        durationMinutes: 60,
        overview: 'How to transition from reactive spot audits to proactive systematic process improvement projects using Six Sigma.',
        content: [
          'Define: State the problem clearly. Example: "First contact resolution on password resets dropped from 88% to 64% over Q2, driving $140k in repeat call volume."',
          'Measure: Collect baseline audit data across 500 randomized interactions to establish current sigma level and defect rate.',
          'Analyze: Conduct statistical regression and process mapping to isolate why agents fail to complete self-service resets.',
          'Improve: Deploy a streamlined 2-factor authentication flow and revised agent troubleshooting macros.',
          'Control: Implement ongoing control charts and weekly sampling to ensure gains are sustained over time.'
        ],
        keyTakeaways: [
          'Six Sigma in QA is about reducing variation, not just lifting the average.',
          'A process that delivers 99% accuracy still generates 10,000 defects in a 1,000,000 call environment.'
        ]
      },
      {
        id: 'l-802',
        title: 'Pareto 80/20 Analysis for Quality Defect Management',
        durationMinutes: 45,
        overview: 'Identifying the 20% of error categories that cause 80% of customer dissatisfaction and quality point deductions.',
        content: [
          'Vilfredo Pareto principle: The vast majority of defects originate from a small handful of vital root causes.',
          'Creating a Pareto chart: Rank defect categories by frequency, calculate cumulative percentage, and plot against a bar/line graph.',
          'Strategic prioritization: Rather than attempting to coach 45 different scorecard line items simultaneously, dedicate operational sprints to the top 2-3 defect drivers.'
        ],
        keyTakeaways: [
          'Focus beats comprehensiveness when driving rapid turnaround in quality performance.',
          'Eliminating the top 2 Pareto categories typically yields an immediate 15-20 point lift in operational CSAT.'
        ]
      }
    ]
  },
  {
    id: 'mod-9',
    number: 9,
    title: 'Omnichannel QA: Voice, Email, Live Chat & Social Media',
    shortDescription: 'Unified quality methodologies tailored to real-time telephony, asynchronous tickets, multi-chat concurrency, and public social care.',
    level: 'Intermediate',
    totalDurationHours: 4.0,
    iconName: 'Share2',
    learningOutcomes: [
      'Audit multi-concurrent live chat interactions with pacing and responsiveness metrics',
      'Evaluate public brand reputation management and crisis de-escalation on Social Media (X, Facebook, Reddit)',
      'Assess asynchronous email ticketing for comprehensive first-touch resolution'
    ],
    lessons: [
      {
        id: 'l-901',
        title: 'Live Chat Quality: Concurrency, Macros & Tone',
        durationMinutes: 50,
        overview: 'The specific challenges of auditing live text interactions where agents handle 2 to 3 conversations at the exact same time.',
        content: [
          'Concurrency management: How to detect when an agent is neglecting Chat A while answering Chat B (Customer Wait Time between responses > 90 seconds).',
          'Macro customization: The difference between lazy copy-pasting (which alienates tech-savvy customers) and intelligent template customization.',
          'Digital empathy: Using formatting, paragraph breaks, and warm conversational markers to convey warmth in pure ASCII text.'
        ],
        keyTakeaways: [
          'Unexplained delays in live chat cause customers to browse away or abandon the session, ruining FCR.',
          'Agents should always acknowledge receipt of customer information before starting behind-the-scenes research.'
        ]
      },
      {
        id: 'l-902',
        title: 'Social Care & Public Escalation QA',
        durationMinutes: 45,
        overview: 'Auditing brand replies on public social platforms where every word is visible to thousands of potential customers.',
        content: [
          'Public vs. Private transition: Moving sensitive customer queries from public threads to Secure DMs after the initial public acknowledgment.',
          'Brand voice guardrails: Maintaining corporate posture while matching the casual, conversational speed of social media.',
          'Crisis identification: Spotting high-risk triggers (influencers with large followings, legal threats, safety hazards) for immediate management escalation.'
        ],
        keyTakeaways: [
          'Never argue with a customer in a public comment thread.',
          'The primary audience for a social media support interaction is not just the customer—it is the public watching how the brand responds.'
        ]
      }
    ]
  },
  {
    id: 'mod-10',
    number: 10,
    title: 'AI Speech Analytics, Sentiment & Automated QA',
    shortDescription: 'The modern frontier of 100% automated coverage using Large Language Models, acoustic sentiment, and hybrid auditor workflows.',
    level: 'Advanced',
    totalDurationHours: 4.0,
    iconName: 'Sparkles',
    learningOutcomes: [
      'Bridge the gap between 1-2% manual sampling and 100% automated interaction coverage',
      'Configure acoustic emotion analysis, keyword spotters, and silence detection',
      'Deploy human-in-the-loop workflows where AI flags interactions and human auditors calibrate'
    ],
    lessons: [
      {
        id: 'l-1001',
        title: 'The Shift to 100% Coverage via Auto-QA',
        durationMinutes: 55,
        overview: 'Why traditional manual sampling (3-5 calls per agent per month) leaves massive statistical blind spots, and how AI closes the gap.',
        content: [
          'In a 500-seat contact center handling 500,000 calls monthly, a team of 10 QA analysts can manually audit at most 2,500 calls (0.5% coverage).',
          'Automated QA uses transcription models and LLMs to evaluate 100% of interactions against objective checklist items (e.g. greeting, disclosure, profanity, competitor mentions).',
          'The human QA role transitions from line-by-line grading to deep-dive root cause analysis, coaching facilitation, and calibration model training.'
        ],
        keyTakeaways: [
          'AI does not replace human auditors; it supercharges their impact by serving up the high-risk, high-learning moments.',
          'Targeted sampling (auditing bottom 5% sentiment calls) yields 10x more coaching value than purely random sampling.'
        ]
      },
      {
        id: 'l-1002',
        title: 'Prompt Engineering for Enterprise QA Evaluators',
        durationMinutes: 50,
        overview: 'How to write robust LLM evaluation rubrics with few-shot examples, JSON schemas, and confidence scoring.',
        content: [
          'Structuring prompts with explicit persona, conversation context, evaluation criteria, and strict JSON output formats.',
          'Overcoming LLM evaluation hallucinations by requiring the model to cite exact transcript quote timestamps for every point deduction.',
          'Benchmarking AI auto-scores against human master calibration panels to achieve >90% inter-rater agreement.'
        ],
        keyTakeaways: [
          'Always demand evidence citations: an AI evaluation that fails to quote the transcript is unreliable.',
          'Continuously calibrate the AI model using verified human gold-standard interactions.'
        ]
      }
    ]
  },
  {
    id: 'mod-11',
    number: 11,
    title: 'QA Operations: Stratified Sampling & Executive Dashboards',
    shortDescription: 'Managing auditor quotas, sample randomization, quota balancing across tenure tiers, and executive reporting.',
    level: 'Advanced',
    totalDurationHours: 3.5,
    iconName: 'PieChart',
    learningOutcomes: [
      'Implement stratified sampling methodologies that eliminate auditor selection bias',
      'Manage auditor productivity quotas and inter-rater reliability benchmarks',
      'Build executive-ready QA scorecards that demonstrate ROI to C-level stakeholders'
    ],
    lessons: [
      {
        id: 'l-1101',
        title: 'Stratified Sampling vs. Cherry-Picking',
        durationMinutes: 45,
        overview: 'How to prevent auditors from unconsciously selecting easier calls or targeting specific agents.',
        content: [
          'Cherry-picking occurs when evaluators browse queue logs and choose short, simple calls to hit daily audit quotas faster.',
          'Stratified sampling divides total volume into meaningful strata: Short Handle Time (<2m), Standard (3-7m), Long (>12m), Escalated, and Repeat Contact.',
          'Randomized automated dispatch feeds interactions directly into the auditor queue without displaying agent name or handle time.'
        ],
        keyTakeaways: [
          'Randomization is essential for statistically valid performance management.',
          'New hires should receive 2x sampling frequency during their first 90 days to catch bad habits early.'
        ]
      },
      {
        id: 'l-1102',
        title: 'Translating Quality Metrics to Executive ROI',
        durationMinutes: 45,
        overview: 'Connecting QA scores to churn reduction, SLA preservation, and cost-per-contact savings for senior management.',
        content: [
          'C-Suite executives do not care if greeting compliance went from 92% to 94%; they care about cost, revenue, and customer lifetime value.',
          'Calculating the dollar value of quality: Demonstrating how a 4% increase in FCR prevented 18,000 repeat calls, saving $126,000 in operational expense.',
          'Designing the Monthly Quality Business Review (QBR) slide deck for VP and Director-level reviews.'
        ],
        keyTakeaways: [
          'Always express quality achievements in financial and customer retention metrics.',
          'Quality Assurance is an investment center that protects revenue, not an administrative overhead cost.'
        ]
      }
    ]
  },
  {
    id: 'mod-12',
    number: 12,
    title: 'Capstone: Building an Enterprise QA Framework',
    shortDescription: 'Comprehensive synthesis: from drafting governance policies and scorecard rubrics to calibration schedules and tech stack architecture.',
    level: 'Advanced',
    totalDurationHours: 5.0,
    iconName: 'Award',
    learningOutcomes: [
      'Author a comprehensive QA Governance Charter and Operating Policy',
      'Synthesize scorecard design, coaching cadence, and calibration rules into a unified manual',
      'Prepare for CQAP™ certification assessment and industry leadership roles'
    ],
    lessons: [
      {
        id: 'l-1201',
        title: 'Authoring the Enterprise QA Operating Charter',
        durationMinutes: 60,
        overview: 'The blueprint document that establishes the authority, standards, dispute procedures, and governance of the quality department.',
        content: [
          'A QA Charter defines the mutual expectations between Quality, Operations, Training, and Executive Leadership.',
          'Key sections: Scope of Audits, Dispute & Rebuttal Resolution SLAs (e.g., 48h turnaround for agent appeals), Calibration Thresholds, and Auditor Code of Ethics.',
          'Establishing a fair, non-retaliatory escalation path when agents or Team Leads dispute a score.'
        ],
        keyTakeaways: [
          'Without a formal charter, quality standards become subject to political infighting during high-attrition periods.',
          'A transparent dispute process protects agents and reinforces organizational justice.'
        ]
      },
      {
        id: 'l-1202',
        title: 'Mastering the CQAP™ Certification Examination',
        durationMinutes: 60,
        overview: 'Exam preparation strategies, scenario analysis drills, and career advancement blueprints for Certified Quality Assurance Professionals.',
        content: [
          'Review of core domains: Transaction Monitoring, Calibration & Variance, Six Sigma RCA, Compliance Mandates, and Transformational Coaching.',
          'Analyzing complex situational case studies where metrics conflict (e.g. perfect compliance vs. irritated customer, high AHT vs. perfect resolution).',
          'Building your professional QA portfolio: documenting successful calibration rollouts, variance reduction % metrics, and coaching case studies.'
        ],
        keyTakeaways: [
          'True quality leadership balances procedural perfection with deep human empathy.',
          'Congratulations on embarking on your journey to becoming a certified master of Quality Assurance!'
        ]
      }
    ]
  }
];
