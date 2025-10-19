import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import SubscriptionPlans from './SubscriptionPlans';

function SubscriptionStep({ onNext, onBack, selectedPlan, setSelectedPlan }) {
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 font-playful mb-2">Choose Your Learning Plan</h2>
        <p className="text-gray-600">Select a subscription plan to unlock all features.</p>
      </div>

      <SubscriptionPlans onSelectPlan={handleSelectPlan} />

      {selectedPlan && (
        <div className="bg-mint-50 border border-mint-200 text-mint-800 p-4 rounded-xl flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-mint-600" />
          <span>You have selected the <span className="font-semibold">{selectedPlan.name}</span>.</span>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!selectedPlan}
          className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed to Payment <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default SubscriptionStep;