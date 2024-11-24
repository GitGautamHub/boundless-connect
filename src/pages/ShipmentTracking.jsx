import React, { useState } from "react";
import { Search, Package, CheckCircle, Truck, Flag, Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ShipmentMap = ({ source, destination, currentLocation }) => (
  <div className="relative w-full h-full bg-gradient-to-b from-blue-100 to-gray-200 rounded-lg overflow-hidden">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
      className="w-full h-full"
    >
      <pattern
        id="grid"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        className="opacity-25"
      >
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ccc" strokeWidth="1" />
      </pattern>
      <rect width="800" height="600" fill="url(#grid)" />
      <path
        d="M150 100 Q400 50 650 100 Q750 250 600 400 Q400 550 200 450 Q100 250 150 100"
        fill="#d6e9f8"
        stroke="#a0c4e2"
        strokeWidth="2"
      />
      <path
        d="M600 200 L400 300 L200 400"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeDasharray="5,5"
        fill="none"
      />
      <circle cx="600" cy="200" r="8" fill="#3b82f6" />
      <text x="620" y="205" fontFamily="Arial" fontSize="16" fill="#1f2937">
        {source}
      </text>
      <circle cx="400" cy="300" r="12" fill="#ef4444" />
      <text x="420" y="305" fontFamily="Arial" fontSize="16" fill="#1f2937">
        {currentLocation}
      </text>
      <circle cx="400" cy="300" r="20" fill="#ef4444" opacity="0.3">
        <animate
          attributeName="r"
          values="12;20;12"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.3;0;0.3"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="200" cy="400" r="8" fill="#3b82f6" />
      <text x="220" y="405" fontFamily="Arial" fontSize="16" fill="#1f2937">
        {destination}
      </text>
    </svg>
  </div>
);

const ShipmentTracking = () => {
  const [trackingId, setTrackingId] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const shipmentStatus = {
    id: "SHP123456789",
    status: "In Transit",
    location: "Frankfurt, Germany",
    estimatedDelivery: "2024-11-27",
    source: "Delhi, India",
    destination: "Paris, France",
    distance: 7600, // Mock distance in kilometers
    timeline: [
      {
        id: 1,
        status: "Order Placed",
        date: "2024-11-20",
        time: "09:00 AM",
        icon: <Package size={20} />,
        completed: true,
      },
      {
        id: 2,
        status: "Customs Cleared",
        date: "2024-11-21",
        time: "02:30 PM",
        icon: <CheckCircle size={20} />,
        completed: true,
      },
      {
        id: 3,
        status: "In Transit",
        date: "2024-11-22",
        time: "10:15 AM",
        icon: <Truck size={20} />,
        completed: true,
      },
      {
        id: 4,
        status: "Out for Delivery",
        date: "2024-11-23",
        time: "Pending",
        icon: <Flag size={20} />,
        completed: false,
      },
    ],
  };

  const co2Emission = (shipmentStatus.distance * 0.02).toFixed(2); // Mock calculation: 0.02 kg CO2 per km

  const handleTrack = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowResults(false);

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call delay

    // Check if the entered tracking ID matches the mock data
    if (trackingId.trim() === shipmentStatus.id) {
      setShowResults(true);
    } else {
      alert("Tracking ID not found. Please try again with a valid ID.");
    }

    setIsLoading(false);
  };

  const MapView = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white p-6 rounded-lg w-11/12 max-w-4xl h-3/4 overflow-hidden"
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Live Tracking Map</h2>
          <button
            onClick={() => setShowMap(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <ShipmentMap
          source={shipmentStatus.source}
          destination={shipmentStatus.destination}
          currentLocation={shipmentStatus.location}
        />
      </motion.div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Instruction for User */}
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-4">
        <p>
          To view the tracking details, please enter the Tracking ID:{" "}
          <strong>SHP123456789</strong>
        </p>
      </div>
      {/* Search Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <form onSubmit={handleTrack} className="flex gap-4">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter Shipment ID"
            className="flex-grow px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin mr-2">⭮</span>
            ) : (
              <Search className="mr-2" size={20} />
            )}
            Track Shipment
          </button>
        </form>
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold">Shipment Status</h2>
                <p className="text-sm text-gray-600 mt-2">
                  Tracking ID: {shipmentStatus.id}
                </p>
                <h3 className="text-lg font-semibold mt-2">
                  {shipmentStatus.status}
                </h3>
                <p className="text-gray-600">
                  Current Location: {shipmentStatus.location}
                </p>
                <p className="text-gray-600">
                  Estimated Delivery: {shipmentStatus.estimatedDelivery}
                </p>
                <button
                  onClick={() => setShowMap(true)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  View Live Map
                </button>
              </div>
              <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Shipment Timeline
                </h2>
                <div className="space-y-4">
                  {shipmentStatus.timeline.map((event) => (
                    <div
                      key={event.id}
                      className={`flex items-start gap-4 ${
                        event.completed ? "opacity-100" : "opacity-50"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-full ${
                          event.completed
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {event.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {event.status}
                        </h3>
                        <p className="text-gray-600">
                          {event.date} | {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Carbon Footprint Estimator */}
            <div className="mt-8 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold">
                Carbon Footprint Estimator
              </h2>
              <p className="text-gray-600 mt-2">
                Your shipment has an estimated environmental impact of{" "}
                <span className="text-green-600 font-bold">
                  {co2Emission} kg of CO₂
                </span>
                .
              </p>
              <p className="text-gray-600 mt-2">
                Contribute to sustainability by offsetting your carbon footprint
                through our partner programs.
              </p>
              <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Offset Carbon Footprint
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{showMap && <MapView />}</AnimatePresence>
    </div>
  );
};

export default ShipmentTracking;
