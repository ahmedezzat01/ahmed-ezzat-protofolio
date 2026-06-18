# Cybersecurity Portfolio — Technical Documentation
## Complete System Architecture & Feature Reference
### Author: Ahmed Ezzat | Version: 1.0 | Date: June 2026

---

# Table of Contents

1. Project Overview
2. Technology Stack
3. Pages & Routes
4. Security Tools (21 Tools — Full Detail)
5. API Routes (Full Detail)
6. Dark Web Simulation (Full Detail)
7. Cybersecurity Hub (Full Detail)
8. AI Chat System
9. Contact & Email System
10. Notifications System
11. Data Files & Structures
12. Configuration & Theme
13. Security Findings

---

# 1. Project Overview

**Name:** CyberSec Portfolio
**Author:** Ahmed Ezzat
**URL:** https://ahmedezzat01.github.io/ahmed-ezzat-protofolio
**Repository:** https://github.com/ahmedezzat01/ahmed-ezzat-protofolio

A professional multi-page cybersecurity portfolio featuring:
- 10+ pages with dark theme (red/black/white palette)
- 21 interactive security tools
- Full Dark Web simulation (educational)
- AI-powered chat assistant
- Real-time security news
- Spline 3D robot in hero section
- Matrix Rain animated background
- Custom cyber ring cursor
- PDF certificate viewer (react-pdf)
- Email contact form (EmailJS)

---

# 2. Technology Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| Framework | Next.js | 16.2.9 | React SSR/SSG framework |
| UI Library | React | 19.2.4 | Component rendering |
| Language | TypeScript | — | Type safety |
| Styling | Tailwind CSS | 4.x | Utility-first CSS |
| Animation | GSAP | 3.15 | Scroll-triggered animations |
| Animation | Framer Motion | 12.40 | Mount/transition animations |
| 3D | Spline Runtime | 1.12.97 | 3D robot model |
| PDF | react-pdf | 10.4.1 | Certificate PDF viewer |
| Email | EmailJS | 4.4.1 | Contact form submission |
| Password | zxcvbn | 4.4.2 | Password strength analysis |
| UI Primitives | Radix UI | Various | Dialog, Tooltip, Avatar, etc. |
| State | React Context | — | Language provider |
| Search | Custom hook | — | Ctrl+K keyboard search |

---

# 3. Pages & Routes

## 3.1 Home Page (`/`)
**File:** `app/page.tsx`

The main landing page containing:
- **Matrix Rain Background** — Fixed full-page canvas with falling Japanese characters in red. Uses `position: fixed; z-index: 0`. All content wrapped in `relative z-[1]` to render above.
- **Navigation Bar** — Fixed top navbar with 10 links, Ctrl+K search trigger, CV download button, mobile hamburger menu.
- **Hero Section** — Typed name animation ("ENG:\nAhmed Ezzat"), Spline 3D robot (850x850px), animated counters (1+ Years, 10+ Projects, 50+ Clients, 6+ Certifications), two CTA buttons (View Projects, Contact Me).
- **About Section** — Profile card with photo placeholder, bio text, 6 skill highlights with icons, 11 certifications with PDF popup viewer.
- **Skills Section** — 6 skill category cards with icons.
- **Experience Section** — 4 role entries in timeline format.
- **Contact Section** — EmailJS-powered form (name, email, subject, message).
- **Footer** — Marquee ticker, navigation links, social media icons, copyright.

## 3.2 Tools Page (`/tools`)
**File:** `app/tools/page.tsx`

Standalone page displaying all 21 security tools in a grid layout. Each tool is a self-contained widget with its own state, logic, and UI.

## 3.3 Projects Page (`/projects`)
**File:** `app/projects/page.tsx`

Showcases 4 projects:
1. Port Scanner — Python network scanning tool
2. NIDS (Network Intrusion Detection System)
3. Password Manager — Encrypted credential storage
4. Malware Sandbox — Safe malware analysis environment

Each project has: title, description, Unsplash image, tech tags, GitHub link.

## 3.4 Roadmap Page (`/roadmap`)
**File:** `app/roadmap/page.tsx`

Career learning roadmap with:
- 10 course categories (Networking, Linux, Security, Programming, Cloud, etc.)
- 60+ curated YouTube channels organized by topic
- External links to courses and certifications

## 3.5 Team Page (`/team`)
**File:** `app/team/page.tsx`

TST team organizational chart:
- CEO: Ahmed Ezzat
- Vice Presidents: Dr. Mariam, Abdelhamid, Mohamed
- Committee heads and members
- Mobile-first vertical layout, desktop horizontal tree

## 3.6 Security Hub (`/cyber-hub`)
**File:** `app/cyber-hub/page.tsx`

12-tab knowledge hub (detailed in Section 7).

## 3.7 Security Sites (`/security-sites`)
**File:** `app/security-sites/page.tsx`

Filterable directory of 47 cybersecurity websites with categories: Learning, Tools, News, Community, Research, Practice.

## 3.8 Dark Web Simulation (`/safe-gateway`)
**File:** `app/safe-gateway/page.tsx`

Full educational Dark Web simulation (detailed in Section 6).

## 3.9 Security AI (`/security-ai`)
**File:** `app/security-ai/page.tsx`

Full-page AI chat interface with thinking animation, suggested questions, and unlimited messages.

## 3.10 PentesterFlow (`/pentesterflow`)
**File:** `app/pentesterflow/page.tsx`

Product showcase page for PentesterFlow AI pentesting agent with terminal demo, install commands, features list, and slash commands.

## 3.11 404 Page (`not-found.tsx`)
**File:** `app/not-found.tsx`

Custom 404 page with:
- ShieldAlert icon with spinning rings
- Glitch "404" text effect
- Red gradient divider
- "Return Home" and "Go Back" buttons
- Terminal-style footer with fake curl output

---

# 4. Security Tools — Complete Reference

## Tool 1: Dark Web Email Check
**Component:** `DarkWebCheck`
**State Variables:** `email`, `isLoading`, `result`

### How It Works:
1. User enters email address
2. Frontend sends `GET /api/check-breach?email={email}`
3. Server-side route calls **XposedOrNot API**: `GET https://api.xposedornot.com/v1/check-email/{email}`
4. API returns JSON with breach data
5. Frontend displays results

