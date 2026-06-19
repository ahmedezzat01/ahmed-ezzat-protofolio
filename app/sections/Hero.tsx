'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, ChevronDown, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import Link from 'next/link';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { useLanguage } from '@/contexts/language-context';
import dynamic from 'next/dynamic';

const SplineScene = dynamic(() => import('@/components/ui/splite').then(m => ({ default: m.SplineScene })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 border-4 border-cyber-red/20 border-t-cyber-red rounded-full animate-spin" />
    </div>
  ),
});

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <div ref={ref} className="text-2xl md:text-3xl font-bold text-gradient-blue-red">{count}{suffix}</div>;
}

function SplineDeferred() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoad(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (!load) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-24 h-24 border-4 border-cyber-red/20 border-t-cyber-red rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <SplineScene
      scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
      className="w-full h-full"
    />
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [typedText, setTypedText] = useState('');
  const fullText = 'ENG:\nAhmed Ezzat';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.15, ease: 'power3.out' }
      );
      gsap.fromTo(buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.3, ease: 'power3.out' }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 w-full grid lg:grid-cols-2 items-center gap-8 pt-20 pb-16 min-h-screen relative z-[2]">
        <div className="text-center lg:text-left z-10" style={{ perspective: '1000px' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-red/10 border border-cyber-red/30 rounded-full mb-6 hover-glow">
              <Shield className="w-4 h-4 text-cyber-red" />
              <span className="text-cyber-red text-sm font-mono">{t.hero.badge}</span>
            </div>
          </motion.div>

          <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 font-mono leading-tight whitespace-pre-line" style={{ transformStyle: 'preserve-3d' }}>
            <span className="text-gradient-blue-red">{typedText}</span>
            <span className="animate-pulse text-cyber-red">|</span>
          </h1>

          <p ref={subtitleRef} className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-4 leading-relaxed">
            {t.hero.subtitle}
          </p>
          <p className="text-sm text-muted-foreground/60 max-w-xl mx-auto lg:mx-0 mb-10">
            {t.hero.subtitleDesc}
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4">
            <Link href="/projects" passHref>
              <LiquidButton variant="glass" size="lg" className="whitespace-nowrap flex-nowrap">
                {t.hero.viewProjects} <ArrowRight className="w-4 h-4 shrink-0" />
              </LiquidButton>
            </Link>
            <Link href="/#contact" passHref>
              <LiquidButton variant="glass" size="lg">
                {t.hero.contactMe}
              </LiquidButton>
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-4 sm:gap-8 mt-12 justify-center lg:justify-start">
            {[
              { value: 1, suffix: '+', label: t.hero.yearsExp },
              { value: 10, suffix: '+', label: t.hero.projectsDone },
              { value: 50, suffix: '+', label: 'Clients Served' },
            ].map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D Robot — deferred load */}
        <div className="hidden lg:flex items-center justify-center relative" style={{ width: '750px', height: '750px', marginLeft: '-100px' }}>
          <SplineDeferred />
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground font-mono">{t.hero.scrollDown}</span>
        <ChevronDown className="w-5 h-5 text-cyber-red animate-bounce" />
      </motion.div>
    </section>
  );
}
