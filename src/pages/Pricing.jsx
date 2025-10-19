import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Check, Star, Shield, Zap, Users, Crown, 
  HelpCircle, ChevronDown, ChevronUp, CreditCard,
  Lock, Award, TrendingUp, MessageCircle, Globe,
  Smartphone, Laptop, Tablet, X
} from 'lucide-react';

function Pricing() {
  const navigate = useNavigate();
  const [billing, setBilling] = useState('monthly');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  const plans = [
    { 
      id: 'basic', 
      name: 'Basic', 
      monthly: 9, 
      yearly: 90, 
      badge: 'Starter',
      icon: Zap,
      color: 'blue',
      features: [
        '1 Child Profile',
        'Core Subjects (Math, Science, English)',
        'Assignments & Quizzes',
        'Progress Tracking',
        'Email Support',
        'Mobile App Access',
        'Basic Reports'
      ],
      limits: {
        profiles: 1,
        storage: '5GB',
        liveClasses: '5/month',
        support: 'Email'
      }
    },
    { 
      id: 'family', 
      name: 'Family', 
      monthly: 19, 
      yearly: 190, 
      badge: 'Popular',
      icon: Users,
      color: 'primary',
      features: [
        'Up to 4 Child Profiles',
        'All Subjects + Live Classes',
        'AI-Powered Recommendations',
        'Advanced Progress Reports',
        'Priority Support (24/7)',
        'Offline Mode',
        'Parent Dashboard',
        'Custom Learning Paths',
        'Gamification & Rewards'
      ],
      popular: true,
      limits: {
        profiles: 4,
        storage: '50GB',
        liveClasses: 'Unlimited',
        support: '24/7 Priority'
      }
    },
    { 
      id: 'pro', 
      name: 'Pro', 
      monthly: 29, 
      yearly: 290, 
      badge: 'Advanced',
      icon: Crown,
      color: 'purple',
      features: [
        'Unlimited Child Profiles',
        'AI Tutor & Personalized Learning',
        'VR/AR Interactive Labs',
        'Advanced Parent Controls',
        'Premium Support (Dedicated)',
        'Custom Curriculum Builder',
        'Multi-Device Sync',
        'Advanced Analytics',
        'Certificate Programs',
        'Early Access to New Features'
      ],
      limits: {
        profiles: 'Unlimited',
        storage: '500GB',
        liveClasses: 'Unlimited + Priority',
        support: 'Dedicated Manager'
      }
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan later?',
      answer: 'Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of your next billing cycle.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, all plans come with a 14-day free trial. No credit card required to start. You can explore all features before committing.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans.'
    },
    {
      question: 'Can I get a refund?',
      answer: 'Yes! We offer a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund your payment in full, no questions asked.'
    },
    {
      question: 'Do you offer discounts for schools?',
      answer: 'Yes! We have special pricing for schools and educational institutions. Contact our sales team for a custom quote.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely! We use bank-level encryption (256-bit SSL) and are fully GDPR and COPPA compliant. Your data is never shared with third parties.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Parent of 2',
      avatar: '👩',
      rating: 5,
      text: 'My kids love the interactive lessons! Their grades have improved significantly in just 3 months.'
    },
    {
      name: 'Michael Chen',
      role: 'Homeschool Parent',
      avatar: '👨',
      rating: 5,
      text: 'The AI tutor is amazing! It adapts to my children\'s learning pace and keeps them engaged.'
    },
    {
      name: 'Emily Davis',
      role: 'Teacher',
      avatar: '👩‍🏫',
      rating: 5,
      text: 'Best educational platform I\'ve used. The analytics help me track student progress effectively.'
    }
  ];

  const handleChoose = (planId) => {
    navigate(`/subscribe?plan=${planId}&billing=${billing}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            Simple & Transparent Pricing
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 font-playful mb-4">
            Pick the perfect plan
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Choose monthly or yearly billing and get started in minutes. 14-day free trial, no credit card required.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <button 
            onClick={() => setBilling('monthly')} 
            className={`px-6 py-3 rounded-l-xl border-2 font-semibold transition-all ${
              billing==='monthly'
                ?'bg-white text-primary-600 border-primary-400 shadow-lg'
                :'bg-white/50 text-gray-600 border-gray-200 hover:bg-white'
            }`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBilling('yearly')} 
            className={`px-6 py-3 rounded-r-xl border-2 font-semibold transition-all ${
              billing==='yearly'
                ?'bg-white text-primary-600 border-primary-400 shadow-lg'
                :'bg-white/50 text-gray-600 border-gray-200 hover:bg-white'
            }`}
          >
            Yearly 
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              Save 20%
            </span>
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const price = billing === 'monthly' ? plan.monthly : plan.yearly;
            const Icon = plan.icon;
            return (
              <div 
                key={plan.id} 
                className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 transition-all hover:scale-105 ${
                  plan.popular ? 'border-primary-400 shadow-primary-200' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <Star className="w-4 h-4" />
                    {plan.badge}
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br from-${plan.color}-500 to-${plan.color}-600 rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                </div>
                
                <div className="mb-6">
                  <span className="text-5xl font-extrabold text-gray-900">₵{price}</span>
                  <span className="text-gray-500 text-lg">/{billing === 'monthly' ? 'mo' : 'yr'}</span>
                  {billing === 'yearly' && (
                    <p className="text-sm text-green-600 mt-1">₵{plan.monthly * 12 - price} saved annually</p>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => handleChoose(plan.id)} 
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:from-primary-700 hover:to-purple-700' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Start Free Trial
                </button>
                
                <p className="text-center text-sm text-gray-500 mt-3">
                  No credit card required
                </p>
              </div>
            );
          })}
        </div>

        {/* Enterprise Option */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Crown className="w-8 h-8" />
                <h3 className="text-3xl font-bold">Enterprise</h3>
              </div>
              <p className="text-purple-100 text-lg mb-4">
                Custom solutions for schools, districts, and large organizations
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Unlimited users and profiles
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Dedicated account manager
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Custom integrations & API access
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Advanced security & compliance
                </li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <p className="text-4xl font-bold mb-4">Custom Pricing</p>
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all shadow-xl">
                Contact Sales
              </button>
            </div>
          </div>
        </div>

        {/* Feature Comparison Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl font-semibold text-gray-700 hover:bg-gray-50 shadow-lg transition-all"
          >
            {showComparison ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            {showComparison ? 'Hide' : 'Show'} Detailed Comparison
          </button>
        </div>

        {/* Feature Comparison Table */}
        {showComparison && (
          <div className="bg-white rounded-3xl p-8 shadow-xl mb-16 overflow-x-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Feature Comparison</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">Basic</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">Family</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-700">Child Profiles</td>
                  <td className="text-center py-4 px-4">1</td>
                  <td className="text-center py-4 px-4">4</td>
                  <td className="text-center py-4 px-4">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-700">Storage</td>
                  <td className="text-center py-4 px-4">5GB</td>
                  <td className="text-center py-4 px-4">50GB</td>
                  <td className="text-center py-4 px-4">500GB</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-700">Live Classes</td>
                  <td className="text-center py-4 px-4">5/month</td>
                  <td className="text-center py-4 px-4">Unlimited</td>
                  <td className="text-center py-4 px-4">Unlimited + Priority</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-700">AI Tutor</td>
                  <td className="text-center py-4 px-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-700">VR/AR Labs</td>
                  <td className="text-center py-4 px-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-700">Support</td>
                  <td className="text-center py-4 px-4 text-sm">Email</td>
                  <td className="text-center py-4 px-4 text-sm">24/7 Priority</td>
                  <td className="text-center py-4 px-4 text-sm">Dedicated Manager</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h4 className="font-bold text-gray-800 mb-1">30-Day</h4>
            <p className="text-sm text-gray-600">Money-Back Guarantee</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <Lock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h4 className="font-bold text-gray-800 mb-1">Secure</h4>
            <p className="text-sm text-gray-600">256-bit SSL Encryption</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <Award className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <h4 className="font-bold text-gray-800 mb-1">Award</h4>
            <p className="text-sm text-gray-600">Winning Platform</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <Users className="w-12 h-12 text-orange-600 mx-auto mb-3" />
            <h4 className="font-bold text-gray-800 mb-1">10,000+</h4>
            <p className="text-sm text-gray-600">Happy Families</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">What Parents Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-bold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-16">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Accepted Payment Methods</h3>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <CreditCard className="w-6 h-6 text-gray-600" />
              <span className="font-semibold text-gray-700">Visa</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <CreditCard className="w-6 h-6 text-gray-600" />
              <span className="font-semibold text-gray-700">Mastercard</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <CreditCard className="w-6 h-6 text-gray-600" />
              <span className="font-semibold text-gray-700">American Express</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <Globe className="w-6 h-6 text-blue-600" />
              <span className="font-semibold text-gray-700">PayPal</span>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-4">All transactions are secure and encrypted</p>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h3>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-6 h-6 text-primary-600 flex-shrink-0" />
                    <span className="font-semibold text-gray-800">{faq.question}</span>
                  </div>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 pl-9">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-4xl font-bold mb-4">Ready to get started?</h3>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of families who are already transforming their children's education
          </p>
          <button 
            onClick={() => handleChoose('family')}
            className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl inline-flex items-center gap-2"
          >
            Start Your Free Trial
            <TrendingUp className="w-5 h-5" />
          </button>
          <p className="text-primary-100 mt-4">14 days free • No credit card required • Cancel anytime</p>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
