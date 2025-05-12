import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="fixed w-full z-50 bg-black/60 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <h1 className="text-3xl font-bold tracking-wider text-white">
            ChartCraft
          </h1>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white text-2xl">
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 text-sm md:text-lg font-medium text-white">
            <li className="hover:scale-105 hover:border-b-2">
              <ScrollLink
                to="/"
                smooth={true}
                duration={500}
                spy={true}
                activeClass="text-indigo-400"
              >
                Home
              </ScrollLink>
            </li>
            <li className="hover:scale-105 hover:border-b-2">
              <ScrollLink
                to="features"
                smooth={true}
                duration={500}
                spy={true}
                activeClass="text-indigo-400"
              >
                Features
              </ScrollLink>
            </li>
            <li className="hover:scale-105 hover:border-b-2">
              <ScrollLink
                to="about"
                smooth={true}
                duration={500}
                spy={true}
                activeClass="text-indigo-400"
              >
                About
              </ScrollLink>
            </li>
            <li className="hover:scale-105 hover:border-b-2">
              <ScrollLink
                to="contact"
                smooth={true}
                duration={500}
                spy={true}
                activeClass="text-indigo-400"
              >
                Contact
              </ScrollLink>
            </li>
            <li>
              <Link
                to="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-white"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-black/80 text-white rounded-md mt-2 p-4 space-y-4">
            <ScrollLink
              to="/"
              onClick={closeMenu}
              smooth={true}
              duration={500}
              spy={true}
              className="block hover:text-indigo-400"
            >
              Home
            </ScrollLink>
            <ScrollLink
              to="features"
              onClick={closeMenu}
              smooth={true}
              duration={500}
              spy={true}
              className="block hover:text-indigo-400"
            >
              Features
            </ScrollLink>
            <ScrollLink
              to="about"
              onClick={closeMenu}
              smooth={true}
              duration={500}
              spy={true}
              className="block hover:text-indigo-400"
            >
              About
            </ScrollLink>
            <ScrollLink
              to="contact"
              onClick={closeMenu}
              smooth={true}
              duration={500}
              spy={true}
              className="block hover:text-indigo-400"
            >
              Contact
            </ScrollLink>
            <Link
              to="/signup"
              onClick={closeMenu}
              className="block bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-center"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