### External API:
- **Endpoint:** `https://api.xposedornot.com/v1/check-email/{email}`
- **Authentication:** None (free API)
- **Response:** `{ status: "success", breaches: [["Breach1", "Breach2", ...]], email: "user@example.com" }`

### UI Elements:
- Title: "Dark Web Email Check"
- Icon: `Search` (lucide-react)
- Input placeholder: "Enter your email"
- Button: "Check"
- Loading animation: `DarkWebSearchLoader` with 7 steps (800ms each):
  1. "Initializing Tor network connection..."
  2. "Establishing encrypted circuit..."
  3. "Connecting to relay nodes..."
  4. "Routing through exit node..."
  5. "Querying dark web databases..."
  6. "Cross-referencing breach records..."
  7. "Compiling results..."

### Result Display:
- **If breached:** Red `AlertTriangle` icon, "Compromised!" text, explanation about infostealer malware, 6-step remediation checklist, list of breach names with red dots
- **If safe:** Green `CheckCircle` icon, "Safe" text, `SafeTipsPanel` with security best practices

---

## Tool 2: Password Strength Checker
**Component:** `PasswordStrengthChecker`
**State Variables:** `password`, `showPassword`, `tab` ('strength'|'generator'), `genLength`, `genUpper/genLower/genNumbers/genSymbols`, `generated`, `copied`

### How It Works:
1. User enters password
2. Client-side analysis using `estimatePasswordStrength()` from `lib/security-api.ts`
3. No external API calls — everything runs in the browser

### Scoring Algorithm (`estimatePasswordStrength`):
```
score = 0
if length >= 12: score += 1
if length >= 16: score += 1
if has uppercase: score += 1
if has lowercase: score += 1
if has digits: score += 1
if has special chars: score += 1
if has repeating chars: score -= 1
if has common patterns: score -= 1
normalized = Math.min(Math.floor(score / 1.5), 4)
```

### Labels:
- Score 0: "Very Weak" — Crack time: "Instant"
- Score 1: "Weak" — Crack time: "Minutes"
- Score 2: "Fair" — Crack time: "Hours"
- Score 3: "Strong" — Crack time: "Days"
- Score 4: "Very Strong" — Crack time: "Years"

