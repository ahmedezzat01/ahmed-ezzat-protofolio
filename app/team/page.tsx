'use client';
import { LanguageProvider } from '@/contexts/language-context';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/sections/Footer';
import { TeamContent } from '@/components/team/TeamContent';

export default function TeamPage() {
  return (
    <LanguageProvider>
      <Navigation />
      <TeamContent />
      <Footer />
    </LanguageProvider>
  );
}
