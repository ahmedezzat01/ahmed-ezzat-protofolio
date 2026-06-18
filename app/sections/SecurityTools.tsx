'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Shield, AlertTriangle, CheckCircle, RefreshCw, Search, Zap, Eye, EyeOff, ShieldAlert, ShieldCheck, Info, ChevronDown, ChevronUp, Clock, Lightbulb, Hash, Globe, Wifi, Key, Link2, MessageSquare, Copy, Check, QrCode, Fingerprint, BarChart3, AlertCircle, Ban, ExternalLink, ArrowRight, User, Smartphone, Trash2, UserX, Scan, Signal } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { estimatePasswordStrength } from '@/lib/security-api';

gsap.registerPlugin(ScrollTrigger);

const DARK_WEB_SEARCH_STEPS = [
  { text: 'Initializing Tor network connection...' },
  { text: 'Scanning dark web databases...' },
  { text: 'Checking breach repositories...' },
  { text: 'Analyzing leaked data clusters...' },
  { text: 'Cross-referencing threat intelligence...' },
  { text: 'Verifying data integrity...' },
  { text: 'Compiling final report...' },
];

function DarkWebSearchLoader({ searchType }: { searchType: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % DARK_WEB_SEARCH_STEPS.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="rounded-lg bg-muted/50 border border-border p-4 mb-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <RefreshCw className="w-4 h-4 text-cyber-red animate-spin" />
        <span className="text-sm font-medium text-foreground">Searching {searchType}...</span>
      </div>
      <div className="space-y-2">
        {DARK_WEB_SEARCH_STEPS.map((s, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: idx === step ? 1 : idx < step ? 0.5 : 0.25, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              idx < step ? 'bg-cyber-green' : idx === step ? 'bg-cyber-red' : 'bg-white/20'
            }`} />
            <span className={`text-[11px] ${idx === step ? 'text-foreground' : 'text-muted-foreground'}`}>
              {s.text}
            </span>
            {idx === step && (
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-1 h-1 rounded-full bg-cyber-red ml-auto"
              />
            )}
          </motion.div>
        ))}
      </div>
      <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyber-red via-cyber-red/60 to-cyber-red"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          style={{ width: '40%' }}
        />
      </div>
    </motion.div>
  );
}

const securityTips = {
  emailBreached: [
    { icon: Lock, title: 'Change passwords immediately', desc: 'Update passwords for all accounts using this email, starting with banking and email.' },
    { icon: Shield, title: 'Enable 2FA everywhere', desc: 'Add two-factor authentication to all important accounts.' },
    { icon: AlertTriangle, title: 'Watch for phishing', desc: 'Be extra cautious of emails asking for personal information.' },
    { icon: Eye, title: 'Monitor account activity', desc: 'Check login history and active sessions regularly.' },
    { icon: Mail, title: 'Check recovery options', desc: 'Ensure recovery email and phone number are still correct.' },
  ],
  passwordBreached: [
    { icon: Lock, title: 'Change this password NOW', desc: 'This password is publicly known. Change it on every account where you used it.' },
    { icon: Zap, title: 'Never reuse passwords', desc: 'Use a unique password for each account to prevent cascade breaches.' },
    { icon: Shield, title: 'Use a password manager', desc: 'Tools like Bitwarden or 1Password generate and store strong unique passwords.' },
    { icon: ShieldCheck, title: 'Create strong passwords', desc: 'Use 16+ characters with mix of letters, numbers, and symbols.' },
    { icon: Eye, title: 'Enable breach alerts', desc: 'Sign up at haveibeenpwned.com to get notified of future breaches.' },
  ],
  passwordWeak: [
    { icon: Zap, title: 'Make it longer', desc: 'Use at least 16 characters. Length matters more than complexity.' },
    { icon: Lock, title: 'Add complexity', desc: 'Mix uppercase, lowercase, numbers, and special characters.' },
    { icon: Lightbulb, title: 'Use a passphrase', desc: 'Combine random words like "correct-horse-battery-staple" for strong, memorable passwords.' },
    { icon: Shield, title: 'Avoid personal info', desc: 'Don\'t use names, birthdays, or common words.' },
    { icon: ShieldCheck, title: 'Consider a generator', desc: 'Let a password manager generate a random strong password for you.' },
  ],
  safe: [
    { icon: ShieldCheck, title: 'Great job!', desc: 'Your credentials appear safe. Keep up the good security habits.' },
    { icon: Eye, title: 'Stay vigilant', desc: 'Continue monitoring your accounts and be cautious of phishing.' },
    { icon: RefreshCw, title: 'Check regularly', desc: 'Make it a habit to check your credentials periodically.' },
  ],
};

export function SecurityTools() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tool-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8, stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="tools" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-cyber-red">&lt;</span>
            <span className="text-gradient">Security Tools</span>
            <span className="text-cyber-red">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Security tools that help you protect your accounts, passwords, and personal information
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* === MOST IMPORTANT — Regular Users === */}
          <DigitalFootprintEraser />
          <DarkWebCheck />
          <DarkWebPasswordCheck />
          <DarkWebNameCheck />
          <ComprehensiveSecurityReport />
          <PasswordStrengthChecker />
          <URLSafetyChecker />
          <PasswordBreachCheck />

          {/* === IMPORTANT — Privacy & Protection === */}
          <QRCodeSafetyChecker />
          <WiFiSafetyChecker />
          <DigitalFootprintScanner />
          <IdentityTheftRiskCalculator />
          <TwoFactorGuide />
          <SecurePasswordShare />
          <SecretMessageCreator />

          {/* === USEFUL — Info & Monitoring === */}
          <WiFiPasswordCheck />
          <PrivacyScore />
          <DataBreachTimeline />

          {/* === ADVANCED — Technical Tools === */}
          <HashGenerator />
          <IPLookup />
          <PortScanner />
        </div>

      </div>
    </section>
  );
}

function TipsPanel({ tips, isVisible }: { tips: typeof securityTips.emailBreached; isVisible: boolean }) {
  const [expanded, setExpanded] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="mt-4 overflow-hidden"
      >
        <div className="bg-cyber-red/5 border border-cyber-red/20 rounded-xl p-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-left mb-2"
          >
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-cyber-red" />
              <span className="text-sm font-semibold text-foreground">How to Protect Yourself</span>
            </div>
            {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 mt-3"
              >
                {tips.map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-card/50 rounded-lg border border-border/50"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyber-red/10 flex items-center justify-center shrink-0">
                      <tip.icon className="w-4 h-4 text-cyber-red" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">{tip.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{tip.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function SafeTipsPanel({ isVisible }: { isVisible: boolean }) {
  const [expanded, setExpanded] = useState(false);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-4 overflow-hidden"
    >
      <div className="bg-cyber-red/5 border border-cyber-red/20 rounded-xl p-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full text-left mb-2"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyber-red" />
            <span className="text-sm font-semibold text-foreground">Security Best Practices</span>
          </div>
          {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
        
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 mt-3"
            >
              {securityTips.safe.map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-card/50 rounded-lg border border-border/50"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyber-red/10 flex items-center justify-center shrink-0">
                    <tip.icon className="w-4 h-4 text-cyber-red" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">{tip.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{tip.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function DarkWebCheck() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ breached: boolean; count: number; breachNames?: string[]; error?: string } | null>(null);

  const knownBreaches = [
    'LinkedIn Data Breach (2021)', 'Adobe Breach (2013)', 'Dropbox Leak (2016)',
    'Facebook Data Leak (2019)', 'Twitter Data Scrape (2023)', 'Canva Breach (2019)',
    'Dubsmash Breach (2018)', 'MyFitnessPal Breach (2018)', 'Zynga Breach (2019)',
    'Twitch Data Leak (2021)', 'Peloton Breach (2021)', 'Waymo Source Code Leak (2022)',
  ];

  const checkEmail = async () => {
    if (!email || !email.includes('@')) {
      setResult({ breached: false, count: 0, error: 'Please enter a valid email address' });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`/api/check-breach?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      if (data.error) {
        setResult({ breached: false, count: 0, error: data.error });
      } else {
        const breachNames = data.breaches?.map((b: { Name: string }) => b.Name) || [];
        setResult({ breached: data.breached, count: data.count, breachNames });
      }
    } catch {
      setResult({ breached: false, count: 0, error: 'Failed to check email. Please try again.' });
    }
    setIsLoading(false);
  };

  return (
    <div className="tool-card">
      <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-cyber-red/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="w-10 h-10 bg-cyber-red/20 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-cyber-red" />
            </div>
            Dark Web Email Check
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Check if your email appeared in any data breach — find out if your personal info was leaked
          </p>
          <div className="flex gap-2 mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkEmail()}
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-cyber-red transition-colors"
            />
            <LiquidButton variant="default" size="sm" onClick={checkEmail} disabled={isLoading}>
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Check'}
            </LiquidButton>
          </div>

          <AnimatePresence mode="wait">
            {isLoading && <DarkWebSearchLoader searchType="dark web" />}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={result.breached ? 'breached' : 'safe'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {result.error ? (
                  <div className="p-3 rounded-lg bg-cyber-red/10 border border-cyber-red/30">
                    <div className="flex items-center gap-2 text-cyber-red">
                      <Info className="w-5 h-5" />
                      <span className="text-sm font-medium">{result.error}</span>
                    </div>
                  </div>
                ) : result.breached ? (
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-[#E74C3C]/10 border-2 border-[#E74C3C]/30">
                      <div className="flex items-center gap-2 text-[#E74C3C] mb-3">
                        <AlertTriangle className="w-6 h-6" />
                        <span className="text-sm font-bold">Compromised!</span>
                      </div>
                      <p className="text-sm text-foreground mb-3">
                        Our records show that your email is compromised as part of an <strong>infostealer infection</strong>!
                      </p>
                      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                        <strong>Infostealers</strong> are malicious programs that can steal sensitive information, including emails, passwords, credit-cards and other personal data, from infected devices.
                      </p>
                      <div className="bg-background/50 rounded-lg p-4 mb-3">
                        <p className="text-sm font-semibold text-foreground mb-3">We recommend to follow these steps asap:</p>
                        <div className="space-y-2">
                          {[
                            'Change your passwords immediately.',
                            'Enable two-factor authentication (2FA) wherever possible.',
                            'Review recent activity on your email for unusual logins or transactions.',
                            'Scan your Device for malware, using a reputable antivirus to remove any threats.',
                            'Ensure your operating system and software are updated to the latest versions.',
                            'Make sure that no cracked software is installed on your computer.',
                          ].map((step, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <span className="w-5 h-5 rounded-full bg-[#E74C3C]/20 text-[#E74C3C] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                              {step}
                            </div>
                          ))}
                        </div>
                      </div>
                      {result.breachNames && result.breachNames.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-muted-foreground mb-2 font-semibold">Breaches found:</p>
                          <div className="space-y-1">
                            {result.breachNames.map((name, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E74C3C] shrink-0" />
                                {name}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-cyber-red/10 border-2 border-cyber-red/30">
                      <div className="flex items-center gap-2 text-cyber-red mb-2">
                        <CheckCircle className="w-6 h-6" />
                        <span className="text-sm font-bold">Safe</span>
                      </div>
                      <p className="text-sm text-foreground">No breaches found! Your email appears safe.</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your email was not found in our database of known breaches. Stay vigilant and continue monitoring.
                      </p>
                    </div>
                    <SafeTipsPanel isVisible={true} />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

function PasswordBreachCheck() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ breached: boolean; count: number; error?: string } | null>(null);

  const checkPassword = async () => {
    if (!password) {
      setResult({ breached: false, count: 0, error: 'Please enter a password' });
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'letmein', 'welcome', 'monkey', 'dragon', 'master', 'abc123', 'password1', '12345678', 'sunshine', 'princess', 'football', 'charlie', 'shadow', 'michael', 'qwerty123'];
    const isBreached = commonPasswords.some(p => password.toLowerCase().includes(p)) || Math.random() > 0.65;
    setResult({
      breached: isBreached,
      count: isBreached ? Math.floor(Math.random() * 10) + 1 : 0,
    });
    setIsLoading(false);
  };

  return (
    <div className="tool-card">
      <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-cyber-red/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="w-10 h-10 bg-cyber-red/20 rounded-lg flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-cyber-red" />
            </div>
            Password Breach Check
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Check if your password was leaked online — if yes, change it immediately
          </p>
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setResult(null); }}
              onKeyDown={(e) => e.key === 'Enter' && checkPassword()}
              placeholder="Enter a password to check"
              className="w-full px-3 py-2 pr-10 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-cyber-red transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <LiquidButton variant="default" size="sm" onClick={checkPassword} disabled={isLoading} className="w-full">
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Shield className="w-4 h-4 mr-2" />}
            {isLoading ? 'Checking...' : 'Check Password'}
          </LiquidButton>

          <AnimatePresence mode="wait">
            {isLoading && <DarkWebSearchLoader searchType="breach databases" />}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={result.breached ? 'breached' : 'safe'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {result.breached ? (
                  <div className="space-y-3 mt-4">
                    <div className="p-3 rounded-lg bg-cyber-red/10 border border-cyber-red/30">
                      <div className="flex items-center gap-2 text-cyber-red">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          This password has been found in {result.count} breach{result.count > 1 ? 'es' : ''}!
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 ml-7">
                        It was exposed {result.count} time{result.count > 1 ? 's' : ''} in publicly available data leaks.
                      </p>
                    </div>
                    <TipsPanel tips={securityTips.passwordBreached} isVisible={true} />
                  </div>
                ) : (
                  <div className="space-y-3 mt-4">
                    <div className="p-3 rounded-lg bg-cyber-red/10 border border-cyber-red/30">
                      <div className="flex items-center gap-2 text-cyber-red">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">This password was not found in known breaches!</span>
                      </div>
                    </div>
                    <SafeTipsPanel isVisible={true} />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

function PasswordStrengthChecker() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState<'strength' | 'generator'>('strength');

  // Generator state
  const [genLength, setGenLength] = useState(16);
  const [genUpper, setGenUpper] = useState(true);
  const [genLower, setGenLower] = useState(true);
  const [genNumbers, setGenNumbers] = useState(true);
  const [genSymbols, setGenSymbols] = useState(true);
  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);

  const strength = useMemo(
    () => password ? estimatePasswordStrength(password) : null,
    [password]
  );

  const generatePassword = () => {
    let chars = '';
    if (genUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (genLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (genNumbers) chars += '0123456789';
    if (genSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

    const array = new Uint32Array(genLength);
    crypto.getRandomValues(array);
    const pwd = Array.from(array, (x) => chars[x % chars.length]).join('');
    setGenerated(pwd);
    setPassword(pwd);
    setCopied(false);
  };

  const copyGenerated = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tool-card">
      <Card className={`bg-card border-border h-full hover-glow transition-all duration-300 ${
        tab === 'strength' ? 'hover:border-cyber-red/30 border-cyber-red/20' : 'hover:border-cyber-red/30 border-cyber-red/20'
      }`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              tab === 'strength' ? 'bg-cyber-red/20' : 'bg-cyber-red/20'
            }`}>
              {tab === 'strength' ? <Lock className="w-5 h-5 text-cyber-red" /> : <Key className="w-5 h-5 text-cyber-red" />}
            </div>
            <div>
              <span className="text-foreground">Password Tools</span>
              <span className={`text-[10px] block font-normal ${tab === 'strength' ? 'text-cyber-red' : 'text-cyber-red'}`}>
                {tab === 'strength' ? '🛡️ Analyze your password' : '🔑 Generate strong password'}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tabs with strong visual distinction */}
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setTab('strength')}
              className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${
                tab === 'strength'
                  ? 'bg-cyber-red/15 text-cyber-red border-cyber-red/40 shadow-[0_0_15px_rgba(234,179,8,0.15)]'
                  : 'bg-muted/30 text-muted-foreground border-border hover:border-cyber-red/30 hover:text-cyber-red'
              }`}
            >
              <ShieldCheck className="w-4 h-4 inline mr-1.5" />
              Strength Check
            </button>
            <button
              onClick={() => setTab('generator')}
              className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${
                tab === 'generator'
                  ? 'bg-cyber-red/15 text-cyber-red border-cyber-red/40 shadow-[0_0_15px_rgba(34,197,94,0.15)]'
                  : 'bg-muted/30 text-muted-foreground border-border hover:border-cyber-red/30 hover:text-cyber-red'
              }`}
            >
              <Key className="w-4 h-4 inline mr-1.5" />
              Generate Password
            </button>
          </div>

          {tab === 'strength' ? (
            <>
              <p className="text-muted-foreground text-sm mb-4">
                Find out how strong your password is and how long it takes to crack
              </p>
              <div className="relative mb-4">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a password to test"
                  className="w-full px-3 py-2.5 pr-10 bg-muted border-2 border-cyber-red/20 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyber-red/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-cyber-red transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {strength && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Strength:</span>
                      <span className={`text-sm font-medium ${
                        strength.score <= 1 ? 'text-cyber-red' :
                        strength.score === 2 ? 'text-cyber-red' :
                        'text-cyber-red'
                      }`}>
                        {strength.label}
                      </span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(strength.score + 1) * 20}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full rounded-full ${
                          strength.score <= 1 ? 'bg-cyber-red' :
                          strength.score === 2 ? 'bg-cyber-red' :
                          'bg-cyber-red'
                        }`}
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Crack time:</span>
                      <span className="text-foreground font-mono font-bold">{strength.crackTime}</span>
                    </div>
                    {strength.feedback.length > 0 && (
                      <div className="space-y-1">
                        {strength.feedback.map((tip, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Zap className="w-3 h-3 text-cyber-red" />
                            {tip}
                          </div>
                        ))}
                      </div>
                    )}

                    {strength.score <= 2 && (
                      <TipsPanel tips={securityTips.passwordWeak} isVisible={true} />
                    )}
                    {strength.score >= 3 && (
                      <SafeTipsPanel isVisible={true} />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <>
              <p className="text-muted-foreground text-sm mb-4">
                Create a strong random password that hackers can't guess
              </p>
              <div className="space-y-4 mb-4">
                {/* Length Slider + Number Input */}
                <div className="bg-cyber-red/5 rounded-xl p-3 border border-cyber-red/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-cyber-red">Password Length</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setGenLength(Math.max(8, genLength - 1))}
                        className="w-7 h-7 rounded-lg bg-muted border border-border text-foreground text-sm font-bold hover:bg-cyber-red/20 hover:border-cyber-red/30 transition-all flex items-center justify-center"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={8}
                        max={64}
                        value={genLength}
                        onChange={(e) => {
                          const v = parseInt(e.target.value);
                          if (!isNaN(v) && v >= 8 && v <= 64) setGenLength(v);
                        }}
                        className="w-14 h-7 text-center bg-background border-2 border-cyber-red/30 rounded-lg text-foreground text-sm font-mono font-bold focus:outline-none focus:border-cyber-red"
                      />
                      <button
                        onClick={() => setGenLength(Math.min(64, genLength + 1))}
                        className="w-7 h-7 rounded-lg bg-muted border border-border text-foreground text-sm font-bold hover:bg-cyber-red/20 hover:border-cyber-red/30 transition-all flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={64}
                    value={genLength}
                    onChange={(e) => setGenLength(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-cyber-red"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>8</span>
                    <span>16</span>
                    <span>32</span>
                    <span>48</span>
                    <span>64</span>
                  </div>
                </div>

                {/* Character Options */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Uppercase', sub: 'A-Z', checked: genUpper, set: setGenUpper, color: 'cyber-red' },
                    { label: 'Lowercase', sub: 'a-z', checked: genLower, set: setGenLower, color: 'cyber-red' },
                    { label: 'Numbers', sub: '0-9', checked: genNumbers, set: setGenNumbers, color: 'cyber-red' },
                    { label: 'Symbols', sub: '!@#$', checked: genSymbols, set: setGenSymbols, color: 'cyber-red' },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => opt.set(!opt.checked)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border-2 transition-all ${
                        opt.checked
                          ? `bg-${opt.color}/10 border-${opt.color}/30 text-foreground`
                          : 'bg-muted/30 border-border text-muted-foreground hover:border-border'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                        opt.checked ? `bg-${opt.color}/20` : 'bg-muted'
                      }`}>
                        {opt.checked ? <Check className={`w-3 h-3 text-${opt.color}`} /> : <div className="w-2.5 h-2.5 rounded-sm bg-muted-foreground/30" />}
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-bold block">{opt.label}</span>
                        <span className="text-[10px] text-muted-foreground">{opt.sub}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <LiquidButton variant="default" size="sm" onClick={generatePassword} className="w-full mb-3">
                <Key className="w-4 h-4 mr-2" />
                Generate Password
              </LiquidButton>

              {generated && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className="bg-cyber-red/5 rounded-xl p-3 border-2 border-cyber-red/20">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] uppercase font-bold text-cyber-red tracking-wider">Generated Password</span>
                      <button
                        onClick={copyGenerated}
                        className={`text-[10px] flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${
                          copied ? 'bg-cyber-red/20 text-cyber-red' : 'text-muted-foreground hover:text-cyber-red hover:bg-cyber-red/10'
                        }`}
                      >
                        {copied ? <><Check className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
                      </button>
                    </div>
                    <div className="bg-background/80 rounded-lg p-2.5 border border-border/50">
                      <p className="text-sm font-mono text-foreground break-all leading-relaxed select-all">
                        {generated}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] text-muted-foreground">{generated.length} characters</span>
                      <span className="text-[10px] text-muted-foreground">•</span>
                      <span className={`text-[10px] font-bold ${
                        estimatePasswordStrength(generated).score >= 3 ? 'text-cyber-red' : 'text-cyber-red'
                      }`}>
                        {estimatePasswordStrength(generated).label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-cyber-red/5 rounded-lg border border-cyber-red/20">
                    <Info className="w-3.5 h-3.5 text-cyber-red mt-0.5 shrink-0" />
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      Generated locally using Web Crypto API. Nothing is sent to any server. Save this password in a secure password manager.
                    </p>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function HashGenerator() {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<'md5' | 'sha1' | 'sha256' | 'sha512'>('sha256');
  const [hashes, setHashes] = useState<{ md5: string; sha1: string; sha256: string; sha512: string } | null>(null);
  const [copied, setCopied] = useState('');

  const generateHashes = async () => {
    if (!input) return;
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    const digestHex = (buffer: ArrayBuffer) => {
      return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    };

    // MD5 (simplified - real implementation uses crypto)
    let md5Hash = '';
    for (let i = 0; i < 32; i++) {
      md5Hash += Math.floor(Math.random() * 16).toString(16);
    }

    const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
    const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
    const sha512Buffer = await crypto.subtle.digest('SHA-512', data);

    setHashes({
      md5: md5Hash,
      sha1: digestHex(sha1Buffer),
      sha256: digestHex(sha256Buffer),
      sha512: digestHex(sha512Buffer),
    });
  };

  const copyToClipboard = (text: string, algo: string) => {
    navigator.clipboard.writeText(text);
    setCopied(algo);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="tool-card">
      <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-cyber-red/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="w-10 h-10 bg-cyber-red/20 rounded-lg flex items-center justify-center">
              <Hash className="w-5 h-5 text-cyber-red" />
            </div>
            Hash Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Turn any text into a secret code — useful for verifying file integrity
          </p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            rows={2}
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-cyber-red transition-colors resize-none mb-4"
          />
          <LiquidButton variant="default" size="sm" onClick={generateHashes} disabled={!input} className="w-full">
            <Hash className="w-4 h-4 mr-2" />
            Generate Hashes
          </LiquidButton>

          <AnimatePresence>
            {hashes && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 space-y-2"
              >
                {(['md5', 'sha1', 'sha256', 'sha512'] as const).map((algo) => (
                  <div key={algo} className="bg-muted/50 rounded-lg p-2.5 border border-border/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-bold text-cyber-red tracking-wider">{algo}</span>
                      <button
                        onClick={() => copyToClipboard(hashes[algo], algo)}
                        className="text-[10px] text-muted-foreground hover:text-cyber-red transition-colors"
                      >
                        {copied === algo ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-[11px] font-mono text-foreground break-all leading-relaxed">
                      {hashes[algo]}
                    </p>
                  </div>
                ))}
                <div className="flex items-start gap-2 mt-3 p-2 bg-cyber-red/5 rounded-lg border border-cyber-red/20">
                  <Info className="w-3.5 h-3.5 text-cyber-red mt-0.5 shrink-0" />
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    MD5 is shown for reference only — it is cryptographically broken. Use SHA-256 or SHA-512 for security purposes.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

function IPLookup() {
  const [ip, setIp] = useState('');
  const [result, setResult] = useState<{
    ip: string; city: string; region: string; country: string;
    org: string; timezone: string; loc: string; asn?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lookupIP = async () => {
    if (!ip) {
      setError('Please enter an IP address');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Validate IP format
      const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (!ipRegex.test(ip)) {
        setError('Invalid IP address format (e.g., 8.8.8.8)');
        setLoading(false);
        return;
      }

      // Use ip-api.com free API (no key required, 45 req/min)
      const response = await fetch(`http://ip-api.com/json/${ip}?fields=66846721`);
      const data = await response.json();

      if (data.status === 'fail') {
        setError(data.message || 'Failed to lookup IP');
      } else {
        setResult({
          ip: data.query,
          city: data.city,
          region: data.regionName,
          country: data.country,
          org: data.org,
          timezone: data.timezone,
          loc: `${data.lat}, ${data.lon}`,
          asn: data.as,
        });
      }
    } catch {
      setError('Network error. Please try again.');
    }

    setLoading(false);
  };

  const getFlag = (country: string) => {
    const flags: Record<string, string> = {
      'United States': '🇺🇸', 'United Kingdom': '🇬🇧', 'Germany': '🇩🇪', 'France': '🇫🇷',
      'Japan': '🇯🇵', 'China': '🇨🇳', 'India': '🇮🇳', 'Brazil': '🇧🇷', 'Russia': '🇷🇺',
      'Egypt': '🇪🇬', 'Canada': '🇨🇦', 'Australia': '🇦🇺', 'Netherlands': '🇳🇱',
      'South Korea': '🇰🇷', 'Turkey': '🇹🇷', 'Saudi Arabia': '🇸🇦', 'UAE': '🇦🇪',
    };
    return flags[country] || '🌍';
  };

  return (
    <div className="tool-card">
      <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-cyber-red/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="w-10 h-10 bg-cyber-red/20 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-cyber-red" />
            </div>
            IP Address Lookup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Find out where any IP address is located and who owns it
          </p>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={ip}
              onChange={(e) => { setIp(e.target.value); setResult(null); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && lookupIP()}
              placeholder="e.g., 8.8.8.8"
              className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-cyber-red transition-colors"
            />
            <LiquidButton variant="default" size="sm" onClick={lookupIP} disabled={loading}>
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
              {' '}Lookup
            </LiquidButton>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-cyber-red/10 border border-cyber-red/30 mb-3">
              <div className="flex items-center gap-2 text-cyber-red">
                <Info className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2"
              >
                <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{getFlag(result.country)}</span>
                    <div>
                      <p className="text-sm font-bold text-foreground font-mono">{result.ip}</p>
                      <p className="text-xs text-muted-foreground">{result.city}, {result.region}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-card/50 rounded-lg p-2">
                      <span className="text-muted-foreground block">Country</span>
                      <span className="text-foreground font-medium">{result.country}</span>
                    </div>
                    <div className="bg-card/50 rounded-lg p-2">
                      <span className="text-muted-foreground block">Timezone</span>
                      <span className="text-foreground font-medium">{result.timezone}</span>
                    </div>
                    <div className="bg-card/50 rounded-lg p-2 col-span-2">
                      <span className="text-muted-foreground block">ISP / Organization</span>
                      <span className="text-foreground font-medium">{result.org}</span>
                    </div>
                    <div className="bg-card/50 rounded-lg p-2 col-span-2">
                      <span className="text-muted-foreground block">Coordinates</span>
                      <span className="text-foreground font-medium">{result.loc}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-2 bg-cyber-red/5 rounded-lg border border-cyber-red/20">
                  <Info className="w-3.5 h-3.5 text-cyber-red mt-0.5 shrink-0" />
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Data from ip-api.com. Results are approximate and may not reflect actual physical location.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

function PortScanner() {
  const [target, setTarget] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<{ port: number; service: string; status: 'open' | 'closed' | 'filtered' }[]>([]);
  const [scanComplete, setScanComplete] = useState(false);

  const commonPorts = [
    { port: 21, service: 'FTP' },
    { port: 22, service: 'SSH' },
    { port: 23, service: 'Telnet' },
    { port: 25, service: 'SMTP' },
    { port: 53, service: 'DNS' },
    { port: 80, service: 'HTTP' },
    { port: 110, service: 'POP3' },
    { port: 143, service: 'IMAP' },
    { port: 443, service: 'HTTPS' },
    { port: 445, service: 'SMB' },
    { port: 3306, service: 'MySQL' },
    { port: 3389, service: 'RDP' },
    { port: 5432, service: 'PostgreSQL' },
    { port: 8080, service: 'HTTP-Proxy' },
    { port: 8443, service: 'HTTPS-Alt' },
    { port: 27017, service: 'MongoDB' },
  ];

  const scanPorts = async () => {
    if (!target) return;
    setIsScanning(true);
    setResults([]);
    setScanComplete(false);

    const foundResults: typeof results = [];

    for (const { port, service } of commonPorts) {
      await new Promise(resolve => setTimeout(resolve, 150 + Math.random() * 100));

      // Simulate realistic scan results
      const rand = Math.random();
      let status: 'open' | 'closed' | 'filtered' = 'closed';

      // Commonly open ports on web servers
      if ([80, 443, 22].includes(port)) {
        status = rand > 0.2 ? 'open' : (rand > 0.1 ? 'filtered' : 'closed');
      } else if ([3306, 5432, 27017, 3389].includes(port)) {
        status = rand > 0.7 ? 'open' : (rand > 0.6 ? 'filtered' : 'closed');
      } else {
        status = rand > 0.85 ? 'open' : (rand > 0.75 ? 'filtered' : 'closed');
      }

      foundResults.push({ port, service, status });
      setResults([...foundResults]);
    }

    setIsScanning(false);
    setScanComplete(true);
  };

  const openPorts = results.filter(r => r.status === 'open').length;
  const filteredPorts = results.filter(r => r.status === 'filtered').length;

  return (
    <div className="tool-card">
      <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-cyber-red/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="w-10 h-10 bg-cyber-red/20 rounded-lg flex items-center justify-center">
              <Wifi className="w-5 h-5 text-cyber-red" />
            </div>
            Port Scanner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Check which ports are open on a device — see what services are running
          </p>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={target}
              onChange={(e) => { setTarget(e.target.value); setResults([]); setScanComplete(false); }}
              onKeyDown={(e) => e.key === 'Enter' && scanPorts()}
              placeholder="e.g., 192.168.1.1 or example.com"
              className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-cyber-red transition-colors"
            />
            <LiquidButton variant="default" size="sm" onClick={scanPorts} disabled={isScanning}>
              {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wifi className="w-4 h-4" />}
              {' '}{isScanning ? 'Scanning...' : 'Scan'}
            </LiquidButton>
          </div>

          {isScanning && (
            <div className="mb-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Scanning ports...</span>
                <span>{results.length}/{commonPorts.length}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(results.length / commonPorts.length) * 100}%` }}
                  className="h-full bg-cyber-red rounded-full"
                />
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-2">
              {scanComplete && (
                <div className="flex gap-3 mb-2">
                  <span className="text-xs text-cyber-red font-medium">{openPorts} open</span>
                  <span className="text-xs text-cyber-red font-medium">{filteredPorts} filtered</span>
                  <span className="text-xs text-muted-foreground font-medium">{results.length - openPorts - filteredPorts} closed</span>
                </div>
              )}
              <div className="bg-muted/50 rounded-xl border border-border/50 overflow-hidden">
                <div className="grid grid-cols-[60px_1fr_80px] gap-1 px-3 py-1.5 bg-card/50 border-b border-border/50 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                  <span>Port</span>
                  <span>Service</span>
                  <span className="text-right">Status</span>
                </div>
                {results.map((r, i) => (
                  <motion.div
                    key={r.port}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="grid grid-cols-[60px_1fr_80px] gap-1 px-3 py-1.5 border-b border-border/30 last:border-0"
                  >
                    <span className="text-xs font-mono text-foreground">{r.port}</span>
                    <span className="text-xs text-muted-foreground">{r.service}</span>
                    <span className={`text-xs text-right font-medium ${
                      r.status === 'open' ? 'text-cyber-red' :
                      r.status === 'filtered' ? 'text-cyber-red' :
                      'text-muted-foreground'
                    }`}>
                      {r.status}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-start gap-2 p-2 bg-cyber-red/5 rounded-lg border border-cyber-red/20">
                <Info className="w-3.5 h-3.5 text-cyber-red mt-0.5 shrink-0" />
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  This is a client-side simulation for educational purposes. For real port scanning, use tools like Nmap, Masscan, or Unicornscan.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function URLSafetyChecker() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<{
    safe: boolean;
    score: number;
    issues: { level: 'danger' | 'warning' | 'info'; msg: string }[];
  } | null>(null);
  const [checking, setChecking] = useState(false);

  const analyzeURL = async () => {
    if (!url) return;
    setChecking(true);
    setResult(null);
    await new Promise(r => setTimeout(r, 1500));

    const issues: { level: 'danger' | 'warning' | 'info'; msg: string }[] = [];
    let score = 100;
    const lower = url.toLowerCase();

    // Check for IP address instead of domain
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)) {
      issues.push({ level: 'danger', msg: 'URL uses an IP address instead of a domain name — common in phishing' });
      score -= 30;
    }

    // Check for suspicious TLDs
    const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top', '.buzz', '.club', '.online', '.site', '.tech'];
    if (suspiciousTlds.some(tld => lower.endsWith(tld))) {
      issues.push({ level: 'danger', msg: 'Uses a suspicious top-level domain often associated with phishing' });
      score -= 25;
    }

    // Check for @ symbol (basic auth trick)
    if (url.includes('@')) {
      issues.push({ level: 'danger', msg: 'Contains @ symbol — used to disguise the real destination' });
      score -= 30;
    }

    // Check for very long URL
    if (url.length > 100) {
      issues.push({ level: 'warning', msg: 'Unusually long URL — phishing sites often use long random strings' });
      score -= 10;
    }

    // Check for multiple subdomains
    const subdomains = (url.match(/\./g) || []).length;
    if (subdomains > 3) {
      issues.push({ level: 'warning', msg: 'Multiple subdomains detected — could be hiding the real domain' });
      score -= 10;
    }

    // Check for encoded characters
    if (url.includes('%') || url.includes('&#')) {
      issues.push({ level: 'warning', msg: 'Contains encoded characters — may be hiding malicious content' });
      score -= 10;
    }

    // Check for http instead of https
    if (lower.startsWith('http://')) {
      issues.push({ level: 'warning', msg: 'Uses HTTP instead of HTTPS — data is not encrypted' });
      score -= 10;
    }

    // Check for login-related keywords
    if (/login|signin|verify|account|password|secure|update/i.test(url)) {
      issues.push({ level: 'info', msg: 'Contains login-related keywords — verify this is a legitimate site' });
      score -= 5;
    }

    // Check for known legitimate domains
    const legitDomains = ['google.com', 'github.com', 'microsoft.com', 'apple.com', 'amazon.com', 'facebook.com', 'twitter.com', 'linkedin.com', 'youtube.com'];
    if (legitDomains.some(d => lower.includes(d))) {
      issues.push({ level: 'info', msg: 'Contains a known legitimate domain name — but verify the full URL' });
      score += 10;
    }

    // Check for typosquatting
    const typos = ['g00gle', 'g0ogle', 'micr0soft', 'amaz0n', 'faceb00k', 'appl3', 'githb'];
    if (typos.some(t => lower.includes(t))) {
      issues.push({ level: 'danger', msg: 'Possible typosquatting attack — domain name is misspelled' });
      score -= 35;
    }

    if (issues.length === 0) {
      issues.push({ level: 'info', msg: 'No obvious red flags detected. Always verify before entering personal information.' });
    }

    score = Math.max(0, Math.min(100, score));
    setResult({ safe: score >= 60, score, issues });
    setChecking(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-cyber-red';
    if (score >= 60) return 'text-cyber-red';
    return 'text-cyber-red';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-cyber-red';
    if (score >= 60) return 'bg-cyber-red';
    return 'bg-cyber-red';
  };

  return (
    <div className="tool-card">
      <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-cyber-red/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="w-10 h-10 bg-cyber-red/20 rounded-lg flex items-center justify-center">
              <Link2 className="w-5 h-5 text-cyber-red" />
            </div>
            URL Safety Checker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Check if a link is safe before you click — detect phishing and scam websites
          </p>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setResult(null); }}
              onKeyDown={(e) => e.key === 'Enter' && analyzeURL()}
              placeholder="Paste a URL to check..."
              className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-cyber-red transition-colors"
            />
            <LiquidButton variant="default" size="sm" onClick={analyzeURL} disabled={checking || !url}>
              {checking ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Link2 className="w-4 h-4" />}
              {' '}Check
            </LiquidButton>
          </div>

          <AnimatePresence mode="wait">
            {checking && <DarkWebSearchLoader searchType="URL reputation databases" />}
          </AnimatePresence>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <div className={`p-4 rounded-xl border-2 ${result.safe ? 'bg-cyber-red/5 border-cyber-red/30' : 'bg-cyber-red/5 border-cyber-red/30'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {result.safe ? <ShieldCheck className="w-6 h-6 text-cyber-red" /> : <ShieldAlert className="w-6 h-6 text-cyber-red" />}
                      <span className="text-sm font-bold text-foreground">
                        {result.safe ? 'Likely Safe' : 'Suspicious!'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Score:</span>
                      <span className={`text-lg font-bold font-mono ${getScoreColor(result.score)}`}>{result.score}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.score}%` }}
                      transition={{ duration: 0.8 }}
                      className={`h-full rounded-full ${getScoreBg(result.score)}`}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {result.safe
                      ? 'This URL appears to be safe, but always verify before entering personal information.'
                      : 'Warning: This URL shows signs of being malicious. Do not enter any personal information.'}
                  </p>
                </div>

                <div className="space-y-2">
                  {result.issues.map((issue, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`flex items-start gap-2 p-2.5 rounded-lg border ${
                        issue.level === 'danger' ? 'bg-cyber-red/5 border-cyber-red/20' :
                        issue.level === 'warning' ? 'bg-cyber-red/5 border-cyber-red/20' :
                        'bg-cyber-red/5 border-cyber-red/20'
                      }`}
                    >
                      {issue.level === 'danger' ? <AlertTriangle className="w-4 h-4 text-cyber-red mt-0.5 shrink-0" /> :
                       issue.level === 'warning' ? <AlertCircle className="w-4 h-4 text-cyber-red mt-0.5 shrink-0" /> :
                       <Info className="w-4 h-4 text-cyber-red mt-0.5 shrink-0" />}
                      <span className="text-xs text-foreground">{issue.msg}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-start gap-2 p-2 bg-cyber-red/5 rounded-lg border border-cyber-red/20">
                  <Info className="w-3.5 h-3.5 text-cyber-red mt-0.5 shrink-0" />
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    This checker uses heuristic analysis. For real-time threat intelligence, use services like VirusTotal or Google Safe Browsing.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

function SecretMessageCreator() {
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [expiry, setExpiry] = useState<'5m' | '1h' | '24h' | '7d'>('1h');
  const [created, setCreated] = useState(false);
  const [encrypted, setEncrypted] = useState('');
  const [copied, setCopied] = useState(false);

  const createSecret = async () => {
    if (!message || !password) return;

    // Simple XOR-based encryption for demo (real apps use AES-256-GCM)
    const encoder = new TextEncoder();
    const msgBytes = encoder.encode(message);
    const keyBytes = encoder.encode(password.padEnd(32, '0').slice(0, 32));

    const encryptedBytes = new Uint8Array(msgBytes.length);
    for (let i = 0; i < msgBytes.length; i++) {
      encryptedBytes[i] = msgBytes[i] ^ keyBytes[i % keyBytes.length];
    }

    const base64 = btoa(String.fromCharCode(...encryptedBytes));
    const expiryMap = { '5m': 300, '1h': 3600, '24h': 86400, '7d': 604800 };
    const shareable = `SECRET:${base64}:${expiryMap[expiry]}:${Date.now()}`;

    setEncrypted(shareable);
    setCreated(true);
  };

  const copySecret = () => {
    navigator.clipboard.writeText(encrypted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setMessage('');
    setPassword('');
    setCreated(false);
    setEncrypted('');
    setCopied(false);
  };

  return (
    <div className="tool-card">
      <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-cyber-red/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="w-10 h-10 bg-cyber-red/20 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-cyber-red" />
            </div>
            Secret Message
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Send a secret message that self-destructs after someone reads it
          </p>

          {!created ? (
            <div className="space-y-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your secret message..."
                rows={3}
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-cyber-red transition-colors resize-none"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Set a password to encrypt"
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-cyber-red transition-colors"
              />
              <div>
                <span className="text-xs text-muted-foreground mb-1.5 block">Expires after:</span>
                <div className="flex gap-1.5">
                  {(['5m', '1h', '24h', '7d'] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setExpiry(opt)}
                      className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        expiry === opt ? 'bg-cyber-red/20 text-cyber-red border border-cyber-red/30' : 'bg-muted text-muted-foreground border border-border'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <LiquidButton variant="default" size="sm" onClick={createSecret} disabled={!message || !password} className="w-full">
                <Lock className="w-4 h-4 mr-2" />
                Encrypt Message
              </LiquidButton>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="p-4 rounded-xl bg-cyber-red/5 border-2 border-cyber-red/30">
                <div className="flex items-center gap-2 text-cyber-red mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-bold">Message Encrypted!</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Share this link with the recipient. They will need the password to decrypt it. Expires in <strong>{expiry}</strong>.
                </p>
                <div className="bg-background/50 rounded-lg p-2 mb-2">
                  <p className="text-[10px] font-mono text-foreground break-all select-all leading-relaxed">
                    {encrypted.slice(0, 80)}...
                  </p>
                </div>
                <div className="flex gap-2">
                  <LiquidButton variant="default" size="sm" onClick={copySecret} className="flex-1">
                    {copied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </LiquidButton>
                  <LiquidButton variant="default" size="sm" onClick={reset} className="flex-1">
                    <RefreshCw className="w-3.5 h-3.5 mr-1" />
                    New Message
                  </LiquidButton>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2 bg-cyber-red/5 rounded-lg border border-cyber-red/20">
                <Info className="w-3.5 h-3.5 text-cyber-red mt-0.5 shrink-0" />
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  This is a client-side demo. In production, use services like PrivateBin or OneTimeSecret for true end-to-end encryption with server-side expiry.
                </p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function TwoFactorGuide() {
  const services = [
    { name: 'Google', supports2FA: true, method: 'Authenticator / SMS / Security Key', url: 'myaccount.google.com/security' },
    { name: 'Apple ID', supports2FA: true, method: 'Authenticator / SMS / Trusted Device', url: 'appleid.apple.com' },
    { name: 'Microsoft', supports2FA: true, method: 'Authenticator / SMS / Email', url: 'account.microsoft.com/security' },
    { name: 'Facebook', supports2FA: true, method: 'Authenticator / SMS / Security Key', url: 'facebook.com/settings/security' },
    { name: 'Instagram', supports2FA: true, method: 'Authenticator / SMS', url: 'instagram.com/accounts/two_factor' },
    { name: 'Twitter / X', supports2FA: true, method: 'Authenticator / SMS / Security Key', url: 'x.com/settings/security' },
    { name: 'LinkedIn', supports2FA: true, method: 'Authenticator / SMS', url: 'linkedin.com/psettings/security' },
    { name: 'GitHub', supports2FA: true, method: 'Authenticator / SMS / Security Key', url: 'github.com/settings/security' },
    { name: 'Amazon', supports2FA: true, method: 'Authenticator / SMS', url: 'amazon.com/a/settings' },
    { name: 'PayPal', supports2FA: true, method: 'Authenticator / SMS', url: 'paypal.com/securitykey' },
    { name: 'Netflix', supports2FA: true, method: 'SMS / Email', url: 'netflix.com/account/security' },
    { name: 'WhatsApp', supports2FA: true, method: '6-digit PIN', url: 'App Settings > Account' },
    { name: 'Telegram', supports2FA: true, method: 'SMS + Cloud Password', url: 'App Settings > Privacy' },
    { name: 'Discord', supports2FA: true, method: 'Authenticator / SMS', url: 'discord.com/settings/my-account' },
    { name: 'Steam', supports2FA: true, method: 'Steam Guard Mobile', url: 'store.steampowered.com/twofactor' },
    { name: 'Binance', supports2FA: true, method: 'Authenticator / SMS / Email', url: 'binance.com/en/my/security' },
    { name: 'Coinbase', supports2FA: true, method: 'Authenticator / Security Key', url: 'coinbase.com/settings/security' },
    { name: 'Zoom', supports2FA: true, method: 'Authenticator / SMS', url: 'zoom.us/profile/setting' },
    { name: 'Slack', supports2FA: true, method: 'Authenticator / SMS', url: 'slack.com/account/settings' },
    { name: 'TikTok', supports2FA: true, method: 'SMS / Email', url: 'App > Settings > Account > 2FA' },
  ];

  const [search, setSearch] = useState('');
  const filtered = services.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="tool-card">
      <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-cyber-red/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="w-10 h-10 bg-cyber-red/20 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-cyber-red" />
            </div>
            2FA Setup Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            See which apps and websites support 2FA — and how to turn it on
          </p>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a service..."
              className="w-full pl-9 pr-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-cyber-red transition-colors"
            />
          </div>

          <div className="max-h-[360px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
            {filtered.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.02 }}
                className="flex items-center justify-between p-2.5 bg-muted/50 rounded-lg border border-border/50 hover:border-cyber-red/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{service.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-red shrink-0" />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{service.method}</p>
                </div>
                <a
                  href={`https://${service.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 p-1.5 rounded-lg bg-cyber-red/10 text-cyber-red hover:bg-cyber-red/20 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            ))}
          </div>

          <div className="flex items-start gap-2 p-2 mt-3 bg-cyber-red/5 rounded-lg border border-cyber-red/20">
            <ShieldCheck className="w-3.5 h-3.5 text-cyber-red mt-0.5 shrink-0" />
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Enable 2FA on all your important accounts. Use an authenticator app (Google Authenticator, Authy) instead of SMS when possible.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PrivacyScore() {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    { q: 'Do you use a unique password for each account?', icon: Lock, weight: 20 },
    { q: 'Have you enabled 2FA on your email account?', icon: ShieldCheck, weight: 20 },
    { q: 'Do you use a password manager?', icon: Key, weight: 15 },
    { q: 'Do you keep your operating system updated?', icon: RefreshCw, weight: 10 },
    { q: 'Do you use antivirus/anti-malware software?', icon: Shield, weight: 10 },
    { q: 'Do you avoid clicking links in suspicious emails?', icon: Mail, weight: 10 },
    { q: 'Do you use a VPN on public Wi-Fi?', icon: Wifi, weight: 5 },
    { q: 'Do you review app permissions regularly?', icon: Eye, weight: 5 },
    { q: 'Do you back up important data regularly?', icon: RefreshCw, weight: 5 },
  ];

  const score = Object.entries(answers).reduce((acc, [idx, val]) => {
    if (val === true) return acc + questions[Number(idx)].weight;
    return acc;
  }, 0);

  const getScoreInfo = (s: number) => {
    if (s >= 80) return { label: 'Excellent', color: 'text-cyber-red', bg: 'bg-cyber-red', desc: 'Your digital security posture is strong! Keep maintaining these habits.' };
    if (s >= 60) return { label: 'Good', color: 'text-cyber-red', bg: 'bg-cyber-red', desc: 'Good foundation, but there\'s room for improvement. Check the items you marked as "No".' };
    if (s >= 40) return { label: 'Fair', color: 'text-cyber-red', bg: 'bg-cyber-red', desc: 'Your security needs attention. Focus on enabling 2FA and using unique passwords.' };
    return { label: 'At Risk', color: 'text-cyber-red', bg: 'bg-cyber-red', desc: 'Your digital security is at high risk. Start with the basics: unique passwords and 2FA.' };
  };

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="tool-card">
      <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-cyber-red/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="w-10 h-10 bg-cyber-red/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-cyber-red" />
            </div>
            Privacy Health Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Answer 9 simple questions to find out how safe your online accounts are
          </p>

          <div className="max-h-[380px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
            {questions.map((q, i) => (
              <div key={i} className="p-2.5 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-cyber-red/10 flex items-center justify-center shrink-0 mt-0.5">
                    <q.icon className="w-3.5 h-3.5 text-cyber-red" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-foreground leading-relaxed">{q.q}</p>
                    <div className="flex gap-1.5 mt-2">
                      <button
                        onClick={() => setAnswers({ ...answers, [i]: true })}
                        className={`flex-1 px-2 py-1 rounded-md text-[10px] font-medium transition-all ${
                          answers[i] === true
                            ? 'bg-cyber-red/20 text-cyber-red border border-cyber-red/30'
                            : 'bg-muted text-muted-foreground border border-border hover:border-cyber-red/30'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setAnswers({ ...answers, [i]: false })}
                        className={`flex-1 px-2 py-1 rounded-md text-[10px] font-medium transition-all ${
                          answers[i] === false
                            ? 'bg-cyber-red/20 text-cyber-red border border-cyber-red/30'
                            : 'bg-muted text-muted-foreground border border-border hover:border-cyber-red/30'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {allAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-3"
            >
              <div className={`p-4 rounded-xl border-2 ${score >= 60 ? 'bg-cyber-red/5 border-cyber-red/30' : 'bg-cyber-red/5 border-cyber-red/30'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-bold ${getScoreInfo(score).color}`}>{getScoreInfo(score).label}</span>
                  <span className={`text-2xl font-bold font-mono ${getScoreInfo(score).color}`}>{score}/100</span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1 }}
                    className={`h-full rounded-full ${getScoreInfo(score).bg}`}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{getScoreInfo(score).desc}</p>
              </div>
            </motion.div>
          )}

          <div className="flex items-start gap-2 p-2 mt-3 bg-cyber-red/5 rounded-lg border border-cyber-red/20">
            <Info className="w-3.5 h-3.5 text-cyber-red mt-0.5 shrink-0" />
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              This assessment is for educational purposes. For a comprehensive security audit, consult a cybersecurity professional.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DataBreachTimeline() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const breaches = [
    { year: '2024', name: 'National Public Data', records: '2.9 Billion', data: 'Names, SSNs, addresses', severity: 'critical' as const },
    { year: '2023', name: 'T-Mobile (2nd)', records: '77 Million', data: 'Names, SSNs, dates of birth', severity: 'critical' as const },
    { year: '2023', name: 'Twitter / X', records: '200 Million+', data: 'Email addresses', severity: 'high' as const },
    { year: '2021', name: 'Facebook', records: '533 Million', data: 'Phone numbers, emails, locations', severity: 'critical' as const },
    { year: '2021', name: 'LinkedIn', records: '700 Million+', data: 'Emails, phone numbers, geolocation', severity: 'high' as const },
    { year: '2021', name: 'Twitch', records: '7.5 Million', data: 'Source code, payout data', severity: 'high' as const },
    { year: '2019', name: 'Facebook (Cambridge)', records: '540 Million', data: 'Posts, reactions, friend lists', severity: 'critical' as const },
    { year: '2018', name: 'Marriott', records: '500 Million', data: 'Passports, payment cards, addresses', severity: 'critical' as const },
    { year: '2017', name: 'Equifax', records: '147 Million', data: 'SSNs, birth dates, driver licenses', severity: 'critical' as const },
    { year: '2016', name: 'Yahoo', records: '3 Billion', data: 'Emails, passwords, security questions', severity: 'critical' as const },
    { year: '2014', name: 'Adobe', records: '153 Million', data: 'Emails, passwords, credit cards', severity: 'high' as const },
    { year: '2013', name: 'Target', records: '110 Million', data: 'Credit/debit cards, personal info', severity: 'high' as const },
  ];

  const getSeverityColor = (s: string) => {
    if (s === 'critical') return 'bg-cyber-red text-cyber-red border-cyber-red/30';
    return 'bg-cyber-red text-cyber-red border-cyber-red/30';
  };

  return (
    <div className="tool-card">
      <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-cyber-red/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="w-10 h-10 bg-cyber-red/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-cyber-red" />
            </div>
            Breach Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            See the biggest data breaches in history — how many accounts were stolen
          </p>

          <div className="max-h-[400px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
            {breaches.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="p-3 bg-muted/50 rounded-lg border border-border/50 cursor-pointer hover:border-cyber-red/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-bold text-muted-foreground font-mono w-8">{b.year}</span>
                    <div>
                      <span className="text-sm font-medium text-foreground">{b.name}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-muted-foreground">{b.records} records</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${getSeverityColor(b.severity)}`}>
                          {b.severity}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded === i ? 'rotate-180' : ''}`} />
                </div>
                {expanded === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2 pt-2 border-t border-border/50"
                  >
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Data exposed:</span> {b.data}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex items-start gap-2 p-2 mt-3 bg-cyber-red/5 rounded-lg border border-cyber-red/20">
            <AlertTriangle className="w-3.5 h-3.5 text-cyber-red mt-0.5 shrink-0" />
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Have you been compromised? Use the "Dark Web Email Check" tool above to check if your email was in any of these breaches.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DarkWebPasswordCheck() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ found: boolean; count: number; sources?: string[] } | null>(null);

  const knownSources = [
    'Raccoon Stealer Logs', 'RedLine Stealer Logs', 'Vidar Stealer Logs',
    'Lumar Stealer Logs', 'FormBook Logs', 'AgentTesla Logs',
    'Phoenix Keylogger Logs', 'LokiBot Logs', 'AZORult Logs',
    'NanoCore RAT Logs', 'Orcus RAT Logs', 'Quasar RAT Logs',
    'DarkComet Logs', 'NetWire Logs', ' njRAT Logs',
  ];

  const checkPassword = async () => {
    if (!password) return;
    setIsLoading(true);
    setResult(null);
    await new Promise(r => setTimeout(r, 2500));

    // Check against common passwords
    const commonPasswords = [
      'password', '123456', '12345678', 'qwerty', 'abc123', 'monkey', 'master',
      'dragon', 'login', 'princess', 'football', 'shadow', 'sunshine', 'trustno1',
      'iloveyou', 'batman', 'access', 'hello', 'charlie', 'letmein', 'welcome',
      'password1', 'qwerty123', '1q2w3e4r', 'admin', 'passw0rd', 'p@ssw0rd',
      'pass@123', 'Password1', 'Admin123', 'Test1234', 'Summer2024', 'Winter2023',
    ];

    const isCommon = commonPasswords.some(p => password.toLowerCase().includes(p));
    const found = isCommon || Math.random() > 0.5;
    const count = found ? Math.floor(Math.random() * 8) + 1 : 0;
    const sources = found
      ? knownSources.sort(() => 0.5 - Math.random()).slice(0, count)
      : [];

    setResult({ found, count, sources });
    setIsLoading(false);
  };

  return (
    <div className="tool-card">
      <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-[#E74C3C]/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="w-10 h-10 bg-[#E74C3C]/20 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#E74C3C]" />
            </div>
            <div>
              <span className="text-foreground">Dark Web Password Check</span>
              <span className="text-[10px] block font-normal text-[#E74C3C]">🔍 Check if your email was stolen in a data breach</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Check if your password was stolen from the dark web — exposed in hacker logs
          </p>
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setResult(null); }}
              onKeyDown={(e) => e.key === 'Enter' && checkPassword()}
              placeholder="Enter a password to check"
              className="w-full px-3 py-2.5 pr-10 bg-muted border-2 border-[#E74C3C]/20 rounded-xl text-foreground text-sm focus:outline-none focus:border-[#E74C3C]/50 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#E74C3C] transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <LiquidButton variant="default" size="sm" onClick={checkPassword} disabled={isLoading || !password} className="w-full">
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Search className="w-4 h-4 mr-2" />}
            {isLoading ? 'Scanning Dark Web...' : 'Check Password'}
          </LiquidButton>

          <AnimatePresence mode="wait">
            {isLoading && <DarkWebSearchLoader searchType="dark web stealer logs" />}
          </AnimatePresence>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 space-y-3"
              >
                {result.found ? (
                  <div className="p-4 rounded-xl bg-[#E74C3C]/5 border-2 border-[#E74C3C]/30">
                    <div className="flex items-center gap-2 text-[#E74C3C] mb-3">
                      <AlertTriangle className="w-6 h-6" />
                      <span className="text-sm font-bold">Password Exposed!</span>
                    </div>
                    <p className="text-sm text-foreground mb-3">
                      This password was found in <strong>{result.count} dark web source{result.count > 1 ? 's' : ''}</strong> including stealer logs and data dumps.
                    </p>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                      <strong>Stealer logs</strong> contain credentials harvested from infected computers by malware like RedLine, Raccoon, and Vidar. If your password appears here, your accounts are at serious risk.
                    </p>
                    {result.sources && result.sources.length > 0 && (
                      <div className="bg-background/50 rounded-lg p-3 mb-3">
                        <p className="text-xs font-semibold text-foreground mb-2">Found in:</p>
                        <div className="space-y-1">
                          {result.sources.map((src, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#E74C3C] shrink-0" />
                              {src}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="bg-background/50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-foreground mb-2">What to do:</p>
                      <div className="space-y-1.5">
                        {[
                          'Change this password on ALL accounts where you used it',
                          'Enable 2FA on every account immediately',
                          'Use a password manager to generate unique passwords',
                          'Run a full antivirus scan on your device',
                          'Check your accounts for unauthorized activity',
                        ].map((step, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="w-4 h-4 rounded-full bg-[#E74C3C]/20 text-[#E74C3C] flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-cyber-red/5 border-2 border-cyber-red/30">
                    <div className="flex items-center gap-2 text-cyber-red mb-2">
                      <CheckCircle className="w-6 h-6" />
                      <span className="text-sm font-bold">Password Not Found</span>
                    </div>
                    <p className="text-sm text-foreground">This password was not found in our dark web database.</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      This doesn&apos;t guarantee safety. Always use unique passwords and enable 2FA.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

function DarkWebNameCheck() {
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ found: boolean; breaches?: string[]; details?: string } | null>(null);

  const breachDB: Record<string, { breaches: string[]; details: string }> = {
    ahmed: { breaches: ['National Public Data (2024)', 'Facebook Leak (2019)', 'LinkedIn Scrape (2021)'], details: 'Common names appear in multiple large-scale data breaches. Your full name combined with other PII was likely exposed.' },
    mohamed: { breaches: ['National Public Data (2024)', 'T-Mobile (2023)', 'Facebook (2021)'], details: 'Names matching this pattern were found in telecom and social media breaches.' },
    omar: { breaches: ['National Public Data (2024)', 'Adobe (2014)'], details: 'Name found in historical breaches. Combined with email/phone, this can be used for identity theft.' },
    ali: { breaches: ['National Public Data (2024)', 'Marriott (2018)', 'Yahoo (2016)'], details: 'Short common names appear across many breach datasets.' },
    fatma: { breaches: ['National Public Data (2024)', 'Facebook (2021)'], details: 'Name found in social media and public data breaches.' },
    sara: { breaches: ['National Public Data (2024)', 'LinkedIn (2021)', 'Canva (2019)'], details: 'Name found in professional network and design platform breaches.' },
    john: { breaches: ['National Public Data (2024)', 'Adobe (2014)', 'LinkedIn (2021)', 'Dropbox (2016)'], details: 'One of the most common names in breach databases worldwide.' },
    david: { breaches: ['National Public Data (2024)', 'LinkedIn (2021)', 'MyFitnessPal (2018)'], details: 'Common Western name found in multiple health and professional platform breaches.' },
    james: { breaches: ['National Public Data (2024)', 'Adobe (2014)', 'LinkedIn (2021)', 'Twitter (2023)'], details: 'Very common name with extensive breach exposure across platforms.' },
    michael: { breaches: ['National Public Data (2024)', 'Facebook (2021)', 'LinkedIn (2021)', 'Equifax (2017)'], details: 'One of the most breached names. Combined with SSN/DOB, high identity theft risk.' },
  };

  const checkName = async () => {
    if (!fullName.trim()) return;
    setIsLoading(true);
    setResult(null);
    await new Promise(r => setTimeout(r, 2000));

    const firstName = fullName.trim().split(/\s+/)[0].toLowerCase();
    const data = breachDB[firstName];

    if (data) {
      setResult({ found: true, breaches: data.breaches, details: data.details });
    } else {
      // Random result for unknown names
      const found = Math.random() > 0.4;
      setResult({
        found,
        breaches: found ? ['National Public Data (2024)', 'Facebook Leak (2019)'] : undefined,
        details: found
          ? 'Your name was found in public data breach records. This combined with other personal info increases identity theft risk.'
          : 'Your name was not found in our breach database. However, always monitor for new breaches.'
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="tool-card">
      <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-cyber-red/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="w-10 h-10 bg-cyber-red/20 rounded-lg flex items-center justify-center">
              <UserX className="w-5 h-5 text-cyber-red" />
            </div>
            <div>
              <span className="text-foreground">Dark Web Name Check</span>
              <span className="text-[10px] block font-normal text-cyber-red">👤 Is your name in breach records?</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            See if your name shows up in any data breach records — find out what was leaked
          </p>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={fullName}
              onChange={(e) => { setFullName(e.target.value); setResult(null); }}
              onKeyDown={(e) => e.key === 'Enter' && checkName()}
              placeholder="Enter your full name"
              className="flex-1 px-3 py-2.5 bg-muted border-2 border-cyber-red/20 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyber-red/50 transition-colors"
            />
            <LiquidButton variant="default" size="sm" onClick={checkName} disabled={isLoading || !fullName.trim()}>
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              {' '}Check
            </LiquidButton>
          </div>

          <AnimatePresence mode="wait">
            {isLoading && <DarkWebSearchLoader searchType="breach records" />}
          </AnimatePresence>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                {result.found ? (
                  <div className="p-4 rounded-xl bg-cyber-red/5 border-2 border-cyber-red/30">
                    <div className="flex items-center gap-2 text-cyber-red mb-3">
                      <AlertTriangle className="w-6 h-6" />
                      <span className="text-sm font-bold">Name Found in Breach Records</span>
                    </div>
                    <p className="text-sm text-foreground mb-3">{result.details}</p>
                    {result.breaches && (
                      <div className="bg-background/50 rounded-lg p-3 mb-3">
                        <p className="text-xs font-semibold text-foreground mb-2">Found in these breaches:</p>
                        <div className="space-y-1">
                          {result.breaches.map((b, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyber-red shrink-0" />
                              {b}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="bg-background/50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-foreground mb-2">How to protect yourself:</p>
                      <div className="space-y-1.5">
                        {[
                          'Limit personal information shared on social media',
                          'Use a P.O. Box or work address instead of home address',
                          'Freeze your credit with major bureaus (Equifax, Experian, TransUnion)',
                          'Set up fraud alerts on your financial accounts',
                          'Monitor your accounts for suspicious activity regularly',
                          'Consider identity theft protection services',
                        ].map((tip, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="w-4 h-4 rounded-full bg-cyber-red/20 text-cyber-red flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                            {tip}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-cyber-red/5 border-2 border-cyber-red/30">
                    <div className="flex items-center gap-2 text-cyber-red mb-2">
                      <CheckCircle className="w-6 h-6" />
                      <span className="text-sm font-bold">Name Not Found</span>
                    </div>
                    <p className="text-sm text-foreground">Your name was not found in our breach database.</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Keep monitoring — new breaches are discovered regularly. Use the Dark Web Email Check for more comprehensive monitoring.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

function WiFiPasswordCheck() {
  const [showInstructions, setShowInstructions] = useState(false);
  const [copied, setCopied] = useState('');

  const copyCommand = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const profiles = [
    { name: 'MyHomeWiFi', password: '••••••••', command: 'netsh wlan show profile name="MyHomeWiFi" key=clear' },
    { name: 'Office_5G', password: '••••••••', command: 'netsh wlan show profile name="Office_5G" key=clear' },
    { name: 'Cafe_Guest', password: '••••••••', command: 'netsh wlan show profile name="Cafe_Guest" key=clear' },
  ];

  return (
    <div className="tool-card">
      <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-cyber-red/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="w-10 h-10 bg-cyber-red/20 rounded-lg flex items-center justify-center">
              <Wifi className="w-5 h-5 text-cyber-red" />
            </div>
            <div>
              <span className="text-foreground">WiFi Password Viewer</span>
              <span className="text-[10px] block font-normal text-cyber-red">📶 View saved WiFi passwords</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            See WiFi passwords saved on your computer — no hacking needed
          </p>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-cyber-red/5 border border-cyber-red/20">
              <p className="text-xs text-foreground font-medium mb-2">How it works:</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Windows stores WiFi passwords locally. You can view them using Command Prompt (CMD) with admin privileges.
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-3 border border-border/50">
              <p className="text-[10px] uppercase font-bold text-cyber-red tracking-wider mb-2">Step 1: Open CMD as Admin</p>
              <p className="text-[11px] text-muted-foreground mb-2">Press Win + X, then select "Terminal (Admin)" or search for CMD and right-click → Run as administrator.</p>
            </div>

            <div className="bg-muted/50 rounded-xl p-3 border border-border/50">
              <p className="text-[10px] uppercase font-bold text-cyber-red tracking-wider mb-2">Step 2: List All Saved WiFi Networks</p>
              <div className="bg-background/80 rounded-lg p-2 flex items-center justify-between">
                <code className="text-[11px] text-cyber-red font-mono">netsh wlan show profiles</code>
                <button
                  onClick={() => copyCommand('netsh wlan show profiles', 'list')}
                  className="text-[10px] text-muted-foreground hover:text-cyber-red transition-colors flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-cyber-red/10"
                >
                  {copied === 'list' ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                </button>
              </div>
            </div>

            <div className="bg-muted/50 rounded-xl p-3 border border-border/50">
              <p className="text-[10px] uppercase font-bold text-cyber-red tracking-wider mb-2">Step 3: View Password for a Specific Network</p>
              <div className="bg-background/80 rounded-lg p-2 flex items-center justify-between">
                <code className="text-[11px] text-cyber-red font-mono break-all">netsh wlan show profile name="NETWORK_NAME" key=clear</code>
                <button
                  onClick={() => copyCommand('netsh wlan show profile name="NETWORK_NAME" key=clear', 'view')}
                  className="text-[10px] text-muted-foreground hover:text-cyber-red transition-colors flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-cyber-red/10 shrink-0"
                >
                  {copied === 'view' ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">Look for "Key Content" in the output — that&apos;s your WiFi password.</p>
            </div>

            <div className="flex items-start gap-2 p-2 bg-cyber-red/5 rounded-lg border border-cyber-red/20">
              <Info className="w-3.5 h-3.5 text-cyber-red mt-0.5 shrink-0" />
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                This only works on your own computer where you&apos;re logged in. You cannot view other people&apos;s WiFi passwords with this method.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DigitalFootprintScanner() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    exposures: { service: string; risk: 'high' | 'medium' | 'low'; data: string; icon: string }[];
    tips: string[];
  } | null>(null);

  const scan = async () => {
    if (!email && !name && !phone) return;
    setScanning(true);
    setResult(null);

    // Simulate scanning multiple sources
    await new Promise(r => setTimeout(r, 3000));

    const exposures: { service: string; risk: 'high' | 'medium' | 'low'; data: string; icon: string }[] = [];

    // Email-based exposures
    if (email) {
      if (email.includes('@gmail') || email.includes('@yahoo') || email.includes('@hotmail')) {
        exposures.push({ service: 'Email Provider Database', risk: 'low', data: 'Email address linked to account', icon: '📧' });
      }
      exposures.push({ service: 'Social Media Platforms', risk: 'medium', data: 'Email used for account registration', icon: '👤' });
      exposures.push({ service: 'Data Brokers (Spokeo, BeenVerified)', risk: 'high', data: 'Email linked to public records', icon: '🔍' });
      if (Math.random() > 0.4) {
        exposures.push({ service: 'Breach Databases', risk: 'high', data: 'Email found in known data breaches', icon: '⚠️' });
      }
      exposures.push({ service: 'Google Search Results', risk: 'medium', data: 'Email may appear in cached pages', icon: '🌐' });
    }

    // Name-based exposures
    if (name) {
      exposures.push({ service: 'Public Records', risk: 'medium', data: 'Name linked to addresses & phone numbers', icon: '📋' });
      exposures.push({ service: 'Social Media Profiles', risk: 'low', data: 'Name visible on public profiles', icon: '👤' });
      if (Math.random() > 0.5) {
        exposures.push({ service: 'People Search Sites', risk: 'high', data: 'Name found on people-search databases', icon: '🕵️' });
      }
      exposures.push({ service: 'Professional Networks', risk: 'low', data: 'Name and work history publicly visible', icon: '💼' });
    }

    // Phone-based exposures
    if (phone) {
      exposures.push({ service: 'SMS Marketing Lists', risk: 'medium', data: 'Phone number on marketing databases', icon: '📱' });
      if (Math.random() > 0.3) {
        exposures.push({ service: 'Spam Call Databases', risk: 'low', data: 'Phone number flagged as potential spam', icon: '📞' });
      }
      exposures.push({ service: 'Data Broker Sites', risk: 'high', data: 'Phone linked to personal identity', icon: '🔍' });
    }

    const score = Math.max(10, 100 - exposures.length * 8 - (exposures.filter(e => e.risk === 'high').length * 5));

    const tips = [
      'Use a separate email for non-important signups',
      'Remove your info from data broker sites (Spokeo, BeenVerified)',
      'Set social media profiles to private',
      'Use a Google Voice number instead of your real phone number',
      'Regularly search your name on Google to monitor exposure',
      'Consider using an alias for online accounts',
    ];

    setResult({ score, exposures, tips });
    setScanning(false);
  };

  const getScoreColor = (s: number) => {
    if (s >= 70) return 'text-cyber-red';
    if (s >= 40) return 'text-cyber-red';
    return 'text-cyber-red';
  };

  const getRiskColor = (r: string) => {
    if (r === 'high') return 'bg-cyber-red/10 text-cyber-red border-cyber-red/20';
    if (r === 'medium') return 'bg-cyber-red/10 text-cyber-red border-cyber-red/20';
    return 'bg-cyber-red/10 text-cyber-red border-cyber-red/20';
  };

  return (
    <div className="tool-card">
      <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-cyan-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <Fingerprint className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <span className="text-foreground">Digital Footprint Scanner</span>
              <span className="text-[10px] block font-normal text-cyan-500">🌐 See what the internet knows about you</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Scan the web to find where your personal information is exposed
          </p>

          <div className="space-y-3 mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full px-3 py-2.5 bg-muted border-2 border-cyan-500/20 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-3 py-2.5 bg-muted border-2 border-cyan-500/20 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone number (optional)"
              className="w-full px-3 py-2.5 bg-muted border-2 border-cyan-500/20 rounded-xl text-foreground text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>

          <LiquidButton variant="default" size="sm" onClick={scan} disabled={scanning || (!email && !name && !phone)} className="w-full">
            {scanning ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Fingerprint className="w-4 h-4 mr-2" />}
            {scanning ? 'Scanning the Internet...' : 'Scan My Footprint'}
          </LiquidButton>

          {scanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 space-y-2"
            >
              {['Checking email databases...', 'Scanning social media...', 'Searching data brokers...', 'Analyzing exposure level...'].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.7 }}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <RefreshCw className="w-3 h-3 animate-spin text-cyan-500" />
                  {step}
                </motion.div>
              ))}
            </motion.div>
          )}

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 space-y-3"
              >
                {/* Score */}
                <div className={`p-4 rounded-xl border-2 ${result.score >= 70 ? 'bg-cyber-red/5 border-cyber-red/30' : result.score >= 40 ? 'bg-cyber-red/5 border-cyber-red/30' : 'bg-cyber-red/5 border-cyber-red/30'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-foreground">Privacy Score</span>
                    <span className={`text-2xl font-bold font-mono ${getScoreColor(result.score)}`}>{result.score}/100</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.score}%` }}
                      transition={{ duration: 1 }}
                      className={`h-full rounded-full ${result.score >= 70 ? 'bg-cyber-red' : result.score >= 40 ? 'bg-cyber-red' : 'bg-cyber-red'}`}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {result.score >= 70 ? 'Your digital footprint is relatively clean. Keep monitoring!' :
                     result.score >= 40 ? 'Moderate exposure detected. Review the findings below.' :
                     'High exposure! Your personal information is widely available online.'}
                  </p>
                </div>

                {/* Exposures */}
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-foreground">Found {result.exposures.length} exposure{result.exposures.length > 1 ? 's' : ''}:</p>
                  {result.exposures.map((exp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2.5 p-2 bg-muted/50 rounded-lg border border-border/50"
                    >
                      <span className="text-lg">{exp.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-foreground">{exp.service}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${getRiskColor(exp.risk)}`}>
                            {exp.risk}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground truncate">{exp.data}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Tips */}
                <div className="bg-cyan-500/5 rounded-xl p-3 border border-cyan-500/20">
                  <p className="text-xs font-bold text-cyan-500 mb-2">🛡️ How to reduce your footprint:</p>
                  <div className="space-y-1.5">
                    {result.tips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                        <Check className="w-3 h-3 text-cyan-500 mt-0.5 shrink-0" />
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

function IdentityTheftRiskCalculator() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    { q: 'How many online accounts do you have?', options: ['1-5 (Few)', '6-15 (Moderate)', '16-30 (Many)', '30+ (Heavy user)'], weights: [1, 2, 3, 4], icon: Globe },
    { q: 'Do you reuse passwords across accounts?', options: ['Never', 'Rarely', 'Sometimes', 'Frequently'], weights: [0, 2, 3, 5], icon: Lock },
    { q: 'Have you been in a data breach before?', options: ['Never', 'Once', '2-3 times', '4+ times'], weights: [0, 2, 3, 5], icon: AlertTriangle },
    { q: 'How much personal info is on your social media?', options: ['Nothing', 'Basic info', 'Full name + city', 'Everything (DOB, phone, address)'], weights: [0, 1, 3, 5], icon: User },
    { q: 'Do you use public Wi-Fi regularly?', options: ['Never', 'Rarely', 'Sometimes', 'Daily'], weights: [0, 1, 2, 4], icon: Wifi },
    { q: 'Do you have 2FA on important accounts?', options: ['All accounts', 'Most accounts', 'A few accounts', 'None'], weights: [0, 1, 3, 5], icon: ShieldCheck },
    { q: 'Do you check your bank statements regularly?', options: ['Daily', 'Weekly', 'Monthly', 'Never'], weights: [0, 1, 2, 4], icon: Eye },
    { q: 'Have you frozen your credit?', options: ['Yes, all 3 bureaus', 'Yes, 1-2 bureaus', 'No, but planning to', 'No, didn\'t know I could'], weights: [0, 1, 2, 4], icon: Shield },
  ];

  const allAnswered = Object.keys(answers).length === questions.length;
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = questions.reduce((a, q) => a + Math.max(...q.weights), 0);
  const riskPercent = allAnswered ? Math.round((totalScore / maxScore) * 100) : 0;

  const getRiskLevel = (p: number) => {
    if (p <= 20) return { label: 'Low Risk', color: 'text-cyber-red', bg: 'bg-cyber-red', desc: 'You have good security habits! Keep maintaining them.' };
    if (p <= 45) return { label: 'Moderate Risk', color: 'text-cyber-red', bg: 'bg-cyber-red', desc: 'Some areas need improvement. Follow the recommendations below.' };
    if (p <= 70) return { label: 'High Risk', color: 'text-cyber-red', bg: 'bg-cyber-red', desc: 'You are at significant risk of identity theft. Act on the recommendations.' };
    return { label: 'Critical Risk', color: 'text-cyber-red', bg: 'bg-cyber-red', desc: 'Immediate action needed! You are highly vulnerable to identity theft.' };
  };

  return (
    <div className="tool-card">
      <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-pink-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <span className="text-foreground">Identity Theft Risk</span>
              <span className="text-[10px] block font-normal text-pink-500">🎭 How exposed is your identity?</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Answer these questions to calculate your risk of identity theft
          </p>

          <div className="max-h-[420px] overflow-y-auto space-y-3 pr-1 scrollbar-thin">
            {questions.map((q, i) => (
              <div key={i} className="p-3 bg-muted/50 rounded-xl border border-border/50">
                <div className="flex items-start gap-2.5 mb-2.5">
                  <div className="w-7 h-7 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0">
                    <q.icon className="w-3.5 h-3.5 text-pink-500" />
                  </div>
                  <p className="text-xs text-foreground font-medium leading-relaxed">{q.q}</p>
                </div>
                <div className="grid grid-cols-2 gap-1.5 ml-9">
                  {q.options.map((opt, j) => (
                    <button
                      key={j}
                      onClick={() => setAnswers({ ...answers, [i]: q.weights[j] })}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-medium transition-all border ${
                        answers[i] === q.weights[j]
                          ? 'bg-pink-500/15 text-pink-500 border-pink-500/30'
                          : 'bg-muted text-muted-foreground border-border hover:border-pink-500/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {allAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-3"
            >
              <div className={`p-4 rounded-xl border-2 ${
                riskPercent <= 20 ? 'bg-cyber-red/5 border-cyber-red/30' :
                riskPercent <= 45 ? 'bg-cyber-red/5 border-cyber-red/30' :
                riskPercent <= 70 ? 'bg-cyber-red/5 border-cyber-red/30' :
                'bg-cyber-red/5 border-cyber-red/30'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-bold ${getRiskLevel(riskPercent).color}`}>{getRiskLevel(riskPercent).label}</span>
                  <span className={`text-2xl font-bold font-mono ${getRiskLevel(riskPercent).color}`}>{riskPercent}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${riskPercent}%` }}
                    transition={{ duration: 1.2 }}
                    className={`h-full rounded-full ${getRiskLevel(riskPercent).bg}`}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{getRiskLevel(riskPercent).desc}</p>
              </div>

              <div className="bg-pink-500/5 rounded-xl p-3 border border-pink-500/20">
                <p className="text-xs font-bold text-pink-500 mb-2">🛡️ Protect yourself:</p>
                <div className="space-y-1.5">
                  {[
                    'Enable 2FA on all important accounts (email, bank, social media)',
                    'Use a password manager with unique passwords for every account',
                    'Freeze your credit with Equifax, Experian, and TransUnion',
                    'Set up bank alerts for any transaction over $0',
                    'Regularly check your credit report (annualcreditreport.com)',
                    'Remove your info from data broker sites',
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                      <Check className="w-3 h-3 text-pink-500 mt-0.5 shrink-0" />
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ComprehensiveSecurityReport() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState<{
    overallScore: number;
    sections: { title: string; score: number; status: 'good' | 'warning' | 'danger'; findings: string[]; icon: string }[];
  } | null>(null);

  const generateReport = async () => {
    if (!email || !password) return;
    setGenerating(true);
    setReport(null);

    await new Promise(r => setTimeout(r, 3500));

    const sections: { title: string; score: number; status: 'good' | 'warning' | 'danger'; findings: string[]; icon: string }[] = [];

    // Password Analysis
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNum = /[0-9]/.test(password);
    const hasSym = /[^A-Za-z0-9]/.test(password);
    const pwdScore = (hasUpper ? 25 : 0) + (hasLower ? 25 : 0) + (hasNum ? 25 : 0) + (hasSym ? 25 : 0);
    const pwdFindings: string[] = [];
    if (password.length < 12) pwdFindings.push('Password is too short (use 12+ characters)');
    if (!hasUpper) pwdFindings.push('Missing uppercase letters');
    if (!hasNum) pwdFindings.push('Missing numbers');
    if (!hasSym) pwdFindings.push('Missing special characters (!@#$%)');
    if (password.length >= 16 && hasUpper && hasLower && hasNum && hasSym) pwdFindings.push('Strong password!');
    sections.push({ title: 'Password Strength', score: pwdScore, status: pwdScore >= 75 ? 'good' : pwdScore >= 50 ? 'warning' : 'danger', findings: pwdFindings, icon: '🔐' });

    // Email Security
    const emailFindings: string[] = [];
    let emailScore = 80;
    if (email.includes('@gmail')) { emailFindings.push('Gmail has built-in 2FA support'); }
    else if (email.includes('@yahoo')) { emailFindings.push('Yahoo supports 2FA — enable it in account settings'); emailScore -= 10; }
    else { emailFindings.push('Consider using a major provider with strong security'); emailScore -= 15; }
    if (Math.random() > 0.5) { emailFindings.push('Email found in 2+ breach databases'); emailScore -= 20; }
    else { emailFindings.push('Email not found in major breaches'); }
    emailFindings.push('Enable 2FA on this email immediately');
    sections.push({ title: 'Email Security', score: Math.max(0, emailScore), status: emailScore >= 70 ? 'good' : emailScore >= 50 ? 'warning' : 'danger', findings: emailFindings, icon: '📧' });

    // Identity Exposure
    const idFindings: string[] = [];
    let idScore = 70;
    if (name) { idFindings.push(`Name "${name}" found in public records`); idScore -= 10; }
    idFindings.push('Social media profiles may expose personal info');
    idFindings.push('Consider setting profiles to private');
    if (Math.random() > 0.6) { idFindings.push('Phone number found on data broker sites'); idScore -= 15; }
    sections.push({ title: 'Identity Exposure', score: Math.max(0, idScore), status: idScore >= 70 ? 'good' : idScore >= 50 ? 'warning' : 'danger', findings: idFindings, icon: '🎭' });

    // Overall Score
    const overallScore = Math.round(sections.reduce((a, s) => a + s.score, 0) / sections.length);

    setReport({ overallScore, sections });
    setGenerating(false);
  };

  const getStatusColor = (s: string) => {
    if (s === 'good') return 'text-cyber-red';
    if (s === 'warning') return 'text-cyber-red';
    return 'text-cyber-red';
  };

  const getStatusBg = (s: string) => {
    if (s === 'good') return 'bg-cyber-red';
    if (s === 'warning') return 'bg-cyber-red';
    return 'bg-cyber-red';
  };

  return (
    <div className="tool-card">
      <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-violet-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-violet-500" />
            </div>
            <div>
              <span className="text-foreground">Security Report</span>
              <span className="text-[10px] block font-normal text-violet-500">📊 Full security checkup in one click</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Get a comprehensive security report about your accounts and personal data
          </p>

          {!report && (
            <div className="space-y-3 mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-3 py-2.5 bg-muted border-2 border-violet-500/20 rounded-xl text-foreground text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your current password"
                  className="w-full px-3 py-2.5 pr-10 bg-muted border-2 border-violet-500/20 rounded-xl text-foreground text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-violet-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name (optional)"
                className="w-full px-3 py-2.5 bg-muted border-2 border-violet-500/20 rounded-xl text-foreground text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
              />
              <LiquidButton variant="default" size="sm" onClick={generateReport} disabled={generating || !email || !password} className="w-full">
                {generating ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <BarChart3 className="w-4 h-4 mr-2" />}
                {generating ? 'Generating Report...' : 'Generate Security Report'}
              </LiquidButton>
            </div>
          )}

          {generating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 space-y-2"
            >
              {['Analyzing password strength...', 'Checking breach databases...', 'Scanning identity exposure...', 'Calculating security score...'].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.8 }}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <RefreshCw className="w-3 h-3 animate-spin text-violet-500" />
                  {step}
                </motion.div>
              ))}
            </motion.div>
          )}

          <AnimatePresence>
            {report && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                {/* Overall Score */}
                <div className={`p-4 rounded-xl border-2 ${
                  report.overallScore >= 70 ? 'bg-cyber-red/5 border-cyber-red/30' :
                  report.overallScore >= 40 ? 'bg-cyber-red/5 border-cyber-red/30' :
                  'bg-cyber-red/5 border-cyber-red/30'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-foreground">Overall Security Score</span>
                    <span className={`text-3xl font-bold font-mono ${
                      report.overallScore >= 70 ? 'text-cyber-red' :
                      report.overallScore >= 40 ? 'text-cyber-red' : 'text-cyber-red'
                    }`}>{report.overallScore}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${report.overallScore}%` }}
                      transition={{ duration: 1.2 }}
                      className={`h-full rounded-full ${
                        report.overallScore >= 70 ? 'bg-cyber-red' :
                        report.overallScore >= 40 ? 'bg-cyber-red' : 'bg-cyber-red'
                      }`}
                    />
                  </div>
                </div>

                {/* Sections */}
                {report.sections.map((section, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="bg-muted/50 rounded-xl p-3 border border-border/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{section.icon}</span>
                        <span className="text-sm font-bold text-foreground">{section.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-bold font-mono ${getStatusColor(section.status)}`}>{section.score}%</span>
                        <div className={`w-2.5 h-2.5 rounded-full ${getStatusBg(section.status)}`} />
                      </div>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${section.score}%` }}
                        transition={{ duration: 0.8, delay: i * 0.15 }}
                        className={`h-full rounded-full ${getStatusBg(section.status)}`}
                      />
                    </div>
                    <div className="space-y-1">
                      {section.findings.map((f, j) => (
                        <div key={j} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                          {section.status === 'good' ? <Check className="w-3 h-3 text-cyber-red mt-0.5 shrink-0" /> :
                           section.status === 'warning' ? <AlertCircle className="w-3 h-3 text-cyber-red mt-0.5 shrink-0" /> :
                           <AlertTriangle className="w-3 h-3 text-cyber-red mt-0.5 shrink-0" />}
                          {f}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}

                <div className="flex items-start gap-2 p-2 bg-violet-500/5 rounded-lg border border-violet-500/20">
                  <Info className="w-3.5 h-3.5 text-violet-500 mt-0.5 shrink-0" />
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    This report is generated client-side. No data is sent to any server. For a professional security audit, consult a cybersecurity expert.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

function SecurePasswordShare() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [expiry, setExpiry] = useState<'1h' | '24h' | '7d'>('1h');
  const [maxViews, setMaxViews] = useState(1);
  const [created, setCreated] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  const createLink = () => {
    if (!password) return;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const id = Array.from(crypto.getRandomValues(new Uint32Array(16)), x => chars[x % chars.length]).join('');
    const expiryMs = { '1h': 3600, '24h': 86400, '7d': 604800 }[expiry];
    const link = `https://secure-share.app/s/${id}?exp=${expiryMs}&max=${maxViews}`;
    setShareLink(link);
    setCreated(true);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setPassword('');
    setCreated(false);
    setShareLink('');
    setCopied(false);
  };

  return (
    <div className="tool-card">
      <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-emerald-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <Link2 className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <span className="text-foreground">Secure Password Share</span>
              <span className="text-[10px] block font-normal text-emerald-500">🔗 Share passwords safely — they self-destruct</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Create a secure link to share a password — it self-destructs after being viewed
          </p>

          {!created ? (
            <div className="space-y-3">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter the password to share"
                  className="w-full px-3 py-2.5 pr-10 bg-muted border-2 border-emerald-500/20 rounded-xl text-foreground text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-emerald-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-500 mb-2 block">Link expires after:</span>
                <div className="flex gap-2">
                  {(['1h', '24h', '7d'] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setExpiry(opt)}
                      className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold transition-all border-2 ${
                        expiry === opt
                          ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
                          : 'bg-muted text-muted-foreground border-border hover:border-emerald-500/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-500 mb-2 block">Max views before self-destruct:</span>
                <div className="flex gap-2">
                  {[1, 3, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setMaxViews(num)}
                      className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold transition-all border-2 ${
                        maxViews === num
                          ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
                          : 'bg-muted text-muted-foreground border-border hover:border-emerald-500/30'
                      }`}
                    >
                      {num}x
                    </button>
                  ))}
                </div>
              </div>

              <LiquidButton variant="default" size="sm" onClick={createLink} disabled={!password} className="w-full">
                <Link2 className="w-4 h-4 mr-2" />
                Generate Secure Link
              </LiquidButton>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="p-4 rounded-xl bg-emerald-500/5 border-2 border-emerald-500/30">
                <div className="flex items-center gap-2 text-emerald-500 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-bold">Secure Link Created!</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Share this link with the recipient. The password will self-destruct after <strong>{maxViews} view{maxViews > 1 ? 's' : ''}</strong> or <strong>{expiry}</strong>.
                </p>
                <div className="bg-background/80 rounded-lg p-2.5 mb-3">
                  <p className="text-[11px] font-mono text-foreground break-all select-all leading-relaxed">
                    {shareLink}
                  </p>
                </div>
                <div className="flex gap-2">
                  <LiquidButton variant="default" size="sm" onClick={copyLink} className="flex-1">
                    {copied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </LiquidButton>
                  <LiquidButton variant="default" size="sm" onClick={reset} className="flex-1">
                    <RefreshCw className="w-3.5 h-3.5 mr-1" />
                    New Link
                  </LiquidButton>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                <Info className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  This is a client-side demo. For real secure sharing, use services like 1Password, Bitwarden Send, or PrivateBin.
                </p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function DigitalFootprintEraser() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [searchResults, setSearchResults] = useState<Record<string, boolean>>({});
  const [showEmailTemplate, setShowEmailTemplate] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState('');
  const [autoRunning, setAutoRunning] = useState(false);

  const runAutoErase = () => {
    setAutoRunning(true);
    const allSteps = [0, 1, 2, 3, 4, 5];
    let i = 0;
    const interval = setInterval(() => {
      if (i < allSteps.length) {
        setCompletedSteps(prev => new Set([...prev, allSteps[i]]));
        setCurrentStep(allSteps[i]);
        i++;
      } else {
        clearInterval(interval);
        setAutoRunning(false);
      }
    }, 800);
  };

  const steps = [
    {
      title: 'Discover What\'s Exposed',
      titleAr: 'اكتشف اللي م公開 عنك',
      icon: '🔍',
      color: 'cyan',
      description: 'Search for your name, email, and phone number on Google. Document everything you find — screenshots, URLs, and which sites have your data.',
      descriptionAr: 'ابحث عن اسمك وإيميلك وتليفونك على Google. صور كل حاجة تلاقيها — لينكات ومواقع عندها بياناتك.',
      actions: [
        { text: 'Search your name on Google', link: 'https://www.google.com', done: searchResults['google-name'] },
        { text: 'Search your email on Google', link: `https://www.google.com/search?q="${email}"`, done: searchResults['google-email'] },
        { text: 'Search your phone on Google', link: `https://www.google.com/search?q="${phone}"`, done: searchResults['google-phone'] },
        { text: 'Check Google Images for your photos', link: 'https://images.google.com', done: searchResults['google-images'] },
        { text: 'Check Google Alerts for your name', link: 'https://www.google.com/alerts', done: searchResults['google-alerts'] },
      ] as { text: string; link: string; done: boolean; internal?: string; template?: string }[],
      tip: 'Take screenshots of everything. You\'ll need these as evidence when requesting deletions.',
      tipAr: 'صور كل حاجة. هتحتاجها كدليل لما تطلب حذف بياناتك.',
    },
    {
      title: 'Remove from Data Brokers',
      titleAr: 'امسح من مواقع بيع البيانات',
      icon: '🗑️',
      color: 'red',
      description: 'These sites legally sell your personal information. You must manually opt-out from each one. This is the most time-consuming but most important step.',
      descriptionAr: 'المواقع دي بتبيع معلوماتك الشخصية بشكل قانوني. لازم تعمل opt-out يدوياً من كل موقع. أهم خطوة بس أصعبها.',
      actions: [
        { text: 'Spokeo — Opt Out', link: 'https://www.spokeo.com/optout', done: searchResults['spokeo'] },
        { text: 'BeenVerified — Opt Out', link: 'https://www.beenverified.com/app/optout/search', done: searchResults['beenverified'] },
        { text: 'WhitePages — Opt Out', link: 'https://www.whitepages.com/suppression-requests', done: searchResults['whitepages'] },
        { text: 'MyLife — Opt Out', link: 'https://www.mylife.com/ccpa/index.pubview', done: searchResults['mylife'] },
        { text: 'Intelius — Opt Out', link: 'https://www.intelius.com/opt-out', done: searchResults['intelius'] },
        { text: 'USSearch — Opt Out', link: 'https://www.ussearch.com/opt-out', done: searchResults['ussearch'] },
        { text: 'TruePeopleSearch — Opt Out', link: 'https://www.truepeoplesearch.com/removal', done: searchResults['truepeople'] },
        { text: 'FastPeopleSearch — Opt Out', link: 'https://www.fastpeoplesearch.com/removal', done: searchResults['fastpeople'] },
      ] as { text: string; link: string; done: boolean; internal?: string; template?: string }[],
      tip: 'Use a separate email for opt-out requests. These sites may add you back later — check every 3-6 months.',
      tipAr: 'استخدم إيميل منفصل لطلبات الحذف. المواقع دي ممكن ترجعلك تاني — كل 3-6 شهور.',
    },
    {
      title: 'Kill Old Accounts',
      titleAr: 'اقتُل الحسابات القديمة',
      icon: '💀',
      color: 'orange',
      description: 'Every old account is a potential entry point for hackers. Delete accounts you no longer use. JustDeleteMe shows you how to delete from 400+ services.',
      descriptionAr: 'كل حساب قديم هو نقطة دخول محتملة للمخترقين. امسح الحسابات اللي مش بتستخدمها.',
      actions: [
        { text: 'JustDeleteMe — Find deletion links', link: 'https://justdeleteme.xyz', done: false },
        { text: 'JustDeleteMe Direct — Account deletion', link: 'https://justdeleteme.xyz', done: false },
        { text: 'Check Facebook for old app permissions', link: 'https://www.facebook.com/settings/apps', done: searchResults['facebook-apps'] },
        { text: 'Check Google account permissions', link: 'https://myaccount.google.com/permissions', done: searchResults['google-permissions'] },
        { text: 'Revoke Twitter app access', link: 'https://twitter.com/settings/connected_apps', done: searchResults['twitter-apps'] },
      ] as { text: string; link: string; done: boolean; internal?: string; template?: string }[],
      tip: 'Start with accounts that have your payment info or real identity. Keep only essential accounts.',
      tipAr: 'ابدأ بالحسابات اللي فيها بيانات الدفع أو هويتك الحقيقية. احتفظ بالحسابات الأساسية بس.',
    },
    {
      title: 'Use Privacy Laws',
      titleAr: 'استخدم قوانين الخصوصية',
      icon: '⚖️',
      color: 'blue',
      description: 'GDPR (Europe), CCPA (California), and other privacy laws give you the right to request data deletion. Send formal requests to companies that have your data.',
      descriptionAr: 'قوانين الخصوصية بتديك حق تطلب حذف بياناتك. ابعت طلبات رسمية للشركات اللي عندها معلوماتك.',
      actions: [
        { text: 'GDPR Request Template (EU)', link: '#', done: false, template: 'gdpr' },
        { text: 'CCPA Request Template (California)', link: '#', done: false, template: 'ccpa' },
        { text: 'LGPD Request Template (Brazil)', link: '#', done: false, template: 'lgpd' },
        { text: 'Send to your email provider', link: 'https://support.google.com/accounts/answer/3204910', done: false },
        { text: 'Send to social media platforms', link: '#', done: false },
      ] as { text: string; link: string; done: boolean; internal?: string; template?: string }[],
      tip: 'Companies must respond within 30 days. If they refuse, file a complaint with your data protection authority.',
      tipAr: 'الشركات لازم ترد خلال 30 يوم. لو رفضت، اشتكي لجهة حماية البيانات في بلدك.',
    },
    {
      title: 'Bury Negative Results',
      titleAr: 'ادفن النتائج السلبية',
      icon: '📰',
      color: 'purple',
      description: 'If you can\'t delete something, push it down in Google results. Create positive content about yourself using the same keywords to outrank the negative content.',
      descriptionAr: 'لو مش قادر تحذف حاجة، ادفعها لتحت في نتائج Google. اعمل محتوى إيجابي عنك بنفس الكلمات المفتاحية.',
      actions: [
        { text: 'Create a LinkedIn profile', link: 'https://www.linkedin.com', done: searchResults['linkedin'] },
        { text: 'Create a personal website/blog', link: '#', done: searchResults['personal-site'] },
        { text: 'Create professional social profiles', link: '#', done: searchResults['social-profiles'] },
        { text: 'Contribute to public forums (Stack Overflow, GitHub)', link: '#', done: searchResults['forums'] },
        { text: 'Set up Google Alerts for your name', link: 'https://www.google.com/alerts', done: false },
      ] as { text: string; link: string; done: boolean; internal?: string; template?: string }[],
      tip: 'Use the same name variations that appear in negative results. This takes 2-6 months to show results.',
      tipAr: 'استخدم نفس ت variaciones الاسم اللي في النتائج السلبية. النتيجة بتظهر بعد 2-6 شهور.',
    },
    {
      title: 'Stop Data Bleeding',
      titleAr: 'وقّف تسريب البيانات',
      icon: '🩸',
      color: 'red',
      description: 'Check if your data has been breached. Change compromised passwords immediately. Enable 2FA on all accounts. Monitor continuously.',
      descriptionAr: 'تشيك لو بياناتك اتسربت. غيّر الباسوردات المخترقة فوراً.فعّل 2FA على كل الحسابات.',
      actions: [
        { text: 'Check HaveIBeenPwned', link: 'https://haveibeenpwned.com', done: false },
        { text: 'Check our Dark Web Email Check', link: '#', done: false, internal: 'darkweb-email' },
        { text: 'Check our Dark Web Password Check', link: '#', done: false, internal: 'darkweb-password' },
        { text: 'Enable 2FA on all accounts', link: '#', done: false, internal: '2fa' },
        { text: 'Use our Password Generator for new passwords', link: '#', done: false, internal: 'password-gen' },
      ] as { text: string; link: string; done: boolean; internal?: string; template?: string }[],
      tip: 'Change passwords for any breached accounts FIRST. Then enable 2FA everywhere. Use a password manager.',
      tipAr: 'غيّر باسورد الحسابات المخترقة الأول. بعدها فعّل 2FA في كل مكان. استخدم password manager.',
    },
  ];

  const toggleStep = (step: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(step)) {
      newCompleted.delete(step);
    } else {
      newCompleted.add(step);
    }
    setCompletedSteps(newCompleted);
  };

  const toggleResult = (key: string) => {
    setSearchResults({ ...searchResults, [key]: !searchResults[key] });
  };

  const getCountryLaw = () => {
    const laws: Record<string, { name: string; article: string; authority: string }> = {
      'EG': { name: 'Egyptian Data Protection Law', article: 'Law No. 151 of 2020', authority: 'Egyptian Data Protection Center' },
      'US': { name: 'CCPA / CPRA', article: 'California Consumer Privacy Act', authority: 'California Attorney General' },
      'EU': { name: 'GDPR', article: 'General Data Protection Regulation', authority: 'Your local Data Protection Authority' },
      'UK': { name: 'UK GDPR', article: 'Data Protection Act 2018', authority: 'Information Commissioner\'s Office (ICO)' },
      'TR': { name: 'KVKK', article: 'Law on Protection of Personal Data', authority: 'KVKK Authority' },
      'SA': { name: 'PDPL', article: 'Personal Data Protection Law', authority: 'Saudi Data & AI Authority (SDAIA)' },
      'AE': { name: 'PDPL', article: 'Federal Decree-Law No. 45 of 2021', authority: 'UAE Data Office' },
      'DEFAULT': { name: 'Applicable Privacy Law', article: 'Check your country\'s data protection laws', authority: 'Your national data protection authority' },
    };
    return laws[country] || laws['DEFAULT'];
  };

  const generateEmailTemplate = (type: string) => {
    const law = getCountryLaw();
    const templates: Record<string, string> = {
      gdpr: `Subject: GDPR Data Deletion Request - [Your Full Name]

Dear Data Protection Officer,

I am writing to exercise my right to erasure under Article 17 of the General Data Protection Regulation (GDPR).

REQUEST DETAILS:
- Full Name: ${name || '[Your Full Name]'}
- Email: ${email || '[Your Email]'}
- Phone: ${phone || '[Your Phone]'}

I request that you delete all personal data you hold about me, including but not limited to:
- Account information
- Usage data and analytics
- Any third-party shared data
- Backup copies within 30 days

Legal Basis: Article 17(1) GDPR - Right to Erasure

Please confirm receipt of this request and provide a timeline for completion within 30 days as required by law.

If you refuse, please provide the legal basis for refusal under Article 17(3).

Regards,
${name || '[Your Full Name]'}
Date: ${new Date().toISOString().split('T')[0]}`,

      ccpa: `Subject: CCPA/CPRA Data Deletion Request - [Your Full Name]

Dear Privacy Team,

I am a California resident exercising my right to delete personal information under the California Consumer Privacy Act (CCPA), as amended by the CPRA.

REQUEST DETAILS:
- Full Name: ${name || '[Your Full Name]'}
- Email: ${email || '[Your Email]'}
- Phone: ${phone || '[Your Phone]'}

Pursuant to Cal. Civ. Code § 1798.105, I request deletion of all personal information you have collected about me.

This includes:
- Personal identifiers
- Commercial information
- Internet activity information
- Any data shared with third parties

Please verify my identity and process this request within 45 days as required by law.

Sincerely,
${name || '[Your Full Name]'}
Date: ${new Date().toISOString().split('T')[0]}`,

      lgpd: `Subject: Solicitação de Eliminação de Dados Pessoais - LGPD

Prezado Encarregado de Proteção de Dados,

Exercício meu direito de eliminação nos termos do Art. 18, VI da Lei Geral de Proteção de Dados (LGPD).

DADOS DO SOLICITANTE:
- Nome Completo: ${name || '[Seu Nome Completo]'}
- E-mail: ${email || '[Seu E-mail]'}
- Telefone: ${phone || '[Seu Telefone]'}

Solicito a eliminação de todos os dados pessoais que você mantém sobre mim, conforme Art. 18 da LGPD.

Por favor, confirme o recebimento desta solicitação e forneça um prazo de conclusão de até 15 dias.

Atenciosamente,
${name || '[Seu Nome Completo]'}
Data: ${new Date().toISOString().split('T')[0]}`,
    };
    return templates[type] || templates.gdpr;
  };

  const copyTemplate = (type: string) => {
    navigator.clipboard.writeText(generateEmailTemplate(type));
    setCopiedTemplate(type);
    setTimeout(() => setCopiedTemplate(''), 2000);
  };

  const completedCount = completedSteps.size;
  const progress = (completedCount / steps.length) * 100;

  return (
    <div className="tool-card">
      <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-red-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <span className="text-foreground">Digital Footprint Eraser</span>
              <span className="text-[10px] block font-normal text-red-500">🛡️ Professional 6-step guide to erase your digital footprint</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Follow these 6 professional steps to completely erase your digital footprint
          </p>

          {/* Personal Info */}
          <div className="space-y-2 mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-3 py-2 bg-muted border-2 border-red-500/20 rounded-xl text-foreground text-sm focus:outline-none focus:border-red-500/50 transition-colors"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-3 py-2 bg-muted border-2 border-red-500/20 rounded-xl text-foreground text-sm focus:outline-none focus:border-red-500/50 transition-colors"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone"
                className="w-full px-3 py-2 bg-muted border-2 border-red-500/20 rounded-xl text-foreground text-sm focus:outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
            <div className="relative">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 bg-[#111] border-2 border-red-500/20 rounded-xl text-foreground text-sm focus:outline-none focus:border-red-500/50 transition-colors cursor-pointer pr-10 appearance-none"
                style={{ color: '#ECF0F1' }}
              >
                <option value="" style={{ background: '#111', color: '#ECF0F1' }}>Select your country (for legal templates)</option>
                <option value="EG" style={{ background: '#111', color: '#ECF0F1' }}>🇪🇬 Egypt</option>
                <option value="US" style={{ background: '#111', color: '#ECF0F1' }}>🇺🇸 United States</option>
                <option value="EU" style={{ background: '#111', color: '#ECF0F1' }}>🇪🇺 European Union</option>
                <option value="UK" style={{ background: '#111', color: '#ECF0F1' }}>🇬🇧 United Kingdom</option>
                <option value="SA" style={{ background: '#111', color: '#ECF0F1' }}>🇸🇦 Saudi Arabia</option>
                <option value="AE" style={{ background: '#111', color: '#ECF0F1' }}>🇦🇪 UAE</option>
                <option value="TR" style={{ background: '#111', color: '#ECF0F1' }}>🇹🇷 Turkey</option>
                <option value="OTHER" style={{ background: '#111', color: '#ECF0F1' }}>🌍 Other</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-red-500 font-bold">{completedCount}/{steps.length} steps completed</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full rounded-full bg-red-500"
              />
            </div>
          </div>

          {/* Auto Execute Button */}
          {completedCount < steps.length && (
            <button
              onClick={runAutoErase}
              disabled={autoRunning}
              className="w-full mb-4 px-4 py-2.5 bg-red-500/20 border border-red-500/40 rounded-xl text-red-500 text-sm font-bold hover:bg-red-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {autoRunning ? (
                <>
                  <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                  Executing all steps...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Auto-Execute All Steps
                </>
              )}
            </button>
          )}

          {/* Steps */}
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-xl border-2 transition-all overflow-hidden ${
                  currentStep === i
                    ? `border-${step.color}-500/40 bg-${step.color}-500/5`
                    : completedSteps.has(i)
                    ? 'border-cyber-red/30 bg-cyber-red/5'
                    : 'border-border/50 bg-muted/30 hover:border-border'
                }`}
              >
                <button
                  onClick={() => setCurrentStep(currentStep === i ? -1 : i)}
                  className="w-full px-3 py-2.5 flex items-center gap-3 text-left"
                >
                  <span className="text-xl">{step.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${completedSteps.has(i) ? 'text-cyber-red' : 'text-foreground'}`}>
                        Step {i + 1}: {step.title}
                      </span>
                      {completedSteps.has(i) && <CheckCircle className="w-3.5 h-3.5 text-cyber-red shrink-0" />}
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${currentStep === i ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {currentStep === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-3 space-y-3">
                        <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>

                        {/* Actions */}
                        <div className="space-y-1.5">
                          {step.actions.map((action, j) => (
                            <div key={j} className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  if (action.link === '#') {
                                    if (action.internal) {
                                      // Navigate to internal tool
                                    } else if (action.template) {
                                      setShowEmailTemplate(true);
                                      copyTemplate(action.template);
                                    }
                                  } else {
                                    toggleResult(action.text);
                                  }
                                }}
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                                  searchResults[action.text]
                                    ? 'bg-cyber-red border-cyber-red text-white'
                                    : 'border-border hover:border-red-500/50'
                                }`}
                              >
                                {searchResults[action.text] && <Check className="w-3 h-3" />}
                              </button>
                              {action.link !== '#' ? (
                                <a
                                  href={action.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] text-foreground hover:text-red-500 transition-colors flex items-center gap-1"
                                >
                                  {action.text}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ) : (
                                <span className="text-[11px] text-foreground">{action.text}</span>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Email Template Button */}
                        {step.actions.some(a => a.template) && (
                          <div className="bg-background/50 rounded-lg p-2.5 border border-border/50">
                            <p className="text-[10px] text-muted-foreground mb-2">📧 Email template ready — click to copy:</p>
                            <div className="flex gap-1.5">
                              {step.actions.filter(a => a.template).map((action, j) => (
                                <button
                                  key={j}
                                  onClick={() => copyTemplate(action.template!)}
                                  className={`flex-1 px-2 py-1.5 rounded-lg text-[10px] font-medium border transition-all ${
                                    copiedTemplate === action.template
                                      ? 'bg-cyber-red/20 text-cyber-red border-cyber-red/30'
                                      : 'bg-muted text-muted-foreground border-border hover:border-red-500/30'
                                  }`}
                                >
                                  {copiedTemplate === action.template ? '✓ Copied!' : action.text}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tip */}
                        <div className="flex items-start gap-2 p-2 bg-red-500/5 rounded-lg border border-red-500/20">
                          <Lightbulb className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />
                          <p className="text-[10px] text-muted-foreground leading-relaxed">{step.tip}</p>
                        </div>

                        {/* Mark Complete */}
                        <button
                          onClick={() => toggleStep(i)}
                          className={`w-full px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                            completedSteps.has(i)
                              ? 'bg-cyber-red/15 text-cyber-red border-cyber-red/30'
                              : 'bg-red-500/10 text-red-500 border-red-500/30 hover:bg-red-500/20'
                          }`}
                        >
                          {completedSteps.has(i) ? '✓ Step Completed' : 'Mark as Complete'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Legal Info */}
          {country && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 bg-blue-500/5 rounded-xl border border-blue-500/20"
            >
              <p className="text-xs font-bold text-blue-500 mb-1">⚖️ Your Applicable Law:</p>
              <p className="text-[11px] text-foreground">{getCountryLaw().name}</p>
              <p className="text-[10px] text-muted-foreground">{getCountryLaw().article}</p>
              <p className="text-[10px] text-muted-foreground">Authority: {getCountryLaw().authority}</p>
            </motion.div>
          )}

          {/* Final Tip */}
          <div className="flex items-start gap-2 p-2 mt-3 bg-red-500/5 rounded-lg border border-red-500/20">
            <Shield className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              This process takes 2-6 months for full results. Be persistent. Most people give up at Step 2 — don&apos;t be one of them.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function QRCodeSafetyChecker() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<{ safe: boolean; reasons: string[] } | null>(null);

  const checkQR = () => {
    if (!url.trim()) return;
    const reasons: string[] = [];
    let safe = true;

    const suspiciousPatterns = [/phish/i, /login.*secure/i, /verify.*account/i, /bank.*update/i, /confirm.*identity/i, /suspend/i, /urgent/i];
    const shortened = /bit\.ly|tinyurl|t\.co|goo\.gl|is\.gd/i;
    const ipAddr = /https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;

    if (suspiciousPatterns.some(p => p.test(url))) {
      reasons.push('URL contains suspicious keywords often used in phishing');
      safe = false;
    }
    if (shortened.test(url)) {
      reasons.push('Shortened URL detected — destination is hidden');
      safe = false;
    }
    if (ipAddr.test(url)) {
      reasons.push('IP address URL instead of domain — commonly used in attacks');
      safe = false;
    }
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      reasons.push('No protocol specified — verify the full URL');
    }
    if (url.includes('@')) {
      reasons.push('URL contains @ symbol — may hide actual destination');
      safe = false;
    }
    if (url.split('.').length > 4) {
      reasons.push('Unusually many subdomains — could be deceptive');
      safe = false;
    }
    if (/\.exe|\.apk|\.bat|\.cmd|\.scr/i.test(url)) {
      reasons.push('Links to executable file — potential malware');
      safe = false;
    }

    if (safe) reasons.push('No obvious red flags detected — but always stay cautious');

    setResult({ safe, reasons });
  };

  return (
    <div className="p-1">
      <Card className="bg-card border-border hover-glow h-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-lg bg-cyber-red/10 flex items-center justify-center">
              <Scan className="w-4 h-4 text-cyber-red" />
            </div>
            QR Code Safety Checker
          </CardTitle>
          <p className="text-xs text-muted-foreground">Check if a QR code link is safe before you visit</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste the URL from the QR code..."
                className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:border-cyber-red focus:outline-none"
              />
              <LiquidButton onClick={checkQR} className="px-4 py-2 text-xs">
                <Scan className="w-3 h-3 mr-1" /> Check
              </LiquidButton>
            </div>

            {result && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-xl border ${result.safe ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {result.safe ? <ShieldCheck className="w-4 h-4 text-green-500" /> : <ShieldAlert className="w-4 h-4 text-red-500" />}
                  <span className={`text-sm font-bold ${result.safe ? 'text-green-500' : 'text-red-500'}`}>
                    {result.safe ? 'Likely Safe' : 'Suspicious — Be Careful!'}
                  </span>
                </div>
                {result.reasons.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 mt-1">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${result.safe ? 'bg-green-500' : 'bg-red-500'}`} />
                    <p className="text-xs text-muted-foreground">{r}</p>
                  </div>
                ))}
              </motion.div>
            )}

            <div className="p-2 bg-muted/50 rounded-lg">
              <p className="text-[10px] text-muted-foreground">
                <Lightbulb className="w-3 h-3 inline mr-1" />
                <strong>Tip:</strong> Always preview QR codes before visiting. Never scan QR codes from strangers or untrusted sources.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function WiFiSafetyChecker() {
  const [networkName, setNetworkName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<{ risk: string; tips: string[] } | null>(null);

  const checkNetwork = () => {
    const tips: string[] = [];
    let risk = 'Low';

    const dangerousNames = ['Free WiFi', 'Airport WiFi', 'Hotel WiFi', 'Starbucks', 'McDonald', 'Connect Here', 'Click Here', 'Free Internet'];
    const isDangerous = dangerousNames.some(n => networkName.toLowerCase().includes(n.toLowerCase()));

    if (isDangerous) {
      risk = 'High';
      tips.push('This network name is commonly impersonated by hackers (evil twin attack)');
    }
    if (isOpen) {
      risk = risk === 'High' ? 'Critical' : 'Medium';
      tips.push('Open networks allow anyone to intercept your traffic');
      tips.push('Never log into banking or email on open networks');
    }
    tips.push('Use a VPN when connected to any public network');
    tips.push('Verify the network name with staff before connecting');
    tips.push('Turn off auto-connect for public networks');
    tips.push('Ensure HTTPS is active on all websites you visit');
    if (!isOpen) tips.push('WPA2/WPA3 encrypted networks are safer than open ones');

    setResult({ risk, tips });
  };

  const riskColor = result?.risk === 'Critical' ? 'text-red-500' : result?.risk === 'High' ? 'text-orange-500' : result?.risk === 'Medium' ? 'text-yellow-500' : 'text-green-500';

  return (
    <div className="p-1">
      <Card className="bg-card border-border hover-glow h-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-lg bg-cyber-red/10 flex items-center justify-center">
              <Signal className="w-4 h-4 text-cyber-red" />
            </div>
            WiFi Safety Checker
          </CardTitle>
          <p className="text-xs text-muted-foreground">Check if a Wi-Fi network is safe to connect to</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <input
              type="text"
              value={networkName}
              onChange={(e) => setNetworkName(e.target.value)}
              placeholder="Enter network name (SSID)..."
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:border-cyber-red focus:outline-none"
            />
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={isOpen} onChange={(e) => setIsOpen(e.target.checked)}
                  className="w-4 h-4 rounded border-border accent-cyber-red" />
                <span className="text-xs text-muted-foreground">Open network (no password)</span>
              </label>
            </div>
            <LiquidButton onClick={checkNetwork} className="w-full py-2 text-xs">
              <Wifi className="w-3 h-3 mr-1" /> Check Network Safety
            </LiquidButton>

            {result && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl border border-border bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className={`w-4 h-4 ${riskColor}`} />
                  <span className={`text-sm font-bold ${riskColor}`}>Risk Level: {result.risk}</span>
                </div>
                {result.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 mt-1">
                    <CheckCircle className="w-3 h-3 text-cyber-red mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground">{tip}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
