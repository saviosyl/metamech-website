import { useEffect, useRef } from 'react';
import { Settings, DraftingCompass, Library, ArrowRight, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Settings,
    title: 'Mechanical Design & Engineering',
    description: 'From concept to production, our engineering team provides comprehensive mechanical design services tailored to your specific requirements.',
    features: [
      'Concept development',
      '3D modeling and simulation',
      'Design optimization',
      'Prototype support',
    ],
    enquirySubject: 'Mechanical Design Services',
  },
  {
    icon: DraftingCompass,
    title: 'CAD / Layout / Manufacturing',
    description: 'Professional CAD services ensuring your designs are production-ready with accurate documentation and manufacturing specifications.',
    features: [
      'Detailed technical drawings',
      'Manufacturing documentation',
      'Assembly instructions',
      'GD&T implementation',
    ],
    enquirySubject: 'CAD Services',
  },
  {
    icon: Library,
    title: 'Libraries & Standards',
    description: 'Build and maintain standardized SolidWorks libraries that ensure consistency and efficiency across your engineering team.',
    features: [
      'Custom SolidWorks libraries',
      'Company standard templates',
      'Design automation setup',
      'Training and documentation',
    ],
    enquirySubject: 'Libraries & Standards',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-title',
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

      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, rotateY: -30, x: -50 },
          {
            opacity: 1,
            rotateY: 0,
            x: 0,
            duration: 0.7,
            ease: 'expo.out',
            delay: index * 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleEnquiry = (subject: string) => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      // Store the subject in sessionStorage to prefill the form
      sessionStorage.setItem('metamech_enquiry_subject', subject);
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-navy">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[200px] -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl xl:max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="services-title font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            ENGINEERING <span className="text-gradient-gold">SERVICES</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Beyond automation tools, we offer comprehensive engineering support.
          </p>
        </div>

        {/* Services Grid */}
        <div 
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          style={{ perspective: '800px' }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group glass-card p-6 sm:p-8 transition-all duration-300 hover:-translate-y-3 hover:border-cyan-500/30 hover:shadow-card-hover"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <service.icon size={32} className="text-cyan-400" />
              </div>

              {/* Title */}
              <h3 className="font-orbitron text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {service.features.map((feature, fIndex) => (
                  <li 
                    key={fIndex} 
                    className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-gray-400 transition-colors"
                  >
                    <Check size={14} className="text-cyan-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Enquire Button */}
              <button
                onClick={() => handleEnquiry(service.enquirySubject)}
                className="w-full py-3 rounded-xl border border-cyan-500/50 text-cyan-400 font-medium flex items-center justify-center gap-2 hover:bg-cyan-500 hover:text-navy transition-all duration-300 group/btn"
              >
                Enquire Now
                <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
