import React, { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

type Filter = {
  category: string[];
  priceRange: string;
  seller: string[];
};

export default function ProductsPage() {
  const [filters, setFilters] = useState<Filter>({
    category: [],
    priceRange: '',
    seller: [],
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = ['Grains', 'Feed', 'Supplements', 'Organic'];
  const sellers = ['Thompson Farms', 'Green Valley Co-op', 'Midwest Grains Inc', 'Organic Feeds Ltd'];
  const priceRanges = [
    { label: 'Under $200', value: '0-200' },
    { label: '$200 - $500', value: '200-500' },
    { label: '$500 - $1000', value: '500-1000' },
    { label: 'Over $1000', value: '1000+' },
  ];

  const toggleFilter = (type: keyof Filter, value: string) => {
    setFilters(prev => {
      if (type === 'priceRange') {
        return { ...prev, [type]: prev[type] === value ? '' : value };
      }
      const array = prev[type] as string[];
      return {
        ...prev,
        [type]: array.includes(value)
          ? array.filter(item => item !== value)
          : [...array, value],
      };
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = filters.category.length === 0 || 
      filters.category.includes(product.category);
    const matchesSeller = filters.seller.length === 0 || 
      filters.seller.includes(product.seller);
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      const matchesPrice = max 
        ? product.price >= min && product.price <= max
        : product.price >= min;
      return matchesCategory && matchesSeller && matchesPrice;
    }
    
    return matchesCategory && matchesSeller;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
        <button
          onClick={() => setShowMobileFilters(true)}
          className="lg:hidden btn-primary flex items-center"
        >
          <SlidersHorizontal className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4">Filters</h2>
            
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.category.includes(category)}
                        onChange={() => toggleFilter('category', category)}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="ml-2 text-gray-600">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <label key={range.value} className="flex items-center">
                      <input
                        type="radio"
                        name="price"
                        checked={filters.priceRange === range.value}
                        onChange={() => toggleFilter('priceRange', range.value)}
                        className="border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="ml-2 text-gray-600">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sellers */}
              <div>
                <h3 className="font-medium mb-2">Sellers</h3>
                <div className="space-y-2">
                  {sellers.map(seller => (
                    <label key={seller} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.seller.includes(seller)}
                        onChange={() => toggleFilter('seller', seller)}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="ml-2 text-gray-600">{seller}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)} />
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-semibold text-lg">Filters</h2>
                  <button onClick={() => setShowMobileFilters(false)}>
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Mobile Categories */}
                  <div>
                    <h3 className="font-medium mb-2">Categories</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <label key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.category.includes(category)}
                            onChange={() => toggleFilter('category', category)}
                            className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                          />
                          <span className="ml-2 text-gray-600">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Price Range */}
                  <div>
                    <h3 className="font-medium mb-2">Price Range</h3>
                    <div className="space-y-2">
                      {priceRanges.map(range => (
                        <label key={range.value} className="flex items-center">
                          <input
                            type="radio"
                            name="price-mobile"
                            checked={filters.priceRange === range.value}
                            onChange={() => toggleFilter('priceRange', range.value)}
                            className="border-gray-300 text-amber-600 focus:ring-amber-500"
                          />
                          <span className="ml-2 text-gray-600">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Sellers */}
                  <div>
                    <h3 className="font-medium mb-2">Sellers</h3>
                    <div className="space-y-2">
                      {sellers.map(seller => (
                        <label key={seller} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.seller.includes(seller)}
                            onChange={() => toggleFilter('seller', seller)}
                            className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                          />
                          <span className="ml-2 text-gray-600">{seller}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products match your selected filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}