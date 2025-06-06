import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

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

  const colorClass = color === 'primary' ? 'bg-portfolio-primary' : 'bg-portfolio-accent';

  return (
    <div className="skill-item">
      <div className="flex justify-between mb-2">
        <span className="text-gray-700 font-medium">{skill}</span>
        <span className="text-gray-500">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`skill-bar ${colorClass} h-3 rounded-full transition-all duration-2000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: techRef, isVisible: techVisible } = useScrollAnimation({ threshold: 0.2 });

  const programmingSkills = [
    { skill: 'JavaScript / TypeScript', percentage: 95 },
    { skill: 'React / Next.js', percentage: 90 },
    { skill: 'Node.js / Express', percentage: 88 },
    { skill: 'Python / Django', percentage: 85 }
  ];

  const cloudSkills = [
    { skill: 'AWS / Azure', percentage: 92 },
    { skill: 'Docker / Kubernetes', percentage: 87 },
    { skill: 'CI/CD Pipelines', percentage: 90 },
    { skill: 'MongoDB / PostgreSQL', percentage: 83 }
  ];

  const technologies = [
    { name: 'JavaScript', icon: '🟨', color: 'text-yellow-500' },
    { name: 'React', icon: '⚛️', color: 'text-blue-500' },
    { name: 'Node.js', icon: '🟢', color: 'text-green-500' },
    { name: 'Python', icon: '🐍', color: 'text-blue-600' },
    { name: 'AWS', icon: '☁️', color: 'text-orange-500' },
    { name: 'Docker', icon: '🐳', color: 'text-blue-600' }
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-portfolio-secondary mb-4 transition-all duration-700 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Technical Skills
          </h2>
          <div className={`section-divider transition-all duration-700 delay-200 ${
            sectionVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`} />
        </div>
        
        <div ref={skillsRef} className="grid md:grid-cols-2 gap-12">
          {/* Programming Skills */}
          <div className={`transition-all duration-700 ${
            skillsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <h3 className="text-xl font-semibold text-portfolio-secondary mb-8">Programming & Frameworks</h3>
            <div className="space-y-6">
              {programmingSkills.map((item, index) => (
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
          
          {/* Cloud & DevOps Skills */}
          <div className={`transition-all duration-700 delay-200 ${
            skillsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <h3 className="text-xl font-semibold text-portfolio-secondary mb-8">Cloud & DevOps</h3>
            <div className="space-y-6">
              {cloudSkills.map((item, index) => (
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
        
        {/* Technology Icons */}
        <div ref={techRef} className={`mt-16 transition-all duration-700 delay-400 ${
          techVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="text-xl font-semibold text-portfolio-secondary text-center mb-8">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {technologies.map((tech, index) => (
              <div 
                key={tech.name}
                className={`text-center group cursor-pointer tech-icon transition-all duration-300 delay-${index * 100}`}
              >
                <div className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <p className="text-sm text-gray-600 group-hover:text-portfolio-primary transition-colors duration-300">
                  {tech.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
