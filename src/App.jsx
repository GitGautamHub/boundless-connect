import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CarrierSelection from './pages/CarrierSelection';
import ShipmentTracking from './pages/ShipmentTracking';
import DocumentManagement from './pages/DocumentManagement';
import Auth from './pages/Auth';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/carrier-selection" element={<CarrierSelection />} />
            <Route path="/shipment-tracking" element={<ShipmentTracking />} />
            <Route path="/documents" element={<DocumentManagement />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
        <Chatbot />
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;