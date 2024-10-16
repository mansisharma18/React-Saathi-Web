import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

// Import images directly if they are in the 'src' folder
import googlePlay from "../../../assets/images/googleplay.png"; // Adjust the path as necessary
import appStore from "../../../assets/images/appstore.png"; // Adjust the path as necessary

const Footer = () => {
  return (
    <footer className="bg-default text-white py-12">
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* About Us Section */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h3 className="text-2xl font-bold mb-4">About Us</h3>
            <p className="text-gray-200">
              We are committed to providing exceptional services to make your
              life easier and more fulfilling. Our team of professionals is here
              to support you every step of the way.
            </p>
          </div>
          {/* Quick Links Section */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <a href="#home" className="text-gray-200 hover:text-white">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#services" className="text-gray-200 hover:text-white">
                  Services
                </a>
              </li>
              <li className="mb-2">
                <a href="#about" className="text-gray-200 hover:text-white">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#contact" className="text-gray-200 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Us Section */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-200">Email: support@saathi.com</p>
            <p className="text-gray-200">Phone: +123 456 7890</p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* App Promotion Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-12">
          <div className="text-center md:text-left">
            {/* Optional text can go here */}
          </div>
          <div className="flex space-x-4">
            <img
              src={googlePlay}
              width={100}
              height={50}
              alt="Google Play Link"
              className="rounded-lg shadow-lg"
            />
            <img
              src={appStore}
              width={100}
              height={50}
              alt="App Store Link"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-600 mt-8 pt-4">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} Saathi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
