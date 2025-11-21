"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">VolleyVision AI</h3>
          <p className="text-sm text-slate-400">
            {t.footer.description}
          </p>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-base text-slate-500">
            &copy; 2025 {t.footer.author}. {t.footer.rights}
          </p>
          <p className="text-sm text-slate-500 mt-2">
            <a href={`mailto:${t.footer.email}`} className="hover:text-blue-400 transition">
              {t.footer.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

