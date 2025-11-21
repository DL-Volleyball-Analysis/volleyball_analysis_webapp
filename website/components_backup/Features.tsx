"use client";

import Copy from "./Copy";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Features() {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-16 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Copy delay={0}>
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">
              {t.features.title}
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              {t.features.title}
            </p>
          </div>
        </Copy>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((feature, index) => (
            <Copy key={feature.title} delay={0.1 + index * 0.05}>
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                <div className="text-4xl mb-4">
                  {index === 0 ? '🏐' : index === 1 ? '🎯' : index === 2 ? '👥' : index === 3 ? '📊' : index === 4 ? '📈' : '✨'}
                </div>
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

