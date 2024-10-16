import React, { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";

function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll event to track Y position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Nav items
  const navItems = [
    { name: "About Us", href: "#aboutus" },
    { name: "Services", href: "#services" },
    { name: "Contact Us", href: "#contactus" },
  ];

  // Handle navbar toggle for mobile view
  const toggleNav = () => setOpen(!open);

  return (
    <nav
      className={`sticky top-0 z-20 shadow-lg transition-opacity duration-300 p-1 text-2xl font-DreamBold ${
        scrollY > 0 ? "bg-white/70" : "bg-white"
      }`}
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center p-3 px-12">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 tracking-wide text-default text-3xl no-underline"
          aria-label="Go to Home"
        >
          Saathi
        </a>

        {/* Navigation Links */}
        <div className={`${open ? "block" : "hidden"} md:flex`}>
          <ul className="flex flex-col md:flex-row md:gap-8 absolute md:static top-16 right-5 md:bg-transparent">
            {navItems.map(({ name, href }, index) => (
              <li key={index} className="md:hover:underline">
                <a
                  href={href}
                  className="text-base font-medium text-textPrimary hover:text-default font-serif"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu and Call Button */}
        <div className="flex items-center">
          {/* Call Us Button (can be uncommented when ready) */}
          {/* <a
            href="tel:+18001234567" // Replace with actual phone number
            className="flex items-center justify-center p-2 text-base text-white bg-default hover:bg-default-dark rounded-md mr-2"
            aria-label="Call Us"
          >
            <FaPhoneAlt className="mr-1" />
            Call Us
          </a> */}

          {/* Hamburger Menu Button for Mobile */}
          <button
            className="inline-flex items-center justify-center p-2 w-10 h-10 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={toggleNav}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
