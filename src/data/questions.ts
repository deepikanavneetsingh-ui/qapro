import { QuizQuestion } from '../types';

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    moduleId: 'mod-1',
    category: 'Foundations of QA',
    question: 'What is the primary conceptual difference between Quality Assurance (QA) and Quality Control (QC)?',
    options: [
      'QA is reactive inspection of finished calls, whereas QC is proactive process optimization',
      'QA focuses on preventing defects through systemic process improvement, while QC focuses on identifying defects in transactions',
      'QA is conducted exclusively by external auditors, whereas QC is conducted by frontline team leaders',
      'QA applies only to software engineering, while QC applies to contact centers'
    ],
    correctIndex: 1,
    explanation: 'Quality Assurance (QA) is proactive and process-oriented—designing systems to prevent defects. Quality Control (QC) is product/transaction-oriented—identifying specific errors in delivered interactions.',
    difficulty: 'Foundation'
  },
  {
    id: 'q-2',
    moduleId: 'mod-1',
    category: 'Operational Metrics',
    question: 'A contact center receives 2,500 inbound inquiries. 2,050 of these inquiries were completely resolved during the initial contact without customer callback or reopen. What is the First Contact Resolution (FCR) rate?',
    options: [
      '78.0%',
      '82.0%',
      '85.5%',
      '90.2%'
    ],
    correctIndex: 1,
    explanation: 'FCR (%) = (Resolved on First Interaction / Total Inquiries) × 100 = (2,050 / 2,500) × 100 = 82.0%.',
    difficulty: 'Foundation'
  },
  {
    id: 'q-3',
    moduleId: 'mod-1',
    category: 'Operational Metrics',
    question: 'What phenomenon occurs when an agent team consistently scores 97%+ on internal QA scorecards, but customer CSAT surveys on the same interactions average only 68%?',
    options: [
      'Hawthorne Effect',
      'The "Green Score, Red Customer" Paradox (Scorecard Disconnect)',
      'Simpson Paradox in contact routing',
      'Auditor Halo Effect'
    ],
    correctIndex: 1,
    explanation: 'The "Green Score, Red Customer" paradox highlights a critical disconnect: the internal scorecard is measuring superficial checklist items (e.g. scripted greetings, mandatory mentions) that do not matter to the customer, while ignoring the core resolution.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-4',
    moduleId: 'mod-2',
    category: 'Scorecard Design',
    question: 'In a standard contact center scorecard, why should "Problem Resolution & Technical Accuracy" typically receive the largest weight (40-50%)?',
    options: [
      'Because customer service representatives are incapable of mastering soft skills',
      'Because customers primarily reach out for issue resolution, and polite non-resolution still results in repeat calls and churn',
      'Because compliance regulations mandate that resolution receives 50%',
      'To shorten Average Handle Time (AHT) artificially'
    ],
    correctIndex: 1,
    explanation: 'Extensive CX research shows that resolving the customer issue accurately is the primary driver of satisfaction and retention. Politeness without resolution still leaves an unsatisfied customer and drives costly repeat contacts.',
    difficulty: 'Foundation'
  },
  {
    id: 'q-5',
    moduleId: 'mod-2',
    category: 'Scorecard Design',
    question: 'An agent scores: Resolution (90% on a 40% weight), Soft Skills (95% on a 30% weight), Compliance (100% on a 20% weight), and Tool Usage (70% on a 10% weight). What is their overall weighted QA score?',
    options: [
      '88.5%',
      '91.5%',
      '93.0%',
      '89.0%'
    ],
    correctIndex: 1,
    explanation: 'Weighted Score = (90 * 0.40) + (95 * 0.30) + (100 * 0.20) + (70 * 0.10) = 36 + 28.5 + 20 + 7 = 91.5%.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-6',
    moduleId: 'mod-2',
    category: 'Omnichannel QA',
    question: 'When auditing a Live Chat interaction, which metric is unique to text-based channels compared to traditional voice telephony?',
    options: [
      'Pronunciation accuracy',
      'Customer Wait Time (CWT) between agent response intervals and multi-chat concurrency handling',
      'Tone of voice inflection',
      'Background acoustic noise level'
    ],
    correctIndex: 1,
    explanation: 'In live chat, agents often handle 2-3 simultaneous customers. Evaluators must audit Customer Wait Time (latency between messages) and ensure multi-chat concurrency does not cause customer abandonment.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-7',
    moduleId: 'mod-3',
    category: 'Fatal Errors',
    question: 'Which of the following actions constitutes an "Auto-Fail" (Fatal Error) during an inbound customer call in financial services?',
    options: [
      'Failing to thank the customer for being a loyalty club member',
      'Disclosing account balance and transaction history before completing mandatory two-factor identity verification',
      'Speaking slightly too rapidly during the closing statement',
      'Placing the customer on a 45-second hold while checking a knowledge base article'
    ],
    correctIndex: 1,
    explanation: 'Disclosing financial records without completing required authentication is a severe security and regulatory breach (GLBA / GDPR / PCI), resulting in an immediate Auto-Fail (0% overall score).',
    difficulty: 'Foundation'
  },
  {
    id: 'q-8',
    moduleId: 'mod-3',
    category: 'Fatal Errors',
    question: 'What is the correct protocol when an auditor detects an Auto-Fail error on an otherwise polite and well-handled call?',
    options: [
      'Average the fatal error as a standard 10-point deduction',
      'Assign an overall audit score of 0%, but continue scoring the non-fatal parameters to provide complete diagnostic coaching data',
      'Immediately delete the call recording to protect the agent',
      'Ignore the error if the customer gave a 5-star CSAT rating'
    ],
    correctIndex: 1,
    explanation: 'Assign 0% overall due to the fatal violation, but complete the remainder of the rubric. This ensures the coaching session highlights both the critical compliance failure and any positive behaviors that should be preserved.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-9',
    moduleId: 'mod-4',
    category: 'Calibration',
    question: 'What is the primary objective of a weekly QA Calibration session between QA Analysts, Team Leaders, and Operations Managers?',
    options: [
      'To debate who was the best agent of the week',
      'To align evaluators on rubric interpretation, reduce scoring subjectivity, and achieve inter-rater reliability',
      'To increase auditor quotas from 5 calls to 15 calls per day',
      'To discipline agents who failed their audits'
    ],
    correctIndex: 1,
    explanation: 'Calibration ensures that all evaluators grade to the exact same standard, eliminating auditor bias so an agent receives the same fair score regardless of who evaluates their interaction.',
    difficulty: 'Foundation'
  },
  {
    id: 'q-10',
    moduleId: 'mod-4',
    category: 'Calibration',
    question: 'In a calibration session, the Master Benchmark Score agreed by leadership is 86%. Auditor Sarah scored the call 93%. What is Sarah’s auditor variance, and does it meet standard industry tolerance (±5%)?',
    options: [
      'Variance is 7.0%; it fails the standard ±5% tolerance threshold',
      'Variance is 3.5%; it successfully passes calibration',
      'Variance is 14.0%; it meets tolerance',
      'Variance is 1.0%; it represents perfect calibration'
    ],
    correctIndex: 0,
    explanation: 'Variance (%) = |Evaluator Score - Master Score| = |93 - 86| = 7.0%. Since 7.0% > 5.0%, it exceeds the acceptable ±5% calibration tolerance threshold and requires rubric realignment.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-11',
    moduleId: 'mod-4',
    category: 'Calibration',
    question: 'In statistical quality management, what does "Gauge R&R" stand for?',
    options: [
      'Revenue and Retention Gauge',
      'Repeatability and Reproducibility of the measurement system',
      'Root-cause and Resolution Gauge',
      'Risk and Regulatory Reliability'
    ],
    correctIndex: 1,
    explanation: 'Gauge R&R measures Repeatability (consistency of the same auditor evaluating identical calls over time) and Reproducibility (consistency across multiple different evaluators grading the same call).',
    difficulty: 'Mastery'
  },
  {
    id: 'q-12',
    moduleId: 'mod-5',
    category: 'CX Metrics',
    question: 'A company surveyed 400 customers asking: "On a scale of 0-10, how likely are you to recommend us?". The results were: 240 Promoters (9-10), 100 Passives (7-8), and 60 Detractors (0-6). What is the Net Promoter Score (NPS)?',
    options: [
      '+35',
      '+45',
      '+60',
      '+55'
    ],
    correctIndex: 1,
    explanation: '% Promoters = 240 / 400 = 60.0%. % Detractors = 60 / 400 = 15.0%. NPS = % Promoters - % Detractors = 60 - 15 = +45.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-13',
    moduleId: 'mod-5',
    category: 'CX Metrics',
    question: 'According to CEB / Gartner research on Customer Effort Score (CES), which of the following is the single greatest predictor of customer disloyalty and churn?',
    options: [
      'The agent not having a warm conversational opening',
      'High effort required by the customer to get their problem resolved (multiple transfers, repeating information)',
      'The company not offering discounts during support calls',
      'The call lasting more than 4 minutes'
    ],
    correctIndex: 1,
    explanation: 'High customer effort—such as repeating information to multiple agents, navigating confusing IVRs, and multiple callbacks—is statistically 4x more predictive of customer defection than lack of "customer delight".',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-14',
    moduleId: 'mod-6',
    category: 'Coaching Frameworks',
    question: 'In the G.R.O.W. coaching model, what do the four letters represent?',
    options: [
      'Grade, Review, Outcome, Warning',
      'Goal, Reality, Options, Will (Way Forward)',
      'Growth, Retention, Operations, Workflow',
      'Grievance, Resolution, Observation, Warranty'
    ],
    correctIndex: 1,
    explanation: 'G.R.O.W. stands for Goal (what do we want to achieve?), Reality (where are we right now?), Options (what alternatives exist?), and Will/Way Forward (what concrete actions will be taken?).',
    difficulty: 'Foundation'
  },
  {
    id: 'q-15',
    moduleId: 'mod-6',
    category: 'Coaching Frameworks',
    question: 'What is the Situation-Behavior-Impact (SBI) framework primarily used for in QA feedback?',
    options: [
      'To calculate agent payroll deductions',
      'To provide objective, non-judgmental feedback by anchoring observations to factual events rather than subjective criticism',
      'To automate call recording pauses for credit cards',
      'To determine software licensing costs'
    ],
    correctIndex: 1,
    explanation: 'The SBI framework (Situation: specify the exact call moment; Behavior: describe the specific action observed; Impact: explain the effect on the customer/business) prevents defensive reactions by removing personal opinion from feedback.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-16',
    moduleId: 'mod-6',
    category: 'Root Cause Analysis',
    question: 'An agent repeatedly provides an incorrect refund timeline. During a 5-Whys analysis, the QA team discovers the internal knowledge base article was never updated after the policy changed. What category of root cause is this?',
    options: [
      'Will / Motivational Deficit',
      'Knowledge & Tool / Process Infrastructure Defect',
      'Compliance Malpractice',
      'Customer Error'
    ],
    correctIndex: 1,
    explanation: 'This is a system/process defect. Disciplining the agent would fail to solve the problem, because every other agent accessing the outdated knowledge base would continue making the same error.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-17',
    moduleId: 'mod-7',
    category: 'Compliance & Security',
    question: 'Under PCI-DSS Requirement 3, which credit card data element is strictly prohibited from being stored in audio or digital recordings after transaction authorization?',
    options: [
      'Customer cardholder name',
      'Expiration month and year',
      'Card Verification Value (CVV/CVC 3 or 4 digit security code)',
      'The first 6 digits of the card number (BIN)'
    ],
    correctIndex: 2,
    explanation: 'PCI-DSS strictly prohibits storing sensitive authentication data (SAD)—specifically the 3 or 4-digit CVV/CVC code or PIN—post-authorization under any circumstances, including in audio recordings.',
    difficulty: 'Foundation'
  },
  {
    id: 'q-18',
    moduleId: 'mod-7',
    category: 'Compliance & Security',
    question: 'In a HIPAA-governed healthcare contact center, what constitutes Protected Health Information (PHI)?',
    options: [
      'Only the hospital address and operating hours',
      'Any individually identifiable health information relating to past, present, or future physical/mental health conditions, provision of care, or payment',
      'Only written paper medical files locked in a filing cabinet',
      'Information about general public health advisories'
    ],
    correctIndex: 1,
    explanation: 'PHI encompasses any health information that can be linked to a specific individual, including diagnoses, treatment notes, prescription history, insurance claim records, and billing data.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-19',
    moduleId: 'mod-8',
    category: 'Six Sigma & Lean QA',
    question: 'What is the primary purpose of constructing a Pareto Chart in quality assurance operations?',
    options: [
      'To track the daily attendance of team members',
      'To apply the 80/20 rule, identifying the small vital number of error types (20%) that generate the vast majority (80%) of quality defects',
      'To calculate the average duration of coaching sessions',
      'To schedule lunch breaks for auditors'
    ],
    correctIndex: 1,
    explanation: 'A Pareto chart separates the "vital few" defect drivers from the "trivial many", enabling quality leaders to focus coaching and engineering sprints on the root causes that yield maximum impact.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-20',
    moduleId: 'mod-8',
    category: 'Six Sigma & Lean QA',
    question: 'In the Six Sigma DMAIC methodology, which phase focuses on implementing statistical control charts and standard operating procedures to ensure improvements do not degrade over time?',
    options: [
      'Define',
      'Measure',
      'Analyze',
      'Control'
    ],
    correctIndex: 3,
    explanation: 'The Control phase locks in the gains achieved during Improve by establishing ongoing monitoring, response plans, standard operating procedures (SOPs), and control charts.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-21',
    moduleId: 'mod-9',
    category: 'Omnichannel QA',
    question: 'An agent handling an asynchronous customer support email fails to answer the customer’s secondary question about warranty transfer, addressing only the shipping delay. What operational failure has occurred?',
    options: [
      'Failure to adhere to Average Handle Time',
      'Incomplete resolution resulting in email "ping-pong" and degraded First Contact Resolution (FCR)',
      'Breach of PCI-DSS compliance',
      'Audio dead air violation'
    ],
    correctIndex: 1,
    explanation: 'Partial answers force the customer to send follow-up emails ("ping-pong"), multiplying queue volume, inflating operational costs, and frustrating the customer.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-22',
    moduleId: 'mod-9',
    category: 'Omnichannel QA',
    question: 'When responding to an angry customer on public social media (e.g. X / Twitter), what is the best practice QA guideline?',
    options: [
      'Argue back publicly to prove the company’s terms of service were followed',
      'Acknowledge empathy publicly with brand posture, then immediately transition the customer to a secure private channel (DM) for authentication and resolution',
      'Delete the customer’s public comment immediately',
      'Post the customer’s personal account ID in the public thread'
    ],
    correctIndex: 1,
    explanation: 'Always de-escalate with public warmth and empathy, but transition to private direct messaging before discussing any account-specific details or PII.',
    difficulty: 'Foundation'
  },
  {
    id: 'q-23',
    moduleId: 'mod-10',
    category: 'AI & Speech Analytics',
    question: 'How does Automated QA (Auto-QA) using speech analytics and LLMs solve the traditional limitation of manual quality monitoring?',
    options: [
      'By firing 90% of frontline agents',
      'By scaling interaction coverage from 1-2% random manual sampling to 100% automated interaction analysis',
      'By forcing customers to speak only in yes/no answers',
      'By removing the need for compliance scorecards entirely'
    ],
    correctIndex: 1,
    explanation: 'Traditional manual sampling only audits 3-5 calls per agent per month (under 2% coverage). Auto-QA evaluates 100% of calls and messages, identifying high-risk interactions and sentiment anomalies for human auditor review.',
    difficulty: 'Foundation'
  },
  {
    id: 'q-24',
    moduleId: 'mod-10',
    category: 'AI & Speech Analytics',
    question: 'When configuring AI evaluation prompts with Large Language Models, what technique is essential to prevent false grading and hallucinations?',
    options: [
      'Instructing the model to always assign 100% to protect agent feelings',
      'Requiring the model to cite exact transcript timestamps and verbatim quotes for every single point deduction or rubric violation',
      'Allowing the model to guess what happened during muted hold time',
      'Removing scoring criteria definitions from the prompt'
    ],
    correctIndex: 1,
    explanation: 'Requiring verbatim transcript quotes and timestamp evidence grounds the LLM evaluation in empirical facts, preventing hallucinated errors and building agent trust.',
    difficulty: 'Mastery'
  },
  {
    id: 'q-25',
    moduleId: 'mod-11',
    category: 'QA Operations',
    question: 'Why is "Stratified Random Sampling" preferred over simple random sampling in contact center QA operations?',
    options: [
      'It ensures all evaluations are done on Friday afternoons',
      'It ensures representative auditing across diverse call duration buckets (short, medium, long), queue types, escalation tiers, and agent tenure brackets',
      'It allows auditors to manually select the easiest calls to hit their quotas',
      'It eliminates the need for supervisor calibration'
    ],
    correctIndex: 1,
    explanation: 'Stratified sampling ensures the sample mirrors operational reality by drawing proportional interactions from different strata (e.g. escalations, new hires, short transfers, complex issues) rather than leaving it to chance.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-26',
    moduleId: 'mod-11',
    category: 'QA Operations',
    question: 'A contact center handles 200,000 calls monthly at an operational cost of $6.50 per call. A targeted QA initiative increases FCR from 72% to 77%, preventing 10,000 repeat calls per month. What is the annual operational cost savings?',
    options: [
      '$65,000',
      '$780,000',
      '$390,000',
      '$1,200,000'
    ],
    correctIndex: 1,
    explanation: 'Monthly savings = 10,000 calls prevented × $6.50 = $65,000. Annual operational savings = $65,000 × 12 months = $780,000.',
    difficulty: 'Mastery'
  },
  {
    id: 'q-27',
    moduleId: 'mod-12',
    category: 'Enterprise QA Governance',
    question: 'What is the role of an "Auditor Code of Ethics" within an Enterprise QA Governance Charter?',
    options: [
      'To prevent auditors from taking coffee breaks',
      'To ensure impartiality, maintain strict confidentiality of customer data, and eliminate favoritism or vindictive grading towards agents',
      'To require all auditors to hold a law degree',
      'To enforce mandatory overtime during holiday season'
    ],
    correctIndex: 1,
    explanation: 'An Auditor Code of Ethics protects organizational integrity by mandating unbiased evaluations, zero conflicts of interest, respectful feedback, and data confidentiality.',
    difficulty: 'Foundation'
  },
  {
    id: 'q-28',
    moduleId: 'mod-12',
    category: 'Enterprise QA Governance',
    question: 'When an agent formally rebuts an audit score, what is the best practice dispute resolution protocol?',
    options: [
      'Automatically reject the dispute to maintain auditor authority',
      'Have an independent third-party QA specialist or Calibration Committee review the interaction blind (without seeing prior scores) within an agreed SLA (e.g. 48 hours)',
      'Instruct the Team Leader to manually overwrite the score without consulting QA',
      'Penalize the agent with an extra fatal error for raising a rebuttal'
    ],
    correctIndex: 1,
    explanation: 'A healthy dispute process utilizes blind independent review within a strict SLA. This ensures objectivity, protects psychological safety, and refines the scorecard where ambiguous criteria exist.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-29',
    moduleId: 'mod-3',
    category: 'Fatal Errors',
    question: 'An agent accidentally verifies a customer using only their first name and postal code, omitting the mandatory account PIN or Date of Birth required by bank policy. The customer was friendly and authentic. How should this call be graded?',
    options: [
      'Pass with 100% because no fraudulent transaction occurred',
      'Deduct 5 points from the greeting category',
      'Auto-Fail / Fatal Error (0% total score) for Failure to Complete Mandatory Customer Authentication',
      'Warn the agent verbally without recording the audit'
    ],
    correctIndex: 2,
    explanation: 'Security and verification policies are zero-tolerance. The friendliness of the customer or lack of actual fraud does not alter the fact that unauthorized access was granted, violating banking regulations.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-30',
    moduleId: 'mod-5',
    category: 'CX Metrics',
    question: 'Which of the following customer survey comments reflects an interaction with high Customer Effort (bad CES)?',
    options: [
      '"The agent was friendly and explained everything in under three minutes."',
      '"I had to explain my issue three times to three different people, and was put on hold for 20 minutes before they told me to submit an online form."',
      '"I love the product and would definitely recommend it to friends."',
      '"My account was updated immediately."'
    ],
    correctIndex: 1,
    explanation: 'Having to repeat oneself, endure multiple transfers, and being redirected to self-service after a long hold are quintessential hallmarks of a high-effort customer journey.',
    difficulty: 'Foundation'
  },
  {
    id: 'q-31',
    moduleId: 'mod-7',
    category: 'Compliance & Security',
    question: 'In European operations governed by GDPR, what must a contact center agent do if a customer invokes the "Right to Erasure" (Right to be Forgotten)?',
    options: [
      'Laugh and hang up the phone',
      'Follow the verified corporate protocol to log the formal erasure request, authenticate the caller, and route the ticket to the Data Protection Officer (DPO)',
      'Immediately delete all company servers during the call',
      'Inform the customer that GDPR does not apply to telephone calls'
    ],
    correctIndex: 1,
    explanation: 'GDPR grants individuals the right to have personal data erased under specific legal conditions. Agents must execute the formal intake procedure and route it to the Data Protection Officer.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-32',
    moduleId: 'mod-8',
    category: 'Six Sigma & Lean QA',
    question: 'In an Ishikawa (Fishbone) diagram used for investigating low CSAT, which of the following represents the "Mother Nature" / Environment category?',
    options: [
      'Agent tone of voice and active listening skills',
      'Severe weather causing widespread cellular tower outages and massive queue spikes',
      'The speed of the CRM desktop application',
      'The wording in the training manual'
    ],
    correctIndex: 1,
    explanation: 'In Fishbone analysis (6 Ms: Man, Machine, Method, Material, Measurement, Mother Nature/Environment), external environmental factors like storms or natural disasters fit into Environment.',
    difficulty: 'Mastery'
  },
  {
    id: 'q-33',
    moduleId: 'mod-2',
    category: 'Scorecard Design',
    question: 'What is the "Halo / Horns Effect" in transaction monitoring?',
    options: [
      'A software bug in audio headsets that causes echoes',
      'A cognitive bias where an auditor’s overall positive or negative impression of an agent clouds their objective scoring of individual line items',
      'When an agent talks too loudly during peak shift hours',
      'When an auditor finishes their monthly quota ahead of schedule'
    ],
    correctIndex: 1,
    explanation: 'Halo Effect: If an auditor likes an agent, they overlook clear errors. Horns Effect: If an auditor views an agent as problematic, they nitpick and harshly penalize minor subjective items.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-34',
    moduleId: 'mod-4',
    category: 'Calibration',
    question: 'When analyzing calibration results across a 10-person QA team, what does a low Standard Deviation (e.g. σ = 1.8) indicate?',
    options: [
      'High disagreement among auditors',
      'High alignment and consistency among evaluators, indicating low measurement variation',
      'That all agents failed their calls',
      'That the calibration meeting was too long'
    ],
    correctIndex: 1,
    explanation: 'A low standard deviation signifies that all auditors gave scores tightly clustered around the mean, demonstrating high calibration consistency and inter-rater reliability.',
    difficulty: 'Mastery'
  },
  {
    id: 'q-35',
    moduleId: 'mod-6',
    category: 'Coaching Frameworks',
    question: 'During a coaching session, an agent says: "The customer was so rude that I just wanted to get off the phone." What is the most effective coaching response using reflective listening?',
    options: [
      '"You shouldn’t work in customer service if you have thin skin."',
      '"I hear how overwhelming and draining that interaction felt for you. Let’s talk about techniques to stay centered and de-escalate aggressive callers without compromising yourself."',
      '"Well, the scorecard says zero, so it doesn’t matter."',
      '"Next time, just put them on hold indefinitely until they disconnect."'
    ],
    correctIndex: 1,
    explanation: 'Reflective listening validates the agent’s human emotional experience before transitioning constructively into professional coping and de-escalation skills.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-36',
    moduleId: 'mod-10',
    category: 'AI & Speech Analytics',
    question: 'In speech analytics, what is "Acoustic Sentiment Analysis"?',
    options: [
      'Reading the text transcript only',
      'Analyzing tone, pitch, speech rate, volume, and stress markers directly from the audio waveform to detect customer frustration or agent agitation',
      'Playing background elevator music on hold',
      'Checking spelling and grammar in live chat'
    ],
    correctIndex: 1,
    explanation: 'Acoustic sentiment evaluates voice characteristics (pitch fluctuations, speech velocity, amplitude spikes) rather than just the written dictionary definitions of spoken words.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-37',
    moduleId: 'mod-7',
    category: 'Compliance & Security',
    question: 'What is the purpose of "Clean Desk Policy" in a BPO contact center facility?',
    options: [
      'To make sure desks are dusted with disinfectant every morning',
      'To prevent unauthorized copying, recording, or theft of customer credit card numbers, PII, and financial records by prohibiting pens, paper, and personal phones on the production floor',
      'To encourage agents to eat lunch at their workstations',
      'To reduce electricity bills'
    ],
    correctIndex: 1,
    explanation: 'Clean Desk Policies prohibit writing materials and camera phones on the operations floor, preventing rogue agents from harvesting cardholder data or sensitive PII.',
    difficulty: 'Foundation'
  },
  {
    id: 'q-38',
    moduleId: 'mod-1',
    category: 'Foundations of QA',
    question: 'What is the "Hawthorne Effect" as observed in call center quality monitoring?',
    options: [
      'Agents handling calls faster when their supervisors are away',
      'Individuals modifying or improving their behavior when they are conscious of being actively observed or audited',
      'Microphones cutting out during thunder storms',
      'Customer satisfaction dropping during night shifts'
    ],
    correctIndex: 1,
    explanation: 'The Hawthorne Effect describes agents performing at their peak compliance when they know an auditor is live-monitoring, which is why side-by-side audits often score higher than historical silent audits.',
    difficulty: 'Practitioner'
  },
  {
    id: 'q-39',
    moduleId: 'mod-11',
    category: 'QA Operations',
    question: 'Which of the following practices constitutes "Cherry-Picking" by a quality assurance auditor?',
    options: [
      'Eating fruit while evaluating tickets',
      'Deliberately selecting only short, straightforward 1-minute calls to meet daily quota while avoiding complex 25-minute escalated dispute calls',
      'Auditing transactions strictly in chronological order',
      'Calibrating with Team Leaders weekly'
    ],
    correctIndex: 1,
    explanation: 'Cherry-picking distorts performance data by biasing the audit sample toward easy calls, letting underperformance on difficult issues go undetected.',
    difficulty: 'Foundation'
  },
  {
    id: 'q-40',
    moduleId: 'mod-12',
    category: 'Enterprise QA Governance',
    question: 'What is the ultimate standard of excellence for a Certified Quality Assurance Professional (CQAP™)?',
    options: [
      'Handing out as many zero scores as possible each week',
      'Balancing unwavering regulatory compliance with genuine empathy, empowering frontline agents to deliver effortless customer experiences while driving operational root-cause excellence',
      'Memorizing every call center acronym without understanding the business impact',
      'Working in total isolation from the operational team leaders'
    ],
    correctIndex: 1,
    explanation: 'True QA mastery unites rigorous regulatory adherence with human empathy, continuous coaching, and statistical root-cause problem solving that elevates the entire organization.',
    difficulty: 'Mastery'
  }
];
