"use client";

import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Mail, Github, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
    const { language } = useLanguage();
    const isZh = language === 'zh-TW';

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setSubmitted(true);
    };

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

                    <h1 className="text-4xl font-bold mb-4 text-white">{isZh ? '聯絡我們' : 'Contact Us'}</h1>
                    <p className="text-slate-300 text-lg mb-12">
                        {isZh ? '對 VolleyVision AI 有疑問嗎？我們很樂意聽取您的意見。' : "Have questions about VolleyVision AI? We'd love to hear from you."}
                    </p>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                                <h2 className="text-xl font-semibold mb-6">{isZh ? '聯繫方式' : 'Get in Touch'}</h2>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">{isZh ? '電子郵件' : 'Email'}</h3>
                                            <a
                                                href="mailto:ch993115@gmail.com"
                                                className="text-slate-400 hover:text-blue-400 transition-colors"
                                            >
                                                ch993115@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Github className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">GitHub</h3>
                                            <a
                                                href="https://github.com/itsYoga/volleyball-analysis"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate-400 hover:text-blue-400 transition-colors"
                                            >
                                                itsYoga/volleyball-analysis
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">{isZh ? '地點' : 'Location'}</h3>
                                            <p className="text-slate-400">{isZh ? '台灣' : 'Taiwan'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                            {submitted ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-semibold mb-2">{isZh ? '訊息已發送！' : 'Message Sent!'}</h2>
                                    <p className="text-slate-400">{isZh ? '感謝您的來信，我們會盡快回覆。' : "Thank you for reaching out. We'll get back to you soon."}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <h2 className="text-xl font-semibold mb-4">{isZh ? '發送訊息' : 'Send a Message'}</h2>

                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-2">{isZh ? '姓名' : 'Name'}</label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">{isZh ? '電子郵件' : 'Email'}</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium mb-2">{isZh ? '主旨' : 'Subject'}</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            required
                                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium mb-2">{isZh ? '訊息' : 'Message'}</label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            required
                                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                                    >
                                        {isZh ? '發送訊息' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
