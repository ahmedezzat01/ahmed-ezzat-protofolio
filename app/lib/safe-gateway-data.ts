export type SimulationPage =
  | 'landing'
  | 'disclaimer'
  | 'tor-launch'
  | 'hidden-wiki'
  | 'marketplace'
  | 'forum'
  | 'mixer'
  | 'education'
  | 'link-page'
  | 'debrief';

export interface SecureCircuit {
  guard: { ip: string; country: string; flag: string; provider: string };
  middle: { ip: string; country: string; flag: string; provider: string };
  exit: { ip: string; country: string; flag: string; provider: string };
}

export interface WikiCategory {
  name: string;
  icon: string;
  links: WikiLink[];
}

export interface WikiLink {
  title: string;
  url: string;
  description: string;
  verified: boolean;
  status: 'online' | 'offline' | 'seized' | 'scam';
  upvotes: number;
  lastSeen: string;
  category: string;
}

export interface MarketProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  vendor: string;
  rating: number;
  sales: number;
  shipsFrom: string;
  stealth: string;
  escrow: boolean;
  description: string;
  educationalWarning: string;
  realConsequences: string[];
}

export interface ForumThread {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  date: string;
  replies: number;
  views: number;
  content: string;
  educationalNote: string;
  tags: string[];
  isPinned: boolean;
}

export interface ChatMessage {
  user: string;
  message: string;
  time: string;
  isBot: boolean;
  type?: 'normal' | 'warning' | 'scam-alert' | 'leo-warning' | 'info' | 'system';
}

export interface EducationalModule {
  id: string;
  title: string;
  icon: string;
  content: { heading: string; text: string }[];
}

export const fakeCircuit: SecureCircuit = {
  guard: { ip: '10.0.0.1', country: 'Simulated', flag: '🔒', provider: 'Relay-A' },
  middle: { ip: '10.0.0.2', country: 'Simulated', flag: '🔒', provider: 'Relay-B' },
  exit: { ip: '10.0.0.3', country: 'Simulated', flag: '🔒', provider: 'Relay-C' },
};

export const fakeOnionUrls = [
  'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6.sim',
  'x9y8z7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8d7c6b5a4.sim',
  'm1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6.sim',
  'z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8d7c6b5a4.sim',
  'k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6.sim',
];

