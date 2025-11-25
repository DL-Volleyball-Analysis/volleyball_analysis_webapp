"use client";

import Copy from "./Copy";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAssetPath } from "./ui/utils";

const screenshots = [
  {
    title_en: "Dashboard Interface",
    title_zh: "儀表板介面",
    description_en: "System dashboard showing all videos and analysis status",
    description_zh: "系統主控台，顯示所有影片和分析狀態",
    image: "/images/webapp/dashboard.png",
  },
  {
    title_en: "Video Playback & Analysis",
    title_zh: "影片播放與分析",
    description_en: "Interactive player with drag-to-seek timeline and event markers",
    description_zh: "互動式播放器，支持時間軸拖拽和事件標記",
    image: "/images/webapp/play_sector.png",
  },
  {
    title_en: "Player Detection & Tracking",
    title_zh: "球員偵測與追蹤",
    description_en: "Real-time player bounding boxes and tracking IDs",
    description_zh: "實時顯示球員邊界框和追蹤 ID",
    image: "/images/webapp/player_detection(boxes).png",
  },
  {
    title_en: "Action Recognition",
    title_zh: "動作識別",
    description_en: "Automatic identification and annotation of five key actions",
    description_zh: "自動識別五種關鍵動作並標註",
    image: "/images/webapp/action_boxes.png",
  },
  {
    title_en: "Player Statistics",
    title_zh: "球員統計",
    description_en: "Detailed player action statistics and analysis",
    description_zh: "詳細的球員動作統計和分析",
    image: "/images/webapp/player_stats.png",
  },
];

export default function SystemScreenshots() {
  const { language, t } = useLanguage();

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
              {t.screenshots.title}
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              {t.screenshots.title}
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400">
              {t.screenshots.description}
            </p>
          </div>
        </Copy>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {screenshots.map((screenshot, index) => (
            <Copy key={screenshot.title_en} delay={0.1 + index * 0.05}>
              <div className="group bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
                <div className="aspect-video relative bg-slate-900/50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <img
                    src={getAssetPath(screenshot.image)}
                    alt={language === 'en' ? screenshot.title_en : screenshot.title_zh}
                    className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 relative z-20">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {language === 'en' ? screenshot.title_en : screenshot.title_zh}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {language === 'en' ? screenshot.description_en : screenshot.description_zh}
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

