import { useEffect, useRef } from 'react';
import { Stethoscope, Cog, ArrowLeftRight, Cpu, Car, Plane, Factory, Zap, ShoppingCart, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  { name: 'Medical Devices', icon: Stethoscope },
  { name: 'Automation', icon: Cog },
  { name: 'Conveyors', icon: ArrowLeftRight },
  { name: 'Special Machinery', icon: Cpu },
  { name: 'Robotics', icon: Factory },
  { name: 'Automotive', icon: Car },
  { name: 'Aerospace', icon: Plane },
  { name: 'Industrial Equipment', icon: Factory },
  { name: 'Manufacturing', icon: Cog },
  { name: 'Energy', icon: Zap },
  { name: 'Consumer Products', icon: ShoppingCart },
  { name: 'Defense', icon: Shield },
];

const featureCards = [
  {
    title: 'Medical Device Engineering',
    description: 'Precision and compliance for life-critical products. Our automation tools ensure accurate documentation and traceability required for medical device development.',
    icon: Stethoscope,
  },
  {
    title: 'Automation Systems',
    description: 'Streamlined design for robotic and automated systems. Reduce design iteration time and improve consistency across complex automation projects.',
    icon: Cog,
  },
  {
    title: 'Custom Machinery',
    description: 'Tailored solutions for specialized equipment. From concept to manufacturing, accelerate your custom machinery design process.',
    icon: Factory,
  },
];

export default function Industries() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.industries-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Chips pop-in animation
      chipsRef.current.forEach((chip, index) => {
        gsap.fromTo(
          chip,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'back.out(1.7)',
            delay: index * 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Feature cards animation
      gsap.fromTo(
        '.feature-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.feature-cards-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-navy">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl xl:max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="industries-title font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            TRUSTED ACROSS <span className="text-gradient-teal">INDUSTRIES</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            MetaMech powers engineering teams in diverse sectors worldwide.
          </p>
        </div>

        {/* Industry Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {industries.map((industry, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) chipsRef.current[index] = el;
              }}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 cursor-default animate-float"
              style={{ 
                animationDelay: `${index * 0.5}s`,
                animationDuration: `${4 + index * 0.3}s`,
              }}
            >
              <industry.icon size={16} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium whitespace-nowrap">{industry.name}</span>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="feature-cards-container grid md:grid-cols-3 gap-6">
          {featureCards.map((card, index) => (
            <div
              key={index}
              className="feature-card glass-card p-6 group hover:-translate-y-3 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <card.icon size={28} className="text-cyan-400" />
              </div>
              <h3 className="font-orbitron text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}