export const wikiCategories: WikiCategory[] = [
  {
    name: 'Financial Services',
    icon: '💰',
    links: [
      { title: 'Lazarus Exchange', url: '#', description: 'Crypto exchange — high volume, low fees. WARNING: Most exchanges on dark web are exit scams.', verified: false, status: 'scam', upvotes: 23, lastSeen: '2h ago', category: 'crypto' },
      { title: 'Wasabi Tumbler', url: '#mixer', description: 'CoinJoin mixing service — breaks transaction trail. Analysis shows 78% traceability.', verified: false, status: 'online', upvotes: 156, lastSeen: '5m ago', category: 'crypto' },
      { title: 'Carding Academy', url: '#', description: 'Credit card fraud tutorials — law enforcement sting operation since 2022.', verified: false, status: 'seized', upvotes: 8, lastSeen: '30d ago', category: 'fraud' },
      { title: 'BTC Generator Pro', url: '#', description: 'Bitcoin generator — mathematically impossible. Pure scam.', verified: false, status: 'scam', upvotes: 2, lastSeen: '1d ago', category: 'crypto' },
      { title: 'LocalMonero', url: '#', description: 'Peer-to-peer Monero trading — real service, increasingly monitored.', verified: true, status: 'online', upvotes: 342, lastSeen: '1m ago', category: 'crypto' },
    ],
  },
  {
    name: 'Anonymity & Privacy',
    icon: '🛡️',
    links: [
      { title: 'PGP Key Server', url: '#', description: 'Pretty Good Privacy key distribution — real, legal encryption tool.', verified: true, status: 'online', upvotes: 891, lastSeen: '30s ago', category: 'hacking' },
      { title: 'Tor Metrics Portal', url: '#', description: 'Network statistics and research — public resource.', verified: true, status: 'online', upvotes: 1203, lastSeen: '10s ago', category: 'hacking' },
      { title: 'Tails OS Download', url: '#', description: 'Amnesic live system — real, free, legal privacy operating system.', verified: true, status: 'online', upvotes: 2341, lastSeen: '1m ago', category: 'hacking' },
      { title: 'Mullvad VPN', url: '#', description: 'No-log VPN provider — real privacy service, accepts crypto.', verified: true, status: 'online', upvotes: 1876, lastSeen: '2m ago', category: 'hacking' },
      { title: 'OnionShare', url: '#', description: 'Anonymous file sharing — open source tool.', verified: true, status: 'online', upvotes: 567, lastSeen: '5m ago', category: 'hacking' },
    ],
  },
  {
    name: 'Cracked Software',
    icon: '💻',
    links: [
      { title: 'Windows Activator 2024', url: '#', description: 'Software crack — 99% contain remote access trojans (RATs).', verified: false, status: 'scam', upvotes: 45, lastSeen: '3h ago', category: 'hacking' },
      { title: 'IDM Full Patch', url: '#', description: 'Pirated software — backdoor trojan delivery mechanism.', verified: false, status: 'scam', upvotes: 12, lastSeen: '6h ago', category: 'hacking' },
      { title: 'Office 365 Keys', url: '#', description: 'Stolen volume license keys — Microsoft tracks all activations.', verified: false, status: 'seized', upvotes: 7, lastSeen: '14d ago', category: 'hacking' },
      { title: 'Adobe CC Suite', url: '#', description: 'Cracked Adobe products — crypto miner bundled in installer.', verified: false, status: 'scam', upvotes: 23, lastSeen: '1d ago', category: 'hacking' },
    ],
  },
  {
    name: 'Malware & Exploits',
    icon: '🐛',
    links: [
      { title: 'RaaS Builder Kit', url: '#', description: 'Ransomware-as-a-Service — purchasing = immediate felony charges.', verified: false, status: 'online', upvotes: 67, lastSeen: '15m ago', category: 'hacking' },
      { title: 'Zero-Day Market', url: '#', description: 'Exploit marketplace — monitored by NSA, GCHQ, and defense contractors.', verified: false, status: 'online', upvotes: 234, lastSeen: '8m ago', category: 'hacking' },
      { title: 'Botnet-as-Service', url: '#', description: 'DDoS-for-hire — authorities run multiple fake stresser services.', verified: false, status: 'seized', upvotes: 18, lastSeen: '60d ago', category: 'hacking' },
      { title: 'Emotet Loader', url: '#', description: 'Malware distribution — most payloads contain secondary backdoors.', verified: false, status: 'online', upvotes: 89, lastSeen: '2h ago', category: 'hacking' },
    ],
  },
  {
    name: 'Forums & Discussion',
    icon: '💬',
    links: [
      { title: 'BreachForums v3', url: '#', description: 'Data breach forum — authorities seized in 2023, clones are honeypots.', verified: false, status: 'seized', upvotes: 456, lastSeen: '45d ago', category: 'forums' },
      { title: 'Exploit.in', url: '#', description: 'Cybercrime forum — intelligence agencies have multiple informants.', verified: false, status: 'online', upvotes: 1234, lastSeen: '1m ago', category: 'forums' },
      { title: 'XSS.is', url: '#', description: 'Hacking forum — known LEA informants active since 2020.', verified: false, status: 'online', upvotes: 890, lastSeen: '3m ago', category: 'forums' },
      { title: 'Dread (Reddit clone)', url: '#', description: 'Dark web Reddit alternative — frequent downtime, admin drama.', verified: false, status: 'online', upvotes: 567, lastSeen: '10m ago', category: 'forums' },
    ],
  },
  {
    name: 'Legitimate Services',
    icon: '✅',
    links: [
      { title: 'ProtonMail', url: '#', description: 'Swiss encrypted email — real, legal, trusted by millions.', verified: true, status: 'online', upvotes: 5678, lastSeen: 'now', category: 'hacking' },
      { title: 'Signal Messenger', url: '#', description: 'E2E encrypted messaging — used by journalists and activists.', verified: true, status: 'online', upvotes: 8901, lastSeen: 'now', category: 'hacking' },
      { title: 'Keybase', url: '#', description: 'Encrypted team communication — real, open source.', verified: true, status: 'online', upvotes: 2345, lastSeen: '1m ago', category: 'hacking' },
    ],
  },
];

