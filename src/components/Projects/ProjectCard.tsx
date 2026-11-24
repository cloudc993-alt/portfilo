import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Eye, Layers } from 'lucide-react';
import { ProjectItem } from '../../data/projects';
import { useLanguage } from '../../hooks/useLanguage';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useTilt } from '../../hooks/useTilt';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onSelect: (project: ProjectItem) => void;
}

export function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const { lang, t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const { tiltStyle, onMouseMove, onMouseLeave } = useTilt(6);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.article
      layout={!prefersReduced}
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={tiltStyle}
      className="metallic-card group flex flex-col overflow-hidden rounded-2xl will-change-transform"
    >
      {/* Project Concept Artwork Preview */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111111]">
        {!imgFailed ? (
          <img
            src={project.artwork}
            alt={`${project.name} — ${t.projects.artworkDisclaimer}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1b1010] via-[#121212] to-[#0a0a0a] p-6 text-center">
            <Layers className="h-7 w-7 text-[#FF5A1F]" aria-hidden="true" />
            <span className="font-display text-sm font-semibold text-white">{project.name}</span>
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111] via-black/20 to-transparent"
          aria-hidden="true"
        />
        <span className="pointer-events-none absolute bottom-2.5 left-4 font-mono text-[10px] tracking-wider text-white/65">
          {t.projects.artworkDisclaimer}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          {/* Unboxed Metadata */}
          <div className="flex items-center gap-2 font-mono text-xs text-[#A3A3A3]">
            <span className="font-semibold text-[#FF5A1F] tabular-nums">{project.index}</span>
            <span aria-hidden="true">·</span>
            <span>{project.categoryLabel[lang]}</span>
          </div>

          <h3 className="mt-2 font-display text-xl font-bold text-white transition-colors group-hover:text-[#FF7A24]">
            {project.name}
          </h3>

          <p className="mt-2.5 text-sm leading-relaxed text-[#A3A3A3]">
            {project.shortDescription[lang]}
          </p>

          {/* Clean unboxed technology line */}
          <p className="mt-4 font-mono text-xs text-white/70">
            {project.technologies.join(' · ')}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#FF2B1C] to-[#FF5A1F] px-4 py-2 text-xs font-semibold text-white transition-all hover:brightness-110 whitespace-nowrap shrink-0"
          >
            <span>{t.projects.liveDemo}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={() => onSelect(project)}
            className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-[#181818] px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-[#FF5A1F]/70 hover:bg-[#1f1f1f] whitespace-nowrap shrink-0"
          >
            <Eye className="h-3.5 w-3.5 text-[#FF7A24]" />
            <span>{t.projects.viewProject}</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
