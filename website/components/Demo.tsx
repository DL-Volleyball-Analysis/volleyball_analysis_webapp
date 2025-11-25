import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Play } from "lucide-react";
import { Button } from "./ui/button";
import { getAssetPath } from "./ui/utils";

export function Demo() {
  return (
    <section id="demo" className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl mix-blend-screen"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl mix-blend-screen"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full mb-4 backdrop-blur-sm">
            See It In Action
          </div>
          <h2 className="text-white text-4xl font-bold mb-4 tracking-tight">
            Experience the Power of AI Analysis
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Explore how our system analyzes every aspect of volleyball gameplay with precision and speed.
          </p>
        </div>

        <Tabs defaultValue="tracking" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-slate-800/50 p-1 rounded-xl border border-slate-700">
            <TabsTrigger value="tracking" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300">Player Tracking</TabsTrigger>
            <TabsTrigger value="ball" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300">Ball Analysis</TabsTrigger>
            <TabsTrigger value="court" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300">Court Detection</TabsTrigger>
            <TabsTrigger value="heatmap" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300">Heat Maps</TabsTrigger>
          </TabsList>

          <TabsContent value="tracking" className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
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
                      View Analysis
                    </Button>
                  </div>
                </div>
                <div className="p-8 bg-slate-900/90 border-t border-slate-700">
                  <h3 className="text-white text-xl font-semibold mb-2">Real-time Player Detection</h3>
                  <p className="text-slate-400">
                    Our AI tracks each player's position, movement speed, and orientation throughout the match.
                    Bounding boxes and IDs are maintained even during occlusions.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors">
                      <div className="text-blue-400 font-bold text-xl">12</div>
                      <div className="text-sm text-slate-500">Players Tracked</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors">
                      <div className="text-blue-400 font-bold text-xl">98.3%</div>
                      <div className="text-sm text-slate-500">Accuracy</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors">
                      <div className="text-blue-400 font-bold text-xl">30 FPS</div>
                      <div className="text-sm text-slate-500">Processing</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ball" className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
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
                      View Analysis
                    </Button>
                  </div>
                </div>
                <div className="p-8 bg-slate-900/90 border-t border-slate-700">
                  <h3 className="text-white text-xl font-semibold mb-2">Action Recognition & Ball Tracking</h3>
                  <p className="text-slate-400">
                    Track the volleyball's path and identify key actions like serves, spikes, and blocks.
                    Analyze velocities and predict landing zones with our advanced physics engine.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-orange-500/50 transition-colors">
                      <div className="text-orange-400 font-bold text-xl">5+</div>
                      <div className="text-sm text-slate-500">Action Types</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-orange-500/50 transition-colors">
                      <div className="text-orange-400 font-bold text-xl">±2cm</div>
                      <div className="text-sm text-slate-500">Precision</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-orange-500/50 transition-colors">
                      <div className="text-orange-400 font-bold text-xl">100%</div>
                      <div className="text-sm text-slate-500">Coverage</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="court" className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
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
                      View Analysis
                    </Button>
                  </div>
                </div>
                <div className="p-8 bg-slate-900/90 border-t border-slate-700">
                  <h3 className="text-white text-xl font-semibold mb-2">Automatic Court Detection</h3>
                  <p className="text-slate-400">
                    Our system automatically identifies court boundaries, zones, and lines regardless of camera angle.
                    This enables accurate spatial analysis and positioning metrics.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-green-500/50 transition-colors">
                      <div className="text-green-400 font-bold text-xl">6</div>
                      <div className="text-sm text-slate-500">Zones Mapped</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-green-500/50 transition-colors">
                      <div className="text-green-400 font-bold text-xl">Auto</div>
                      <div className="text-sm text-slate-500">Calibration</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-green-500/50 transition-colors">
                      <div className="text-green-400 font-bold text-xl">Any</div>
                      <div className="text-sm text-slate-500">Camera Angle</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
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
                      View Analysis
                    </Button>
                  </div>
                </div>
                <div className="p-8 bg-slate-900/90 border-t border-slate-700">
                  <h3 className="text-white text-xl font-semibold mb-2">Advanced Statistics & Heat Maps</h3>
                  <p className="text-slate-400">
                    Visualize player coverage areas and movement patterns throughout the match.
                    Identify hot zones, defensive gaps, and optimize positioning strategies.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors">
                      <div className="text-purple-400 font-bold text-xl">Per Player</div>
                      <div className="text-sm text-slate-500">Analysis</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors">
                      <div className="text-purple-400 font-bold text-xl">Team</div>
                      <div className="text-sm text-slate-500">Coverage</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors">
                      <div className="text-purple-400 font-bold text-xl">Time</div>
                      <div className="text-sm text-slate-500">Based</div>
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
