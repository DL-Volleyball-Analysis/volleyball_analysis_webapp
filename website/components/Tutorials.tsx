"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Terminal, Play, Upload, BarChart2, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Tutorials() {
    const { language } = useLanguage();
    const isZh = language === 'zh-TW';

    return (
        <section id="tutorials" className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                        {isZh ? '開始使用' : 'Getting Started'}
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        {isZh ? '按照指南設定並開始使用排球分析系統。' : 'Follow our guide to set up and start using the Volleyball Analysis System.'}
                    </p>
                </div>

                <Tabs defaultValue="installation" className="max-w-4xl mx-auto">
                    <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-900 p-1 rounded-xl border border-slate-800">
                        <TabsTrigger value="installation" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400">
                            <Terminal className="w-4 h-4 mr-2" />
                            {isZh ? '安裝指南' : 'Installation'}
                        </TabsTrigger>
                        <TabsTrigger value="usage" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400">
                            <Play className="w-4 h-4 mr-2" />
                            {isZh ? '使用指南' : 'Usage Guide'}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="installation">
                        <Card className="bg-slate-900 border-slate-800 text-slate-300">
                            <CardHeader>
                                <CardTitle className="text-white">{isZh ? '快速入門指南' : 'Quick Start Guide'}</CardTitle>
                                <CardDescription className="text-slate-400">
                                    {isZh ? '設定環境並在本地端運行應用程式。' : 'Set up the environment and run the application locally.'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-xs">1</span>
                                        {isZh ? '複製儲存庫' : 'Clone Repository'}
                                    </h3>
                                    <div className="bg-slate-950 p-4 rounded-lg font-mono text-sm border border-slate-800">
                                        <p className="text-blue-400">git clone https://github.com/DL-Volleyball-Analysis/volleyball_analysis_webapp.git</p>
                                        <p className="text-slate-500">cd volleyball_analysis_webapp</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-xs">2</span>
                                        {isZh ? '設定環境' : 'Setup Environment'}
                                    </h3>
                                    <div className="bg-slate-950 p-4 rounded-lg font-mono text-sm border border-slate-800">
                                        <p className="text-slate-500"># {isZh ? '建立虛擬環境' : 'Create virtual environment'}</p>
                                        <p className="text-blue-400">python3 -m venv venv</p>
                                        <p className="text-blue-400">source venv/bin/activate</p>
                                        <p className="text-slate-500"># {isZh ? '安裝依賴' : 'Install dependencies'}</p>
                                        <p className="text-blue-400">pip install -r requirements.txt</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-xs">3</span>
                                        {isZh ? '運行應用程式' : 'Run Application'}
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
                                    <CardTitle className="text-white">{isZh ? '1. 上傳影片' : '1. Upload Video'}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-slate-400 text-sm">
                                    {isZh
                                        ? '導航到上傳頁面，拖放您的排球比賽影片。支援 MP4、AVI、MOV 格式（最大 2GB）。'
                                        : 'Navigate to the Upload page and drag & drop your volleyball match video. Supported formats include MP4, AVI, MOV (max 2GB).'}
                                </CardContent>
                            </Card>

                            <Card className="bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-colors">
                                <CardHeader>
                                    <Play className="w-8 h-8 text-green-500 mb-2" />
                                    <CardTitle className="text-white">{isZh ? '2. 互動分析' : '2. Interactive Analysis'}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-slate-400 text-sm">
                                    {isZh
                                        ? '使用時間軸瀏覽影片。點擊事件標記跳轉到特定動作，如扣球、發球和攔網。'
                                        : 'Use the timeline to seek through the video. Click event markers to jump to specific actions like spikes, serves, and blocks.'}
                                </CardContent>
                            </Card>

                            <Card className="bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-colors">
                                <CardHeader>
                                    <Settings className="w-8 h-8 text-purple-500 mb-2" />
                                    <CardTitle className="text-white">{isZh ? '3. 視覺化' : '3. Visualizations'}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-slate-400 text-sm">
                                    {isZh
                                        ? '切換邊界框、球體追蹤軌跡和熱力圖，即時視覺化球員移動和比賽動態。'
                                        : 'Toggle bounding boxes, ball tracking trails, and heatmaps to visualize player movements and game dynamics in real-time.'}
                                </CardContent>
                            </Card>

                            <Card className="bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-colors">
                                <CardHeader>
                                    <BarChart2 className="w-8 h-8 text-orange-500 mb-2" />
                                    <CardTitle className="text-white">{isZh ? '4. 球員統計' : '4. Player Stats'}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-slate-400 text-sm">
                                    {isZh
                                        ? '查看每位球員的詳細統計數據，包括動作次數和成功率。重新命名球員以便更好地追蹤。'
                                        : 'View detailed statistics for each player, including action counts and success rates. Rename players for better tracking.'}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}
