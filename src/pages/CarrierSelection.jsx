import React, { useState } from 'react';
import { FiStar, FiTruck, FiDollarSign, FiClock } from 'react-icons/fi';

function CarrierSelection() {
  const [formData, setFormData] = useState({
    productType: '',
    weight: '',
    dimensions: '',
    destination: '',
    deliveryDate: '',
  });

  const carriers = [
    {
      id: 1,
      name: 'Express Global Logistics',
      cost: '$2,450',
      deliveryTime: '5-7 days',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Swift Carriers Inc.',
      cost: '$2,100',
      deliveryTime: '7-9 days',
      rating: 4.5,
    },
    {
      id: 3,
      name: 'Pacific Route Shipping',
      cost: '$1,950',
      deliveryTime: '8-10 days',
      rating: 4.3,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipment Details Form */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-6">Shipment Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Type
              </label>
              <input
                type="text"
                name="productType"
                value={formData.productType}
                onChange={handleInputChange}
                className="input-field"
                placeholder="e.g., Electronics, Textiles"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter weight in kg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dimensions (cm)
              </label>
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleInputChange}
                className="input-field"
                placeholder="L x W x H"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter destination country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Date
              </label>
              <input
                type="date"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Get Recommendations
            </button>
          </form>
        </div>

        {/* Carrier Recommendations */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Recommended Carriers</h2>
          <div className="space-y-4">
            {carriers.map((carrier) => (
              <div key={carrier.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{carrier.name}</h3>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center">
                        <FiDollarSign className="mr-1" />
                        <span>{carrier.cost}</span>
                      </div>
                      <div className="flex items-center">
                        <FiClock className="mr-1" />
                        <span>{carrier.deliveryTime}</span>
                      </div>
                      <div className="flex items-center">
                        <FiStar className="mr-1 text-yellow-400" />
                        <span>{carrier.rating}</span>
                      </div>
                    </div>
                  </div>
                  <button className="btn-primary">Select</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarrierSelection;