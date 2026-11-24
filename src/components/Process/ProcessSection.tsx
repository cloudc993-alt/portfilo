import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processData } from '../../data/process';
import { useLanguage } from '../../hooks/useLanguage';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function ProcessSection() {
  const { lang, t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced || !containerRef.current || !progressLineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 70%',
            scrub: true,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section id="process" className="relative bg-[#101010] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-[#FF5A1F]">
            {t.process.kicker}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white [text-wrap:balance] sm:text-4xl lg:text-5xl">
            {t.process.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-[#A3A3A3]">{t.process.subtitle}</p>
        </motion.div>

        {/* Animated Vertical Timeline */}
        <div ref={containerRef} className="relative mx-auto max-w-4xl">
          {/* Background & Animated Active Spine */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2"
            aria-hidden="true"
          />
          <div
            ref={progressLineRef}
            className="absolute left-5 top-0 bottom-0 w-0.5 origin-top bg-gradient-to-b from-[#FF2B1C] via-[#FF5A1F] to-[#FF7A24] sm:left-1/2 sm:-translate-x-1/2"
            style={prefersReduced ? { transform: 'scaleY(1)' } : undefined}
            aria-hidden="true"
          />

          <div className="space-y-8 sm:space-y-12">
            {processData.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={prefersReduced ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex items-start gap-6 sm:items-center sm:justify-between"
                >
                  {/* Desktop Left Slot */}
                  <div className={`hidden sm:block sm:w-[44%] ${isLeft ? 'text-right' : 'opacity-0 pointer-events-none'}`}>
                    {isLeft && (
                      <div className="metallic-card rounded-2xl p-6 text-left">
                        <span className="font-mono text-xs font-semibold tracking-wider text-[#FF5A1F]">
                          {item.step}
                        </span>
                        <h3 className="mt-1.5 font-display text-lg font-bold text-white">
                          {item.title[lang]}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#A3A3A3]">
                          {item.description[lang]}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Center Timeline Node */}
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#FF2B1C] bg-[#151515] font-mono text-xs font-bold text-white shadow-[0_0_24px_rgba(255,43,28,0.45)] tabular-nums">
                    0{idx + 1}
                  </div>

                  {/* Desktop Right Slot + Mobile Unified Card */}
                  <div className={`flex-1 sm:w-[44%] sm:flex-none ${!isLeft ? '' : 'sm:opacity-0 sm:pointer-events-none'}`}>
                    <div className={`metallic-card rounded-2xl p-6 ${isLeft ? 'sm:hidden' : ''}`}>
                      <span className="font-mono text-xs font-semibold tracking-wider text-[#FF5A1F]">
                        {item.step}
                      </span>
                      <h3 className="mt-1.5 font-display text-lg font-bold text-white">
                        {item.title[lang]}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#A3A3A3]">
                        {item.description[lang]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
