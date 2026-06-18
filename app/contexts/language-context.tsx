'use client';
import { createContext, useContext, ReactNode } from 'react';
import { translations } from '@/lib/translations';

interface LanguageContextType {
  language: 'en';
  setLanguage: () => void;
  t: typeof translations.en;
  dir: 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const value: LanguageContextType = {
    language: 'en',
    setLanguage: () => {},
    t: translations.en,
    dir: 'ltr',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
