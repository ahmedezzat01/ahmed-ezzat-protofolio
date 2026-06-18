'use client';
import React, { useMemo } from 'react';
import { X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKeyboardSearch } from '@/hooks/use-keyboard-search';
import { useRouter } from 'next/navigation';

const allContent = [
  // Hero
  { title: 'Cybersecurity Portfolio', section: 'Hero', href: '/#home' },
  { title: 'Ahmed Ezzat', section: 'Hero', href: '/#home' },
  { title: 'IT Manager', section: 'Hero', href: '/#home' },
  { title: 'Penetration Tester', section: 'Hero', href: '/#home' },
  { title: 'Ethical Hacker', section: 'Hero', href: '/#home' },
  { title: 'Security Researcher', section: 'Hero', href: '/#home' },

  // About
  { title: 'About Me', section: 'About', href: '/#about' },
  { title: 'Computer Science and AI student', section: 'About', href: '/#about' },
  { title: 'Damietta Egypt', section: 'About', href: '/#about' },
  { title: 'ahmed.ezzat@students.du.edu.eg', section: 'About', href: '/#about' },
  { title: '+20 102 473 8360', section: 'About', href: '/#about' },
  { title: 'LinkedIn', section: 'About', href: '/#about' },
  { title: 'GitHub', section: 'About', href: '/#about' },
  { title: 'Facebook', section: 'About', href: '/#about' },
  { title: 'Instagram', section: 'About', href: '/#about' },

  // Certifications
  { title: 'Certifications', section: 'About', href: '/#about' },
  { title: 'Foundations Of Security By Google', section: 'About', href: '/#cert-foundations-of-security-by-google' },
  { title: 'Play It Safe Manage Security Risks By Google', section: 'About', href: '/#cert-play-it-safe-manage-security-risks-by-google' },
  { title: 'Put It Work Prepare For CyberSecurity Jops By Google', section: 'About', href: '/#cert-put-it-work-prepare-for-cybersecurity-jops-by-google' },
  { title: 'Introduction To CyberSecurity Awareness', section: 'About', href: '/#cert-introduction-to-cybersecurity-awareness' },
  { title: 'Vulnarability Analysis And Penetration Testing By DEPI', section: 'About', href: '/#cert-vulnarability-analysis-and-penetration-testing-by-depi' },
  { title: 'Linux System Administration 1 RedHat', section: 'About', href: '/#cert-linux-system-administration-1-redhat' },
  { title: 'Linux System Administration 2 RedHat', section: 'About', href: '/#cert-linux-system-administration-2-redhat' },
  { title: 'CCNA Routing And Switching By NTI', section: 'About', href: '/#cert-ccna-routing-and-switching-by-nti' },
  { title: 'CCEP', section: 'About', href: '/#cert-ccep' },
  { title: 'CyberSecurity For All By ITI', section: 'About', href: '/#cert-cybersecurity-for-all-by-iti' },
  { title: 'Prompet Engineerning', section: 'About', href: '/#cert-prompet-engineerning' },

  // Skills
  { title: 'Skills', section: 'Skills', href: '/#skills' },
  { title: 'Penetration Testing', section: 'Skills', href: '/#skill-penetration-testing' },
  { title: 'Network Security', section: 'Skills', href: '/#skill-network-security' },
  { title: 'SOC Analysis', section: 'Skills', href: '/#skill-soc-analysis' },
  { title: 'Malware Analysis', section: 'Skills', href: '/#skill-malware-analysis' },
  { title: 'Linux Administration', section: 'Skills', href: '/#skill-linux-admin' },
  { title: 'Python', section: 'Skills', href: '/#skill-development' },
  { title: 'Bash Scripting', section: 'Skills', href: '/#skill-automation' },
  { title: 'Nmap', section: 'Skills', href: '/#skill-security-tools' },
  { title: 'Burp Suite', section: 'Skills', href: '/#skill-security-tools' },
  { title: 'Metasploit', section: 'Skills', href: '/#skill-security-tools' },
  { title: 'Wireshark', section: 'Skills', href: '/#skill-security-tools' },

  // Experience
  { title: 'Experience', section: 'Experience', href: '/#experience' },
  { title: 'IT Manager', section: 'Experience', href: '/#exp-it-manager' },
  { title: 'IT Specialist', section: 'Experience', href: '/#exp-it-specialist' },
  { title: 'Penetration Tester', section: 'Experience', href: '/#exp-penetration-tester' },
  { title: 'CEO', section: 'Experience', href: '/#exp-chief-executive-officer-ceo' },
  { title: 'Technology Society Team', section: 'Experience', href: '/#exp-chief-executive-officer-ceo' },
  { title: 'TST', section: 'Experience', href: '/#exp-chief-executive-officer-ceo' },
  { title: 'Damietta University', section: 'Experience', href: '/#exp-chief-executive-officer-ceo' },

  // Projects
  { title: 'Projects', section: 'Projects', href: '/projects' },
  { title: 'Servixo Platform', section: 'Projects', href: '/projects' },
  { title: 'TST Leadership', section: 'Projects', href: '/projects' },
  { title: 'OWASP Juice Shop', section: 'Projects', href: '/projects' },
  { title: 'Cybersecurity Portfolio', section: 'Projects', href: '/projects' },
  { title: 'Flutter App', section: 'Projects', href: '/projects' },
  { title: 'Web Development', section: 'Projects', href: '/projects' },
  { title: 'Smart Service Booking', section: 'Projects', href: '/projects' },
  { title: 'Emergency Requests System', section: 'Projects', href: '/projects' },
  { title: 'HTML CSS JavaScript', section: 'Projects', href: '/projects' },

  // Tools
  { title: 'Tools', section: 'Tools', href: '/tools' },
  { title: 'Dark Web Email Check', section: 'Tools', href: '/tools' },
  { title: 'Password Strength Checker', section: 'Tools', href: '/tools' },
  { title: 'Email Breach Check', section: 'Tools', href: '/tools' },
  { title: 'Have I Been Pwned', section: 'Tools', href: '/tools' },

  // Roadmap
  { title: 'Roadmap', section: 'Roadmap', href: '/roadmap' },
  { title: 'Career Path', section: 'Roadmap', href: '/roadmap' },
  { title: 'Learning Plan', section: 'Roadmap', href: '/roadmap' },

  // Team
  { title: 'Team', section: 'Team', href: '/team' },
  { title: 'Organization', section: 'Team', href: '/team' },
  { title: 'Team Structure', section: 'Team', href: '/team' },

  // Security Hub
  { title: 'Security Hub', section: 'Security Hub', href: '/security-hub' },
  { title: 'Cybersecurity Knowledge', section: 'Security Hub', href: '/security-hub' },
  { title: 'Learning Center', section: 'Security Hub', href: '/security-hub' },
  { title: 'Network Security Basics', section: 'Security Hub', href: '/security-hub' },
  { title: 'Web Security', section: 'Security Hub', href: '/security-hub' },
  { title: 'Cryptography', section: 'Security Hub', href: '/security-hub' },
  { title: 'Incident Response', section: 'Security Hub', href: '/security-hub' },
  { title: 'Malware Analysis', section: 'Security Hub', href: '/security-hub' },
  { title: 'Penetration Testing', section: 'Security Hub', href: '/security-hub' },
  { title: 'Security Operations', section: 'Security Hub', href: '/security-hub' },
  { title: 'Digital Forensics', section: 'Security Hub', href: '/security-hub' },
  { title: 'Cloud Security', section: 'Security Hub', href: '/security-hub' },
  { title: 'Compliance', section: 'Security Hub', href: '/security-hub' },

  // PentesterFlow
  { title: 'PentesterFlow', section: 'Security Agent', href: '/pentesterflow' },
  { title: 'Security Agent', section: 'Security Agent', href: '/pentesterflow' },
  { title: 'AI Penetration Testing', section: 'Security Agent', href: '/pentesterflow' },
  { title: 'Automated Security', section: 'Security Agent', href: '/pentesterflow' },
  { title: 'Agent Loop', section: 'Security Agent', href: '/pentesterflow' },
  { title: 'Model Backends', section: 'Security Agent', href: '/pentesterflow' },
  { title: 'Shell Bash', section: 'Security Agent', href: '/pentesterflow' },
  { title: 'Skills Playbooks', section: 'Security Agent', href: '/pentesterflow' },
  { title: 'Session Memory', section: 'Security Agent', href: '/pentesterflow' },
  { title: 'Findings Report', section: 'Security Agent', href: '/pentesterflow' },
  { title: 'Terminal UI', section: 'Security Agent', href: '/pentesterflow' },
  { title: 'Engagement Model', section: 'Security Agent', href: '/pentesterflow' },
  { title: 'Provider Setup', section: 'Security Agent', href: '/pentesterflow' },
  { title: 'Slash Commands', section: 'Security Agent', href: '/pentesterflow' },
  { title: 'Why PentesterFlow', section: 'Security Agent', href: '/pentesterflow' },
  { title: 'Install Setup', section: 'Security Agent', href: '/pentesterflow' },
  { title: 'Security Model', section: 'Security Agent', href: '/pentesterflow' },

  // Security Sites
  { title: 'Security Sites', section: 'Security Sites', href: '/security-sites' },
  { title: 'Cybersecurity Resources', section: 'Security Sites', href: '/security-sites' },
  { title: 'Security Tools Online', section: 'Security Sites', href: '/security-sites' },
  { title: 'Vulnerability Scanners', section: 'Security Sites', href: '/security-sites' },
  { title: 'Threat Intelligence', section: 'Security Sites', href: '/security-sites' },
  { title: 'CTF Platforms', section: 'Security Sites', href: '/security-sites' },
  { title: 'Security News', section: 'Security Sites', href: '/security-sites' },
  { title: 'Exploit Databases', section: 'Security Sites', href: '/security-sites' },
  { title: 'Password Tools', section: 'Security Sites', href: '/security-sites' },
  { title: 'Malware Analysis', section: 'Security Sites', href: '/security-sites' },
  { title: 'Network Tools', section: 'Security Sites', href: '/security-sites' },
  { title: 'OSINT Tools', section: 'Security Sites', href: '/security-sites' },

  // Dark Web
  { title: 'Dark Web', section: 'Dark Web', href: '/safe-gateway' },
  { title: 'Dark Web Simulation', section: 'Dark Web', href: '/safe-gateway' },
  { title: 'Hidden Wiki', section: 'Dark Web', href: '/safe-gateway' },
  { title: 'Tor Network', section: 'Dark Web', href: '/safe-gateway' },
  { title: 'Marketplace', section: 'Dark Web', href: '/safe-gateway' },
  { title: 'Forum', section: 'Dark Web', href: '/safe-gateway' },
  { title: 'Education', section: 'Dark Web', href: '/safe-gateway' },
  { title: 'Chat', section: 'Dark Web', href: '/safe-gateway' },
  { title: 'Bitcoin', section: 'Dark Web', href: '/safe-gateway' },
  { title: 'Onion', section: 'Dark Web', href: '/safe-gateway' },

  // AI
  { title: 'AI', section: 'AI', href: '/security-ai' },
  { title: 'AI Assistant', section: 'AI', href: '/security-ai' },
  { title: 'Ask Question', section: 'AI', href: '/security-ai' },
  { title: 'OWASP Top 10', section: 'AI', href: '/security-ai' },
  { title: 'Firewall', section: 'AI', href: '/security-ai' },
  { title: 'Black Hat', section: 'AI', href: '/security-ai' },
  { title: 'White Hat', section: 'AI', href: '/security-ai' },

  // Contact
  { title: 'Contact', section: 'Contact', href: '/#contact' },
  { title: 'Send Message', section: 'Contact', href: '/#contact' },
  { title: 'Get In Touch', section: 'Contact', href: '/#contact' },
  { title: 'Email', section: 'Contact', href: '/#contact' },
  { title: 'Phone', section: 'Contact', href: '/#contact' },
  { title: 'Location', section: 'Contact', href: '/#contact' },

  // Navigation
  { title: 'Home', section: 'Nav', href: '/#home' },
  { title: 'Search', section: 'Nav', href: '' },
  { title: 'Language', section: 'Nav', href: '' },
  { title: 'Dark Mode', section: 'Nav', href: '' },
  { title: 'Light Mode', section: 'Nav', href: '' },
];

