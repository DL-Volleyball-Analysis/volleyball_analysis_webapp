"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function Stats() {
  const { language } = useLanguage();
  const isZh = language === 'zh-TW';

  const stats = [
    { value: "98.5%", label: isZh ? "檢測準確率" : "Detection Accuracy" },
    { value: "30 FPS", label: isZh ? "即時處理" : "Real-time Processing" },
    { value: "10+", label: isZh ? "追蹤功能" : "Tracking Features" },
    { value: "100K+", label: isZh ? "分析幀數" : "Frames Analyzed" },
  ];

  return (
    <div className="bg-[#0F172A] py-16 border-y border-[#1E293B] relative overflow-hidden">
      {/* Accent line */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#0033A0] to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-[#FFD100] mb-2 group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{stat.value}</div>
              <div className="text-slate-400 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
