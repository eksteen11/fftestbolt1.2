import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const updateSubscription = async (subscriptionData: {
  token: string;
  paymentId: string;
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/subscription/verify`,
      subscriptionData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
};