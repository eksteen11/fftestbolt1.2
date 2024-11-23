import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wheat, ShoppingCart, Search, Menu, User, Ship } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();
  
  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-sage-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-harvest-500 text-white p-2 rounded-lg">
              <Wheat className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-earth-900">Farm Feed</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="input pl-10 w-64"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-earth-400" />
            </div>
            
            <nav className="flex space-x-8">
              <Link 
                to="/products" 
                className={`text-earth-600 hover:text-harvest-500 transition-colors ${
                  location.pathname === '/products' ? 'text-harvest-500 font-medium' : ''
                }`}
              >
                Products
              </Link>
              <Link 
                to="/shipping-calculator" 
                className={`text-earth-600 hover:text-harvest-500 transition-colors ${
                  location.pathname === '/shipping-calculator' ? 'text-harvest-500 font-medium' : ''
                }`}
              >
                <div className="flex items-center space-x-1">
                  <Ship className="h-4 w-4" />
                  <span>Shipping</span>
                </div>
              </Link>
              <Link 
                to="/subscription" 
                className={`text-earth-600 hover:text-harvest-500 transition-colors ${
                  location.pathname === '/subscription' ? 'text-harvest-500 font-medium' : ''
                }`}
              >
                Pricing
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-sage-100 rounded-lg transition-colors">
                <ShoppingCart className="h-6 w-6 text-earth-600" />
              </button>
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <span className="text-earth-600">{user?.name}</span>
                  <div className="w-8 h-8 bg-sage-200 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-earth-600" />
                  </div>
                </div>
              ) : (
                <Link to="/login" className="btn-primary">
                  Sign In
                </Link>
              )}
            </div>
          </div>
          
          <button className="md:hidden p-2 hover:bg-sage-100 rounded-lg">
            <Menu className="h-6 w-6 text-earth-600" />
          </button>
        </div>
      </div>
    </nav>
  );
}