export function KeyboardSearch() {
  const { isOpen, searchQuery, setSearchQuery, close } = useKeyboardSearch();
  const router = useRouter();

  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allContent.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.section.toLowerCase().includes(query)
    ).slice(0, 15);
  }, [searchQuery]);

  const handleResultClick = (href: string) => {
    if (href) {
      if (href.startsWith('/#')) {
        router.push('/');
        setTimeout(() => {
          const el = document.getElementById(href.slice(2));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        router.push(href);
      }
    }
    close();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-start justify-center pt-[20vh]"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="w-full max-w-2xl mx-4 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="w-5 h-5 text-cyber-red" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything..."
                className="flex-1 bg-transparent text-foreground text-lg outline-none placeholder:text-muted-foreground"
                autoFocus
              />
              <button onClick={close} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {results.length > 0 ? (
                <div className="p-2">
                  {results.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleResultClick(result.href)}
                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition-colors flex items-center justify-between group"
                    >
                      <span className="text-foreground group-hover:text-cyber-red transition-colors">
                        {result.title}
                      </span>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {result.section}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  {searchQuery ? 'No results found' : 'Start typing to search...'}
                </div>
              )}
            </div>

            <div className="px-4 py-2 border-t border-border text-xs text-muted-foreground flex items-center justify-between">
              <span>Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-muted-foreground">ESC</kbd> to close</span>
              <span>{results.length} results</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