export const marketProducts: MarketProduct[] = [
  {
    id: 'p1', name: '[REDACTED] Stolen Database — 2.1M Records', category: 'Data Breach',
    price: '₿ 0.0523', vendor: 'shadow_trader_99', rating: 4.2, sales: 147,
    shipsFrom: 'N/A', stealth: 'Instant Download', escrow: true,
    description: 'Corporate database containing emails, passwords (MD5 hashed), phone numbers. Sectors: Finance, Healthcare. Last updated: March 2024.',
    educationalWarning: 'In the real dark web, 90% of data listings are SCAMS or law enforcement honeypots.',
    realConsequences: ['You lose BTC and receive nothing', 'Payment address traceable on blockchain', 'Possession of stolen data = federal crime', 'Authorities have seized similar marketplaces before'],
  },
  {
    id: 'p2', name: '[REDACTED] RaaS Builder v3.1', category: 'Malware',
    price: '₿ 0.1200', vendor: 'codecraftr', rating: 3.8, sales: 89,
    shipsFrom: 'N/A', stealth: 'Encrypted Archive', escrow: true,
    description: 'Ransomware-as-a-Service builder with admin panel, victim management, and Bitcoin payment integration. Supports AES-256 + RSA-2048.',
    educationalWarning: 'Most malware for sale contains backdoors — it infects the buyer, not the target.',
    realConsequences: ['Ransomware often encrypts YOUR files first', 'Distributing malware = 10-20 year sentence', 'Seller has backdoor access to your machine', 'Law enforcement monitors these listings'],
  },
  {
    id: 'p3', name: '[REDACTED] Premium Fake Documents', category: 'Documents',
    price: '₿ 0.0834', vendor: 'doc_master', rating: 2.1, sales: 312,
    shipsFrom: 'Unknown', stealth: 'Physical Mail (DHL)', escrow: false,
    description: 'Passports, driver licenses, utility bills. Claims to pass biometric verification. Multiple templates available.',
    educationalWarning: 'Fake document services are almost always scams or law enforcement operations.',
    realConsequences: ['Document forgery = 5-15 year prison sentence', 'Vendors disappear after payment', 'Interpol maintains forged document database', 'Biometric verification defeats most fakes'],
  },
  {
    id: 'p4', name: '[REDACTED] Zero-Day Exploit — CVE-2024-XXXX', category: 'Exploits',
    price: '₿ 2.5000', vendor: 'exploit_master', rating: 4.9, sales: 23,
    shipsFrom: 'N/A', stealth: 'PGP Encrypted', escrow: true,
    description: 'Remote Code Execution in OpenSSL 3.x. Affects all major Linux distributions. Full exploit chain with payload.',
    educationalWarning: 'Zero-day exploits are monitored by NSA, GCHQ, and defense contractors.',
    realConsequences: ['Selling exploits to non-allies = ITAR violation', 'Intelligence agencies track all buyers', 'Using exploit = Computer Fraud and Abuse Act', 'Can result in life imprisonment'],
  },
  {
    id: 'p5', name: '[REDACTED] Stresser Pro — 100Gbps', category: 'Botnet',
    price: '₿ 0.0345', vendor: 'stress_test_pro', rating: 3.5, sales: 210,
    shipsFrom: 'N/A', stealth: 'API Access', escrow: false,
    description: 'DDoS stress testing service. Claims 100Gbps capacity. UDP, TCP, HTTP flood methods. 99.9% uptime guarantee.',
    educationalWarning: 'DDoS-for-hire services are almost exclusively law enforcement honeypots.',
    realConsequences: ['Using botnet = 10+ year federal sentence', 'ISP monitors for DDoS traffic patterns', 'Authorities run multiple fake stresser services', 'Even "testing" is illegal without written permission'],
  },
  {
    id: 'p6', name: '[REDACTED] Credential Stuffing Pack', category: 'Tools',
    price: '₿ 0.0156', vendor: 'combo_king', rating: 4.0, sales: 567,
    shipsFrom: 'N/A', stealth: 'Encrypted Payload', escrow: true,
    description: 'Automated credential testing tool with proxy rotation, CAPTCHA bypass, and wordlist generator. Supports 50+ sites.',
    educationalWarning: 'Credential stuffing tools are illegal — automated unauthorized access.',
    realConsequences: ['CFAA: Up to 10 years per offense', 'Banks share fraud data with law enforcement', 'IP addresses logged by every major platform', 'Using on any system = criminal liability'],
  },
];

