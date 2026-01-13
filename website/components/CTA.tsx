"use client";

import { Button } from "./ui/button";
import { ArrowRight, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function CTA() {
  const { language } = useLanguage();
  const isZh = language === 'zh-TW';

  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white mb-6 text-4xl font-bold">
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
              variant="secondary"
              className="gap-2"
              onClick={() => window.open('https://github.com/DL-Volleyball-Analysis/volleyball_analysis_webapp', '_blank')}
            >
              {isZh ? '免費開始使用' : 'Get Started Free'}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
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
