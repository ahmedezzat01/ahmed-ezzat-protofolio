export interface CareerPath {
  id: string;
  name: string;
  color: string;
  icon: string;
  milestones: { title: string; certs: string[]; skills: string[]; timeline: string }[];
}

export const careerPaths: CareerPath[] = [
  {
    id: 'blue',
    name: 'Blue Team',
    color: '#00d4ff',
    icon: '🛡️',
    milestones: [
      { title: 'SOC Analyst L1', certs: ['CompTIA Security+', 'CySA+'], skills: ['SIEM', 'Log Analysis', 'Incident Response'], timeline: '0-6 months' },
      { title: 'SOC Analyst L2', certs: ['GCIA', 'GCIH'], skills: ['Threat Hunting', 'Malware Analysis', 'Forensics'], timeline: '6-18 months' },
      { title: 'SOC Analyst L3', certs: ['GCFA', 'GCFE'], skills: ['Advanced Forensics', 'Threat Intelligence', 'Automation'], timeline: '18-36 months' },
      { title: 'Security Architect', certs: ['CISSP', 'SABSA'], skills: ['Enterprise Architecture', 'Risk Management', 'Zero Trust'], timeline: '3-5 years' },
    ],
  },
  {
    id: 'red',
    name: 'Red Team',
    color: '#ff0040',
    icon: '⚔️',
    milestones: [
      { title: 'Junior Pentester', certs: ['eJPT', 'CompTIA Pentest+'], skills: ['Nmap', 'Burp Suite', 'Metasploit'], timeline: '0-6 months' },
      { title: 'Pentester', certs: ['PNPT', 'CEH'], skills: ['Web App Pentest', 'Network Pentest', 'Social Engineering'], timeline: '6-18 months' },
      { title: 'Senior Pentester', certs: ['OSCP', 'OSEP'], skills: ['Custom Exploits', 'Privilege Escalation', 'Active Directory'], timeline: '18-36 months' },
      { title: 'Red Team Lead', certs: ['CRTO', 'CRTP'], skills: ['C2 Frameworks', 'OPSEC', 'Red Team Operations'], timeline: '3-5 years' },
    ],
  },
  {
    id: 'purple',
    name: 'Purple Team',
    color: '#b829dd',
    icon: '🔮',
    milestones: [
      { title: 'Security Analyst', certs: ['Security+', 'BTL1'], skills: ['Detection Engineering', 'Log Analysis'], timeline: '0-6 months' },
      { title: 'Detection Engineer', certs: ['SC-200', 'CySA+'], skills: ['Sigma Rules', 'YARA', 'MITRE ATT&CK'], timeline: '6-18 months' },
      { title: 'Purple Team Specialist', certs: ['CRTO', 'PCNSA'], skills: ['Attack Simulation', 'Detection Validation'], timeline: '18-36 months' },
      { title: 'Purple Team Lead', certs: ['CISSP', 'GCIH'], skills: ['Team Management', 'Program Development'], timeline: '3-5 years' },
    ],
  },
  {
    id: 'grc',
    name: 'GRC',
    color: '#ffd700',
    icon: '📋',
    milestones: [
      { title: 'Compliance Analyst', certs: ['Security+', 'ISO 27001 LA'], skills: ['Policy Writing', 'Risk Assessment'], timeline: '0-6 months' },
      { title: 'GRC Analyst', certs: ['CISA', 'CRISC'], skills: ['Audit', 'Framework Mapping', 'Vendor Risk'], timeline: '6-18 months' },
      { title: 'GRC Manager', certs: ['CISM', 'CISSP'], skills: ['Program Management', 'Board Reporting'], timeline: '18-36 months' },
      { title: 'CISO', certs: ['CISSP', 'CISA'], skills: ['Strategy', 'Budget', 'Board Communication'], timeline: '5+ years' },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud Security',
    color: '#00ff41',
    icon: '☁️',
    milestones: [
      { title: 'Cloud Junior', certs: ['AWS CCP', 'Azure Fundamentals'], skills: ['IAM', 'S3 Security', 'VPC Basics'], timeline: '0-6 months' },
      { title: 'Cloud Security Engineer', certs: ['AWS SAA', 'AZ-500'], skills: ['Cloud Posture', 'Container Security', 'Serverless'], timeline: '6-18 months' },
      { title: 'Senior Cloud Security', certs: ['AWS Security Specialty', 'CKS'], skills: ['Cloud Architecture', 'Kubernetes Security'], timeline: '18-36 months' },
      { title: 'Cloud Security Architect', certs: ['CCSP', 'CISSP'], skills: ['Multi-Cloud', 'Zero Trust Cloud'], timeline: '3-5 years' },
    ],
  },
  {
    id: 'devsecops',
    name: 'DevSecOps',
    color: '#ff6b35',
    icon: '🔧',
    milestones: [
      { title: 'Junior DevSecOps', certs: ['Security+', 'Docker Certified'], skills: ['CI/CD Security', 'SAST/DAST', 'Container Security'], timeline: '0-6 months' },
      { title: 'DevSecOps Engineer', certs: ['CKS', 'AWS Security'], skills: ['IaC Security', 'SBOM', 'Secret Management'], timeline: '6-18 months' },
      { title: 'Senior DevSecOps', certs: ['GKCS', 'PCNSE'], skills: ['Pipeline Architecture', 'Compliance as Code'], timeline: '18-36 months' },
      { title: 'DevSecOps Lead', certs: ['CISSP', 'CKA'], skills: ['Platform Engineering', 'Security Champions'], timeline: '3-5 years' },
    ],
  },
];

export interface Threat {
  id: string;
  name: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  impact: string;
  defense: string;
  cves?: string[];
}

export const currentThreats: Threat[] = [
  { id: 'supply-chain', name: 'Supply Chain Attacks', severity: 'critical', description: 'Compromising software dependencies and build systems to distribute malware through trusted updates.', impact: 'Widespread compromise of all downstream users; difficult to detect; high trust exploitation.', defense: 'SBOM verification, SLSA framework, dependency pinning, reproducible builds, code signing.', cves: ['CVE-2024-3094'] },
  { id: 'ai-phishing', name: 'AI-Powered Phishing', severity: 'high', description: 'LLMs generating highly convincing, personalized phishing emails that bypass traditional filters.', impact: 'Increased click rates; bypasses email security gateways; deepfake voice/video variants emerging.', defense: 'User training, DMARC/DKIM/SPF enforcement, AI-based email filtering, zero-trust verification.', },
  { id: 'zero-days', name: 'Zero-Day Exploits', severity: 'critical', description: 'Unknown vulnerabilities exploited before patches are available; sold on underground markets.', impact: 'Complete system compromise; no known signatures; high-value targets only.', defense: 'Behavioral analysis, EDR with memory scanning, micro-segmentation, exploit mitigation (ASLR, DEP).', },
  { id: 'raas', name: 'Ransomware-as-a-Service', severity: 'critical', description: 'Ransomware kits sold to affiliates; double/triple extortion models; targeting critical infrastructure.', impact: 'Operational shutdown; data exfiltration; regulatory fines; reputational damage.', defense: 'Immutable backups, network segmentation, EDR, incident response plan, cyber insurance.', },
  { id: 'llm-jailbreak', name: 'LLM Jailbreaks & Prompt Injection', severity: 'high', description: 'Manipulating AI models to bypass safety guardrails; extracting training data; generating malicious content.', impact: 'Data leakage; model manipulation; safety bypass; intellectual property theft.', defense: 'Input validation, output filtering, content moderation, red teaming, model hardening.', },
  { id: 'quishing', name: 'Quishing (QR Phishing)', severity: 'high', description: 'Malicious QR codes in emails, posters, and documents bypassing email security and endpoint protections.', impact: 'Credential theft; malware delivery; bypasses URL scanning; physical + digital attack vector.', defense: 'QR code scanning policies, employee awareness, mobile device management (MDM).', },
];

export interface ToolInfo {
  name: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  description: string;
  useCase: string;
  command?: string;
  link: string;
}

export const securityTools: ToolInfo[] = [
  { name: 'Nmap', category: 'Network', level: 'Beginner', description: 'Network scanner and port discovery tool', useCase: 'Port scanning, service detection, OS fingerprinting', command: 'nmap -sV -sC target.com', link: 'https://nmap.org' },
  { name: 'Wireshark', category: 'Network', level: 'Beginner', description: 'Network protocol analyzer', useCase: 'Packet capture, protocol analysis, traffic inspection', command: 'wireshark -i eth0', link: 'https://wireshark.org' },
  { name: 'Burp Suite', category: 'Web', level: 'Beginner', description: 'Web application security testing platform', useCase: 'Web app scanning, proxy interception, fuzzing', link: 'https://portswigger.net/burp' },
  { name: 'Metasploit', category: 'Exploitation', level: 'Beginner', description: 'Penetration testing framework', useCase: 'Exploit development, payload delivery, post-exploitation', command: 'msfconsole', link: 'https://www.metasploit.com' },
  { name: 'John the Ripper', category: 'Password', level: 'Beginner', description: 'Password cracking tool', useCase: 'Hash cracking, password auditing, format detection', command: 'john --wordlist=rockyou.txt hash.txt', link: 'https://www.openwall.com/john' },
  { name: 'BloodHound', category: 'AD', level: 'Intermediate', description: 'Active Directory attack path mapper', useCase: 'AD enumeration, privilege escalation paths, Kerberoasting', link: 'https://bloodhound.io' },
  { name: 'Mimikatz', category: 'Credential', level: 'Intermediate', description: 'Windows credential extraction', useCase: 'Credential dumping, Kerberos attacks, SID history manipulation', link: 'https://github.com/gentilkiwi/mimikatz' },
  { name: 'Sliver', category: 'C2', level: 'Advanced', description: 'Open-source cross-platform C2 framework', useCase: 'Red team operations, covert communication, payload generation', link: 'https://github.com/BishopFox/sliver' },
  { name: 'Havoc', category: 'C2', level: 'Advanced', description: 'Modern, malleable post-exploitation C2', useCase: 'Red team ops, custom implant development, evasion', link: 'https://github.com/HavocFramework/Havoc' },
  { name: 'RTL-SDR', category: 'Hardware', level: 'Expert', description: 'Software-defined radio receiver', useCase: 'RF analysis, signal interception, SDR security research', link: 'https://www.rtl-sdr.com' },
  { name: 'HackRF One', category: 'Hardware', level: 'Expert', description: 'Half-duplex SDR transceiver', useCase: 'RF transmission/reception, wireless protocol analysis, replay attacks', link: 'https://greatscottgadgets.com/hackrf' },
  { name: 'Proxmark3', category: 'Hardware', level: 'Expert', description: 'RFID research tool', useCase: 'RFID/NFC cloning, card emulation, protocol analysis', link: 'https://proxmark.com' },
];

export interface RedFlag {
  id: string;
  title: string;
  category: string;
  description: string;
  analysis: string;
  severity: 'warning' | 'danger' | 'critical' | 'high';
}

export const redFlags: RedFlag[] = [
  { id: 'rf1', title: 'Urgency & Fear Tactics', category: 'Phishing', description: '"Your account will be locked in 24 hours! Click now!"', analysis: 'Creates artificial urgency to bypass rational thinking. Legitimate organizations rarely use such aggressive language.', severity: 'critical' },
  { id: 'rf2', title: 'Suspicious Sender Address', category: 'Phishing', description: 'Email from "support@amaz0n-security.com"', analysis: 'Lookalike domains with character substitution (0 for o). Always verify the actual sending domain.', severity: 'danger' },
  { id: 'rf3', title: 'Unexpected Attachments', category: 'Phishing', description: 'ZIP file attached claiming to be an "invoice"', analysis: 'Never open unexpected attachments. ZIP files can contain macros, scripts, or exploits.', severity: 'critical' },
  { id: 'rf4', title: 'Unusual Outbound Traffic', category: 'Network', description: 'Large data transfers to unknown IPs during off-hours', analysis: 'Could indicate data exfiltration, C2 communication, or cryptocurrency mining.', severity: 'critical' },
  { id: 'rf5', title: 'Multiple Failed Logins', category: 'Network', description: '100+ failed login attempts from same IP range', analysis: 'Brute force or credential stuffing attack in progress. Check for successful logins between failures.', severity: 'high' },
  { id: 'rf6', title: 'Unusual Privilege Escalation', category: 'Social Engineering', description: 'User suddenly requesting admin access for "urgent project"', analysis: 'Social engineering tactic. Verify through separate channel before granting elevated permissions.', severity: 'high' },
  { id: 'rf7', title: 'Suspicious USB Drops', category: 'Physical', description: 'USB drives left in parking lot or lobby', analysis: 'Known social engineering attack. USB may contain auto-executing payloads or keyloggers.', severity: 'critical' },
  { id: 'rf8', title: 'Authority Impersonation', category: 'Social Engineering', description: '"This is the CEO, wire $50K to this account immediately"', analysis: 'Business Email Compromise (BEC). Always verify financial requests through established channels.', severity: 'critical' },
];

export interface CaseStudy {
  id: string;
  name: string;
  year: number;
  type: 'breach' | 'ransomware' | 'supply-chain';
  summary: string;
  timeline: string[];
  lessons: string[];
  severity: 'critical' | 'high';
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'equifax',
    name: 'Equifax Data Breach',
    year: 2017,
    type: 'breach',
    summary: 'Massive data breach exposing 147 million records due to unpatched Apache Struts vulnerability.',
    timeline: ['March 2017: CVE-2017-5638 published', 'May 2017: Initial compromise', 'July 2017: Breach discovered', 'September 2017: Public disclosure'],
    lessons: ['Patch management is critical', 'Network segmentation limits blast radius', 'Certificate management matters', 'Incident response speed is key'],
    severity: 'critical',
  },
  {
    id: 'solarwinds',
    name: 'SolarWinds Supply Chain',
    year: 2020,
    type: 'supply-chain',
    summary: 'Russian APT compromised SolarWinds Orion build system, affecting 18,000+ organizations including US government.',
    timeline: ['February 2019: Initial access to build system', 'February 2020: SUNBURST injected into builds', 'December 2020: FireEye discovers breach', 'December 2020: Public disclosure'],
    lessons: ['Supply chain security is paramount', 'Zero trust architecture limits lateral movement', 'Monitor for anomalous behavior, not just signatures', 'SBOM and build provenance verification'],
    severity: 'critical',
  },
  {
    id: 'colonial',
    name: 'Colonial Pipeline Ransomware',
    year: 2021,
    type: 'ransomware',
    summary: 'DarkSide ransomware shut down largest US fuel pipeline; $4.4M ransom paid; fuel shortages across East Coast.',
    timeline: ['April 29, 2021: Initial access via VPN', 'May 7, 2021: Ransomware deployed', 'May 7, 2021: Pipeline shut down', 'May 12, 2021: Pipeline restarted'],
    lessons: ['IT/OT network separation is critical', 'Backup and recovery plans must be tested', 'Ransom payment doesn\'t guarantee data recovery', 'Critical infrastructure needs resilience'],
    severity: 'critical',
  },
  {
    id: 'moveit',
    name: 'MOVEit Transfer Zero-Day',
    year: 2023,
    type: 'breach',
    summary: 'Cl0p ransomware group exploited SQL injection in MOVEit Transfer, affecting 2,500+ organizations worldwide.',
    timeline: ['May 27, 2023: Zero-day exploit deployed', 'May 31, 2023: Progress Software discovers', 'June 1, 2023: Patch released', 'June-July 2023: Mass exploitation campaign'],
    lessons: ['File transfer solutions are high-value targets', 'Web application security testing is essential', 'Third-party risk management needs improvement', 'Zero-day response requires rapid patching'],
    severity: 'critical',
  },
  {
    id: 'mgm',
    name: 'MGM Resorts Attack',
    year: 2023,
    type: 'breach',
    summary: 'Scattered Spider social engineering + ALPHV ransomware; $100M+ impact; hotel operations disrupted for days.',
    timeline: ['September 2023: Social engineering via help desk', 'September 2023: Lateral movement to critical systems', 'September 2023: Ransomware deployed', 'Operations disrupted for 10+ days'],
    lessons: ['Social engineering bypasses technical controls', 'Help desk verification procedures are critical', 'Incident response plans must be tested', 'Business continuity planning is essential'],
    severity: 'critical',
  },
];

