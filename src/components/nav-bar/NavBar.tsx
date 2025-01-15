"use client";
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="text-xl font-bold text-gray-800">
          <a href="/">ReciPlease</a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-800 text-2xl focus:outline-none"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute right-6 bg-white shadow-lg rounded-lg mt-4 w-auto">
          <ul className="flex flex-col items-start py-4 px-6 space-y-3">
            <li>
              <a href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-gray-700 hover:text-blue-600">
                About
              </a>
            </li>
            <li>
              <a href="/recipes" className="text-gray-700 hover:text-blue-600">
                Recipes
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-700 hover:text-blue-600">
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;