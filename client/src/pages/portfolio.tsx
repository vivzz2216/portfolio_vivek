import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import SkillsSection from '@/components/skills-section';
import ProjectsSection from '@/components/projects-section';
import ContactSection from '@/components/contact-section';
import VisitorCounter from '@/components/visitor-counter';
import AdvancedBackground from '@/components/advanced-background';

export default function Portfolio() {
  return (
    <div className="min-h-screen relative">
      <AdvancedBackground />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <VisitorCounter />
      
      {/* Futuristic Footer */}
      <footer className="bg-portfolio-secondary border-t border-portfolio-primary/30 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="particle-system">
            {Array.from({ length: 10 }, (_, i) => (
              <div 
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 15}s`,
                  animationDuration: `${25 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="hologram-effect inline-block px-8 py-4 rounded-lg mb-6">
            <p className="text-portfolio-accent font-['Fira_Code'] text-sm mb-2">
              &gt; System.terminal.output("Thank you for visiting");
            </p>
            <p className="text-gray-300 font-['Inter']">
              &copy; 2024 VIVEK PILLAI. All rights reserved. Crafted with cutting-edge technology.
            </p>
          </div>
          <div className="flex items-center justify-center space-x-3 mt-4">
            <div className="w-2 h-2 bg-portfolio-accent rounded-full animate-pulse"></div>
            <span className="text-xs font-['Fira_Code'] text-portfolio-accent tracking-wider">
              PORTFOLIO v2.0.1 - READY FOR DEPLOYMENT
            </span>
            <div className="w-2 h-2 bg-portfolio-accent rounded-full animate-pulse"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
