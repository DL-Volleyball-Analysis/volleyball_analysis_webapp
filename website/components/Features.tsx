import { 
  Users, 
  Target, 
  Activity, 
  Map, 
  TrendingUp, 
  Video,
  Zap,
  BarChart3,
  Eye
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function Features() {
  const features = [
    {
      icon: Users,
      title: "Player Detection & Tracking",
      description: "Advanced AI identifies and tracks individual players throughout the match with precise positioning data.",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Target,
      title: "Ball Trajectory Analysis",
      description: "Track ball movement in 3D space, analyze serve velocities, and predict landing positions.",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Map,
      title: "Court Line Detection",
      description: "Automatically detects court boundaries and zones for accurate spatial analysis and positioning metrics.",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Activity,
      title: "Movement Analytics",
      description: "Analyze player movements, speed, and positioning patterns to optimize team strategies.",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: Eye,
      title: "Action Recognition",
      description: "Identify specific actions like spikes, blocks, digs, and serves with timestamp precision.",
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      icon: TrendingUp,
      title: "Performance Metrics",
      description: "Generate comprehensive statistics including success rates, coverage areas, and reaction times.",
      color: "text-cyan-600",
      bgColor: "bg-cyan-100"
    },
    {
      icon: Video,
      title: "Video Processing",
      description: "Process match recordings with support for multiple camera angles and video formats.",
      color: "text-pink-600",
      bgColor: "bg-pink-100"
    },
    {
      icon: BarChart3,
      title: "Team Formation Analysis",
      description: "Visualize and analyze team formations, rotations, and strategic positioning throughout the game.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Get instant analysis and insights with our optimized processing pipeline running at 30+ FPS.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full mb-4">
            Features
          </div>
          <h2 className="text-gray-900 mb-4">
            Powerful Analysis Tools for Every Aspect of the Game
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive suite of AI-powered features provides deep insights into every moment of your volleyball matches.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-2 hover:border-blue-200 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
