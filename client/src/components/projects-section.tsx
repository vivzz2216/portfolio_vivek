import { ExternalLink, Github } from 'lucide-react';
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
}

function ProjectCard({ title, description, image, technologies, liveDemo, github, isVisible, delay = 0 }: ProjectCardProps) {
  return (
    <div className={`project-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 hover:shadow-xl ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`} style={{ transitionDelay: `${delay}ms` }}>
      <img 
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-portfolio-secondary mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          <a 
            href={liveDemo}
            className="text-portfolio-primary hover:text-blue-700 font-medium transition-colors duration-200 flex items-center"
          >
            <ExternalLink className="mr-1" size={16} />
            Live Demo
          </a>
          <a 
            href={github}
            className="text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 flex items-center"
          >
            <Github className="mr-1" size={16} />
            GitHub
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
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, inventory management, and real-time analytics dashboard.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      technologies: ['React', 'Node.js', 'MongoDB'],
      liveDemo: '#',
      github: '#'
    },
    {
      title: 'Cloud Monitoring System',
      description: 'Enterprise-grade monitoring solution for AWS infrastructure with custom alerts, performance metrics, and automated scaling. Built with Python, Docker, and Kubernetes for high availability.',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      technologies: ['Python', 'Docker', 'AWS'],
      liveDemo: '#',
      github: '#'
    },
    {
      title: 'Task Management App',
      description: 'Cross-platform mobile application for team collaboration and project management. Features real-time synchronization, offline support, and advanced reporting capabilities.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      technologies: ['React Native', 'Firebase', 'TypeScript'],
      liveDemo: '#',
      github: '#'
    },
    {
      title: 'AI Analytics Platform',
      description: 'Machine learning powered analytics platform for business intelligence. Provides predictive insights, automated reporting, and interactive data visualizations for enterprise clients.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      technologies: ['TensorFlow', 'Python', 'React'],
      liveDemo: '#',
      github: '#'
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-portfolio-neutral">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-portfolio-secondary mb-4 transition-all duration-700 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Featured Projects
          </h2>
          <div className={`section-divider transition-all duration-700 delay-200 ${
            sectionVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`} />
          <p className={`text-lg text-gray-600 mt-6 transition-all duration-700 delay-300 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Here are some of my recent projects that showcase my skills and expertise
          </p>
        </div>
        
        <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              isVisible={projectsVisible}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
