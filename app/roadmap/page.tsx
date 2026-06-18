'use client';
import { LanguageProvider } from '@/contexts/language-context';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/sections/Footer';
import { Roadmap } from '@/sections/Roadmap';

export default function RoadmapPage() {
  return (
    <LanguageProvider>
      <Navigation />
      <main className="relative min-h-screen bg-background pt-20">
        <Roadmap />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
