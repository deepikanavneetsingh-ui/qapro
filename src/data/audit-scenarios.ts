import { AuditScenario } from '../types';

export const AUDIT_SCENARIOS: AuditScenario[] = [
  {
    id: 'audit-sc-1',
    title: 'Disputed Overdraft & Fraud Charge (FinTech Voice Call)',
    channel: 'Voice Call',
    domain: 'FinTech & Digital Banking',
    duration: '04:42',
    agentName: 'Marcus Vance',
    customerName: 'Eleanor Vance-Rios',
    difficulty: 'Challenging',
    customerSentiment: 'Distressed',
    scenarioSummary: 'Customer noticed an unexpected $180 fee plus overdraft penalties on her mobile banking app and is anxious about rent payment bouncing. The agent must verify identity securely, de-escalate, reverse eligible fees, and explain pending transaction timing.',
    benchmarkScore: 88,
    benchmarkNotes: 'Agent performed exceptional de-escalation and accurate fee reversal, but hesitated on secondary verification and omitted mandatory regulatory disclosure regarding dispute processing timelines.',
    transcript: [
      {
        speaker: 'agent',
        timestamp: '00:03',
        text: 'Thank you for calling Apex Digital Bank. My name is Marcus. May I please have your first and last name, along with your registered phone number?'
      },
      {
        speaker: 'customer',
        timestamp: '00:11',
        text: 'Hi Marcus, yes... Eleanor Rios. My number is 555-019-4821. Listen, I woke up this morning and my account is negative $215! There is an international charge from London that I NEVER made, and now my rent check is going to bounce tomorrow. I am in total panic!'
      },
      {
        speaker: 'agent',
        timestamp: '00:26',
        text: 'Eleanor, I completely understand how alarming that is, especially with rent due tomorrow. Take a deep breath—I am looking at your account right now, and we will get this sorted out for you immediately.',
        isKeyMoment: true,
        annotation: 'Strong immediate empathy and reassurance without making premature promises.'
      },
      {
        speaker: 'agent',
        timestamp: '00:38',
        text: 'To make sure your account is 100% secure before we proceed, I am sending a 6-digit one-time security passcode to your phone ending in 4821. Please read that back to me when you see it.'
      },
      {
        speaker: 'customer',
        timestamp: '00:49',
        text: 'Got it, the code is 9 - 4 - 2 - 1 - 0 - 8.'
      },
      {
        speaker: 'agent',
        timestamp: '00:56',
        text: 'Thank you Eleanor, verification is confirmed. I see the charge: $180.00 at "UK Digital Media Ltd" processed at 3:14 AM, followed by a $35 overdraft fee. You mentioned you did not authorize this charge at all?'
      },
      {
        speaker: 'customer',
        timestamp: '01:10',
        text: 'Never! I was asleep in Dallas, Texas. I have never even visited the UK!'
      },
      {
        speaker: 'agent',
        timestamp: '01:18',
        text: 'Understood. First step: I have immediately frozen your current debit card to prevent any further unauthorized attempts. You can still use Apple Pay with the temporary digital card I will generate. Second, I am initiating a provisional credit of $180 right now, and I have waived the $35 overdraft fee immediately. Your balance is now restored to positive $35.00 so your rent check will clear.'
      },
      {
        speaker: 'customer',
        timestamp: '01:48',
        text: 'Oh my goodness, thank God! Are you sure the rent check won’t bounce? Will the provisional credit stay?'
      },
      {
        speaker: 'agent',
        timestamp: '01:55',
        text: 'Yes, your available balance is positive right now. A formal fraud investigation takes up to 10 business days under Regulation E. A new physical debit card is being expedited to your Dallas address via 2-day FedEx with no shipping fee.'
      },
      {
        speaker: 'customer',
        timestamp: '02:18',
        text: 'Marcus, you have been an absolute lifesaver. You have no idea what a relief this is.'
      },
      {
        speaker: 'agent',
        timestamp: '02:24',
        text: 'It is my absolute pleasure, Eleanor. Please make sure to update your mobile password as an extra precaution. Is there anything else with your accounts today that I can assist you with?'
      },
      {
        speaker: 'customer',
        timestamp: '02:35',
        text: 'No, that is everything. Thank you so much again!'
      },
      {
        speaker: 'agent',
        timestamp: '02:39',
        text: 'You are very welcome! Have a wonderful day and thank you for banking with Apex.'
      }
    ],
    criteria: [
      {
        id: 'c-1',
        category: 'Greeting & Verification',
        label: 'Mandatory Customer Authentication (2FA)',
        description: 'Agent must send and verify 2FA OTP or security questions before disclosing balance or making account changes.',
        maxPoints: 20,
        isFatal: true,
        benchmarkScore: 20,
        scoringGuide: 'Full marks: Verified 2FA properly before executing card freeze and credit. Zero marks / Fatal if skipped.'
      },
      {
        id: 'c-2',
        category: 'Empathy & Soft Skills',
        label: 'De-escalation & Active Listening',
        description: 'Acknowledge customer distress with genuine warmth, avoiding robotic scripting.',
        maxPoints: 20,
        isFatal: false,
        benchmarkScore: 20,
        scoringGuide: 'Full marks (20): Acknowledged fear regarding rent, de-escalated seamlessly. 10-15: Basic empathy. 0: Dismissive.'
      },
      {
        id: 'c-3',
        category: 'Resolution & Accuracy',
        label: 'Technical Accuracy & Actionable Solution',
        description: 'Froze compromised card, waived overdraft fee, applied provisional credit, and expedited replacement.',
        maxPoints: 30,
        isFatal: false,
        benchmarkScore: 28,
        scoringGuide: '28/30: All operational steps executed smoothly. Slight omission: did not explicitly remind customer to review subscriptions.'
      },
      {
        id: 'c-4',
        category: 'Compliance & Security',
        label: 'Regulation E & Fraud Disclosures',
        description: 'Mandatory mention of the 10 business day investigation window and provisional credit terms.',
        maxPoints: 20,
        isFatal: true,
        benchmarkScore: 12,
        scoringGuide: 'Mentioned 10 business days, but failed to recite required written confirmation notice timeline under Regulation E.'
      },
      {
        id: 'c-5',
        category: 'Wrap-up & Tool Usage',
        label: 'Closing, Security Advice & Documentation',
        description: 'Advised mobile password reset, offered additional help, warm closing.',
        maxPoints: 10,
        isFatal: false,
        benchmarkScore: 8,
        scoringGuide: 'Good closing, advised password reset. Missed referencing the survey.'
      }
    ]
  },
  {
    id: 'audit-sc-2',
    title: 'PCI-DSS Breach & Credit Card Hold (E-Commerce Live Chat)',
    channel: 'Live Chat',
    domain: 'E-Commerce & Retail',
    duration: '06:15',
    agentName: 'Kevin Diaz',
    customerName: 'Robert Langdon',
    difficulty: 'Expert',
    customerSentiment: 'Confused',
    scenarioSummary: 'Customer wants to change the payment card on a delayed custom furniture order. During live chat, the customer accidentally types their full 16-digit credit card number and CVV directly into the chat window.',
    benchmarkScore: 0,
    benchmarkNotes: 'AUTO-FAIL CRITICAL COMPLIANCE BREACH: Agent failed to immediately redact/purge card details from chat logs, and instead typed back "Thank you for the card number, let me update that for you." Violation of PCI-DSS Requirement 3.',
    transcript: [
      {
        speaker: 'system',
        timestamp: '14:02:01',
        text: 'Chat started with Kevin D. Order #FN-88914.'
      },
      {
        speaker: 'agent',
        timestamp: '14:02:10',
        text: 'Hello Robert, welcome to Nordic Living Support! How can I help you with your order today?'
      },
      {
        speaker: 'customer',
        timestamp: '14:02:35',
        text: 'Hi Kevin. I got an email saying my Oak Dining Table payment failed on my old Visa. I want to pay with my new Mastercard right now so it does not delay delivery.'
      },
      {
        speaker: 'agent',
        timestamp: '14:03:02',
        text: 'I can certainly help you update your payment information so your table stays on schedule.'
      },
      {
        speaker: 'customer',
        timestamp: '14:03:40',
        text: 'Great, here it is: 5412 7512 3412 8901, Exp 08/28, CVV 842. Name is Robert Langdon.',
        isKeyMoment: true,
        annotation: 'CRITICAL EVENT: Customer typed unmasked PAN and CVV into chat text.'
      },
      {
        speaker: 'agent',
        timestamp: '14:04:15',
        text: 'Thank you for the card number! Let me update that in our billing portal right now.',
        isKeyMoment: true,
        annotation: 'FATAL ERROR: Agent accepted plain-text card info, did not trigger secure payment link, and failed to initiate immediate transcript data redaction.'
      },
      {
        speaker: 'agent',
        timestamp: '14:05:20',
        text: 'All set Robert! Payment of $1,240 has gone through and your delivery is confirmed for Thursday.'
      },
      {
        speaker: 'customer',
        timestamp: '14:05:45',
        text: 'Awesome, thanks for the quick help!'
      },
      {
        speaker: 'agent',
        timestamp: '14:06:00',
        text: 'Have a great day!'
      }
    ],
    criteria: [
      {
        id: 'c-201',
        category: 'Compliance & Security',
        label: 'PCI-DSS Data Redaction & Secure Link Protocol',
        description: 'Agent MUST NOT accept credit card numbers or CVV in plain text. Must trigger secure payment form and redact chat text immediately.',
        maxPoints: 40,
        isFatal: true,
        benchmarkScore: 0,
        scoringGuide: 'FATAL (0% on entire audit): Agent accepted plain text CVV and card details in chat window.'
      },
      {
        id: 'c-202',
        category: 'Greeting & Verification',
        label: 'Customer Identification & Order Verification',
        description: 'Verify shipping address or email on file before making order updates.',
        maxPoints: 20,
        isFatal: false,
        benchmarkScore: 12,
        scoringGuide: 'Partial: Order number was in header, but agent failed to confirm billing zip or email.'
      },
      {
        id: 'c-203',
        category: 'Resolution & Accuracy',
        label: 'Process Execution & Channel Protocol',
        description: 'Provide proper payment link rather than manual credit entry.',
        maxPoints: 20,
        isFatal: false,
        benchmarkScore: 5,
        scoringGuide: 'Process bypassed company policy on card storage.'
      },
      {
        id: 'c-204',
        category: 'Empathy & Soft Skills',
        label: 'Clarity, Professional Tone & CWT',
        description: 'Pacing, responsiveness, and professional demeanor.',
        maxPoints: 10,
        isFatal: false,
        benchmarkScore: 9,
        scoringGuide: 'Tone was polite, response times were under 45 seconds.'
      },
      {
        id: 'c-205',
        category: 'Wrap-up & Tool Usage',
        label: 'Ticket Tagging & Security Incident Notification',
        description: 'Flag security incident to Infosec / Compliance officer.',
        maxPoints: 10,
        isFatal: false,
        benchmarkScore: 0,
        scoringGuide: 'No security incident ticket created.'
      }
    ]
  },
  {
    id: 'audit-sc-3',
    title: 'HIPAA Verification & Prescription Renewal (Healthcare Voice)',
    channel: 'Voice Call',
    domain: 'Healthcare & Life Sciences',
    duration: '05:18',
    agentName: 'Sophia Chen',
    customerName: 'Margaret Holloway',
    difficulty: 'Challenging',
    customerSentiment: 'Confused',
    scenarioSummary: 'An elderly patient calls in regarding an insulin refill that was rejected by her Medicare Part D insurance. The agent conducts flawless patient authentication, identifies the prior-authorization gap, contacts the pharmacy, and demonstrates patient empathy.',
    benchmarkScore: 96,
    benchmarkNotes: 'Model interaction for healthcare QA. Perfect 3-point HIPAA authentication, warm pacing tailored for an elderly caller, and comprehensive explanation of Prior Authorization timeline.',
    transcript: [
      {
        speaker: 'agent',
        timestamp: '00:02',
        text: 'Thank you for calling CareFirst Health Partners. My name is Sophia. May I please have your full legal name, date of birth, and member ID number?'
      },
      {
        speaker: 'customer',
        timestamp: '00:15',
        text: 'Hello dear. My name is Margaret Holloway. Date of birth is July 14th, 1948. And my member card says... CF-8819203.'
      },
      {
        speaker: 'agent',
        timestamp: '00:32',
        text: 'Thank you so much Mrs. Holloway, I have your record pulled up right here. How can I help you today?'
      },
      {
        speaker: 'customer',
        timestamp: '00:40',
        text: 'Well, I went to Walgreens this morning for my Lantus insulin pen, and the pharmacist told me my insurance was denied and it would cost $340 out of pocket! I cannot afford that on my pension, and I only have two days of medicine left.'
      },
      {
        speaker: 'agent',
        timestamp: '00:58',
        text: 'Mrs. Holloway, I hear how concerning that is, and insulin is something you cannot be without. Let me look at the rejection claim from Walgreens right now to see why it didn’t process.',
        isKeyMoment: true,
        annotation: 'Empathetic pacing, acknowledged urgency of insulin without panic.'
      },
      {
        speaker: 'agent',
        timestamp: '01:22',
        text: 'I see what happened: your annual Prior Authorization expired on August 31st. The doctor’s office needs to send an updated renewal form to our clinical review team. But because you are down to two days of supply, I can issue an immediate 30-day emergency override right now on this call.'
      },
      {
        speaker: 'customer',
        timestamp: '01:50',
        text: 'Oh bless you! Can I pick it up today?'
      },
      {
        speaker: 'agent',
        timestamp: '01:54',
        text: 'Yes! I have entered the override approval code: E-9912. Your co-pay will be your normal $15.00. I am also calling the Walgreens on Main Street directly to ensure they re-run the claim while you are on your way, and I will fax the renewal notice directly to Dr. Peterson’s office so you won’t have this issue next month.'
      },
      {
        speaker: 'customer',
        timestamp: '02:25',
        text: 'Sophia, you are an angel. Thank you so much for taking care of all of that.'
      },
      {
        speaker: 'agent',
        timestamp: '02:32',
        text: 'It is my pleasure Mrs. Holloway. Please take care, and don’t hesitate to call us if you have any trouble at the pharmacy desk.'
      }
    ],
    criteria: [
      {
        id: 'c-301',
        category: 'Greeting & Verification',
        label: 'HIPAA 3-Point Patient Verification',
        description: 'Full legal name, Date of Birth, and Member ID verified prior to PHI discussion.',
        maxPoints: 25,
        isFatal: true,
        benchmarkScore: 25,
        scoringGuide: 'Flawless HIPAA verification.'
      },
      {
        id: 'c-302',
        category: 'Empathy & Soft Skills',
        label: 'Active Listening, Tone Pacing & Patient Comfort',
        description: 'Pacing adapted for elderly caller, reassuring tone, zero jargon.',
        maxPoints: 25,
        isFatal: false,
        benchmarkScore: 25,
        scoringGuide: 'Exemplary empathy and clarity.'
      },
      {
        id: 'c-303',
        category: 'Resolution & Accuracy',
        label: 'Emergency Override & Clinical Escalation',
        description: 'Issued 30-day emergency override, notified pharmacy, and sent fax to physician.',
        maxPoints: 30,
        isFatal: false,
        benchmarkScore: 30,
        scoringGuide: 'Complete resolution covering immediate need and proactive root-cause prevention.'
      },
      {
        id: 'c-304',
        category: 'Compliance & Security',
        label: 'PHI Handling & Pharmacy Privacy Standards',
        description: 'Followed Medicare Part D formulary guidelines without unauthorized third-party disclosure.',
        maxPoints: 10,
        isFatal: true,
        benchmarkScore: 10,
        scoringGuide: '100% compliant.'
      },
      {
        id: 'c-305',
        category: 'Wrap-up & Tool Usage',
        label: 'CRM Documentation & Pharmacy Code Logging',
        description: 'Logged override authorization code E-9912 into claims system.',
        maxPoints: 10,
        isFatal: false,
        benchmarkScore: 6,
        scoringGuide: 'Logged override, but minor delay in updating physician contact field in CRM.'
      }
    ]
  },
  {
    id: 'audit-sc-4',
    title: 'SaaS Enterprise Cloud Outage & SLA Breach (Tier 2 Ticket)',
    channel: 'Escalated Tier 2',
    domain: 'SaaS & Enterprise Tech',
    duration: '07:20',
    agentName: 'Devon Patel',
    customerName: 'Cynthia Vance (CTO, OmniRetail)',
    difficulty: 'Expert',
    customerSentiment: 'Demanding',
    scenarioSummary: 'Enterprise client experiencing high-severity API latency impacting checkout across 40 eCommerce storefronts. Customer threatens contract cancellation over 99.99% uptime SLA breach. Agent must triage, communicate technical status, provide RCA timeline, and manage executive relationship.',
    benchmarkScore: 84,
    benchmarkNotes: 'Strong technical diagnosis and rapid bug reproduction, but agent over-promised a hard resolution ETA before engineering completed database failover.',
    transcript: [
      {
        speaker: 'customer',
        timestamp: '11:15',
        text: 'Devon, our webhook latency has spiked to 4,200ms. Checkout conversion has collapsed by 35% in the last 40 minutes. We pay $45k/month for Tier 1 Enterprise Mission-Critical support. I need this escalated to your VP of Infrastructure immediately and a credit issued for SLA breach.'
      },
      {
        speaker: 'agent',
        timestamp: '11:17',
        text: 'Cynthia, thank you for flagging this directly. I am pulling up your cluster telemetry on US-East-1 right now. I see the latency spike starting at 10:48 UTC correlating with our Postgres read-replica synchronization.'
      },
      {
        speaker: 'agent',
        timestamp: '11:19',
        text: 'I have already escalated this ticket to P1 Critical Status with our Core Reliability team. Incident Commander has been paged. I will be your dedicated point of contact on this thread until full resolution.',
        isKeyMoment: true,
        annotation: 'Appropriate priority assignment and ownership established.'
      },
      {
        speaker: 'customer',
        timestamp: '11:21',
        text: 'What is the ETA for failover? We cannot wait another hour.'
      },
      {
        speaker: 'agent',
        timestamp: '11:23',
        text: 'We are guaranteed to have this completely fixed in 20 minutes.',
        isKeyMoment: true,
        annotation: 'COACHING DEFECT: Over-promising specific recovery ETA without Incident Commander sign-off.'
      },
      {
        speaker: 'agent',
        timestamp: '11:35',
        text: 'Update: Manual failover to replica cluster B has succeeded. Current p99 latency has normalized to 118ms across all 40 of your endpoints. I have logged SLA credit claim #CR-9921 for our billing review, and a formal Root Cause Analysis (RCA) post-mortem will be delivered to your inbox within 48 business hours.'
      }
    ],
    criteria: [
      {
        id: 'c-401',
        category: 'Resolution & Accuracy',
        label: 'Severity Triage & Incident Command Escalation',
        description: 'Accurate P1 priority tagging and cluster telemetry correlation.',
        maxPoints: 30,
        isFatal: false,
        benchmarkScore: 28,
        scoringGuide: 'Swift triage and telemetry analysis.'
      },
      {
        id: 'c-402',
        category: 'Empathy & Soft Skills',
        label: 'Executive Composure & Relationship Management',
        description: 'Handling high-stakes enterprise CTO communication with professional gravity.',
        maxPoints: 20,
        isFatal: false,
        benchmarkScore: 18,
        scoringGuide: 'Maintained composure under intense pressure.'
      },
      {
        id: 'c-403',
        category: 'Resolution & Accuracy',
        label: 'ETA Commitment & Realistic Expectations',
        description: 'Never promise unconfirmed engineering fix times during active outages.',
        maxPoints: 20,
        isFatal: false,
        benchmarkScore: 8,
        scoringGuide: 'Deduction: Promised 20-minute fix time before engineering confirmation. Best practice is giving status update cadence (every 15 min).'
      },
      {
        id: 'c-404',
        category: 'Compliance & Security',
        label: 'SLA Credit & Contractual Protocol',
        description: 'Properly logged SLA claim and committed to formal RCA timeline.',
        maxPoints: 15,
        isFatal: false,
        benchmarkScore: 15,
        scoringGuide: 'Followed enterprise SLA protocol.'
      },
      {
        id: 'c-405',
        category: 'Wrap-up & Tool Usage',
        label: 'Post-Incident RCA Follow-through',
        description: 'Detailed incident summary in JIRA/Salesforce.',
        maxPoints: 15,
        isFatal: false,
        benchmarkScore: 15,
        scoringGuide: 'Documented cluster logs accurately.'
      }
    ]
  },
  {
    id: 'audit-sc-5',
    title: 'Flight Cancellation & Re-booking Voucher (Airlines Voice)',
    channel: 'Voice Call',
    domain: 'Travel & Hospitality',
    duration: '04:55',
    agentName: 'Aaliyah Washington',
    customerName: 'Daniel Brooks',
    difficulty: 'Standard',
    customerSentiment: 'Frustrated',
    scenarioSummary: 'Passenger stranded at Chicago O’Hare due to weather cancellation. Passenger is missing a critical medical conference. Agent must navigate DOT regulations, provide hotel vouchers, and secure an alternative flight through a partner carrier.',
    benchmarkScore: 92,
    benchmarkNotes: 'Superb de-escalation, rapid GDS re-ticketing, accurate explanation of weather versus mechanical cancellation rules under DOT guidelines.',
    transcript: [
      {
        speaker: 'agent',
        timestamp: '00:03',
        text: 'Thank you for calling SkyBound Airlines Premier Desk. My name is Aaliyah. May I have your 6-character booking confirmation code?'
      },
      {
        speaker: 'customer',
        timestamp: '00:12',
        text: 'It is J - 7 - K - 9 - P - 2. My flight to Boston just got cancelled at the gate, and the gate agent told me the next available flight is in two days! I am delivering a keynote at Harvard Medical tomorrow morning!'
      },
      {
        speaker: 'agent',
        timestamp: '00:28',
        text: 'Mr. Brooks, I hear you, and missing a medical keynote is simply not an option. Let me look at all interline partner airlines right now to get you to Boston tonight.'
      },
      {
        speaker: 'agent',
        timestamp: '00:48',
        text: 'I found a seat on our Star Alliance partner departing in 90 minutes from Terminal 2. I have protected that seat for you right now, and transferred your checked baggage directly. You can proceed directly to Gate E14.'
      },
      {
        speaker: 'customer',
        timestamp: '01:10',
        text: 'Are you serious? You just saved my entire career! What about the boarding pass?'
      },
      {
        speaker: 'agent',
        timestamp: '01:15',
        text: 'I have refreshed your mobile app pass, and emailed the updated e-ticket receipt. Because of the initial delay, I also added a $50 meal voucher to your digital wallet.'
      }
    ],
    criteria: [
      {
        id: 'c-501',
        category: 'Greeting & Verification',
        label: 'PNR & Passenger Authentication',
        description: 'Verify PNR and passenger name.',
        maxPoints: 20,
        isFatal: true,
        benchmarkScore: 20,
        scoringGuide: 'Fast, accurate PNR lookup.'
      },
      {
        id: 'c-502',
        category: 'Empathy & Soft Skills',
        label: 'Urgency Matching & Decisive Problem Solving',
        description: 'Match customer pace and take ownership without making excuses.',
        maxPoints: 25,
        isFatal: false,
        benchmarkScore: 24,
        scoringGuide: 'Outstanding ownership and urgency.'
      },
      {
        id: 'c-503',
        category: 'Resolution & Accuracy',
        label: 'GDS Re-ticketing & Interline Routing',
        description: 'Secured partner flight and transferred baggage seamlessly.',
        maxPoints: 30,
        isFatal: false,
        benchmarkScore: 30,
        scoringGuide: 'Flawless re-booking execution.'
      },
      {
        id: 'c-504',
        category: 'Compliance & Security',
        label: 'DOT Passenger Bill of Rights',
        description: 'Accurately handled meal amenity and re-accommodation rules.',
        maxPoints: 15,
        isFatal: false,
        benchmarkScore: 10,
        scoringGuide: 'Good, but missed mentioning optional refund right if flight was cancelled.'
      },
      {
        id: 'c-505',
        category: 'Wrap-up & Tool Usage',
        label: 'Clear Directions & Closing',
        description: 'Gave gate number, sent mobile boarding pass, and confirmed baggage routing.',
        maxPoints: 10,
        isFatal: false,
        benchmarkScore: 8,
        scoringGuide: 'Solid closing, proactive directions.'
      }
    ]
  }
];
