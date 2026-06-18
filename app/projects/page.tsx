'use client';
import { LanguageProvider } from '@/contexts/language-context';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/sections/Footer';
import { ProjectsContent } from './content';

export default function ProjectsPage() {
  return (
    <LanguageProvider>
      <Navigation />
      <ProjectsContent />
      <Footer />
    </LanguageProvider>
  );
}
