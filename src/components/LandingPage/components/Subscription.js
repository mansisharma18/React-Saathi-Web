import React from "react";
import { FaStar, FaMedal, FaTrophy, FaRibbon } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion for animations

// Icon mapping
const iconMap = {
  "star-outline": FaStar,
  "medal-outline": FaMedal,
  "trophy-outline": FaTrophy,
  "ribbon-outline": FaRibbon,
};

// Subscription Card Component
// Subscription Card Component
const SubscriptionCard = ({ title, description, price, icon, colors }) => {
  const IconComponent = iconMap[icon];

  return (
    <motion.div
      className="rounded-md overflow-hidden shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl hover:bg-default hover:text-white group border-default border"
      style={{
        minHeight: "350px", // Set a minimum height to control card size
      }}
      whileHover={{ scale: 1.05 }} // Scale up on hover
      whileTap={{ scale: 0.95 }} // Scale down on tap/click
    >
      <div className="p-6 flex flex-col items-center text-center h-full">
        {" "}
        {/* Reduce padding */}
        <motion.div
          className="flex items-center justify-center mb-4 bg-white p-4 rounded-full shadow-lg" // Reduced padding
          whileHover={{ rotate: 360 }} // Rotate icon on hover
          transition={{ duration: 1 }}
        >
          <IconComponent className="text-5xl text-default" />{" "}
          {/* Reduce icon size */}
        </motion.div>
        <h3 className="text-2xl font-semibold mb-3 group-hover:text-white">
          {" "}
          {/* Adjust font size */}
          {title}
        </h3>
        <p className="text-sm text-default opacity-90 mb-4 whitespace-pre-line leading-relaxed group-hover:text-white">
          {description}
        </p>
        <div className="text-2xl font-bold mb-4 whitespace-pre-line text-default group-hover:text-white">
          {price}
        </div>
        <motion.button
          className="mt-auto px-6 py-2 bg-white text-default font-semibold rounded-full hover:bg-default hover:text-white transition-all duration-300 ease-in-out"
          whileHover={{ scale: 1.1 }} // Slightly enlarge button on hover
          whileTap={{ scale: 0.95 }} // Slightly reduce button size on tap
          onClick={() => alert(`Subscribed to ${title} plan`)}
        >
          Download App
        </motion.button>
      </div>
    </motion.div>
  );
};

// Main Page Component
const SubscriptionPage = () => {
  const packages = [
    {
      id: "1",
      title: "Basic",
      description: `• One-hour call with patrons every week.\n• Includes one in-home visit to check health, take a photo, and ensure well-being.\n• All interactions/digital media uploaded to the ‘My Feed’ section of the app.\n• Offered at $30/month (Rs. 2500/month).`,
      price: "$30/m\n(Rs. 2500/m)",
      icon: "star-outline",
      colors: ["rgba(186, 220, 188, 0.8)", "#4CAF50"], // Light mint green with dark green border
    },
    {
      id: "2",
      title: "Bronze",
      description: `• One-hour call with patrons every week.\n• Two in-home visits to check health, take a photo, and ensure well-being.\n• Up to 2 hours of running errands on behalf of patrons.\n• Offered at $40/month (Rs. 3500/month).`,
      price: "$40/m\n(Rs. 3500/m)",
      icon: "medal-outline",
      colors: ["rgba(255, 224, 178, 0.8)", "#FFA726"], // Soft peach with deep orange border
    },
    {
      id: "3",
      title: "Silver",
      description: `• One-hour call with patrons every week.\n• Weekly in-home visits to check health, take a photo, and ensure well-being.\n• Up to 4 hours of running errands on behalf of patrons.\n• Driving patrons (up to 2) to and from a destination within 4 hours.\n• Offered at $60/month (Rs. 5000/month).`,
      price: "$60/m\n(Rs. 5000/m)",
      icon: "trophy-outline",
      colors: ["rgba(178, 235, 242, 0.8)", "#00ACC1"], // Light aqua with dark teal border
    },
    {
      id: "4",
      title: "Gold",
      description: `• One-hour call with patrons every week.\n• Weekly in-home visits to check health, take a photo, and ensure well-being.\n• Up to 8 hours of running errands on behalf of patrons.\n• Offered at $80/month (Rs. 6500/month).`,
      price: "$80/m\n(Rs. 6500/m)",
      icon: "ribbon-outline",
      colors: ["rgba(244, 213, 178, 0.8)", "#FF9800"], // Light sand with burnt orange border
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-8 py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <motion.h1
        className="text-5xl font-serif text-center text-gray-800 mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Subscription Plans
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full max-w-7xl">
        {packages.map((pkg, index) => (
          <SubscriptionCard
            key={pkg.id}
            title={pkg.title}
            description={pkg.description}
            price={pkg.price}
            icon={pkg.icon}
            colors={pkg.colors}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
