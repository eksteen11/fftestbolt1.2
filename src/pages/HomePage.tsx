import React from 'react';
import { ArrowRight, Leaf, ShieldCheck, TrendingUp } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Video */}
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"
          >
            <source 
              src="https://player.vimeo.com/progressive_redirect/playback/735428933/rendition/720p/file.mp4?loc=external" 
              type="video/mp4"
            />
            {/* Fallback image if video fails to load */}
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"
              alt="Agricultural landscape"
              className="w-full h-full object-cover"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/95 via-forest-900/80 to-forest-900/70" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="lg:w-2/3">
            <div className="flex items-center space-x-2 mb-6">
              <span className="inline-flex items-center bg-forest-500/20 text-forest-50 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                <Leaf className="w-4 h-4 mr-2" />
                Sustainable Agriculture
              </span>
            </div>
            <h1 className="font-montserrat text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your Premium Marketplace for Quality Feed & Grains
            </h1>
            <p className="text-xl text-forest-50 mb-8 font-inter max-w-xl">
              Connect directly with verified farmers and suppliers. Get competitive prices on premium agricultural products.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary bg-forest-500 hover:bg-forest-600 transform hover:scale-105 transition-all duration-300">
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </button>
              <button className="btn-secondary bg-earth-500 hover:bg-earth-600 transform hover:scale-105 transition-all duration-300">
                Calculate Shipping
              </button>
            </div>
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <div className="w-1 h-16 rounded-full bg-gradient-to-b from-forest-50/80 to-forest-50/0" />
          <span className="text-forest-50/80 text-sm mt-2">Scroll to explore</span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: '10K+',
                label: 'Active Farmers',
                description: 'Trusted suppliers worldwide',
                icon: ShieldCheck
              },
              {
                stat: '95%',
                label: 'Success Rate',
                description: 'In delivery and quality',
                icon: TrendingUp
              },
              {
                stat: '100%',
                label: 'Organic Options',
                description: 'Sustainable practices',
                icon: Leaf
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="card p-6 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-forest-500" />
                </div>
                <div className="font-montserrat text-3xl font-bold text-forest-500 mb-1">
                  {item.stat}
                </div>
                <div className="font-semibold text-forest-800 mb-2">
                  {item.label}
                </div>
                <p className="text-forest-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-24 bg-gradient-to-b from-white to-forest-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-4xl font-bold text-forest-800 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-forest-600 max-w-2xl mx-auto">
              Discover our selection of premium agricultural products from verified suppliers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn-primary inline-flex items-center transform hover:scale-105 transition-all duration-300">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-forest-900 text-white">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-10"
          >
            <source 
              src="https://player.vimeo.com/progressive_redirect/playback/735428933/rendition/720p/file.mp4?loc=external" 
              type="video/mp4"
            />
          </video>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="lg:w-2/3">
            <h2 className="font-montserrat text-4xl font-bold mb-6">
              Ready to Transform Your Agricultural Supply Chain?
            </h2>
            <p className="text-xl text-forest-50 mb-8">
              Join thousands of farmers and suppliers who trust our platform for their agricultural needs.
            </p>
            <button className="btn-primary bg-forest-500 hover:bg-forest-600 transform hover:scale-105 transition-all duration-300">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5 inline" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}