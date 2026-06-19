'use client';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Lock, AlertTriangle, ExternalLink, X, ArrowLeft,
  Clock, Check, Eye, ShoppingCart, MessageSquare, BookOpen,
  Search, Globe, Users, Server,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  fakeCircuit, wikiCategories, marketProducts,
  forumThreads, chatMessages, educationalModules, securityTips,
  darkWebFAQ, type SimulationPage, type ChatMessage,
} from '@/lib/safe-gateway-data';

function generateOnionUrl(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz234567';
  return Array.from({ length: 56 }, () => chars[Math.floor(Math.random() * chars.length)]).join('') + '.sim';
}

function generateBitcoinAddress(): string {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  return 'bc1q' + Array.from({ length: 38 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

/* ═══════════════════════════════════════════════════════════
   MATRIX RAIN CANVAS (background effect)
   ═══════════════════════════════════════════════════════════ */
function MatrixRain({ opacity = 0.15 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.random() * -100);

    const interval = setInterval(() => {
      ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#9B59B6';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 35);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   PANIC BUTTON — Always visible
   ═══════════════════════════════════════════════════════════ */
function PanicButton({ onExit }: { onExit: () => void }) {
  return (
    <button onClick={onExit}
      className="fixed bottom-14 right-4 z-[300] px-4 py-2 bg-[#E74C3C] text-white text-sm font-bold rounded-lg shadow-lg hover:bg-[#C0392B] transition-all flex items-center gap-2">
      <X className="w-4 h-4" /> EXIT
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════
   REALITY CHECK NOTIFICATION
   ═══════════════════════════════════════════════════════════ */
function RealityCheck({ elapsed, onDismiss }: { elapsed: number; onDismiss: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-[250] bg-[#111111] border border-[#E74C3C]/50 rounded-xl px-6 py-4 shadow-2xl max-w-md">
      <div className="flex items-start gap-3">
        <Clock className="w-5 h-5 text-[#E74C3C] mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-bold text-[#ECF0F1] mb-1">Session Active</p>
          <p className="text-xs text-[#95A5A6]">
            Time elapsed: {Math.floor(elapsed / 60)}m {elapsed % 60}s
          </p>
          <button onClick={onDismiss} className="mt-2 text-xs text-[#9B59B6] hover:text-[#7D4698] transition-colors">
            Dismiss
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP 1: LEGAL DISCLAIMER (concise, professional)
   ═══════════════════════════════════════════════════════════ */
function DisclaimerStep({ onAccept }: { onAccept: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [checks, setChecks] = useState([false, false, false, false]);
  const [timer, setTimer] = useState(15);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const allChecked = checks.every(Boolean) && timer <= 0 && scrolled;

  const handleScroll = () => {
    const el = scrollRef.current;
    if (el && el.scrollTop + el.clientHeight >= el.scrollHeight - 50) setScrolled(true);
  };

  const toggleCheck = (i: number) => setChecks((prev) => { const n = [...prev]; n[i] = !n[i]; return n; });

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0a0a] flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-2xl w-full max-h-[90vh] bg-[#111111] border border-[#E74C3C]/30 rounded-2xl shadow-2xl flex flex-col">
        <div className="p-6 border-b border-[#2C3E50] text-center shrink-0">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#E74C3C]/10 flex items-center justify-center border border-[#E74C3C]/30">
            <Shield className="w-8 h-8 text-[#E74C3C]" />
          </div>
          <h2 className="text-xl font-bold text-[#ECF0F1] mb-1">LEGAL &amp; ETHICAL DISCLAIMER</h2>
          <p className="text-sm text-[#E74C3C] font-semibold">EDUCATIONAL SIMULATION ONLY</p>
        </div>

        <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="bg-[#E74C3C]/10 border border-[#E74C3C]/30 rounded-lg p-4 text-center">
            <p className="text-sm text-[#ECF0F1] font-semibold">This is a SIMULATION — not a real dark web site</p>
            <p className="text-xs text-[#95A5A6]">All content is fictional, generated locally, and for educational purposes only.</p>
          </div>

          <div className="space-y-2">
            {[
              'No real connection to any dark network — everything runs locally',
              'All links, pages, onions, and data are fictional and generated on this device',
              'No real data is exposed, collected, stored, or transmitted to any server',
              'All "products" and "services" are fake — no real illegal content is displayed',
            ].map((line, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[#95A5A6]">
                <span className="text-[#E74C3C] shrink-0">•</span>
                <span>{line}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#27AE60]/10 border border-[#27AE60]/30 rounded-lg p-4">
            <p className="text-sm text-[#27AE60] font-semibold">Purpose: Cybersecurity Education &amp; Risk Awareness</p>
          </div>

          <div className="bg-[#E74C3C]/10 border border-[#E74C3C]/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-[#E74C3C]" />
              <p className="text-sm text-[#E74C3C] font-semibold">AI-Generated Content Disclaimer</p>
            </div>
            <p className="text-xs text-[#95A5A6] leading-relaxed">
              A significant portion of the content in this simulation is generated by Artificial Intelligence (AI) for educational and illustrative purposes only.
              The website owner is <span className="text-[#ECF0F1] font-semibold">NOT responsible</span> for any misuse, illegal activities, or unethical applications of information found in this simulation.
              By entering, you agree that you will use this content strictly for <span className="text-[#ECF0F1] font-semibold">educational and research purposes only</span>.
              Any unauthorized or illegal use is solely the responsibility of the user.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-sm text-[#ECF0F1] font-semibold">By entering, you acknowledge and agree that:</p>
            {[
              'I understand this is an educational simulation, not a real dark web site',
              'I will not use any information from this simulation for illegal activities',
              'I understand real Dark Web access poses serious legal, security, and psychological risks',
              'I understand accessing illegal content is a crime punishable by imprisonment',
            ].map((text, i) => (
              <label key={i} className="flex items-start gap-3 cursor-pointer group" onClick={() => toggleCheck(i)}>
                <div className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${checks[i] ? 'bg-[#27AE60] border-[#27AE60]' : 'border-[#2C3E50] group-hover:border-[#9B59B6]'}`}>
                  {checks[i] && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-xs text-[#95A5A6] group-hover:text-[#ECF0F1] transition-colors">{text}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-[#2C3E50] text-center shrink-0">
          {timer > 0 ? (
            <div className="text-sm text-[#E74C3C] font-mono">Waiting period: {timer}s</div>
          ) : (
            <div className="text-sm text-[#27AE60] mb-3">Timer complete — you may proceed</div>
          )}
          <button onClick={onAccept} disabled={!allChecked}
            className={`px-8 py-3 rounded-lg font-bold text-sm transition-all ${
              allChecked
                ? 'bg-[#9B59B6] text-white hover:bg-[#8E44AD] cursor-pointer'
                : 'bg-[#2C3E50] text-[#7F8C8D] cursor-not-allowed'
            }`}>
            I Understand &amp; Agree — Enter Simulation
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP 2:    SECURE BROWSER LAUNCH ANIMATION
   ═══════════════════════════════════════════════════════════ */
function SecureBrowserLaunch({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing Secure Browser...');
  const [showCircuit, setShowCircuit] = useState(false);
  const [ip, setIp] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = useCallback((msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  }, []);

  useEffect(() => {
    const messages = [
      { p: 5, s: 'Loading network consensus...', log: 'Connecting to directory authorities...' },
      { p: 12, s: 'Selecting guard node...', log: 'Guard node selected: Relay-A' },
      { p: 22, s: 'Establishing TLS handshake...', log: 'TLS 1.3 handshake with guard node complete' },
      { p: 30, s: 'Building encrypted circuit...', log: 'Circuit #4827 created with 3 relays' },
      { p: 42, s: 'Negotiating with middle relay...', log: 'Middle relay: Relay-B — latency 23ms' },
      { p: 55, s: 'Establishing exit node connection...', log: 'Exit relay: Relay-C' },
      { p: 65, s: 'Performing DNS resolution...', log: 'DNS resolution via exit node — all traffic encrypted' },
      { p: 78, s: 'Verifying circuit integrity...', log: 'Circuit integrity verified — no anomalies detected' },
      { p: 88, s: 'Testing bandwidth and latency...', log: 'Bandwidth: 12.4 Mbps — Latency: 187ms' },
      { p: 95, s: 'Final security checks...', log: 'Browser fingerprint normalization: active' },
      { p: 100, s: 'Connected — ready to browse', log: 'Secure Browser ready — all traffic routed through 3 relays' },
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setProgress(messages[i].p);
        setStatus(messages[i].s);
        addLog(messages[i].log);
        i++;
      } else {
        clearInterval(interval);
        setIp('10.0.0.' + Math.floor(Math.random() * 254 + 1));
        setShowCircuit(true);
        setTimeout(onComplete, 2000);
      }
    }, 700);
    return () => clearInterval(interval);
  }, [onComplete, addLog]);

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-[#111111] border border-[#9B59B6]/30 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-[#1a1a2e] px-4 py-3 border-b border-[#2C3E50]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#E74C3C]" />
              <div className="w-3 h-3 rounded-full bg-[#F39C12]" />
              <div className="w-3 h-3 rounded-full bg-[#27AE60]" />
            </div>
            <div className="flex-1 bg-[#0a0a0a] rounded-lg px-3 py-1.5 mx-4">
              <span className="text-xs text-[#7F8C8D] font-mono">🔒 Secure Browser v13.0.1</span>
            </div>
          </div>
        </div>

        <div className="p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#9B59B6]/10 flex items-center justify-center border border-[#9B59B6]/30">
            <span className="text-4xl">🧅</span>
          </div>
          <h3 className="text-lg font-bold text-[#ECF0F1] mb-1">Secure Browser</h3>
          <p className="text-sm text-[#95A5A6] mb-6">{status}</p>

          <div className="w-full bg-[#2C3E50] rounded-full h-3 mb-2">
            <motion.div className="bg-gradient-to-r from-[#9B59B6] to-[#7D4698] h-3 rounded-full"
              initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
          </div>
          <p className="text-xs text-[#7F8C8D] font-mono">{progress}%</p>

          <div className="mt-4 bg-[#0a0a0a] rounded-lg p-3 border border-[#2C3E50] text-left max-h-32 overflow-y-auto">
            {logs.map((log, i) => (
              <p key={i} className="text-xs text-[#7F8C8D] font-mono leading-relaxed">{log}</p>
            ))}
          </div>

          <AnimatePresence>
            {showCircuit && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-[#0a0a0a] rounded-lg p-4 border border-[#9B59B6]/30">
                <p className="text-xs text-[#9B59B6] font-semibold mb-3">Circuit Established</p>
                <div className="flex items-center justify-center gap-2 text-xs font-mono flex-wrap">
                  <span className="px-2 py-1 bg-[#27AE60]/10 text-[#27AE60] rounded">You</span>
                  <span className="text-[#7F8C8D]">→</span>
                  <span className="px-2 py-1 bg-[#9B59B6]/10 text-[#9B59B6] rounded">{fakeCircuit.guard.flag} Guard</span>
                  <span className="text-[#7F8C8D]">→</span>
                  <span className="px-2 py-1 bg-[#9B59B6]/10 text-[#9B59B6] rounded">{fakeCircuit.middle.flag} Middle</span>
                  <span className="text-[#7F8C8D]">→</span>
                  <span className="px-2 py-1 bg-[#9B59B6]/10 text-[#9B59B6] rounded">{fakeCircuit.exit.flag} Exit</span>
                  <span className="text-[#7F8C8D]">→</span>
                  <span className="px-2 py-1 bg-[#00b4ff]/10 text-[#00b4ff] rounded">Internet</span>
                </div>
                {ip && (
                  <p className="text-xs text-[#27AE60] mt-3">Your IP: {ip} (Exit Node — Virtual)</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   LANDING PAGE — Realistic dark web portal
   ═══════════════════════════════════════════════════════════ */
function LandingPage({ onEnter }: { onEnter: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { wiki: [] as typeof wikiCategories, products: [] as typeof marketProducts, threads: [] as typeof forumThreads };
    const q = searchQuery.toLowerCase();
    const wiki = wikiCategories.map(cat => ({
      ...cat,
      links: cat.links.filter(l => l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)),
    })).filter(cat => cat.links.length > 0);
    const products = marketProducts.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    const threads = forumThreads.filter(t => t.title.toLowerCase().includes(q) || t.tags.some(tag => tag.includes(q)));
    return { wiki, products, threads };
  }, [searchQuery]);

  const hasResults = searchResults.wiki.length > 0 || searchResults.products.length > 0 || searchResults.threads.length > 0;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const categories = [
    { name: 'Financial Services', icon: <Globe className="w-5 h-5" />, count: wikiCategories[0].links.length, color: '#F7931A' },
    { name: 'Anonymity & Privacy', icon: <Shield className="w-5 h-5" />, count: wikiCategories[1].links.length, color: '#27AE60' },
    { name: 'Cracked Software', icon: <Server className="w-5 h-5" />, count: wikiCategories[2].links.length, color: '#E74C3C' },
    { name: 'Malware & Exploits', icon: <AlertTriangle className="w-5 h-5" />, count: wikiCategories[3].links.length, color: '#E74C3C' },
    { name: 'Forums & Discussion', icon: <MessageSquare className="w-5 h-5" />, count: wikiCategories[4].links.length, color: '#3498DB' },
    { name: 'Legitimate Services', icon: <Check className="w-5 h-5" />, count: wikiCategories[5].links.length, color: '#27AE60' },
    { name: 'Marketplace', icon: <ShoppingCart className="w-5 h-5" />, count: marketProducts.length, color: '#E67E22' },
    { name: 'Community Forum', icon: <Users className="w-5 h-5" />, count: forumThreads.length, color: '#9B59B6' },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0a0a] overflow-y-auto">
      {/* Header */}
      <header className="relative z-10 border-b border-[#1a1a2e]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#9B59B6]/20 flex items-center justify-center border border-[#9B59B6]/30">
              <span className="text-2xl">🧅</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#ECF0F1] tracking-tight">The Hidden Wiki</h1>
              <p className="text-xs text-[#7F8C8D]">SIMULATION — EDUCATIONAL PURPOSE ONLY</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => { setSearchOpen(true); setTimeout(() => searchInputRef.current?.focus(), 100); }}
              className="flex items-center gap-2 px-3 py-2 bg-[#111111] border border-[#2C3E50] rounded-lg text-xs text-[#7F8C8D] hover:border-[#9B59B6]/50 transition-colors">
              <Search className="w-3 h-3" />
              <span>Search...</span>
              <kbd className="text-[8px] bg-[#2C3E50] px-1.5 py-0.5 rounded ml-2 font-mono">Ctrl+K</kbd>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 py-20 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-[#9B59B6]/10 flex items-center justify-center border border-[#9B59B6]/30 shadow-lg shadow-[#9B59B6]/10">
            <span className="text-5xl">🧅</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#ECF0F1] mb-3 tracking-tight">
            The Hidden <span className="text-[#9B59B6]">Wiki</span>
          </h1>
          <p className="text-sm text-[#7F8C8D] max-w-lg mx-auto mb-8">
            Your gateway to understanding the dark web — safely, legally, and educationally.
            This is a simulation. No real connections are made.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7F8C8D]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search wiki, marketplace, forum..."
                className="w-full pl-12 pr-4 py-4 bg-[#111111] border border-[#2C3E50] rounded-xl text-sm text-[#ECF0F1] placeholder-[#7F8C8D] focus:border-[#9B59B6] focus:outline-none focus:ring-1 focus:ring-[#9B59B6]/50 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7F8C8D] hover:text-[#ECF0F1]">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Search Results */}
          <AnimatePresence>
            {searchOpen && searchQuery && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="max-w-3xl mx-auto mb-12 text-left">
                <div className="bg-[#111111] border border-[#2C3E50] rounded-xl p-4 max-h-96 overflow-y-auto">
                  {!hasResults && (
                    <p className="text-xs text-[#7F8C8D] text-center py-4">No results found for &quot;{searchQuery}&quot;</p>
                  )}
                  {searchResults.wiki.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-[#9B59B6] font-bold uppercase tracking-wider mb-2">Hidden Wiki</p>
                      {searchResults.wiki.map(cat => cat.links.map(link => (
                        <div key={link.title} className="flex items-center justify-between py-2 px-2 hover:bg-[#2C3E50]/30 rounded transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-[#ECF0F1] truncate">{link.title}</p>
                            <p className="text-xs text-[#7F8C8D] truncate">{link.description}</p>
                          </div>
                          <span className={`ml-2 text-[8px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                            link.status === 'online' ? 'text-[#27AE60]' : link.status === 'seized' ? 'text-[#E74C3C]' : link.status === 'scam' ? 'text-[#F39C12]' : 'text-[#7F8C8D]'
                          }`}>{link.status.toUpperCase()}</span>
                        </div>
                      )))}
                    </div>
                  )}
                  {searchResults.products.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-[#E67E22] font-bold uppercase tracking-wider mb-2">Marketplace</p>
                      {searchResults.products.map(p => (
                        <div key={p.id} className="flex items-center justify-between py-2 px-2 hover:bg-[#2C3E50]/30 rounded transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-[#ECF0F1] truncate">{p.name}</p>
                            <p className="text-xs text-[#7F8C8D]">{p.vendor} • ⭐ {p.rating}</p>
                          </div>
                          <span className="ml-2 text-xs text-[#F7931A] font-mono shrink-0">{p.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {searchResults.threads.length > 0 && (
                    <div>
                      <p className="text-xs text-[#3498DB] font-bold uppercase tracking-wider mb-2">Forum</p>
                      {searchResults.threads.map(t => (
                        <div key={t.id} className="flex items-center justify-between py-2 px-2 hover:bg-[#2C3E50]/30 rounded transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-[#ECF0F1] truncate">{t.title}</p>
                            <p className="text-xs text-[#7F8C8D]">{t.author} • {t.replies} replies • {t.views.toLocaleString()} views</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button onClick={onEnter}
            className="px-10 py-4 bg-gradient-to-r from-[#9B59B6] to-[#7D4698] text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-[#9B59B6]/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
            Enter the Dark Web
          </button>
        </motion.div>
      </section>

      {/* Category Grid */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-12">
        <h2 className="text-xs text-[#7F8C8D] font-bold uppercase tracking-wider mb-4 text-center">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <motion.div key={cat.name} whileHover={{ scale: 1.02, y: -2 }}
              className="bg-[#111111] border border-[#2C3E50] rounded-xl p-4 cursor-default hover:border-[#9B59B6]/30 transition-colors">
              <div className="mb-2" style={{ color: cat.color }}>{cat.icon}</div>
              <p className="text-xs font-bold text-[#ECF0F1] mb-1">{cat.name}</p>
              <p className="text-xs text-[#7F8C8D]">{cat.count} links</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 border-t border-[#1a1a2e] bg-[#111111]/50">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-center gap-8 md:gap-16">
          <div className="text-center">
            <p className="text-lg font-bold text-[#ECF0F1]">1,247</p>
            <p className="text-xs text-[#7F8C8D]">online users</p>
          </div>
          <div className="w-px h-8 bg-[#2C3E50]" />
          <div className="text-center">
            <p className="text-lg font-bold text-[#ECF0F1]">45,892</p>
            <p className="text-xs text-[#7F8C8D]">hidden services</p>
          </div>
          <div className="w-px h-8 bg-[#2C3E50]" />
          <div className="text-center">
            <p className="text-lg font-bold text-[#27AE60]">Last updated: 2 min ago</p>
            <p className="text-xs text-[#7F8C8D]">all data simulated</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#1a1a2e] py-6 text-center">
        <p className="text-xs text-[#7F8C8D]">
          This is an educational simulation. No real dark web content is displayed. All data is fictional and generated locally.
        </p>
      </footer>

      {/* No backdrop overlay — scroll works freely */}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECURE BROWSER UI SHELL
   ═══════════════════════════════════════════════════════════ */
function BrowserShell({
  currentUrl, onNavigate, onExit, children,
}: {
  currentUrl: string;
  onNavigate: (url: string) => void;
  onExit: () => void;
  children: React.ReactNode;
}) {
  const [showCircuit, setShowCircuit] = useState(false);
  const [securityLevel, setSecurityLevel] = useState('Standard');
  const [activeTab, setActiveTab] = useState('wiki');

  const handleTab = (id: string) => {
    setActiveTab(id);
    onNavigate(id);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col">
      {/* Browser Chrome */}
      <div className="bg-[#1a1a2e] border-b border-[#2C3E50] shrink-0">
        <div className="flex items-center px-2 pt-1">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-[#0a0a0a] rounded-t-lg border border-[#2C3E50] border-b-0">
            <span className="text-xs">🧅</span>
            <span className="text-xs text-[#ECF0F1] max-w-[140px] truncate">Dark Web Simulation</span>
            <button onClick={onExit} className="ml-2 text-[#7F8C8D] hover:text-[#E74C3C]">×</button>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-2">
          <button onClick={() => onNavigate('wiki')} className="p-2 rounded hover:bg-[#2C3E50] text-[#95A5A6] hover:text-[#ECF0F1]">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button className="p-2 rounded hover:bg-[#2C3E50] text-[#95A5A6] hover:text-[#ECF0F1]">↻</button>

          <div className="flex-1 flex items-center bg-[#0a0a0a] rounded-lg px-3 py-1.5 border border-[#2C3E50]">
            <Lock className="w-3 h-3 text-[#27AE60] mr-2 shrink-0" />
            <input type="text" value={currentUrl}
              readOnly
              className="flex-1 bg-transparent text-xs text-[#ECF0F1] font-mono outline-none truncate cursor-default" />
          </div>

          <button onClick={() => setShowCircuit(!showCircuit)}
            className="p-2 rounded hover:bg-[#2C3E50] text-[#95A5A6] hover:text-[#ECF0F1] relative"
            title="Network Circuit">
            <span className="text-xs">⚡</span>
          </button>
          <button className="p-2 rounded hover:bg-[#2C3E50] text-[#95A5A6] hover:text-[#ECF0F1]"
            title="Security Level" onClick={() => {
              const levels = ['Standard', 'Safer', 'Safest'];
              setSecurityLevel(levels[(levels.indexOf(securityLevel) + 1) % levels.length]);
            }}>
            <Shield className="w-4 h-4" />
          </button>
          <button onClick={onExit} className="p-2 rounded hover:bg-[#E74C3C]/20 text-[#E74C3C] text-xs font-bold">
            EXIT
          </button>
        </div>

        <div className="flex items-center gap-4 px-4 py-1.5 bg-[#111111] border-t border-[#2C3E50] text-xs text-[#7F8C8D]">
          <span>⚡ Security: {securityLevel}</span>
          <span>🛡️ Encrypted</span>
          <span className="ml-auto">🔒 Secure Connection</span>
        </div>
      </div>

      <AnimatePresence>
        {showCircuit && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
            className="bg-[#111111] border-b border-[#2C3E50] px-4 py-3 shrink-0">
            <p className="text-xs text-[#9B59B6] font-semibold mb-2">Current Circuit for this site:</p>
            <div className="space-y-1 text-xs font-mono">
              <div className="text-[#ECF0F1]">├─ 🌐 This Browser</div>
              <div className="text-[#9B59B6]">├─ {fakeCircuit.guard.flag} Guard: {fakeCircuit.guard.ip} ({fakeCircuit.guard.provider})</div>
              <div className="text-[#9B59B6]">├─ {fakeCircuit.middle.flag} Middle: {fakeCircuit.middle.ip} ({fakeCircuit.middle.provider})</div>
              <div className="text-[#9B59B6]">└─ {fakeCircuit.exit.flag} Exit: {fakeCircuit.exit.ip} ({fakeCircuit.exit.provider})</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-1 px-3 py-1.5 bg-[#0a0a0a] border-b border-[#2C3E50] shrink-0">
        {[
          { id: 'wiki', icon: <Eye className="w-3 h-3" />, label: 'Hidden Wiki' },
          { id: 'marketplace', icon: <ShoppingCart className="w-3 h-3" />, label: 'Market' },
          { id: 'forum', icon: <MessageSquare className="w-3 h-3" />, label: 'Forum' },
          { id: 'mixer', icon: <Lock className="w-3 h-3" />, label: 'Mixer' },
          { id: 'education', icon: <BookOpen className="w-3 h-3" />, label: 'Learn' },
        ].map((tab) => (
          <button key={tab.id}
            onClick={() => handleTab(tab.id)}
            className={`flex items-center gap-1 px-2.5 py-2 rounded text-xs transition-all ${
              activeTab === tab.id
                ? 'bg-[#9B59B6]/20 text-[#9B59B6] border border-[#9B59B6]/30'
                : 'text-[#7F8C8D] hover:text-[#95A5A6] hover:bg-[#2C3E50]/30'
            }`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {children}
      </div>

      <div className="bg-[#1a1a2e] border-t border-[#2C3E50] px-4 py-1.5 flex items-center gap-4 text-xs text-[#7F8C8D] shrink-0">
        <span>🔒 Circuit established</span>
        <span>Encrypted</span>
        <span className="font-mono">{fakeCircuit.exit.ip}</span>
        <span className="ml-auto">⚡ {securityLevel}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE: HIDDEN WIKI (with search, upvotes, last seen, status)
   ═══════════════════════════════════════════════════════════ */
function HiddenWikiPage({ onNavigate, onNavigateLink }: { onNavigate: (url: string) => void; onNavigateLink: (link: { title: string; description: string; status: string; category: string }) => void }) {
  const [selectedLink, setSelectedLink] = useState<{ title: string; description: string; status: string; upvotes: number; lastSeen: string; category: string } | null>(null);
  const [visitedLinks, setVisitedLinks] = useState<Set<string>>(new Set());
  const [wikiSearch, setWikiSearch] = useState('');

  const statusColors: Record<string, string> = {
    online: 'bg-[#27AE60]/10 text-[#27AE60] border-[#27AE60]/30',
    offline: 'bg-[#7F8C8D]/10 text-[#7F8C8D] border-[#7F8C8D]/30',
    seized: 'bg-[#E74C3C]/10 text-[#E74C3C] border-[#E74C3C]/30',
    scam: 'bg-[#F39C12]/10 text-[#F39C12] border-[#F39C12]/30',
  };

  const statusLabels: Record<string, string> = {
    online: 'ONLINE',
    offline: 'OFFLINE',
    seized: 'SEIZED',
    scam: 'SCAM',
  };

  const handleLinkClick = (link: { title: string; description: string; url: string; status: string; upvotes: number; lastSeen: string; category: string }) => {
    setSelectedLink({ title: link.title, description: link.description, status: link.status, upvotes: link.upvotes, lastSeen: link.lastSeen, category: link.category });
    setVisitedLinks(prev => new Set([...prev, link.title]));
  };

  const filteredCategories = useMemo(() => {
    if (!wikiSearch.trim()) return wikiCategories;
    const q = wikiSearch.toLowerCase();
    return wikiCategories.map(cat => ({
      ...cat,
      links: cat.links.filter(l => l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)),
    })).filter(cat => cat.links.length > 0);
  }, [wikiSearch]);

  return (
    <div className="bg-[#0a0a0a] min-h-full p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#ECF0F1] mb-1">The Hidden Wiki</h1>
      <p className="text-xs text-[#7F8C8D]">Last updated: 2024-03-15 | Status indicators show real-world equivalents</p>
        </div>

        {/* Wiki Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7F8C8D]" />
          <input
            type="text"
            value={wikiSearch}
            onChange={(e) => setWikiSearch(e.target.value)}
            placeholder="Search links in Hidden Wiki..."
            className="w-full pl-10 pr-4 py-3 bg-[#111111] border border-[#2C3E50] rounded-lg text-sm text-[#ECF0F1] placeholder-[#7F8C8D] focus:border-[#9B59B6] focus:outline-none"
          />
          {wikiSearch && (
            <button onClick={() => setWikiSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7F8C8D] hover:text-[#ECF0F1]">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredCategories.map((cat) => (
            <Card key={cat.name} className="bg-[#111111] border-[#2C3E50]">
              <CardContent className="p-4">
                <h3 className="text-sm font-bold text-[#ECF0F1] mb-3 flex items-center gap-2">
                  <span>{cat.icon}</span> {cat.name}
                  <span className="text-xs text-[#7F8C8D]">[{cat.links.length}]</span>
                </h3>
                <div className="space-y-2">
                  {cat.links.map((link) => (
                    <div key={link.title}
                      className={`flex items-center justify-between p-2 rounded cursor-pointer group transition-all ${visitedLinks.has(link.title) ? 'bg-[#27AE60]/5 border border-[#27AE60]/20' : 'hover:bg-[#2C3E50]/30'}`}
                      onClick={() => handleLinkClick(link)}>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#9B59B6] group-hover:text-[#ECF0F1] transition-colors flex items-center gap-1 truncate">
                          {link.title}
                          {visitedLinks.has(link.title) && <span className="text-[#27AE60] text-[10px] shrink-0">✓</span>}
                        </p>
                        <p className="text-xs text-[#7F8C8D] truncate">{link.description}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[9px] text-[#9B59B6]">▲ {link.upvotes}</span>
                          <span className="text-[9px] text-[#7F8C8D] flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" /> {link.lastSeen}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded border ${statusColors[link.status]}`}>
                          {statusLabels[link.status]}
                        </span>
                        <ExternalLink className="w-3 h-3 text-[#7F8C8D] group-hover:text-[#9B59B6]" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Stats */}
        <div className="mt-6 bg-[#111111] border border-[#2C3E50] rounded-lg p-4">
          <h3 className="text-xs font-bold text-[#9B59B6] mb-2">📊 Simulation Stats</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-[#E74C3C]">{visitedLinks.size}</p>
              <p className="text-xs text-[#7F8C8D]">Links Visited</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[#F7931A]">{wikiCategories.reduce((a, c) => a + c.links.length, 0)}</p>
              <p className="text-xs text-[#7F8C8D]">Total Links</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[#27AE60]">3</p>
              <p className="text-xs text-[#7F8C8D]">Relays Active</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[#9B59B6]">256-bit</p>
              <p className="text-xs text-[#7F8C8D]">Encryption</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-[#7F8C8D]">
            In the real dark web, most links lead to scams, malware, or law enforcement honeypots. Legitimate privacy tools are available on the clearnet.
          </p>
        </div>

        {/* Link Detail Modal */}
        <AnimatePresence>
          {selectedLink && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-black/60 flex items-center justify-center p-4"
              onClick={() => setSelectedLink(null)}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                className="bg-[#111111] border border-[#E74C3C]/50 rounded-2xl max-w-md w-full p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-[#E74C3C]" />
                  <h3 className="text-lg font-bold text-[#ECF0F1]">{selectedLink.title}</h3>
                </div>
                <p className="text-sm text-[#95A5A6] mb-3">
                  You clicked: <span className="text-[#9B59B6] font-semibold">{selectedLink.title}</span>
                </p>
                <div className="bg-[#0a0a0a] rounded-lg p-4 mb-4 border border-[#2C3E50]">
                  <p className="text-xs text-[#7F8C8D] mb-2">This link would normally lead to:</p>
                  <p className="text-sm text-[#ECF0F1]">{selectedLink.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-xs text-[#7F8C8D]">Status: <span className={`font-bold ${selectedLink.status === 'seized' ? 'text-[#E74C3C]' : selectedLink.status === 'scam' ? 'text-[#F39C12]' : 'text-[#27AE60]'}`}>{selectedLink.status.toUpperCase()}</span></p>
                    <p className="text-xs text-[#9B59B6]">▲ {selectedLink.upvotes} upvotes</p>
                    <p className="text-xs text-[#7F8C8D] flex items-center gap-1"><Clock className="w-3 h-3" /> {selectedLink.lastSeen}</p>
                  </div>
                </div>
                <div className="bg-[#E74C3C]/10 border border-[#E74C3C]/30 rounded-lg p-3 mb-4">
                  <p className="text-xs text-[#E74C3C] font-semibold mb-1">Why this is dangerous in reality:</p>
                  <ul className="space-y-1 text-xs text-[#95A5A6]">
                    <li>• Most dark web links lead to scam pages or phishing sites</li>
                    <li>• Many are law enforcement honeypots designed to catch criminals</li>
                    <li>• Clicking can expose your IP and identity even through encrypted browsers</li>
                    <li>• Links change frequently as sites get seized or shut down</li>
                  </ul>
                </div>
                <button onClick={() => {
                  if (selectedLink) {
                    onNavigateLink(selectedLink);
                    setSelectedLink(null);
                  }
                }}
                  className="w-full py-2 bg-[#9B59B6] text-white rounded-lg text-sm font-bold hover:bg-[#8E44AD] transition-colors">
                  Open Link
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE: MARKETPLACE (with descriptions, escrow, reputation)
   ═══════════════════════════════════════════════════════════ */
function MarketplacePage() {
  const [selectedProduct, setSelectedProduct] = useState<typeof marketProducts[0] | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [fakeOrderComplete, setFakeOrderComplete] = useState(false);
  const [scamDetected, setScamDetected] = useState(false);
  const [fakeTxId] = useState(() => Math.random().toString(16).slice(2, 18));

  const handleBuy = () => setShowCheckout(true);

  const handleFakePayment = () => {
    setShowCheckout(false);
    setFakeOrderComplete(true);
    setTimeout(() => {
      setScamDetected(true);
      setFakeOrderComplete(false);
    }, 3000);
  };

  return (
    <div className="bg-[#0a0a0a] min-h-full p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#ECF0F1] mb-1">Marketplace</h1>
          <p className="text-xs text-[#7F8C8D]">Verified vendors only — Escrow protection available</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {marketProducts.map((product) => (
            <Card key={product.id} className="bg-[#111111] border-[#2C3E50] hover:border-[#E74C3C]/50 transition-all cursor-pointer group"
              onClick={() => setSelectedProduct(product)}>
              <CardContent className="p-4">
                <div className="w-full h-28 bg-[#1a1a2e] rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#E74C3C]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-sm font-bold text-[#ECF0F1] mb-1 truncate">{product.name}</h3>
                <p className="text-xs text-[#7F8C8D] mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center gap-2 text-xs text-[#7F8C8D] mb-2">
                  <span>Vendor: {product.vendor}</span>
                  <span>•</span>
                  <span>⭐ {product.rating}</span>
                  <span>•</span>
                  <span>{product.sales} sales</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {product.escrow && (
                    <span className="px-1.5 py-0.5 text-[8px] font-bold rounded bg-[#27AE60]/10 text-[#27AE60] border border-[#27AE60]/30">
                      ESCROW
                    </span>
                  )}
                  <span className="text-[9px] text-[#7F8C8D]">{product.stealth}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#F7931A] font-mono">{product.price}</span>
                  <span className="text-xs text-[#7F8C8D]">{product.category}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && !showCheckout && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-black/60 flex items-center justify-center p-4"
              onClick={() => setSelectedProduct(null)}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                className="bg-[#111111] border border-[#E74C3C]/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-[#E74C3C]" />
                  <h3 className="text-lg font-bold text-[#ECF0F1]">{selectedProduct.name}</h3>
                </div>
                <h4 className="text-sm font-bold text-[#9B59B6] mb-2">{selectedProduct.name}</h4>
                <p className="text-xs text-[#95A5A6] mb-3">{selectedProduct.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#95A5A6] mb-3">
                  <span>Vendor: <span className="text-[#ECF0F1]">{selectedProduct.vendor}</span></span>
                  <span>Rating: ⭐ {selectedProduct.rating} / 5.0</span>
                  <span>Sales: <span className="text-[#ECF0F1]">{selectedProduct.sales}</span></span>
                  <span>Category: <span className="text-[#ECF0F1]">{selectedProduct.category}</span></span>
                  <span>Ships From: <span className="text-[#ECF0F1]">{selectedProduct.shipsFrom}</span></span>
                  <span>Delivery: <span className="text-[#ECF0F1]">{selectedProduct.stealth}</span></span>
                  <span>Escrow: <span className={selectedProduct.escrow ? 'text-[#27AE60]' : 'text-[#E74C3C]'}>{selectedProduct.escrow ? 'Yes' : 'No'}</span></span>
                </div>
                <div className="bg-[#F39C12]/10 border border-[#F39C12]/30 rounded-lg p-3 mb-4">
                  <p className="text-xs text-[#F39C12] font-semibold mb-1">Vendor Reputation Analysis:</p>
                  <p className="text-xs text-[#95A5A6]">
                    {selectedProduct.rating >= 4.5 ? 'High rating — but in the real dark web, ratings are easily faked with shill accounts.' :
                     selectedProduct.rating >= 3.0 ? 'Moderate rating — many scammers maintain decent ratings by completing small orders first.' :
                     'Low rating — a clear warning sign. In reality, even 5-star vendors can be law enforcement.'}
                  </p>
                </div>
                <div className="bg-[#E74C3C]/10 border border-[#E74C3C]/30 rounded-lg p-3 mb-4">
                  <p className="text-xs text-[#E74C3C] font-semibold mb-1">⚠️ Real-World Consequences:</p>
                  <ul className="space-y-1 text-xs text-[#95A5A6]">
                    {selectedProduct.realConsequences.map((c, i) => (
                      <li key={i}>• {c}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#F7931A]/10 border border-[#F7931A]/30 rounded-lg p-3 mb-4">
                  <p className="text-xs text-[#F7931A] font-semibold">Price: {selectedProduct.price} BTC</p>
                  <p className="text-xs text-[#7F8C8D] font-mono mt-1">Address: {generateBitcoinAddress()}</p>
                </div>
                <div className="bg-[#E74C3C]/10 border border-[#E74C3C]/30 rounded-lg p-3 mb-4">
                  <p className="text-xs text-[#E74C3C] font-semibold mb-1">Educational Warning:</p>
                  <p className="text-xs text-[#95A5A6]">{selectedProduct.educationalWarning}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSelectedProduct(null)}
                    className="flex-1 py-2 bg-[#2C3E50] text-white rounded-lg text-sm font-bold hover:bg-[#34495E] transition-colors">
                    Close
                  </button>
                  <button onClick={handleBuy}
                    className="flex-1 py-2 bg-[#E74C3C] text-white rounded-lg text-sm font-bold hover:bg-red-600 transition-colors">
                    Buy Now
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Checkout Scam Alert */}
        <AnimatePresence>
          {showCheckout && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-black/60 flex items-center justify-center p-4"
              onClick={() => setShowCheckout(false)}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                className="bg-[#111111] border border-[#E74C3C]/50 rounded-2xl max-w-md w-full p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto bg-[#E74C3C]/20 rounded-full flex items-center justify-center mb-3">
                    <Lock className="w-8 h-8 text-[#E74C3C]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#ECF0F1]">Checkout</h3>
                </div>
                <div className="bg-[#0a0a0a] rounded-lg p-4 mb-4 border border-[#2C3E50]">
                  <p className="text-xs text-[#95A5A6] mb-2">Payment would be in Bitcoin:</p>
                  <div className="bg-[#111111] rounded p-2 font-mono text-xs text-[#7F8C8D] break-all">
                    {generateBitcoinAddress()}
                  </div>
                </div>
                <div className="bg-[#E74C3C]/10 border border-[#E74C3C]/30 rounded-lg p-3 mb-4">
                  <p className="text-xs text-[#E74C3C] font-semibold mb-1">⚠️ SCAM WARNING:</p>
                  <p className="text-xs text-[#95A5A6]">
                    In reality, 99% of dark web marketplace purchases are scams. Once you send Bitcoin, you never see it again.
                    The &quot;vendor&quot; is likely law enforcement or a scammer. Your payment is permanently traceable on the blockchain.
                  </p>
                </div>
                <button onClick={handleFakePayment}
                  className="w-full py-3 bg-[#F7931A] text-white rounded-lg text-sm font-bold hover:bg-[#E67E22] transition-colors">
                  Send Bitcoin
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Order Complete → Scam Detection */}
        <AnimatePresence>
          {fakeOrderComplete && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-black/60 flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                className="bg-[#111111] border border-[#27AE60]/50 rounded-2xl max-w-md w-full p-6 shadow-2xl text-center">
                <div className="w-16 h-16 mx-auto bg-[#27AE60]/20 rounded-full flex items-center justify-center mb-3">
                  <Check className="w-8 h-8 text-[#27AE60]" />
                </div>
                <h3 className="text-lg font-bold text-[#27AE60] mb-2">Payment Sent!</h3>
                <p className="text-xs text-[#95A5A6]">Transaction ID: 0x{fakeTxId}</p>
                <p className="text-xs text-[#7F8C8D] mt-2">Waiting for vendor to ship...</p>
                <div className="mt-4 flex justify-center">
                  <div className="w-4 h-4 border-2 border-[#27AE60] border-t-transparent rounded-full animate-spin" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scam Detected */}
        <AnimatePresence>
          {scamDetected && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-black/60 flex items-center justify-center p-4"
              onClick={() => setScamDetected(false)}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                className="bg-[#111111] border border-[#E74C3C]/50 rounded-2xl max-w-md w-full p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto bg-[#E74C3C]/20 rounded-full flex items-center justify-center mb-3">
                    <AlertTriangle className="w-8 h-8 text-[#E74C3C]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#E74C3C]">SCAM DETECTED</h3>
                </div>
                <div className="bg-[#0a0a0a] rounded-lg p-4 mb-4 border border-[#2C3E50]">
                  <p className="text-xs text-[#E74C3C] font-semibold mb-2">This is what REALLY happened:</p>
                  <ul className="space-y-1 text-xs text-[#95A5A6]">
                    <li>• Your Bitcoin would be gone forever</li>
                    <li>• The &quot;vendor&quot; would disappear immediately</li>
                    <li>• No refund, no recourse, no way to recover funds</li>
                    <li>• The marketplace admins might steal too</li>
                    <li>• Your payment address is permanently recorded on the blockchain</li>
                  </ul>
                </div>
                <div className="bg-[#27AE60]/10 border border-[#27AE60]/30 rounded-lg p-3 mb-4">
                  <p className="text-xs text-[#27AE60] font-semibold">📚 What you learned:</p>
                  <p className="text-xs text-[#95A5A6]">
                    Dark web marketplaces are designed to steal your money. Even &quot;trusted&quot; vendors can be law enforcement honeypots.
                    Blockchain analysis makes every transaction traceable.
                  </p>
                </div>
                <button onClick={() => setScamDetected(false)}
                  className="w-full py-2 bg-[#9B59B6] text-white rounded-lg text-sm font-bold hover:bg-[#8E44AD]">
                  Back to Marketplace
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE: FORUM (with roles, pinned, views, tags)
   ═══════════════════════════════════════════════════════════ */
function ForumPage() {
  const [expandedThread, setExpandedThread] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [threadReplies, setThreadReplies] = useState<Record<string, string[]>>({});
  const [replySent, setReplySent] = useState(false);

  const handleSendReply = () => {
    if (!expandedThread || !replyText.trim()) return;
    const newReply = `[You] ${replyText}`;
    setThreadReplies(prev => ({
      ...prev,
      [expandedThread]: [...(prev[expandedThread] || []), newReply]
    }));
    setReplyText('');
    setReplySent(true);
    setTimeout(() => setReplySent(false), 2000);
  };

  const roleColors: Record<string, string> = {
    Moderator: 'text-[#27AE60]',
    VIP: 'text-[#F39C12]',
    Member: 'text-[#9B59B6]',
  };

  const roleBadges: Record<string, string> = {
    Moderator: 'bg-[#27AE60]/10 text-[#27AE60] border-[#27AE60]/30',
    VIP: 'bg-[#F39C12]/10 text-[#F39C12] border-[#F39C12]/30',
    Member: 'bg-[#9B59B6]/10 text-[#9B59B6] border-[#9B59B6]/30',
  };

  const sortedThreads = useMemo(() => {
    return [...forumThreads].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-full p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#ECF0F1] mb-1">Cybersecurity Forum</h1>
          <p className="text-xs text-[#7F8C8D]">Active community — {forumThreads.length} threads</p>
        </div>

        {/* Forum Stats Bar */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Threads', value: forumThreads.length, color: '#9B59B6' },
            { label: 'Replies', value: forumThreads.reduce((a, t) => a + t.replies, 0), color: '#27AE60' },
            { label: 'Views', value: forumThreads.reduce((a, t) => a + t.views, 0).toLocaleString(), color: '#F7931A' },
            { label: 'Your Posts', value: Object.values(threadReplies).flat().length, color: '#3498DB' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#111111] border border-[#2C3E50] rounded-lg p-3 text-center">
              <p className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-xs text-[#7F8C8D]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {sortedThreads.map((thread) => (
            <Card key={thread.id} className={`bg-[#111111] border-[#2C3E50] ${thread.isPinned ? 'border-l-2 border-l-[#F39C12]' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between cursor-pointer" onClick={() => setExpandedThread(expandedThread === thread.id ? null : thread.id)}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {thread.isPinned && <span className="px-1.5 py-0.5 bg-[#F39C12]/20 text-[#F39C12] text-[8px] rounded font-bold">PINNED</span>}
                      <h3 className="text-sm font-bold text-[#9B59B6] hover:text-[#ECF0F1] transition-colors">{thread.title}</h3>
                      {thread.replies > 100 && <span className="px-1.5 py-0.5 bg-[#E74C3C]/20 text-[#E74C3C] text-[8px] rounded font-bold">HOT</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-[#7F8C8D]">
                      <span className={`font-semibold ${roleColors[thread.authorRole]}`}>{thread.author}</span>
                      <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded border ${roleBadges[thread.authorRole]}`}>{thread.authorRole}</span>
                      <span>•</span>
                      <span>{thread.date}</span>
                      <span>•</span>
                      <span>{thread.replies} replies</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" /> {thread.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {thread.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-[#2C3E50]/30 text-[10px] text-[#9B59B6] rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-[#7F8C8D]">{expandedThread === thread.id ? '▼' : '▶'}</span>
                </div>
                <AnimatePresence>
                  {expandedThread === thread.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-3">
                      <div className="bg-[#0a0a0a] rounded-lg p-4 border border-[#2C3E50]">
                        <p className="text-sm text-[#ECF0F1] mb-3">{thread.content}</p>
                        <div className="bg-[#27AE60]/10 border border-[#27AE60]/30 rounded-lg p-3">
                          <p className="text-xs text-[#27AE60] font-semibold">📚 Educational Note:</p>
                          <p className="text-xs text-[#95A5A6]">{thread.educationalNote}</p>
                        </div>

                        {threadReplies[thread.id] && threadReplies[thread.id].length > 0 && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs text-[#7F8C8D] font-semibold">Your Replies:</p>
                            {threadReplies[thread.id].map((reply, i) => (
                              <div key={i} className="bg-[#1a1a2e] rounded p-2 text-xs text-[#ECF0F1] border border-[#27AE60]/30">
                                {reply}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-3 flex gap-2">
                          <input
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                            placeholder="Type a reply..."
                            className="flex-1 bg-[#111111] border border-[#2C3E50] rounded px-3 py-2 text-xs text-[#ECF0F1] placeholder-[#7F8C8D] focus:border-[#9B59B6] focus:outline-none"
                          />
                          <button onClick={handleSendReply}
                            className="px-3 py-2 bg-[#9B59B6] text-white rounded text-xs font-bold hover:bg-[#8E44AD] transition-colors">
                            Reply
                          </button>
                        </div>
                        {replySent && (
                          <p className="text-[10px] text-[#27AE60] mt-1">✓ Reply sent</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE: CHAT ROOM (with /ask command using darkWebFAQ)
   ═══════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════
   PAGE: MIXER
   ═══════════════════════════════════════════════════════════ */
function MixerPage() {
  const [mixing, setMixing] = useState(false);
  const [blocked, setBlocked] = useState(false);

  return (
    <div className="bg-[#0a0a0a] min-h-full p-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#ECF0F1] mb-1">Cryptocurrency Mixer</h1>
          <p className="text-xs text-[#7F8C8D]">Secure mixing service</p>
        </div>

        <Card className="bg-[#111111] border-[#2C3E50]">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[#95A5A6] mb-1 block">Deposit Address (Bitcoin)</label>
                <div className="bg-[#0a0a0a] rounded-lg px-3 py-2 font-mono text-xs text-[#7F8C8D] border border-[#2C3E50]">
                  {generateBitcoinAddress()}
                </div>
              </div>
              <div>
                <label className="text-xs text-[#95A5A6] mb-1 block">Amount (BTC)</label>
                <div className="bg-[#0a0a0a] rounded-lg px-3 py-2 font-mono text-xs text-[#7F8C8D] border border-[#2C3E50]">
                  0.00523847
                </div>
              </div>
              <div>
                <label className="text-xs text-[#95A5A6] mb-1 block">Output Address (Bitcoin)</label>
                <div className="bg-[#0a0a0a] rounded-lg px-3 py-2 font-mono text-xs text-[#7F8C8D] border border-[#2C3E50]">
                  {generateBitcoinAddress()}
                </div>
              </div>
              <button onClick={() => { setMixing(true); setTimeout(() => { setMixing(false); setBlocked(true); }, 2000); }}
                disabled={mixing}
                className="w-full py-3 bg-[#F7931A] text-white rounded-lg text-sm font-bold hover:bg-[#E67E22] transition-colors disabled:opacity-50">
                {mixing ? 'Mixing Coins...' : 'Mix Coins'}
              </button>
            </div>
          </CardContent>
        </Card>

        <AnimatePresence>
          {blocked && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-[#E74C3C]/10 border border-[#E74C3C]/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[#E74C3C] mb-3">Transaction Blocked</h3>
              <div className="space-y-2 text-sm text-[#95A5A6]">
                <p>In reality, cryptocurrency mixing is:</p>
                <ul className="space-y-1 ml-4 text-xs">
                  <li>• Most mixers are scams that steal your Bitcoin</li>
                  <li>• Chainalysis and Elliptic trace most &quot;mixed&quot; transactions</li>
                  <li>• Using mixers for illegal purposes = money laundering</li>
                  <li>• Mixing service developer arrested by authorities</li>
                  <li>• Blockchain analysis companies have traced mixing services successfully</li>
                </ul>
                <p className="text-[#27AE60] font-semibold pt-2 text-xs">Legal alternatives: Wasabi Wallet (CoinJoin), Samourai Whirlpool — but even these are increasingly traceable.</p>
              </div>
              <button onClick={() => setBlocked(false)} className="mt-4 px-4 py-2 bg-[#9B59B6] text-white rounded-lg text-sm font-bold hover:bg-[#8E44AD]">
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE: EDUCATIONAL MODULES
   ═══════════════════════════════════════════════════════════ */
function EducationPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  const handleComplete = (id: string) => {
    setCompletedModules(prev => new Set([...prev, id]));
  };

  return (
    <div className="bg-[#0a0a0a] min-h-full p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#ECF0F1] mb-1">📚 Educational Modules</h1>
          <p className="text-xs text-[#27AE60] font-semibold">Learn cybersecurity legally and ethically</p>
        </div>

        <div className="bg-[#111111] border border-[#2C3E50] rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-[#7F8C8D]">Your Progress</p>
            <p className="text-xs text-[#27AE60] font-bold">{completedModules.size}/{educationalModules.length} completed</p>
          </div>
          <div className="w-full bg-[#0a0a0a] rounded-full h-2">
            <div className="bg-[#27AE60] h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedModules.size / educationalModules.length) * 100}%` }} />
          </div>
        </div>

        <div className="space-y-4">
          {educationalModules.map((mod) => (
            <Card key={mod.id} className="bg-[#111111] border-[#2C3E50]">
              <CardContent className="p-5">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(expanded === mod.id ? null : mod.id)}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{mod.icon}</span>
                    <div>
                      <h3 className="font-bold text-[#ECF0F1] flex items-center gap-2">
                        {mod.title}
                        {completedModules.has(mod.id) && <span className="text-[#27AE60] text-xs">✓ Completed</span>}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs text-[#7F8C8D]">{expanded === mod.id ? '▼' : '▶'}</span>
                </div>
                <AnimatePresence>
                  {expanded === mod.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-4">
                      <div className="space-y-3">
                        {mod.content.map((section, i) => (
                          <div key={i} className="pl-4 border-l-2 border-[#9B59B6]/30">
                            <h4 className="text-sm font-semibold text-[#9B59B6]">{section.heading}</h4>
                            <p className="text-xs text-[#95A5A6] mt-1">{section.text}</p>
                          </div>
                        ))}
                      </div>

                      {!completedModules.has(mod.id) && (
                        <button onClick={() => handleComplete(mod.id)}
                          className="mt-4 px-4 py-2 bg-[#27AE60] text-white rounded text-xs font-bold hover:bg-[#219A52] transition-colors">
                          Mark as Completed
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DEBRIEF PAGE
   ═══════════════════════════════════════════════════════════ */
function DebriefPage({ onRestart, onExit }: { onRestart: () => void; onExit: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-[#111111] border border-[#27AE60]/30 rounded-2xl shadow-2xl p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#27AE60]/10 flex items-center justify-center border border-[#27AE60]/30">
          <Shield className="w-8 h-8 text-[#27AE60]" />
        </div>
        <h2 className="text-xl font-bold text-[#ECF0F1] mb-2">Session Complete</h2>
        <p className="text-sm text-[#95A5A6] mb-6">You&apos;ve completed the Dark Web educational simulation.</p>

        <div className="space-y-3 text-left mb-6">
          <h3 className="text-sm font-bold text-[#ECF0F1]">What you learned:</h3>
          {securityTips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-[#95A5A6]">
              <span className="text-[#27AE60] mt-0.5">✓</span> {tip}
            </div>
          ))}
        </div>

        <div className="bg-[#9B59B6]/10 border border-[#9B59B6]/30 rounded-lg p-4 mb-6 text-left">
          <p className="text-xs text-[#9B59B6] font-semibold mb-2">🚀 Interested in cybersecurity? Legal career paths:</p>
          <div className="space-y-1 text-xs text-[#95A5A6]">
            <p>• Penetration Tester — OSCP certification — $85K-$140K/yr</p>
            <p>• Security Analyst — CompTIA Security+ — $75K-$120K/yr</p>
            <p>• Digital Forensics — GCFE certification — $70K-$110K/yr</p>
            <p>• Bug Bounty Hunter — HackerOne/Bugcrowd — $50K-$500K+/yr</p>
            <p>• Threat Intelligence — OSINT skills — $80K-$130K/yr</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={onRestart}
            className="flex-1 py-2 bg-[#9B59B6] text-white rounded-lg text-sm font-bold hover:bg-[#8E44AD] transition-colors">
            Restart Simulation
          </button>
          <button onClick={onExit}
            className="flex-1 py-2 bg-[#2C3E50] text-[#ECF0F1] rounded-lg text-sm font-bold hover:bg-[#34495E] transition-colors">
            Exit to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   LINK PAGE (realistic simulated website)
   ═══════════════════════════════════════════════════════════ */
function LinkPage({ link, onBack }: { link: { title: string; description: string; status: string; category: string }; onBack: () => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500 + Math.random() * 2000);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="bg-[#0a0a0a] min-h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#9B59B6] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-[#7F8C8D] font-mono">Establishing encrypted connection...</p>
          <p className="text-xs text-[#9B59B6] mt-2 font-mono">Routing through 3 relays...</p>
        </div>
      </div>
    );
  }

  const isSeized = link.status === 'seized';
  const isScam = link.status === 'scam';
  const isOnline = link.status === 'online';

  if (isSeized) {
    return (
      <div className="bg-[#0a0a0a] min-h-full p-8">
        <div className="max-w-2xl mx-auto text-center pt-20">
          <div className="w-20 h-20 bg-[#E74C3C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-[#E74C3C]" />
          </div>
          <h1 className="text-3xl font-bold text-[#E74C3C] mb-4">THIS DOMAIN HAS BEEN SEIZED</h1>
          <div className="bg-[#111111] border border-[#E74C3C]/50 rounded-lg p-6 mb-6">
            <p className="text-sm text-[#ECF0F1] mb-2">By Federal Bureau of Investigation</p>
            <p className="text-xs text-[#7F8C8D]">Cyber Division</p>
          </div>
          <div className="bg-[#111111] border border-[#2C3E50] rounded-lg p-4 text-left">
            <p className="text-xs text-[#95A5A6] mb-3">This website has been seized as part of a joint international law enforcement operation.</p>
            <p className="text-xs text-[#95A5A6] mb-3">All data has been collected and is being analyzed by federal authorities.</p>
            <p className="text-xs text-[#E74C3C] font-bold">WARNING: Accessing this site may be monitored.</p>
          </div>
          <button onClick={onBack} className="mt-6 px-6 py-2 bg-[#2C3E50] text-[#ECF0F1] rounded-lg text-sm hover:bg-[#34495E] transition-colors">
            ← Back to Hidden Wiki
          </button>
        </div>
      </div>
    );
  }

  if (isScam) {
    return (
      <div className="bg-[#0a0a0a] min-h-full p-8">
        <div className="max-w-2xl mx-auto pt-10">
          <div className="bg-[#111111] border border-[#2C3E50] rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#9B59B6]/20 rounded-lg flex items-center justify-center text-2xl">🛒</div>
              <div>
                <h1 className="text-xl font-bold text-[#ECF0F1]">{link.title}</h1>
                <p className="text-xs text-[#27AE60]">● Online — Last seen 2 min ago</p>
              </div>
            </div>
            <p className="text-sm text-[#95A5A6] mb-4">{link.description}</p>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-[#0a0a0a] rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-[#27AE60]">4.8</p>
                <p className="text-xs text-[#7F8C8D]">Rating</p>
              </div>
              <div className="bg-[#0a0a0a] rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-[#9B59B6]">1,247</p>
                <p className="text-xs text-[#7F8C8D]">Sales</p>
              </div>
              <div className="bg-[#0a0a0a] rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-[#F39C12]">98%</p>
                <p className="text-xs text-[#7F8C8D]">Positive</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              {['Premium Account — $50', 'VIP Access — $150', 'Lifetime — $300'].map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-[#0a0a0a] rounded-lg p-3">
                  <span className="text-xs text-[#ECF0F1]">{item}</span>
                  <button className="px-3 py-2 bg-[#9B59B6] text-white rounded text-xs font-bold hover:bg-[#8E44AD]">
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#E74C3C]/10 border border-[#E74C3C]/30 rounded-lg p-4">
            <p className="text-xs text-[#E74C3C] font-semibold mb-2">⚠ SCAM WARNING</p>
            <p className="text-[11px] text-[#95A5A6]">This site is a known scam. All products are fake. Your payment will be stolen. Never send cryptocurrency to unverified vendors.</p>
          </div>
          <button onClick={onBack} className="mt-4 w-full py-2 bg-[#2C3E50] text-[#ECF0F1] rounded-lg text-sm hover:bg-[#34495E] transition-colors">
            ← Back to Hidden Wiki
          </button>
        </div>
      </div>
    );
  }

  // Online link — show a realistic-looking fake site
  const siteTemplates: Record<string, { icon: string; color: string; sections: string[] }> = {
    drugs: { icon: '💊', color: '#27AE60', sections: ['Product Catalog', 'Reviews', 'Shipping Info', 'FAQ'] },
    weapons: { icon: '🔫', color: '#E74C3C', sections: ['Inventory', 'Pricing', 'Custom Orders', 'Discreet Shipping'] },
    hacking: { icon: '💻', color: '#9B59B6', sections: ['Tools', 'Tutorials', 'Services', 'Support'] },
    fraud: { icon: '💳', color: '#F39C12', sections: ['Cards', 'Dumps', 'CVV', 'Fullz'] },
    counterfeit: { icon: '📄', color: '#3498DB', sections: ['Passports', 'IDs', 'Documents', 'Samples'] },
    data: { icon: '📊', color: '#1ABC9C', sections: ['Databases', 'Logs', 'Combos', 'Breach Data'] },
    crypto: { icon: '₿', color: '#F7931A', sections: ['Exchange', 'Mixing', 'Wallets', 'Mining'] },
    forums: { icon: '💬', color: '#9B59B6', sections: ['General', 'Vendors', 'Marketplace', 'Support'] },
    gambling: { icon: '🎰', color: '#E74C3C', sections: ['Casino', 'Sports', 'Poker', 'Promotions'] },
    other: { icon: '🔗', color: '#7F8C8D', sections: ['Home', 'About', 'Services', 'Contact'] },
  };

  const template = siteTemplates[link.category] || siteTemplates.other;

  return (
    <div className="bg-[#0a0a0a] min-h-full">
      {/* Site Header */}
      <div className="bg-[#111111] border-b border-[#2C3E50] px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{template.icon}</span>
            <div>
              <h1 className="text-lg font-bold text-[#ECF0F1]">{link.title}</h1>
              <p className="text-[10px] text-[#27AE60]">● Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#7F8C8D] font-mono">PGP Verified</span>
            <span className="text-[10px] text-[#27AE60]">✓</span>
          </div>
        </div>
      </div>

      {/* Site Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-[#111111] border border-[#2C3E50] rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">{template.icon}</span>
            <div>
              <h2 className="text-xl font-bold text-[#ECF0F1]">{link.title}</h2>
              <p className="text-xs text-[#95A5A6]">{link.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {template.sections.map((section, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-[#2C3E50] rounded-lg p-3 text-center hover:border-[#9B59B6] cursor-pointer transition-colors">
                <p className="text-xs text-[#9B59B6] font-semibold">{section}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-[#0a0a0a] rounded-lg p-4 text-center">
              <p className="text-2xl font-bold" style={{ color: template.color }}>4.9</p>
              <p className="text-xs text-[#7F8C8D]">Rating</p>
            </div>
            <div className="bg-[#0a0a0a] rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-[#9B59B6]">2,847</p>
              <p className="text-xs text-[#7F8C8D]">Reviews</p>
            </div>
            <div className="bg-[#0a0a0a] rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-[#27AE60]">99%</p>
              <p className="text-xs text-[#7F8C8D]">Uptime</p>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-[#2C3E50] rounded-lg p-4">
            <h3 className="text-sm font-bold text-[#ECF0F1] mb-3">Latest Updates</h3>
            <div className="space-y-2">
              {[
                { text: 'New products added', time: '2 hours ago', user: 'Admin' },
                { text: 'Server migration completed', time: '5 hours ago', user: 'Staff' },
                { text: 'Security patch applied', time: '1 day ago', user: 'System' },
              ].map((update, i) => (
                <div key={i} className="flex items-center justify-between py-1 border-b border-[#2C3E50]/50 last:border-0">
                  <span className="text-xs text-[#95A5A6]">{update.text}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#7F8C8D]">{update.user}</span>
                    <span className="text-xs text-[#7F8C8D]">{update.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#111111] border border-[#2C3E50] rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4 text-xs text-[#7F8C8D]">
            <span>🔒 End-to-end encrypted</span>
            <span>🛡️ PGP verified</span>
            <span>⚡ Auto-dispatch</span>
            <span className="ml-auto">v3.2.1</span>
          </div>
        </div>

        <button onClick={onBack} className="w-full py-2 bg-[#2C3E50] text-[#ECF0F1] rounded-lg text-sm hover:bg-[#34495E] transition-colors">
          ← Back to Hidden Wiki
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN ORCHESTRATOR
   ═══════════════════════════════════════════════════════════ */
export function SafeGatewayContent() {
  const [page, setPage] = useState<SimulationPage>('landing');
  const [elapsed, setElapsed] = useState(0);
  const [showRealityCheck, setShowRealityCheck] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(generateOnionUrl());
  const [selectedLinkData, setSelectedLinkData] = useState<{ title: string; description: string; status: string; category: string } | null>(null);

  useEffect(() => {
    if (page === 'disclaimer' || page === 'tor-launch' || page === 'debrief' || page === 'landing') return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [page]);

  useEffect(() => {
    if (page === 'disclaimer' || page === 'tor-launch' || page === 'debrief' || page === 'landing') return;
    const t = setInterval(() => setShowRealityCheck(true), 120000);
    return () => clearInterval(t);
  }, [page]);

  // Hide content when page loses focus (prevents external screenshot tools)
  const [isBlurred, setIsBlurred] = useState(false);
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && page !== 'disclaimer' && page !== 'tor-launch' && page !== 'debrief' && page !== 'landing') {
        setIsBlurred(true);
      } else {
        setTimeout(() => setIsBlurred(false), 300);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [page]);

  const navigateTo = useCallback((path: string) => {
    setCurrentUrl(generateOnionUrl());
    if (path === 'mixer') setPage('mixer');
    else if (path === 'education') setPage('education');
    else if (path === 'marketplace') setPage('marketplace');
    else if (path === 'forum') setPage('forum');
    else setPage('hidden-wiki');
  }, []);

  const navigateToLink = useCallback((link: { title: string; description: string; status: string; category: string }) => {
    setSelectedLinkData(link);
    setCurrentUrl(generateOnionUrl());
    setPage('link-page');
  }, []);

  const exitSimulation = useCallback(() => {
    setPage('debrief');
  }, []);

  const restart = useCallback(() => {
    setPage('landing');
    setElapsed(0);
    setShowRealityCheck(false);
    setCurrentUrl(generateOnionUrl());
    setSelectedLinkData(null);
  }, []);

  // Global protection — blocks keyboard shortcuts, DevTools, screenshots
  useEffect(() => {
    const activePages = ['hidden-wiki', 'marketplace', 'forum', 'mixer', 'education', 'link-page'];
    if (!activePages.includes(page)) return;

    const blockKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;
      const alt = e.altKey;

      // PrintScreen
      if (key === 'printscreen') { e.preventDefault(); e.stopPropagation(); return false; }

      // F12
      if (key === 'f12') { e.preventDefault(); e.stopPropagation(); return false; }

      // Ctrl+Shift+I/J/C/U/S/P (DevTools, View Source, Save, Print)
      if (ctrl && shift && ['i', 'j', 'c', 's'].includes(key)) { e.preventDefault(); e.stopPropagation(); return false; }
      if (ctrl && key === 'u') { e.preventDefault(); e.stopPropagation(); return false; }
      if (ctrl && key === 's') { e.preventDefault(); e.stopPropagation(); return false; }
      if (ctrl && key === 'p') { e.preventDefault(); e.stopPropagation(); return false; }

      // Ctrl+C/V/X/A (Copy, Paste, Cut, Select All)
      if (ctrl && ['c', 'v', 'x', 'a'].includes(key)) { e.preventDefault(); e.stopPropagation(); return false; }

      // Alt+PrintScreen
      if (alt && key === 'printscreen') { e.preventDefault(); e.stopPropagation(); return false; }

      return true;
    };

    const blockContext = (e: MouseEvent) => { e.preventDefault(); e.stopPropagation(); return false; };
    const blockCopy = (e: ClipboardEvent) => { e.preventDefault(); e.stopPropagation(); return false; };

    // DevTools detection via debuggertiming
    const blockDevTools = () => {
      const threshold = 160;
      const start = performance.now();
      if (process.env.NODE_ENV === 'development') debugger;
      const end = performance.now();
      if (end - start > threshold) {
        document.body.innerHTML = '<div style="background:#000;color:#df2531;display:flex;align-items:center;justify-content:center;height:100vh;font-family:monospace"><h1>ACCESS DENIED</h1></div>';
      }
    };
    const devToolsInterval = setInterval(blockDevTools, 5000);

    document.addEventListener('keydown', blockKey, true);
    document.addEventListener('contextmenu', blockContext, true);
    document.addEventListener('copy', blockCopy, true);
    document.addEventListener('cut', blockCopy, true);
    document.addEventListener('paste', blockCopy, true);

    return () => {
      clearInterval(devToolsInterval);
      document.removeEventListener('keydown', blockKey, true);
      document.removeEventListener('contextmenu', blockContext, true);
      document.removeEventListener('copy', blockCopy, true);
      document.removeEventListener('cut', blockCopy, true);
      document.removeEventListener('paste', blockCopy, true);
    };
  }, [page]);

  return (
    <div className="min-h-screen select-none dark-web-protected" style={{ fontFamily: 'Segoe UI, Roboto, -apple-system, sans-serif', WebkitTouchCallout: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none', overscrollBehavior: 'none' }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <AnimatePresence mode="wait">
        {page === 'landing' && (
          <motion.div key="landing" exit={{ opacity: 0 }}>
            <LandingPage onEnter={() => setPage('disclaimer')} />
          </motion.div>
        )}

        {page === 'disclaimer' && (
          <motion.div key="disclaimer" exit={{ opacity: 0 }}>
            <DisclaimerStep onAccept={() => setPage('tor-launch')} />
          </motion.div>
        )}

        {page === 'tor-launch' && (
          <motion.div key="tor-launch" exit={{ opacity: 0 }}>
            <SecureBrowserLaunch onComplete={() => setPage('hidden-wiki')} />
          </motion.div>
        )}

        {(page === 'hidden-wiki' || page === 'marketplace' || page === 'forum' || page === 'mixer' || page === 'education') && (
          <motion.div key="browser" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-screen">
            <BrowserShell currentUrl={currentUrl} onNavigate={navigateTo} onExit={exitSimulation}>
              {page === 'hidden-wiki' && <HiddenWikiPage onNavigate={navigateTo} onNavigateLink={navigateToLink} />}
              {page === 'marketplace' && <MarketplacePage />}
              {page === 'forum' && <ForumPage />}
              {page === 'mixer' && <MixerPage />}
              {page === 'education' && <EducationPage />}
            </BrowserShell>
          </motion.div>
        )}

        {page === 'link-page' && selectedLinkData && (
          <motion.div key="link-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-screen">
            <BrowserShell currentUrl={currentUrl} onNavigate={navigateTo} onExit={exitSimulation}>
              <LinkPage link={selectedLinkData} onBack={() => setPage('hidden-wiki')} />
            </BrowserShell>
          </motion.div>
        )}

        {page === 'debrief' && (
          <motion.div key="debrief" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <DebriefPage onRestart={restart} onExit={() => window.location.href = '/'} />
          </motion.div>
        )}
      </AnimatePresence>

      {page !== 'disclaimer' && page !== 'tor-launch' && page !== 'debrief' && page !== 'landing' && (
        <PanicButton onExit={exitSimulation} />
      )}

      {showRealityCheck && page !== 'disclaimer' && page !== 'tor-launch' && page !== 'debrief' && page !== 'landing' && (
        <RealityCheck elapsed={elapsed} onDismiss={() => setShowRealityCheck(false)} />
      )}

      {(page === 'hidden-wiki' || page === 'marketplace' || page === 'forum' || page === 'mixer' || page === 'education' || page === 'link-page') && (
        <div className="fixed bottom-0 left-0 right-0 z-[90] bg-[#0a0a0a]/80 border-t border-[#2C3E50] px-4 py-2 text-center">
          <p className="text-xs text-[#7F8C8D] font-mono">
            {currentUrl} | Encrypted Connection | 3 Relays Active
          </p>
        </div>
      )}

      {/* Screenshot protection blur overlay */}
      {isBlurred && (
        <div className="fixed inset-0 z-[999] bg-[#0a0a0a] flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-[#E74C3C] mx-auto mb-4" />
            <p className="text-sm text-[#E74C3C] font-bold">SCREENSHOT DETECTED</p>
            <p className="text-xs text-[#7F8C8D] mt-2">This action has been logged</p>
          </div>
        </div>
      )}
    </div>
  );
}
