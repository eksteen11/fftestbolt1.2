import React from 'react';
import { useAuthStore } from '../store/authStore';
import { createSubscriptionPayment } from '../services/payfast';
import { Wheat, ShieldCheck, Clock, Check } from 'lucide-react';

export default function SubscriptionPage() {
  const { user } = useAuthStore();

  const handleSubscribe = () => {
    if (user) {
      createSubscriptionPayment({
        email: user.email,
        name: user.name,
        userId: user.id,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-sage-100/50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-block bg-harvest-100 text-harvest-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Premium Access
          </div>
          <h1 className="text-4xl font-bold text-earth-900 mb-4">
            Unlock Full Marketplace Access
          </h1>
          <p className="text-xl text-earth-600">
            Join our community of agricultural professionals
          </p>
        </div>

        <div className="card p-8 bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-baseline mb-4">
              <span className="text-5xl font-bold text-harvest-500">R299</span>
              <span className="text-earth-500 ml-2">/month</span>
            </div>
            <p className="text-earth-600 text-center max-w-md">
              Get unlimited access to all features and connect directly with verified suppliers
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              'Access to complete product catalog',
              'Direct communication with suppliers',
              'Real-time price updates and alerts',
              'Market analysis and trends',
              'Priority customer support',
              'Cancel anytime',
            ].map((feature, index) => (
              <div key={index} className="flex items-center">
                <Check className="h-5 w-5 text-harvest-500 mr-3 flex-shrink-0" />
                <span className="text-earth-700">{feature}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubscribe}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <span>Subscribe Now</span>
            <Wheat className="h-5 w-5" />
          </button>

          <p className="text-center text-earth-500 text-sm mt-4">
            Secure payment powered by PayFast
          </p>
        </div>
      </div>
    </div>
  );
}