export const forumThreads: ForumThread[] = [
  {
    id: 't1', title: '🔒 Secure Browser 13.0.1 — Critical Security Patch', author: 'dev_secure', authorRole: 'Moderator', date: '2024-03-15', replies: 147, views: 3892,
    content: 'The Secure Project released 13.0.1 patching CVE-2024-XXXXX (crash on certain JS-heavy sites). All users should update immediately. The fix prevents potential deanonymization via timing side-channels. Build hash: SHA256 verified on GitHub. Remember: Always verify PGP signatures before updating.',
    educationalNote: 'Secure browsers are legitimate privacy tools used by journalists, activists, and law enforcement. Updating is critical for security.',
    tags: ['tor', 'security', 'update', 'critical'],
    isPinned: true,
  },
  {
    id: 't2', title: '📊 Blockchain Analysis: Tracing Monero via Kovri', author: 'chain_analyst_42', authorRole: 'Member', date: '2024-03-12', replies: 89, views: 2134,
    content: 'Recent research shows privacy coin transactions can be partially de-anonymized through network analysis. While these coins use advanced cryptography, statistical analysis reveals patterns. Blockchain analysis companies now offer tracing as a premium service. Bottom line: No cryptocurrency is truly anonymous.',
    educationalNote: 'Blockchain forensics is a booming career. Analysis companies hire analysts with $80K-$150K salaries.',
    tags: ['blockchain', 'monero', 'forensics', 'research'],
    isPinned: false,
  },
  {
    id: 't3', title: '🏛️ Analysis: How Authorities Take Down Marketplaces', author: 'cybersec_prof', authorRole: 'VIP', date: '2024-03-10', replies: 203, views: 5621,
    content: 'Operation Bayonet (2017): Authorities seized a major marketplace, then ran another for 1 month to catch migrating users. 500+ arrests worldwide. Admin caught because he reused an email from his real identity. Another case: operator caught via forum posts, financial tracing, reused email on clearnet. Key lesson: Law enforcement is patient, international, and technically sophisticated.',
    educationalNote: 'Understanding takedowns helps you appreciate both the sophistication of law enforcement and the importance of cybersecurity careers.',
    tags: ['takedowns', 'fbi', 'operations', 'education'],
    isPinned: false,
  },
  {
    id: 't4', title: '⚠️ DDoS-for-Hire: All Fakes, All Monitored', author: 'netops_researcher', authorRole: 'Member', date: '2024-03-08', replies: 67, views: 1823,
    content: 'Every major "stresser" and "booter" service in the past 5 years has been either a scam, a law enforcement honeypot, or both. Authorities ran fake stresser services as stings. Users who paid got visited by agents within days. Even "trial" attacks are logged. If you want to learn about DDoS legally, study for OSCP and do bug bounties.',
    educationalNote: 'DDoS-for-hire is a federal crime. Companies like Cloudflare, Akamai, and AWS Shield actively defend against these attacks.',
    tags: ['ddos', 'scams', 'law enforcement'],
    isPinned: false,
  },
  {
    id: 't5', title: '🔍 OPSEC: Browser Fingerprinting Deep Dive', author: 'privacy_researcher', authorRole: 'Moderator', date: '2024-03-05', replies: 156, views: 4102,
    content: 'Even with encrypted browsers, your fingerprint (screen resolution, fonts, timezone, WebGL hash, Canvas API, audio context) can uniquely identify you across sessions. Secure browsers mitigate this by making all users look identical, but custom settings break this uniformity. Tools like Cover Your Tracks (EFF) can test your fingerprint. Key lesson: Privacy requires system-wide thinking, not just one tool.',
    educationalNote: 'Browser fingerprinting is a real, legitimate research area. Privacy organizations and academic institutions study this legally.',
    tags: ['opsec', 'fingerprinting', 'privacy', 'tutorial'],
    isPinned: true,
  },
  {
    id: 't6', title: '💼 Career Path: Script Kiddie → $150K Security Engineer', author: 'sec_career_advice', authorRole: 'VIP', date: '2024-03-01', replies: 312, views: 8934,
    content: 'Stop wasting time on illegal forums. Here\'s the legal path: CompTIA Security+ → CEH → OSCP → Bug Bounties (HackerOne, Bugcrowd) → Junior Pentester → Senior Security Engineer. Companies like Google, Microsoft, and CrowdStrike pay $120K-$200K for skilled pentesters. Bug bounties alone can earn $50K-$500K/year. All legal. All impressive on a resume.',
    educationalNote: 'Cybersecurity is one of the fastest-growing legal career fields. The global talent shortage is 3.5 million professionals.',
    tags: ['career', 'certifications', 'pentesting', 'guide'],
    isPinned: false,
  },
];

