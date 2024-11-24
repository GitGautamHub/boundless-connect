import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot'; // Import Chatbot component
import Home from './pages/Home'; // Adjusted path to match your structure
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import CarrierSelection from './pages/CarrierSelection';
import ShipmentTracking from './pages/ShipmentTracking';
import DocumentManagement from './pages/DocumentManagement';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login status
  const [user, setUser] = useState(null); // Store user data after login

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} user={user} setAuth={setIsAuthenticated} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/auth"
            element={
              !isAuthenticated ? (
                <Auth setAuth={setIsAuthenticated} setUser={setUser} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated && user ? (
                <>
                  <Dashboard user={user} />
                </>
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
          <Route
            path="/carrier-selection"
            element={
              isAuthenticated ? <CarrierSelection user={user} /> : <Navigate to="/auth" />
            }
          />
          <Route
            path="/shipment-tracking"
            element={
              isAuthenticated ? <ShipmentTracking user={user} /> : <Navigate to="/auth" />
            }
          />
          <Route
            path="/documents"
            element={
              isAuthenticated ? <DocumentManagement user={user} /> : <Navigate to="/auth" />
            }
          />
        </Routes>
      </main>

      {/* Chatbot should appear only after login */}
      {isAuthenticated && <Chatbot />}

      {/* Footer is always visible */}
      <Footer />
    </Router>
  );
}

export default App;
