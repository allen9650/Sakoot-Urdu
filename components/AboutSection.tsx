"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Coffee, Moon, Music2, BookHeart } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 sm:px-12 max-w-4xl mx-auto relative">
      <div className="relative bg-[#0d0f17]/90 border border-white/[0.07] rounded-3xl p-8 sm:p-14 shadow-2xl backdrop-blur-md overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs font-literary tracking-[0.25em] uppercase text-amber-200/80 mb-6">
          <User className="w-3.5 h-3.5 text-amber-400" />
          <span>تعارف • The Portrait</span>
        </div>

        {/* Primary Urdu Poetic Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-urdu text-2xl sm:text-3xl lg:text-4xl text-zinc-100 font-medium leading-[2.5] text-right mb-2"
        >
          میں زیادہ بولتا نہیں، مگر بہت کچھ سوچتا ہوں۔
        </motion.h2>

        {/* English Translation */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-literary italic text-base sm:text-lg text-zinc-400 mb-8 text-right"
        >
          &ldquo;I do not speak much, yet my thoughts wander far into the quiet.&rdquo;
        </motion.p>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/[0.06] mb-8" />

        {/* Narrative Paragraphs */}
        <div className="space-y-6 text-zinc-300 font-light text-sm sm:text-base leading-relaxed">
          <p>
            I have always felt most alive when the day settles into night. While the world chases loud rooms and perpetual speed, I find solace in the slower cadence of things: the gentle rustle of book pages, the resonant weight of an authentic Faiz couplet, and conversations that dare to go beneath the surface.
          </p>

          <p className="text-zinc-400">
            People often perceive quietness as detachment. Yet with those I genuinely connect with, that silence transforms into an effortless warmth—laughter, vulnerability, and ideas explored until the early hours. I observe more than I proclaim, not out of secrecy, but because true understanding begins by listening.
          </p>
        </div>

        {/* Quiet passions pills */}
        <div className="mt-10 pt-6 border-t border-white/[0.05] grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Moon, label: "Quiet Nights", urdu: "شبِ خاموش" },
            { icon: BookHeart, label: "Urdu Poetry", urdu: "شاعری" },
            { icon: Music2, label: "Soft Melodies", urdu: "موسیقی" },
            { icon: Coffee, label: "Solitude & Tea", urdu: "تنہائی اور چائے" }
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center"
            >
              <item.icon className="w-4 h-4 text-amber-300/80 mb-1.5" />
              <span className="text-xs text-zinc-300 font-medium">{item.label}</span>
              <span className="font-urdu text-[11px] text-zinc-500 mt-0.5">{item.urdu}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

