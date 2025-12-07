"use client";

import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPolicy() {
    const { language } = useLanguage();
    const isZh = language === 'zh-TW';

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <Navigation />

            <main className="pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {isZh ? '返回首頁' : 'Back to Home'}
                    </Link>

                    <h1 className="text-4xl font-bold mb-8">{isZh ? '隱私政策' : 'Privacy Policy'}</h1>

                    <div className="prose prose-invert prose-lg max-w-none space-y-8">
                        <p className="text-slate-300 text-lg">
                            {isZh ? '最後更新：2025 年 12 月' : 'Last updated: December 2025'}
                        </p>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-white">
                                {isZh ? '1. 我們收集的資訊' : '1. Information We Collect'}
                            </h2>
                            <p className="text-slate-300">
                                {isZh
                                    ? 'VolleyVision AI 收集您直接提供給我們的資訊，例如當您上傳影片進行分析、建立帳戶或聯繫我們尋求支援時。'
                                    : 'VolleyVision AI collects information you provide directly to us, such as when you upload videos for analysis, create an account, or contact us for support.'}
                            </p>
                            <ul className="list-disc list-inside text-slate-300 space-y-2">
                                <li>{isZh ? '上傳用於分析的影片內容' : 'Video content uploaded for analysis'}</li>
                                <li>{isZh ? '帳戶資訊（電子郵件、使用者名稱）' : 'Account information (email, username)'}</li>
                                <li>{isZh ? '使用數據和分析' : 'Usage data and analytics'}</li>
                                <li>{isZh ? '當您聯繫我們時的通訊數據' : 'Communication data when you contact us'}</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-white">
                                {isZh ? '2. 我們如何使用您的資訊' : '2. How We Use Your Information'}
                            </h2>
                            <p className="text-slate-300">
                                {isZh ? '我們使用收集的資訊來：' : 'We use the information we collect to:'}
                            </p>
                            <ul className="list-disc list-inside text-slate-300 space-y-2">
                                <li>{isZh ? '提供、維護和改進我們的 AI 分析服務' : 'Provide, maintain, and improve our AI analysis services'}</li>
                                <li>{isZh ? '處理和分析您上傳的排球影片' : 'Process and analyze volleyball videos you upload'}</li>
                                <li>{isZh ? '向您發送技術通知和支援訊息' : 'Send you technical notices and support messages'}</li>
                                <li>{isZh ? '回覆您的評論和問題' : 'Respond to your comments and questions'}</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-white">
                                {isZh ? '3. 數據安全' : '3. Data Security'}
                            </h2>
                            <p className="text-slate-300">
                                {isZh
                                    ? '我們實施適當的安全措施來保護您的個人資訊免受未經授權的存取、更改、披露或銷毀。您上傳的影片會安全處理，並可根據要求刪除。'
                                    : 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your uploaded videos are processed securely and can be deleted upon request.'}
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-white">
                                {isZh ? '4. 數據保留' : '4. Data Retention'}
                            </h2>
                            <p className="text-slate-300">
                                {isZh
                                    ? '我們僅在提供服務所需的期間內保留您的數據。您可以隨時通過聯繫我們請求刪除您的數據。'
                                    : 'We retain your data only for as long as necessary to provide our services. You may request deletion of your data at any time by contacting us.'}
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-white">
                                {isZh ? '5. 聯絡我們' : '5. Contact Us'}
                            </h2>
                            <p className="text-slate-300">
                                {isZh
                                    ? '如果您對此隱私政策有任何問題，請透過我們的'
                                    : 'If you have any questions about this Privacy Policy, please contact us through our '}
                                <Link href="/contact" className="text-blue-400 hover:text-blue-300">
                                    {isZh ? '聯絡頁面' : 'Contact page'}
                                </Link>
                                {isZh ? '聯繫我們。' : '.'}
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
