import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HeadphonesIcon, Mail, MessageCircle, BookOpen, Github } from 'lucide-react';

export const Support: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-4">
                        <HeadphonesIcon className="w-10 h-10" />
                        <h1 className="text-3xl md:text-4xl font-bold">Support</h1>
                    </div>
                    <p className="text-blue-100 text-lg">
                        We're here to help. Choose the best way to get support.
                    </p>
                </div>

                <div className="p-8">
                    {/* Support Options Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Email Support */}
                        <div className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Email Support</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Send us an email and we'll respond within 24 hours.
                            </p>
                            <a
                                href="mailto:ch993115@gmail.com"
                                className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                            >
                                ch993115@gmail.com
                            </a>
                        </div>

                        {/* Documentation */}
                        <div className="group p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition-all">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                                    <BookOpen className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Documentation</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Browse our comprehensive guides and tutorials.
                            </p>
                            <span className="text-purple-600 font-medium">
                                Coming soon...
                            </span>
                        </div>

                        {/* GitHub */}
                        <div className="group p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-gray-800 rounded-lg group-hover:scale-110 transition-transform">
                                    <Github className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">GitHub</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Report issues or contribute to our open-source project.
                            </p>
                            <a
                                href="https://github.com/itsYoga/volleyball-analysis"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 font-medium hover:text-gray-900 transition-colors"
                            >
                                View on GitHub →
                            </a>
                        </div>

                        {/* Community */}
                        <div className="group p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg transition-all">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-green-600 rounded-lg group-hover:scale-110 transition-transform">
                                    <MessageCircle className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Community</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Join our community for discussions and tips.
                            </p>
                            <span className="text-green-600 font-medium">
                                Coming soon...
                            </span>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium text-gray-900">What video formats are supported?</h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    We support MP4, AVI, MOV, WMV, and FLV formats up to 2GB.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">How long does analysis take?</h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    Analysis time depends on video length. A typical match takes 5-15 minutes.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Can I edit player names after analysis?</h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    Yes! You can edit player names and jersey numbers anytime from the video player.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="pt-6 mt-6 border-t border-gray-200">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
