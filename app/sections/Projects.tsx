'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, Shield, Terminal, Bug, Lock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '1',
    title: 'Web Application Security Scanner',
    description: 'Automated security scanner for web applications that detects common vulnerabilities including XSS, SQLi, and CSRF.',
    technologies: ['Python', 'Flask', 'BeautifulSoup', 'SQLMap'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
    icon: Bug,
    color: 'from-cyber-red to-cyber-red',
  },
  {
    id: '2',
    title: 'Network Intrusion Detection System',
    description: 'ML-based network intrusion detection system that monitors traffic and identifies potential threats in real-time.',
    technologies: ['Python', 'TensorFlow', 'Scapy', 'Pandas'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    icon: Shield,
    color: 'from-cyber-red to-cyber-red',
  },
  {
    id: '3',
    title: 'Password Manager with Zero-Knowledge',
    description: 'Secure password manager implementing zero-knowledge architecture for maximum security.',
    technologies: ['TypeScript', 'React', 'Node.js', 'AES-256'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    icon: Lock,
    color: 'from-cyber-red to-cyber-red',
  },
  {
    id: '4',
    title: 'Malware Analysis Sandbox',
    description: 'Isolated environment for analyzing and reverse-engineering malware samples safely.',
    technologies: ['Docker', 'Python', 'YARA', 'Volatility'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    icon: Terminal,
    color: 'from-cyber-red to-cyber-red',
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate project cards with 3D effect
      gsap.fromTo('.project-card',
        { opacity: 0, y: 80, rotateX: 20, scale: 0.9 },
        {
          opacity: 1, y: 0, rotateX: 0, scale: 1,
          duration: 1, stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-cyber-red">&lt;</span>
            <span className="text-gradient">Projects</span>
            <span className="text-cyber-red">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Security tools and research projects showcasing expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8" style={{ perspective: '1000px' }}>
          {projects.map((project) => (
            <div key={project.id} className="project-card" style={{ transformStyle: 'preserve-3d' }}>
              <Card className="bg-card border-border overflow-hidden hover-glow transition-all duration-500 group cursor-pointer hover:rotate-y-3 hover:rotate-x-3 hover:scale-105">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
                  <div className="absolute bottom-4 left-4 transform group-hover:translate-y-[-10px] transition-transform duration-500">
                    <project.icon className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-[-10px]">
                    <div className="flex gap-2">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <ExternalLink className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-cyber-red transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full border border-border hover:border-cyber-red/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <LiquidButton variant="ghost" size="sm">
                    View Details
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </LiquidButton>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
