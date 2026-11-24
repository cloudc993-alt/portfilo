import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Download, FileText, X } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { siteConfig } from '../../data/siteConfig';
import { Magnetic } from '../../utils/MagneticButton';

export function AboutSection() {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [thumbFailed, setThumbFailed] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  const handleCvClick = () => {
    if (siteConfig.cvUrl) {
      const a = document.createElement('a');
      a.href = siteConfig.cvUrl;
      a.download = 'Nematov_Islomjon_CV.pdf';
      a.click();
      return;
    }
    setCvModalOpen(true);
  };

  return (
    <section id="about" className="relative bg-[#101010] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="font-mono text-xs font-medium tracking-[0.2em] text-[#FF5A1F]">
              {t.about.kicker}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t.about.title}
            </h2>
          </div>
          <p className="font-mono text-xs tracking-widest text-[#A3A3A3] uppercase">
            {t.about.subtitle}
          </p>
        </motion.div>

        {/* Introduction & Interactive Focus Timeline */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Intro Card */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="metallic-card flex flex-col justify-between rounded-2xl p-6 sm:p-8 lg:col-span-7"
          >
            <div>
              <div className="mb-6 flex items-center gap-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[#FF2B1C]/40 bg-[#181818]">
                  {!thumbFailed ? (
                    <img
                      src={siteConfig.owner.portraitPath}
                      alt={siteConfig.owner.fullName}
                      referrerPolicy="no-referrer"
                      onError={() => setThumbFailed(true)}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display text-lg font-bold text-white">
                      NI
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                    {siteConfig.owner.fullName}
                  </h3>
                  <p className="font-mono text-xs text-[#FF7A24]">{siteConfig.owner.title}</p>
                </div>
              </div>

              <p className="text-base leading-relaxed text-[#D4D4D4] sm:text-lg">
                {t.about.intro}
              </p>

              {/* Roles list */}
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#A3A3A3]">
                <span className="font-semibold text-white">{t.about.rolesLabel}:</span>
                {siteConfig.owner.additionalTitles.map((role, index) => (
                  <span key={role} className="inline-flex items-center gap-3">
                    <span>{role}</span>
                    {index < siteConfig.owner.additionalTitles.length - 1 && (
                      <span className="text-[#FF2B1C]" aria-hidden="true">
                        /
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <p className="font-display text-sm font-medium text-white/90 italic">
                &ldquo;{t.about.slogan}&rdquo;
              </p>
              <Magnetic>
                <button
                  type="button"
                  onClick={handleCvClick}
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-[#FF2B1C]/50 bg-[#FF2B1C]/10 px-4 py-2 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-[#FF2B1C] whitespace-nowrap shrink-0"
                >
                  <Download className="h-4 w-4" />
                  <span>{t.about.downloadCv}</span>
                </button>
              </Magnetic>
            </div>
          </motion.div>

          {/* Interactive Focus Timeline */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="metallic-card flex flex-col justify-between rounded-2xl p-6 sm:p-8 lg:col-span-5"
          >
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                {t.about.timelineTitle}
              </h3>

              <div className="mt-6 space-y-3" role="tablist" aria-label={t.about.timelineTitle}>
                {t.about.timeline.map((item, idx) => {
                  const active = activePhaseIndex === idx;
                  return (
                    <button
                      key={item.phase}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActivePhaseIndex(idx)}
                      className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                        active
                          ? 'border-[#FF2B1C]/70 bg-[#1B1212]'
                          : 'border-white/10 bg-[#121212] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-xs font-semibold text-[#FF7A24]">
                          {item.phase}
                        </span>
                        <span className="font-mono text-xs text-[#A3A3A3] tabular-nums">
                          0{idx + 1}
                        </span>
                      </div>
                      <p className="mt-1 font-display text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      {active && (
                        <p className="mt-2 text-xs leading-relaxed text-[#A3A3A3]">
                          {item.detail}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 font-mono text-xs text-[#A3A3A3]">
              {siteConfig.owner.altSlogan}
            </div>
          </motion.div>
        </div>

        {/* Three Information Pillar Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.about.pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.number}
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="metallic-card rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[#FF2B1C] tabular-nums">
                  {pillar.number}
                </span>
                <span className="font-mono text-[11px] tracking-wider text-[#A3A3A3]">
                  {pillar.subtitle}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-white">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#A3A3A3]">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CV Configuration Modal (Only shown when real CV file is not yet configured) */}
      <AnimatePresence>
        {cvModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            onClick={() => setCvModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="metallic-card w-full max-w-md rounded-2xl p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cv-config-title"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF2B1C]/15 text-[#FF5A1F]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h3 id="cv-config-title" className="font-display text-base font-bold text-white">
                    {t.about.cvMissingTitle}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCvModalOpen(false)}
                  aria-label="Close"
                  className="rounded-lg p-1.5 text-[#A3A3A3] hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#A3A3A3]">
                {t.about.cvMissingText}
              </p>
              <div className="mt-4 rounded-xl border border-white/10 bg-[#0B0B0B] p-3 font-mono text-xs text-[#FF7A24]">
                {siteConfig.expectedCvPath}
              </div>
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCvModalOpen(false)}
                  className="min-h-[40px] rounded-xl bg-[#FF2B1C] px-4 py-2 text-xs font-semibold text-white hover:brightness-110"
                >
                  OK
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
