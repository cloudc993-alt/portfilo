import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectsSection } from '../components/Projects/ProjectsSection';
import { useLanguage } from '../hooks/useLanguage';

export default function ProjectsPage() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#101010] pt-24">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-white/10 bg-[#151515] px-4 py-2 text-xs font-semibold text-[#D4D4D4] transition-colors hover:border-[#FF2B1C] hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-[#FF5A1F]" />
          <span>{t.projects.backHome}</span>
        </Link>
      </div>
      <ProjectsSection showAllRouteButton={false} />
    </main>
  );
}