export const chatMessages: ChatMessage[] = [
  { user: 'ghost_rider', message: 'anyone checked the new secure browser release? critical security patch', time: '14:23', isBot: true, type: 'normal' },
  { user: 'null_ptr', message: 'stay safe everyone, heard LE is running a new operation on sector 7', time: '14:24', isBot: true, type: 'leo-warning' },
  { user: 'darknet_newbie', message: 'how do i verify a vendor is legit? any escrow services?', time: '14:25', isBot: true, type: 'normal' },
  { user: 'crypto_wolf', message: '⚠️ SCAM ALERT: dont use "fastcash2024" — multiple reports of wallet draining', time: '14:26', isBot: true, type: 'scam-alert' },
  { user: 'sec_expert', message: 'remember: this is all educational. real dark web activity carries 5-20 year sentences', time: '14:27', isBot: true, type: 'warning' },
  { user: 'ghost_rider', message: 'the secure project released a patch yesterday, update your browsers immediately', time: '14:28', isBot: true, type: 'normal' },
  { user: 'anon_dev', message: 'working on a privacy messenger — fully E2E encrypted, no metadata logging', time: '14:29', isBot: true, type: 'normal' },
  { user: 'system', message: '💡 TIP: Legal security careers pay $80K-$200K. Bug bounties alone can earn $50K+/year.', time: '14:30', isBot: true, type: 'info' },
  { user: 'chain_analyst', message: 'Analysis report published — they traced 78% of privacy coin transactions through network analysis', time: '14:31', isBot: true, type: 'normal' },
  { user: 'pentester_pro', message: 'PSA: Most "zero-day exploits" on here are scams. Real ones go to Zerodium for $500K-$2.5M', time: '14:32', isBot: true, type: 'scam-alert' },
  { user: 'ghost_rider', message: 'anyone tried the new Whirlpool implementation? supposedly better mixing', time: '14:33', isBot: true, type: 'normal' },
  { user: 'system', message: '📚 Did you know? Authorities ran a marketplace for 1 month as a sting operation. 500+ arrests worldwide.', time: '14:34', isBot: true, type: 'leo-warning' },
  { user: 'opsec_guru', message: 'PSA: never reuse usernames across platforms. Even encrypted browsers can\'t save you from poor opsec.', time: '14:35', isBot: true, type: 'warning' },
  { user: 'malware_dev', message: 'new ransomware variant detected in the wild — targets VMware ESXi hypervisors', time: '14:36', isBot: true, type: 'normal' },
  { user: 'system', message: '🔒 Reminder: All activity in this chat is simulated. No real data is being transmitted.', time: '14:37', isBot: true, type: 'system' },
];

