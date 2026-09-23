"use client";

import React from "react";
import { motion } from "framer-motion";
import InteractiveCharacter from "./InteractiveCharacter";
import { ChevronDown, Feather } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Top spacing / atmosphere */}
      <div className="hidden lg:block h-6" />

      {/* Main Composition Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        {/* Left Column: Poetic Urdu Typography & Intimate Atmosphere (5 cols on lg) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col order-2 lg:order-1 text-center lg:text-right"
        >
          {/* Subtle poetic badge */}
          <div className="flex items-center justify-center lg:justify-end gap-2 text-xs font-literary tracking-[0.25em] uppercase text-amber-200/80 mb-6">
            <Feather className="w-3.5 h-3.5 text-amber-400" />
            <span>گوشۂ تنہائی • SHAGGY</span>
          </div>

          {/* Primary Urdu Headline */}
          <h1 className="font-urdu text-2xl sm:text-3xl lg:text-4xl text-zinc-100 font-medium leading-[2.4] mb-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            کچھ باتیں کہنے سے زیادہ، محسوس کرنے کے لیے ہوتی ہیں۔
          </h1>

          {/* Primary English Subtitle */}
          <p className="font-literary italic text-base sm:text-lg text-zinc-400 mb-8 max-w-md mx-auto lg:mr-0 lg:ml-auto">
            &ldquo;Some things are meant to be felt more than spoken.&rdquo;
          </p>

          {/* Subtle separator */}
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mx-auto lg:mr-0 lg:ml-auto mb-8" />

          {/* Secondary Urdu Line */}
          <p className="font-urdu text-lg sm:text-xl text-zinc-300 leading-[2.3] mb-2">
            ایک خاموش مزاج، شاعری کا دیوانہ، اور کچھ ادھورے خیال...
          </p>

          {/* Secondary English Translation */}
          <p className="text-xs sm:text-sm font-light tracking-wide text-zinc-500">
            A quiet soul, a lover of poetry, and a few unfinished thoughts...
          </p>

          {/* Atmospheric CTA / Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-end gap-4">
            <a
              href="#poetry"
              className="px-6 py-2.5 rounded-full text-xs font-medium tracking-widest uppercase bg-amber-500/10 text-amber-200 border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-400/50 transition-all duration-300 shadow-[0_0_15px_rgba(197,160,89,0.15)]"
            >
              اشعار ملاحظہ کریں • Explore Verses
            </a>
            <a
              href="#thoughts"
              className="px-6 py-2.5 rounded-full text-xs font-medium tracking-widest uppercase bg-white/[0.03] text-zinc-400 border border-white/10 hover:text-zinc-200 hover:border-white/20 transition-all duration-300"
            >
              Unspoken Thoughts
            </a>
          </div>
        </motion.div>

        {/* Right Column: Interactive Character (Centerpiece, 7 cols on lg) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-center justify-center order-1 lg:order-2 relative"
        >
          <InteractiveCharacter />
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="flex flex-col items-center justify-center gap-2 pt-6 text-zinc-600 hover:text-zinc-400 transition-colors pointer-events-auto"
      >
        <a
          href="#poetry"
          className="flex flex-col items-center gap-1.5 group"
          aria-label="Scroll to poetry section"
        >
          <span className="text-[10px] font-literary tracking-[0.25em] uppercase text-zinc-500 group-hover:text-amber-200/80 transition-colors">
            Scroll into the quiet
          </span>
          <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-amber-300 animate-bounce transition-colors" />
        </a>
      </motion.div>
    </section>
  );
}

