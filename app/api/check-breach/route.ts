import { NextRequest, NextResponse } from 'next/server';

const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit = 10, windowMs = 60000): boolean {
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

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

async function checkBreach(email: string): Promise<{ breached: boolean; count: number; breaches: string[]; error?: string }> {
  try {
    const res = await fetch(`https://api.xposedornot.com/v1/check-email/${encodeURIComponent(email.trim().toLowerCase())}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      return { breached: false, count: 0, breaches: [], error: 'Breach check service unavailable.' };
    }

    const contentType = res.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return { breached: false, count: 0, breaches: [], error: 'Invalid response from breach service.' };
    }

    const data = await res.json();

    if (data.status === 'success' && data.breaches && data.breaches.length > 0) {
      const flat: string[] = Array.isArray(data.breaches[0])
        ? data.breaches.flat()
        : data.breaches;

      return {
        breached: true,
        count: flat.length,
        breaches: flat.slice(0, 50),
      };
    }

    return { breached: false, count: 0, breaches: [] };
  } catch {
    return { breached: false, count: 0, breaches: [], error: 'Failed to connect to breach database.' };
  }
}

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  
  if (!checkRateLimit(ip, 10, 60000)) {
    return NextResponse.json(
      { breached: false, count: 0, error: 'Too many requests. Please wait a moment.' },
      { status: 429 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email');

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { breached: false, count: 0, error: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

  const result = await checkBreach(email);

  if (result.error) {
    return NextResponse.json({
      breached: result.breached,
      count: result.count,
      breaches: [],
      error: result.error,
    });
  }

  return NextResponse.json({
    breached: result.breached,
    count: result.count,
    breaches: result.breaches.map(name => ({
      Name: name,
      Title: name,
    })),
  });
}
