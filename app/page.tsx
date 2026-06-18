'use client';

import { Navigation } from '@/components/navigation';
import { Notifications } from '@/components/notifications';
import { LanguageProvider } from '@/contexts/language-context';
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/sections/Hero').then(m => m.Hero), { ssr: false, loading: () => <div className="h-screen" /> });
const About = dynamic(() => import('@/sections/About').then(m => m.About), { ssr: false, loading: () => <div className="h-96" /> });
const Skills = dynamic(() => import('@/sections/Skills').then(m => m.Skills), { ssr: false, loading: () => <div className="h-96" /> });
const Experience = dynamic(() => import('@/sections/Experience').then(m => m.Experience), { ssr: false, loading: () => <div className="h-96" /> });
const Contact = dynamic(() => import('@/sections/Contact').then(m => m.Contact), { ssr: false, loading: () => <div className="h-96" /> });
const Footer = dynamic(() => import('@/sections/Footer').then(m => m.Footer), { ssr: false, loading: () => <div className="h-32" /> });
const MatrixRain = dynamic(() => import('@/components/ui/matrix-code'), { ssr: false, loading: () => <div className="fixed inset-0 z-0 bg-[#0a0a0a]" /> });

export default function Home() {
  return (
    <LanguageProvider>
      <main className="relative">
        <div className="fixed inset-0 z-0">
          <MatrixRain
            fontSize={14}
            color="#df2531"
            characters="01アイウエオカキクケコサシスセソタチツテト"
            fadeOpacity={0.08}
            speed={0.8}
          />
        </div>
        <div className="relative z-[1]">
          <Navigation />
          <Notifications />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Contact />
          <Footer />
        </div>
      </main>
    </LanguageProvider>
  );
}
