import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMessageSquare, FiTruck, FiFileText, FiActivity } from "react-icons/fi";

// Import images from the assets folder
import sellerImage from "../assets/images/RakeshKumar.jpg"; // Ensure the file name matches
import adImage1 from "../assets/images/logistics.jpg";
import adImage2 from "../assets/images/gogreen.jpg";

function Home() {
  const features = [
    {
      icon: <FiMessageSquare className="h-8 w-8 text-primary-500" />,
      title: "AI-Powered Support Assistant",
      description:
        "Stay informed and resolve queries instantly with our smart chatbot. Ask questions about shipment tracking, carrier selection, compliance, and more – all in one place.",
    },
    {
      icon: <FiTruck className="h-8 w-8 text-primary-500" />,
      title: "AI-Powered Carrier Selection",
      description:
        "Find the perfect carrier using our advanced AI matching algorithm.",
    },
    {
      icon: <FiFileText className="h-8 w-8 text-primary-500" />,
      title: "Automated Compliance Management",
      description:
        "Streamline documentation and ensure regulatory compliance effortlessly.",
    },
    {
      icon: <FiActivity className="h-8 w-8 text-primary-500" />,
      title: "Shipment Tracking & Alerts",
      description:
        "Monitor your shipments in real-time with automated status updates.",
    },
  ];

  const testimonials = [
    {
      text: "This platform transformed our export operations!",
      author: "Sarah Johnson",
      company: "Global Trade Solutions",
    },
    {
      text: "Boundless Connect streamlined our logistics process completely.",
      author: "Michael Chen",
      company: "Pacific Exports Ltd",
    },
  ];

  const sellerStory = {
    name: "Rakesh Kumar",
    company: "SmartTech Solutions",
    story:
      "With Boundless Connect, managing my logistics has become a breeze. As a small electronics seller, I struggled with finding reliable carriers and staying on top of compliance. This platform’s AI-driven features have saved me countless hours and helped me scale my business sustainably.",
    image: sellerImage, // Using the imported image
  };

  const ads = [
    {
      title: "Faster Deliveries, Reduced Costs",
      description:
        "Partner with Boundless Connect to enjoy the best carrier rates and optimize your logistics expenses.",
      image: adImage1, // Using the imported image
    },
    {
      title: "Go Green with Sustainable Logistics",
      description:
        "Explore eco-friendly logistics solutions and reduce your carbon footprint with every shipment.",
      image: adImage2, // Using the imported image
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-400 text-white py-20">
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
              Empowering businesses to simplify cross-border exports with
              real-time communication and AI-driven insights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/auth"
                className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-200"
              >
                Get Started
              </Link>
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition duration-200"
              >
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
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seller Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Success Story: Meet Our Seller
          </h2>
          <div className="flex flex-col md:flex-row items-center bg-white p-8 rounded-lg shadow-md">
            <img
              src={sellerStory.image}
              alt={`${sellerStory.name}'s story`}
              className="w-40 h-40 rounded-full mb-6 md:mb-0 md:mr-8"
            />
            <div>
              <h3 className="text-xl font-bold mb-4">{sellerStory.name}</h3>
              <p className="text-gray-700 italic mb-4">{`"${sellerStory.story}"`}</p>
              <p className="text-gray-600">— {sellerStory.company}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ads Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {ads.map((ad, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-32 h-32 rounded-lg mr-6"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{ad.title}</h3>
                  <p className="text-gray-600">{ad.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-lg italic text-gray-700 mb-4">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
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
