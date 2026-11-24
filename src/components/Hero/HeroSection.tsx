import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ArrowDown, ArrowRight, ImagePlus, Mail, Sparkles } from 'lucide-react';
import { HeroCanvas } from './HeroCanvas';
import { Magnetic } from '../../utils/MagneticButton';
import { useLanguage } from '../../hooks/useLanguage';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { siteConfig } from '../../data/siteConfig';

const techStack = ['HTML5', 'CSS3', 'SCSS', 'JavaScript', 'React.js', 'PHP'];

export function HeroSection() {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const portraitWrapRef = useRef<HTMLDivElement>(null);

  const [portraitFailed, setPortraitFailed] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 26,
        opacity: 0,
        duration: 0.75,
        stagger: 0.09,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReduced) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 18;
    const y = (e.clientY / window.innerHeight - 0.5) * 18;
    setParallax({ x, y });
  };

  const handleLocalPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewSrc(url);
    setPortraitFailed(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const activePortraitSrc = previewSrc || siteConfig.owner.portraitPath;

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden bg-[#080808] pt-24 pb-16 sm:pt-28 sm:pb-20"
    >
      {/* Three.js / React Three Fiber 3D Environment */}
      <HeroCanvas />

      {/* Subtle architectural vignette so text stays razor-sharp */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#080808]/60 via-transparent to-[#080808]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* LEFT COLUMN — Typographic Hierarchy & CTAs */}
          <div className="order-2 flex flex-col items-start lg:order-1 lg:col-span-7">
            <div className="hero-stagger mb-5 inline-flex items-center gap-2.5 rounded-md border border-[#FF2B1C]/40 bg-[#151515]/90 px-3.5 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#FF5A1F]" aria-hidden="true" />
              <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-white uppercase">
                {t.hero.badge}
              </span>
            </div>

            <h1 className="hero-stagger font-display text-4xl font-extrabold tracking-tight text-white [text-wrap:balance] sm:text-5xl lg:text-6xl xl:text-[4.15rem] xl:leading-[1.06]">
              {t.hero.name}
            </h1>

            <p className="hero-stagger fire-gradient-text mt-3 font-display text-xl font-bold tracking-wide sm:text-2xl lg:text-[1.75rem]">
              {t.hero.title}
            </p>

            <p className="hero-stagger mt-5 max-w-xl text-base leading-relaxed text-[#A3A3A3] sm:text-lg">
              {t.hero.description}
            </p>

            {/* Primary CTA Buttons */}
            <div className="hero-stagger mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <button
                  type="button"
                  onClick={() => scrollToSection('projects')}
                  className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#FF2B1C] to-[#FF5A1F] px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_12px_32px_-8px_rgba(255,43,28,0.6)] transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A24] whitespace-nowrap shrink-0"
                >
                  <span>{t.hero.ctaProjects}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </Magnetic>

              <Magnetic>
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex min-h-[48px] items-center gap-2.5 rounded-xl border border-white/15 bg-[#121212]/90 px-6 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:border-[#FF5A1F]/70 hover:bg-[#191919] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2B1C] whitespace-nowrap shrink-0"
                >
                  <Mail className="h-4 w-4 text-[#FF5A1F]" aria-hidden="true" />
                  <span>{t.hero.ctaContact}</span>
                </button>
              </Magnetic>
            </div>

            {/* Technology Stack Strip */}
            <div className="hero-stagger mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-6">
              {techStack.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span className="font-mono text-xs font-medium tracking-wider text-[#A3A3A3] transition-colors hover:text-[#FF7A24]">
                    {tech}
                  </span>
                  {idx < techStack.length - 1 && (
                    <span className="text-[#FF2B1C]/60" aria-hidden="true">
                      ·
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — Real Portrait Centerpiece */}
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
            <motion.div
              ref={portraitWrapRef}
              initial={prefersReduced ? false : { opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transform: prefersReduced
                  ? undefined
                  : `translate3d(${parallax.x * 0.6}px, ${parallax.y * 0.6}px, 0)`,
                transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="relative w-full max-w-[340px] sm:max-w-[390px] lg:max-w-[430px]"
            >
              {/* Crimson & Orange Cinematic Backlight */}
              <div
                className="pointer-events-none absolute -inset-6 rounded-full bg-gradient-to-tr from-[#FF2B1C]/35 via-[#FF5A1F]/18 to-transparent blur-3xl"
                aria-hidden="true"
              />

              {/* Subtle Architectural Orbital Ring SVG */}
              <svg
                viewBox="0 0 420 420"
                className="pointer-events-none absolute -inset-5 h-[calc(100%+40px)] w-[calc(100%+40px)] opacity-55"
                aria-hidden="true"
              >
                <circle
                  cx="210"
                  cy="210"
                  r="198"
                  fill="none"
                  stroke="rgba(255,43,28,0.28)"
                  strokeWidth="1"
                  strokeDasharray="10 14"
                />
                <circle
                  cx="210"
                  cy="210"
                  r="182"
                  fill="none"
                  stroke="rgba(255,122,36,0.18)"
                  strokeWidth="1"
                />
              </svg>

              {/* Portrait Frame */}
              <div className="portrait-frame aspect-[4/5] w-full bg-[#111111]">
                {!portraitFailed ? (
                  <img
                    src={activePortraitSrc}
                    alt="Ne'matov Islomjon — Full-Stack Developer portrait"
                    referrerPolicy="no-referrer"
                    onError={() => setPortraitFailed(true)}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-between bg-gradient-to-b from-[#171717] via-[#101010] to-[#0a0a0a] p-6 text-center sm:p-8">
                    <div className="flex w-full items-center justify-between text-xs text-[#A3A3A3]">
                      <span className="font-mono">public/images/islomjon.jpg</span>
                      <span className="font-mono text-[#FF5A1F]">4:5</span>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                      <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-[#FF2B1C]/40 bg-[#151515] shadow-[0_0_40px_rgba(255,43,28,0.25)]">
                        <span className="font-display text-3xl font-extrabold tracking-tight text-white">
                          NI
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        <p className="font-display text-base font-semibold text-white">
                          {t.hero.portraitMissingTitle}
                        </p>
                        <p className="max-w-xs text-xs leading-relaxed text-[#A3A3A3]">
                          {t.hero.portraitMissingHint}
                        </p>
                      </div>
                    </div>

                    <label className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-lg border border-white/15 bg-[#1A1A1A] px-4 py-2 text-xs font-medium text-white transition-colors hover:border-[#FF5A1F]">
                      <ImagePlus className="h-4 w-4 text-[#FF5A1F]" />
                      <span>{t.hero.portraitPreviewBtn}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLocalPreview}
                        className="sr-only"
                      />
                    </label>
                  </div>
                )}

                {/* Subtle Bottom Scrim for Caption Legibility */}
                {!portraitFailed && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-5">
                    <p className="font-display text-sm font-bold tracking-wide text-white">
                      {siteConfig.owner.fullName}
                    </p>
                    <p className="font-mono text-xs text-[#FF7A24]">{t.hero.portraitCaption}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex justify-center lg:mt-16">
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="group flex flex-col items-center gap-2 text-xs font-medium tracking-widest text-[#A3A3A3] uppercase transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2B1C] rounded-md px-3 py-1"
          >
            <span>{t.hero.scrollDown}</span>
            <motion.span
              animate={prefersReduced ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#121212] group-hover:border-[#FF2B1C]"
            >
              <ArrowDown className="h-4 w-4 text-[#FF5A1F]" />
            </motion.span>
          </button>
        </div>
      </div>
    </section>
  );
}
