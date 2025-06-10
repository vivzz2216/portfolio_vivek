import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import ProjectsSection from '@/components/projects-section';
import ContactSection from '@/components/contact-section';
import Navbar from '@/components/navbar';

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-portfolio-neutral">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
} 