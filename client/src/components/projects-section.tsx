import { ExternalLink, Github, Rocket, Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveDemo: string;
  github: string;
  isVisible: boolean;
  delay?: number;
  featured?: boolean;
}

function ProjectCard({ title, description, image, technologies, liveDemo, github, isVisible, delay = 0, featured = false }: ProjectCardProps) {
  return (
    <div className={`project-card hologram-effect rounded-xl overflow-hidden transition-all duration-700 hover:scale-105 group ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    } ${featured ? 'border-2 border-portfolio-accent' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-portfolio-accent text-portfolio-secondary px-3 py-1 rounded-full text-xs font-bold font-['Orbitron'] flex items-center">
            <Star className="w-3 h-3 mr-1" />
            FEATURED
          </div>
        </div>
      )}
      <div className="relative overflow-hidden">
        <img 
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-portfolio-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 font-['Orbitron']">{title}</h3>
        <p className="text-gray-300 mb-4 leading-relaxed font-['Inter'] text-sm">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-portfolio-primary/20 border border-portfolio-primary/40 text-portfolio-accent text-xs font-medium rounded-full font-['Fira_Code'] hover:bg-portfolio-primary/30 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          <a 
            href={liveDemo}
            className="text-portfolio-accent hover:text-white font-medium transition-colors duration-200 flex items-center text-sm font-['Orbitron'] group/link"
          >
            <Rocket className="mr-2 w-4 h-4 group-hover/link:animate-pulse" />
            LAUNCH
          </a>
          <a 
            href={github}
            className="text-gray-400 hover:text-portfolio-primary font-medium transition-colors duration-200 flex items-center text-sm font-['Orbitron'] group/link"
          >
            <Github className="mr-2 w-4 h-4 group-hover/link:animate-pulse" />
            CODE
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation({ threshold: 0.1 });

  const projects = [
    {
      title: 'NeuroCommerce Platform',
      description: 'Next-generation e-commerce platform with AI-powered recommendations, blockchain payments, and real-time analytics. Features advanced ML algorithms for personalized shopping experiences.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      technologies: ['React', 'Node.js', 'AI/ML', 'Blockchain'],
      liveDemo: '#',
      github: '#',
      featured: true
    },
    {
      title: 'Quantum Dashboard',
      description: 'Revolutionary cloud monitoring system with quantum-inspired algorithms for predictive scaling. Real-time infrastructure analysis with holographic data visualization.',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      technologies: ['Python', 'Docker', 'AWS', 'WebGL'],
      liveDemo: '#',
      github: '#'
    },
    {
      title: 'Neural Sync App',
      description: 'Brain-computer interface inspired task management with gesture controls and voice commands. Features advanced collaboration tools and AR workspace integration.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      technologies: ['React Native', 'WebRTC', 'AR/VR', 'TypeScript'],
      liveDemo: '#',
      github: '#'
    },
    {
      title: 'Cosmos Analytics',
      description: 'Multi-dimensional business intelligence platform with predictive modeling and quantum data processing. Advanced visualizations with immersive 3D environments.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      technologies: ['TensorFlow', 'Python', 'Three.js', 'WebAssembly'],
      liveDemo: '#',
      github: '#',
      featured: true
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-portfolio-secondary relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="particle-system">
          {Array.from({ length: 20 }, (_, i) => (
            <div 
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${20 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-white mb-4 transition-all duration-700 font-['Orbitron'] ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="glow-text">PROJECT SHOWCASE</span>
          </h2>
          <div className={`section-divider transition-all duration-700 delay-200 ${
            sectionVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`} />
          <p className={`text-lg text-gray-300 mt-6 transition-all duration-700 delay-300 font-['Inter'] ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Pushing the boundaries of digital innovation through cutting-edge technology
          </p>
        </div>
        
        <div ref={projectsRef} className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              isVisible={projectsVisible}
              delay={index * 200}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-700 delay-800 ${
          projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="hologram-effect inline-block px-8 py-4 rounded-lg">
            <p className="text-portfolio-accent font-['Fira_Code'] text-sm mb-2">
              &gt; Ready to build something extraordinary?
            </p>
            <button className="neon-border px-6 py-3 rounded-lg text-white font-['Orbitron'] font-semibold tracking-wider uppercase hover:scale-105 transition-all duration-300">
              Let's Collaborate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
