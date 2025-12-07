"use client";

import { Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <span>VolleyVision AI</span>
            </div>
            <p className="text-gray-400 text-sm">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-white font-semibold">{t.footer.product}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">{t.nav.features}</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">{t.nav.demo}</a></li>
              <li><a href="#tech" className="hover:text-white transition-colors">{t.nav.tech}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-white font-semibold">{t.footer.resources}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="https://github.com/itsYoga/volleyball-analysis" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-white font-semibold">{t.footer.connect}</h4>
            <div className="flex gap-4">
              <a href="https://github.com/itsYoga/volleyball-analysis" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div>© 2025 VolleyVision AI. {t.footer.rights}</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">{t.footer.privacy}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{t.footer.terms}</Link>
            <Link href="/contact" className="hover:text-white transition-colors">{t.footer.contact}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