export const educationalModules: EducationalModule[] = [
  {
    id: 'how-tor', title: 'How Encrypted Browsers Work', icon: '🔄',
    content: [
      { heading: 'Circuit Building', text: 'Encrypted browsers route your traffic through 3 random relays (Guard → Middle → Exit). Each relay only knows the previous and next hop, never the full path.' },
      { heading: 'Encryption Layers', text: 'Like an onion, traffic is wrapped in multiple encryption layers. Each relay peels one layer, revealing only where to forward the data next.' },
      { heading: 'Why 3 Relays?', text: 'Guard: Prevents traffic correlation at entry. Middle: Adds distance. Exit: Prevents destination from seeing your real IP.' },
      { heading: 'What Can Go Wrong', text: 'Malicious exit nodes can see unencrypted traffic. Timing attacks can correlate entry/exit traffic. ISP can see you\'re using an encrypted browser (but not what you\'re doing).' },
    ],
  },
  {
    id: 'takedowns', title: 'Real-World Takedowns', icon: '🚔',
    content: [
      { heading: 'Silk Road (2013)', text: 'Marketplace operator caught because: reused email on clearnet, forum posts linked to his identity, financial tracing. Sentence: Life without parole (later commuted).' },
      { heading: 'AlphaBay / Hansa (2017)', text: 'Operation Bayonet: Authorities seized a major marketplace, then ran another for 1 month to catch migrating users. 500+ arrests worldwide. Admin caught via email metadata.' },
      { heading: 'Welcome to Video (2019)', text: '387 arrests across 23 countries. Site operator traced through Bitcoin payment analysis. Largest child exploitation takedown ever.' },
      { heading: 'Key Lesson', text: 'Law enforcement has sophisticated tools: blockchain analysis, traffic correlation, undercover operations, international cooperation, and infinite patience.' },
    ],
  },
  {
    id: 'forensics', title: 'Digital Forensics', icon: '🔍',
    content: [
      { heading: 'Blockchain Analysis', text: 'Companies trace Bitcoin transactions. Every transaction is public on the blockchain. Mixing services often fail to break the chain.' },
      { heading: 'Metadata Extraction', text: 'Photos contain EXIF data (GPS, camera model, timestamps). Documents have author names, edit history, and software versions.' },
      { heading: 'Browser Fingerprinting', text: 'Screen resolution, fonts, plugins, timezone, language — all combine to uniquely identify you even without cookies.' },
      { heading: 'Correlation Attacks', text: 'Login times, writing style, and behavioral patterns can link anonymous accounts to real identities.' },
    ],
  },
  {
    id: 'legal', title: 'Legal Framework', icon: '⚖️',
    content: [
      { heading: 'US Federal Law', text: 'CFAA (Computer Fraud and Abuse Act): Unauthorized access = up to 10 years per offense. Wire fraud, conspiracy, money laundering: additional charges. RICO statutes apply to organized cybercrime.' },
      { heading: 'EU & International', text: 'NIS2 Directive, GDPR violations, Budapest Convention on Cybercrime. International agencies coordinate cross-border operations. 60+ countries have MLATs (Mutual Legal Assistance Treaties).' },
      { heading: 'Egyptian Law', text: 'Cybercrime Law 175/2018: Criminalizes unauthorized access, data interception, and privacy violations. Penalties: 1-7 years imprisonment. Egypt actively cooperates with international LEA.' },
      { heading: 'Key Takeaway', text: 'Cybercrime is investigated at local, national, and international levels. No jurisdiction is truly "safe." Law enforcement cooperation is faster than ever.' },
    ],
  },
  {
    id: 'careers', title: 'Legal Career Paths', icon: '🚀',
    content: [
      { heading: 'Penetration Tester', text: 'Legally hack companies to find vulnerabilities. Salary: $85K-$140K. Certifications: OSCP, CEH, GPEN. Tools: Burp Suite, Metasploit, Nmap.' },
      { heading: 'Security Analyst (SOC)', text: 'Monitor and respond to security incidents. Salary: $75K-$120K. Certifications: CompTIA Security+, CySA+, GCIH. 24/7 shift work.' },
      { heading: 'Digital Forensics Investigator', text: 'Investigate cybercrimes for law enforcement or consulting. Salary: $70K-$110K. Certifications: GCFE, EnCE, CCE.' },
      { heading: 'Bug Bounty Hunter', text: 'Find vulnerabilities in legal programs. Income: $50K-$500K+/year. Platforms: HackerOne, Bugcrowd, Intigriti. Legal and rewarding.' },
      { heading: 'Threat Intelligence Analyst', text: 'Research threat actors and campaigns. Salary: $80K-$130K. Skills: OSINT, MITRE ATT&CK, malware analysis. Work with teams tracking APT groups.' },
    ],
  },
];

export const securityTips = [
  'Use unique passwords for every account (password manager recommended)',
  'Enable 2FA on all important accounts (hardware keys > TOTP > SMS)',
  'Keep all software updated — patches fix critical vulnerabilities',
  'Use Signal for encrypted messaging — E2E encryption by default',
  'Verify URLs before entering credentials — phishing is the #1 attack vector',
  'Use a password manager — never reuse passwords',
  'Regular backups protect against ransomware — follow 3-2-1 rule',
  'Use DNS-over-HTTPS (DoH) to prevent DNS surveillance',
  'Encrypt your devices — full disk encryption (BitLocker, LUKS)',
  'Monitor your accounts with breach notification services (HaveIBeenPwned)',
];

