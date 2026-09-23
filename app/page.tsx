"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PoetrySection from "@/components/PoetrySection";
import ThoughtsSection from "@/components/ThoughtsSection";
import StoriesSection from "@/components/StoriesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import AmbientCanvas from "@/components/AmbientCanvas";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#07080b] text-[#f4eee6] overflow-hidden selection:bg-amber-500/20 selection:text-amber-200">
      {/* 1. Custom Interactive Cursor (Desktop Only) */}
      <CustomCursor />

      {/* 2. Slow-Drifting Nocturnal Dust & Moonlight Canvas */}
      <AmbientCanvas />

      {/* 3. Subtle Vignette & Moonlight Overlays */}
      <div className="fixed inset-0 cinematic-vignette pointer-events-none z-10" />
      <div className="fixed inset-0 moonlight-glow pointer-events-none z-10" />

      {/* 4. Ambient Navigation Header */}
      <Navbar />

      {/* 5. Main Single-Page Narrative Flow */}
      <main className="relative z-20">
        <Hero />
        <PoetrySection />
        <ThoughtsSection />
        <StoriesSection />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
}