export interface KnowledgeSection {
  id: string;
  title: string;
  icon: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  content: { title: string; description: string }[];
}

export const advancedKnowledge: KnowledgeSection[] = [
  {
    id: 'hardware-attacks',
    title: 'Hardware Attacks',
    icon: '🔧',
    level: 'Expert',
    content: [
      { title: 'Rowhammer', description: 'Flipping bits by repeatedly accessing adjacent rows in DRAM; exploit DRAM physical weaknesses for privilege escalation.' },
      { title: 'Spectre/Meltdown', description: 'Speculative execution side-channel attacks; reading privileged memory through CPU optimization artifacts.' },
      { title: 'Cold Boot Attacks', description: 'Extracting encryption keys from RAM after power-off by cooling memory modules.' },
      { title: 'Bus Pirate / JTAG', description: 'Hardware debugging interfaces used for firmware extraction and reverse engineering.' },
    ],
  },
  {
    id: 'covert-channels',
    title: 'Covert Channels',
    icon: '📡',
    level: 'Expert',
    content: [
      { title: 'DNS Tunneling', description: 'Encoding data within DNS queries/responses to bypass firewalls; tools: iodine, dnscat2.' },
      { title: 'ICMP Tunneling', description: 'Hiding data in ICMP echo request/reply payloads; icmpsh, ptunnel.' },
      { title: 'Domain Fronting', description: 'Routing traffic through legitimate CDN domains (Google, Azure) to disguise C2 traffic.' },
      { title: 'Steganography', description: 'Hiding data in images, audio, video, or network protocol fields.' },
    ],
  },
  {
    id: 'advanced-persistence',
    title: 'Advanced Persistence',
    icon: '💾',
    level: 'Expert',
    content: [
      { title: 'UEFI/BIOS Rootkits', description: 'Persistent malware in firmware; survives OS reinstall; very difficult to detect and remove.' },
      { title: 'TPM Bypass', description: 'Techniques to circumvent Trusted Platform Module protections for persistent access.' },
      { title: 'Firmware Implants', description: 'Modifying device firmware (NIC, HDD, SSD) for persistent backdoor access.' },
      { title: 'Signed Driver Abuse', description: 'Using stolen/leaked certificates to sign malicious kernel drivers.' },
    ],
  },
  {
    id: 'cloud-attacks',
    title: 'Cloud Side-Channel',
    icon: '☁️',
    level: 'Advanced',
    content: [
      { title: 'VM Escape', description: 'Breaking out of virtual machines to access the hypervisor or other VMs.' },
      { title: 'Noisy Neighbors', description: 'Resource contention attacks in multi-tenant environments.' },
      { title: 'Metadata Service Abuse', description: 'Exploiting cloud metadata APIs (IMDS) for credential theft and SSRF.' },
    ],
  },
  {
    id: 'memory-forensics',
    title: 'Memory Forensics',
    icon: '🧠',
    level: 'Advanced',
    content: [
      { title: 'Process Hollowing Detection', description: 'Identifying processes with injected code by comparing memory vs disk images.' },
      { title: 'Hidden Process Detection', description: 'Finding processes unlinked from the process list using direct kernel object manipulation.' },
      { title: 'Network Connection Recovery', description: 'Extracting active connections from memory even after application closure.' },
    ],
  },
  {
    id: 'kernel-rootkits',
    title: 'Kernel Rootkits',
    icon: '⚙️',
    level: 'Expert',
    content: [
      { title: 'DKOM', description: 'Direct Kernel Object Manipulation; hiding processes/files from the kernel.' },
      { title: 'IDT Hooking', description: 'Modifying the Interrupt Descriptor Table to intercept system calls.' },
      { title: 'Syscall Table Hooking', description: 'Redirecting system calls to custom handlers for stealth.' },
    ],
  },
  {
    id: 'supply-chain-poisoning',
    title: 'Supply Chain Poisoning',
    icon: '🔗',
    level: 'Expert',
    content: [
      { title: 'Compiler Backdoors', description: 'Thompson attack: compromising compilers to inject backdoors into compiled software.' },
      { title: 'Dependency Confusion', description: 'Publishing malicious packages with names matching internal packages to npm/PyPI.' },
      { title: 'Typosquatting', description: 'Registering misspelled package names to trick developers into installing malware.' },
    ],
  },
  {
    id: 'ad-attacks',
    title: 'AD Attack Paths',
    icon: '🏢',
    level: 'Advanced',
    content: [
      { title: 'Kerberoasting', description: 'Requesting service tickets and cracking them offline for service account passwords.' },
      { title: 'Golden Ticket', description: 'Forging Kerberos TGTs using thekrbtgt hash for unlimited domain access.' },
      { title: 'DCSync', description: 'Replicating domain controller credentials using DRS protocol without being a DC.' },
      { title: 'Shadow Credentials', description: 'Abusing msDS-KeyCredentialLink for stealthy authentication.' },
    ],
  },
  {
    id: 'lolbas',
    title: 'Advanced LOLBAS',
    icon: '🔄',
    level: 'Advanced',
    content: [
      { title: 'Living Off The Land', description: 'Using built-in Windows tools (mshta, regsvr32, wmic) for evasion and execution.' },
      { title: 'AppLocker Bypass', description: 'Circumventing application whitelisting through DLL side-loading and UNC paths.' },
      { title: 'AMSI Bypass', description: 'Disabling Antimalware Scan Interface to run malicious scripts undetected.' },
    ],
  },
];

