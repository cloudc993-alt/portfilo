import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { projectsData } from '../../data/projects';
import { siteConfig } from '../../data/siteConfig';
import { useLanguage } from '../../hooks/useLanguage';

export function Footer() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const configuredSocials = siteConfig.socialLinks.filter((s) => Boolean(s.url));

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const quickLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'skills', label: t.nav.skills },
    { id: 'projects', label: t.nav.projects },
    { id: 'services', label: t.nav.services },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#080808] py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Summary */}
          <div className="md:col-span-5">
            <h2 className="font-display text-xl font-extrabold tracking-wide text-white">
              {siteConfig.owner.fullName}
            </h2>
            <p className="mt-1 font-mono text-xs font-semibold tracking-widest text-[#FF5A1F]">
              {t.footer.role}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#A3A3A3]">
              {t.footer.slogan}
            </p>

            {configuredSocials.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {configuredSocials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-[#A3A3A3] underline decoration-white/20 underline-offset-4 hover:text-[#FF7A24]"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3">
            <h3 className="font-display text-xs font-bold tracking-[0.18em] text-white uppercase">
              {t.footer.quickNav}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => handleNav(link.id)}
                    className="text-sm text-[#A3A3A3] transition-colors hover:text-[#FF7A24]"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Links */}
          <div className="md:col-span-4">
            <h3 className="font-display text-xs font-bold tracking-[0.18em] text-white uppercase">
              {t.footer.featuredProjects}
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {projectsData.map((project) => (
                <li key={project.id}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#A3A3A3] transition-colors hover:text-white"
                  >
                    <span className="truncate">{project.name}</span>
                    <ArrowUpRight className="h-3 w-3 shrink-0 text-[#FF5A1F]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-[#A3A3A3]">{t.footer.copyright}</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-white/15 bg-[#121212] px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-[#FF2B1C] hover:text-[#FF7A24]"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
