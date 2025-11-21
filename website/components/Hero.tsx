import { Button } from "./ui/button";
import { Play, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600">⚡</span>
            </div>
            <span className="text-white">VolleyAnalytics</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-white/90 hover:text-white transition-colors">
              Features
            </a>
            <a href="#demo" className="text-white/90 hover:text-white transition-colors">
              Demo
            </a>
            <a href="#how-it-works" className="text-white/90 hover:text-white transition-colors">
              How It Works
            </a>
            <Button variant="secondary" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/90 text-sm">AI-Powered Volleyball Analysis</span>
            </div>
            
            <h1 className="text-white mb-6">
              Transform Your Volleyball Game with Advanced Video Analysis
            </h1>
            
            <p className="text-xl text-white/90 mb-8">
              Leverage cutting-edge computer vision and AI to analyze player movements, track ball trajectories, 
              and gain actionable insights from your volleyball matches.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" className="gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1762093805066-ca2afb453151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xsZXliYWxsJTIwZ2FtZSUyMGFjdGlvbnxlbnwxfHx8fDE3NjM2MDkxNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Volleyball game analysis"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                  ✓
                </div>
                <div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                  <div className="text-gray-900">98.5%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
