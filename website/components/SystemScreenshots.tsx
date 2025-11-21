"use client";

import Copy from "./Copy";

const screenshots = [
  {
    title: "儀表板介面",
    description: "系統主控台，顯示所有影片和分析狀態",
    image: "/images/webapp/dashboard.png",
  },
  {
    title: "影片播放與分析",
    description: "互動式播放器，支持時間軸拖拽和事件標記",
    image: "/images/webapp/play_sector.png",
  },
  {
    title: "球員偵測與追蹤",
    description: "實時顯示球員邊界框和追蹤 ID",
    image: "/images/webapp/player_detection(boxes).png",
  },
  {
    title: "動作識別",
    description: "自動識別五種關鍵動作並標註",
    image: "/images/webapp/action_boxes.png",
  },
  {
    title: "球員統計",
    description: "詳細的球員動作統計和分析",
    image: "/images/webapp/player_stats.png",
  },
];

export default function SystemScreenshots() {
  return (
    <section id="screenshots" className="py-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Copy delay={0}>
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">
              系統展示
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              用戶介面截圖
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-base text-slate-400">
              直觀的網頁界面，支持拖拽上傳、互動式時間軸和實時可視化
            </p>
          </div>
        </Copy>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {screenshots.map((screenshot, index) => (
            <Copy key={screenshot.title} delay={0.1 + index * 0.05}>
              <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
                <div className="aspect-video relative bg-slate-900">
                  <img
                    src={screenshot.image}
                    alt={screenshot.title}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {screenshot.title}
                  </h3>
                  <p className="text-sm text-slate-400">
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

