import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Play } from "lucide-react";
import { Button } from "./ui/button";

export function Demo() {
  return (
    <section id="demo" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full mb-4">
            See It In Action
          </div>
          <h2 className="text-gray-900 mb-4">
            Experience the Power of AI Analysis
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore how our system analyzes every aspect of volleyball gameplay with precision and speed.
          </p>
        </div>

        <Tabs defaultValue="tracking" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="tracking">Player Tracking</TabsTrigger>
            <TabsTrigger value="ball">Ball Analysis</TabsTrigger>
            <TabsTrigger value="court">Court Detection</TabsTrigger>
            <TabsTrigger value="heatmap">Heat Maps</TabsTrigger>
          </TabsList>

          <TabsContent value="tracking" className="space-y-4">
            <Card className="overflow-hidden border-2">
              <CardContent className="p-0">
                <div className="relative">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1762093805066-ca2afb453151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xsZXliYWxsJTIwZ2FtZSUyMGFjdGlvbnxlbnwxfHx8fDE3NjM2MDkxNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Player tracking demo"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Simulated tracking overlays */}
                  <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                    <Badge className="bg-blue-600">Player #4 - Setter</Badge>
                    <Badge className="bg-purple-600">Player #9 - Spiker</Badge>
                    <Badge className="bg-green-600">Player #12 - Libero</Badge>
                  </div>
                  
                  <div className="absolute bottom-4 right-4">
                    <Button variant="secondary" size="sm" className="gap-2">
                      <Play className="w-4 h-4" />
                      Play Demo
                    </Button>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-gray-900 mb-2">Real-time Player Detection</h3>
                  <p className="text-gray-600">
                    Our AI tracks each player's position, movement speed, and orientation throughout the match. 
                    Bounding boxes and IDs are maintained even during occlusions.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-blue-600">12</div>
                      <div className="text-sm text-gray-600">Players Tracked</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-blue-600">98.3%</div>
                      <div className="text-sm text-gray-600">Accuracy</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-blue-600">30 FPS</div>
                      <div className="text-sm text-gray-600">Processing</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ball" className="space-y-4">
            <Card className="overflow-hidden border-2">
              <CardContent className="p-0">
                <div className="relative">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1533739331049-c6a02504f54f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xsZXliYWxsJTIwdGVhbSUyMHBsYXlpbmd8ZW58MXx8fHwxNzYzNzA5MjA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Ball trajectory analysis"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Simulated trajectory */}
                  <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                    <path
                      d="M 100 300 Q 400 100 700 250"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                    <circle cx="700" cy="250" r="8" fill="#f59e0b" />
                  </svg>
                  
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-orange-600">Ball Velocity: 72 km/h</Badge>
                  </div>
                  
                  <div className="absolute bottom-4 right-4">
                    <Button variant="secondary" size="sm" className="gap-2">
                      <Play className="w-4 h-4" />
                      Play Demo
                    </Button>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-gray-900 mb-2">Ball Trajectory Tracking</h3>
                  <p className="text-gray-600">
                    Track the volleyball's path with frame-by-frame precision. Analyze serve speeds, spike velocities, 
                    and predict landing zones with our advanced physics engine.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-orange-600">3D</div>
                      <div className="text-sm text-gray-600">Trajectory</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-orange-600">±2cm</div>
                      <div className="text-sm text-gray-600">Precision</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-orange-600">100%</div>
                      <div className="text-sm text-gray-600">Coverage</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="court" className="space-y-4">
            <Card className="overflow-hidden border-2">
              <CardContent className="p-0">
                <div className="relative">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1671706474508-2d1e05be761d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xsZXliYWxsJTIwY291cnQlMjBhZXJpYWx8ZW58MXx8fHwxNzYzNzA5MjA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Court detection"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-4 left-4 space-y-2">
                    <Badge className="bg-green-600 block w-fit">Attack Zone Detected</Badge>
                    <Badge className="bg-cyan-600 block w-fit">Service Line Detected</Badge>
                  </div>
                  
                  <div className="absolute bottom-4 right-4">
                    <Button variant="secondary" size="sm" className="gap-2">
                      <Play className="w-4 h-4" />
                      Play Demo
                    </Button>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-gray-900 mb-2">Automatic Court Detection</h3>
                  <p className="text-gray-600">
                    Our system automatically identifies court boundaries, zones, and lines regardless of camera angle. 
                    This enables accurate spatial analysis and positioning metrics.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-green-600">6</div>
                      <div className="text-sm text-gray-600">Zones Mapped</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-green-600">Auto</div>
                      <div className="text-sm text-gray-600">Calibration</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-green-600">Any</div>
                      <div className="text-sm text-gray-600">Camera Angle</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-4">
            <Card className="overflow-hidden border-2">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
                    {/* Simulated heatmap overlay */}
                    <div className="absolute inset-0 opacity-60">
                      <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-red-500 rounded-full blur-3xl"></div>
                      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-orange-500 rounded-full blur-3xl"></div>
                      <div className="absolute top-2/3 right-1/3 w-36 h-36 bg-yellow-500 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-1/4 left-1/4 w-28 h-28 bg-green-500 rounded-full blur-3xl"></div>
                    </div>
                    
                    {/* Court outline */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="border-2 border-white/30 w-4/5 h-3/4 relative">
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/30"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-600">Player #4 - Coverage Map</Badge>
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded"></div>
                        <span>High</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                        <span>Medium</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        <span>Low</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4">
                    <Button variant="secondary" size="sm" className="gap-2">
                      <Play className="w-4 h-4" />
                      Play Demo
                    </Button>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-gray-900 mb-2">Movement Heat Maps</h3>
                  <p className="text-gray-600">
                    Visualize player coverage areas and movement patterns throughout the match. 
                    Identify hot zones, defensive gaps, and optimize positioning strategies.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-purple-600">Per Player</div>
                      <div className="text-sm text-gray-600">Analysis</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-purple-600">Team</div>
                      <div className="text-sm text-gray-600">Coverage</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-purple-600">Time</div>
                      <div className="text-sm text-gray-600">Based</div>
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
