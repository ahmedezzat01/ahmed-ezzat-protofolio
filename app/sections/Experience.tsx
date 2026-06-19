'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Terminal, Users, Calendar, MapPin, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    title: 'IT Manager',
    company: '',
    date: 'Jan 2026 – Present',
    location: 'Damietta, Egypt',
    icon: Shield,
    status: 'in-progress',
    color: '#df2531',
    responsibilities: [
      'Managing complete IT infrastructure across the organization',
      'Systems administration and server management',
      'User and device management with access control policies',
      'Network administration, monitoring, and optimization',
      'Security policies implementation and compliance',
      'Technical operations, support, and incident response',
      'Troubleshooting complex issues & business continuity planning',
    ],
    technologies: ['Linux', 'Windows Server', 'Networking', 'Firewall', 'Active Directory'],
  },
  {
    id: 2,
    title: 'IT Specialist',
    company: '',
    date: 'Nov 2026 – Present',
    location: 'Egypt',
    icon: Terminal,
    status: 'in-progress',
    color: 'rgba(223, 37, 49, 0.65)',
    responsibilities: [
      'Managing IT systems and infrastructure for port operations',
      'Supporting business-critical logistics operations',
      'User support, troubleshooting, and helpdesk management',
      'Workstation & printer administration and deployment',
      'Network resources administration and monitoring',
      'Technical problem solving and process optimization',
      'Ensuring uptime for mission-critical systems',
    ],
    technologies: ['Linux', 'Networking', 'Hardware', 'Logistics Systems'],
  },
  {
    id: 3,
    title: 'Penetration Tester',
    company: '',
    date: '2025 – Present',
    location: 'Remote',
    icon: Shield,
    status: 'in-progress',
    color: '#ffffff',
    responsibilities: [
      'Conducting penetration testing on web applications and networks',
      'Vulnerability assessment and exploitation reporting',
      'OWASP Top 10 security testing and analysis',
      'Writing detailed security reports with remediation steps',
      'Bug bounty hunting and responsible disclosure',
    ],
    technologies: ['Burp Suite', 'Metasploit', 'Nmap', 'OWASP ZAP', 'Linux'],
  },
  {
    id: 4,
    title: 'Chief Executive Officer (CEO)',
    company: 'Technology Society Team (TST)',
    date: 'Jan 2025 – Present',
    location: 'Damietta University',
    icon: Users,
    status: 'in-progress',
    color: 'rgba(223, 37, 49, 0.45)',
    responsibilities: [
      'Team leadership, strategic planning, and organizational growth',
      'Event management, branding, and marketing campaigns',
      'Social media management and content strategy',
      'Organizational development and team structure design',
      'Team growth, mentoring, and skill development',
      'Cross-committee coordination and partnerships',
    ],
    technologies: ['Leadership', 'Marketing', 'Branding', 'Event Planning', 'Team Management'],
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.timeline-item',
        { opacity: 0, x: -50, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' }
        }
      );
      gsap.fromTo('.timeline-line',
        { scaleY: 0 }, { scaleY: 1, duration: 1.5, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-24 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-cyber-red">&lt;</span>
            <span className="text-gradient-blue-red">{t.experience.title}</span>
            <span className="text-cyber-red">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.experience.subtitle}</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-red via-cyber-red to-cyber-red timeline-line origin-top" />
          <div className="space-y-10 md:space-y-16">
            {experiences.map((exp, index) => (
              <div key={exp.id} id={`exp-${exp.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} className={`timeline-item relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-[#df2531]/80 bg-[#df2531]/10">
                    <exp.icon className="w-6 h-6 text-[#df2531]" />
                  </div>
                </div>
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-50px)] ${index % 2 === 0 ? 'md:pr-14' : 'md:pl-14'}`}>
                  <Card className="bg-card border-border hover-glow transition-all duration-300 hover:border-cyber-red/30 cursor-pointer overflow-hidden">
                    <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }} />
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4" style={{ color: exp.color }} />
                        <span className="text-sm text-muted-foreground font-mono">{exp.date}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber-red animate-pulse" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{exp.title}</h3>
                      {exp.company && <p className="text-sm font-medium mb-1" style={{ color: exp.color }}>{exp.company}</p>}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                        <MapPin className="w-3 h-3" />{exp.location}
                      </div>
                      <ul className="space-y-1.5 mb-4">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <ChevronRight className="w-3 h-3 mt-0.5 shrink-0" style={{ color: exp.color }} />
                            {resp}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {exp.technologies.map((tech, j) => (
                          <span key={j} className="px-2 py-0.5 text-[10px] rounded-md border border-border text-muted-foreground">{tech}</span>
                        ))}
                      </div>
                      <div>
                        <span className="px-3 py-1 text-xs rounded-full border"
                          style={{ backgroundColor: `${exp.color}15`, borderColor: `${exp.color}40`, color: exp.color }}>
                          {t.experience.current}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="hidden md:block md:w-[calc(50%-50px)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
