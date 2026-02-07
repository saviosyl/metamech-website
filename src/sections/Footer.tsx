import { useEffect, useRef } from 'react';
import { Linkedin, Twitter, Youtube, Github } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: 'Tools', href: '#tools' },
  { name: 'ROI Calculator', href: '#roi' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Services', href: '#services' },
  { name: 'Trial', href: '#trial' },
  { name: 'Contact', href: '#contact' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
];

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-border',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.footer-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'expo.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-navy">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal/5 rounded-full blur-[150px]" />
      </div>

      {/* Top Border */}
      <div className="footer-border absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="footer-content relative z-10 max-w-7xl xl:max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Logo & Tagline */}
        <div className="text-center mb-10">
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-block mb-4 group"
          >
            <div className="relative p-3 rounded-2xl bg-white border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 group-hover:shadow-[0_0_45px_rgba(6,182,212,0.6)] group-hover:border-cyan-400/70 group-hover:scale-105">
              <img 
                src="/metamech-logo.png" 
                alt="MetaMech Solutions" 
                className="h-16 w-auto"
              />
            </div>
          </a>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Engineering automation that saves design hours. Transform your SolidWorks workflow today.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-200 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all duration-250 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-10">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110 hover:rotate-6"
              aria-label={social.name}
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>

        {/* Legal Links & Copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              {legalLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>
            <p className="text-gray-600 text-sm">
              © 2026 MetaMech Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
