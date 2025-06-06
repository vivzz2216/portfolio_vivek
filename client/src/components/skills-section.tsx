import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Brain, Code, Database, Cloud, Zap, Globe } from 'lucide-react';
import { SiReact, SiNodedotjs, SiTypescript, SiPython, SiDocker, SiAmazon } from 'react-icons/si';

interface SkillBarProps {
  skill: string;
  percentage: number;
  color: 'primary' | 'accent';
  isVisible: boolean;
  delay?: number;
}

function SkillBar({ skill, percentage, color, isVisible, delay = 0 }: SkillBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setWidth(percentage);
      }, 500 + delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, percentage, delay]);

  const colorClass = color === 'primary' ? 'bg-gradient-to-r from-portfolio-primary to-portfolio-accent' : 'bg-gradient-to-r from-portfolio-accent to-portfolio-primary';

  return (
    <div className="skill-item hologram-effect p-4 rounded-lg">
      <div className="flex justify-between mb-3">
        <span className="text-white font-medium font-['Fira_Code']">{skill}</span>
        <span className="text-portfolio-accent font-['Orbitron'] font-semibold">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <div 
          className={`skill-bar ${colorClass} h-2 rounded-full transition-all duration-2000 ease-out shadow-lg`}
          style={{ 
            width: `${width}%`,
            boxShadow: color === 'primary' ? '0 0 10px rgba(51, 102, 255, 0.6)' : '0 0 10px rgba(0, 255, 170, 0.6)'
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: techRef, isVisible: techVisible } = useScrollAnimation({ threshold: 0.2 });

  const frontendSkills = [
    { skill: 'React / Next.js', percentage: 95 },
    { skill: 'TypeScript / JavaScript', percentage: 92 },
    { skill: 'CSS3 / Tailwind CSS', percentage: 88 },
    { skill: 'UI/UX Design', percentage: 85 }
  ];

  const backendSkills = [
    { skill: 'Node.js / Express', percentage: 90 },
    { skill: 'Python / FastAPI', percentage: 85 },
    { skill: 'Database Design', percentage: 88 },
    { skill: 'API Development', percentage: 92 }
  ];

  const technologies = [
    { name: 'React', icon: SiReact, color: 'text-blue-400' },
    { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-400' },
    { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500' },
    { name: 'Python', icon: SiPython, color: 'text-yellow-400' },
    { name: 'Docker', icon: SiDocker, color: 'text-blue-600' },
    { name: 'AWS', icon: SiAmazon, color: 'text-orange-400' }
  ];

  const expertise = [
    { title: 'Frontend Development', icon: Code, description: 'Modern React applications with stunning UIs' },
    { title: 'Backend Architecture', icon: Database, description: 'Scalable APIs and database solutions' },
    { title: 'Cloud Solutions', icon: Cloud, description: 'AWS deployment and DevOps practices' },
    { title: 'AI Integration', icon: Brain, description: 'Implementing AI-powered features' }
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-portfolio-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-white mb-4 transition-all duration-700 font-['Orbitron'] ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="glow-text">TECHNICAL ARSENAL</span>
          </h2>
          <div className={`section-divider transition-all duration-700 delay-200 ${
            sectionVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`} />
          <p className={`text-gray-300 text-lg mt-6 transition-all duration-700 delay-300 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Mastering the technologies that shape the digital future
          </p>
        </div>
        
        <div ref={skillsRef} className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Frontend Skills */}
          <div className={`transition-all duration-700 ${
            skillsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <h3 className="text-2xl font-semibold text-portfolio-accent mb-8 font-['Orbitron'] flex items-center">
              <Code className="mr-3 w-6 h-6" />
              Frontend Mastery
            </h3>
            <div className="space-y-6">
              {frontendSkills.map((item, index) => (
                <SkillBar
                  key={item.skill}
                  skill={item.skill}
                  percentage={item.percentage}
                  color="primary"
                  isVisible={skillsVisible}
                  delay={index * 200}
                />
              ))}
            </div>
          </div>
          
          {/* Backend Skills */}
          <div className={`transition-all duration-700 delay-200 ${
            skillsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <h3 className="text-2xl font-semibold text-portfolio-accent mb-8 font-['Orbitron'] flex items-center">
              <Database className="mr-3 w-6 h-6" />
              Backend Power
            </h3>
            <div className="space-y-6">
              {backendSkills.map((item, index) => (
                <SkillBar
                  key={item.skill}
                  skill={item.skill}
                  percentage={item.percentage}
                  color="accent"
                  isVisible={skillsVisible}
                  delay={index * 200}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Expertise Areas */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-700 delay-400 ${
          skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {expertise.map((area, index) => (
            <div 
              key={area.title}
              className="hologram-effect p-6 rounded-xl text-center hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <area.icon className="w-12 h-12 text-portfolio-primary mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2 font-['Orbitron']">{area.title}</h4>
              <p className="text-gray-400 text-sm font-['Fira_Code']">{area.description}</p>
            </div>
          ))}
        </div>
        
        {/* Technology Icons */}
        <div ref={techRef} className={`transition-all duration-700 delay-600 ${
          techVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="text-2xl font-semibold text-portfolio-accent text-center mb-8 font-['Orbitron'] flex items-center justify-center">
            <Zap className="mr-3 w-6 h-6" />
            Technology Stack
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
            {technologies.map((tech, index) => (
              <div 
                key={tech.name}
                className="text-center group cursor-pointer tech-icon"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="hologram-effect p-6 rounded-xl hover:scale-110 transition-all duration-300">
                  <tech.icon className={`text-4xl ${tech.color} mx-auto mb-3 group-hover:animate-pulse`} />
                  <p className="text-sm text-gray-300 group-hover:text-portfolio-accent transition-colors duration-300 font-['Fira_Code']">
                    {tech.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
