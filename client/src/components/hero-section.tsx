import { ChevronDown, Terminal, Code2, Database, Cloud, Github, Linkedin } from 'lucide-react';
import { useParallax } from '@/hooks/use-parallax';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const parallaxOffset = useParallax(0.3);

  const titles = [
    "Full Stack Developer",
    "Tech Enthusiast",
    "Problem Solver",
    "Innovator"
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentTitle = titles[currentIndex];
      
      if (isDeleting) {
        setCurrentText(currentTitle.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        typingSpeed = 50;
      } else {
        setCurrentText(currentTitle.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && currentCharIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 2000;
      } else if (isDeleting && currentCharIndex === 0) {
          isDeleting = false;
        currentIndex = (currentIndex + 1) % titles.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    };

    const timer = setTimeout(type, 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const particles = Array.from({ length: 50 }, (_, i) => i);
  const codeElements = [
    'function create() {',
    'const app = new App();',
    'app.initialize();',
    'return app;',
    '}',
    'class Developer {',
    'constructor() {',
    'this.skills = [];',
    '}',
    '}'
  ];

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Futuristic Background */}
      <div className="hero-3d-bg">
        {/* Geometric Shapes */}
        <div className="geometric-shapes">
          <div className="shape w-32 h-32 rotate-45" style={{ top: '10%', left: '10%', animationDelay: '0s' }} />
          <div className="shape w-24 h-24 rounded-full" style={{ top: '20%', right: '15%', animationDelay: '2s' }} />
          <div className="shape w-40 h-40 rotate-12" style={{ bottom: '15%', left: '20%', animationDelay: '4s' }} />
          <div className="shape w-20 h-20 rounded-full" style={{ bottom: '25%', right: '10%', animationDelay: '1s' }} />
        </div>

        {/* Particle System */}
        <div className="particle-system">
          {particles.map((particle) => (
            <div 
              key={particle}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        {/* Floating Code Elements */}
        {codeElements.map((code, index) => (
          <div
            key={index}
            className="floating-code text-xs md:text-sm"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${8 + (index % 3) * 2}s`
            }}
          >
            {code}
          </div>
        ))}

        {/* Code Matrix Rain Effect */}
        <div className="code-matrix">
          <pre className="text-xs leading-relaxed">
            {Array.from({ length: 50 }, (_, i) => (
              <div key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                {`${Math.random().toString(36).substr(2, 8)} `}
                {`function ${Math.random().toString(36).substr(2, 6)}() {}`}
              </div>
            ))}
          </pre>
        </div>
      </div>

      {/* Parallax overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-portfolio-secondary/90 via-portfolio-neutral/80 to-portfolio-secondary/90"
        style={{ transform: `translate3d(0, ${parallaxOffset}px, 0)` }}
      />
      
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Main Title */}
        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 glow-text font-['Orbitron'] transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          VIVEK PILLAI
        </h1>
        
        {/* Animated Subtitle */}
        <div className={`text-2xl md:text-4xl lg:text-5xl font-light mb-8 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-portfolio-accent font-['Fira_Code']">&lt;</span>
          <span className="typing-animation inline-block min-w-[300px] text-left">
            {currentText}
          </span>
          <span className="text-portfolio-accent font-['Fira_Code']">&gt;</span>
        </div>

        {/* Tech Icons */}
        <div className={`flex justify-center space-x-8 mb-12 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Terminal className="w-8 h-8 text-portfolio-primary hover:text-portfolio-accent transition-colors duration-300 hover:scale-110 transform" />
          <Code2 className="w-8 h-8 text-portfolio-primary hover:text-portfolio-accent transition-colors duration-300 hover:scale-110 transform" />
          <Database className="w-8 h-8 text-portfolio-primary hover:text-portfolio-accent transition-colors duration-300 hover:scale-110 transform" />
          <Cloud className="w-8 h-8 text-portfolio-primary hover:text-portfolio-accent transition-colors duration-300 hover:scale-110 transform" />
        </div>

        {/* Social Links */}
        <div className={`flex justify-center gap-4 mb-8 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <a 
            href="https://github.com/vivzz2216"
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-6 h-6" />
          </a>
          <a 
            href="https://www.linkedin.com/in/vivek-pillai-281a68253/"
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>

        {/* CTA Button */}
        <div className={`transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <button
            onClick={scrollToAbout}
            className="neon-border hologram-effect px-8 py-4 rounded-lg text-white font-['Orbitron'] font-semibold text-lg tracking-wider uppercase hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-portfolio-primary/50"
          >
            <span className="flex items-center">
              Explore My Universe
              <ChevronDown className="ml-3 animate-bounce" size={20} />
            </span>
          </button>
        </div>

        {/* Status Indicator */}
        <div className={`mt-8 flex justify-center items-center space-x-3 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="w-3 h-3 bg-portfolio-accent rounded-full animate-pulse"></div>
          <span className="text-sm font-['Fira_Code'] text-portfolio-accent">
            STATUS: READY TO INNOVATE
          </span>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-portfolio-accent animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="text-xs font-['Fira_Code'] tracking-wider">SCROLL</div>
          <ChevronDown size={24} className="animate-pulse" />
        </div>
      </div>

      {/* Add admin link */}
      <a
        href="/admin"
        className="absolute top-4 right-4 text-sm text-gray-400 hover:text-white transition-colors"
      >
        Admin
      </a>
    </section>
  );
}