### Password Generator Tab:
- Uses `crypto.getRandomValues()` (Web Crypto API)
- Character sets: uppercase (A-Z), lowercase (a-z), numbers (0-9), symbols (!@#$%^&*)
- Length slider: 8–64 characters (default: 16)
- Copy to clipboard functionality
- Info note: "Generated locally using Web Crypto API. Nothing is sent to any server."

---

## Tool 3: Hash Generator
**Component:** `HashGenerator`
**State Variables:** `input`, `hashes`, `copied`

### How It Works:
1. User enters text in textarea
2. Generates 4 hash types simultaneously
3. All processing client-side using Web Crypto API

### Hash Algorithms:
| Algorithm | Method | Notes |
|-----------|--------|-------|
| MD5 | Random hex (FAKE) | 32 random hex characters — NOT a real hash |
| SHA-1 | `crypto.subtle.digest('SHA-1', data)` | Real hash via Web Crypto API |
| SHA-256 | `crypto.subtle.digest('SHA-256', data)` | Real hash via Web Crypto API |
| SHA-512 | `crypto.subtle.digest('SHA-512', data)` | Real hash via Web Crypto API |

### UI:
- Textarea input
- "Generate Hashes" button
- 4 result fields with individual copy buttons
- Info note: "MD5 is shown for reference only — it is cryptographically broken."

---

## Tool 4: IP Lookup
**Component:** `IPLookup`
**State Variables:** `ip`, `result`, `loading`, `error`

### How It Works:
1. User enters IP address
2. Validates format with regex: `/^(\d{1,3}\.){3}\d{1,3}$/`
3. Calls external API

### External API:
- **Endpoint:** `GET http://ip-api.com/json/{ip}?fields=66846721`
- **Authentication:** None (free, 45 requests/minute)
- **Response fields:** country, regionName, city, org, timezone, lat, lon, as

### Result Display:
- Country flag emoji (16 countries mapped)
- IP address, City, Region, Country
- Timezone, ISP/Organization
- GPS coordinates

---

## Tool 5: Port Scanner (Educational)
**Component:** `PortScanner`
**State Variables:** `target`, `isScanning`, `results`, `scanComplete`

### How It Works:
1. User enters target (IP or domain)
2. Simulates scanning 16 common ports
3. Random results based on port type (NOT a real scanner)

### Port Simulation Logic:
| Port | Service | Open Probability |
|------|---------|-----------------|
| 21 | FTP | 15% |
| 22 | SSH | 80% |
| 23 | Telnet | 15% |
| 25 | SMTP | 15% |
| 53 | DNS | 15% |
| 80 | HTTP | 80% |
| 110 | POP3 | 15% |
| 143 | IMAP | 15% |
| 443 | HTTPS | 80% |
| 445 | SMB | 15% |
| 3306 | MySQL | 30% |
| 3389 | RDP | 30% |
| 5432 | PostgreSQL | 30% |
| 8080 | HTTP-Proxy | 15% |
| 8443 | HTTPS-Alt | 15% |
| 27017 | MongoDB | 30% |

### UI:
- Input: "e.g., 192.168.1.1 or example.com"
- "Scan" button
- Progress bar
- Results table: Port | Service | Status (color-coded)
- Summary: "X open, Y filtered, Z closed"

---

## Tool 6: URL Safety Checker
**Component:** `URLSafetyChecker`
**State Variables:** `url`, `result`, `checking`

### How It Works:
1. User enters URL
2. Client-side heuristic analysis with 10 checks
3. Score calculated (0–100)

### Analysis Checks:
| Check | Score Impact | Description |
|-------|-------------|-------------|
| IP address instead of domain | -30 | URL contains numeric IP |
| Suspicious TLD | -25 | .tk, .ml, .ga, .cf, .gq, .xyz, .top, .buzz, .club, .online, .site, .tech |
| @ symbol in URL | -30 | Used to hide real destination |
| URL > 100 characters | -10 | Often used in phishing |
| > 3 subdomains | -10 | Suspicious subdomain nesting |
| Encoded characters | -10 | URL encoding tricks |
| HTTP instead of HTTPS | -10 | No encryption |
| Login keywords | -5 | "login", "secure", "update", "verify" |
| Known legitimate domain | +10 | Google, Microsoft, Apple, etc. |
| Typosquatting detected | -35 | g00gle, micr0soft, amaz0n, faceb00k |

### Result:
- Score 0–100 with progress bar
- "Likely Safe" (green) or "Suspicious!" (red)
- List of issues with danger/warning/info icons

---

## Tool 7: QR Code Safety Checker
**Component:** `QRCodeSafetyChecker`
**State Variables:** `url`, `result`

### How It Works:
1. User pastes URL from QR code
2. Client-side regex analysis

### Checks:
- Suspicious patterns (phish, login.*secure, verify.*account)
- Shortened URLs (bit.ly, tinyurl, t.co, goo.gl, is.gd)
- IP addresses instead of domains
- Missing protocol
- @ symbol in URL
- > 4 subdomains
- Executable extensions (.exe, .apk, .bat, .cmd, .scr)

---

## Tool 8: WiFi Safety Checker
**Component:** `WiFiSafetyChecker`
**State Variables:** `networkName`, `isOpen`, `result`

### How It Works:
1. User enters network name and selects open/closed
2. Client-side risk assessment

### Dangerous Network Names:
`Free WiFi`, `Airport WiFi`, `Hotel WiFi`, `Starbucks`, `McDonald`, `Connect Here`, `Click Here`, `Free Internet`

### Risk Levels:
- **Critical:** Dangerous name + open network
- **High:** Dangerous name OR open network
- **Medium:** Generic name + open
- **Low:** Known name + secured

---

## Tool 9: Digital Footprint Scanner
**Component:** `DigitalFootprintScanner`
**State Variables:** `email`, `name`, `phone`, `scanning`, `result`

### How It Works:
1. User enters email, name, phone
2. Client-side simulation generates exposures
3. Privacy score calculated: `Math.max(10, 100 - exposures.length * 8 - (high_risk * 5))`

### Exposure Sources (simulated):
- Email → email provider, social media, data brokers, breach DBs, Google
- Name → public records, social media, people search, professional networks
- Phone → SMS lists, spam databases, data brokers

### Result:
- Privacy score (0–100)
- Exposure list with risk badges (high/medium/low)
- 6 tips to reduce digital footprint

---

## Tool 10: Identity Theft Risk Calculator
**Component:** `IdentityTheftRiskCalculator`
**State Variables:** `answers`, `submitted`

### How It Works:
1. 8-question quiz with 4 options each
2. Weighted scoring (0–5 per question)
3. Risk percentage calculated

### Questions:
1. How many online accounts do you have? (1-5 / 6-15 / 16-30 / 30+)
2. Do you reuse passwords? (Never / Sometimes / Often / Always)
3. Have you been in a data breach? (No / Not sure / Yes, changed / Yes, didn't change)
4. Social media privacy? (All private / Mostly private / Mixed / All public)
5. Public WiFi usage? (Never / Rarely / Sometimes / Frequently)
6. 2FA coverage? (All accounts / Most / Some / None)
7. Bank statement checks? (Weekly / Monthly / Rarely / Never)
8. Credit freeze? (Yes / Planning / No / Don't know)

### Risk Levels:
- ≤ 20%: Low
- ≤ 45%: Moderate
- ≤ 70%: High
- > 70%: Critical

---

## Tool 11: Two-Factor Authentication Guide
**Component:** `TwoFactorGuide`
**State Variables:** `search`

### Content:
20 services with 2FA setup information:
Google, Apple ID, Microsoft, Facebook, Instagram, Twitter/X, LinkedIn, GitHub, Amazon, PayPal, Netflix, WhatsApp, Telegram, Discord, Steam, Binance, Coinbase, Zoom, Slack, TikTok

Each entry shows: service name, 2FA method (Authenticator/Hardware Key/SMS), direct link to security settings.

---

## Tool 12: Secure Password Sharing
**Component:** `SecurePasswordShare`
**State Variables:** `password`, `showPassword`, `expiry`, `maxViews`, `created`, `shareLink`, `copied`

### How It Works:
1. User enters password, selects expiry (1h/24h/7d), max views (1/3/5)
2. Generates random 16-char alphanumeric ID using `crypto.getRandomValues()`
3. Creates fake share link: `https://secure-share.app/s/{id}?exp={expiryMs}&max={maxViews}`

**Note:** This is a demo — no actual server stores the password.

---

## Tool 13: Secret Message Creator
**Component:** `SecretMessageCreator`
**State Variables:** `message`, `password`, `expiry`, `created`, `encrypted`, `copied`

### How It Works:
1. User enters message and password
2. XOR encryption: pads key to 32 chars, XORs each message byte
3. Result encoded as base64
4. Format: `SECRET:{base64}:{expirySeconds}:{timestamp}`

---

## Tool 14: Privacy Health Score
**Component:** `PrivacyScore`
**State Variables:** `answers`, `submitted`

### How It Works:
9 Yes/No questions with weighted scoring:

| Question | Weight |
|----------|--------|
| Unique passwords per account? | 20 |
| 2FA on primary email? | 20 |
| Using password manager? | 15 |
| OS updates automatic? | 10 |
| Antivirus active? | 10 |
| Avoid suspicious emails? | 10 |
| VPN on public WiFi? | 5 |
| Review app permissions? | 5 |
| Regular data backup? | 5 |

### Score Labels:
- 90–100: "Excellent"
- 70–89: "Good"
- 50–69: "Fair"
- 0–49: "At Risk"

---

## Tool 15: Data Breach Timeline
**Component:** `DataBreachTimeline`
**State Variables:** `expanded`

### Content:
12 real-world data breaches (2013–2024):

| Year | Name | Records | Severity |
|------|------|---------|----------|
| 2024 | National Public Data | 2.9B | Critical |
| 2023 | T-Mobile | 77M | High |
| 2023 | Twitter/X | 200M+ | High |
| 2021 | Facebook | 533M | Critical |
| 2021 | LinkedIn | 700M+ | Critical |
| 2021 | Twitch | 7.5M | High |
| 2019 | Facebook Cambridge | 540M | Critical |
| 2018 | Marriott | 500M | Critical |
| 2017 | Equifax | 147M | Critical |
| 2016 | Yahoo | 3B | Critical |
| 2014 | Adobe | 153M | High |
| 2013 | Target | 110M | High |

---

## Tool 16: Digital Footprint Eraser
**Component:** `DigitalFootprintEraser`
**State Variables:** `currentStep`, `completedSteps`, `name`, `email`, `phone`, `country`, `searchResults`, `showEmailTemplate`, `copiedTemplate`, `autoRunning`

### 6 Steps:

**Step 1: Discover Exposure**
- Google search queries to find yourself
- Search operators: `"your name" site:facebook.com`, etc.

**Step 2: Remove from Data Brokers**
8 opt-out links:
1. Spokeo.com/optout
2. BeenVerified.com/optout
3. WhitePages.com/remove
4. MyLife.com/cancel
5. Intelius.com/optout
6. USSearch.com/privacy
7. TruePeopleSearch.com/removal
8. FastPeopleSearch.com/removal

**Step 3: Kill Old Accounts**
- JustDeleteMe directory
- Facebook app permission audit
- Google account activity review
- Twitter connected apps cleanup

**Step 4: Use Privacy Laws**
Auto-generated email templates for:
- **GDPR** (EU/UK): Right to erasure under Article 17
- **CCPA** (California): Right to delete under Section 1798.105
- **LGPD** (Brazil): Right to deletion under Article 18

Templates include user's name, email, phone, country-specific legal references.

**Step 5: Bury Negative Results**
- LinkedIn profile optimization
- Personal website/portfolio
- Social media presence building

**Step 6: Stop Data Bleeding**
- HaveIBeenPwned email check
- Internal tool links (Email Breach Check, Password Breach Check)

### Auto-Execute:
Runs all 6 steps sequentially with 800ms interval between steps.

---

## Tool 17: Comprehensive Security Report
**Component:** `ComprehensiveSecurityReport`
**State Variables:** `email`, `password`, `name`, `showPassword`, `generating`, `report`

### How It Works:
1. User enters email, password, name
2. Client-side analysis generates 3-section report

### Sections:
1. **Password Strength** — Checks uppercase, lowercase, digits, special chars
2. **Email Security** — Checks email provider, simulates breach finding
3. **Identity Exposure** — Checks name in public records, social media

Overall score = average of 3 section scores.

---

## Tool 18: Dark Web Password Check
**Component:** `DarkWebPasswordCheck`
**State Variables:** `password`, `showPassword`, `isLoading`, `result`

### How It Works:
1. User enters password
2. Checks against 32 common passwords (hardcoded list)
3. If not in list: `Math.random() > 0.5` → breached
4. Count: `Math.floor(Math.random() * 8) + 1`
5. Sources: randomly selected from 15 stealer log names

### Common Passwords List:
`password`, `123456`, `qwerty`, `admin`, `letmein`, `welcome`, `monkey`, `dragon`, `master`, `abc123`, `password1`, `12345678`, `sunshine`, `princess`, `football`, `charlie`, `shadow`, `michael`, `qwerty123`, `pass@123`, `Password1`, `Admin123`, `Test1234`, `Summer2024`, `Winter2023`, `Welcome1`, `Login123`, `Qwerty123`, `Abc@1234`, `P@ssw0rd`, `ChangeMe`, `Letmein1`

### Stealer Log Sources:
Raccoon Stealer, RedLine Stealer, Vidar Stealer, Lumar Stealer, FormBook, AgentTesla, Phoenix Keylogger, LokiBot, AZORult, NanoCore RAT, Orcus RAT, Quasar RAT, DarkComet, NetWire, njRAT

---

## Tool 19: Dark Web Name Check
**Component:** `DarkWebNameCheck`
**State Variables:** `fullName`, `isLoading`, `result`

### How It Works:
1. User enters full name
2. Extracts first word, lowercases
3. Checks against hardcoded `breachDB` for 10 names

### Database:
| Name | Breaches |
|------|----------|
| ahmed | National Public Data (2024), Facebook (2021), LinkedIn (2021), Equifax (2017) |
| mohamed | National Public Data (2024), Adobe (2013), Canva (2019) |
| omar | National Public Data (2024), Twitter (2023), Dropbox (2016) |
| ali | National Public Data (2024), LinkedIn (2021), MyFitnessPal (2018) |
| fatma | National Public Data (2024), Instagram (2019), TikTok (2022) |
| sara | National Public Data (2024), Facebook (2021), Pinterest (2019) |
| john | National Public Data (2024), LinkedIn (2021), Adobe (2013), Equifax (2017) |
| david | National Public Data (2024), Facebook (2021), Twitter (2023) |
| james | National Public Data (2024), LinkedIn (2021), Marriott (2018) |
| michael | National Public Data (2024), Facebook (2021), LinkedIn (2021), Equifax (2017) |

Unknown names: `Math.random() > 0.4` → found with `['National Public Data (2024)', 'Facebook Leak (2019)']`

---

## Tool 20: WiFi Password Viewer (Educational)
**Component:** `WiFiPasswordCheck`
**State Variables:** `showInstructions`, `copied`

### Content:
3-step guide to view saved WiFi passwords on Windows:

**Step 1:** Open CMD as Administrator

**Step 2:** Run command (copyable):
```
netsh wlan show profiles
```

**Step 3:** Run command (copyable):
```
netsh wlan show profile name="NETWORK_NAME" key=clear
```

---

## Tool 21: Identity Theft Risk Calculator
(Already covered as Tool 10 above — same component)

---

# 5. API Routes — Complete Reference

## 5.1 Email Breach Check API

**Endpoint:** `GET /api/check-breach?email={email}`

**File:** `app/api/check-breach/route.ts`

### Request:
```
GET /api/check-breach?email=ahmed@example.com
```

### Validation:
- Email must contain `@` and `.`
- Returns 400 if invalid

### Server-Side Logic:
1. Validates email format
2. Calls XposedOrNot API: `GET https://api.xposedornot.com/v1/check-email/{email}`
3. Parses response: `data.breaches` is nested array `[["Breach1", "Breach2", ...]]`
4. Flattens array, caps at 50 breaches

### External API:
- **Provider:** XposedOrNot (https://xposedornot.com)
- **Endpoint:** `https://api.xposedornot.com/v1/check-email/{email}`
- **Authentication:** None (free)
- **Rate Limits:** Generous (no strict limit documented)

### Response:
```json
{
  "breached": true,
  "count": 150,
  "breaches": [
    { "Name": "LinkedIn", "Title": "LinkedIn" },
    { "Name": "Adobe", "Title": "Adobe" }
  ]
}
```

### Error Handling:
- Invalid email → 400 with error message
- API failure → `{ breached: false, count: 0, breaches: [], error: "..." }`

---

## 5.2 AI Chat API

**Endpoint:** `POST /api/ask-ai`

**File:** `app/api/ask-ai/route.ts`

### Request:
```json
POST /api/ask-ai
Content-Type: application/json

{
  "message": "What is penetration testing?"
}
```

### Validation:
- Message must be 3–500 characters
- Returns 400 if invalid

### System Prompt:
```
You are a helpful AI assistant. You answer questions about ANY topic — cybersecurity, programming, science, history, math, general knowledge, life advice, and more.

Rules:
- Keep answers concise (3-5 sentences)
- Be friendly, professional, educational
- If asked about illegal activities, redirect to legal alternatives
- Use simple language
```

### Provider Fallback Chain:
The API tries providers in order. If one fails, it tries the next:

**Provider 1: NVIDIA**
- Endpoint: `https://integrate.api.nvidia.com/v1/chat/completions`
- Model: `nvidia/nemotron-3-ultra-550b-a55b`
- API Key: `nvapi-uPhEs-H4...`

**Provider 2: Kimi (Moonshot)**
- Endpoint: `https://api.moonshot.cn/v1/chat/completions`
- Model: `moonshot-v1-8k`
- API Key: `sk-KrjFOWB1...`

**Provider 3: OpenRouter**
- Endpoint: `https://openrouter.ai/api/v1/chat/completions`
- Model: `nvidia/llama-3.1-nemotron-70b-instruct`
- API Key: `sk-zg7he7k...`

**Provider 4: Ollama**
- Endpoint: `https://api.ollama.com/v1/chat/completions`
- Model: `llama3.1`
- API Key: `846354ab...`

### Request Format (to each provider):
```json
{
  "model": "model-name",
  "messages": [
    { "role": "system", "content": "You are a helpful AI assistant..." },
    { "role": "user", "content": "What is penetration testing?" }
  ],
  "temperature": 0.7,
  "max_tokens": 1024,
  "stream": false
}
```

### Response:
```json
{
  "answer": "Penetration testing is a...",
  "provider": "NVIDIA"
}
```

### Error Response (all providers fail):
```json
{
  "error": "All AI providers are currently unavailable. Please try again later."
}
```
Status: 503

---

## 5.3 Security News API

**Endpoint:** `GET /api/security-news`

**File:** `app/api/security-news/route.ts`

### Request:
```
GET /api/security-news
```

### External APIs (RSS Feeds):
Tried in order:
1. `https://feeds.feedburner.com/TheHackersNews`
2. `https://www.securityweek.com/feed`

### Parsing Logic:
1. Fetch RSS XML
2. Extract `<item>` blocks using regex
3. Parse `<title>` (with CDATA support), `<description>`, `<link>`, `<pubDate>`
4. Strip HTML tags from description
5. Truncate description to 200 characters

### Fallback:
If both RSS feeds fail, returns 6 hardcoded news items with relative timestamps (30min–4hr ago).

### Response:
```json
{
  "news": [
    {
      "title": "New Zero-Day Exploit...",
      "description": "Researchers discovered...",
      "source": "The Hacker News",
      "url": "https://thehackernews.com/...",
      "publishedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "timestamp": "2024-01-15T12:00:00Z"
}
```

---

# 6. Dark Web Simulation — Complete Reference

**File:** `app/components/safe-gateway/SafeGatewayContent.tsx` (1658 lines)

## Page States:
```
landing → disclaimer → tor-launch → [hidden-wiki | marketplace | forum | chat | mixer | education] → debrief
```

## 6.1 Landing Page

### Elements:
- "The Hidden Wiki" title with onion emoji
- Subtitle: "Your gateway to understanding the dark web — safely, legally, and educationally."
- Search bar (Ctrl+K) — searches wiki, marketplace, and forum
- "Enter the Dark Web" button
- 8 category cards with icons and link counts
- Stats bar: "1,247 online users | 45,892 hidden services | 12,847 forums"

### Search Functionality:
- Searches across wiki categories, market products, and forum threads
- Results displayed in dropdown with category labels

## 6.2 Disclaimer Step

### Requirements:
- 15-second countdown timer (button disabled until complete)
- 4 required checkboxes:
  1. "I understand this is a SIMULATION"
  2. "All content is FICTIONAL and for EDUCATIONAL purposes"
  3. "No real connections are made to any dark web services"
  4. "I will NOT attempt to access real dark web content"
- Scroll-to-bottom requirement
- Button: "I Understand & Agree — Enter Simulation"

## 6.3 Tor Launch Animation

### 11-Step Progress (5% → 100%):
1. "Initializing secure browser..."
2. "Generating encryption keys..."
3. "Connecting to relay network..."
4. "Establishing guard node..."
5. "Building circuit path..."
6. "Connecting to middle relay..."
7. "Routing through exit node..."
8. "Verifying network connection..."
9. "Loading dark web modules..."
10. "Finalizing secure connection..."
11. "Connection established!"

### Console Logs:
```
[SYSTEM] Loading secure browser v3.2.1...
[CRYPTO] Generating 4096-bit RSA key pair...
[NETWORK] Connecting to guard relay: Relay-A (10.0.0.1)...
[CIRCUIT] Path: You → Guard → Middle → Exit → Internet
[NETWORK] Exit node IP: 10.0.0.{random}
[SYSTEM] Connection verified. Ready.
```

### Circuit Display:
```
You → 🌐 This Browser
  → 🇫🇮 Guard: 10.0.0.1 (Relay-A)
  → 🇩🇪 Middle: 10.0.0.2 (Relay-B)
  → 🇳🇱 Exit: 10.0.0.3 (Relay-C)
```

## 6.4 Hidden Wiki

### 6 Categories with 27 Total Links:

**Financial Services (5 links):**
| Name | Status | Upvotes | Last Seen |
|------|--------|---------|-----------|
| Lazarus Exchange | SCAM | 234 | 2h ago |
| Wasabi Tumbler | ONLINE | 1,892 | 5m ago |
| Carding Academy | SEIZED | 0 | 30d ago |
| BTC Generator Pro | SCAM | 89 | 1d ago |
| LocalMonero | ONLINE | 3,421 | 1m ago |

**Anonymity & Privacy (5 links):**
| Name | Status | Upvotes | Last Seen |
|------|--------|---------|-----------|
| PGP Key Server | ONLINE | 2,156 | 10m ago |
| Tor Metrics Portal | ONLINE | 4,523 | 2m ago |
| Tails OS | ONLINE | 8,921 | 1m ago |
| Mullvad VPN | ONLINE | 6,234 | 3m ago |
| OnionShare | ONLINE | 1,876 | 15m ago |

**Cracked Software (4 links):**
| Name | Status | Upvotes | Last Seen |
|------|--------|---------|-----------|
| Windows Activator | SCAM | 156 | 3h ago |
| IDM Full Patch | SCAM | 234 | 2h ago |
| Office 365 Keys | SEIZED | 0 | 60d ago |
| Adobe CC Suite | SCAM | 89 | 1d ago |

**Malware & Exploits (4 links):**
| Name | Status | Upvotes | Last Seen |
|------|--------|---------|-----------|
| RaaS Builder Kit | ONLINE | 3,456 | 30m ago |
| Zero-Day Market | ONLINE | 2,891 | 1h ago |
| Botnet-as-Service | SEIZED | 0 | 45d ago |
| Emotet Loader | ONLINE | 1,234 | 2h ago |

**Forums (4 links):**
| Name | Status | Upvotes | Last Seen |
|------|--------|---------|-----------|
| BreachForums v3 | SEIZED | 0 | 90d ago |
| Exploit.in | ONLINE | 5,678 | 5m ago |
| XSS.is | ONLINE | 4,321 | 10m ago |
| Dread | ONLINE | 7,890 | 1m ago |

**Legitimate Services (3 links):**
| Name | Status | Upvotes | Last Seen |
|------|--------|---------|-----------|
| ProtonMail | ONLINE ✓ | 12,345 | 1m ago |
| Signal | ONLINE ✓ | 9,876 | 1m ago |
| Keybase | ONLINE ✓ | 3,456 | 5m ago |

### Link Click Modal:
Shows danger explanation, educational warning, and "This is a simulation" disclaimer.

## 6.5 Marketplace

### 6 Products:

| Product | Price | Vendor | Rating | Sales |
|---------|-------|--------|--------|-------|
| Stolen Database (10M records) | ₿0.0523 | DataMiner_42 | ⭐ 4.2 | 89 |
| RaaS Builder Kit | ₿0.1200 | CryptoLocker_dev | ⭐ 3.8 | 23 |
| Fake Documents Package | ₿0.0834 | IDForger_Pro | ⭐ 4.5 | 156 |
| Zero-Day Exploit (CVE-2024-XXXX) | ₿2.5000 | ShadowBroker0 | ⭐ 4.9 | 7 |
| Stresser Pro (DDoS) | ₿0.0345 | BotMaster_X | ⭐ 3.2 | 312 |
| Credential Stuffing Pack | ₿0.0156 | ComboRunner | ⭐ 4.1 | 445 |

### Buy Flow:
1. Product detail modal with educational warnings
2. "Buy Now" → Checkout page with fake BTC address
3. "Payment Sent!" (3-second delay)
4. "SCAM DETECTED" modal — explains that 90% of dark web markets are scams

## 6.6 Forum

### 6 Threads:

| Thread | Author | Role | Replies | Views | Tags |
|--------|--------|------|---------|-------|------|
| "Welcome to the Forum" | Admin_System | Moderator | 45 | 12,890 | pinned, announcement |
| "Best VPN for 2024?" | PrivacySeeker | Member | 23 | 4,567 | vpn, privacy |
| "Review: Wasabi Tumbler" | CryptoClean | VIP | 67 | 8,923 | bitcoin, mixer |
| "How to stay anonymous?" | Newbie_2024 | Member | 89 | 15,678 | anon, beginner |
| "RDP Brute Force Tips" | HackNinja | Member | 12 | 2,345 | rdp, attack |
| "Data Broker Opt-Out Guide" | PrivacyPro | VIP | 156 | 23,456 | privacy, guide |

### Thread Content:
Each thread shows full post content + educational notes explaining why this content is dangerous/illegal.

## 6.7 Chat Room

### IRC-Style Interface:
- Pre-scripted bot messages every 5 seconds
- User can type messages
- Commands: `/help`, `/ask {topic}`

### FAQ Topics (21):
`tor`, `dark web`, `silk road`, `bitcoin`, `marketplace`, `phishing`, `malware`, `encryption`, `forensics`, `career`, `oscp`, `bug bounty`, `ransomware`, `vpn`, `signal`, `protonmail`, `hacking`, `password`, `2fa`, `data breach`

### Example Response:
```
User: /ask tor
Bot: Encrypted browsers route your traffic through 3 encrypted relays. They are legitimate 
privacy tools used by journalists, activists, and law enforcement. The dark web is just a 
small part of what they host.
```

## 6.8 Mixer

### Flow:
1. Shows fake deposit address and output address
2. "Mix Coins" button
3. 2-second delay
4. "SIMULATION BLOCKED" modal — explains blockchain analysis and why mixing doesn't guarantee anonymity

## 6.9 Education

### 5 Modules:

**Module 1: How Encrypted Browsers Work**
- Circuit Building (Guard → Middle → Exit)
- Encryption Layers (3 layers of onion routing)
- Exit Node Risks
- What Can Go Wrong

**Module 2: Real-World Takedowns**
- Silk Road (2013) — operator caught via email reuse
- AlphaBay / Hansa (2017) — Operation Bayonet
- Blockchain Analysis — how companies trace Bitcoin
- International Cooperation — MLATs and cross-border ops

**Module 3: Digital Forensics**
- Blockchain Analysis
- Metadata Extraction
- Browser Fingerprinting
- Correlation Attacks

**Module 4: Legal Framework**
- US Laws (CFAA, 18 U.S.C. § 1030)
- EU & International (NIS2, Budapest Convention)
- Egyptian Law 175/2018
- Real Penalties (prison sentences, fines)

**Module 5: Legal Career Paths**
- Penetration Tester ($75K-$150K/yr)
- SOC Analyst ($60K-$120K/yr)
- Digital Forensics ($80K-$160K/yr)
- Bug Bounty Hunter ($50K-$500K+/yr)
- Security Consultant ($100K-$250K/yr)

## 6.10 Debrief

### Security Tips (10):
1. Use unique passwords for every account
2. Enable 2FA everywhere
3. Keep software updated
4. Be skeptical of unsolicited messages
5. Use encrypted communications
6. Monitor your accounts regularly
7. Use a VPN on public WiFi
8. Back up your data
9. Learn about social engineering
10. Report suspicious activity

---

# 7. Cybersecurity Hub — Complete Reference

**File:** `app/components/cyber-hub/CyberHubContent.tsx` (610 lines)

## 12 Tabs:

### Tab 1: Career Paths
6 career paths with 4 milestones each, progress tracking in localStorage:

1. **Blue Team (Defensive Security)**
   - Milestone 1: CompTIA Security+ (3 months)
   - Milestone 2: CEH + SOC Analyst cert (6 months)
   - Milestone 3: CCNA + Linux admin (9 months)
   - Milestone 4: CISSP + cloud security (12 months)

2. **Red Team (Offensive Security)**
   - Milestone 1: CompTIA Security+ (3 months)
   - Milestone 2: OSCP preparation (6 months)
   - Milestone 3: OSCP certification (9 months)
   - Milestone 4: OSWE + advanced pentesting (12 months)

3. **Purple Team (Combined)**
4. **GRC (Governance, Risk, Compliance)**
5. **Cloud Security**
6. **DevSecOps**

### Tab 2: Current Threats
6 threats with severity levels:

| Threat | Severity | Description |
|--------|----------|-------------|
| Supply Chain Attacks | Critical | Compromised software updates |
| AI-Powered Phishing | High | Deepfake voice/video phishing |
| Zero-Day Exploits | Critical | Unknown vulnerabilities |
| Ransomware-as-a-Service | Critical | RaaS platforms for criminals |
| LLM Jailbreaks | High | AI safety bypasses |
| Quishing | High | QR code phishing |

### Tab 3: Security Tools
12 tools with descriptions:

| Tool | Category | Purpose |
|------|----------|---------|
| Nmap | Network | Port scanning, service detection |
| Wireshark | Network | Packet analysis |
| Burp Suite | Web | Web application testing |
| Metasploit | Exploit | Exploit framework |
| John the Ripper | Password | Password cracking |
| BloodHound | AD | Active Directory analysis |
| Mimikatz | Credentials | Credential extraction |
| Sliver | C2 | Command & control |
| Havoc | C2 | Advanced C2 framework |
| RTL-SDR | Hardware | Software-defined radio |
| HackRF One | Hardware | RF analysis |
| Proxmark3 | Hardware | RFID/NFC cloning |

### Tab 4: Red Flags
8 danger signs:

1. **Urgency Tactics** — "Act now or lose access!"
2. **Suspicious Sender** — Unknown or spoofed email address
3. **Unexpected Attachments** — .exe, .scr, .zip files
4. **Unusual Traffic Patterns** — Spike in network activity
5. **Failed Login Attempts** — Multiple failed logins from different IPs
6. **Privilege Escalation** — Unauthorized admin access
7. **USB Drops** — Found USB drives left intentionally
8. **Authority Impersonation** — Fake IT support calls

### Tab 5: Hidden Gems (Advanced Knowledge)
9 advanced topics:

1. **Hardware Attacks** — TEMPEST, cold boot, evil maid
2. **Covert Channels** — Storage, timing, network channels
3. **Advanced Persistence** — UEFI rootkits, firmware implants
4. **Cloud Side-Channel** — VM co-location, cache attacks
5. **Memory Forensics** — Volatility, RAM analysis
6. **Kernel Rootkits** — DKOM, hooking, direct kernel objects
7. **Supply Chain Poisoning** — Dependency confusion, typosquatting
8. **AD Attack Paths** — Kerberoasting, AS-REP roasting
9. **Advanced LOLBAS** — Living-off-the-land binaries

### Tab 6: Real Stories (Case Studies)
5 real-world incidents:

| Year | Incident | Impact |
|------|----------|--------|
| 2017 | Equifax | 147M records, $1.4B cost |
| 2020 | SolarWinds | 18,000 organizations, government agencies |
| 2021 | Colonial Pipeline | Fuel shortage, $4.4M ransom |
| 2023 | MOVEit | 2,500+ organizations, 60M+ records |
| 2023 | MGM Resorts | $100M+ loss, 10 days downtime |

### Tab 7: WiFi Security
5 attacks + hardening checklist:

**Attacks:**
1. Evil Twin — Fake access point
2. PMKID — Clientless attack
3. KRACK — WPA2 key reinstallation
4. Dragonblood — WPA3 downgrade
5. Karma — Evil twin with response

**Hardening Checklist (10 items):**
1. Change default router credentials
2. Use WPA3 or WPA2-AES
3. Disable WPS
4. Enable MAC filtering
5. Create guest network
6. Update firmware regularly
7. Disable remote management
8. Use strong WiFi password
9. Enable network isolation
10. Monitor connected devices

### Tab 8: Hacking Concepts
7 concepts:

1. **Social Engineering** — Pretexting, baiting, tailgating
2. **Lock Picking** — Pin tumbler, wafer, tubular locks
3. **RFID/NFC Cloning** — Proxmark3, card emulation
4. **Car Hacking** — CAN bus, OBD-II, keyless relay
5. **Drone Interception** — GPS spoofing, protocol analysis
6. **USB Attacks** — Rubber Ducky, BadUSB, HID injection
7. **Web Exploitation** — XSS, CSRF, SSRF, SQLi

### Tab 9: Security Tips
9 tips from beginner to expert:

1. Start with CompTIA Security+
2. Practice on HackTheBox/TryHackMe
3. Learn Linux command line
4. Set up a home lab
5. Read security news daily
6. Join CTF competitions
7. Get OSCP certified
8. Contribute to open source
9. Mentor others

### Tab 10: Self-Assessment
5 quiz questions:

1. What is the first step in a penetration test?
   - a) Scanning (correct)
   - b) Exploitation
   - c) Enumeration
   - d) Reconnaissance

