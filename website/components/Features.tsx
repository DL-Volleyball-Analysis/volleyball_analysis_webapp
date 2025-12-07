"use client";

import {
  Users,
  Target,
  Activity,
  Map,
  TrendingUp,
  Video,
  Zap,
  BarChart3,
  Eye
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export function Features() {
  const { language } = useLanguage();
  const isZh = language === 'zh-TW';

  const features = [
    {
      icon: Users,
      title: isZh ? "球員檢測與追蹤" : "Player Detection & Tracking",
      description: isZh
        ? "先進 AI 識別並追蹤比賽中的每位球員，提供精確的位置數據。"
        : "Advanced AI identifies and tracks individual players throughout the match with precise positioning data.",
      color: "text-blue-400",
      bgColor: "bg-blue-500/20"
    },
    {
      icon: Target,
      title: isZh ? "球體軌跡分析" : "Ball Trajectory Analysis",
      description: isZh
        ? "追蹤 3D 空間中的球體移動，分析發球速度並預測落點位置。"
        : "Track ball movement in 3D space, analyze serve velocities, and predict landing positions.",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20"
    },
    {
      icon: Map,
      title: isZh ? "場地線檢測" : "Court Line Detection",
      description: isZh
        ? "自動檢測場地邊界和區域，進行精確的空間分析和位置指標計算。"
        : "Automatically detects court boundaries and zones for accurate spatial analysis and positioning metrics.",
      color: "text-green-400",
      bgColor: "bg-green-500/20"
    },
    {
      icon: Activity,
      title: isZh ? "移動分析" : "Movement Analytics",
      description: isZh
        ? "分析球員移動、速度和位置模式，優化球隊策略。"
        : "Analyze player movements, speed, and positioning patterns to optimize team strategies.",
      color: "text-orange-400",
      bgColor: "bg-orange-500/20"
    },
    {
      icon: Eye,
      title: isZh ? "動作識別" : "Action Recognition",
      description: isZh
        ? "精確識別扣球、攔網、防守、發球等特定動作並標記時間戳。"
        : "Identify specific actions like spikes, blocks, digs, and serves with timestamp precision.",
      color: "text-red-400",
      bgColor: "bg-red-500/20"
    },
    {
      icon: TrendingUp,
      title: isZh ? "效能指標" : "Performance Metrics",
      description: isZh
        ? "生成全面的統計數據，包括成功率、覆蓋區域和反應時間。"
        : "Generate comprehensive statistics including success rates, coverage areas, and reaction times.",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20"
    },
    {
      icon: Video,
      title: isZh ? "影片處理" : "Video Processing",
      description: isZh
        ? "處理比賽錄影，支援多角度攝影機和多種影片格式。"
        : "Process match recordings with support for multiple camera angles and video formats.",
      color: "text-pink-400",
      bgColor: "bg-pink-500/20"
    },
    {
      icon: BarChart3,
      title: isZh ? "陣型分析" : "Team Formation Analysis",
      description: isZh
        ? "視覺化並分析球隊陣型、輪轉和整場比賽的戰術位置。"
        : "Visualize and analyze team formations, rotations, and strategic positioning throughout the game.",
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/20"
    },
    {
      icon: Zap,
      title: isZh ? "即時處理" : "Real-time Processing",
      description: isZh
        ? "透過優化的處理管線，以 30+ FPS 提供即時分析和洞察。"
        : "Get instant analysis and insights with our optimized processing pipeline running at 30+ FPS.",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20"
    }
  ];

  return (
    <section id="features" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-900/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full mb-4 backdrop-blur-sm">
            {isZh ? '功能特色' : 'Features'}
          </div>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {isZh ? '比賽分析的全方位工具' : 'Powerful Analysis Tools for Every Aspect of the Game'}
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {isZh
              ? '我們全面的 AI 功能套件為您的每場排球比賽提供深入洞察。'
              : 'Our comprehensive suite of AI-powered features provides deep insights into every moment of your volleyball matches.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
