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
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 pt-20">
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/90 text-sm">{t.hero.badge}</span>
            </div>

            <h1 className="text-white mb-6">
              {t.hero.title}
            </h1>

            <p className="text-xl text-white/90 mb-8">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2"
                onClick={handleWatchDemo}
              >
                <Play className="w-5 h-5" />
                {t.hero.watchDemo}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
                onClick={() => window.open('https://github.com/DL-Volleyball-Analysis/volleyball_analysis_webapp', '_blank')}
              >
                {t.hero.getStarted}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <HeroVideo ref={videoRef} />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