2. Which type of vulnerability allows attackers to inject SQL code?
   - a) XSS
   - b) SQL Injection (correct)
   - c) CSRF
   - d) SSRF

3. What protocol is used for encrypted email?
   - a) FTP
   - b) SMTP
   - c) PGP/GPG (correct)
   - d) HTTP

4. What is a zero-day vulnerability?
   - a) A virus that activates on day zero
   - b) A vulnerability unknown to the vendor (correct)
   - c) A patched security hole
   - d) A type of malware

5. Which port is used by HTTPS?
   - a) 80
   - b) 443 (correct)
   - c) 8080
   - d) 22

---

# 8. AI Chat System

## Two Implementations:

### 8.1 Global Floating Chat
**File:** `app/components/global-ai-chat.tsx`
- Floating button (bottom-right, z-90)
- 380px chat panel
- Hidden on `/security-ai` page
- Same API calls as full-page version
- Mutually exclusive with Notifications (custom events)

### 8.2 Full-Page Chat
**File:** `app/security-ai/page.tsx`
- Full-screen chat interface
- ShaderBackground visual effect
- 5 suggested questions
- Unlimited messages (no localStorage limit)

### Thinking Animation:
5 steps cycling every 1200ms:
1. "Analyzing your question..."
2. "Accessing neural pathways..."
3. "Querying security database..."
4. "Cross-referencing threat intel..."
5. "Generating response..."

