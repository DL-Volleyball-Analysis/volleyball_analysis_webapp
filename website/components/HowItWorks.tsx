"use client";

import { Upload, Cpu, BarChart, Download } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export function HowItWorks() {
  const { language } = useLanguage();
  const isZh = language === 'zh-TW';

  const steps = [
    {
      icon: Upload,
      step: "01",
      title: isZh ? "上傳影片" : "Upload Your Video",
      description: isZh
        ? "上傳任何常見格式的比賽錄影，支援多角度攝影機和多種解析度。"
        : "Upload match recordings in any common video format. Supports multiple camera angles and resolutions.",
      color: "text-blue-400",
      bgColor: "bg-blue-500/20"
    },
    {
      icon: Cpu,
      step: "02",
      title: isZh ? "AI 處理" : "AI Processing",
      description: isZh
        ? "我們的 AI 引擎分析每一幀畫面，自動檢測球員、追蹤球體並識別場地區域。"
        : "Our AI engine analyzes every frame, detecting players, tracking the ball, and identifying court zones automatically.",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20"
    },
    {
      icon: BarChart,
      step: "03",
      title: isZh ? "獲取洞察" : "Get Insights",
      description: isZh
        ? "查看全面的分析、統計數據和視覺化，包括熱力圖、軌跡圖和效能指標。"
        : "Review comprehensive analytics, statistics, and visualizations including heat maps, trajectory plots, and performance metrics.",
      color: "text-green-400",
      bgColor: "bg-green-500/20"
    },
    {
      icon: Download,
      step: "04",
      title: isZh ? "匯出與分享" : "Export & Share",
      description: isZh
        ? "匯出標註後的影片、生成報告，並與團隊分享洞察以提升表現。"
        : "Export annotated videos, generate reports, and share insights with your team to improve performance.",
      color: "text-orange-400",
      bgColor: "bg-orange-500/20"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full mb-4 backdrop-blur-sm">
            {isZh ? '使用方式' : 'How It Works'}
          </div>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {isZh ? '四個簡單步驟，從影片到洞察' : 'From Video to Insights in Four Simple Steps'}
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {isZh
              ? '我們簡化的流程讓每個人都能使用先進的排球分析。'
              : 'Our streamlined process makes advanced volleyball analysis accessible to everyone.'}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm h-full hover:border-blue-500/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 ${step.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                        <Icon className={`w-8 h-8 ${step.color}`} />
                      </div>
                      <div className={`text-sm ${step.color} font-semibold mb-2`}>
                        {isZh ? `步驟 ${step.step}` : `STEP ${step.step}`}
                      </div>
                      <h3 className="text-white font-semibold mb-3">{step.title}</h3>
                      <p className="text-slate-400 text-sm">{step.description}</p>
                    </CardContent>
                  </Card>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
