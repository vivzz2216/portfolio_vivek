import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useParallax } from '@/hooks/use-parallax';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const parallaxOffset = useParallax(0.5);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const offsetTop = aboutSection.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <div 
        className="parallax-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
          transform: `translate3d(0, ${parallaxOffset}px, 0)`
        }}
      />
      <div className="absolute inset-0 bg-portfolio-secondary/70" />
      
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-4 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Alex Chen
        </h1>
        <p className={`text-xl md:text-2xl lg:text-3xl font-light mb-8 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Senior IT Engineer & Full-Stack Developer
        </p>
        <div className={`transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <button
            onClick={scrollToAbout}
            className="inline-flex items-center bg-portfolio-primary hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            Discover My Work
            <ChevronDown className="ml-2" size={20} />
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown size={32} />
      </div>
    </section>
  );
}
