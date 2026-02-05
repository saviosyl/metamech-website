import { useState, useEffect, useRef } from 'react';
import { 
  User, Building, Mail, Phone, MessageSquare, 
  Send, Check, MapPin, Clock, Mail as MailIcon 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Web3Forms Configuration
const WEB3FORMS_KEY = 'c7e2117e-876a-443f-9e05-b3a9b0eca813';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    // Check for prefilled subject from services enquiry
    const enquirySubject = sessionStorage.getItem('metamech_enquiry_subject');
    if (enquirySubject) {
      setFormData(prev => ({ ...prev, message: `I'm interested in ${enquirySubject}.` }));
      sessionStorage.removeItem('metamech_enquiry_subject');
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-title',
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
        '.contact-form',
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'expo.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.contact-info',
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'expo.out',
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataObj = new FormData();
    formDataObj.append('access_key', WEB3FORMS_KEY);
    formDataObj.append('subject', `Demo Request - ${formData.company}`);
    formDataObj.append('from_name', formData.name);
    formDataObj.append('from_email', formData.email);
    formDataObj.append('name', formData.name);
    formDataObj.append('company', formData.company);
    formDataObj.append('email', formData.email);
    formDataObj.append('phone', formData.phone);
    formDataObj.append('message', formData.message);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataObj,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Something went wrong. Please email us directly at hi@metamechsolutions.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.company && formData.email;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-navy">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl xl:max-w-8xl 2xl:max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="contact-title font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            REQUEST A <span className="text-gradient-teal">DEMO</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Ready to transform your engineering workflow? Get in touch with our team.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-3">
            <div className="contact-form glass-card p-6 sm:p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input-field pl-12"
                        required
                      />
                    </div>

                    {/* Company Name */}
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input
                        type="text"
                        name="company"
                        placeholder="Company Name *"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="input-field pl-12"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-field pl-12"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input-field pl-12"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-gray-500" size={18} />
                    <textarea
                      name="message"
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="input-field pl-12 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={18} />
                        Send Request
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-6 animate-scale-in">
                    <Check size={40} className="text-cyan-400" />
                  </div>
                  <h3 className="font-orbitron text-2xl font-bold text-white mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-gray-400">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-2">
            <div className="contact-info space-y-6">
              {/* Contact Info Card */}
              <div className="glass-card p-6">
                <h3 className="font-orbitron text-lg font-bold text-white mb-6">
                  Contact Information
                </h3>

                <div className="space-y-5">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <MailIcon size={18} className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Email</div>
                      <a 
                        href="mailto:hi@metamechsolutions.com"
                        className="text-white hover:text-cyan-400 transition-colors"
                      >
                        hi@metamechsolutions.com
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Location</div>
                      <p className="text-white">Galway, Ireland</p>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <Clock size={18} className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Response Time</div>
                      <p className="text-white">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="glass-card p-6">
                <h3 className="font-orbitron text-lg font-bold text-white mb-4">
                  Why Choose Us
                </h3>
                <ul className="space-y-3">
                  {[
                    'Built by engineers, for engineers',
                    'Average 10x ROI in first year',
                    'Dedicated customer support',
                    'Regular feature updates',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-gray-400">
                      <Check size={16} className="text-cyan-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
