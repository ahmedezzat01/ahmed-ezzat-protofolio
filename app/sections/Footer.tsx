'use client';
import { Shield, Mail, ArrowUp } from 'lucide-react';
import { LinkedInIcon, GitHubIcon, FacebookIcon, InstagramIcon } from '@/components/ui/social-icons';
import { useLanguage } from '@/contexts/language-context';
import Link from 'next/link';

export function Footer() {
  const { t } = useLanguage();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const marqueeText = 'CYBERSECURITY • PENETRATION TESTING • LINUX ADMINISTRATION • NETWORKING • IT INFRASTRUCTURE • ';

  return (
    <footer className="bg-card/50 border-t border-border">
      {/* Marquee */}
      <div className="overflow-hidden py-3 border-b border-border">
        <div className="animate-marquee whitespace-nowrap flex">
          <span className="text-sm md:text-base font-mono text-muted-foreground/20 mx-4">{marqueeText}</span>
          <span className="text-sm md:text-base font-mono text-muted-foreground/20 mx-4">{marqueeText}</span>
          <span className="text-sm md:text-base font-mono text-muted-foreground/20 mx-4">{marqueeText}</span>
          <span className="text-sm md:text-base font-mono text-muted-foreground/20 mx-4">{marqueeText}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-cyber-red" />
              <span className="text-xl font-bold text-gradient-blue-red">Ahmed Ezzat</span>
            </div>
            <p className="text-muted-foreground text-sm">
              IT Manager & Penetration Tester based in Egypt.
            </p>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/in/ahmed-ezzat01/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover-glow transition-all duration-300 hover:bg-cyber-red/10 border border-border">
                <LinkedInIcon className="w-5 h-5 text-muted-foreground" />
              </a>
              <a href="https://github.com/ahmedezzat01" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover-glow transition-all duration-300 hover:bg-cyber-red/10 border border-border">
                <GitHubIcon className="w-5 h-5 text-muted-foreground" />
              </a>
              <a href="https://facebook.com/ahmed.ezzat.0001" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover-glow transition-all duration-300 hover:bg-cyber-red/10 border border-border">
                <FacebookIcon className="w-5 h-5 text-muted-foreground" />
              </a>
              <a href="https://www.instagram.com/ahmed.ezzaat.01/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover-glow transition-all duration-300 hover:bg-cyber-red/10 border border-border">
                <InstagramIcon className="w-5 h-5 text-muted-foreground" />
              </a>
              <a href="mailto:ahmed.ezzat@students.du.edu.eg"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover-glow transition-all duration-300 hover:bg-cyber-red/10 border border-border">
                <Mail className="w-4 h-4 text-muted-foreground" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-foreground font-semibold mb-4">{t.footer.tools}</h4>
            <ul className="space-y-2">
              <li><Link href="/tools" className="text-muted-foreground text-sm hover:text-cyber-red transition-colors">Dark Web Email Check</Link></li>
              <li><Link href="/tools" className="text-muted-foreground text-sm hover:text-cyber-red transition-colors">Password Strength Checker</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-foreground font-semibold mb-4">{t.footer.resources}</h4>
            <ul className="space-y-2">
              <li><Link href="/projects" className="text-muted-foreground text-sm hover:text-cyber-red transition-colors">Projects</Link></li>
              <li><Link href="/roadmap" className="text-muted-foreground text-sm hover:text-cyber-red transition-colors">Roadmap</Link></li>
              <li><Link href="/#about" className="text-muted-foreground text-sm hover:text-cyber-red transition-colors">Certificates</Link></li>
              <li><Link href="/security-hub" className="text-muted-foreground text-sm hover:text-cyber-red transition-colors">Security Hub</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-foreground font-semibold mb-4">{t.footer.company}</h4>
            <ul className="space-y-2">
              <li><Link href="/#about" className="text-muted-foreground text-sm hover:text-cyber-red transition-colors">{t.nav.about}</Link></li>
              <li><Link href="/#experience" className="text-muted-foreground text-sm hover:text-cyber-red transition-colors">{t.nav.experience}</Link></li>
              <li><Link href="/#contact" className="text-muted-foreground text-sm hover:text-cyber-red transition-colors">{t.nav.contact}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} Ahmed Ezzat. {t.footer.copyright}</p>
          <button onClick={scrollToTop} className="flex items-center gap-2 text-muted-foreground text-sm hover:text-cyber-red transition-colors">
            {t.footer.backToTop} <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
