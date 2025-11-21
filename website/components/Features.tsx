"use client";

import Copy from "./Copy";

const features = [
  {
    title: "排球追蹤",
    description: "使用 VballNet 模型基於 U-Net 架構，準確追蹤排球在影片中的位置，並通過時間序列分析判斷球的落點位置。追蹤準確率達到 79.5%。",
    icon: "🏐",
  },
  {
    title: "動作識別",
    description: "使用 YOLOv11m 模型識別五種關鍵排球動作：發球、扣球、攔網、接球和舉球。mAP@0.5 達到 94.49%，超越目標 90%。",
    icon: "🎯",
  },
  {
    title: "球員追蹤",
    description: "使用 YOLOv8 進行球員偵測，並結合 Norfair 追蹤器實現跨幀的球員追蹤，支持球衣號碼識別功能。追蹤一致性達到 87.6%。",
    icon: "👥",
  },
  {
    title: "互動式播放器",
    description: "提供完整的 React 前端和 FastAPI 後端，支持影片上傳、分析處理、互動式播放和數據可視化等功能。",
    icon: "📊",
  },
  {
    title: "數據分析",
    description: "自動計算扣球成功率、動作統計、球員熱力圖等進階指標，為教練和球員提供科學的數據分析工具。",
    icon: "📈",
  },
  {
    title: "智能過濾",
    description: "採用信心度過濾機制，自動過濾低置信度檢測結果（動作 ≥60%，球員 ≥50%），減少誤判率 30%。",
    icon: "✨",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Copy delay={0}>
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">
              核心功能
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              強大的分析能力
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-base text-slate-400">
              整合多個深度學習模型，提供完整的排球比賽分析解決方案
            </p>
          </div>
        </Copy>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Copy key={feature.title} delay={0.1 + index * 0.05}>
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg leading-6 font-medium text-white mb-2">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-slate-400">
                  {feature.description}
                </p>
              </div>
            </Copy>
          ))}
        </div>
      </div>
    </section>
  );
}

