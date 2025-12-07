"use client";

import Copy from "./Copy";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DemoSection() {
  const { t, language } = useLanguage();
  const isZh = language === 'zh-TW';

  return (
    <section id="demo" className="py-16 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Copy delay={0}>
          <div className="lg:text-center mb-10">
            <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">
              {t.demo.badge}
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              {t.demo.title}
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-base text-slate-400">
              {t.demo.subtitle}
            </p>
          </div>
        </Copy>

        <Copy delay={0.1}>
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-800 aspect-video flex items-center justify-center">
            <div className="text-center p-8">
              <svg
                className="mx-auto h-16 w-16 text-slate-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="mt-2 text-slate-400 text-lg">
                {isZh ? '演示影片將顯示在此處' : 'Demo video will be displayed here'}
              </p>
            </div>
          </div>
        </Copy>
      </div>
    </section>
  );
}

