import React, { useState } from 'react';
import { FiSearch, FiPackage, FiCheck, FiTruck, FiFlag } from 'react-icons/fi';

function ShipmentTracking() {
  const [trackingId, setTrackingId] = useState('');
  
  const shipmentStatus = {
    id: 'SHP123456789',
    status: 'In Transit',
    location: 'Frankfurt, Germany',
    estimatedDelivery: '2024-03-25',
    timeline: [
      {
        id: 1,
        status: 'Order Placed',
        date: '2024-03-20',
        time: '09:00 AM',
        icon: <FiPackage />,
        completed: true,
      },
      {
        id: 2,
        status: 'Customs Cleared',
        date: '2024-03-21',
        time: '02:30 PM',
        icon: <FiCheck />,
        completed: true,
      },
      {
        id: 3,
        status: 'In Transit',
        date: '2024-03-22',
        time: '10:15 AM',
        icon: <FiTruck />,
        completed: true,
      },
      {
        id: 4,
        status: 'Out for Delivery',
        date: '2024-03-25',
        time: 'Pending',
        icon: <FiFlag />,
        completed: false,
      },
    ],
  };

  const handleTrack = (e) => {
    e.preventDefault();
    // Handle tracking logic
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Section */}
      <div className="card mb-8">
        <form onSubmit={handleTrack} className="flex gap-4">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter Shipment ID"
            className="input-field flex-grow"
          />
          <button type="submit" className="btn-primary flex items-center">
            <FiSearch className="mr-2" />
            Track Shipment
          </button>
        </form>
      </div>

      {/* Shipment Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Status Summary */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Shipment Status</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Tracking ID</p>
                <p className="font-semibold">{shipmentStatus.id}</p>
              </div>
              <div>
                <p className="text-gray-600">Current Status</p>
                <p className="font-semibold text-primary-600">{shipmentStatus.status}</p>
              </div>
              <div>
                <p className="text-gray-600">Current Location</p>
                <p className="font-semibold">{shipmentStatus.location}</p>
              </div>
              <div>
                <p className="text-gray-600">Estimated Delivery</p>
                <p className="font-semibold">{shipmentStatus.estimatedDelivery}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Tracking Timeline</h2>
            <div className="space-y-8">
              {shipmentStatus.timeline.map((event, index) => (
                <div key={event.id} className="relative flex items-center">
                  {index !== 0 && (
                    <div
                      className={`absolute top-0 left-6 -ml-px h-full w-0.5 ${
                        event.completed ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                      style={{ transform: 'translateY(-50%)' }}
                    />
                  )}
                  <div
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full ${
                      event.completed ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className="text-white">{event.icon}</span>
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-semibold">{event.status}</h3>
                    <p className="text-gray-600">
                      {event.date} - {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShipmentTracking;