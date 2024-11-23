import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { registerUser } from '../services/auth';
import toast from 'react-hot-toast';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await registerUser(formData);
      setUser(user);
      toast.success('Registration successful!');
      navigate('/subscription');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed. Please try again.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sage-50 to-sage-100/50 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-earth-900 mb-2">Create Account</h1>
          <p className="text-earth-600">Join our agricultural marketplace</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <div>
            <label htmlFor="name" className="label">Full Name</label>
            <div className="relative">
              <input
                type="text"
                id="name"
                className="input pl-10"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isLoading}
              />
              <User className="absolute left-3 top-2.5 h-5 w-5 text-earth-400" />
            </div>
          </div>

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
                disabled={isLoading}
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
                minLength={8}
                disabled={isLoading}
              />
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-earth-400" />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>

          <p className="text-center text-earth-600 text-sm">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-harvest-500 hover:text-harvest-600 font-medium"
              disabled={isLoading}
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}