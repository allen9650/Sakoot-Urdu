"use client";

import React from "react";
import { motion } from "framer-motion";
import { JOURNAL_THOUGHTS, JournalThought } from "@/data/thoughts";
import { Clock, BookOpen, PenTool } from "lucide-react";

export default function ThoughtsSection() {
  return (
    <section id="thoughts" className="py-24 px-6 sm:px-12 max-w-5xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 text-xs font-literary tracking-[0.25em] uppercase text-amber-200/75 mb-3"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>صفحاتِ بیاض • Private Journal</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-urdu text-3xl sm:text-4xl text-zinc-100 font-medium leading-[2.3] mb-2"
        >
          کچھ ان کہی باتیں
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-literary italic text-base sm:text-lg text-zinc-400"
        >
          &ldquo;A few unspoken thoughts.&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs text-zinc-500 font-light mt-3"
        >
          Original reflections penned in the quiet hours between midnight and dawn.
        </motion.p>
      </div>

      {/* Journal Pages Grid (Masonry / 2-column aesthetic) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {JOURNAL_THOUGHTS.map((thought: JournalThought, index: number) => (
          <motion.article
            key={thought.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.12 }}
            className="group relative bg-[#0d0f17]/80 hover:bg-[#121622]/90 border border-white/[0.07] hover:border-amber-500/25 rounded-2xl p-7 sm:p-9 transition-all duration-500 flex flex-col justify-between shadow-lg"
          >
            {/* Subtle vintage bookmark line */}
            <div className="absolute top-0 right-8 w-6 h-1 bg-amber-400/40 rounded-b-sm group-hover:h-3 transition-all duration-300" />

            <div>
              {/* Journal Meta */}
              <div className="flex items-center justify-between text-xs text-zinc-500 border-b border-white/[0.05] pb-3 mb-6">
                <span className="flex items-center gap-1.5 font-literary tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-amber-400/60" />
                  {thought.time}
                </span>
                <span className="text-[11px] text-zinc-400 italic">
                  {thought.reflectionNote}
                </span>
              </div>

              {/* Urdu Reflection */}
              <p className="font-urdu text-lg sm:text-xl text-zinc-200 text-right leading-[2.4] mb-6 transition-colors group-hover:text-amber-100">
                {thought.urdu}
              </p>

              {/* English Interpretation */}
              <p className="font-literary text-sm sm:text-base text-zinc-400 italic leading-relaxed border-l-2 border-white/10 pl-3">
                &ldquo;{thought.english}&rdquo;
              </p>
            </div>

            {/* Bottom personal signature tag */}
            <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-zinc-500">
              <span className="font-literary tracking-widest uppercase">Personal Journal</span>
              <PenTool className="w-3 h-3 text-zinc-600 group-hover:text-amber-300/80 transition-colors" />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

