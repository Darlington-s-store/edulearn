import React, { useState } from 'react';
import { CreditCard, CheckCircle, XCircle, DollarSign, Calendar, Users, ArrowRight, Info } from 'lucide-react';
import SubscriptionPlans from '../../components/SubscriptionPlans';

function SubscriptionManagement() {
  const [currentPlan, setCurrentPlan] = useState({
    name: "Family Plan",
    status: "Active",
    nextBillingDate: "2024-11-15",
    price: "₵1,200",
    students: 3,
    maxStudents: 4
  });

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleCancelSubscription = () => {
    if (window.confirm("Are you sure you want to cancel your subscription? This action cannot be undone.")) {
      alert("Subscription cancelled.");
      setCurrentPlan(prev => ({ ...prev, status: "Cancelled" }));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 font-playful">
          Subscription Management 💳
        </h1>
        <p className="text-gray-600 mt-2">View and manage your current plan and billing details</p>
      </div>

      {/* Current Plan Overview */}
      <div className="card p-8 mb-8 bg-gradient-to-br from-primary-500 to-purple-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">{currentPlan.name}</h2>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              currentPlan.status === 'Active' ? 'bg-mint-100 text-mint-800' : 'bg-red-100 text-red-800'
            }`}>
              {currentPlan.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-primary-100 text-sm mb-1">Monthly Cost</p>
              <p className="text-4xl font-bold">{currentPlan.price}</p>
            </div>
            <div>
              <p className="text-primary-100 text-sm mb-1">Next Billing Date</p>
              <p className="text-2xl font-bold flex items-center gap-2">
                <Calendar className="w-6 h-6" /> {currentPlan.nextBillingDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-primary-100 mb-8">
            <Users className="w-5 h-5" />
            <span>{currentPlan.students} of {currentPlan.maxStudents} student accounts in use</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Change Plan <ArrowRight className="w-5 h-5" />
            </button>
            {currentPlan.status === 'Active' && (
              <button
                onClick={handleCancelSubscription}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Cancel Subscription <XCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-mint-600" /> Billing History
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023-10-15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₵1,200</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600 hover:underline cursor-pointer">
                  Download
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023-09-15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₵1,200</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600 hover:underline cursor-pointer">
                  Download
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ/Help Section */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Info className="w-5 h-5 text-yellow-600" /> Need Help?
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>If you have any questions about your subscription, billing, or need to make changes not available here, please contact our support team.</p>
          <button className="btn-primary py-2 px-4">Contact Support</button>
        </div>
      </div>

      {/* Upgrade/Change Plan Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Choose Your New Plan</h2>
              <button onClick={() => setShowUpgradeModal(false)} className="text-white hover:bg-white/20 p-2 rounded-lg">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <SubscriptionPlans onSelectPlan={(plan) => {
                alert(`Selected plan: ${plan.name}. Proceeding to payment...`);
                setShowUpgradeModal(false);
                // In a real app, integrate with Paystack here
              }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubscriptionManagement;