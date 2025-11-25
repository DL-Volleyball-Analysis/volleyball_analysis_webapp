import { Button } from "./ui/button";
import { ArrowRight, Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white mb-6 text-4xl font-bold">
            Ready to Transform Your Volleyball Analysis?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join teams and coaches already using our AI-powered platform to gain competitive advantages
            and improve player performance.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2"
              onClick={() => window.open('https://github.com/itsYoga/volleyball-analysis', '_blank')}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
              onClick={() => window.open('https://github.com/itsYoga/volleyball-analysis', '_blank')}
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Free & Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">No Credit Card</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