### Message Format:
```typescript
{
  role: 'user' | 'assistant',
  content: string,
  provider?: string  // "NVIDIA" | "Kimi" | "OpenRouter" | "Ollama"
}
```

---

# 9. Contact & Email System

**File:** `app/sections/Contact.tsx`

### EmailJS Configuration:
- **Service ID:** `service_itfgvfb`
- **Template ID:** `template_6vgdqzr`
- **Public Key:** `6aUg1rf33INnxz7Pl`

### Form Fields:
| Field | Type | Required |
|-------|------|----------|
| `from_name` | text | Yes |
| `from_email` | email | Yes |
| `subject` | text | Yes |
| `message` | textarea | Yes |

### Submission:
```typescript
emailjs.sendForm('service_itfgvfb', 'template_6vgdqzr', formRef.current, '6aUg1rf33INnxz7Pl')
```

### Success: Shows "Sent!" for 4 seconds
### Error: Shows "Error sending" for 4 seconds

### Contact Information:
- Email: ahmed.ezzat@students.du.edu.eg
- Phone: +20 102 473 8360
- Location: Damietta, Egypt
- LinkedIn: /in/ahmed-ezzat01/
- GitHub: /ahmedezzat01
- Facebook: /ahmed.ezzat.0001
- Instagram: /ahmed.ezzaat.01/

