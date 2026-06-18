import { NextRequest, NextResponse } from 'next/server';

const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit = 20, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= limit) {
    return false;
  }
  
  record.count++;
  return true;
}

const SYSTEM_PROMPT = `You are a helpful AI assistant. Answer questions concisely (2-4 sentences). Topics: cybersecurity, programming, science, math, career advice, general knowledge.`;

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

    if (message.length > 500) {
      return NextResponse.json({ error: 'Message too long.' }, { status: 400 });
    }

    const trimmed = message.trim();

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

    return NextResponse.json({ error: 'AI services unavailable.' }, { status: 503 });
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
