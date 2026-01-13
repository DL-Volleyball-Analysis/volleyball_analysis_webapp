"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="fixed w-full z-50 bg-[#0A0E1A]/95 backdrop-blur-md border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-[#FFD100]" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>VolleyVision AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#features" className="text-slate-300 hover:text-[#FFD100] px-3 py-2 text-sm font-medium transition">
                {t.nav.features}
              </a>
              <a href="#screenshots" className="text-slate-300 hover:text-[#FFD100] px-3 py-2 text-sm font-medium transition">
                {t.nav.screenshots}
              </a>
              <a href="#tech" className="text-slate-300 hover:text-[#FFD100] px-3 py-2 text-sm font-medium transition">
                {t.nav.tech}
              </a>
              <a href="#demo" className="text-slate-300 hover:text-[#FFD100] px-3 py-2 text-sm font-medium transition">
                {t.nav.demo}
              </a>
              <button
                onClick={() => setLanguage(language === 'en' ? 'zh-TW' : 'en')}
                className="text-slate-300 hover:text-[#FFD100] px-3 py-2 text-sm font-medium transition border border-[#1E293B] hover:border-[#FFD100]"
              >
                {language === 'en' ? '中文' : 'EN'}
              </button>
              <a
                href="https://github.com/DL-Volleyball-Analysis"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0033A0] hover:bg-[#1E4FC2] text-white px-4 py-2 rounded-sm text-sm font-medium transition"
              >
                {t.nav.github}
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-100 hover:text-[#FFD100] transition-colors"
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
          <div className="md:hidden pb-4 border-t border-[#1E293B]">
            <div className="flex flex-col space-y-2 pt-4">
              <a href="#features" className="text-slate-300 hover:text-[#FFD100] px-3 py-2 text-sm font-medium">
                {t.nav.features}
              </a>
              <a href="#screenshots" className="text-slate-300 hover:text-[#FFD100] px-3 py-2 text-sm font-medium">
                {t.nav.screenshots}
              </a>
              <a href="#tech" className="text-slate-300 hover:text-[#FFD100] px-3 py-2 text-sm font-medium">
                {t.nav.tech}
              </a>
              <a href="#demo" className="text-slate-300 hover:text-[#FFD100] px-3 py-2 text-sm font-medium">
                {t.nav.demo}
              </a>
              <button
                onClick={() => setLanguage(language === 'en' ? 'zh-TW' : 'en')}
                className="text-slate-300 hover:text-[#FFD100] px-3 py-2 text-sm font-medium text-left border border-[#1E293B] hover:border-[#FFD100]"
              >
                {language === 'en' ? '中文' : 'EN'}
              </button>
              <a
                href="https://github.com/DL-Volleyball-Analysis"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0033A0] hover:bg-[#1E4FC2] text-white px-4 py-2 rounded-sm text-sm font-medium text-center"
              >
                {t.nav.github}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

