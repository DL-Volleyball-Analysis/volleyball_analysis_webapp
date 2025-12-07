import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck } from 'lucide-react';

export const Privacy: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-10 h-10" />
                        <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
                    </div>
                    <p className="text-blue-100 text-lg">
                        Your privacy is important to us. Learn how we handle your data.
                    </p>
                </div>

                <div className="p-8 space-y-8">
                    {/* Data Collection */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Database className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Data Collection</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            We collect only the data necessary to provide our video analysis services:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Uploaded volleyball match videos</li>
                            <li>Analysis results and player statistics</li>
                            <li>User preferences and settings</li>
                        </ul>
                    </section>

                    {/* Data Usage */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Eye className="w-6 h-6 text-green-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">How We Use Your Data</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Your data is used exclusively for:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Processing and analyzing volleyball match videos</li>
                            <li>Generating player statistics and performance insights</li>
                            <li>Improving our AI models (anonymized data only)</li>
                        </ul>
                    </section>

                    {/* Data Security */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Lock className="w-6 h-6 text-purple-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Data Security</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            We implement industry-standard security measures to protect your data, including
                            encrypted storage and secure data transmission protocols.
                        </p>
                    </section>

                    {/* Your Rights */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <UserCheck className="w-6 h-6 text-orange-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Your Rights</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            You have the right to:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Access your personal data</li>
                            <li>Request deletion of your data</li>
                            <li>Export your analysis results</li>
                            <li>Opt-out of data processing for AI improvement</li>
                        </ul>
                    </section>

                    {/* Back Button */}
                    <div className="pt-6 border-t border-gray-200">
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
