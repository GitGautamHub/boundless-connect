import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiLinkedin } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-primary-600 mb-4">Boundless Connect</h3>
            <p className="text-gray-600 mb-4">
              Simplifying cross-border logistics and communication for businesses worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary-600">Dashboard</Link>
              </li>
              <li>
                <Link to="/carrier-selection" className="text-gray-600 hover:text-primary-600">Find Carriers</Link>
              </li>
              <li>
                <Link to="/shipment-tracking" className="text-gray-600 hover:text-primary-600">Track Shipments</Link>
              </li>
              <li>
                <Link to="/documents" className="text-gray-600 hover:text-primary-600">Documents</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <FiMail className="mr-2" />
                <a href="mailto:contact@boundlessconnect.com" className="hover:text-primary-600">
                  contact@boundlessconnect.com
                </a>
              </li>
              <li className="flex items-center text-gray-600">
                <FiPhone className="mr-2" />
                <a href="tel:+1234567890" className="hover:text-primary-600">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center text-gray-600">
                <FiMapPin className="mr-2" />
                <span>123 Logistics Ave, CA 94105</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary-600">
                <FiFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600">
                <FiTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600">
                <FiLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Boundless Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;