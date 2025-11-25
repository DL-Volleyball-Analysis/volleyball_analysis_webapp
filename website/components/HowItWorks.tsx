import { Upload, Cpu, BarChart, Download } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      step: "01",
      title: "Upload Your Video",
      description: "Upload match recordings in any common video format. Supports multiple camera angles and resolutions.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Cpu,
      step: "02",
      title: "AI Processing",
      description: "Our AI engine analyzes every frame, detecting players, tracking the ball, and identifying court zones automatically.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: BarChart,
      step: "03",
      title: "Get Insights",
      description: "Review comprehensive analytics, statistics, and visualizations including heat maps, trajectory plots, and performance metrics.",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Download,
      step: "04",
      title: "Export & Share",
      description: "Export annotated videos, generate reports, and share insights with your team to improve performance.",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full mb-4">
            How It Works
          </div>
          <h2 className="text-gray-900 mb-4">
            From Video to Insights in Four Simple Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our streamlined process makes advanced volleyball analysis accessible to everyone.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <Card className="border-2 h-full">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 ${step.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                        <Icon className={`w-8 h-8 ${step.color}`} />
                      </div>
                      <div className={`text-sm ${step.color} mb-2`}>
                        STEP {step.step}
                      </div>
                      <h3 className="text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </CardContent>
                  </Card>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-gray-900 mb-2">Powered By Cutting-Edge Technology</h3>
            <p className="text-gray-600">Built with industry-leading computer vision and machine learning frameworks</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: "Python", icon: "🐍" },
              { name: "OpenCV", icon: "👁️" },
              { name: "YOLO", icon: "⚡" },
              { name: "Ultralytics", icon: "🚀" },
              { name: "TensorFlow", icon: "🧠" },
              { name: "PyTorch", icon: "🔥" }
            ].map((tech, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="text-3xl mb-2">{tech.icon}</div>
                <div className="text-gray-900">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
