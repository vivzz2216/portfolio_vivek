import { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Send, Zap } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.2 });
  const { toast } = useToast();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => apiRequest('POST', '/api/contact', data),
    onSuccess: () => {
      toast({
        title: "Message transmitted successfully!",
        description: "Your message has been received. I'll respond soon.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    },
    onError: (error: any) => {
      toast({
        title: "Transmission failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const contactInfo = [
    { icon: Mail, text: 'vivek.pillai@dev.com', href: 'mailto:vivek.pillai@dev.com', label: 'Email' },
    { icon: Phone, text: '+91 (999) 888-7777', href: 'tel:+919998887777', label: 'Phone' },
    { icon: MapPin, text: 'Mumbai, India', href: '#', label: 'Location' }
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/vivek-pillai-281a68253/', label: 'LinkedIn Profile' },
    { icon: Github, href: 'https://github.com/vivzz2216', label: 'GitHub Profile' },
    { icon: Twitter, href: '#', label: 'Twitter Profile' }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-portfolio-neutral relative overflow-hidden">
      {/* Animated background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-portfolio-primary/10 to-portfolio-accent/10 opacity-10">
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-5xl md:text-6xl font-bold text-white mb-4 transition-all duration-700 font-['Exo_2'] ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="glow-text">ESTABLISH CONNECTION</span>
          </h2>
          <div className={`section-divider transition-all duration-700 delay-200 ${
            sectionVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`} />
          <p className={`text-lg text-gray-300 mt-6 transition-all duration-700 delay-300 font-['Inter'] ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Ready to build the future together? Let's start the conversation
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div ref={infoRef} className={`transition-all duration-700 ${
            infoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="hologram-effect p-8 rounded-xl">
              <h3 className="text-3xl font-semibold text-portfolio-accent mb-8 font-['Exo_2'] flex items-center glow-text">
                <Zap className="mr-3 w-6 h-6" />
                Contact Channels
              </h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    aria-label={`Contact via ${item.label}`}
                    className="flex items-center group hover:text-portfolio-accent transition-all duration-300 p-3 rounded-lg hover:bg-portfolio-primary/10"
                  >
                    <div className="w-12 h-12 bg-portfolio-primary/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-portfolio-accent/20 transition-all duration-300">
                      <item.icon className="text-portfolio-primary group-hover:text-portfolio-accent" size={20} />
                    </div>
                    <span className="text-gray-300 group-hover:text-portfolio-accent transition-colors duration-300 font-['Fira_Code']">
                      {item.text}
                    </span>
                  </a>
                ))}
              </div>
              
              {/* Social Links */}
              <div className="mt-12">
                <h4 className="text-xl font-semibold text-portfolio-accent mb-6 font-['Exo_2'] glow-text">
                  Social Networks
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-12 h-12 bg-portfolio-primary/20 rounded-full flex items-center justify-center text-portfolio-primary hover:text-portfolio-accent hover:bg-portfolio-accent/20 transition-all duration-300 hover:scale-110 transform"
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mt-8 flex items-center space-x-3">
                <div className="w-3 h-3 bg-portfolio-accent rounded-full animate-pulse"></div>
                <span className="text-sm font-['Fira_Code'] text-portfolio-accent glow-text">
                  STATUS: AVAILABLE FOR PROJECTS
                </span>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div ref={formRef} className={`transition-all duration-700 delay-200 ${
            formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="hologram-effect p-8 rounded-xl">
              <h3 className="text-3xl font-semibold text-portfolio-accent mb-8 font-['Exo_2'] flex items-center glow-text">
                <Send className="mr-3 w-6 h-6" />
                Send Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 font-['Fira_Code']">
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full bg-portfolio-neutral border-portfolio-primary/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-portfolio-accent focus:border-portfolio-accent transition-all duration-300 font-['Inter'] px-4 py-3 hover:shadow-md"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 font-['Fira_Code']">
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                    className="w-full bg-portfolio-neutral border-portfolio-primary/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-portfolio-accent focus:border-portfolio-accent transition-all duration-300 font-['Inter'] px-4 py-3 hover:shadow-md"
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2 font-['Fira_Code']">
                    Subject
                  </Label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter message subject"
                    className="w-full bg-portfolio-neutral border-portfolio-primary/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-portfolio-accent focus:border-portfolio-accent transition-all duration-300 font-['Inter'] px-4 py-3 hover:shadow-md"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 font-['Fira_Code']">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Type your message here..."
                    className="w-full bg-portfolio-neutral border-portfolio-primary/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-portfolio-accent focus:border-portfolio-accent transition-all duration-300 resize-none font-['Inter'] px-4 py-3 hover:shadow-md"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full neon-border px-8 py-4 bg-transparent text-white font-['Exo_2'] font-semibold tracking-wider uppercase hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center">
                    {contactMutation.isPending ? (
                      <>
                        <div className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        TRANSMIT MESSAGE
                        <Send className="ml-3 w-4 h-4" />
                      </>
                    )}
                  </span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}