export interface WifiAttack {
  id: string;
  name: string;
  description: string;
  severity: 'critical' | 'high' | 'medium';
  mitigation: string;
}

export const wifiAttacks: WifiAttack[] = [
  { id: 'evil-twin', name: 'Evil Twin', description: 'Setting up a rogue access point mimicking a legitimate network to intercept traffic.', severity: 'critical', mitigation: 'Use WPA3-Enterprise, certificate pinning, monitor for rogue APs.' },
  { id: 'pmkid', name: 'PMKID Attack', description: 'Capturing PMKID from WPA2 handshake without client interaction for offline cracking.', severity: 'high', mitigation: 'Use strong passphrases (20+ chars), WPA3-SAE, disable WPS.' },
  { id: 'krack', name: 'KRACK Attack', description: 'Key Reinstallation Attack exploiting WPA2 4-way handshake weakness.', severity: 'critical', mitigation: 'Update devices, use WPA3, enable 802.11w (PMF).' },
  { id: 'dragonblood', name: 'Dragonblood', description: 'Design flaws in WPA3-SAE allowing downgrade attacks and side-channel leaks.', severity: 'high', mitigation: 'Update firmware, monitor for downgrade attempts, use transitional mode carefully.' },
  { id: 'karma', name: 'Karma Attack', description: 'Responding to client probe requests with fake SSIDs to capture connections.', severity: 'high', mitigation: 'Disable auto-connect, forget unused networks, use randomized MAC addresses.' },
];

