import { DomainSpecialization } from '../types';

export const DOMAINS: DomainSpecialization[] = [
  {
    id: 'dom-1',
    name: 'FinTech & Digital Banking QA',
    category: 'Financial Services',
    badgeColor: 'emerald',
    summary: 'Quality frameworks tailored for mobile banking, digital wallets, neo-banks, and crypto trading desks requiring strict AML, KYC, and PCI compliance.',
    criticalMetrics: [
      { metric: 'KYC/2FA Adherence', target: '100% (Zero Tolerance)', importance: 'Prevents account takeover and federal sanctions' },
      { metric: 'Reg E Dispute Accuracy', target: '≥ 98%', importance: 'Ensures provisional credit compliance within 10 business days' },
      { metric: 'First Contact Resolution', target: '≥ 84%', importance: 'Prevents customer panic over frozen funds' }
    ],
    fatalErrorTraps: [
      'Disclosing account balance before 2FA verification code confirmation',
      'Failing to pause audio recording during card CVV entry',
      'Providing unlicensed financial advice or price predictions on cryptocurrency'
    ],
    regulatoryMandates: ['PCI-DSS Requirement 3', 'Regulation E & Regulation Z', 'Gramm-Leach-Bliley Act (GLBA)', 'Bank Secrecy Act / AML'],
    scorecardFocus: 'Authentication (30%), Regulatory Accuracy (35%), De-escalation (20%), Wrap-up (15%)',
    careerRoles: ['FinTech QA Analyst', 'Financial Compliance Auditor', 'Risk & Quality Lead']
  },
  {
    id: 'dom-2',
    name: 'Healthcare & HealthTech BPO QA',
    category: 'Healthcare & Life Sciences',
    badgeColor: 'cyan',
    summary: 'Auditing medical concierge, health insurance claims, telemedicine support, and pharmacy prior authorization desks under strict HIPAA safeguards.',
    criticalMetrics: [
      { metric: 'HIPAA 3-Point Auth', target: '100%', importance: 'Eliminates unlawful Protected Health Information (PHI) disclosures' },
      { metric: 'Prior Auth Accuracy', target: '≥ 95%', importance: 'Ensures patients receive life-saving medications on schedule' },
      { metric: 'Patient Empathy Index', target: '≥ 92%', importance: 'Calms anxious patients during medical crises' }
    ],
    fatalErrorTraps: [
      'Confirming patient status to unauthorized family members without signed release',
      'Misinterpreting Medicare Part D co-pay tier or formulary coverage',
      'Providing unauthorized medical diagnosis or altering dosage instructions'
    ],
    regulatoryMandates: ['HIPAA Privacy & Security Rules', 'HITECH Act', 'CMS Medicare Part C & D Regulations'],
    scorecardFocus: 'Patient Privacy (35%), Clinical Accuracy (30%), Empathy (25%), CRM Tool Usage (10%)',
    careerRoles: ['Healthcare QA Specialist', 'Clinical Documentation Auditor', 'Healthcare Quality Director']
  },
  {
    id: 'dom-3',
    name: 'E-Commerce & Omnichannel Retail QA',
    category: 'Consumer & Retail',
    badgeColor: 'amber',
    summary: 'High-velocity customer care evaluating live chat concurrency, return authorizations, courier logistics, and seasonal surge workflows.',
    criticalMetrics: [
      { metric: 'Customer Wait Time (Chat)', target: '< 45s', importance: 'Prevents cart abandonment and customer exit' },
      { metric: 'Return/Refund Compliance', target: '≥ 96%', importance: 'Mitigates inventory shrinkage while satisfying customer' },
      { metric: 'CSAT (Customer Satisfaction)', target: '≥ 88%', importance: 'Drives repeat purchase frequency and brand loyalty' }
    ],
    fatalErrorTraps: [
      'Manually processing unauthorized refunds above supervisor financial limits',
      'Accepting plain-text credit card details in unencrypted chat windows',
      'Providing incorrect shipping customs duties on international orders'
    ],
    regulatoryMandates: ['FTC Mail, Internet, or Telephone Order Rule', 'PCI-DSS', 'Consumer Protection Regulations'],
    scorecardFocus: 'Problem Resolution (40%), Digital Empathy (25%), Speed & Concurrency (20%), Tool Logging (15%)',
    careerRoles: ['Retail QA Lead', 'eCommerce Quality Manager', 'Omnichannel CX Auditor']
  },
  {
    id: 'dom-4',
    name: 'SaaS & Enterprise Cloud Support QA',
    category: 'Technology & SaaS',
    badgeColor: 'indigo',
    summary: 'Technical transaction monitoring for B2B cloud platforms, API integrations, developer troubleshooting, and enterprise SLA management.',
    criticalMetrics: [
      { metric: 'P1 Severity SLA Adherence', target: '100% within 15m', importance: 'Contractual penalty avoidance' },
      { metric: 'Bug Reproduction Accuracy', target: '≥ 92%', importance: 'Reduces ping-pong between Support and Engineering' },
      { metric: 'Root Cause Documentation', target: '≥ 90%', importance: 'Enables customer-facing post-mortems' }
    ],
    fatalErrorTraps: [
      'Exposing production API keys or customer database secrets in public ticket replies',
      'Over-promising unverified engineering deployment dates during critical outages',
      'Executing dangerous database scripts directly on enterprise client tenants'
    ],
    regulatoryMandates: ['SOC 2 Type II', 'ISO/IEC 27001', 'Enterprise SLA Legal Master Agreements'],
    scorecardFocus: 'Technical Competence (45%), Communication Gravitas (25%), SLA Adherence (20%), Ticket Hygiene (10%)',
    careerRoles: ['Technical Support QA Analyst', 'Enterprise Support Operations Lead', 'SaaS Quality Architect']
  },
  {
    id: 'dom-5',
    name: 'Telecommunications & Broadband ISP QA',
    category: 'Operations & Trust',
    badgeColor: 'blue',
    summary: 'Evaluating high-volume broadband diagnostic calls, device provisioning, retention saves, and technical truck roll dispatches.',
    criticalMetrics: [
      { metric: 'Unnecessary Truck Roll %', target: '< 6%', importance: 'Saves $150+ field technician dispatch expense' },
      { metric: 'First Contact Resolution', target: '≥ 78%', importance: 'Reduces repeat broadband complaints' },
      { metric: 'Retention Save Quality', target: '≥ 85%', importance: 'Preserves average revenue per user (ARPU) ethically' }
    ],
    fatalErrorTraps: [
      'Applying unauthorized retention discounts or locking customers into contracts without explicit consent ("Cramming")',
      'Failing to verify CPNI (Customer Proprietary Network Information) password before account changes',
      'Falsifying line diagnostic tests to avoid taking ownership'
    ],
    regulatoryMandates: ['FCC CPNI Regulations', 'Truth-in-Billing Rules', 'TCPA'],
    scorecardFocus: 'Hardware Diagnostics (35%), CPNI Verification (25%), De-escalation (25%), Dispatch Accuracy (15%)',
    careerRoles: ['Telecom QA Specialist', 'Network Support Auditor', 'Retention QA Lead']
  },
  {
    id: 'dom-6',
    name: 'Travel, Airlines & Hospitality QA',
    category: 'Consumer & Retail',
    badgeColor: 'sky',
    summary: 'Global Distribution System (GDS) ticketing audits, weather irregular operations (IROPS), hotel bookings, and airline passenger rights.',
    criticalMetrics: [
      { metric: 'GDS Ticketing Accuracy', target: '99.5%', importance: 'Prevents agency debit memos (ADMs) and lost flights' },
      { metric: 'DOT Passenger Bill of Rights', target: '100%', importance: 'Compliance with mandatory meal/hotel accommodations' },
      { metric: 'Urgency & Pacing', target: '≥ 90%', importance: 'Critical for passengers stranded at airport gates' }
    ],
    fatalErrorTraps: [
      'Canceling a passenger’s return ticket accidentally during outbound rebooking',
      'Refusing mandatory cash refunds for airline-cancelled flights under DOT mandates',
      'Miscalculating international visa and transit passport requirements'
    ],
    regulatoryMandates: ['FAA & DOT Consumer Protections', 'IATA GDS Standards', 'EU Regulation 261/2004'],
    scorecardFocus: 'GDS & Routing Accuracy (40%), Regulatory Compliance (25%), Pacing & De-escalation (25%), Documentation (10%)',
    careerRoles: ['Airlines QA Auditor', 'Hospitality Experience Lead', 'GDS Quality Specialist']
  },
  {
    id: 'dom-7',
    name: 'Insurance BPO & Claims Processing QA',
    category: 'Financial Services',
    badgeColor: 'violet',
    summary: 'Auditing First Notice of Loss (FNOL), auto & property claims adjudication, coverage verification, and fraud detection protocols.',
    criticalMetrics: [
      { metric: 'Coverage Verification Accuracy', target: '100%', importance: 'Eliminates unauthorized payout exposure' },
      { metric: 'Fraud Red Flag Identification', target: '≥ 92%', importance: 'Detects staged accidents or inflated medical claims' },
      { metric: 'Claim Cycle Time', target: '< 4 days', importance: 'Maintains policyholder satisfaction during crisis' }
    ],
    fatalErrorTraps: [
      'Admitting legal liability or fault on behalf of the insured driver',
      'Disclosing policy maximum coverage limits before formal liability investigation',
      'Failing to log suspected insurance fraud indicators in SIU registry'
    ],
    regulatoryMandates: ['State Insurance Commission Regulations', 'Unfair Claims Settlement Practices Act', 'NAIC Model Laws'],
    scorecardFocus: 'Coverage Adjudication (40%), Legal Liability Protection (30%), Fact-Finding (20%), File Hygiene (10%)',
    careerRoles: ['Claims Quality Auditor', 'Underwriting QA Lead', 'Insurance Operations Manager']
  },
  {
    id: 'dom-8',
    name: 'Trust, Safety & Content Moderation QA',
    category: 'Operations & Trust',
    badgeColor: 'rose',
    summary: 'Auditing high-stakes user-generated content, hate speech enforcement, copyright, child sexual abuse material (CSAM), and violent extremism.',
    criticalMetrics: [
      { metric: 'Policy Enforcement Precision', target: '≥ 98%', importance: 'Protects user safety while preserving free expression' },
      { metric: 'High-Harm Escalation SLA', target: '< 3 minutes', importance: 'Rapid emergency response for self-harm and violence' },
      { metric: 'Inter-Rater Reliability (IRR)', target: '≥ 90%', importance: 'Maintains consistent global moderation standards' }
    ],
    fatalErrorTraps: [
      'Approving CSAM, suicide inducement, or active terror threats onto the platform',
      'Failing to trigger immediate law enforcement protocol (NCMEC reporting)',
      'Punishing protected political or journalistic discourse due to cultural misunderstanding'
    ],
    regulatoryMandates: ['EU Digital Services Act (DSA)', 'Section 230 CDA', 'NCMEC Reporting Mandates', 'Online Safety Act'],
    scorecardFocus: 'Policy Precision (50%), Severity Triage (30%), Cultural Context (15%), Speed (5%)',
    careerRoles: ['Trust & Safety QA Analyst', 'Content Policy Lead', 'Moderation Quality Auditor']
  },
  {
    id: 'dom-9',
    name: 'Logistics, Freight & Supply Chain QA',
    category: 'Operations & Trust',
    badgeColor: 'orange',
    summary: 'Auditing 3PL dispatch desks, freight forwarding, customs clearance documentation, temperature-controlled transit, and delivery exception management.',
    criticalMetrics: [
      { metric: 'Bill of Lading (BOL) Accuracy', target: '100%', importance: 'Prevents freight port detention and customs fines' },
      { metric: 'Exception Handling Speed', target: '< 20m', importance: 'Reroutes perishable cargo before spoilage' },
      { metric: 'Carrier Communication Quality', target: '≥ 90%', importance: 'Coordinates drivers, warehouses, and consignees' }
    ],
    fatalErrorTraps: [
      'Releasing bonded freight without customs clearance documentation',
      'Overriding cold-chain temperature thresholds without safety log review',
      'Misrouting hazardous materials (HAZMAT) shipments'
    ],
    regulatoryMandates: ['DOT HAZMAT Regulations', 'CBP Customs Compliance', 'FDA Food Safety Modernization Act (FSMA)'],
    scorecardFocus: 'Documentation Compliance (40%), Exception Routing (30%), Driver Communication (20%), Systems Entry (10%)',
    careerRoles: ['Supply Chain QA Analyst', 'Freight Operations Lead', 'Logistics Quality Specialist']
  },
  {
    id: 'dom-10',
    name: 'Automotive & Connected Car Support QA',
    category: 'Consumer & Retail',
    badgeColor: 'teal',
    summary: 'Evaluating emergency SOS eCall dispatch, remote vehicle telematics, EV battery charging diagnostics, and warranty dealer appointments.',
    criticalMetrics: [
      { metric: 'Emergency eCall Triage', target: '100% within 10s', importance: 'Life-saving crash response' },
      { metric: 'EV Charging Diagnostics', target: '≥ 92%', importance: 'Resolves public charging station failures' },
      { metric: 'Telematics Data Privacy', target: '100%', importance: 'Protects vehicle geolocation records' }
    ],
    fatalErrorTraps: [
      'Failing to dispatch emergency services when automatic crash notification triggers',
      'Unlocking vehicle remotely without strict biometric or 2FA verification',
      'Disclosing vehicle live GPS coordinates to unauthorized persons'
    ],
    regulatoryMandates: ['NHTSA Safety Standards', 'EU eCall Mandate', 'Connected Vehicle Privacy Principles'],
    scorecardFocus: 'Emergency Response (45%), Verification & Telematics (30%), Diagnostics (15%), Documentation (10%)',
    careerRoles: ['Connected Car QA Specialist', 'Automotive Telematics Lead', 'Emergency Dispatch Auditor']
  },
  {
    id: 'dom-11',
    name: 'Gaming & Esports Player Support QA',
    category: 'Consumer & Retail',
    badgeColor: 'purple',
    summary: 'Player account recovery, anti-cheat appeal investigations, virtual item transaction disputes, and in-game toxic behavior moderation.',
    criticalMetrics: [
      { metric: 'Account Recovery Precision', target: '≥ 98%', importance: 'Prevents high-value gaming account theft' },
      { metric: 'Anti-Cheat Appeal Accuracy', target: '≥ 95%', importance: 'Maintains competitive integrity and fair play' },
      { metric: 'Player Community Sentiment', target: '≥ 88%', importance: 'Protects live-service game retention and microtransactions' }
    ],
    fatalErrorTraps: [
      'Restoring hacked accounts to social engineering attackers without original invoice proof',
      'Duplicating or granting rare in-game inventory items without authorization',
      'Ignoring credible real-world violence threats made in game chat'
    ],
    regulatoryMandates: ['COPPA (Children’s Online Privacy)', 'Payment Microtransaction Laws', 'Anti-Money Laundering in Virtual Assets'],
    scorecardFocus: 'Authentication (35%), Game Knowledge (30%), Community Tone (20%), Cheat Investigation (15%)',
    careerRoles: ['Gaming Player Support QA', 'Live-Ops Community Auditor', 'Anti-Fraud Gaming Lead']
  },
  {
    id: 'dom-12',
    name: 'EdTech & Student Advisory QA',
    category: 'Consumer & Retail',
    badgeColor: 'lime',
    summary: 'Evaluating university admissions counseling, student financial aid guidance, LMS technical troubleshooting, and course credentialing.',
    criticalMetrics: [
      { metric: 'FERPA Privacy Compliance', target: '100%', importance: 'Protects student educational records by federal law' },
      { metric: 'Financial Aid Disclosure Accuracy', target: '100%', importance: 'Eliminates predatory student loan liability' },
      { metric: 'Advisory Guidance Quality', target: '≥ 92%', importance: 'Ensures accurate degree progress and enrollment' }
    ],
    fatalErrorTraps: [
      'Disclosing student grades or enrollment status to parents without signed FERPA waiver',
      'Misrepresenting course job placement rates or financial aid grant obligations',
      'Falsifying student attendance logs'
    ],
    regulatoryMandates: ['FERPA (Family Educational Rights and Privacy Act)', 'Title IV Federal Student Aid Regulations', 'Higher Education Opportunity Act'],
    scorecardFocus: 'FERPA & Financial Aid (40%), Advisory Accuracy (30%), Tone & Encouragement (20%), LMS Documentation (10%)',
    careerRoles: ['EdTech QA Lead', 'Academic Compliance Auditor', 'Student Experience QA Specialist']
  },
  {
    id: 'dom-13',
    name: 'Utilities & Smart Energy Customer Operations QA',
    category: 'Operations & Trust',
    badgeColor: 'yellow',
    summary: 'Auditing electric, water, and natural gas customer service, smart meter billing disputes, power outage reports, and low-income energy assistance programs.',
    criticalMetrics: [
      { metric: 'Gas Leak Emergency Dispatch', target: '100% Immediate', importance: 'Zero-tolerance public safety protocol' },
      { metric: 'Disconnection Moratorium Adherence', target: '100%', importance: 'Prevents unlawful winter power shutoffs' },
      { metric: 'High-Bill Dispute Investigation', target: '≥ 90%', importance: 'Accurately explains kWh consumption and tier rates' }
    ],
    fatalErrorTraps: [
      'Failing to treat a reported natural gas smell as an immediate life-safety evacuation dispatch',
      'Shutting off electricity to households with documented medical life-support equipment',
      'Applying estimated billing over 6 months without required onsite meter inspection'
    ],
    regulatoryMandates: ['Public Utilities Commission (PUC) Rules', 'Clean Energy Mandates', 'Life-Support Protection Statutes'],
    scorecardFocus: 'Safety & Emergency Protocol (45%), Regulatory Shutoff Rules (30%), Billing Accuracy (15%), Empathy (10%)',
    careerRoles: ['Utilities QA Auditor', 'Energy Operations Specialist', 'Public Safety QA Lead']
  },
  {
    id: 'dom-14',
    name: 'Government Services & Citizen Assistance QA',
    category: 'Operations & Trust',
    badgeColor: 'stone',
    summary: 'Municipal 311 services, unemployment benefits claims, tax filing guidance, and social services eligibility determinations.',
    criticalMetrics: [
      { metric: 'Impartiality & Fairness Index', target: '100%', importance: 'Guarantees equal public access under law' },
      { metric: 'Statutory Eligibility Accuracy', target: '≥ 97%', importance: 'Eliminates improper benefit disbursements' },
      { metric: 'Multi-Language Translation Protocol', target: '≥ 95%', importance: 'Assists limited-English proficiency citizens' }
    ],
    fatalErrorTraps: [
      'Denying social services or benefits based on personal bias or unverified assumptions',
      'Exposing citizen Social Security Numbers (SSN) or tax records to third parties',
      'Failing to offer certified language interpretation services when required by law'
    ],
    regulatoryMandates: ['Privacy Act of 1974', 'Title VI Civil Rights Act (Language Access)', 'IRS Publication 1075'],
    scorecardFocus: 'Legal Eligibility (40%), Data Privacy & SSN (30%), Civic Dignity & Access (20%), Case Logging (10%)',
    careerRoles: ['Public Sector QA Specialist', 'Citizen Services Auditor', 'Government Operations Lead']
  },
  {
    id: 'dom-15',
    name: 'Legal Process Outsourcing (LPO) QA',
    category: 'Operations & Trust',
    badgeColor: 'neutral',
    summary: 'Auditing eDiscovery document review, contract lifecycle abstraction, compliance redaction, and intellectual property docketing.',
    criticalMetrics: [
      { metric: 'Attorney-Client Privilege Tagging', target: '100%', importance: 'Prevents disastrous waiver of legal privilege in litigation' },
      { metric: 'Contract Abstraction Precision', target: '≥ 98%', importance: 'Ensures accurate liability and indemnification extraction' },
      { metric: 'Redaction Quality', target: '100%', importance: 'Eliminates confidential corporate exposure in court filings' }
    ],
    fatalErrorTraps: [
      'Failing to withhold privileged correspondence between client and trial counsel',
      'Missing court filing docket deadlines leading to default judgment',
      'Breaching non-disclosure agreements regarding pending merger and acquisition (M&A) targets'
    ],
    regulatoryMandates: ['Federal Rules of Civil Procedure (FRCP)', 'ABA Model Rules of Professional Conduct', 'Sarbanes-Oxley Act'],
    scorecardFocus: 'Privilege & Confidentiality (50%), Legal Extraction Accuracy (35%), Thoroughness (15%)',
    careerRoles: ['LPO Quality Manager', 'Legal Operations Lead', 'eDiscovery QA Specialist']
  },
  {
    id: 'dom-16',
    name: 'Real Estate & Property Management Support QA',
    category: 'Operations & Trust',
    badgeColor: 'zinc',
    summary: 'Evaluating tenant maintenance dispatch, lease applications, HOA compliance, commercial rent invoicing, and Fair Housing regulations.',
    criticalMetrics: [
      { metric: 'Fair Housing Adherence', target: '100%', importance: 'Zero-tolerance federal discrimination safeguard' },
      { metric: 'Emergency Maintenance Triage', target: '100% within 15m', importance: 'Prevents structural flooding and freezing pipe damage' },
      { metric: 'Tenant Dispute Resolution', target: '≥ 88%', importance: 'Preserves renewal rates and minimizes evictions' }
    ],
    fatalErrorTraps: [
      'Making discriminatory statements regarding familial status, race, religion, or disability under Fair Housing',
      'Refusing reasonable accommodation for verified emotional support or service animals',
      'Failing to dispatch emergency plumbers for active building sewage backups'
    ],
    regulatoryMandates: ['Fair Housing Act (FHA)', 'Americans with Disabilities Act (ADA)', 'State Landlord-Tenant Codes'],
    scorecardFocus: 'Fair Housing Compliance (40%), Emergency Triage (30%), Lease Procedure (20%), CRM Notes (10%)',
    careerRoles: ['Property Management QA', 'Tenant Experience Auditor', 'Real Estate Operations Lead']
  },
  {
    id: 'dom-17',
    name: 'Recruitment Process Outsourcing (RPO) & HR Ops QA',
    category: 'Operations & Trust',
    badgeColor: 'emerald',
    summary: 'Auditing candidate screening interviews, background check adjudications, employee onboarding inquiries, and payroll discrepancy tickets.',
    criticalMetrics: [
      { metric: 'EEOC Question Compliance', target: '100%', importance: 'Eliminates illegal interview questions' },
      { metric: 'Background Verification Accuracy', target: '≥ 99%', importance: 'Ensures safe workplace hiring' },
      { metric: 'Candidate Experience Rating', target: '≥ 90%', importance: 'Protects employer talent brand' }
    ],
    fatalErrorTraps: [
      'Asking candidates prohibited personal questions (age, marital status, pregnancy, religion, disability)',
      'Sharing candidate medical questionnaires or background checks with unauthorized managers',
      'Misrepresenting salary, compensation, or exempt/non-exempt overtime status'
    ],
    regulatoryMandates: ['EEOC Hiring Guidelines', 'Fair Credit Reporting Act (FCRA)', 'FLSA Overtime Regulations'],
    scorecardFocus: 'EEOC & Legal Compliance (45%), Candidate Engagement (30%), ATS Data Integrity (25%)',
    careerRoles: ['Talent Acquisition QA', 'HR Operations Auditor', 'RPO Quality Manager']
  },
  {
    id: 'dom-18',
    name: 'Streaming Media & Entertainment Subscription QA',
    category: 'Consumer & Retail',
    badgeColor: 'fuchsia',
    summary: 'Video streaming app troubleshooting, 4K HDR playback diagnostics, billing tier modifications, and account sharing security.',
    criticalMetrics: [
      { metric: 'Device Playback Diagnostic Rate', target: '≥ 92%', importance: 'Fixes buffering and DRM license errors across smart TVs' },
      { metric: 'Subscription Downgrade Retention', target: '≥ 82%', importance: 'Offers ad-supported alternatives without churn' },
      { metric: 'AHT Balance', target: '< 4.5m', importance: 'High-volume consumer support efficiency' }
    ],
    fatalErrorTraps: [
      'Continuing to charge subscription fees after user verified cancellation request',
      'Failing to verify primary account holder credentials before sharing viewing profiles',
      'Blaming customer internet service provider without conducting basic app cache diagnostics'
    ],
    regulatoryMandates: ['California Automatic Renewal Law (ARL)', 'FTC Subscription Disclosure Rules', 'Digital Millennium Copyright Act (DMCA)'],
    scorecardFocus: 'Device Troubleshooting (35%), Subscription Ethics (30%), Customer Warmth (25%), Speed (10%)',
    careerRoles: ['Streaming Support QA Lead', 'Digital Media CX Specialist', 'Subscription Quality Auditor']
  },
  {
    id: 'dom-19',
    name: 'Cybersecurity Incident Escalation Desk QA',
    category: 'Technology & SaaS',
    badgeColor: 'red',
    summary: 'Evaluating Security Operations Center (SOC) frontline ticket triage, phishing report intake, ransomware containment alerts, and 2FA resets.',
    criticalMetrics: [
      { metric: 'Ransomware Containment SLA', target: '< 5 minutes', importance: 'Isolates infected machines before lateral network spread' },
      { metric: 'Phishing Triage Accuracy', target: '≥ 98%', importance: 'Blocks malicious payload domains company-wide' },
      { metric: 'Executive VIP Impersonation Catch', target: '100%', importance: 'Prevents business email compromise (BEC) wire fraud' }
    ],
    fatalErrorTraps: [
      'Authorizing password or MFA reset without verified out-of-band video or voice verification',
      'Failing to isolate a host exhibiting active command-and-control beaconing',
      'Classifying a true zero-day exploit report as a false positive'
    ],
    regulatoryMandates: ['NIST Cybersecurity Framework', 'CISA Incident Reporting Mandates', 'CIRCIA Act'],
    scorecardFocus: 'Incident Triage Speed (40%), Verification Rigor (35%), Containment SOP (20%), Forensics Logging (5%)',
    careerRoles: ['Cybersecurity QA Analyst', 'SOC Operations Auditor', 'InfoSec Quality Lead']
  },
  {
    id: 'dom-20',
    name: 'AI Training Data Annotation & RLHF QA',
    category: 'Technology & SaaS',
    badgeColor: 'violet',
    summary: 'Auditing human feedback (RLHF), safety policy alignment, red-teaming outputs, and ground-truth labeling for foundation AI models.',
    criticalMetrics: [
      { metric: 'Safety Taxonomy Precision', target: '≥ 99%', importance: 'Eliminates dangerous, toxic, or illegal AI generation' },
      { metric: 'Annotation Inter-Annotator Agreement (IAA)', target: '≥ 90%', importance: 'Ensures high dataset reliability' },
      { metric: 'Factuality & Citation Verification', target: '≥ 96%', importance: 'Prevents LLM hallucinations during fine-tuning' }
    ],
    fatalErrorTraps: [
      'Labeling toxic hate speech or bomb-making instructions as "safe" or "helpful"',
      'Injecting personal ideological bias into objective fact-based query annotations',
      'Failing to cite primary authoritative source material for factual claims'
    ],
    regulatoryMandates: ['EU Artificial Intelligence Act', 'NIST AI Risk Management Framework', 'Global AI Safety Standards'],
    scorecardFocus: 'Taxonomy Compliance (45%), Fact Verification (35%), Inter-Annotator Consistency (20%)',
    careerRoles: ['AI Data Quality Manager', 'RLHF Evaluation Specialist', 'AI Alignment QA Lead']
  },
  {
    id: 'dom-21',
    name: 'Omnichannel Social Media Support QA',
    category: 'Consumer & Retail',
    badgeColor: 'sky',
    summary: 'Public brand replies across X/Twitter, Instagram, TikTok, LinkedIn, and Reddit—balancing public brand reputation with rapid crisis containment.',
    criticalMetrics: [
      { metric: 'First Response Time (FRT)', target: '< 15m', importance: 'Prevents viral customer outrage on social feeds' },
      { metric: 'Public-to-Private Transition', target: '100%', importance: 'Protects customer PII from public comment threads' },
      { metric: 'Brand Voice Alignment', target: '≥ 94%', importance: 'Maintains authentic, relatable, yet professional corporate tone' }
    ],
    fatalErrorTraps: [
      'Engaging in hostile public arguments with trolls or dissatisfied customers',
      'Accidentally posting personal political opinions from the corporate brand handle',
      'Publicly reposting sensitive screenshots containing customer phone numbers or order IDs'
    ],
    regulatoryMandates: ['FTC Endorsement Guides', 'Platform Terms of Service', 'Corporate Social Media Governance'],
    scorecardFocus: 'Brand Posture & Tone (35%), Privacy Channel Handoff (35%), De-escalation (20%), Routing (10%)',
    careerRoles: ['Social Media QA Specialist', 'Brand Reputation Lead', 'Social Customer Care Auditor']
  },
  {
    id: 'dom-22',
    name: 'Outbound Telesales & Compliance QA',
    category: 'Financial Services',
    badgeColor: 'amber',
    summary: 'Auditing outbound lead generation, B2C consumer sales, warranty extensions, and credit products under strict Telephone Consumer Protection Act (TCPA) rules.',
    criticalMetrics: [
      { metric: 'Do Not Call (DNC) Registry Check', target: '100% Zero Tolerance', importance: 'Prevents statutory fines of up to $43,792 per violation' },
      { metric: 'Calling Hours Adherence', target: '100% (8am - 9pm local)', importance: 'Mandatory federal time-of-day compliance' },
      { metric: 'Disclosure Script Compliance', target: '100%', importance: 'Guarantees informed consumer consent' }
    ],
    fatalErrorTraps: [
      'Calling numbers listed on the National Do Not Call Registry or internal company DNC list',
      'Failing to disclose the sales company name and purpose of call within the first 30 seconds',
      'Using aggressive, deceptive, or coercive sales tactics to force consent'
    ],
    regulatoryMandates: ['Telephone Consumer Protection Act (TCPA)', 'FTC Telemarketing Sales Rule (TSR)', 'State Mini-TCPA Statutes'],
    scorecardFocus: 'DNC & Regulatory Disclosures (50%), Consent Acquisition (30%), Sales Ethics (15%), Disposition (5%)',
    careerRoles: ['Telesales Compliance Auditor', 'Outbound QA Lead', 'Telemarketing Risk Specialist']
  },
  {
    id: 'dom-23',
    name: 'Technical Tier 3 Support Engineering QA',
    category: 'Technology & SaaS',
    badgeColor: 'slate',
    summary: 'Deep-dive audits of complex code reviews, core dump debugging, network packet captures (Wireshark), database deadlocks, and architecture advisory.',
    criticalMetrics: [
      { metric: 'Root Cause Accuracy', target: '≥ 96%', importance: 'Isolates true software defect vs customer environment misconfiguration' },
      { metric: 'Workaround Feasibility', target: '≥ 92%', importance: 'Restores client service pending formal patch release' },
      { metric: 'Engineering Bug Filing Quality', target: '≥ 95%', importance: 'Contains reproducible steps, environment logs, and stack traces' }
    ],
    fatalErrorTraps: [
      'Providing untested workaround scripts that cause catastrophic data corruption or service crashes',
      'Closing ticket as "Cannot Reproduce" without inspecting customer core dump files',
      'Leaking proprietary intellectual property or unreleased source code to clients'
    ],
    regulatoryMandates: ['Software Quality ISO 25010', 'Enterprise ITIL Framework', 'Code Confidentiality Agreements'],
    scorecardFocus: 'Technical Rigor (50%), Bug Documentation (25%), Client Communication (15%), Follow-through (10%)',
    careerRoles: ['Tier 3 Support QA Architect', 'Escalation Engineering Lead', 'Technical Operations Auditor']
  },
  {
    id: 'dom-24',
    name: 'Luxury Goods & VIP Concierge Support QA',
    category: 'Consumer & Retail',
    badgeColor: 'yellow',
    summary: 'White-glove customer care for luxury haute couture, fine jewelry, private aviation, and ultra-high-net-worth (UHNW) individual requests.',
    criticalMetrics: [
      { metric: 'Discretion & Privacy Index', target: '100%', importance: 'Guarantees absolute client confidentiality' },
      { metric: 'Bespoke Problem Solving', target: '≥ 98%', importance: 'Fulfills customized and scarce luxury procurement' },
      { metric: 'Sophisticated Brand Diction', target: '≥ 96%', importance: 'Maintains elite heritage house elegance' }
    ],
    fatalErrorTraps: [
      'Disclosing VIP client identities, purchases, or travel itineraries to paparazzi or third parties',
      'Using casual slang, robotic corporate templates, or hurried tone',
      'Failing to verify insured courier security protocol for $50k+ jewelry dispatches'
    ],
    regulatoryMandates: ['Strict Non-Disclosure Agreements', 'Precious Metal & Gemstone Authentication Standards', 'Customs Export Duties'],
    scorecardFocus: 'Brand Diction & Etiquette (40%), Client Confidentiality (35%), Bespoke Execution (25%)',
    careerRoles: ['Luxury Brand QA Specialist', 'VIP Experience Auditor', 'Concierge Quality Director']
  },
  {
    id: 'dom-25',
    name: 'Consumer Electronics & Hardware Diagnostics QA',
    category: 'Technology & SaaS',
    badgeColor: 'blue',
    summary: 'Troubleshooting smartphones, laptops, smart home appliances, battery thermal issues, firmware reflashes, and warranty replacement claims.',
    criticalMetrics: [
      { metric: 'Hardware Safety Thermal Triage', target: '100% Zero Tolerance', importance: 'Prevents swollen battery fires and personal injury' },
      { metric: 'No-Trouble-Found (NTF) RMA Rate', target: '< 8%', importance: 'Eliminates unnecessary device replacement expense' },
      { metric: 'Step-by-Step Diagnostic Pacing', target: '≥ 90%', importance: 'Guides non-technical users through complex recovery' }
    ],
    fatalErrorTraps: [
      'Instructing a customer to plug in a swollen or smoking lithium-ion battery',
      'Authorizing costly warranty unit replacement without executing mandatory hardware factory test loop',
      'Instructing a customer to perform a factory reset without verifying cloud backup status'
    ],
    regulatoryMandates: ['Consumer Product Safety Commission (CPSC)', 'Right to Repair Statutes', 'WEEE Electronic Waste Directives'],
    scorecardFocus: 'Thermal & Physical Safety (45%), Diagnostic Rigor (30%), Data Backup Verification (15%), RMA Logging (10%)',
    careerRoles: ['Hardware Diagnostics QA', 'Electronics Support Lead', 'RMA Quality Auditor']
  },
  {
    id: 'dom-26',
    name: 'Shared Services Finance: P2P & O2C Accounting QA',
    category: 'Financial Services',
    badgeColor: 'emerald',
    summary: 'Auditing Procure-to-Pay (P2P), Order-to-Cash (O2C), 3-way invoice matching, vendor master data management, and bank reconciliation tickets.',
    criticalMetrics: [
      { metric: '3-Way Match Verification', target: '100%', importance: 'Ensures PO, Goods Receipt, and Invoice match before payment' },
      { metric: 'Duplicate Payment Catch', target: '100%', importance: 'Prevents millions in redundant vendor disbursements' },
      { metric: 'Vendor Bank Change Verification', target: '100% Dual Auth', importance: 'Stops sophisticated wire redirection fraud' }
    ],
    fatalErrorTraps: [
      'Updating vendor banking routing numbers based solely on an unverified email request',
      'Approving invoices exceeding purchase order authority limits without secondary management sign-off',
      'Falsifying internal controls documentation ahead of external financial audits'
    ],
    regulatoryMandates: ['Sarbanes-Oxley (SOX) Section 404', 'GAAP / IFRS Accounting Standards', 'Foreign Corrupt Practices Act (FCPA)'],
    scorecardFocus: 'SOX Internal Controls (50%), 3-Way Match Precision (30%), Fraud Prevention (20%)',
    careerRoles: ['Financial Shared Services QA', 'Internal Controls Auditor', 'P2P/O2C Quality Lead']
  },
  {
    id: 'dom-27',
    name: 'Crisis Escalation & Executive Complaint Desk QA',
    category: 'Operations & Trust',
    badgeColor: 'rose',
    summary: 'Auditing the highest-tier escalations: CEO office complaints, regulatory agency letters (CFPB, BBB, FTC, Attorney General), and media-threatened disputes.',
    criticalMetrics: [
      { metric: 'Root Cause Identification', target: '100%', importance: 'Fixes underlying systemic flaw across the entire enterprise' },
      { metric: 'Legal Settlement Adherence', target: '100%', importance: 'Protects enterprise from formal court litigation' },
      { metric: 'Executive Communication Standard', target: '≥ 98%', importance: 'Represents the CEO office with utmost dignity and resolution' }
    ],
    fatalErrorTraps: [
      'Missing formal statutory response deadlines imposed by regulatory bodies (e.g. 15-day CFPB response clock)',
      'Making binding legal admissions without prior General Counsel clearance',
      'Failing to flag an ongoing systemic safety issue affecting thousands of other customers'
    ],
    regulatoryMandates: ['CFPB Portal Complaint Protocols', 'State Attorney General Inquiries', 'FTC Consent Decrees'],
    scorecardFocus: 'Statutory SLA (40%), Executive Resolution (35%), Root Cause Remediation (25%)',
    careerRoles: ['Executive Complaints QA Lead', 'Regulatory Affairs Auditor', 'Ombudsman Quality Director']
  }
];
