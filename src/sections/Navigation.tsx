import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Tools', href: '#tools' },
  { name: 'ROI Calculator', href: '#roi' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Checkout', href: '#checkout' },
  { name: 'Services', href: '#services' },
  { name: '3-Day Trial', href: '#trial' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Show/hide based on scroll direction
          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          
          // Add background when scrolled
          setIsScrolled(currentScrollY > 50);
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-navy/85 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl xl:max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-[70px]">
            {/* Logo */}
            <a 
              href="#" 
              className="flex items-center gap-2 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative p-1.5 rounded-xl bg-white border-2 border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all duration-300 group-hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] group-hover:border-cyan-400/60 group-hover:scale-105">
                <img 
                  src="/metamech-logo.png" 
                  alt="MetaMech Solutions" 
                  className="h-11 w-auto"
                />
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="relative px-4 py-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200 group"
                >
                  {link.name}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-400 transition-all duration-250 group-hover:w-4/5" />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => scrollToSection('#contact')}
                className="hidden sm:block btn-primary text-sm"
              >
                REQUEST A DEMO
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-navy/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-6 p-8">
          {navLinks.map((link, index) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl font-orbitron text-white hover:text-cyan-400 transition-colors duration-200"
              style={{ 
                animationDelay: `${index * 50}ms`,
                animation: isMobileMenuOpen ? 'fade-in-up 0.4s ease-out forwards' : 'none',
                opacity: isMobileMenuOpen ? 1 : 0
              }}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#contact')}
            className="mt-4 btn-primary text-lg"
            style={{ 
              animationDelay: `${navLinks.length * 50}ms`,
              animation: isMobileMenuOpen ? 'fade-in-up 0.4s ease-out forwards' : 'none',
              opacity: isMobileMenuOpen ? 1 : 0
            }}
          >
            REQUEST A DEMO
          </button>
        </div>
      </div>
    </>
  );
}
