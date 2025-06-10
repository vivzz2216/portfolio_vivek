import { Github, Rocket, Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  hoverImage?: string;
  technologies: string[];
  liveDemo: string;
  github: string;
  isVisible: boolean;
  delay?: number;
  featured?: boolean;
}

function ProjectCard({ title, description, image, hoverImage, technologies, liveDemo, github, isVisible, delay = 0, featured = false }: ProjectCardProps) {
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
        <div className="relative w-full h-48">
        <img 
          src={image}
          alt={title}
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 group-hover:opacity-0"
          />
          {hoverImage && (
            <img 
              src={hoverImage}
              alt={`${title} hover`}
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        />
          )}
        </div>
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

interface Project {
  title: string;
  description: string;
  image: string;
  hoverImage?: string;
  technologies: string[];
  github: string;
  liveDemo: string;
}

export default function ProjectsSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.2 });

  const projects: Project[] = [
    {
      title: "IntervAI",
      description: "A next-gen virtual interview simulation platform that replicates end-to-end technical interviews through interactive rounds. Includes resume-based question flows, real-time voice interactions, and integrated coding environments. Designed to help users practice, improve, and build interview confidence in a realistic setting.",
      image: "/images/intervai.png",
      technologies: ["React", "Node.js", "WebRTC", "AI/ML"],
      github: "https://github.com/yourusername/intervai",
      liveDemo: "https://intervai-demo.com"
    },
    {
      title: "Drona AI",
      description: "An AI-driven sports analytics platform that analyzes athlete performance data to recommend career paths and optimize training. Uses machine learning algorithms for performance prediction and provides data-driven insights to enhance athlete decision-making in the sports ecosystem.",
      image: "/images/drona_white.png",
      hoverImage: "/images/drona_black.png",
      technologies: ["Python", "Scikit-learn", "Flask", "BeautifulSoup", "SQLite"],
      github: "https://github.com/yourusername/drona-ai",
      liveDemo: "https://drona-ai-demo.com"
    },
    {
      title: "Project 3",
      description: "Description of your third project goes here. Make it compelling and highlight the key features and technologies used.",
      image: "/images/project3.jpg",
      technologies: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/yourusername/project3",
      liveDemo: "https://project3-demo.com"
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-portfolio-neutral relative overflow-hidden">
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
            <span className="glow-text">PROJECTS</span>
          </h2>
          <div className={`section-divider transition-all duration-700 delay-200 ${
            sectionVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`} />
        </div>
        
        {/* Projects Grid */}
        <div ref={contentRef} className={`grid gap-12 transition-all duration-700 ${
          contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                {...project}
                isVisible={contentVisible}
                delay={index * 200}
                featured={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
