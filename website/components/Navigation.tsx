"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold gradient-text">VolleyVision AI</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#features" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition">
                功能特色
              </a>
              <a href="#screenshots" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition">
                系統截圖
              </a>
              <a href="#tech" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition">
                技術棧
              </a>
              <a href="#demo" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition">
                演示
              </a>
              <a 
                href="https://github.com/itsYoga" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <a href="#features" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                功能特色
              </a>
              <a href="#screenshots" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                系統截圖
              </a>
              <a href="#tech" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                技術棧
              </a>
              <a href="#demo" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                演示
              </a>
              <a 
                href="https://github.com/itsYoga" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium text-center"
              >
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

