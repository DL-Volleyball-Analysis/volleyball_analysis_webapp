"use client";

import { Button } from "./ui/button";
import { ArrowRight, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function CTA() {
  const { language } = useLanguage();
  const isZh = language === 'zh-TW';

  return (
    <section className="py-24 bg-[#0033A0] relative overflow-hidden">
      {/* Mikasa-inspired diagonal accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-[#001F5C] rounded-full opacity-50"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-[#1E4FC2] rounded-full opacity-30"></div>
      </div>
      
      {/* Yellow accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#FFD100]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white mb-6 text-4xl font-extrabold tracking-tight">
            {isZh ? '準備好轉變您的排球分析了嗎？' : 'Ready to Transform Your Volleyball Analysis?'}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {isZh
              ? '加入已經在使用我們 AI 驅動平台的球隊和教練，獲得競爭優勢並提升球員表現。'
              : 'Join teams and coaches already using our AI-powered platform to gain competitive advantages and improve player performance.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="gap-2 bg-[#FFD100] text-[#001F5C] hover:bg-[#FFE14D] font-semibold rounded-sm shadow-lg"
              onClick={() => window.open('https://github.com/DL-Volleyball-Analysis/volleyball_analysis_webapp', '_blank')}
            >
              {isZh ? '免費開始使用' : 'Get Started Free'}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-transparent text-white border-2 border-white/40 hover:bg-white/10 hover:border-white rounded-sm"
              onClick={() => window.open('https://github.com/DL-Volleyball-Analysis/volleyball_analysis_webapp', '_blank')}
            >
              <Github className="w-5 h-5" />
              {isZh ? '在 GitHub 查看' : 'View on GitHub'}
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{isZh ? '免費開源' : 'Free & Open Source'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{isZh ? '無需信用卡' : 'No Credit Card'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
