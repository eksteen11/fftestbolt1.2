import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SubscriptionPage from './pages/SubscriptionPage';
import ShippingCalculatorPage from './pages/ShippingCalculatorPage';
import AuthGuard from './components/AuthGuard';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { checkAuth } from './services/auth';

export default function App() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      const user = await checkAuth();
      if (user) {
        setUser(user);
      }
    };
    initAuth();
  }, [setUser]);

  return (
    <div className="min-h-screen bg-sage-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/shipping-calculator" element={<ShippingCalculatorPage />} />
        <Route
          path="/products"
          element={
            <AuthGuard requireSubscription>
              <ProductsPage />
            </AuthGuard>
          }
        />
        <Route
          path="/subscription"
          element={
            <AuthGuard>
              <SubscriptionPage />
            </AuthGuard>
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}