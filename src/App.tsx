import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Tools from './sections/Tools';
import ROICalculator from './sections/ROICalculator';
import Pricing from './sections/Pricing';
import Checkout from './sections/Checkout';
import Industries from './sections/Industries';
import Services from './sections/Services';
import TrialDownload from './sections/TrialDownload';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import AdminPanel from './sections/AdminPanel';

import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-navy text-white overflow-x-hidden">
      {/* Admin Panel (hidden by default, shown with ?admin=1) */}
      <AdminPanel />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        <Hero />
        <Tools />
        <ROICalculator />
        <Pricing />
        <Checkout />
        <Industries />
        <Services />
        <TrialDownload />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
