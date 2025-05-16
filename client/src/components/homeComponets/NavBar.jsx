import React, { useState } from "react";

import { Menu, Sun, X } from "lucide-react";
const NAV_ITEMS = [
  { name: "Feature", link: "#feature" },
  { name: "About", link: "#about" },
  { name: "Contact", link: "#contact" },
];

const NavBar = () => {
  return (
    <div className="sticky w-full inset-0 top-0 z-50">
      <div className="relative z-[60] max-w-7xl mx-auto hidden lg:flex flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 dark:bg-transparent ">
        <div className="text-xl text-neutral-600 dark:text-neutral-300 font-bold ">
          Chart Craft
        </div>
        <div className="flex items-center space-x-4">
          {NAV_ITEMS.map((item, idx) => (
            <a
              href={item.link}
              key={idx}
              className="relative px-4 py-2 text-sm text-neutral-600 dark:text-neutral-300"
            >
              <span>{item.name}</span>
            </a>
          ))}
        </div>
        <div className="flex items-center space-x-4 ">
          <Sun size={18} />
          <button className="text-sm font-semibold px-4 py-2 text-neutral-600 dark:text-neutral-300 whitespace-nowrap">
            Signin
          </button>
          <button className="text-sm font-semibold px-4 py-2 text-neutral-900 bg-neutral-200  whitespace-nowrap rounded-3xl">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