---

# 10. Notifications System

**File:** `app/components/notifications.tsx`

### Fetch:
- Endpoint: `GET /api/security-news`
- Initial fetch: 1 second after mount
- Re-fetch: Every 60 seconds (if last fetch > 300s ago)

### Notification Types:
- First 2 items → `critical` (red)
- Next 2 items → `warning` (yellow)
- Rest → `info` (blue)

### Features:
- Deduplication by title
- Max 15 notifications
- Unread count badge (max "9+")
- "Mark all read" button
- Individual delete
- External link per notification

### UI:
- Fixed bottom-right Bell button
- Dropdown panel with notification list
- Custom events: `close-ai-chat` (dispatches when opened)

---

# 11. Data Files

## 11.1 Translations (`lib/translations.ts`)
- 495 lines
- 3 languages: English, Arabic, Spanish
- **Note:** Only English is active (LanguageProvider hardcoded)

## 11.2 Safe Gateway Data (`lib/safe-gateway-data.ts`)
- 5 fake onion URLs (.sim)
- 6 wiki categories with 27 links
- 6 market products
- 6 forum threads
- 15 chat messages
- 5 educational modules
- 10 security tips
- 21 FAQ entries

## 11.3 Team Data (`lib/team-data.ts`)
- CEO: Ahmed Ezzat
- VPs: Dr. Mariam, Abdelhamid, Mohamed
- Committee heads and members

