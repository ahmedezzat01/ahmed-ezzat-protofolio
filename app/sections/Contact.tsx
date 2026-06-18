'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, XCircle } from 'lucide-react';
import { LinkedInIcon, GitHubIcon, FacebookIcon, InstagramIcon } from '@/components/ui/social-icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { useLanguage } from '@/contexts/language-context';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
    .slice(0, 500);
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useLanguage();
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-info', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' }
      });
      gsap.fromTo('.contact-form', { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    const sanitizedState = {
      name: sanitizeInput(formState.name),
      email: sanitizeInput(formState.email),
      subject: sanitizeInput(formState.subject),
      message: sanitizeInput(formState.message),
    };
    
    if (!sanitizedState.name || !sanitizedState.email || !sanitizedState.subject || !sanitizedState.message) {
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedState.email)) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch {
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'ahmed.ezzat@students.du.edu.eg', href: 'mailto:ahmed.ezzat@students.du.edu.eg' },
    { icon: Phone, label: 'Phone', value: '+20 102 473 8360', href: 'tel:+201024738360' },
    { icon: MapPin, label: 'Location', value: 'Damietta, Egypt', href: '#' },
  ];

  const socials = [
    { icon: LinkedInIcon, href: 'https://www.linkedin.com/in/ahmed-ezzat01/', label: 'LinkedIn' },
    { icon: GitHubIcon, href: 'https://github.com/ahmedezzat01', label: 'GitHub' },
    { icon: FacebookIcon, href: 'https://facebook.com/ahmed.ezzat.0001', label: 'Facebook' },
    { icon: InstagramIcon, href: 'https://www.instagram.com/ahmed.ezzaat.01/', label: 'Instagram' },
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-cyber-red">&lt;</span>
            <span className="text-gradient-blue-red">{t.contact.title}</span>
            <span className="text-cyber-red">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="contact-info space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t.contact.getInTouch}</h3>
              <p className="text-muted-foreground">{t.contact.getInTouchDesc}</p>
            </div>
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <a key={info.label} href={info.href}
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover-glow transition-all duration-300 hover:border-cyber-red/30 group cursor-pointer">
                  <div className="w-12 h-12 bg-cyber-red/10 rounded-lg flex items-center justify-center group-hover:bg-cyber-red/20 transition-colors">
                    <info.icon className="w-5 h-5 text-cyber-red" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{info.label}</p>
                    <p className="text-foreground font-medium">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center hover-glow transition-all duration-300 hover:border-cyber-red/30 hover:bg-cyber-red/10">
                  <social.icon className="w-5 h-5 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          <div className="contact-form">
            <Card className="bg-card border-border">
              <CardHeader><CardTitle className="text-foreground">{t.contact.sendMessage}</CardTitle></CardHeader>
              <CardContent>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">{t.contact.name}</label>
                      <input type="text" name="from_name" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:border-cyber-red transition-colors" required />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">{t.contact.email}</label>
                      <input type="email" name="from_email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:border-cyber-red transition-colors" required />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">{t.contact.subject}</label>
                    <input type="text" name="subject" value={formState.subject} onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:border-cyber-red transition-colors" required />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">{t.contact.message}</label>
                    <textarea name="message" value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:border-cyber-red transition-colors min-h-[120px] resize-none" required />
                  </div>
                  <LiquidButton type="submit" variant="default" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                        {t.contact.sending}
                      </span>
                    ) : isSubmitted ? (
                      <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />{t.contact.sent}</span>
                    ) : submitError ? (
                      <span className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-400" />Error sending</span>
                    ) : (
                      <span className="flex items-center gap-2"><Send className="w-4 h-4" />{t.contact.sendBtn}</span>
                    )}
                  </LiquidButton>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
