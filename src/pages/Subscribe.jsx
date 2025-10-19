import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Star, Shield, Zap } from 'lucide-react';

function Subscribe() {
  const navigate = useNavigate();
  const location = useLocation();
  const [billing, setBilling] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('basic');

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      monthly: 9,
      yearly: 90,
      badge: 'Best for Starters',
      features: [
        '1 Child Profile',
        'Core Subjects Access',
        'Assignments & Quizzes',
        'Email Support'
      ]
    },
    {
      id: 'family',
      name: 'Family',
      monthly: 19,
      yearly: 190,
      badge: 'Most Popular',
      features: [
        'Up to 4 Child Profiles',
        'All Subjects + Live Classes',
        'Progress Reports',
        'Priority Support'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      monthly: 29,
      yearly: 290,
      badge: 'Advanced Learning',
      features: [
        'Unlimited Profiles',
        'AI Tutor & VR Labs',
        'Parent Controls',
        'Premium Support'
      ]
    }
  ];

  const handleSubscribe = () => {
    const userRaw = localStorage.getItem('user');
    const params = new URLSearchParams(location.search);
    const planParam = params.get('plan') || selectedPlan;
    const billParam = params.get('billing') || billing;
    if (!userRaw) {
      // Persist the user's chosen plan to resume after signup/login
      localStorage.setItem('pendingPlan', JSON.stringify({ plan: planParam, billing: billParam }));
      navigate(`/signup/parent?plan=${planParam}&billing=${billParam}`);
      return;
    }
    const user = JSON.parse(userRaw);
    const subscription = {
      planId: selectedPlan,
      billingCycle: billing,
      startedAt: new Date().toISOString()
    };
    const updatedUser = { ...user, subscription };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    localStorage.removeItem('pendingPlan');
    try { alert('Subscription successful!'); } catch (_) {}
    
    // Redirect based on user role
    switch (user.role) {
      case 'student':
        navigate('/student/dashboard');
        break;
      case 'parent':
        navigate('/student/dashboard'); // Parents can view their children's dashboard
        break;
      case 'teacher':
        navigate('/teacher/dashboard');
        break;
      case 'admin':
        navigate('/admin/dashboard');
        break;
      default:
        navigate('/');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    const bill = params.get('billing');
    if (plan) setSelectedPlan(plan);
    if (bill === 'monthly' || bill === 'yearly') setBilling(bill);
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            Secure Subscription
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-playful mb-3">Choose Your Edu-Learn Plan</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Unlock engaging learning for your child. Pick a plan and start exploring interactive lessons, quizzes, and live classes.</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          <button onClick={() => setBilling('monthly')} className={`px-4 py-2 rounded-l-xl border ${billing==='monthly'?'bg-white text-primary-600 border-primary-300':'bg-gray-100 text-gray-600 border-gray-200'}`}>Monthly</button>
          <button onClick={() => setBilling('yearly')} className={`px-4 py-2 rounded-r-xl border ${billing==='yearly'?'bg-white text-primary-600 border-primary-300':'bg-gray-100 text-gray-600 border-gray-200'}`}>Yearly <span className="ml-1 text-xs text-green-600">(Save 20%)</span></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const price = billing === 'monthly' ? plan.monthly : plan.yearly;
            const isSelected = selectedPlan === plan.id;
            return (
              <div key={plan.id} className={`relative bg-white rounded-3xl p-6 shadow-lg border-2 ${isSelected ? 'border-primary-400' : 'border-transparent'}`}>
                <div className="absolute -top-3 left-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {plan.badge}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-extrabold text-gray-900">₵{price}</span>
                  <span className="text-gray-500">/{billing === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setSelectedPlan(plan.id)} className={`w-full py-3 rounded-xl font-semibold transition-all ${isSelected ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {isSelected ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <button onClick={handleSubscribe} disabled={!selectedPlan} className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-primary-700 hover:to-purple-700 transition-all disabled:opacity-50">
            <Zap className="w-5 h-5" />
            Continue to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
