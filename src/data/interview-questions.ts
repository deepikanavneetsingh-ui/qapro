import { InterviewScenario } from '../types';

export const INTERVIEW_SCENARIOS: InterviewScenario[] = [
  {
    id: 'int-1',
    roleTitle: 'Senior QA Analyst / Transaction Auditor',
    companyProfile: 'Global FinTech Payments & Banking BPO (1,200 seats)',
    level: 'Senior QA Specialist',
    briefing: 'You are interviewing for a Senior QA Analyst position. The hiring manager is testing your grasp of compliance auditing, dealing with agent friction on auto-fail scores, and identifying root causes beyond simple scorecards.',
    questions: [
      {
        id: 'iq-101',
        question: 'An agent received a 0% Auto-Fail on an audit because they forgot to pause the call recording before the customer spoke their card CVV code. The agent bursts into tears, saying their monthly bonus is ruined and it was an honest accident. How do you handle this coaching session?',
        intent: 'Evaluates emotional intelligence, adherence to regulatory mandates (PCI-DSS), and ability to balance empathy with compliance firmness.',
        keyLookouts: [
          'Acknowledges the agent’s human distress without reversing the non-negotiable compliance ruling',
          'Explains the "Why" behind PCI-DSS (protecting customer identity and enterprise liability)',
          'Partners with the agent to identify why the automated pause failed or what distracted them',
          'Leaves the agent with dignity and a clear action plan for bonus recovery'
        ],
        sampleStrongPoint: 'I would acknowledge their emotion first: "I understand how disappointing this is after a month of hard work." Then I clarify that PCI-DSS is non-negotiable for customer safety, but focus on the root cause—why did the pause get missed? Was it system lag, a dual-task distraction, or a workflow flaw?'
      },
      {
        id: 'iq-102',
        question: 'How do you distinguish between an agent who has a "Skill Gap" versus an agent who has a "Will Gap", and how does your QA approach differ for each?',
        intent: 'Tests pedagogical diagnosis, coaching adaptability, and performance management awareness.',
        keyLookouts: [
          'Defines Skill Gap (lack of knowledge, inadequate tools, ambiguous documentation) vs Will Gap (deliberate avoidance, apathy, defiance)',
          'Prescribes training/shadowing for skill gaps and accountability/expectation setting for will gaps',
          'Uses objective audit data trends over time rather than a single isolated call'
        ],
        sampleStrongPoint: 'A skill gap means the agent wants to do it right but lacks the knowledge or tool confidence; here I provide knowledge base links and practice simulations. A will gap means they know the policy perfectly but choose shortcuts; here I bring in the Team Leader to establish clear accountability.'
      },
      {
        id: 'iq-103',
        question: 'Describe how you conduct an objective root cause analysis when a specific line item—such as "Effective Probing Questions"—is scoring poorly across an entire team.',
        intent: 'Tests systems thinking and moving from individual blaming to systemic process remediation.',
        keyLookouts: [
          'Uses frameworks like 5-Whys or Pareto',
          'Audits the onboarding curriculum and knowledge base articles',
          'Checks whether Average Handle Time (AHT) pressure is forcing agents to rush probing'
        ],
        sampleStrongPoint: 'When an entire team struggles with a criterion, it is never an agent defect; it is a system defect. I inspect whether management is penalizing AHT too harshly, causing agents to skip probing, or whether the knowledge base lacks a structured diagnostic decision tree.'
      }
    ]
  },
  {
    id: 'int-2',
    roleTitle: 'Quality Team Leader / Calibration Facilitator',
    companyProfile: 'Omnichannel eCommerce & SaaS Global Support',
    level: 'Quality Team Lead',
    briefing: 'You are interviewing for a QA Team Leader position. The panel wants to understand how you facilitate contentious calibration sessions, minimize auditor variance, and hold Operations accountable.',
    questions: [
      {
        id: 'iq-201',
        question: 'During a weekly calibration meeting, a senior Operations Manager strongly disagrees with your 78% audit score on a call, insisting the agent did a fantastic job and deserves a 95%. How do you arbitrate this dispute without damaging the relationship?',
        intent: 'Tests conflict de-escalation, diplomatic firmness, evidence-based rubric anchoring, and organizational governance.',
        keyLookouts: [
          'Removes personal emotion and anchors the conversation to the written behavioral rubric definitions',
          'Validates the Operations Manager’s perspective on the positive aspects of the call',
          'Examines the specific line items where scoring diverged and explains the customer impact',
          'Documents the final ruling in the Calibration Living Knowledge Base to prevent repeat debate'
        ],
        sampleStrongPoint: 'I thank the manager for advocating for their agent, and then walk through the rubric line by line. I show that while soft skills were indeed a 95%, the omission of the return policy deadline represents a tangible customer friction point that costs $40 in repeat shipping. We align on the evidence, not our personal feelings.'
      },
      {
        id: 'iq-202',
        question: 'What statistical indicators do you monitor to verify that your team of 8 QA auditors is scoring consistently without evaluator bias or drift?',
        intent: 'Tests quantitative understanding of Gauge R&R, standard deviation, and inter-rater reliability.',
        keyLookouts: [
          'Monitors individual Auditor Variance % against Master Benchmark Scores',
          'Tracks Standard Deviation across auditor score distributions',
          'Runs periodic "Blind Audits" where the same interaction is seeded to multiple analysts'
        ],
        sampleStrongPoint: 'I track Auditor Variance from the Master Benchmark (maintaining ±5% tolerance), monitor standard deviation across each auditor’s monthly score distribution to detect harsh or lenient graders, and run monthly blind audit loops to test repeatability.'
      }
    ]
  },
  {
    id: 'int-3',
    roleTitle: 'Global QA Director / Head of Quality Assurance',
    companyProfile: 'Enterprise Cloud Provider & Multi-region BPO Network (5,000+ agents)',
    level: 'Global QA Manager',
    briefing: 'You are interviewing for the top quality executive role. The VP of Customer Operations wants to hear your vision for transitioning from traditional 1% manual sampling to 100% automated AI speech analytics, while tying QA to EBITDA and churn reduction.',
    questions: [
      {
        id: 'iq-301',
        question: 'How do you present the business case and ROI of Quality Assurance to the Chief Financial Officer who views QA as an expensive overhead cost?',
        intent: 'Tests executive communication, financial acumen, and translating operational metrics into dollars saved and revenue retained.',
        keyLookouts: [
          'Calculates repeat contact reduction ($ savings per call prevented)',
          'Demonstrates churn reduction through correlation between high QA resolution and customer lifetime value (LTV)',
          'Quantifies avoidance of regulatory fines (PCI, HIPAA, TCPA)'
        ],
        sampleStrongPoint: 'I show the CFO that QA is a revenue protector. A 5% increase in FCR saves 60,000 repeat calls annually, preserving $420,000 in direct labor costs. Furthermore, catching PCI breaches before auditor fines saves up to $100k per violation. QA generates an empirical 4x ROI on operational investment.'
      },
      {
        id: 'iq-302',
        question: 'What is your strategy for transitioning an enterprise contact center from 1% manual random sampling to 100% automated AI-assisted QA, without causing employee panic about "AI surveillance"?',
        intent: 'Tests change management, technology evaluation, ethical AI deployment, and human-in-the-loop workflows.',
        keyLookouts: [
          'Positions AI as a helpful co-pilot that flags coaching moments rather than a robotic disciplinarian',
          'Shifts human QA analysts from repetitive line-item grading to strategic coaching and root cause engineering',
          'Establishes continuous human calibration of the AI scoring engine'
        ],
        sampleStrongPoint: 'I frame Auto-QA as eliminating the unfairness of random sampling—where an agent’s one bad call determined their monthly rating. AI covers 100% of interactions to celebrate their best work, while human auditors focus on deep-dive coaching and fixing broken company policies.'
      }
    ]
  },
  {
    id: 'int-4',
    roleTitle: 'Lean Six Sigma Quality Specialist (Black Belt)',
    companyProfile: 'Healthcare & Insurance Services Processing',
    level: 'Senior QA Specialist',
    briefing: 'Interview focusing on applying DMAIC, statistical process control, and eliminating systemic rework in complex transactional claim environments.',
    questions: [
      {
        id: 'iq-401',
        question: 'Walk us through an actual or simulated DMAIC project where you reduced operational defects in a contact center or claims processing environment.',
        intent: 'Tests mastery of the 5 phases of DMAIC, data collection, and sustainable control mechanisms.',
        keyLookouts: [
          'Clear problem statement with baseline defect rate',
          'Use of Pareto and Fishbone to isolate root causes',
          'Pilot implementation and measurable post-improvement sigma level',
          'Control plan with ongoing monitoring charts'
        ],
        sampleStrongPoint: 'In Define, we identified that claim rework was 22%, costing $180k. In Measure, we audited 600 claims. In Analyze, our Pareto showed 78% of errors came from missing provider taxonomy codes. In Improve, we implemented a required CRM dropdown validator. In Control, rework dropped to 3.2% and was monitored via weekly p-charts.'
      }
    ]
  }
];
