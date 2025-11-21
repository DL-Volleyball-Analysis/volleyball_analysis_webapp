"use client";

import Copy from "./Copy";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-40 sm:pb-24 md:pt-48 md:pb-32">
        <div className="text-center">
          <Copy delay={0}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/90 text-sm">{t.hero.badge}</span>
            </div>
          </Copy>

          <Copy delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 px-4">
              {t.hero.title}
            </h1>
          </Copy>

          <Copy delay={0.2}>
            <p className="mt-3 max-w-md mx-auto text-base text-white/90 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl px-4">
              {t.hero.subtitle}
            </p>
          </Copy>

          <Copy delay={0.3}>
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center gap-4">
              <a
                href="#demo"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-blue-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition shadow-lg hover:shadow-xl"
              >
                {t.hero.watchDemo}
              </a>
              <a
                href="#features"
                className="w-full sm:w-auto mt-3 sm:mt-0 flex items-center justify-center px-8 py-3 border border-white/20 text-base font-medium rounded-full text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 md:py-4 md:text-lg md:px-10 transition"
              >
                {t.hero.learnMore}
              </a>
            </div>
          </Copy>
        </div>
      </div>

      {/* Floating Stats Card */}
      <div className="absolute bottom-10 left-4 sm:left-10 bg-white rounded-xl shadow-2xl p-4 sm:p-6 hidden md:block z-20 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-2xl">
            ✓
          </div>
          <div>
            <div className="text-sm text-gray-600">{t.hero.accuracyLabel}</div>
            <div className="text-2xl font-bold text-gray-900">{t.hero.accuracyValue}</div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

