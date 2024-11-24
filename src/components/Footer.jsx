import React from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
} from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Boundless Connect
            </h3>
            <p className="text-gray-300">
              Simplifying cross-border logistics and communication for
              businesses worldwide. Let us take care of your logistics needs so
              you can focus on growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-blue-300 transition"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/carrier-selection"
                  className="text-gray-300 hover:text-blue-300 transition"
                >
                  Find Carriers
                </Link>
              </li>
              <li>
                <Link
                  to="/shipment-tracking"
                  className="text-gray-300 hover:text-blue-300 transition"
                >
                  Track Shipments
                </Link>
              </li>
              <li>
                <Link
                  to="/documents"
                  className="text-gray-300 hover:text-blue-300 transition"
                >
                  Documents
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FiMail className="mr-2 text-blue-300" />
                <a
                  href="mailto:contact@boundlessconnect.com"
                  className="text-gray-300 hover:text-blue-300 transition"
                >
                  contact@boundlessconnect.com
                </a>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-2 text-blue-300" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-300 hover:text-blue-300 transition"
                >
                  +91 9899912342
                </a>
              </li>
              <li className="flex items-center">
                <FiMapPin className="mr-2 text-blue-300" />
                <span className="text-gray-300">
                  123 Logistics Ave, CA 9410
                </span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-blue-300 transition"
                aria-label="Facebook"
              >
                <FiFacebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-blue-300 transition"
                aria-label="Twitter"
              >
                <FiTwitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-blue-300 transition"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider and Footer Bottom */}
        <div className="border-t border-blue-600 mt-8 pt-6 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Boundless Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
