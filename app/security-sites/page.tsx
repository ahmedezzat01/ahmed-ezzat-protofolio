'use client';
import { LanguageProvider } from '@/contexts/language-context';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/sections/Footer';
import { SecuritySitesContent } from '@/components/security-sites/SecuritySitesContent';

export default function SecuritySitesPage() {
  return (
    <LanguageProvider>
      <Navigation />
      <SecuritySitesContent />
      <Footer />
    </LanguageProvider>
  );
}
