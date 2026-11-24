import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectCategory, ProjectItem, projectsData } from '../../data/projects';
import { useLanguage } from '../../hooks/useLanguage';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Magnetic } from '../../utils/MagneticButton';

interface ProjectsSectionProps {
  showAllRouteButton?: boolean;
}

export function ProjectsSection({ showAllRouteButton = true }: ProjectsSectionProps) {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories: { key: ProjectCategory; label: string }[] = [
    { key: 'all', label: t.projects.filters.all },
    { key: 'education', label: t.projects.filters.education },
    { key: 'ecommerce', label: t.projects.filters.ecommerce },
    { key: 'games', label: t.projects.filters.games },
    { key: 'webapp', label: t.projects.filters.webapp },
  ];

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projectsData;
    return projectsData.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className="relative bg-[#101010] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="font-mono text-xs font-medium tracking-[0.2em] text-[#FF5A1F]">
              {t.projects.kicker}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white [text-wrap:balance] sm:text-4xl lg:text-5xl">
              {t.projects.title}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-[#A3A3A3]">{t.projects.subtitle}</p>
          </div>

          {/* Interactive Category Filter Bar */}
          <div
            role="tablist"
            aria-label="Project categories"
            className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-[#0B0B0B] p-1.5"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#FF2B1C] text-white shadow-[0_6px_18px_-4px_rgba(255,43,28,0.6)]'
                      : 'text-[#A3A3A3] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Responsive Projects Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        {/* View All Projects CTA */}
        {showAllRouteButton && (
          <div className="mt-12 flex justify-center">
            <Magnetic>
              <Link
                to="/projects"
                className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-xl border border-white/15 bg-[#151515] px-7 py-3 text-sm font-semibold tracking-wide text-white transition-all hover:border-[#FF2B1C] hover:bg-[#1B1B1B] whitespace-nowrap shrink-0"
              >
                <span>{t.projects.viewAll}</span>
                <ArrowRight className="h-4 w-4 text-[#FF5A1F] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
