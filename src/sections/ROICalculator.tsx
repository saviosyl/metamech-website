import { useState, useEffect, useRef } from 'react';
import { Users, Clock, Euro, Calendar, Package, Calculator, ArrowRight, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  { name: 'Trial', cost: 0 },
  { name: 'Standard', cost: 999 },
  { name: 'Premium', cost: 1299 },
  { name: 'Premium Plus', cost: 1599 },
];

interface ROIData {
  weeklySavings: number;
  monthlySavings: number;
  annualSavings: number;
  breakEven: number;
}

export default function ROICalculator() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [engineers, setEngineers] = useState(5);
  const [hoursSaved, setHoursSaved] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(75);
  const [weeksPerYear, setWeeksPerYear] = useState(48);
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [toolCost, setToolCost] = useState(999);
  const [roi, setRoi] = useState<ROIData>({
    weeklySavings: 0,
    monthlySavings: 0,
    annualSavings: 0,
    breakEven: 0,
  });
  const [animatedValues, setAnimatedValues] = useState<ROIData>({
    weeklySavings: 0,
    monthlySavings: 0,
    annualSavings: 0,
    breakEven: 0,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.roi-title',
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

      gsap.fromTo(
        '.input-card',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.results-panel',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const weeklySavings = engineers * hoursSaved * hourlyCost;
    const monthlySavings = weeklySavings * 4.33;
    const annualSavings = weeklySavings * weeksPerYear;
    // Fix NaN: only calculate break-even if weeklySavings > 0, otherwise show 0
    const breakEven = (toolCost > 0 && weeklySavings > 0) ? Math.ceil(toolCost / weeklySavings) : 0;

    setRoi({ weeklySavings, monthlySavings, annualSavings, breakEven });
  }, [engineers, hoursSaved, hourlyCost, weeksPerYear, toolCost]);

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    const startValues = { ...animatedValues };

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues({
        weeklySavings: Math.round(startValues.weeklySavings + (roi.weeklySavings - startValues.weeklySavings) * eased),
        monthlySavings: Math.round(startValues.monthlySavings + (roi.monthlySavings - startValues.monthlySavings) * eased),
        annualSavings: Math.round(startValues.annualSavings + (roi.annualSavings - startValues.annualSavings) * eased),
        breakEven: Math.round(startValues.breakEven + (roi.breakEven - startValues.breakEven) * eased),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [roi]);

  const handlePlanSelect = (index: number) => {
    setSelectedPlan(index);
    setToolCost(plans[index].cost);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const scrollToCheckout = () => {
    const element = document.querySelector('#checkout');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="roi"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-navy">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[200px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl xl:max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="roi-title font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            CALCULATE YOUR <span className="text-gradient-gold">ROI</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            See how much time and money MetaMech can save your engineering team.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Inputs Column */}
          <div className="lg:col-span-3 space-y-4">
            {/* Engineers Input */}
            <div className="input-card glass-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Users size={20} className="text-cyan-400" />
                </div>
                <label className="text-white font-medium">Number of Engineers</label>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={engineers}
                  onChange={(e) => setEngineers(Number(e.target.value))}
                  className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <span className="w-16 text-right font-mono text-cyan-400 text-lg">{engineers}</span>
              </div>
            </div>

            {/* Hours Saved Input */}
            <div className="input-card glass-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Clock size={20} className="text-cyan-400" />
                </div>
                <label className="text-white font-medium">Hours Saved Per Week</label>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={hoursSaved}
                  onChange={(e) => setHoursSaved(Number(e.target.value))}
                  className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <span className="w-16 text-right font-mono text-cyan-400 text-lg">{hoursSaved}h</span>
              </div>
            </div>

            {/* Hourly Cost Input */}
            <div className="input-card glass-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Euro size={20} className="text-cyan-400" />
                </div>
                <label className="text-white font-medium">Hourly Cost (€)</label>
              </div>
              <input
                type="number"
                min="1"
                max="200"
                value={hourlyCost}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow empty string temporarily, but default to 0
                  setHourlyCost(value === '' ? 0 : Number(value));
                }}
                className="input-field w-full"
              />
            </div>

            {/* Weeks Per Year Input */}
            <div className="input-card glass-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Calendar size={20} className="text-cyan-400" />
                </div>
                <label className="text-white font-medium">Working Weeks Per Year</label>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="52"
                  value={weeksPerYear}
                  onChange={(e) => setWeeksPerYear(Number(e.target.value))}
                  className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <span className="w-16 text-right font-mono text-cyan-400 text-lg">{weeksPerYear}</span>
              </div>
            </div>

            {/* Plan Selector */}
            <div className="input-card glass-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                  <Package size={20} className="text-gold" />
                </div>
                <label className="text-white font-medium">Select Your Plan</label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {plans.map((plan, index) => (
                  <button
                    key={index}
                    onClick={() => handlePlanSelect(index)}
                    className={`p-3 rounded-xl border transition-all duration-300 text-sm ${
                      selectedPlan === index
                        ? 'border-cyan-500 bg-cyan-500/20 text-white'
                        : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-medium">{plan.name}</div>
                    <div className="text-xs opacity-70">€{plan.cost}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tool Cost Input */}
            <div className="input-card glass-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                  <Calculator size={20} className="text-gold" />
                </div>
                <label className="text-white font-medium">Tool Cost (€)</label>
              </div>
              <input
                type="number"
                min="0"
                value={toolCost}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow empty string temporarily, but default to 0
                  setToolCost(value === '' ? 0 : Number(value));
                }}
                className="input-field w-full"
              />
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <div className="results-panel glass-card p-6 lg:sticky lg:top-24">
              <h3 className="font-orbitron text-xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp size={24} className="text-cyan-400" />
                Your Savings
              </h3>

              <div className="space-y-6">
                {/* Weekly Savings */}
                <div className="relative">
                  <div className="text-sm text-gray-500 mb-1">Weekly Savings</div>
                  <div className="font-mono text-3xl sm:text-4xl font-bold text-gradient-teal">
                    {formatCurrency(animatedValues.weeklySavings)}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
                </div>

                {/* Monthly Savings */}
                <div className="relative">
                  <div className="text-sm text-gray-500 mb-1">Monthly Savings</div>
                  <div className="font-mono text-3xl sm:text-4xl font-bold text-gradient-teal">
                    {formatCurrency(animatedValues.monthlySavings)}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
                </div>

                {/* Annual Savings */}
                <div className="relative p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20">
                  <div className="text-sm text-cyan-400 mb-1">Annual Savings</div>
                  <div className="font-mono text-4xl sm:text-5xl font-bold text-gradient-teal">
                    {formatCurrency(animatedValues.annualSavings)}
                  </div>
                </div>

                {/* Break-even */}
                <div className="relative">
                  <div className="text-sm text-gray-500 mb-1">Break-even Time</div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-2xl font-bold text-gradient-gold">
                      {animatedValues.breakEven}
                    </span>
                    <span className="text-gray-400">weeks</span>
                  </div>
                  <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-gold to-amber-400 transition-all duration-500"
                      style={{ 
                        width: `${Math.min((animatedValues.breakEven / 52) * 100, 100)}%` 
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={scrollToCheckout}
                className="w-full mt-8 btn-primary flex items-center justify-center gap-2"
              >
                Continue to Checkout
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
