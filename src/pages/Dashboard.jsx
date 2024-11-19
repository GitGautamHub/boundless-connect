import React from 'react';
import { FiPackage, FiClock, FiCheckCircle, FiBell } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const shipmentData = [
    { month: 'Jan', shipments: 65 },
    { month: 'Feb', shipments: 85 },
    { month: 'Mar', shipments: 73 },
    { month: 'Apr', shipments: 92 },
    { month: 'May', shipments: 78 },
    { month: 'Jun', shipments: 95 },
  ];

  const stats = [
    { icon: <FiPackage />, label: 'Total Shipments', value: '486' },
    { icon: <FiClock />, label: 'Pending', value: '24' },
    { icon: <FiCheckCircle />, label: 'Completed', value: '462' },
  ];

  const alerts = [
    { id: 1, message: 'Shipment #12345 requires customs documentation', type: 'warning' },
    { id: 2, message: 'New carrier rates available for review', type: 'info' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-600">{stat.label}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="btn-primary w-full">Create New Shipment</button>
            <button className="btn-secondary w-full">Upload Documents</button>
          </div>
        </div>
        
        {/* Alerts Section */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Alerts</h2>
            <FiBell className="text-primary-600" />
          </div>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg ${
                  alert.type === 'warning'
                    ? 'bg-orange-50 text-orange-700'
                    : 'bg-blue-50 text-blue-700'
                }`}
              >
                {alert.message}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shipment Analytics */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-6">Shipment Analytics</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={shipmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="shipments" fill="#0284c7" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;