// FAQ data for the AI chat bot about dark web topics
export const darkWebFAQ: Record<string, string> = {
  'tor': 'Encrypted browsers route your traffic through 3 encrypted relays. They are legitimate privacy tools used by journalists, activists, and law enforcement. The dark web is just a small part of what they host.',
  'dark web': 'The Dark Web is a part of the internet accessible only through encrypted browsers. It hosts both illegal content and legitimate privacy tools. About 5% is illegal; the rest is forums, privacy services, and education.',
  'silk road': 'Silk Road was the first major dark web marketplace (2011-2013). The operator was caught because he reused an email, posted on forums, and his Bitcoin was traced. He received life without parole.',
  'bitcoin': 'Bitcoin is pseudonymous, not anonymous. Every transaction is public on the blockchain. Analysis companies trace Bitcoin flows. Most dark web payments are eventually traceable.',
  'marketplace': 'Dark web marketplaces sell illegal goods. 90% are scams. Law enforcement runs undercover operations and honeypots. Even "trusted" vendors can be undercover agents.',
  'phishing': 'Phishing is the #1 attack vector. On the dark web, fake login pages steal credentials. Always verify URLs. Use password managers to detect fake sites.',
  'malware': 'Malware for sale on the dark web often contains backdoors that infect the buyer. Ransomware-as-a-Service lets unskilled criminals launch attacks. Most malware sellers are scammers.',
  'encryption': 'Strong encryption (AES-256, RSA) is used by banks, governments, and privacy tools. End-to-end encryption means only you and the recipient can read messages. It\'s legal and essential for privacy.',
  'forensics': 'Digital forensics investigates cybercrimes. Techniques include blockchain analysis, metadata extraction, browser fingerprinting, and correlation attacks. It\'s a legal, well-paying career.',
  'career': 'Cybersecurity careers are legal, in-demand, and pay $75K-$200K+/year. Paths: Penetration Tester, SOC Analyst, Digital Forensics, Bug Bounty Hunter, Threat Intelligence Analyst.',
  'oscp': 'OSCP (Offensive Security Certified Professional) is a hands-on penetration testing certification. It\'s highly respected and required for many pentesting jobs. Cost: ~$1,500.',
  'bug bounty': 'Bug bounty programs let you legally hack companies for rewards. Platforms: HackerOne, Bugcrowd. Top hunters earn $500K+/year. Google pays up to $250K per critical bug.',
  'ransomware': 'Ransomware encrypts your files and demands payment. 95% of ransomware uses Bitcoin. Most targets are hospitals, schools, and small businesses. Prevention: backups, updates, training.',
  'vpn': 'VPNs encrypt your traffic and hide your IP from your ISP. But VPN providers can see your traffic. For maximum privacy, use encrypted browsers. For general privacy, a no-log VPN is good.',
  'signal': 'Signal is the gold standard for encrypted messaging. It\'s free, open source, and used by journalists and activists worldwide. It has E2E encryption by default for all messages and calls.',
  'protonmail': 'ProtonMail is a Swiss encrypted email service. It has E2E encryption, zero-access encryption, and is based in Switzerland with strong privacy laws. Free tier available.',
  'hacking': 'Hacking has legal and illegal forms. Legal: penetration testing, bug bounties, security research. Illegal: unauthorized access, data theft, ransomware. The difference is permission.',
  'password': 'Use unique passwords for every account. A password manager (Bitwarden, 1Password) generates and stores them. Enable 2FA everywhere. Never reuse passwords — one breach exposes all accounts.',
  '2fa': 'Two-Factor Authentication adds a second verification step. Best: hardware keys (YubiKey). Good: authenticator apps (Google Authenticator, Authy). Avoid: SMS-based 2FA (SIM swapping risk).',
  'data breach': 'A data breach exposes personal information. Check HaveIBeenPwned.com to see if your email was compromised. If yes: change passwords immediately, enable 2FA, monitor accounts.',
};
