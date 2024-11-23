import axios from 'axios';

const PAYFAST_MERCHANT_ID = import.meta.env.VITE_PAYFAST_MERCHANT_ID;
const PAYFAST_MERCHANT_KEY = import.meta.env.VITE_PAYFAST_MERCHANT_KEY;
const PAYFAST_PASSPHRASE = import.meta.env.VITE_PAYFAST_PASSPHRASE;

export const createSubscriptionPayment = (userData: {
  email: string;
  name: string;
  userId: string;
}) => {
  const data = {
    merchant_id: PAYFAST_MERCHANT_ID,
    merchant_key: PAYFAST_MERCHANT_KEY,
    return_url: `${window.location.origin}/subscription/success`,
    cancel_url: `${window.location.origin}/subscription/cancel`,
    notify_url: `${import.meta.env.VITE_API_URL}/subscription/notify`,
    name_first: userData.name,
    email_address: userData.email,
    m_payment_id: userData.userId,
    amount: '299.00',
    item_name: 'Farm Feed Monthly Subscription',
    subscription_type: '1',
    billing_date: new Date().toISOString().split('T')[0],
    recurring_amount: '299.00',
    frequency: '3',
    cycles: '0',
  };

  // Generate signature (implement according to PayFast documentation)
  // Redirect to PayFast payment page
  const paymentUrl = `https://sandbox.payfast.co.za/eng/process?${new URLSearchParams(
    data
  ).toString()}`;
  
  window.location.href = paymentUrl;
};