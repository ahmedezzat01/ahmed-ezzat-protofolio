'use client';
import { useEffect, useRef, useState, Component, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, ChevronDown, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import Link from 'next/link';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { useLanguage } from '@/contexts/language-context';

import Spline from '@splinetool/react-spline';

class SplineErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function CyberRobotFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 400;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    let frame = 0;
    let animId: number;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, size, size);
      const time = frame * 0.02;

      // Outer rotating ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.3);
      ctx.strokeStyle = 'rgba(223, 37, 49, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(0, 0, 160, 160, 0, 0, Math.PI * 2);
      ctx.stroke();
      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        const x = Math.cos(angle) * 160;
        const y = Math.sin(angle) * 160;
        ctx.fillStyle = `rgba(223, 37, 49, ${0.3 + Math.sin(time + i) * 0.2})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Inner ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-time * 0.5);
      ctx.strokeStyle = 'rgba(223, 37, 49, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, 120, 120, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Grid
      ctx.strokeStyle = 'rgba(223, 37, 49, 0.06)';
      ctx.lineWidth = 0.5;
      for (let i = -200; i <= 200; i += 40) {
        ctx.beginPath();
        ctx.moveTo(cx + i, 0);
        ctx.lineTo(cx + i, size);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, cy + i);
        ctx.lineTo(size, cy + i);
        ctx.stroke();
      }

      // Glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
      grd.addColorStop(0, 'rgba(223, 37, 49, 0.2)');
      grd.addColorStop(0.5, 'rgba(223, 37, 49, 0.05)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, size, size);

      // Shield
      ctx.save();
      ctx.translate(cx, cy);
      const pulse = 1 + Math.sin(time * 2) * 0.03;
      ctx.scale(pulse, pulse);
      ctx.strokeStyle = 'rgba(223, 37, 49, 0.9)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(0, -35);
      ctx.lineTo(28, -20);
      ctx.lineTo(28, 8);
      ctx.quadraticCurveTo(28, 30, 0, 40);
      ctx.quadraticCurveTo(-28, 30, -28, 8);
      ctx.lineTo(-28, -20);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = 'rgba(223, 37, 49, 0.1)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(223, 37, 49, 0.6)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 4; i++) {
        const y = -15 + i * 12;
        const w = 20 - Math.abs(i - 1.5) * 4;
        ctx.beginPath();
        ctx.moveTo(-w, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Particles
      for (let i = 0; i < 6; i++) {
        const angle = time * 0.5 + (i / 6) * Math.PI * 2;
        const r = 100 + Math.sin(time + i * 2) * 20;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        ctx.fillStyle = `rgba(223, 37, 49, ${0.3 + Math.sin(time * 2 + i) * 0.2})`;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} style={{ width: 400, height: 400, maxWidth: '100%' }} />
    </div>
  );
}

function SplineDeferred() {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoad(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (!load) return <CyberRobotFallback />;

  return (
    <SplineErrorBoundary fallback={<CyberRobotFallback />}>
      <Spline scene="/scene.splinecode" className="w-full h-full" />
    </SplineErrorBoundary>
  );
}

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
            className="flex items-center gap-8 mt-12 justify-center lg:justify-start">
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
