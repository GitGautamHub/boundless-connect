import React from "react";
import { FiPackage, FiClock, FiCheckCircle, FiBell, FiTruck, FiMapPin } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const shipmentData = [
    { month: "Jan", shipments: 65 },
    { month: "Feb", shipments: 85 },
    { month: "Mar", shipments: 73 },
    { month: "Apr", shipments: 92 },
    { month: "May", shipments: 78 },
    { month: "Jun", shipments: 95 },
  ];

  const stats = [
    { icon: <FiPackage />, label: "Total Shipments", value: "486" },
    { icon: <FiClock />, label: "Pending", value: "24" },
    { icon: <FiCheckCircle />, label: "Completed", value: "462" },
  ];

  const alerts = [
    {
      id: 1,
      message: "Shipment #12345 requires customs documentation.",
      type: "warning",
    },
    {
      id: 2,
      message: "New carrier rates are available for review.",
      type: "info",
    },
  ];

  const topCarriers = [
    { name: "Swift Carriers Inc.", shipments: 120 },
    { name: "Pacific Route Shipping", shipments: 95 },
    { name: "Global Logistics", shipments: 75 },
  ];

  const frequentDestinations = [
    { location: "New York, USA", shipments: 145 },
    { location: "Berlin, Germany", shipments: 120 },
    { location: "Tokyo, Japan", shipments: 90 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 transform hover:scale-105 transition-transform duration-200"
          >
            <div className="p-4 rounded-full bg-blue-100 text-blue-600 text-3xl">
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Alerts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-4">
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create New Shipment
            </button>
            <button
              className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Upload Documents
            </button>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Alerts</h2>
            <FiBell className="text-blue-500 text-2xl" />
          </div>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg shadow-sm ${
                  alert.type === "warning"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {alert.message}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Carriers Used */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Top Carriers Used
        </h2>
        <ul className="space-y-3">
          {topCarriers.map((carrier, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
            >
              <span className="flex items-center space-x-3">
                <FiTruck className="text-blue-500 text-xl" />
                <span>{carrier.name}</span>
              </span>
              <span className="text-gray-600">{carrier.shipments} Shipments</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Frequent Destinations */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Frequent Destinations
        </h2>
        <ul className="space-y-3">
          {frequentDestinations.map((destination, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
            >
              <span className="flex items-center space-x-3">
                <FiMapPin className="text-blue-500 text-xl" />
                <span>{destination.location}</span>
              </span>
              <span className="text-gray-600">{destination.shipments} Shipments</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Shipment Analytics */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Shipment Analytics
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={shipmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ fontSize: "14px" }} />
              <Bar dataKey="shipments" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
