import { NextRequest, NextResponse } from 'next/server';

const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit = 20, windowMs = 60000): boolean {
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

const SYSTEM_PROMPT = `You are a helpful AI assistant. Answer concisely (2-4 sentences). Topics: cybersecurity, programming, science, math, career advice, general knowledge.`;

const AI_RESPONSES: Record<string, string> = {
  default: "I'm a simulated AI assistant on this cybersecurity portfolio. In a real deployment, this would connect to an AI API like OpenRouter or NVIDIA. For now, I can help with general cybersecurity questions based on the portfolio content.",
};

function generateLocalResponse(message: string): string {
  const lower = message.toLowerCase();
  
  if (lower.includes('cyber') || lower.includes('security') || lower.includes('hack') || lower.includes('penetr')) {
    return "Cybersecurity involves protecting systems, networks, and programs from digital attacks. Key areas include network security, application security, cloud security, and penetration testing. Popular certifications include CompTIA Security+, CEH, OSCP, and CISSP. The field has a 3.5 million professional shortage globally.";
  }
  if (lower.includes('tool') || lower.includes('software')) {
    return "Essential cybersecurity tools include: Nmap (network scanning), Burp Suite (web app testing), Metasploit (exploitation), Wireshark (packet analysis), John the Ripper (password cracking), and OWASP ZAP (vulnerability scanning). Many have free/community editions for learning.";
  }
  if (lower.includes('career') || lower.includes('job') || lower.includes('salary')) {
    return "Cybersecurity careers offer strong prospects. Entry-level roles (SOC Analyst) start around $60K-$80K. Mid-level (Penetration Tester) earns $90K-$130K. Senior/Lead roles can reach $150K-$200K+. Key certifications: Security+, CEH, OSCP, CISSP.";
  }
  if (lower.includes('password') || lower.includes('auth')) {
    return "Strong passwords should be 12+ characters with mixed case, numbers, and symbols. Use a password manager like Bitwarden or 1Password. Enable 2FA/MFA everywhere possible. Avoid password reuse across sites. Consider passkeys as the future of authentication.";
  }
  if (lower.includes('network') || lower.includes('firewall') || lower.includes('vpn')) {
    return "Network security fundamentals: Use firewalls to filter traffic, segment networks to limit blast radius, encrypt traffic with TLS/VPN, monitor with IDS/IPS systems, and regularly audit configurations. Zero Trust architecture is the modern approach — never trust, always verify.";
  }
  if (lower.includes('malware') || lower.includes('virus') || lower.includes('ransomware')) {
    return "Malware types include viruses, worms, trojans, ransomware, spyware, and rootkits. Prevention: keep software updated, use endpoint protection, don't click suspicious links, maintain offline backups. Ransomware average cost: $4.54M per incident in 2023.";
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return "Hello! I'm the AI assistant for this cybersecurity portfolio. I can help with questions about cybersecurity, penetration testing, network security, career advice, and more. What would you like to know?";
  }
  if (lower.includes('who') || lower.includes('ahmed')) {
    return "Ahmed Ezzat is a cybersecurity professional and penetration tester based in Egypt. He holds certifications including CCNA, CCEP, and has completed training in vulnerability analysis, penetration testing, and Linux administration. He's the founder of this portfolio showcasing his skills and projects.";
  }
  if (lower.includes('linux') || lower.includes('command')) {
    return "Essential Linux commands for cybersecurity: nmap (scan), netstat (connections), tcpdump (capture), chmod/chown (permissions), grep/awk (text processing), find (locate files), ps/top (processes), iptables (firewall), and curl/wget (HTTP requests).";
  }

  return AI_RESPONSES.default;
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

    // Fallback: local intelligent responses
    return NextResponse.json({
      content: generateLocalResponse(trimmed),
      provider: 'Local',
    });
  } catch {
    return NextResponse.json({ content: generateLocalResponse('hello'), provider: 'Local' });
  }
}
