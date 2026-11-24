import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { ProjectItem } from '../../data/projects';
import { useLanguage } from '../../hooks/useLanguage';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { lang, t } = useLanguage();

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="metallic-card relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl"
          >
            {/* Header Artwork */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#111111]">
              <img
                src={project.artwork}
                alt={project.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121212] via-black/30 to-transparent" />
              <button
                type="button"
                onClick={onClose}
                aria-label={t.projects.close}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white transition-colors hover:border-[#FF2B1C] hover:bg-[#FF2B1C]"
              >
                <X className="h-4 w-4" />
              </button>
              <span className="absolute bottom-3 left-6 font-mono text-[11px] text-white/70">
                {t.projects.artworkDisclaimer}
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 font-mono text-xs text-[#A3A3A3]">
                <span className="font-semibold text-[#FF5A1F] tabular-nums">{project.index}</span>
                <span aria-hidden="true">·</span>
                <span>{project.categoryLabel[lang]}</span>
              </div>

              <h3 id="project-modal-title" className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                {project.name}
              </h3>

              <p className="mt-4 text-base leading-relaxed text-[#D4D4D4]">
                {project.fullDescription[lang]}
              </p>

              {/* Highlights */}
              <div className="mt-6">
                <h4 className="font-mono text-xs font-semibold tracking-wider text-[#FF7A24] uppercase">
                  {t.projects.modalHighlightsTitle}
                </h4>
                <ul className="mt-3 space-y-2">
                  {project.highlights[lang].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#D4D4D4]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF2B1C]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="mt-6">
                <h4 className="font-mono text-xs font-semibold tracking-wider text-[#A3A3A3] uppercase">
                  {t.projects.modalTechTitle}
                </h4>
                <p className="mt-2 font-mono text-sm text-white">
                  {project.technologies.join(' · ')}
                </p>
              </div>

              {/* Modal Actions */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <span className="truncate font-mono text-xs text-[#A3A3A3] max-w-xs">
                  {project.url}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="min-h-[42px] rounded-xl border border-white/15 px-4 py-2 text-xs font-semibold text-[#A3A3A3] hover:text-white"
                  >
                    {t.projects.close}
                  </button>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF2B1C] to-[#FF5A1F] px-5 py-2 text-xs font-semibold text-white hover:brightness-110 whitespace-nowrap shrink-0"
                  >
                    <span>{t.projects.openExternal}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
