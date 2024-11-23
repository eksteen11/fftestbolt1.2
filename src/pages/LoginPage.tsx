import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { loginUser } from '../services/auth';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await loginUser(formData);
      setUser(user);
      toast.success('Welcome back!');
      navigate('/products');
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sage-50 to-sage-100/50 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-earth-900 mb-2">Welcome Back</h1>
          <p className="text-earth-600">Sign in to access the marketplace</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <div>
            <label htmlFor="email" className="label">Email</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="input pl-10"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-earth-400" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="label">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="input pl-10"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-earth-400" />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            Sign In
          </button>

          <p className="text-center text-earth-600 text-sm">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-harvest-500 hover:text-harvest-600 font-medium"
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}