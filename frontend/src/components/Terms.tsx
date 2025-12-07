import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Scale, Ban } from 'lucide-react';

export const Terms: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-4">
                        <FileText className="w-10 h-10" />
                        <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
                    </div>
                    <p className="text-blue-100 text-lg">
                        Please read these terms carefully before using our service.
                    </p>
                </div>

                <div className="p-8 space-y-8">
                    {/* Acceptance */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Acceptance of Terms</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            By accessing and using the Volleyball AI Analysis System, you agree to be bound by
                            these Terms of Service. If you do not agree to these terms, please do not use our service.
                        </p>
                    </section>

                    {/* Service Description */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Scale className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Service Description</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Our service provides AI-powered volleyball match analysis, including:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Ball tracking and trajectory analysis</li>
                            <li>Player detection and movement tracking</li>
                            <li>Action recognition (spike, set, receive, serve, block)</li>
                            <li>Jersey number detection</li>
                            <li>Game statistics and insights</li>
                        </ul>
                    </section>

                    {/* User Responsibilities */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">User Responsibilities</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            As a user, you agree to:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Upload only videos you have the right to use</li>
                            <li>Not use the service for illegal purposes</li>
                            <li>Respect the intellectual property rights of others</li>
                            <li>Not attempt to reverse-engineer our AI models</li>
                        </ul>
                    </section>

                    {/* Limitations */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <Ban className="w-6 h-6 text-red-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Limitations of Liability</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            While we strive for accuracy, our AI analysis is provided "as is" without warranties.
                            We are not liable for any decisions made based on our analysis results. The service
                            is intended for informational and training purposes only.
                        </p>
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
