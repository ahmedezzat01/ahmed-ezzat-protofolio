'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, Search, FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Tools', href: '/tools' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'Team', href: '/team' },
  { label: 'Security Hub', href: '/security-hub' },
  { label: 'Security Agent', href: '/pentesterflow' },
  { label: 'Dark Web', href: '/safe-gateway' },
  { label: 'AI', href: '/security-ai' },
  { label: 'Contact', href: '/#contact' },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(!searchOpen); }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  return (
    <>
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/60 backdrop-blur-sm border-b border-border shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <Shield className="w-8 h-8 text-cyber-red" />
              <span className="text-xl font-bold font-mono">
                <span className="text-cyber-red">&lt;</span>
                <span className="text-gradient-blue-red">Ahmed</span>
                <span className="text-cyber-red">Ezzat</span>
                <span className="text-cyber-red">/&gt;</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                item.href.startsWith('/#') ? (
                  <a key={item.label} href={item.href}
                    className="px-3 py-2 text-sm text-muted-foreground hover:text-cyber-red transition-colors rounded-lg hover:bg-muted/50">
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.label} href={item.href}
                    className={`px-3 py-2 text-sm transition-colors rounded-lg hover:bg-muted/50 ${pathname === item.href ? 'text-cyber-red bg-muted/50' : 'text-muted-foreground hover:text-cyber-red'}`}>
                    {item.label}
                  </Link>
                )
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted/50 rounded-lg border border-border hover:border-cyber-red/30 transition-colors">
                <Search className="w-4 h-4" />
                <kbd className="text-xs bg-background px-1.5 py-0.5 rounded border border-border">Ctrl+K</kbd>
              </button>

              <a href="/certificate/CV.pdf" target="_blank" rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-cyber-red/10 border border-cyber-red/30 text-cyber-red rounded-lg hover:bg-cyber-red/20 transition-colors">
                <FileText className="w-3.5 h-3.5" /> CV
              </a>

              <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden w-9 h-9 rounded-lg bg-muted/50 border border-border flex items-center justify-center">
                {isOpen ? <X className="w-4 h-4 text-foreground" /> : <Menu className="w-4 h-4 text-foreground" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-20 px-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                item.href.startsWith('/#') ? (
                  <a key={item.label} href={item.href} onClick={() => setIsOpen(false)}
                    className="px-4 py-3 text-lg text-foreground hover:text-cyber-red hover:bg-muted/50 rounded-lg transition-colors">
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)}
                    className="px-4 py-3 text-lg text-foreground hover:text-cyber-red hover:bg-muted/50 rounded-lg transition-colors">
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && <NavSearch onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function NavSearch({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const allItems = [
    { label: 'About', href: '/#about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Tools', href: '/tools' },
    { label: 'Roadmap', href: '/roadmap' },
    { label: 'Team', href: '/team' },
    { label: 'Security Hub', href: '/security-hub' },
    { label: 'Security Agent', href: '/pentesterflow' },
    { label: 'Dark Web', href: '/safe-gateway' },
    { label: 'AI', href: '/security-ai' },
    { label: 'Contact', href: '/#contact' },
  ];
  const items = allItems.filter(item => item.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[20vh]" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md bg-card border border-border rounded-xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..."
              className="flex-1 bg-transparent text-foreground focus:outline-none" autoFocus />
            <kbd className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">ESC</kbd>
          </div>
        </div>
        <div className="p-2 max-h-[300px] overflow-y-auto">
          {items.map((item) => (
            <a key={item.href} href={item.href} onClick={onClose}
              className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors">{item.label}</a>
          ))}
          {items.length === 0 && <p className="px-4 py-2 text-muted-foreground text-sm">No results found</p>}
        </div>
      </motion.div>
    </motion.div>
  );
}