## 11.4 Security Sites Data (`lib/security-sites-data.ts`)
- 47 cybersecurity websites
- Categories: Learning, Tools, News, Community, Research, Practice

## 11.5 PentesterFlow Data (`lib/pentesterflow-data.ts`)
- Feature data, challenges, capabilities
- Providers, built-in skills
- Slash commands, CLI flags, tools, config paths

## 11.6 Cyber Hub Data (`lib/cyber-hub-data.ts`)
- 6 career paths (4 milestones each)
- 6 threats
- 12 tools
- 8 red flags
- 5 case studies
- 9 advanced knowledge sections
- 5 WiFi attacks
- 7 hacking concepts
- 9 tips
- 5 quiz questions

---

# 12. Configuration & Theme

### Color Palette:
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Black | #000000 | Backgrounds |
| Primary White | #ffffff | Text |
| Cyber Red | #df2531 | Primary accent |
| Dark Red | #b01e28 | Buttons |
| Hover Red | #8b1520 | Button hover |

### Typography:
- **Sans:** Inter (300-900 weights)
- **Mono:** JetBrains Mono (400-700 weights)

### Custom CSS Effects:
- `.cyber-cursor` — Custom ring cursor
- `.glass-panel` — Glassmorphism (blur 6px)
- `.neon-text` — Neon glow effect
- `.scanline` — CRT scanline overlay
- `.matrix-bg` — Matrix rain background
- `.animated-border` — Animated border gradient

### Global Styles:
- `cursor: none !important` on `*` (hides native cursor)
- Dark mode via class strategy
- CSS variables for theme colors

---

# 13. Security Findings

### HIGH: Exposed API Keys
4 API keys hardcoded in `app/api/ask-ai/route.ts`:
- NVIDIA API key
- Moonshot/Kimi API key
- OpenRouter API key
- Ollama API key

### MEDIUM: Exposed EmailJS Credentials
In `app/sections/Contact.tsx`:
- Service ID, Template ID, Public Key

### LOW: Fake MD5 Hash
In `HashGenerator`: MD5 output is random hex, not a real hash.

### INFO: Duplicate Pages
`/cyber-hub` and `/security-hub` render identical content.

### INFO: Unused Language Support
Arabic and Spanish translations exist but are not wired up.

---

*Document generated from codebase analysis. All API keys shown are for reference only.*
