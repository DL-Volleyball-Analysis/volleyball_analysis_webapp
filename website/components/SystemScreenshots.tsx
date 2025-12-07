"use client";

import Copy from "./Copy";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAssetPath } from "./ui/utils";
import { useState } from "react";
import { X } from "lucide-react";

export default function SystemScreenshots() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);
  const { language } = useLanguage();
  const isZh = language === 'zh-TW';

  const screenshots = [
    {
      title: isZh ? "儀表板介面" : "Dashboard Interface",
      description: isZh ? "系統儀表板顯示所有影片和分析狀態" : "System dashboard showing all videos and analysis status",
      image: "/images/webapp/dashboard.png",
    },
    {
      title: isZh ? "影片播放與分析" : "Video Playback & Analysis",
      description: isZh ? "互動式播放器，支援拖曳時間軸和事件標記" : "Interactive player with drag-to-seek timeline and event markers",
      image: "/images/webapp/play_sector.png",
    },
    {
      title: isZh ? "球員檢測與追蹤" : "Player Detection & Tracking",
      description: isZh ? "即時球員邊界框和追蹤 ID" : "Real-time player bounding boxes and tracking IDs",
      image: "/images/webapp/player_detection(boxes).png",
    },
    {
      title: isZh ? "動作識別" : "Action Recognition",
      description: isZh ? "自動識別和標註五種關鍵動作" : "Automatic identification and annotation of five key actions",
      image: "/images/webapp/action_boxes.png",
    },
    {
      title: isZh ? "球員統計" : "Player Statistics",
      description: isZh ? "詳細的球員動作統計和分析" : "Detailed player action statistics and analysis",
      image: "/images/webapp/player_stats.png",
    },
  ];

  return (
    <>
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
                {isZh ? '系統截圖' : 'Screenshots'}
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                {isZh ? '系統介面' : 'System Interface'}
              </p>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400">
                {isZh ? '查看我們直觀的介面和強大的功能' : 'Take a look at our intuitive interface and powerful features'}
              </p>
            </div>
          </Copy>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {screenshots.map((screenshot, index) => (
              <Copy key={screenshot.title} delay={0.1 + index * 0.05}>
                <div
                  className="group bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer"
                  onClick={() => setSelectedImage({ src: screenshot.image, title: screenshot.title })}
                >
                  <div className="aspect-video relative bg-slate-900/50 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    {/* Zoom indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <div className="bg-blue-600/90 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg">
                        {isZh ? '點擊放大' : 'Click to enlarge'}
                      </div>
                    </div>
                    <img
                      src={getAssetPath(screenshot.image)}
                      alt={screenshot.title}
                      className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
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

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-[90vw] max-h-[90vh] animate-scaleIn">
            <img
              src={getAssetPath(selectedImage.src)}
              alt={selectedImage.title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <p className="text-white text-center mt-4 text-lg font-medium">{selectedImage.title}</p>
          </div>
        </div>
      )}
    </>
  );
}

