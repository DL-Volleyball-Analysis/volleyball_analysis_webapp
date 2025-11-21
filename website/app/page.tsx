import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SystemScreenshots from "@/components/SystemScreenshots";
import ProfessionalAt from "@/components/ProfessionalAt";
import DemoSection from "@/components/DemoSection";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <SystemScreenshots />
      <ProfessionalAt />
      <DemoSection />
      <Footer />
    </main>
  );
}

