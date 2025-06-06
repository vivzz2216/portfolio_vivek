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
            <h3 className="text-2xl font-semibold text-portfolio-accent mb-4 font-['Orbitron']">
              Vivek Pillai — Creative Web Developer | AI Enthusiast | Full-Stack Learner
            </h3>
            <h4 className="text-xl font-medium text-white mb-6 font-['Orbitron']">
              Digital Architect & Innovation Engineer
            </h4>
            
            <p className="text-gray-300 text-lg mb-6 leading-relaxed font-['Inter']">
              I'm Vivek Pillai, a 3rd-year IT Engineering student at SFIT with a deep interest in full-stack development and artificial intelligence. 
              I build modern, responsive web applications and explore intelligent systems using Java, Data Science, and Machine Learning.
            </p>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed font-['Inter']">
              From front-end designs to AI-backed logic, I enjoy turning innovative ideas into digital solutions that make a difference.
            </p>
            
            {/* Experience & Stats */}
            <div className="mb-8">
              <h5 className="text-lg font-semibold text-portfolio-accent mb-4 font-['Orbitron'] flex items-center">
                💼 Experience & Stats
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="hologram-effect p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-portfolio-accent font-['Orbitron']">5+</div>
                  <div className="text-gray-400 text-sm font-['Fira_Code']">Projects completed</div>
                </div>
                <div className="hologram-effect p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-portfolio-accent font-['Orbitron']">4</div>
                  <div className="text-gray-400 text-sm font-['Fira_Code']">Years of development journey</div>
                </div>
                <div className="hologram-effect p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-portfolio-accent font-['Orbitron']">Multi</div>
                  <div className="text-gray-400 text-sm font-['Fira_Code']">Tech expertise</div>
                </div>
              </div>
            </div>

            {/* Passion & Purpose */}
            <div className="mb-8">
              <h5 className="text-lg font-semibold text-portfolio-accent mb-4 font-['Orbitron'] flex items-center">
                ❤️ Passion & Purpose
              </h5>
              <p className="text-gray-300 leading-relaxed font-['Inter']">
                To blend creativity with code, mastering both development and AI tools to solve real-world challenges — always learning, always building.
              </p>
            </div>

            {/* Download Resume Button */}
            <div className="mt-8">
              <button 
                onClick={() => {
                  // Create a sample resume download
                  const link = document.createElement('a');
                  link.href = '#'; // In real implementation, this would be the actual resume file
                  link.download = 'Vivek_Pillai_Resume.pdf';
                  link.click();
                }}
                className="neon-border hologram-effect px-6 py-3 rounded-lg text-white font-['Orbitron'] font-semibold tracking-wider uppercase hover:scale-105 transition-all duration-300 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download Resume
              </button>
            </div>

            {/* Skills Tags */}
            <div className="mt-8">
              <div className="flex flex-wrap gap-3">
                {['Java', 'React.js', 'Node.js', 'AI/ML', 'Data Science', 'SQL'].map((skill) => (
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
