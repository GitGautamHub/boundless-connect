import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiTruck, FiFileText, FiActivity } from 'react-icons/fi';

function Home() {
  const features = [
    {
      icon: <FiMessageSquare className="h-8 w-8" />,
      title: 'Real-time Communication Hub',
      description: 'Stay connected with carriers and partners through our integrated messaging system.'
    },
    {
      icon: <FiTruck className="h-8 w-8" />,
      title: 'AI-Powered Carrier Selection',
      description: 'Find the perfect carrier using our advanced AI matching algorithm.'
    },
    {
      icon: <FiFileText className="h-8 w-8" />,
      title: 'Automated Compliance Management',
      description: 'Streamline documentation and ensure regulatory compliance effortlessly.'
    },
    {
      icon: <FiActivity className="h-8 w-8" />,
      title: 'Shipment Tracking & Alerts',
      description: 'Monitor your shipments in real-time with automated status updates.'
    }
  ];

  const testimonials = [
    {
      text: "This platform transformed our export operations!",
      author: "Sarah Johnson",
      company: "Global Trade Solutions"
    },
    {
      text: "Boundless Connect streamlined our logistics process completely.",
      author: "Michael Chen",
      company: "Pacific Exports Ltd"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Boundless Connect: Bridging Borders in Communication and Logistics
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Empowering businesses to simplify cross-border exports with real-time communication and AI-driven insights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/auth" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                Get Started
              </Link>
              <Link to="/dashboard" className="btn-secondary bg-transparent border-white text-white hover:bg-white/10">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-primary-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="card"
              >
                <p className="text-lg mb-4 text-gray-700">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;