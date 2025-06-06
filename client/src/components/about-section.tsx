import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export default function AboutSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-portfolio-neutral">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-portfolio-secondary mb-4 transition-all duration-700 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            About Me
          </h2>
          <div className={`section-divider transition-all duration-700 delay-200 ${
            sectionVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`} />
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Photo */}
          <div ref={imageRef} className={`text-center md:text-left transition-all duration-700 ${
            imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500"
              alt="Alex Chen - Professional headshot" 
              className="w-80 h-80 rounded-full mx-auto md:mx-0 shadow-2xl object-cover"
            />
          </div>
          
          {/* About Content */}
          <div ref={contentRef} className={`transition-all duration-700 delay-200 ${
            contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <h3 className="text-2xl font-semibold text-portfolio-secondary mb-6">
              Passionate IT Engineer with 8+ Years of Experience
            </h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              I'm a dedicated IT engineer specializing in full-stack development, cloud architecture, and DevOps practices. 
              With a strong foundation in modern technologies and a passion for solving complex problems, I help businesses 
              transform their digital infrastructure and create scalable solutions.
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
              or mentoring aspiring developers. I believe in continuous learning and staying ahead of industry trends.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="text-3xl font-bold text-portfolio-primary">50+</div>
                <div className="text-gray-600 text-sm">Projects Completed</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-portfolio-primary">8+</div>
                <div className="text-gray-600 text-sm">Years Experience</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-portfolio-primary">15+</div>
                <div className="text-gray-600 text-sm">Technologies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
