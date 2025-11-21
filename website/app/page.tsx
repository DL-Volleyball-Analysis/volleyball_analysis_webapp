"use client";

import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import SystemScreenshots from "@/components/SystemScreenshots";
import ProfessionalAt from "@/components/ProfessionalAt";
import { Demo } from "@/components/Demo";
import { Stats } from "@/components/Stats";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Stats />
      <Features />
      <SystemScreenshots />
      <ProfessionalAt />
      <Demo />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}

