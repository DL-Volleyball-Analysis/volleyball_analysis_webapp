"use client";

import { Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#070A12] text-white py-12 border-t border-[#1E293B]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#0033A0] rounded-sm flex items-center justify-center">
                <span className="text-[#FFD100] font-extrabold">V</span>
              </div>
              <span className="text-[#FFD100] font-extrabold tracking-tight">VolleyVision AI</span>
            </div>
            <p className="text-slate-400 text-sm">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-white font-semibold">{t.footer.product}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#features" className="hover:text-[#FFD100] transition-colors">{t.nav.features}</a></li>
              <li><a href="#demo" className="hover:text-[#FFD100] transition-colors">{t.nav.demo}</a></li>
              <li><a href="#tech" className="hover:text-[#FFD100] transition-colors">{t.nav.tech}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-white font-semibold">{t.footer.resources}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="https://github.com/DL-Volleyball-Analysis/volleyball_analysis_webapp" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD100] transition-colors">GitHub</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-white font-semibold">{t.footer.connect}</h4>
            <div className="flex gap-4">
              <a href="https://github.com/DL-Volleyball-Analysis/volleyball_analysis_webapp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1E293B] rounded-sm flex items-center justify-center hover:bg-[#0033A0] transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1E293B] pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <div>© 2025 VolleyVision AI. {t.footer.rights}</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-[#FFD100] transition-colors">{t.footer.privacy}</Link>
            <Link href="/terms" className="hover:text-[#FFD100] transition-colors">{t.footer.terms}</Link>
            <Link href="/contact" className="hover:text-[#FFD100] transition-colors">{t.footer.contact}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

