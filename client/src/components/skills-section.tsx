import { Brain, Code, Database, Cloud, Globe } from 'lucide-react';
import { SiReact, SiNodedotjs, SiTypescript, SiPython, SiMysql, SiPostgresql, SiMongodb, SiTensorflow, SiPandas } from 'react-icons/si';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export default function SkillsSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.2 });

  const frontendSkills = [
    { name: 'React / Next.js', icon: SiReact, color: 'text-blue-400' },
    { name: 'TypeScript / JavaScript', icon: SiTypescript, color: 'text-blue-500' },
    { name: 'CSS3 / Tailwind CSS', icon: Code, color: 'text-purple-400' },
    { name: 'UI/UX Design', icon: Globe, color: 'text-pink-400' }
  ];

  const backendSkills = [
    { name: 'Java', icon: Code, color: 'text-red-400' },
    { name: 'Node.js / Express', icon: SiNodedotjs, color: 'text-green-400' },
    { name: 'Python', icon: SiPython, color: 'text-yellow-400' },
    { name: 'SQL Databases', icon: Database, color: 'text-blue-300' }
  ];

  const aiDataSkills = [
    { name: 'Machine Learning', icon: Brain, color: 'text-purple-500' },
    { name: 'TensorFlow', icon: SiTensorflow, color: 'text-orange-400' },
    { name: 'Data Science', icon: SiPandas, color: 'text-blue-600' },
    { name: 'Pandas / NumPy', icon: SiPython, color: 'text-yellow-500' }
  ];

  const databases = [
    { name: 'MySQL', icon: SiMysql, color: 'text-blue-500' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-600' },
    { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
    { name: 'SQL', icon: Database, color: 'text-purple-400' }
  ];

  const expertise = [
    { title: 'Full-Stack Development', icon: Code, description: 'Complete web applications from frontend to backend' },
    { title: 'AI & Machine Learning', icon: Brain, description: 'Intelligent systems and data-driven solutions' },
    { title: 'Database Design', icon: Database, description: 'Efficient data modeling and SQL optimization' },
    { title: 'Cloud & DevOps', icon: Cloud, description: 'Modern deployment and infrastructure management' }
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-portfolio-neutral relative overflow-hidden">
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
        
        <div ref={contentRef} className={`transition-all duration-1000 ${
          contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Frontend Skills */}
            <div className={`transition-all duration-700 ${
              contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <h3 className="text-2xl font-semibold text-portfolio-accent mb-8 font-['Orbitron'] flex items-center">
                <Code className="mr-3 w-6 h-6" />
                Frontend Technologies
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {frontendSkills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="hologram-effect p-4 rounded-lg text-center hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <skill.icon className={`text-3xl ${skill.color} mx-auto mb-3 group-hover:animate-pulse`} />
                    <p className="text-sm text-gray-300 font-['Fira_Code']">{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Backend Skills */}
            <div className={`transition-all duration-700 delay-200 ${
              contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <h3 className="text-2xl font-semibold text-portfolio-accent mb-8 font-['Orbitron'] flex items-center">
                <Database className="mr-3 w-6 h-6" />
                Backend Technologies
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {backendSkills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="hologram-effect p-4 rounded-lg text-center hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <skill.icon className={`text-3xl ${skill.color} mx-auto mb-3 group-hover:animate-pulse`} />
                    <p className="text-sm text-gray-300 font-['Fira_Code']">{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI & Data Science Skills */}
          <div className={`grid lg:grid-cols-2 gap-12 mb-16 transition-all duration-700 delay-400 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div>
              <h3 className="text-2xl font-semibold text-portfolio-accent mb-8 font-['Orbitron'] flex items-center">
                <Brain className="mr-3 w-6 h-6" />
                AI & Data Science
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {aiDataSkills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="hologram-effect p-4 rounded-lg text-center hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <skill.icon className={`text-3xl ${skill.color} mx-auto mb-3 group-hover:animate-pulse`} />
                    <p className="text-sm text-gray-300 font-['Fira_Code']">{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-portfolio-accent mb-8 font-['Orbitron'] flex items-center">
                <Database className="mr-3 w-6 h-6" />
                Database Technologies
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {databases.map((db, index) => (
                  <div 
                    key={db.name}
                    className="hologram-effect p-4 rounded-lg text-center hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <db.icon className={`text-3xl ${db.color} mx-auto mb-3 group-hover:animate-pulse`} />
                    <p className="text-sm text-gray-300 font-['Fira_Code']">{db.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expertise Areas */}
          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-700 delay-600 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
        </div>
      </div>
    </section>
  );
}
