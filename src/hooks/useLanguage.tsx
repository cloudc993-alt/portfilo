import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, translations } from '../data/translations';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (typeof translations)[Language];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem('islomjon_portfolio_lang');
      return saved === 'en' || saved === 'uz' ? saved : 'uz';
    } catch {
      return 'uz';
    }
  });

  const setLang = (next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem('islomjon_portfolio_lang', next);
    } catch {
      // Ignore storage failures in restricted contexts
    }
  };

  const toggleLang = () => {
    setLang(lang === 'uz' ? 'en' : 'uz');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t: translations[lang],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
