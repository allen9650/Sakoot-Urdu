"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STORIES_DATA, StoryItem } from "@/data/stories";
import { Compass, BookMarked, ArrowUpRight, X } from "lucide-react";

export default function StoriesSection() {
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);

  return (
    <section id="stories" className="py-24 px-6 sm:px-12 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 text-xs font-literary tracking-[0.25em] uppercase text-amber-200/75 mb-3"
        >
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>مستقبل کی تحریریں • Forthcoming Writings</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-urdu text-3xl sm:text-4xl text-zinc-100 font-medium leading-[2.3] mb-2"
        >
          کہانیاں
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-literary italic text-base sm:text-lg text-zinc-400"
        >
          &ldquo;Stories waiting between quiet moments.&rdquo;
        </motion.p>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STORIES_DATA.map((story: StoryItem, index: number) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            onClick={() => setActiveStory(story)}
            className="group cursor-pointer bg-[#0b0c13]/80 hover:bg-[#111420]/95 border border-white/[0.06] hover:border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between transition-all duration-400 hover:-translate-y-1 shadow-md hover:shadow-2xl"
          >
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-4">
                <span className="font-literary tracking-wider uppercase text-zinc-400">
                  {story.category}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/[0.04] text-[10px] text-amber-300/80 border border-white/5">
                  {story.status}
                </span>
              </div>

              {/* Title (Urdu + English) */}
              <h3 className="font-urdu text-xl text-zinc-100 font-medium text-right mb-2 group-hover:text-amber-200 transition-colors">
                {story.titleUrdu}
              </h3>
              <p className="font-literary text-base text-zinc-300 mb-4">
                {story.title}
              </p>

              {/* Excerpt */}
              <p className="text-xs text-zinc-500 line-clamp-3 leading-relaxed">
                {story.excerpt}
              </p>
            </div>

            {/* Card Footer */}
            <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs text-zinc-500">
              <span className="text-[11px]">{story.readTime}</span>
              <span className="flex items-center gap-1 text-zinc-400 group-hover:text-amber-300 transition-colors text-[11px]">
                Preview <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reader Preview Modal */}
      <AnimatePresence>
        {activeStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg bg-[#0e111a] border border-amber-500/30 rounded-2xl p-8 shadow-2xl"
            >
              <button
                onClick={() => setActiveStory(null)}
                className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-full bg-white/5 transition-colors"
                aria-label="Close preview"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-literary tracking-wider uppercase text-amber-300/80 mb-3">
                <BookMarked className="w-4 h-4 text-amber-400" />
                <span>{activeStory.category} • {activeStory.status}</span>
              </div>

              <h3 className="font-urdu text-2xl text-zinc-100 text-right leading-[2.2] mb-1">
                {activeStory.titleUrdu}
              </h3>
              <p className="font-literary text-lg text-amber-100/90 mb-6">
                {activeStory.title}
              </p>

              <div className="border-t border-b border-white/[0.06] py-5 my-4">
                <p className="font-literary italic text-base text-zinc-300 leading-relaxed mb-4">
                  &ldquo;{activeStory.excerpt}&rdquo;
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  This narrative is part of an ongoing manuscript of nocturnal reflections. The full essay will be unveiled as the seasons shift.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-500 pt-2">
                <span>{activeStory.date}</span>
                <span>{activeStory.readTime}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

