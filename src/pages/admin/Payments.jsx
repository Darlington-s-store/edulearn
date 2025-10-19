import React, { useState } from 'react';
import { 
  CreditCard, 
  Download,
  Filter,
  Eye,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

function Payments() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [filterStatus, setFilterStatus] = useState('all');

  const payments = [
    {
      id: 1,
      studentName: 'Emma Johnson',
      email: 'emma.johnson@email.com',
      plan: 'Individual Plan',
      amount: 500,
      currency: '₵',
      date: '2024-02-12',
      status: 'completed',
      method: 'Paystack',
      transactionId: 'PAY_123456789',
      nextBilling: '2024-03-12'
    },
    {
      id: 2,
      studentName: 'Chen Family',
      email: 'chen.family@email.com',
      plan: 'Family Plan',
      amount: 1200,
      currency: '₵',
      date: '2024-02-10',
      status: 'completed',
      method: 'Paystack',
      transactionId: 'PAY_987654321',
      nextBilling: '2024-03-10'
    },
    {
      id: 3,
      studentName: 'Sarah Williams',
      email: 'sarah.williams@email.com',
      plan: 'Individual Plan',
      amount: 500,
      currency: '₵',
      date: '2024-02-08',
      status: 'pending',
      method: 'Paystack',
      transactionId: 'PAY_456789123',
      nextBilling: '2024-03-08'
    },
    {
      id: 4,
      studentName: 'Brown Family',
      email: 'brown.family@email.com',
      plan: 'Family Plan',
      amount: 1200,
      currency: '₵',
      date: '2024-02-05',
      status: 'failed',
      method: 'Paystack',
      transactionId: 'PAY_789123456',
      nextBilling: '2024-03-05'
    }
  ];

  const paymentStats = {
    totalRevenue: 61200,
    monthlyGrowth: 18,
    totalSubscribers: 201,
    successRate: 94
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-mint-100 text-mint-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      case 'refunded':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Individual Plan':
        return 'bg-blue-100 text-blue-700';
      case 'Family Plan':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesFilter = filterStatus === 'all' || payment.status === filterStatus;
    return matchesFilter;
  });

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 font-playful">Payments & Billing 💳</h1>
            <p className="text-gray-600 mt-2">Monitor subscription payments and revenue analytics</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button className="btn-secondary flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="btn-primary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-mint-600">₵{paymentStats.totalRevenue.toLocaleString()}</p>
              <p className="text-gray-600 text-sm">Total Revenue</p>
            </div>
            <DollarSign className="w-8 h-8 text-mint-500" />
          </div>
          <div className="mt-2">
            <span className="text-mint-600 text-sm font-medium">+{paymentStats.monthlyGrowth}% this month</span>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary-600">{paymentStats.totalSubscribers}</p>
              <p className="text-gray-600 text-sm">Active Subscribers</p>
            </div>
            <Users className="w-8 h-8 text-primary-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-yellow-600">{paymentStats.successRate}%</p>
              <p className="text-gray-600 text-sm">Success Rate</p>
            </div>
            <CheckCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">₵{Math.round(paymentStats.totalRevenue / paymentStats.totalSubscribers)}</p>
              <p className="text-gray-600 text-sm">Avg Revenue/User</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>

      {/* Payments Table */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Payments</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Plan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Method</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Transaction ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Next Billing</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-800">{payment.studentName}</p>
                      <p className="text-sm text-gray-500">{payment.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(payment.plan)}`}>
                      {payment.plan}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-800">
                      {payment.currency}{payment.amount}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-600">{payment.date}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-600">{payment.method}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-500 font-mono">{payment.transactionId}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-600">{payment.nextBilling}</span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">No payments found</h3>
          <p className="text-gray-400">No payments match your current filter criteria.</p>
        </div>
      )}

      {/* Revenue Chart Placeholder */}
      <div className="mt-8 card p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Revenue Trends</h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Revenue chart would be displayed here</p>
            <p className="text-sm text-gray-400">Integration with charting library needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payments;
