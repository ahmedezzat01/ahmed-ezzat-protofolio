'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Network, Code, Server, Palette, BarChart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Cybersecurity',
    titleAr: 'الأمن السيبراني',
    titleEs: 'Ciberseguridad',
    icon: Shield,
    color: 'cyber-red',
    skills: ['Penetration Testing', 'Vulnerability Assessment', 'OWASP Top 10', 'Web App Security', 'Network Security', 'Nmap', 'Burp Suite', 'Metasploit', 'Wireshark', 'Kali Linux', 'TryHackMe', 'Security Reporting'],
  },
  {
    title: 'Linux Administration',
    titleAr: 'إدارة Linux',
    titleEs: 'Administración Linux',
    icon: Server,
    color: 'cyber-red',
    skills: ['RHEL', 'Rocky Linux', 'User/Group Management', 'SSH', 'SELinux', 'Firewalld', 'LVM', 'Apache', 'Nginx', 'Cron', 'Systemd', 'Log Analysis', 'Bash Scripting'],
  },
  {
    title: 'Networking',
    titleAr: 'الشبكات',
    titleEs: 'Redes',
    icon: Network,
    color: 'cyber-red',
    skills: ['CCNA', 'Routing', 'Switching', 'VLANs', 'TCP/IP', 'Subnetting', 'Cisco Packet Tracer', 'LAN/WAN', 'Network Troubleshooting'],
  },
  {
    title: 'Programming',
    titleAr: 'البرمجة',
    titleEs: 'Programación',
    icon: Code,
    color: 'cyber-red',
    skills: ['Python', 'C', 'Java', 'JavaScript', 'HTML', 'CSS', 'Responsive Design', 'Front-End Development'],
  },
  {
    title: 'Design & Marketing',
    titleAr: 'التصميم والتسويق',
    titleEs: 'Diseño y Marketing',
    icon: Palette,
    color: 'cyber-red',
    skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'Figma', 'Branding', 'Social Media Marketing', 'Meta Ads', 'Campaign Management', 'Content Planning'],
  },
  {
    title: 'System Analysis',
    titleAr: 'تحليل الأنظمة',
    titleEs: 'Análisis de Sistemas',
    icon: BarChart,
    color: 'cyber-red',
    skills: ['Requirements Gathering', 'Use Case Analysis', 'Feasibility Study', 'DFD Diagrams', 'UX Analysis', 'Business Process Analysis'],
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skill-bar',
        { width: 0 }, { width: '100%', duration: 1, stagger: 0.05, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' }
        }
      );
      gsap.fromTo('.skill-category',
        { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-cyber-red">&lt;</span>
            <span className="text-gradient-blue-red">{t.skills.title}</span>
            <span className="text-cyber-red">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.skills.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => {
            const Icon = category.icon;
            return (
              <div key={i} className="skill-category">
                <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-border/80">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-foreground">
                      <div className={`w-10 h-10 rounded-lg bg-${category.color}/10 flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 text-${category.color}`} />
                      </div>
                      <span className="text-sm">
                        {category.title}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill, j) => (
                        <span key={j} className="px-2 py-1 text-xs bg-muted text-foreground rounded-md border border-border hover:border-border/80 transition-colors">
                          {skill}
                        </span>
                      ))}
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
