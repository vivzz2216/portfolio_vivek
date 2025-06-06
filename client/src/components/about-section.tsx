import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Code2, Zap, Globe, Award } from 'lucide-react';

export default function AboutSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-portfolio-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-white mb-4 transition-all duration-700 font-['Orbitron'] ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="glow-text">ABOUT THE DEVELOPER</span>
          </h2>
          <div className={`section-divider transition-all duration-700 delay-200 ${
            sectionVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`} />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Photo with Futuristic Frame */}
          <div ref={imageRef} className={`text-center lg:text-left transition-all duration-700 ${
            imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="relative inline-block">
              <div className="hologram-effect rounded-2xl p-6">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500"
                  alt="Vivek Pillai - Professional Developer" 
                  className="w-80 h-80 rounded-xl object-cover mx-auto shadow-2xl shadow-portfolio-primary/30"
                />
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-portfolio-accent rounded-full flex items-center justify-center animate-pulse">
                  <Code2 className="w-6 h-6 text-portfolio-secondary" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-portfolio-primary rounded-full flex items-center justify-center animate-pulse">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          {/* About Content */}
          <div ref={contentRef} className={`transition-all duration-700 delay-200 ${
            contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <h3 className="text-3xl font-semibold text-portfolio-accent mb-6 font-['Orbitron']">
              Digital Architect & Innovation Engineer
            </h3>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed font-['Inter']">
              Passionate web developer with expertise in cutting-edge technologies and modern development practices. 
              I specialize in creating immersive digital experiences that push the boundaries of what's possible on the web.
            </p>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed font-['Inter']">
              From responsive user interfaces to complex backend architectures, I thrive on solving challenging problems 
              and building solutions that make a real impact. My mission is to transform ideas into reality through code.
            </p>
            
            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="hologram-effect p-6 rounded-xl text-center">
                <Globe className="w-8 h-8 text-portfolio-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-portfolio-accent font-['Orbitron']">25+</div>
                <div className="text-gray-400 text-sm font-['Fira_Code']">PROJECTS</div>
              </div>
              <div className="hologram-effect p-6 rounded-xl text-center">
                <Zap className="w-8 h-8 text-portfolio-accent mx-auto mb-3" />
                <div className="text-2xl font-bold text-portfolio-accent font-['Orbitron']">5+</div>
                <div className="text-gray-400 text-sm font-['Fira_Code']">YEARS EXP</div>
              </div>
              <div className="hologram-effect p-6 rounded-xl text-center">
                <Code2 className="w-8 h-8 text-portfolio-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-portfolio-accent font-['Orbitron']">10+</div>
                <div className="text-gray-400 text-sm font-['Fira_Code']">TECH STACK</div>
              </div>
              <div className="hologram-effect p-6 rounded-xl text-center">
                <Award className="w-8 h-8 text-portfolio-accent mx-auto mb-3" />
                <div className="text-2xl font-bold text-portfolio-accent font-['Orbitron']">100%</div>
                <div className="text-gray-400 text-sm font-['Fira_Code']">PASSION</div>
              </div>
            </div>

            {/* Skills Tags */}
            <div className="mt-8">
              <div className="flex flex-wrap gap-3">
                {['React.js', 'Node.js', 'TypeScript', 'UI/UX', 'Cloud', 'DevOps'].map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 bg-portfolio-primary/20 border border-portfolio-primary/50 rounded-full text-portfolio-accent text-sm font-['Fira_Code'] hover:bg-portfolio-primary/30 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
