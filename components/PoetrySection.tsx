"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { VERIFIED_POETRY, PoetryItem } from "@/data/poetry";
import { ExternalLink, Bookmark, Sparkles } from "lucide-react";

export default function PoetrySection() {
  const [selectedPoet, setSelectedPoet] = useState<"ALL" | "FAIZ" | "FARAZ">("ALL");

  const filteredPoetry = VERIFIED_POETRY.filter((item) => {
    if (selectedPoet === "FAIZ") return item.poet === "فیض احمد فیض";
    if (selectedPoet === "FARAZ") return item.poet === "احمد فراز";
    return true;
  });

  return (
    <section id="poetry" className="py-24 px-6 sm:px-12 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 text-xs font-literary tracking-[0.25em] uppercase text-amber-200/75 mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>منتخب کلام • Selected Verses</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-urdu text-3xl sm:text-4xl text-zinc-100 font-medium leading-[2.3] mb-2"
        >
          چند اشعار، کچھ احساسات
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-literary italic text-base sm:text-lg text-zinc-400"
        >
          &ldquo;A few verses, a few feelings.&rdquo;
        </motion.p>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-2 mt-8 flex-wrap"
        >
          {[
            { key: "ALL", label: "تمام اشعار • All" },
            { key: "FAIZ", label: "فیض احمد فیض • Faiz" },
            { key: "FARAZ", label: "احمد فراز • Faraz" }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedPoet(tab.key as "ALL" | "FAIZ" | "FARAZ")}
              className={`px-4 py-1.5 rounded-full text-xs tracking-wider transition-all duration-300 border ${
                selectedPoet === tab.key
                  ? "bg-amber-500/15 text-amber-200 border-amber-500/40 shadow-[0_0_10px_rgba(197,160,89,0.2)]"
                  : "bg-white/[0.02] text-zinc-400 border-white/5 hover:border-white/20 hover:text-zinc-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Vertical Storytelling Poetry Cards */}
      <div className="flex flex-col gap-10">
        {filteredPoetry.map((item: PoetryItem, idx: number) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: idx * 0.1 }}
            className="group relative bg-[#0b0d14]/70 hover:bg-[#0f121c]/90 border border-white/[0.06] hover:border-amber-500/30 rounded-2xl p-8 sm:p-12 transition-all duration-500 shadow-xl backdrop-blur-sm"
          >
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-end">
              {/* Card Meta Top: Poet Attribution & Theme */}
              <div className="w-full flex items-center justify-between border-b border-white/[0.06] pb-4 mb-8">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-amber-400/70" />
                  <span className="text-[11px] font-literary tracking-[0.2em] uppercase text-zinc-500">
                    {item.theme}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-amber-200/90 font-medium">
                    {item.poetEnglish}
                  </span>
                  <span className="h-3 w-[1px] bg-white/20" />
                  <span className="font-urdu text-sm text-amber-200">
                    {item.poet}
                  </span>
                </div>
              </div>

              {/* Urdu Couplet (Large Elegant RTL Typography) */}
              <div className="w-full text-right my-2">
                {item.verseUrdu.map((line, lIdx) => (
                  <p
                    key={lIdx}
                    className="font-urdu text-xl sm:text-2xl lg:text-3xl text-zinc-100 font-medium leading-[2.5] tracking-wide transition-colors duration-300 group-hover:text-amber-100"
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* English Translation */}
              <p className="w-full text-left font-literary italic text-sm sm:text-base text-zinc-400 mt-6 border-l-2 border-amber-500/30 pl-4 py-1">
                &ldquo;{item.translationEnglish}&rdquo;
              </p>

              {/* Card Footer: Poem Title & Rekhta Verification Citation */}
              <div className="w-full flex items-center justify-between pt-6 mt-6 border-t border-white/[0.04]">
                <span className="text-xs text-zinc-500 font-literary">
                  عنوان: <span className="text-zinc-300 font-urdu">{item.title}</span>
                </span>

                <a
                  href={item.rekhtaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-amber-300 transition-colors"
                  title="Verify on Rekhta"
                >
                  <span>ملاحظہ ریختہ • Verified Source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

