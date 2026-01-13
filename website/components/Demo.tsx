"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Play, Users, Crosshair, Map, Flame } from "lucide-react";
import { Button } from "./ui/button";
import { getAssetPath } from "./ui/utils";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Demo() {
  const [activeTab, setActiveTab] = useState("tracking");
  const { t } = useLanguage();

  return (
    <section id="demo" className="py-24 bg-[#0A0E1A] relative overflow-hidden">
      {/* Mikasa-inspired decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#0033A0] rounded-full blur-3xl mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFD100] rounded-full blur-3xl mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#0033A0]/20 text-[#FFD100] border border-[#0033A0]/40 rounded-sm mb-4 backdrop-blur-sm">
            {t.demo.badge}
          </div>
          <h2 className="text-white text-4xl font-bold mb-4 tracking-tight">
            {t.demo.title}
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {t.demo.subtitle}
          </p>
        </div>

        <Tabs defaultValue="tracking" value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
          <TabsList className="inline-flex mx-auto mb-8 bg-slate-800/80 backdrop-blur-md p-1 rounded-xl border border-slate-700/50 gap-1">
            <TabsTrigger
              value="tracking"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium"
            >
              <Users className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{t.demo.tabs.tracking}</span>
            </TabsTrigger>
            <TabsTrigger
              value="ball"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium"
            >
              <Crosshair className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{t.demo.tabs.ball}</span>
            </TabsTrigger>
            <TabsTrigger
              value="court"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white data-[state=active]:shadow-md text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium"
            >
              <Map className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{t.demo.tabs.court}</span>
            </TabsTrigger>
            <TabsTrigger
              value="heatmap"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium"
            >
              <Flame className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{t.demo.tabs.heatmap}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tracking" className="space-y-4 focus-visible:outline-none focus-visible:ring-0 animate-fadeIn">
            <Card className="overflow-hidden border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-0">
                <div className="relative group">
                  <ImageWithFallback
                    src={getAssetPath("/images/webapp/player_detection(boxes).png")}
                    alt="Player tracking demo"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                  <div className="absolute bottom-4 right-4">
                    <Button variant="secondary" size="sm" className="gap-2 shadow-lg hover:scale-105 transition-transform">
                      <Play className="w-4 h-4" />
                      {t.demo.viewAnalysis}
                    </Button>
                  </div>
                </div>
                <div className="p-8 bg-slate-900/90 border-t border-slate-700">
                  <h3 className="text-white text-xl font-semibold mb-2">{t.demo.trackingTitle}</h3>
                  <p className="text-slate-400">
                    {t.demo.trackingDesc}
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors">
                      <div className="text-blue-400 font-bold text-xl">12</div>
                      <div className="text-sm text-slate-500">{t.demo.playersTracked}</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors">
                      <div className="text-blue-400 font-bold text-xl">98.3%</div>
                      <div className="text-sm text-slate-500">{t.demo.accuracy}</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors">
                      <div className="text-blue-400 font-bold text-xl">30 FPS</div>
                      <div className="text-sm text-slate-500">{t.demo.processing}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ball" className="space-y-4 focus-visible:outline-none focus-visible:ring-0 animate-fadeIn">
            <Card className="overflow-hidden border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-0">
                <div className="relative group">
                  <ImageWithFallback
                    src={getAssetPath("/images/webapp/action_boxes.png")}
                    alt="Ball trajectory analysis"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                  <div className="absolute bottom-4 right-4">
                    <Button variant="secondary" size="sm" className="gap-2 shadow-lg hover:scale-105 transition-transform">
                      <Play className="w-4 h-4" />
                      {t.demo.viewAnalysis}
                    </Button>
                  </div>
                </div>
                <div className="p-8 bg-slate-900/90 border-t border-slate-700">
                  <h3 className="text-white text-xl font-semibold mb-2">{t.demo.ballTitle}</h3>
                  <p className="text-slate-400">
                    {t.demo.ballDesc}
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-orange-500/50 transition-colors">
                      <div className="text-orange-400 font-bold text-xl">5+</div>
                      <div className="text-sm text-slate-500">{t.demo.actionTypes}</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-orange-500/50 transition-colors">
                      <div className="text-orange-400 font-bold text-xl">±2cm</div>
                      <div className="text-sm text-slate-500">{t.demo.precision}</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-orange-500/50 transition-colors">
                      <div className="text-orange-400 font-bold text-xl">100%</div>
                      <div className="text-sm text-slate-500">{t.demo.coverage}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="court" className="space-y-4 focus-visible:outline-none focus-visible:ring-0 animate-fadeIn">
            <Card className="overflow-hidden border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-0">
                <div className="relative group">
                  <ImageWithFallback
                    src={getAssetPath("/images/webapp/play_sector.png")}
                    alt="Court detection"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                  <div className="absolute bottom-4 right-4">
                    <Button variant="secondary" size="sm" className="gap-2 shadow-lg hover:scale-105 transition-transform">
                      <Play className="w-4 h-4" />
                      {t.demo.viewAnalysis}
                    </Button>
                  </div>
                </div>
                <div className="p-8 bg-slate-900/90 border-t border-slate-700">
                  <h3 className="text-white text-xl font-semibold mb-2">{t.demo.courtTitle}</h3>
                  <p className="text-slate-400">
                    {t.demo.courtDesc}
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-green-500/50 transition-colors">
                      <div className="text-green-400 font-bold text-xl">6</div>
                      <div className="text-sm text-slate-500">{t.demo.zonesMapped}</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-green-500/50 transition-colors">
                      <div className="text-green-400 font-bold text-xl">Auto</div>
                      <div className="text-sm text-slate-500">{t.demo.calibration}</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-green-500/50 transition-colors">
                      <div className="text-green-400 font-bold text-xl">Any</div>
                      <div className="text-sm text-slate-500">{t.demo.cameraAngle}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-4 focus-visible:outline-none focus-visible:ring-0 animate-fadeIn">
            <Card className="overflow-hidden border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-0">
                <div className="relative group">
                  <ImageWithFallback
                    src={getAssetPath("/images/webapp/player_stats.png")}
                    alt="Player statistics and heatmaps"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                  <div className="absolute bottom-4 right-4">
                    <Button variant="secondary" size="sm" className="gap-2 shadow-lg hover:scale-105 transition-transform">
                      <Play className="w-4 h-4" />
                      {t.demo.viewAnalysis}
                    </Button>
                  </div>
                </div>
                <div className="p-8 bg-slate-900/90 border-t border-slate-700">
                  <h3 className="text-white text-xl font-semibold mb-2">{t.demo.heatmapTitle}</h3>
                  <p className="text-slate-400">
                    {t.demo.heatmapDesc}
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors">
                      <div className="text-purple-400 font-bold text-xl">{t.demo.perPlayer}</div>
                      <div className="text-sm text-slate-500">{t.demo.analysis}</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors">
                      <div className="text-purple-400 font-bold text-xl">{t.demo.team}</div>
                      <div className="text-sm text-slate-500">{t.demo.coverage}</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors">
                      <div className="text-purple-400 font-bold text-xl">{t.demo.timeBased}</div>
                      <div className="text-sm text-slate-500">{t.demo.analysis}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
