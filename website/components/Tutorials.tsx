"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Terminal, Play, Upload, BarChart2, Settings } from "lucide-react";

export function Tutorials() {
    return (
        <section id="tutorials" className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                        Getting Started
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Follow our guide to set up and start using the Volleyball Analysis System.
                    </p>
                </div>

                <Tabs defaultValue="installation" className="max-w-4xl mx-auto">
                    <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-900 p-1 rounded-xl border border-slate-800">
                        <TabsTrigger value="installation" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400">
                            <Terminal className="w-4 h-4 mr-2" />
                            Installation
                        </TabsTrigger>
                        <TabsTrigger value="usage" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400">
                            <Play className="w-4 h-4 mr-2" />
                            Usage Guide
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="installation">
                        <Card className="bg-slate-900 border-slate-800 text-slate-300">
                            <CardHeader>
                                <CardTitle className="text-white">Quick Start Guide</CardTitle>
                                <CardDescription className="text-slate-400">
                                    Set up the environment and run the application locally.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-xs">1</span>
                                        Clone Repository
                                    </h3>
                                    <div className="bg-slate-950 p-4 rounded-lg font-mono text-sm border border-slate-800">
                                        <p className="text-blue-400">git clone https://github.com/itsYoga/volleyball-analysis.git</p>
                                        <p className="text-slate-500">cd volleyball-analysis</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-xs">2</span>
                                        Setup Environment
                                    </h3>
                                    <div className="bg-slate-950 p-4 rounded-lg font-mono text-sm border border-slate-800">
                                        <p className="text-slate-500"># Create virtual environment</p>
                                        <p className="text-blue-400">python3 -m venv venv</p>
                                        <p className="text-blue-400">source venv/bin/activate</p>
                                        <p className="text-slate-500"># Install dependencies</p>
                                        <p className="text-blue-400">pip install -r requirements.txt</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-xs">3</span>
                                        Run Application
                                    </h3>
                                    <div className="bg-slate-950 p-4 rounded-lg font-mono text-sm border border-slate-800">
                                        <p className="text-blue-400">chmod +x start.sh</p>
                                        <p className="text-blue-400">./start.sh</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="usage">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card className="bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-colors">
                                <CardHeader>
                                    <Upload className="w-8 h-8 text-blue-500 mb-2" />
                                    <CardTitle className="text-white">1. Upload Video</CardTitle>
                                </CardHeader>
                                <CardContent className="text-slate-400 text-sm">
                                    Navigate to the Upload page and drag & drop your volleyball match video.
                                    Supported formats include MP4, AVI, MOV (max 2GB).
                                </CardContent>
                            </Card>

                            <Card className="bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-colors">
                                <CardHeader>
                                    <Play className="w-8 h-8 text-green-500 mb-2" />
                                    <CardTitle className="text-white">2. Interactive Analysis</CardTitle>
                                </CardHeader>
                                <CardContent className="text-slate-400 text-sm">
                                    Use the timeline to seek through the video. Click event markers to jump to specific actions
                                    like spikes, serves, and blocks.
                                </CardContent>
                            </Card>

                            <Card className="bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-colors">
                                <CardHeader>
                                    <Settings className="w-8 h-8 text-purple-500 mb-2" />
                                    <CardTitle className="text-white">3. Visualizations</CardTitle>
                                </CardHeader>
                                <CardContent className="text-slate-400 text-sm">
                                    Toggle bounding boxes, ball tracking trails, and heatmaps to visualize player movements
                                    and game dynamics in real-time.
                                </CardContent>
                            </Card>

                            <Card className="bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-colors">
                                <CardHeader>
                                    <BarChart2 className="w-8 h-8 text-orange-500 mb-2" />
                                    <CardTitle className="text-white">4. Player Stats</CardTitle>
                                </CardHeader>
                                <CardContent className="text-slate-400 text-sm">
                                    View detailed statistics for each player, including action counts and success rates.
                                    Rename players for better tracking.
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}
