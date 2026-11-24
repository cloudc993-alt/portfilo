import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Globe, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

interface NavLinkItem {
  id: string;
  label: string;
}

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: NavLinkItem[] = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'skills', label: t.nav.skills },
    { id: 'projects', label: t.nav.projects },
    { id: 'services', label: t.nav.services },
    { id: 'process', label: t.nav.process },
    { id: 'contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (location.pathname !== '/') return;

      const offset = 140;
      let current = 'home';
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= offset) {
            current = item.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname, lang]);

  useEffect(() => {
    if (location.pathname.startsWith('/projects')) {
      setActiveSection('projects');
    }
  }, [location.pathname]);

  const handleNavClick = (sectionId: string) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      return;
    }

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3' : 'bg-gradient-to-b from-[#080808]/90 to-transparent py-4'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex shrink-0 items-center gap-2.5 text-left whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2B1C] rounded-md"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#FF2B1C]/50 bg-[#151515] font-display text-xs font-bold text-white shadow-[0_0_20px_rgba(255,43,28,0.25)]">
            NI
          </span>
          <span className="font-display text-sm font-bold tracking-wider text-white sm:text-base">
            NE&apos;MATOV
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`fire-underline shrink-0 whitespace-nowrap py-1 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2B1C] rounded-sm ${
                  isActive ? 'is-active text-white' : 'text-[#A3A3A3] hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Language Switcher & Mobile Menu Button */}
        <div className="flex shrink-0 items-center gap-2.5">
          <div
            role="group"
            aria-label="Language switcher"
            className="flex items-center rounded-lg border border-white/10 bg-[#121212] p-0.5"
          >
            <span className="hidden items-center pl-2 pr-1 text-[#A3A3A3] sm:inline-flex" aria-hidden="true">
              <Globe className="h-3.5 w-3.5" />
            </span>
            <button
              type="button"
              onClick={() => setLang('uz')}
              className={`min-h-[34px] rounded-md px-2.5 text-xs font-semibold tracking-wide transition-colors whitespace-nowrap shrink-0 ${
                lang === 'uz'
                  ? 'bg-[#FF2B1C] text-white'
                  : 'text-[#A3A3A3] hover:text-white'
              }`}
            >
              UZ
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`min-h-[34px] rounded-md px-2.5 text-xs font-semibold tracking-wide transition-colors whitespace-nowrap shrink-0 ${
                lang === 'en'
                  ? 'bg-[#FF2B1C] text-white'
                  : 'text-[#A3A3A3] hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#151515] text-white transition-colors hover:border-[#FF2B1C]/60 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mx-4 mt-3 rounded-2xl border border-white/10 bg-[#101010]/98 p-4 shadow-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`flex min-h-[44px] items-center justify-between rounded-xl px-4 text-left text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#FF2B1C]/15 text-white border border-[#FF2B1C]/40'
                        : 'text-[#A3A3A3] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="h-1.5 w-4 rounded-full bg-[#FF2B1C]" />}
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
