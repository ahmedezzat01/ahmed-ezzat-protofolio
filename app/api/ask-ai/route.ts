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

const SYSTEM_PROMPT = `You are a helpful AI assistant. You answer questions about ANY topic — cybersecurity, programming, science, history, math, general knowledge, life advice, and more.

Rules:
- Keep answers concise and helpful (max 3-5 sentences)
- Be friendly, professional, and educational
- If asked about illegal activities, redirect to legal alternatives
- Use simple language that beginners can understand
- You can discuss any topic: technology, science, math, history, geography, health, career advice, coding, etc.`;

const providers = [
  {
    name: 'NVIDIA',
    url: 'https://integrate.api.nvidia.com/v1/chat/completions',
    apiKey: process.env.NVIDIA_API_KEY || '',
    model: 'nvidia/nemotron-3-ultra-550b-a55b',
  },
  {
    name: 'Kimi',
    url: 'https://api.moonshot.cn/v1/chat/completions',
    apiKey: process.env.KIMI_API_KEY || '',
    model: 'moonshot-v1-8k',
  },
  {
    name: 'OpenRouter',
    url: 'https://openrouter.ai/api/v1/chat/completions',
    apiKey: process.env.OPENROUTER_API_KEY || '',
    model: 'nvidia/llama-3.1-nemotron-70b-instruct',
  },
  {
    name: 'Ollama',
    url: 'https://api.ollama.com/v1/chat/completions',
    apiKey: process.env.OLLAMA_API_KEY || '',
    model: 'llama3.1',
  },
];

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const trimmed = message.trim();
    if (trimmed.length < 3) {
      return NextResponse.json({ error: 'Question is too short' }, { status: 400 });
    }

    if (trimmed.length > 500) {
      return NextResponse.json({ error: 'Question is too long (max 500 characters)' }, { status: 400 });
    }

    let lastError = '';

    for (const provider of providers) {
      try {
        if (!provider.apiKey) continue;

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
            max_tokens: 300,
            temperature: 0.7,
          }),
          signal: AbortSignal.timeout(15000),
        });

        if (!response.ok) {
          lastError = `Service unavailable`;
          continue;
        }

        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          lastError = `Invalid response format`;
          continue;
        }

        const data = await response.json();
        
        if (data.choices?.[0]?.message?.content) {
          const content = data.choices[0].message.content
            .replace(/<[^>]*>/g, '')
            .trim();
          
          return NextResponse.json({
            content,
            provider: provider.name,
          });
        }

        lastError = `No response generated`;
      } catch (error: any) {
        if (error.name === 'TimeoutError') {
          lastError = `Request timed out`;
        } else {
          lastError = `Service unavailable`;
        }
      }
    }

    return NextResponse.json(
      { error: 'All AI services are currently unavailable. Please try again later.' },
      { status: 503 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
