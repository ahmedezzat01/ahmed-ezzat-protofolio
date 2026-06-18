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

const SYSTEM_PROMPT = `You are Ahmed Ezzat's AI cybersecurity assistant. You are knowledgeable, professional, and helpful. You answer questions about cybersecurity, ethical hacking, penetration testing, network security, web application security, tools, certifications, career advice, and Ahmed's portfolio projects. Keep answers concise (2-4 sentences). Be friendly and educational. Use simple language.`;

// Groq free API — fast, no credit card needed
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_KEY = process.env.GROQ_API_KEY || '';

function findLocalResponse(query: string): string {
  const lower = query.toLowerCase();

  if (lower.includes('penetration test') || lower.includes('pentest'))
    return "Penetration testing is the authorized practice of bypassing security controls to identify vulnerabilities before attackers do. It follows phases: Reconnaissance → Scanning → Exploitation → Post-Exploitation → Ahmed is skilled in network and web app pentesting, using tools like Nmap, Burp Suite, and Metasploit.";
  if (lower.includes('ahmed') || lower.includes('who') || lower.includes('portfolio'))
    return "Ahmed Ezzat is a cybersecurity professional and IT Manager based in Egypt. He holds CCNA, CCEP, Red Hat Linux Administration, and Google Cybersecurity Professional certifications. This portfolio showcases his projects, tools, and expertise across 15+ security domains.";
  if (lower.includes('tool') || lower.includes('scanner'))
    return "Essential cybersecurity tools: Nmap (network scanning), Burp Suite (web app testing), Metasploit (exploitation), Wireshark (packet analysis), John the Ripper (password cracking), and OWASP ZAP (vulnerability scanning). Ahmed's Security Hub covers 21+ tools with detailed guides.";
  if (lower.includes('career') || lower.includes('job') || lower.includes('salary'))
    return "Cybersecurity career paths: SOC Analyst L1 ($60-80K) → Senior ($100-130K), Pentester ($90-170K), Security Architect ($130-180K), CISO ($200K+). Key certifications: Security+, CEH, OSCP, CISSP. The field has a 3.5M professional shortage globally.";
  if (lower.includes('cert') || lower.includes('oscp') || lower.includes('ceh'))
    return "Ahmed holds CCNA, CCEP, Red Hat Linux Administration, and Google Cybersecurity certifications. Recommended for pentesters: Security+ (entry), CEH (mid), OSCP (hands-on pentest), CISSP (management).";
  if (lower.includes('linux') || lower.includes('command'))
    return "Essential Linux commands: nmap (scan), netstat (connections), tcpdump (traffic), chmod/chown (permissions), grep/awk (text), find (files), ps/top (processes), iptables (firewall). Ahmed is RHCSA certified.";
  if (lower.includes('network') || lower.includes('firewall'))
    return "Network security fundamentals: firewalls (pfSense, iptables), IDS/IPS (Snort, Suricata), segmentation, VPNs, Zero Trust Architecture. Ahmed's CCNA covers routing, switching, VLANs, ACLs, and NAT.";
  if (lower.includes('malware') || lower.includes('ransomware'))
    return "Malware types: Ransomware (encrypts files), Trojans (disguised), worms (self-replicating), rootkits (hidden). Prevention: updated AV/EDR, user training, offline backups. Average ransomware cost: $4.54M per incident.";
  if (lower.includes('xss') || lower.includes('cross-site'))
    return "XSS injects malicious scripts into web pages. Types: Reflected (URL), Stored (database), DOM-based. Prevention: output encoding, CSP, HTTPOnly cookies. XSS can steal sessions, redirect users, or deface sites.";
  if (lower.includes('sql') || lower.includes('injection'))
    return "SQL Injection exploits unsafe database queries. Types: Union-based, Blind (boolean/time), Error-based. Prevention: parameterized queries, prepared statements, ORM. SQLMap automates detection and exploitation.";
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey'))
    return "Hello! I'm Ahmed's AI cybersecurity assistant. I can help with penetration testing, security tools, certifications, career advice, network security, web vulnerabilities, and more. What would you like to know?";
  if (lower.includes('thank'))
    return "You're welcome! Feel free to ask more questions about cybersecurity, tools, certifications, or Ahmed's projects. I'm here to help!";

  return `That's a great question! While I specialize in cybersecurity topics like penetration testing, network security, web app security, tools, certifications, and career advice — I'd be happy to try answering your question. Could you tell me more about what you'd like to know?`;
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

    // Try Groq first (free, fast)
    if (GROQ_KEY) {
      try {
        const response = await fetch(GROQ_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_KEY}`,
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user', content: trimmed },
            ],
            max_tokens: 250,
            temperature: 0.7,
          }),
          signal: AbortSignal.timeout(10000),
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) {
            return NextResponse.json({
              content: content.replace(/<[^>]*>/g, '').trim(),
              provider: 'Groq',
            });
          }
        }
      } catch {
        // Continue to local fallback
      }
    }

    // Local fallback
    return NextResponse.json({
      content: findLocalResponse(trimmed),
      provider: 'Local',
    });
  } catch {
    return NextResponse.json({
      content: findLocalResponse('hello'),
      provider: 'Local',
    });
  }
}
