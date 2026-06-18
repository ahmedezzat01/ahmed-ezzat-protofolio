'use client';
import { LanguageProvider } from '@/contexts/language-context';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/sections/Footer';
import { SecurityHubContent } from '@/components/cyber-hub/CyberHubContent';
import { DottedSurface } from '@/components/ui/dotted-surface';

export default function SecurityHubPage() {
  return (
    <LanguageProvider>
      <DottedSurface />
      <Navigation />
      <SecurityHubContent />
      <Footer />
    </LanguageProvider>
  );
}
