"use client";

import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TermsOfService() {
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

                    <h1 className="text-4xl font-bold mb-8 text-white">{isZh ? '服務條款' : 'Terms of Service'}</h1>

                    <div className="max-w-none space-y-8">
                        <p className="text-slate-300 text-lg">
                            {isZh ? '最後更新：2025 年 12 月' : 'Last updated: December 2025'}
                        </p>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-white">
                                {isZh ? '1. 條款接受' : '1. Acceptance of Terms'}
                            </h2>
                            <p className="text-slate-300">
                                {isZh
                                    ? '使用 VolleyVision AI 即表示您同意受這些服務條款約束。如果您不同意這些條款，請勿使用我們的服務。'
                                    : 'By accessing or using VolleyVision AI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.'}
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-white">
                                {isZh ? '2. 服務說明' : '2. Service Description'}
                            </h2>
                            <p className="text-slate-300">
                                {isZh ? 'VolleyVision AI 提供 AI 驅動的排球影片分析服務，包括：' : 'VolleyVision AI provides AI-powered volleyball video analysis services, including:'}
                            </p>
                            <ul className="list-disc list-inside text-slate-300 space-y-2">
                                <li>{isZh ? '球員檢測和追蹤' : 'Player detection and tracking'}</li>
                                <li>{isZh ? '球體軌跡分析' : 'Ball trajectory analysis'}</li>
                                <li>{isZh ? '動作識別' : 'Action recognition'}</li>
                                <li>{isZh ? '統計分析和報告' : 'Statistical analysis and reporting'}</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-white">
                                {isZh ? '3. 使用者責任' : '3. User Responsibilities'}
                            </h2>
                            <p className="text-slate-300">
                                {isZh ? '您同意：' : 'You agree to:'}
                            </p>
                            <ul className="list-disc list-inside text-slate-300 space-y-2">
                                <li>{isZh ? '建立帳戶時提供準確的資訊' : 'Provide accurate information when creating an account'}</li>
                                <li>{isZh ? '僅上傳您有權分享的內容' : 'Only upload content you have the right to share'}</li>
                                <li>{isZh ? '不將服務用於任何非法目的' : 'Not use the service for any illegal purposes'}</li>
                                <li>{isZh ? '尊重他人的智慧財產權' : 'Respect the intellectual property rights of others'}</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-white">
                                {isZh ? '4. 智慧財產權' : '4. Intellectual Property'}
                            </h2>
                            <p className="text-slate-300">
                                {isZh
                                    ? '您保留對上傳影片的所有權利。VolleyVision AI 保留對我們分析演算法、軟體和服務基礎設施的所有權利。'
                                    : 'You retain all rights to the videos you upload. VolleyVision AI retains all rights to our analysis algorithms, software, and service infrastructure.'}
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-white">
                                {isZh ? '5. 責任限制' : '5. Limitation of Liability'}
                            </h2>
                            <p className="text-slate-300">
                                {isZh
                                    ? 'VolleyVision AI 按「現況」提供，不提供任何形式的保證。我們不對因使用服務而產生的任何間接、偶發或衍生性損害負責。'
                                    : 'VolleyVision AI is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.'}
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-white">
                                {isZh ? '6. 條款變更' : '6. Changes to Terms'}
                            </h2>
                            <p className="text-slate-300">
                                {isZh
                                    ? '我們保留隨時修改這些條款的權利。變更後繼續使用服務即表示接受新條款。'
                                    : 'We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.'}
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-white">
                                {isZh ? '7. 聯絡' : '7. Contact'}
                            </h2>
                            <p className="text-slate-300">
                                {isZh ? '如有條款相關問題，請訪問我們的' : 'For questions about these terms, please visit our '}
                                <Link href="/contact" className="text-blue-400 hover:text-blue-300">
                                    {isZh ? '聯絡頁面' : 'Contact page'}
                                </Link>
                                {isZh ? '。' : '.'}
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
