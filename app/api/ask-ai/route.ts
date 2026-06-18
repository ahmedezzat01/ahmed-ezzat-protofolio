import { NextRequest, NextResponse } from 'next/server';

const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit = 30, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);
  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (record.count >= limit) return false;
  record.count++;
  return true;
}

const SYSTEM_PROMPT = `You are Ahmed Ezzat's AI cybersecurity assistant. You are knowledgeable, professional, and helpful. Answer questions about cybersecurity, ethical hacking, Ahmed's portfolio, tools, certifications, and career advice. Keep answers concise (2-5 sentences). Be friendly and educational.`;

interface KBEntry {
  keywords: string[];
  response: string;
}

const KB: KBEntry[] = [
  {
    keywords: ['penetration test', 'pentest', 'pen testing', 'penetrating'],
    response: "Penetration testing is the authorized practice of bypassing security controls to identify vulnerabilities before attackers do. It follows phases: Reconnaissance → Scanning → Exploitation → Post-Exploitation → Reporting. Ahmed is skilled in network and web app pentesting, using tools like Nmap, Burp Suite, and Metasploit. Common certifications include OSCP, CEH, and GPEN."
  },
  {
    keywords: ['ahmed', 'who', 'about', 'portfolio', 'developer', 'engineer'],
    response: "Ahmed Ezzat is a cybersecurity professional and IT Manager based in Egypt. He holds CCNA, CCEP, and has completed DEPI's Vulnerability Analysis & Pentesting program. He's proficient in Linux administration, network security, and ethical hacking. This portfolio showcases his projects, tools, and expertise across 15+ security domains."
  },
  {
    keywords: ['certification', 'cert', 'certificate', 'oscp', 'ceh', 'ccna', 'comp'],
    response: "Ahmed holds several certifications: CCNA (Cisco Certified Network Associate), CCEP (Certified Cybersecurity Entry-Level Professional), Red Hat Linux Administration (RHCSA), and Google Cybersecurity Professional Certificate. He also completed DEPI's Vulnerability Analysis & Penetration Testing program. Recommended certs for aspiring pentesters: Security+, CEH, OSCP, then CISSP for management."
  },
  {
    keywords: ['tool', 'software', 'scanner', 'burp', 'nmap', 'metasploit', 'wireshark'],
    response: "Essential cybersecurity tools: **Reconnaissance** — Nmap (network scanning), theHarvester (OSINT). **Web Apps** — Burp Suite (proxy/scanner), OWASP ZAP, SQLMap. **Exploitation** — Metasploit, Cobalt Strike. **Post-Exploitation** — Mimikatz, BloodHound. **Forensics** — Wireshark (packets), Autopsy, Volatility. **Password** — Hashcat, John the Ripper. Ahmed's Security Hub covers 21+ tools with detailed guides."
  },
  {
    keywords: ['linux', 'command', 'terminal', 'bash', 'shell'],
    response: "Linux is essential for cybersecurity. Key commands: `nmap` (scan), `netstat` (connections), `tcpdump` (capture traffic), `chmod`/`chown` (permissions), `grep`/`awk` (text processing), `find` (locate files), `ps`/`top` (processes), `iptables` (firewall), `curl`/`wget` (HTTP). Ahmed is certified in Red Hat Linux Administration (RHCSA)."
  },
  {
    keywords: ['network', 'firewall', 'vpn', 'tcp', 'ip', 'dns'],
    response: "Network security fundamentals: Defense-in-depth with firewalls (pfSense, iptables), IDS/IPS (Snort, Suricata), network segmentation, and VPNs. Ahmed's CCNA certification covers routing, switching, VLANs, ACLs, and NAT. Modern approach: Zero Trust Architecture — never trust, always verify, regardless of network location."
  },
  {
    keywords: ['malware', 'virus', 'trojan', 'ransomware', 'worm', 'rootkit'],
    response: "Malware types: Ransomware (encrypts files for payment), Trojans (disguised as legitimate software), worms (self-replicating), rootkits (hide deep in OS), spyware (data exfiltration). Prevention: updated AV/EDR, application whitelisting, user training, offline backups. The average ransomware cost is $4.54M per incident. Ahmed covers this in his Security Hub threat section."
  },
  {
    keywords: ['password', 'auth', '2fa', 'mfa', 'credential', 'hash'],
    response: "Password security: Use 12+ characters with mixed complexity. Never reuse passwords — use a manager (Bitwarden, 1Password). Enable MFA everywhere (TOTP > SMS). Passwordless auth (passkeys) is the future. For pentesting: Hashcat (GPU cracking), John the Ripper, NTLM/Kerberoasting attacks. Default credential checking is critical in any pentest."
  },
  {
    keywords: ['web', 'xss', 'sqli', 'sql injection', 'owasp', 'vulnerability', 'cve'],
    response: "Top web vulnerabilities (OWASP Top 10): Broken Access Control, Cryptographic Failures, Injection (SQL/NoSQL), Insecure Design, Security Misconfiguration, Vulnerable Components, Auth Failures, Data Integrity Failures, Logging Failures, SSRF. Tools: Burp Suite for testing, SQLMap for injection, Nuclei for scanning. Ahmed has hands-on experience with web app pentesting."
  },
  {
    keywords: ['career', 'job', 'salary', 'hire', 'work'],
    response: "Cybersecurity career paths: SOC Analyst L1 ($60-80K) → L2 ($80-100K) → L3 ($100-130K). Pentester ($90-130K) → Senior ($130-170K). Security Architect ($130-180K). CISO ($200K+). Key certifications: Security+ (entry), CEH (mid), OSCP (pentest), CISSP (management). The field has a 3.5M professional shortage globally — excellent job security."
  },
  {
    keywords: ['bug bounty', 'hackerone', 'bugcrowd', 'reward'],
    response: "Bug bounty programs let you legally hack companies for rewards. Platforms: HackerOne, Bugcrowd, Intigriti. Start with recon — subdomain enumeration, port scanning, then web app testing. Common findings: IDOR, XSS, SSRF, info disclosure. Top earners make $500K+/year. Ahmed recommends starting with DVWA, HackTheBox, and TryHackMe to build skills before going live."
  },
  {
    keywords: ['hackthebox', 'tryhackme', 'htb', 'thm', 'ctf', 'challenge'],
    response: "Best platforms for learning: **TryHackMe** — beginner-friendly, guided paths. **HackTheBox** — intermediate-advanced, retired machines. **PicoCTF** — CTF challenges for beginners. **VulnHub** — downloadable vulnerable VMs. **PortSwigger Web Security Academy** — free web app security labs. Ahmed has practical experience with these platforms and covers them in his Security Hub."
  },
  {
    keywords: ['sql', 'injection', 'database', 'sqli'],
    response: "SQL Injection exploits unsafe user input in database queries. Types: Union-based (extract data via UNION), Blind (boolean/time-based), Error-based (leak info from errors), Second-order (stored then triggered). Prevention: parameterized queries, prepared statements, ORM usage, input validation. Tool: SQLMap automates detection and exploitation."
  },
  {
    keywords: ['xss', 'cross-site', 'scripting', 'reflected', 'stored'],
    response: "Cross-Site Scripting (XSS) injects malicious scripts into web pages. Types: Reflected (URL parameter), Stored (saved in database, more dangerous), DOM-based (client-side). Prevention: output encoding, Content Security Policy (CSP), HTTPOnly cookies, input sanitization. XSS can steal session tokens, redirect users, or deface websites."
  },
  {
    keywords: ['cloud', 'aws', 'azure', 'gcp'],
    response: "Cloud security is booming. Key areas: IAM (identity management), S3 bucket security, serverless security, container security (Docker/K8s). Certifications: AWS Security Specialty, AZ-500 (Azure), GCP Professional Cloud Security Engineer. Ahmed's Security Hub covers cloud security career paths and essential tools."
  },
  {
    keywords: ['red team', 'blue team', 'purple team', 'soc'],
    response: "**Red Team** — offensive security, simulating real attacks (pentesting, social engineering). **Blue Team** — defensive, monitoring, incident response, SIEM management. **Purple Team** — collaboration between both to improve defenses. **SOC** — Security Operations Center where blue teamers monitor alerts 24/7. Ahmed has experience in both offensive and defensive security."
  },
  {
    keywords: ['phishing', 'social engineering', 'email', 'scam'],
    response: "Social engineering exploits human psychology, not technology. Types: Phishing (email), Vishing (voice), Smishing (SMS), Pretexting (fake scenarios), Baiting (USB drops). Prevention: security awareness training, email filtering, DMARC/DKIM/SPF, verification procedures. 91% of cyberattacks start with phishing. Ahmed covers red flags in his Security Hub."
  },
  {
    keywords: ['api', 'rest', 'graphql', 'endpoint'],
    response: "API security testing: Check for Broken Object Level Authorization (BOLA), excessive data exposure, lack of rate limiting, mass assignment, and injection flaws. Tools: Postman, Burp Suite, OWASP API Security Top 10. Always test: authentication bypass, parameter manipulation, and response manipulation."
  },
  {
    keywords: ['forensic', 'incident response', 'ir', 'evidence'],
    response: "Digital forensics and incident response (DFIR): Identify → Contain → Eradicate → Recover → Lessons Learned. Tools: Volatility (memory), Autopsy (disk), Wireshark (network), Plaso (timeline). Chain of custody is critical for legal evidence. Ahmed's Security Hub covers forensics career paths and essential tools."
  },
  {
    keywords: ['wireless', 'wifi', 'wpa', 'aircrack'],
    response: "Wireless security testing: Capture handshake with `airodump-ng`, deauth clients with `aireplay-ng`, crack with `aircrack-ng`. WPA3 is the current standard. WPA2 with weak passwords can be cracked offline. Tools: Aircrack-ng suite, Wifite (automated). Always test wireless networks only with explicit authorization."
  },
  {
    keywords: ['crypto', 'encrypt', 'decrypt', 'hash', 'blockchain', 'bitcoin'],
    response: "Cryptography fundamentals: Symmetric (AES-256, fast, same key) vs Asymmetric (RSA, ECC, key pairs). Hashing: SHA-256 (one-way), bcrypt (passwords). TLS/SSL for transport security. Ahmed's Dark Web simulation explains how cryptocurrency transactions work and why they're traceable despite popular belief."
  },
  {
    keywords: ['dark web', 'tor', 'onion', 'deep web'],
    response: "The dark web uses Tor (The Onion Router) for anonymity — traffic routes through 3 encrypted relays. While it hosts legitimate privacy services, it's also used for illegal marketplaces, forums, and data trading. Ahmed's Safe Gateway simulation provides a safe, educational exploration of dark web concepts without any real connections."
  },
  {
    keywords: ['project', 'work', 'built', 'created', 'made'],
    response: "Ahmed's key projects: This cybersecurity portfolio (Next.js, GSAP, 3D animations), Dark Web simulation (realistic browser, wiki, marketplace), AI Security Assistant (multi-provider), Security Hub (12-tab knowledge center), and various pentesting tools. Each project demonstrates different security concepts and technical skills."
  },
  {
    keywords: ['hello', 'hi', 'hey', 'salam', 'help'],
    response: "Hello! I'm Ahmed's AI cybersecurity assistant. I can help with: penetration testing techniques, security tools and certifications, career advice in cybersecurity, vulnerability analysis, network security, web application security, and questions about Ahmed's portfolio and projects. What would you like to know?"
  },
  {
    keywords: ['thank', 'thanks', 'thx'],
    response: "You're welcome! Feel free to ask more questions about cybersecurity, Ahmed's projects, or career advice. I'm here to help! 🛡️"
  },
  {
    keywords: ['time', 'date', 'now'],
    response: `The current time is server time. For accurate cybersecurity work, always use UTC for timestamps in logs and reports. Ahmed's portfolio is hosted on Vercel with edge functions for low-latency responses worldwide.`
  },
];

