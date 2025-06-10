import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Code2, Rocket, Brain, Zap, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.2 });

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume/vivekpillai_resume.pdf';
    link.download = 'vivekpillai_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const skills = [
    {
      icon: Code2,
      title: "Full Stack Development",
      description: "Proficient in building scalable web applications using modern frameworks and best practices."
    },
    {
      icon: Rocket,
      title: "Performance Optimization",
      description: "Expert in optimizing application performance, ensuring fast load times and smooth user experiences."
    },
    {
      icon: Brain,
      title: "Problem Solving",
      description: "Strong analytical skills with a track record of solving complex technical challenges."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Passionate about exploring new technologies and implementing creative solutions."
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-portfolio-neutral relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-portfolio-primary/5 to-portfolio-accent/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-portfolio-primary/10 via-transparent to-transparent opacity-50" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-5xl md:text-6xl font-bold text-white mb-4 transition-all duration-700 font-['Exo_2'] ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="glow-text">ABOUT ME</span>
          </h2>
          <div className={`section-divider transition-all duration-700 delay-200 ${
            sectionVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`} />
        </div>
        
        {/* Main Content */}
        <div ref={contentRef} className={`grid lg:grid-cols-2 gap-12 items-start transition-all duration-700 ${
          contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          {/* Left Column - Profile and Introduction */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="hologram-effect p-8 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-portfolio-primary/20 to-portfolio-accent/20 opacity-50" />
              <div className="relative z-10">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-portfolio-accent/50 shadow-lg shadow-portfolio-accent/20">
                <img 
                  src="/images/vivek.jpg"
                      alt="Vivek Pillai" 
                      className="w-full h-full object-cover"
                />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-['Exo_2']">Vivek Pillai</h3>
                    <p className="text-portfolio-accent font-['Inter']">Full Stack Developer</p>
                </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed font-['Inter']">
                  I'm a passionate Full Stack Developer with a keen eye for creating elegant solutions to complex problems. 
                  With expertise in modern web technologies and a strong foundation in software engineering principles, 
                  I craft applications that are not just functional, but also intuitive and engaging.
            </p>
                <p className="text-gray-300 text-lg leading-relaxed mt-4 font-['Inter']">
                  My journey in tech is driven by a constant desire to learn and innovate. I believe in writing clean, 
                  maintainable code and creating user experiences that make a difference.
                </p>
              </div>
            </div>

            {/* Resume Download Button */}
            <div className="flex justify-center">
              <Button
                onClick={downloadResume}
                className="neon-border px-8 py-4 bg-transparent text-white font-['Exo_2'] font-semibold tracking-wider uppercase hover:scale-105 transition-all duration-300"
              >
                <Download className="mr-2 w-5 h-5" />
                Download Resume
              </Button>
            </div>
            </div>

          {/* Right Column - Skills */}
          <div className="space-y-8">
            {/* Skills Grid */}
            <div className="grid grid-cols-1 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="hologram-effect p-6 rounded-xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-portfolio-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <skill.icon className="text-portfolio-accent" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-portfolio-accent mb-2 font-['Exo_2']">
                        {skill.title}
                      </h4>
                      <p className="text-gray-300 text-sm font-['Inter']">
                        {skill.description}
                      </p>
                    </div>
              </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}