import React, { useState } from 'react';
import { Ship, DollarSign, Calculator, Package } from 'lucide-react';

interface ShippingRates {
  [key: string]: {
    [key: string]: number;
  };
}

const SHIPPING_RATES: ShippingRates = {
  '20ft': {
    'United States': 3200,
    'United Kingdom': 2800,
    'China': 2500,
    'India': 2300,
    'Brazil': 2900,
    'Nigeria': 3100,
    'Kenya': 2400,
    'UAE': 2600
  },
  '40ft': {
    'United States': 4800,
    'United Kingdom': 4200,
    'China': 3800,
    'India': 3500,
    'Brazil': 4300,
    'Nigeria': 4600,
    'Kenya': 3600,
    'UAE': 3900
  }
};

const CONTAINER_CAPACITY = {
  '20ft': 28000, // kg
  '40ft': 32500  // kg
};

const PORT_FEES = 850; // Base port fees in USD
const INSURANCE_RATE = 0.01; // 1% of cargo value

export default function ShippingCalculatorPage() {
  const [formData, setFormData] = useState({
    productPrice: 0, // Price per ton
    quantity: 0,     // In tons
    destination: 'United States',
    containerSize: '20ft',
  });

  const [results, setResults] = useState<{
    fob: number;
    cif: number;
    containers: number;
    totalWeight: number;
    insurance: number;
    shippingCost: number;
  } | null>(null);

  const calculateShipping = () => {
    const totalWeight = formData.quantity * 1000; // Convert tons to kg
    const containersNeeded = Math.ceil(
      totalWeight / CONTAINER_CAPACITY[formData.containerSize as keyof typeof CONTAINER_CAPACITY]
    );
    
    const totalProductValue = formData.productPrice * formData.quantity;
    const shippingCost = containersNeeded * SHIPPING_RATES[formData.containerSize][formData.destination];
    const insurance = totalProductValue * INSURANCE_RATE;
    
    const fobPrice = totalProductValue;
    const cifPrice = fobPrice + shippingCost + insurance + (PORT_FEES * containersNeeded);

    setResults({
      fob: fobPrice,
      cif: cifPrice,
      containers: containersNeeded,
      totalWeight,
      insurance,
      shippingCost,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-sage-100/50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-earth-900 mb-4">
            Shipping Calculator
          </h1>
          <p className="text-xl text-earth-600">
            Calculate FOB and CIF prices for bulk container shipping
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="card p-6">
            <h2 className="text-2xl font-semibold text-earth-800 mb-6 flex items-center">
              <Calculator className="h-6 w-6 mr-2 text-harvest-500" />
              Calculate Rates
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="productPrice" className="label">
                  Product Price (USD/ton)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="productPrice"
                    className="input pl-10"
                    value={formData.productPrice || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      productPrice: parseFloat(e.target.value) || 0
                    })}
                  />
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-earth-400" />
                </div>
              </div>

              <div>
                <label htmlFor="quantity" className="label">
                  Quantity (tons)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="quantity"
                    className="input pl-10"
                    value={formData.quantity || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      quantity: parseFloat(e.target.value) || 0
                    })}
                  />
                  <Package className="absolute left-3 top-2.5 h-5 w-5 text-earth-400" />
                </div>
              </div>

              <div>
                <label htmlFor="containerSize" className="label">
                  Container Size
                </label>
                <select
                  id="containerSize"
                  className="input"
                  value={formData.containerSize}
                  onChange={(e) => setFormData({
                    ...formData,
                    containerSize: e.target.value
                  })}
                >
                  <option value="20ft">20ft Container</option>
                  <option value="40ft">40ft Container</option>
                </select>
              </div>

              <div>
                <label htmlFor="destination" className="label">
                  Destination Country
                </label>
                <select
                  id="destination"
                  className="input"
                  value={formData.destination}
                  onChange={(e) => setFormData({
                    ...formData,
                    destination: e.target.value
                  })}
                >
                  {Object.keys(SHIPPING_RATES['20ft']).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={calculateShipping}
                className="btn-primary w-full mt-6"
              >
                Calculate Shipping
              </button>
            </div>
          </div>

          {/* Results Display */}
          <div className="card p-6">
            <h2 className="text-2xl font-semibold text-earth-800 mb-6 flex items-center">
              <Ship className="h-6 w-6 mr-2 text-harvest-500" />
              Shipping Details
            </h2>

            {results ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="card p-4 bg-sage-50">
                    <div className="text-earth-600 text-sm mb-1">FOB Price</div>
                    <div className="text-2xl font-bold text-harvest-500">
                      ${results.fob.toLocaleString()}
                    </div>
                  </div>
                  <div className="card p-4 bg-sage-50">
                    <div className="text-earth-600 text-sm mb-1">CIF Price</div>
                    <div className="text-2xl font-bold text-harvest-500">
                      ${results.cif.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-sage-200">
                    <span className="text-earth-600">Containers Required</span>
                    <span className="font-semibold text-earth-800">
                      {results.containers} × {formData.containerSize}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-sage-200">
                    <span className="text-earth-600">Total Weight</span>
                    <span className="font-semibold text-earth-800">
                      {(results.totalWeight / 1000).toFixed(2)} tons
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-sage-200">
                    <span className="text-earth-600">Shipping Cost</span>
                    <span className="font-semibold text-earth-800">
                      ${results.shippingCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-sage-200">
                    <span className="text-earth-600">Insurance</span>
                    <span className="font-semibold text-earth-800">
                      ${results.insurance.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-sage-200">
                    <span className="text-earth-600">Port Fees</span>
                    <span className="font-semibold text-earth-800">
                      ${(PORT_FEES * results.containers).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-sage-50 p-4 rounded-lg">
                  <div className="text-sm text-earth-600 mb-2">Price per ton (CIF)</div>
                  <div className="text-3xl font-bold text-harvest-500">
                    ${(results.cif / formData.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-earth-500 py-12">
                Enter shipping details to calculate rates
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}