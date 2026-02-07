import { useEffect, useRef } from 'react';
import { Check, Star, ArrowRight, Zap, Shield, Crown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Trial',
    price: 0,
    period: '3 days free',
    description: 'Try before you buy',
    icon: Zap,
    features: [
      'Full feature access',
      'Community support',
      'Single user license',
      'All automation tools',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Standard',
    price: 999,
    period: 'per year',
    description: 'Perfect for small teams',
    icon: Shield,
    features: [
      'BOM Automation',
      'PDF Merge + Index',
      'Email support',
      'Single user license',
      'Quarterly updates',
    ],
    cta: 'Get Standard',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: 1299,
    period: 'per year',
    description: 'Most popular choice',
    icon: Crown,
    features: [
      'All Standard features',
      'STEP/DXF Export',
      'Priority support',
      'Multi-user discount',
      'Monthly updates',
      'Custom templates',
    ],
    cta: 'Get Premium',
    highlighted: true,
    badge: 'MOST POPULAR',
  },
  {
    name: 'Premium Plus',
    price: 1599,
    period: 'per year',
    description: 'Enterprise solution',
    icon: Star,
    features: [
      'All Premium features',
      'Custom development',
      'Dedicated support',
      'Training sessions',
      'API access',
      'White-label options',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pricing-title',
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
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
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

  const handlePlanSelect = () => {
    const checkoutSection = document.querySelector('#checkout');
    if (checkoutSection) {
      checkoutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-navy">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl xl:max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="pricing-title font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            CHOOSE YOUR <span className="text-gradient-teal">PLAN</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Flexible pricing options to fit teams of any size. All plans include core automation features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ perspective: '1000px' }}
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className={`relative group ${plan.highlighted ? 'lg:-mt-4 lg:mb-4' : ''}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-4 py-1 bg-gradient-to-r from-gold to-amber-500 rounded-full text-xs font-bold text-navy shadow-glow-gold">
                    {plan.badge}
                  </div>
                </div>
              )}

              <div
                className={`h-full glass-card p-6 transition-all duration-300 hover:-translate-y-4 ${
                  plan.highlighted
                    ? 'border-cyan-500/50 shadow-glow-teal hover:shadow-glow-teal-lg'
                    : 'hover:border-cyan-500/30 hover:shadow-card-hover'
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                    plan.highlighted
                      ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-white'
                      : 'bg-white/10 text-cyan-400'
                  }`}
                >
                  <plan.icon size={24} />
                </div>

                {/* Plan Name */}
                <h3 className="font-orbitron text-xl font-bold text-white mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">€{plan.price}</span>
                    <span className="text-gray-500 text-sm">/{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2 text-sm text-gray-400">
                      <Check
                        size={16}
                        className={`mt-0.5 flex-shrink-0 ${
                          plan.highlighted ? 'text-cyan-400' : 'text-gray-500'
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={handlePlanSelect}
                  className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                    plan.highlighted
                      ? 'btn-primary'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-cyan-500/50'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            All plans include a 14-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
