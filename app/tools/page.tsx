'use client';
import { LanguageProvider } from '@/contexts/language-context';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/sections/Footer';
import { SecurityTools } from '@/sections/SecurityTools';

export default function ToolsPage() {
  return (
    <LanguageProvider>
      <Navigation />
      <main className="relative min-h-screen bg-background pt-20">
        <SecurityTools />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
