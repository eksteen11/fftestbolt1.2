import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: number;
  unit: string;
  image: string;
  seller: string;
  category: string;
}

export default function ProductCard({ name, price, unit, image, seller, category }: ProductCardProps) {
  return (
    <div className="card group overflow-hidden">
      <div className="relative h-64">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="badge bg-white/90 backdrop-blur-sm">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-earth-500 fill-earth-500" />
            ))}
          </div>
          <h3 className="font-montserrat text-xl font-semibold text-forest-800 mb-1">
            {name}
          </h3>
          <p className="text-forest-600 text-sm">by {seller}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-forest-700">R{price}</span>
            <span className="text-forest-500 ml-1">/{unit}</span>
          </div>
          <button className="btn-primary !p-3 aspect-square">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}