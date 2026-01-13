"use client";

import { Button } from "./ui/button";
import { Play, ArrowRight } from "lucide-react";
import { HeroVideo, HeroVideoHandle } from "./HeroVideo";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Hero() {
  const videoRef = useRef<HeroVideoHandle>(null);
  const { t } = useLanguage();

  const handleWatchDemo = () => {
    if (videoRef.current) {
      videoRef.current.requestFullScreen();
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#0A0E1A] pt-20">
      {/* Mikasa-inspired background pattern */}
      <div className="absolute inset-0 diagonal-stripes"></div>
      
      {/* Dynamic accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD100] to-transparent"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#0033A0]/20 border border-[#0033A0]/40 px-4 py-2 rounded-sm mb-6">
              <span className="w-2 h-2 bg-[#FFD100] rounded-full animate-pulse"></span>
              <span className="text-[#FFD100] text-sm font-medium tracking-wide uppercase">{t.hero.badge}</span>
            </div>

            <h1 className="text-white mb-6 font-extrabold" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              {t.hero.title}
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="gap-2 bg-[#FFD100] text-[#0A0E1A] hover:bg-[#FFE14D] font-semibold rounded-sm shadow-lg shadow-[#FFD100]/20"
                onClick={handleWatchDemo}
              >
                <Play className="w-5 h-5" />
                {t.hero.watchDemo}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-transparent text-white border-2 border-[#0033A0] hover:bg-[#0033A0] hover:text-white rounded-sm"
                onClick={() => window.open('https://github.com/DL-Volleyball-Analysis/volleyball_analysis_webapp', '_blank')}
              >
                {t.hero.getStarted}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="relative">
            {/* Video frame with Mikasa-style border */}
            <div className="absolute -inset-1 bg-gradient-to-br from-[#FFD100] via-[#0033A0] to-[#FFD100] rounded-sm opacity-75"></div>
            <div className="relative">
              <HeroVideo ref={videoRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements - Mikasa inspired */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-[#0033A0] rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#FFD100] rounded-full blur-[150px] opacity-10"></div>
      </div>
    </div>
  );
}
