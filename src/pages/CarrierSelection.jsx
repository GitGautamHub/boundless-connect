import React, { useState } from 'react';
import { FiStar, FiTruck, FiDollarSign, FiClock } from 'react-icons/fi';
import { jsPDF } from 'jspdf';
import JsBarcode from 'jsbarcode';

function CarrierSelection() {
  const [formData, setFormData] = useState({
    productType: '',
    weight: '',
    dimensions: '',
    destination: '',
    deliveryDate: '',
    packaging: 'eco-friendly', // Default to eco-friendly packaging
  });
  const [selectedCarrier, setSelectedCarrier] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState('');
  const [filteredCarriers, setFilteredCarriers] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const carriers = [
    {
      id: 1,
      name: 'Express Global Logistics',
      cost: 2450,
      deliveryTime: '5-7 days',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Swift Carriers Inc.',
      cost: 2100,
      deliveryTime: '7-9 days',
      rating: 4.5,
    },
    {
      id: 3,
      name: 'Pacific Route Shipping',
      cost: 1950,
      deliveryTime: '8-10 days',
      rating: 4.3,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (e) => {
    const criteria = e.target.value;
    setFilterCriteria(criteria);

    let sortedCarriers = [...carriers];
    if (criteria === 'rating') {
      sortedCarriers.sort((a, b) => b.rating - a.rating);
    } else if (criteria === 'cost') {
      sortedCarriers.sort((a, b) => a.cost - b.cost);
    } else if (criteria === 'deliveryTime') {
      sortedCarriers.sort((a, b) => {
        const timeA = parseInt(a.deliveryTime.split('-')[0]);
        const timeB = parseInt(b.deliveryTime.split('-')[0]);
        return timeA - timeB;
      });
    }

    setFilteredCarriers(sortedCarriers);
    setShowRecommendations(true);
  };

  const handleCarrierSelect = (carrier) => {
    setSelectedCarrier(carrier);
  };

  const generateInvoicePDF = () => {
    const doc = new jsPDF();

    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(40, 70, 120);
    doc.text('Shipment Invoice', 105, 20, { align: 'center' });

    doc.setDrawColor(40, 70, 120);
    doc.line(20, 30, 190, 30);

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Shipment Details:', 20, 40);

    doc.setFont('Helvetica', 'italic');
    doc.text(`Product Type: ${formData.productType}`, 20, 50);
    doc.text(`Weight: ${formData.weight} kg`, 20, 60);
    doc.text(`Dimensions: ${formData.dimensions} cm`, 20, 70);
    doc.text(`Destination: ${formData.destination}`, 20, 80);
    doc.text(`Delivery Date: ${formData.deliveryDate}`, 20, 90);
    doc.text(`Packaging: ${formData.packaging}`, 20, 100);

    if (selectedCarrier) {
      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('Carrier Details:', 20, 115);

      doc.setFont('Helvetica', 'italic');
      doc.text(`Name: ${selectedCarrier.name}`, 20, 125);
      doc.text(`Cost: $${selectedCarrier.cost}`, 20, 135);
      doc.text(`Delivery Time: ${selectedCarrier.deliveryTime}`, 20, 145);
      doc.text(`Rating: ${selectedCarrier.rating} stars`, 20, 155);
    }

    doc.save('shipment_invoice.pdf');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="card mb-8">
        <h2 className="text-2xl font-semibold mb-6">Shipment Details</h2>
        <form className="space-y-4">
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
              placeholder="Enter destination address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Date
            </label>
            <input
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Packaging Material
            </label>
            <select
              name="packaging"
              value={formData.packaging}
              onChange={handleInputChange}
              className="select-field"
            >
              <option value="eco-friendly">Eco-Friendly Packaging</option>
              <option value="normal">Normal Packaging</option>
            </select>
            <p className="text-sm text-green-600 mt-2">
              Choose eco-friendly packaging to reduce your environmental impact.
            </p>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter Criteria
            </label>
            <select
              value={filterCriteria}
              onChange={handleFilterChange}
              className="select-field"
            >
              <option value="">Select Criteria</option>
              <option value="rating">Rating</option>
              <option value="cost">Cost</option>
              <option value="deliveryTime">Delivery Time</option>
            </select>
          </div>

          {showRecommendations && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Carrier Recommendations</h3>
              <div className="space-y-4">
                {filteredCarriers.map((carrier) => (
                  <div
                    key={carrier.id}
                    onClick={() => handleCarrierSelect(carrier)}
                    className="border p-4 rounded-lg shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center">
                      <FiTruck className="mr-2 text-blue-500" />
                      <span className="font-semibold">{carrier.name}</span>
                    </div>
                    <p>
                      <FiDollarSign className="mr-2 text-green-500" />
                      Cost: ${carrier.cost}
                    </p>
                    <p>
                      <FiClock className="mr-2 text-yellow-500" />
                      Delivery Time: {carrier.deliveryTime}
                    </p>
                    <p>
                      <FiStar className="mr-2 text-orange-500" />
                      Rating: {carrier.rating} Stars
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCarrier && (
            <div className="mt-6">
              <button
                type="button"
                onClick={generateInvoicePDF}
                className="btn btn-primary"
              >
                Generate Invoice PDF
              </button>
            </div>
          )}
        </form>

        <div className="mt-8 bg-green-50 border border-green-200 p-4 rounded">
          <h3 className="text-lg font-semibold text-green-800">
            Environment Tips:
          </h3>
          <ul className="list-disc list-inside text-green-700">
            <li>Opt for eco-friendly packaging to reduce waste.</li>
            <li>Combine shipments to lower carbon emissions.</li>
            <li>Choose carriers that use sustainable transportation methods.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CarrierSelection;