export interface HackingConcept {
  id: string;
  name: string;
  category: string;
  description: string;
  tools?: string[];
  disclaimer: string;
}

export const hackingConcepts: HackingConcept[] = [
  { id: 'se', name: 'Social Engineering', category: 'Human', description: 'Manipulating people into performing actions or divulging confidential information.', tools: ['SET', 'Gophish', 'Evilginx'], disclaimer: 'Always obtain written authorization before testing human targets.' },
  { id: 'lockpicking', name: 'Lock Picking', category: 'Physical', description: 'Opening mechanical locks without keys using specialized tools and techniques.', tools: ['Pick sets', 'Bump keys', 'Decoder tools'], disclaimer: 'Practice only on locks you own. Unauthorized entry is illegal.' },
  { id: 'rfid', name: 'RFID/NFC Cloning', category: 'Physical', description: 'Reading and cloning proximity cards, key fobs, and NFC-enabled devices.', tools: ['Proxmark3', 'Flipper Zero', 'ACR122U'], disclaimer: 'Only clone cards you own or have explicit authorization to test.' },
  { id: 'car', name: 'Car Hacking', category: 'Automotive', description: 'Exploiting CAN bus, OBD-II, and infotainment systems in vehicles.', tools: ['CANtact', 'SavvyCAN', 'OBD-II adapters'], disclaimer: 'Never test on vehicles you don\'t own or while driving.' },
  { id: 'drone', name: 'Drone Interception', category: 'Aerial', description: 'Spoofing GPS, jamming control links, or hijacking drone communications.', tools: ['DroneID', 'Wireshark', 'Custom scripts'], disclaimer: 'Drone jamming is illegal in most jurisdictions. Research only.' },
  { id: 'usb', name: 'USB Attacks', category: 'Hardware', description: 'HID injection, BadUSB, O.MG Cable attacks for payload delivery.', tools: ['Rubber Ducky', 'BadUSB', 'O.MG Cable', 'WiFi Duck'], disclaimer: 'Only use on authorized test targets. Unauthorized access is illegal.' },
  { id: 'web', name: 'Web Exploitation', category: 'Application', description: 'SQL injection, XSS, SSRF, and other web application vulnerabilities.', tools: ['Burp Suite', 'SQLMap', 'OWASP ZAP'], disclaimer: 'Only test web applications you own or have written authorization to test.' },
];