function findBestResponse(query: string): string {
  const lower = query.toLowerCase();
  
  let bestMatch: KBEntry | null = null;
  let bestScore = 0;
  
  for (const entry of KB) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) {
        score += kw.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }
  
  if (bestMatch && bestScore > 0) {
    return bestMatch.response;
  }
  
  return `That's an interesting question! While I don't have a specific answer for "${query.slice(0, 50)}", I can help with cybersecurity topics like penetration testing, network security, web app security, tools, certifications, and career advice. Could you rephrase your question or ask about one of these topics?`;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
    }

    const { message } = await req.json();

    if (!message || typeof message !== 'string' || message.trim().length < 3) {
      return NextResponse.json({ error: 'Invalid message.' }, { status: 400 });
    }

    const trimmed = message.trim();

    // Try external AI providers first
    const providers = [
      {
        name: 'OpenRouter',
        url: 'https://openrouter.ai/api/v1/chat/completions',
        apiKey: process.env.OPENROUTER_API_KEY || '',
        model: 'nvidia/llama-3.1-nemotron-70b-instruct',
      },
      {
        name: 'NVIDIA',
        url: 'https://integrate.api.nvidia.com/v1/chat/completions',
        apiKey: process.env.NVIDIA_API_KEY || '',
        model: 'nvidia/nemotron-3-ultra-550b-a55b',
      },
    ];

    for (const provider of providers) {
      if (!provider.apiKey) continue;
      try {
        const response = await fetch(provider.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${provider.apiKey}`,
          },
          body: JSON.stringify({
            model: provider.model,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user', content: trimmed },
            ],
            max_tokens: 200,
            temperature: 0.7,
          }),
          signal: AbortSignal.timeout(8000),
        });

        if (!response.ok) continue;

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        
        if (content) {
          return NextResponse.json({
            content: content.replace(/<[^>]*>/g, '').trim(),
            provider: provider.name,
          });
        }
      } catch {
        continue;
      }
    }

    // Local intelligent fallback
    return NextResponse.json({
      content: findBestResponse(trimmed),
      provider: 'Local',
    });
  } catch {
    return NextResponse.json({
      content: findBestResponse('hello'),
      provider: 'Local',
    });
  }
}
