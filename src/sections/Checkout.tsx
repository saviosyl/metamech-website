import { useState, useEffect, useRef } from 'react';
import { 
  User, Building, Receipt, MapPin, Mail, Phone, 
  CreditCard, Wallet, FileText, Check, ArrowRight, 
  Lock, Shield, ChevronRight 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 
  'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 
  'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 
  'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 
  'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 
  'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 
  'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 
  'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 
  'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 
  'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 
  'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 
  'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 
  'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 
  'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 
  'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 
  'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 
  'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 
  'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 
  'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 
  'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 
  'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 
  'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 
  'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 
  'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 
  'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 
  'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 
  'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 
  'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 
  'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

const paymentMethods = [
  { id: 'stripe', name: 'Credit Card (Stripe)', icon: CreditCard, description: 'Pay securely with Stripe' },
  { id: 'revolut', name: 'Revolut', icon: Wallet, description: 'Pay with Revolut' },
  { id: 'invoice', name: 'Request Invoice', icon: FileText, description: 'We\'ll send you an invoice' },
];

// Payment Links
const STRIPE_LINKS: Record<string, string> = {
  standard: 'https://buy.stripe.com/28E5kC61J4252sl6vi2Nq00',
  premium: 'https://buy.stripe.com/4gM28qgGnaqteb38Dq2Nq01',
  plus: '#',
};

const REVOLUT_LINK = 'https://revolut.me/saviosyl';

// Web3Forms Configuration
const WEB3FORMS_KEY = 'c7e2117e-876a-443f-9e05-b3a9b0eca813';

export default function Checkout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    vatNumber: '',
    country: '',
    address: '',
    email: '',
    phone: '',
  });
  const [selectedPayment, setSelectedPayment] = useState('stripe');
  const [selectedPlan, setSelectedPlan] = useState('standard');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.checkout-title',
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
        '.checkout-form',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'expo.out',
          delay: 0.2,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataObj = new FormData();
    formDataObj.append('access_key', WEB3FORMS_KEY);
    formDataObj.append('subject', `Order Details - ${formData.companyName}`);
    formDataObj.append('from_name', formData.fullName);
    formDataObj.append('from_email', formData.email);
    formDataObj.append('plan', selectedPlan);
    formDataObj.append('fullName', formData.fullName);
    formDataObj.append('companyName', formData.companyName);
    formDataObj.append('vatNumber', formData.vatNumber);
    formDataObj.append('country', formData.country);
    formDataObj.append('address', formData.address);
    formDataObj.append('email', formData.email);
    formDataObj.append('phone', formData.phone);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataObj,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitting(false);
        setStep(2);
      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Something went wrong. Please email us directly at hi@metamechsolutions.com');
      setIsSubmitting(false);
    }
  };

  const handlePayment = () => {
    switch (selectedPayment) {
      case 'stripe':
        const stripeUrl = STRIPE_LINKS[selectedPlan];
        if (stripeUrl && stripeUrl !== '#') {
          window.open(stripeUrl, '_blank');
        } else {
          alert('Stripe payment link not configured for this plan yet. Please use Revolut or Request Invoice.');
        }
        break;
      case 'revolut':
        window.open(REVOLUT_LINK, '_blank');
        break;
      case 'invoice':
        window.location.href = `mailto:hi@metamechsolutions.com?subject=Invoice Request - ${encodeURIComponent(formData.companyName)}&body=${encodeURIComponent(
          `Hi MetaMech Team,\n\n` +
          `I would like to request an invoice for the following:\n\n` +
          `Plan: ${selectedPlan.toUpperCase()}\n` +
          `Company: ${formData.companyName}\n` +
          `Name: ${formData.fullName}\n` +
          `Email: ${formData.email}\n` +
          `Country: ${formData.country}\n` +
          `Address: ${formData.address}\n\n` +
          `Please send the invoice to the email above.\n\n` +
          `Thank you!`
        )}`;
        break;
    }
  };

  const isStep1Valid = formData.fullName && formData.companyName && formData.email && formData.country;

  return (
    <section
      id="checkout"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-navy">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-3xl xl:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="checkout-title font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            COMPLETE YOUR <span className="text-gradient-gold">ORDER</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            You&apos;re almost there. Fill in your details to proceed with payment.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-cyan-400' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 1 ? 'bg-cyan-500 text-navy' : 'bg-white/10 text-gray-500'
              }`}>
                {step > 1 ? <Check size={16} /> : '1'}
              </div>
              <span className="text-sm font-medium hidden sm:block">Your Details</span>
            </div>
            
            <div className="w-16 sm:w-24 h-px bg-white/10 relative">
              <div 
                className="absolute inset-y-0 left-0 bg-cyan-500 transition-all duration-500"
                style={{ width: step > 1 ? '100%' : '0%' }}
              />
            </div>
            
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-cyan-400' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 2 ? 'bg-cyan-500 text-navy' : 'bg-white/10 text-gray-500'
              }`}>
                2
              </div>
              <span className="text-sm font-medium hidden sm:block">Payment</span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="checkout-form glass-card p-6 sm:p-8">
          {step === 1 ? (
            <form onSubmit={handleSubmitDetails} className="space-y-5">
              <h3 className="font-orbitron text-xl font-bold text-white mb-6">
                Your Details
              </h3>

              {/* Plan Selection */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
                <label className="text-sm text-gray-400 mb-2 block">Selected Plan</label>
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full bg-navy-light border border-white/20 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="trial">Demo / Trial (3 days) - €0</option>
                  <option value="standard">Standard Pack - €999</option>
                  <option value="premium">Premium Pack - €1,299</option>
                  <option value="plus">Premium Plus - €1,599</option>
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name *"
                    value={formData.fullName}
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
                    name="companyName"
                    placeholder="Company Name *"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="input-field pl-12"
                    required
                  />
                </div>

                {/* VAT Number */}
                <div className="relative">
                  <Receipt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    name="vatNumber"
                    placeholder="VAT Number (optional)"
                    value={formData.vatNumber}
                    onChange={handleInputChange}
                    className="input-field pl-12"
                  />
                </div>

                {/* Country */}
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="input-field pl-12 appearance-none"
                    required
                  >
                    <option value="">Select Country *</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Address */}
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-gray-500" size={18} />
                <textarea
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="input-field pl-12 resize-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isStep1Valid || isSubmitting}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Continue to Payment
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                Your information is securely sent to our team. We&apos;ll never share your data.
              </p>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-cyan-400" />
                </div>
                <h3 className="font-orbitron text-xl font-bold text-white mb-2">
                  Details Saved!
                </h3>
                <p className="text-gray-400 text-sm">
                  Choose your payment method to complete the order.
                </p>
              </div>

              {/* Selected Plan Summary */}
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Selected Plan:</span>
                  <span className="text-white font-medium capitalize">{selectedPlan} Pack</span>
                </div>
              </div>

              <h3 className="font-orbitron text-lg font-bold text-white">
                Select Payment Method
              </h3>

              {/* Payment Options */}
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
                      selectedPayment === method.id
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedPayment === method.id
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'bg-white/10 text-gray-400'
                    }`}>
                      <method.icon size={24} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className={`font-medium ${
                        selectedPayment === method.id ? 'text-white' : 'text-gray-300'
                      }`}>
                        {method.name}
                      </div>
                      <div className="text-sm text-gray-500">{method.description}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPayment === method.id
                        ? 'border-cyan-500'
                        : 'border-gray-500'
                    }`}>
                      {selectedPayment === method.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Security Badges */}
              <div className="flex items-center justify-center gap-6 py-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Lock size={16} className="text-cyan-400" />
                  SSL Secure
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Shield size={16} className="text-cyan-400" />
                  Protected
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
                >
                  Back
                </button>
                <button
                  onClick={handlePayment}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  {selectedPayment === 'invoice' ? 'Request Invoice' : 'Proceed to Payment'}
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
