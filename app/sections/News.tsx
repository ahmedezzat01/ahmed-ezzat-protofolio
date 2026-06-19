'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ExternalLink, Clock, Newspaper, Shield, Flame } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';

gsap.registerPlugin(ScrollTrigger);

const securityNews = [
  {
    id: 1,
    title: 'Critical Zero-Day Vulnerability Found in Popular VPN Software',
    description: 'Security researchers have discovered a critical zero-day vulnerability affecting thousands of organizations worldwide.',
    severity: 'critical',
    source: 'SecurityWeek',
    time: '2 hours ago',
    category: 'Vulnerability',
  },
  {
    id: 2,
    title: 'New Ransomware Group Targets Healthcare Sector',
    description: 'A new ransomware operation has been observed targeting hospital networks and healthcare providers.',
    severity: 'high',
    source: 'BleepingComputer',
    time: '5 hours ago',
    category: 'Malware',
  },
  {
    id: 3,
    title: 'Major Data Breach Exposes 100M User Records',
    description: 'A popular social media platform confirms a massive data breach affecting user personal information.',
    severity: 'critical',
    source: 'Krebs on Security',
    time: '1 day ago',
    category: 'Data Breach',
  },
  {
    id: 4,
    title: 'New Phishing Campaign Mimics Government Agencies',
    description: 'Sophisticated phishing emails are impersonating government agencies to steal credentials.',
    severity: 'medium',
    source: 'PhishTank',
    time: '1 day ago',
    category: 'Phishing',
  },
  {
    id: 5,
    title: 'Cloud Misconfiguration Leads to Exposed Customer Data',
    description: 'Misconfigured cloud storage buckets exposed sensitive customer data of a major corporation.',
    severity: 'high',
    source: 'Dark Reading',
    time: '2 days ago',
    category: 'Cloud Security',
  },
];

const severityConfig: Record<string, { color: string; bg: string; border: string; icon: typeof Flame }> = {
  critical: { color: 'text-cyber-red', bg: 'bg-cyber-red/20', border: 'border-cyber-red/30', icon: Flame },
  high: { color: 'text-orange-500', bg: 'bg-orange-500/20', border: 'border-orange-500/30', icon: AlertTriangle },
  medium: { color: 'text-cyber-red', bg: 'bg-cyber-red/20', border: 'border-cyber-red/30', icon: Shield },
  low: { color: 'text-cyber-red', bg: 'bg-cyber-red/20', border: 'border-cyber-red/30', icon: Shield },
};

export function News() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate news items with stagger
      gsap.fromTo('.news-item',
        { opacity: 0, x: -40, scale: 0.95 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 0.6, stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredNews = filter === 'all' 
    ? securityNews 
    : securityNews.filter(n => n.severity === filter);

  return (
    <section ref={sectionRef} id="news" className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-cyber-red">&lt;</span>
            <span className="text-gradient">Security News</span>
            <span className="text-cyber-red">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Latest cybersecurity threats and vulnerabilities
          </p>
        </motion.div>

        {/* Severity Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {['all', 'critical', 'high', 'medium'].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                filter === level
                  ? 'bg-[#b01e28] text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {level === 'all' ? 'All Alerts' : level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredNews.map((news) => {
            const config = severityConfig[news.severity];
            const SeverityIcon = config.icon;

            return (
              <div key={news.id} className="news-item">
                <Card className="bg-card border-border hover-glow transition-all duration-300 hover:border-cyber-red/30 cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${config.bg} ${config.border} border`}>
                        <SeverityIcon className={`w-5 h-5 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 text-xs rounded ${config.bg} ${config.color} border ${config.border}`}>
                            {news.severity.toUpperCase()}
                          </span>
                          <span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded">
                            {news.category}
                          </span>
                        </div>
                        <h3 className="text-foreground font-semibold text-sm group-hover:text-cyber-red transition-colors mb-1">
                          {news.title}
                        </h3>
                        <p className="text-muted-foreground text-xs line-clamp-2">
                          {news.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {news.time}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Newspaper className="w-3 h-3" />
                            {news.source}
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
