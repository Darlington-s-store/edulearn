import React from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

function SubscriptionPlans({ onSelectPlan }) {
  const pricingPlans = [
    {
      id: 'individual',
      name: "Individual Plan",
      price: "₵500",
      period: "per month",
      yearlyPrice: "₵5,000",
      yearlyPeriod: "per year",
      description: "Perfect for individual students",
      features: [
        "Access to all live classes",
        "Assignment submissions",
        "Points & leaderboard",
        "Learning modules",
        "Community access",
        "Progress tracking"
      ],
      popular: false,
      savings: "Save ₵1,000 yearly"
    },
    {
      id: 'family',
      name: "Family Plan",
      price: "₵1,200",
      period: "per month",
      yearlyPrice: "₵12,000",
      yearlyPeriod: "per year",
      description: "Great for families with up to 4 children",
      features: [
        "Up to 4 student accounts",
        "Individual login IDs for each child",
        "All Individual Plan features",
        "Family dashboard",
        "Parental controls",
        "Priority support",
        "Bulk progress reports"
      ],
      popular: true,
      savings: "Save ₵2,400 yearly"
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 font-playful">
          Choose Your Learning Adventure
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Select the perfect plan for your learning needs. All plans include our amazing features!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <div key={index} className={`card p-8 relative ${plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-primary-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              
              {/* Monthly Pricing */}
              <div className="mb-4">
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
              </div>
              
              {/* Yearly Pricing */}
              <div className="bg-mint-50 rounded-lg p-3 mb-4">
                <div className="flex items-baseline justify-center">
                  <span className="text-2xl font-bold text-mint-700">{plan.yearlyPrice}</span>
                  <span className="text-mint-600 ml-2">/{plan.yearlyPeriod}</span>
                </div>
                <p className="text-sm text-mint-600 font-medium mt-1">{plan.savings}</p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-mint-500 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => onSelectPlan(plan)}
                className={`block text-center w-full py-3 px-6 rounded-2xl font-medium transition-all duration-200 ${
                  plan.popular 
                    ? 'btn-primary' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Subscribe Monthly
              </button>
              <button 
                onClick={() => onSelectPlan(plan)}
                className="block text-center w-full py-3 px-6 rounded-2xl font-medium bg-mint-100 hover:bg-mint-200 text-mint-700 transition-all duration-200"
              >
                Subscribe Yearly (Save More!)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubscriptionPlans;