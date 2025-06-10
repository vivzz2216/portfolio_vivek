import { useState, useEffect } from 'react';
import { Menu, X, Phone, Shield } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-portfolio-neutral/80 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="text-white font-['Exo_2'] text-xl font-bold">
            VP
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors duration-300 font-['Inter']"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side Items */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Phone Number */}
            <a
              href="tel:+919876543210"
              className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 font-['Inter']"
            >
              <Phone className="w-4 h-4 mr-1" />
              +91 98765 43210
            </a>

            {/* Admin Button */}
            <a
              href="/admin"
              className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 font-['Inter']"
            >
              <Shield className="w-4 h-4 mr-1" />
              Admin
            </a>

            {/* Profile Photo */}
            <div className="relative group">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-portfolio-accent/50 shadow-lg shadow-portfolio-accent/20 transition-all duration-300 group-hover:scale-110">
                <img 
                  src="/images/vivek.jpg" 
                  alt="Vivek Pillai" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-portfolio-accent rounded-full animate-pulse" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden bg-portfolio-neutral/95 backdrop-blur-md`}>
        <div className="px-4 py-2 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-gray-300 hover:text-white transition-colors duration-300 py-2 font-['Inter']"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/admin"
            className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 py-2 font-['Inter']"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Shield className="w-4 h-4 mr-1" />
            Admin
          </a>
          <a
            href="tel:+919876543210"
            className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 py-2 font-['Inter']"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Phone className="w-4 h-4 mr-1" />
            +91 98765 43210
          </a>
        </div>
      </div>
    </nav>
  );
} 