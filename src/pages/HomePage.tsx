import { HeroSection } from '../components/Hero/HeroSection';
import { AboutSection } from '../components/About/AboutSection';
import { SkillsSection } from '../components/Skills/SkillsSection';
import { ProjectsSection } from '../components/Projects/ProjectsSection';
import { ServicesSection } from '../components/Services/ServicesSection';
import { ProcessSection } from '../components/Process/ProcessSection';
import { DeveloperTerminal } from '../components/Terminal/DeveloperTerminal';
import { ContactSection } from '../components/Contact/ContactSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection showAllRouteButton />
      <ServicesSection />
      <ProcessSection />
      <DeveloperTerminal />
      <ContactSection />
    </main>
  );
}
