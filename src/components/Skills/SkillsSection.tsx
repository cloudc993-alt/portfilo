import { motion } from 'motion/react';
import { SkillItem, skillsData } from '../../data/skills';
import { useLanguage } from '../../hooks/useLanguage';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useTilt } from '../../hooks/useTilt';
import { TechIcon } from './TechIcons';

function SkillCard({ skill, index }: { skill: SkillItem; index: number }) {
  const { lang } = useLanguage();
  const prefersReduced = useReducedMotion();
  const { tiltStyle, onMouseMove, onMouseLeave } = useTilt(8);

  return (
    <motion.article
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={tiltStyle}
      className="metallic-card group rounded-2xl p-6 will-change-transform"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-[#1A1A1A] transition-colors duration-200 group-hover:border-[#FF2B1C]/60">
          <TechIcon id={skill.id} className="h-9 w-9" />
        </div>
        <span className="font-mono text-xs tracking-wider text-[#A3A3A3] uppercase">
          {skill.category}
        </span>
      </div>

      <h4 className="mt-5 font-display text-xl font-bold text-white transition-colors group-hover:text-[#FF7A24]">
        {skill.name}
      </h4>
      <p className="mt-2.5 text-sm leading-relaxed text-[#A3A3A3]">
        {skill.description[lang]}
      </p>
    </motion.article>
  );
}

export function SkillsSection() {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();

  const frontendSkills = skillsData.filter((s) => s.category === 'frontend');
  const backendSkills = skillsData.filter((s) => s.category === 'backend');

  return (
    <section id="skills" className="relative bg-[#080808] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-[#FF5A1F]">
            {t.skills.kicker}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white [text-wrap:balance] sm:text-4xl lg:text-5xl">
            {t.skills.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-[#A3A3A3]">{t.skills.subtitle}</p>
        </motion.div>

        {/* FRONTEND CATEGORY */}
        <div>
          <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-3">
            <h3 className="font-display text-sm font-bold tracking-[0.18em] text-white uppercase">
              {t.skills.frontendLabel}
            </h3>
            <span className="font-mono text-xs text-[#FF5A1F] tabular-nums">
              0{frontendSkills.length}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {frontendSkills.map((skill, idx) => (
              <SkillCard key={skill.id} skill={skill} index={idx} />
            ))}
          </div>
        </div>

        {/* BACKEND CATEGORY */}
        <div className="mt-12">
          <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-3">
            <h3 className="font-display text-sm font-bold tracking-[0.18em] text-white uppercase">
              {t.skills.backendLabel}
            </h3>
            <span className="font-mono text-xs text-[#FF5A1F] tabular-nums">
              0{backendSkills.length}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {backendSkills.map((skill, idx) => (
              <SkillCard key={skill.id} skill={skill} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