export interface ToolTip {
  id: string;
  title: string;
  category: string;
  tip: string;
}

export const tipsAdvice: ToolTip[] = [
  { id: 't1', title: 'Start with Fundamentals', category: 'Beginner', tip: 'Master networking (TCP/IP, DNS, HTTP) before diving into security tools. Understanding protocols is more valuable than memorizing tool syntax.' },
  { id: 't2', title: 'Build a Home Lab', category: 'Beginner', tip: 'Set up vulnerable VMs (DVWA, Metasploitable) or use HackTheBox/TryHackMe. Hands-on practice beats theory.' },
  { id: 't3', title: 'Document Everything', category: 'Beginner', tip: 'Keep a security notebook. Write down commands, techniques, and findings. Your notes become your personal knowledge base.' },
  { id: 't4', title: 'Bug Bounty Strategy', category: 'Intermediate', tip: 'Focus on one program at a time. Read scope carefully. Look for logic flaws, not just scanner findings. Quality over quantity.' },
  { id: 't5', title: 'CTF Approach', category: 'Intermediate', tip: 'Start with Easy/Medium on HTB. Read writeups AFTER attempting. Focus on methodology, not just flags.' },
  { id: 't6', title: 'Specialize, Then Generalize', category: 'Intermediate', tip: 'Pick one area (web, mobile, cloud, forensics) and go deep. Generalists earn less than specialists.' },
  { id: 't7', title: 'Zero-Day Research', category: 'Advanced', tip: 'Audit open-source projects with few contributors. Focus on edge cases and error handling. Most bugs are logic flaws.' },
  { id: 't8', title: 'Exploit Development', category: 'Advanced', tip: 'Start with buffer overflows on Linux x86. Master gdb, pwntools. Graduate to ROP chains and kernel exploitation.' },
  { id: 't9', title: 'Day in the Life', category: 'Expert', tip: 'Security work is 30% technical, 70% communication. You\'ll spend more time writing reports and explaining risks to management than hacking.' },
];

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export const assessmentQuestions: AssessmentQuestion[] = [
  { id: 'aq1', question: 'What is the first step in a penetration test?', options: ['Exploitation', 'Reconnaissance', 'Privilege Escalation', 'Reporting'], correctAnswer: 1, explanation: 'Reconnaissance (information gathering) is always the first phase. You need to understand the target before testing.', category: 'Methodology' },
  { id: 'aq2', question: 'What does SQL injection exploit?', options: ['Network protocols', 'Database queries', 'Operating systems', 'Hardware'], correctAnswer: 1, explanation: 'SQL injection inserts malicious SQL code into application queries to manipulate databases.', category: 'Web Security' },
  { id: 'aq3', question: 'Which protocol is commonly used for encrypted email?', options: ['FTP', 'SMTP', 'PGP/GPG', 'HTTP'], correctAnswer: 2, explanation: 'PGP/GPG provides end-to-end encryption for email. SMTP is for sending, not encryption.', category: 'Cryptography' },
  { id: 'aq4', question: 'What is a zero-day vulnerability?', options: ['A bug found today', 'A patched vulnerability', 'An unknown vulnerability with no fix', 'A critical bug'], correctAnswer: 2, explanation: 'Zero-day means the vendor has had zero days to patch. It\'s unknown to the vendor and has no available fix.', category: 'Vulnerabilities' },
  { id: 'aq5', question: 'What port does HTTPS typically use?', options: ['80', '443', '22', '8080'], correctAnswer: 1, explanation: 'HTTPS uses port 443 by default. Port 80 is HTTP, 22 is SSH.', category: 'Networking' },
];

export function getLevelBadge(level: string): { color: string; label: string } {
  switch (level) {
    case 'Beginner': return { color: 'bg-cyber-red', label: '🟢 Beginner' };
    case 'Intermediate': return { color: 'bg-cyber-red', label: '🟡 Intermediate' };
    case 'Advanced': return { color: 'bg-cyber-red', label: '🔴 Advanced' };
    case 'Expert': return { color: 'bg-foreground', label: '⚫ Expert' };
    default: return { color: 'bg-muted', label: level };
  }
}
