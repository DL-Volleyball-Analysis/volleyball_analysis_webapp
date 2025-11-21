"use client";

import Copy from "./Copy";

export default function Hero() {
  return (
    <div className="relative pt-32 pb-12 sm:pt-40 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Copy delay={0}>
          <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
            <span className="block">基於深度學習的</span>
            <span className="block gradient-text">排球比賽分析系統</span>
          </h1>
        </Copy>
        
        <Copy delay={0.1}>
          <p className="mt-3 max-w-md mx-auto text-base text-slate-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            使用電腦視覺和深度學習技術追蹤排球軌跡、分析球員動作、識別關鍵事件，為球隊提供科學的數據分析工具。
          </p>
        </Copy>
        
        <Copy delay={0.2}>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center gap-4">
            <a 
              href="#demo" 
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition"
            >
              查看演示
            </a>
            <a 
              href="#features" 
              className="w-full flex items-center justify-center px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-400 hover:bg-blue-600/10 md:py-4 md:text-lg md:px-10 transition"
            >
              了解更多
            </a>
          </div>
        </Copy>
      </div>
    </div>
  );
}

