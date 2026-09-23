"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-12 max-w-3xl mx-auto relative">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 text-xs font-literary tracking-[0.25em] uppercase text-amber-200/75 mb-3">
          <Mail className="w-3.5 h-3.5 text-amber-400" />
          <span>پیامِ شوق • Letter</span>
        </div>

        <h2 className="font-urdu text-3xl sm:text-4xl text-zinc-100 font-medium leading-[2.3] mb-2">
          ایک خاموش گفتگو
        </h2>

        <p className="font-literary italic text-base sm:text-lg text-zinc-400">
          &ldquo;A quiet conversation.&rdquo;
        </p>

        <p className="text-xs text-zinc-500 font-light mt-2 max-w-md mx-auto">
          If you too find refuge in poetry, literature, or midnight thoughts—leave a line behind.
        </p>
      </div>

      <div className="bg-[#0c0e15]/90 border border-white/[0.07] rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-md">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h3 className="font-urdu text-2xl text-zinc-100 mb-2">شکریہ، آپ کا پیغام موصول ہو گیا۔</h3>
            <p className="font-literary text-base text-zinc-400 italic mb-6">
              &ldquo;Thank you for leaving a thought in this quiet corner. I shall read it beneath the lamplight.&rdquo;
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", message: "" });
              }}
              className="text-xs font-literary tracking-wider text-amber-300 underline underline-offset-4"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-literary tracking-wider uppercase text-zinc-400 mb-2">
                  Name / قلمی نام
                </label>
                <input
                  type="text"
                  required
                  placeholder="A fellow traveler..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-literary tracking-wider uppercase text-zinc-400 mb-2">
                  Email / رابطہ
                </label>
                <input
                  type="email"
                  placeholder="your.email@quietnight.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-literary tracking-wider uppercase text-zinc-400 mb-2">
                Your Words / چند سطریں
              </label>
              <textarea
                required
                rows={4}
                placeholder="A favorite couplet, a quiet thought, or an unspoken reflection..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/50 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full text-xs font-medium tracking-widest uppercase bg-amber-500/15 text-amber-200 border border-amber-500/40 hover:bg-amber-500/25 hover:border-amber-400/60 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(197,160,89,0.15)]"
            >
              <span>Send Letter • پیغام بھیجیں</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>

      {/* Footer Colophon */}
      <footer className="mt-20 pt-8 border-t border-white/[0.05] text-center text-xs text-zinc-600">
        <p className="font-urdu text-sm text-zinc-500 leading-relaxed mb-1">
          ستاروں کی چھاؤں، اردو شاعری، اور سکوتِ شب کے لیے وقف۔
        </p>
        <p className="font-literary tracking-widest text-[11px] uppercase text-zinc-500 mb-4">
          Dedicated to quiet nights, authentic Urdu verses, and unspoken thoughts.
        </p>

        {/* Created by Raza (Urdu) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs shadow-[0_0_12px_rgba(197,160,89,0.1)]">
          <span className="text-zinc-400 font-literary tracking-wider">Created by</span>
          <span className="font-urdu text-base text-amber-300 font-medium px-0.5">رضا</span>
          <span className="text-zinc-600">•</span>
          <span className="font-urdu text-sm text-amber-200/90">تخلیق: رضا</span>
        </div>
      </footer>
    </section>
  );
}

