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

const SYSTEM_PROMPT = `أنت مساعد ذكي للcybersecurity اسمك Ahmed Ezzat.

قواعد صارمة:
- تكلّم بالعربي بس. دايماً بالعربي. حتى لو السؤال بالإنجليزي، رد بالعربي.
- لو السؤال قصير، رد قصير (2-3 جمل).
- لو السؤال بحث/تفصيل، اكتب تفصيل مع عناوين ونقاط ومجلدات.
- استخدم markdown: **غامق**، قوائم مرقمة، نقاط.
- لو معرفتش حاجة، قول بوضوح "مش عارف".
- ابدأ ردك دائماً بجملة مباشرة تجاوب على السؤال.`;

// Groq free API — fast, no credit card needed
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_KEY = process.env.GROQ_API_KEY || '';

function findLocalResponse(query: string): string {
  const lower = query.toLowerCase();

  if (lower.includes('penetration test') || lower.includes('pentest') || lower.includes('اختراق') || lower.includes(' اختبار'))
    return "الاختراق الأخلاقي (Penetration Testing) هو عملية اختبار أمني مصرّح بيها للكشف عن الثغرات قبل المهاجمين. بيتبع مراحل: الاستطلاع → الفحص → الاستغلال → ما بعد الاستغلال. Ahmed متخصص في اختبار اختراق الشبكات وتطبيقات الويب باستخدام أدوات زي Nmap و Burp Suite و Metasploit.";

  if (lower.includes('ahmed') || lower.includes('who') || lower.includes('portfolio') || lower.includes('اهمد') || lower.includes('ポート'))
    return "Ahmed Ezzat متخصص في الأمن السيبراني و Manager IT مقيم في مصر. عنده شهادات CCNA و CCEP و Red Hat Linux Administration و Google Cybersecurity Professional. البورتفوليو ده بياور على مشاريعه وأدواته وخبراته في أكثر من 15 مجال أمني.";

  if (lower.includes('tool') || lower.includes('scanner') || lower.includes('ادوات') || lower.includes('أداة'))
    return "أهم أدوات الأمن السيبراني: Nmap (فحص الشبكات), Burp Suite (اختبار تطبيقات الويب), Metasploit (الاستغلال), Wireshark (تحليل الحزم), John the Ripper (كسر كلمات المرور), OWASP ZAP (فحص الثغرات). Ahmed في Security Hub بتاعه بيغطي 21+ أداة مع شرح تفصيلي.";

  if (lower.includes('career') || lower.includes('job') || lower.includes('salary') || lower.includes('وظيفة') || lower.includes('راتب'))
    return "مسارات الوظائف في الأمن السيبراني: SOC Analyst L1 ($60-80K) → Senior ($100-130K), Pentester ($90-170K), Security Architect ($130-180K), CISO ($200K+). أهم الشهادات: Security+, CEH, OSCP, CISSP. المجال ناقصه 3.5 مليون محترف حول العالم.";

  if (lower.includes('cert') || lower.includes('oscp') || lower.includes('ceh') || lower.includes('شهادة') || lower.includes('certification'))
    return "Ahmed عنده CCNA و CCEP و Red Hat Linux Administration و Google Cybersecurity. للـ Pentesters: Security+ (入门), CEH (متوسط), OSCP (عملي), CISSP (إداري).";

  if (lower.includes('linux') || lower.includes('command') || lower.includes('لنكس') || lower.includes('أوامر'))
    return "أهم أوامر Linux: nmap (فحص), netstat (اتصالات), tcpdump (حركة), chmod/chown (صلاحيات), grep/awk (نص), find (ملفات), ps/top (عمليات), iptables (جدار حماية). Ahmed عنده شهادة RHCSA.";

  if (lower.includes('network') || lower.includes('firewall') || lower.includes('شبكة') || lower.includes('جدار'))
    return "أساسيات أمن الشبكات: جدران الحماية (pfSense, iptables), IDS/IPS (Snort, Suricata), الت segmentation, VPNs, الصفر ثقة. Ahmed شهادة CCNA بتغطي الـ routing و switching و VLANs و ACLs و NAT.";

  if (lower.includes('malware') || lower.includes('ransomware') || lower.includes(' Program') || lower.includes('勒索'))
    return "أنواع البرمجيات الخبيثة: Ransomware (مشفر الملفات), Trojans (متنكر), Worms (بيتكاثر لوحده), Rootkits (مختفي). الوقاية: مكافحة فيروسات محدثة, تدريب المستخدمين, نسخ احتياطي. متوسط تكلفة الهجوم: $4.54 مليون.";

  if (lower.includes('xss') || lower.includes('cross-site') || lower.includes('ثغرة'))
    return "XSS بحقن سكريبتات خبيثة في صفحات الويب. الأنواع: Reflected (في الرابط), Stored (في قاعدة البيانات), DOM-based. الوقاية: تشفير المخرجات, CSP, cookies HTTPOnly. XSS ممكن يسرق الجلسات ويوجه المستخدمين.";

  if (lower.includes('sql') || lower.includes('injection') || lower.includes('حقن') || lower.includes('SQL'))
    return "SQL Injection بيستغل استعلامات قاعدة البيانات غير الآمنة. الأنواع: Union-based, Blind (boolean/time), Error-based. الوقاية: استعلامات مُعدّة مسبقاً, ORM. SQLMap بيكشف وبيستغل تلقائياً.";

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('مرحبا') || lower.includes('اهلا') || lower.includes('السلام'))
    return "أهلاً! أنا مساعد Ahmed للأمن السيبراني. أقدر أساعدك في اختبار الاختراق, أدوات الأمان, الشهادات, نصائح الوظائف, أمن الشبكات, ثغرات الويب, والمزيد. عايز تعرف إيه؟";

  if (lower.includes('thank') || lower.includes('شكر') || lower.includes('ممنون'))
    return "عفواً! تقدر تسأل أي سؤال تاني عن الأمن السيبراني, الأدوات, الشهادات, أو مشاريع Ahmed. أنا موجود أساعدك!";

  return `سؤال حلو! أنا متخصص في مواضيع الأمن السيبراني زي اختبار الاختراق, أمن الشبكات, أمن تطبيقات الويب, الأدوات, الشهادات, ونصائح الوظائف — بس أقدر أساعدك في أي سؤال. اسألني عن أي حاجة!`;
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
            max_tokens: 1024,
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
