"use client";

import Copy from "./Copy";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAssetPath } from "./ui/utils";

const screenshots = [
  {
    title: "Dashboard Interface",
    description: "System dashboard showing all videos and analysis status",
    image: "/images/webapp/dashboard.png",
  },
  {
    title: "Video Playback & Analysis",
    description: "Interactive player with drag-to-seek timeline and event markers",
    image: "/images/webapp/play_sector.png",
  },
  {
    title: "Player Detection & Tracking",
    description: "Real-time player bounding boxes and tracking IDs",
    image: "/images/webapp/player_detection(boxes).png",
  },
  {
    title: "Action Recognition",
    description: "Automatic identification and annotation of five key actions",
    image: "/images/webapp/action_boxes.png",
  },
  {
    title: "Player Statistics",
    description: "Detailed player action statistics and analysis",
    image: "/images/webapp/player_stats.png",
  },
];

export default function SystemScreenshots() {
  return (
    <section id="screenshots" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Copy delay={0}>
          <div className="lg:text-center mb-16">
            <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase mb-2">
              System Screenshots
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              System Screenshots
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400">
              Take a look at our intuitive interface and powerful features
            </p>
          </div>
        </Copy>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {screenshots.map((screenshot, index) => (
            <Copy key={screenshot.title} delay={0.1 + index * 0.05}>
              <div className="group bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
                <div className="aspect-video relative bg-slate-900/50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <img
                    src={getAssetPath(screenshot.image)}
                    alt={screenshot.title}
                    className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 relative z-20">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {screenshot.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {screenshot.description}
                  </p>
                </div>
              </div>
            </Copy>
          ))}
        </div>
      </div>
    </section>
  );
}

