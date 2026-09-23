"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FLOATING_POETRY_SNIPPETS } from "@/data/poetry";

interface FloatingQuote {
  id: number;
  urdu: string;
  poet: string;
  x: number;
  y: number;
}

export default function InteractiveCharacter() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Raw mouse coordinates normalized between -1 and 1
  const [targetCoord, setTargetCoord] = useState({ x: 0, y: 0 });
  const [currentCoord, setCurrentCoord] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isReacting, setIsReacting] = useState(false);
  const [floatingQuotes, setFloatingQuotes] = useState<FloatingQuote[]>([]);
  const quoteCounter = useRef(0);
  const lastMouseMoveTime = useRef(Date.now());
  const isTouchRef = useRef(false);

  // 1. Mouse Tracking & Idle Drift Detection
  useEffect(() => {
    isTouchRef.current =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    const handleMouseMove = (e: MouseEvent) => {
      lastMouseMoveTime.current = Date.now();
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.35; // centered near head/eyes

      const dx = (e.clientX - centerX) / (window.innerWidth * 0.5);
      const dy = (e.clientY - centerY) / (window.innerHeight * 0.5);

      // Clamp target between -1 and 1
      setTargetCoord({
        x: Math.max(-1, Math.min(1, dx)),
        y: Math.max(-1, Math.min(1, dy))
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 2. Smooth Damping Physics & Idle Wandering Loop
  useEffect(() => {
    let animId: number;
    let t = 0;

    const loop = () => {
      t += 0.02;
      const idleTime = Date.now() - lastMouseMoveTime.current;
      const isIdle = idleTime > 2500 || isTouchRef.current;

      let effectiveTargetX = targetCoord.x;
      let effectiveTargetY = targetCoord.y;

      if (isIdle) {
        // Subtle autonomous gazing when idle or on mobile
        effectiveTargetX = Math.sin(t * 0.7) * 0.35 + Math.cos(t * 0.3) * 0.15;
        effectiveTargetY = Math.sin(t * 0.5) * 0.25 - 0.05;
      }

      // Smooth interpolation (lerp damping)
      setCurrentCoord((prev) => ({
        x: prev.x + (effectiveTargetX - prev.x) * 0.065,
        y: prev.y + (effectiveTargetY - prev.y) * 0.065
      }));

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [targetCoord]);

  // 3. Interactive Click / Tap Reaction (No winking/blinking)
  const handleCharacterClick = useCallback(
    (e: React.MouseEvent) => {
      setIsReacting(true);
      setTimeout(() => setIsReacting(false), 550);

      // Spawn a soft floating poetry line
      const snippet =
        FLOATING_POETRY_SNIPPETS[
          quoteCounter.current % FLOATING_POETRY_SNIPPETS.length
        ];
      quoteCounter.current += 1;

      const rect = containerRef.current?.getBoundingClientRect();
      const clickX = e.clientX - (rect?.left || 0);
      const clickY = e.clientY - (rect?.top || 0);

      const newQuote: FloatingQuote = {
        id: Date.now() + Math.random(),
        urdu: snippet.urdu,
        poet: snippet.poet,
        x: clickX || 180,
        y: clickY || 150
      };

      setFloatingQuotes((prev) => [...prev.slice(-3), newQuote]);
    },
    []
  );

  // Compute 3D Transforms
  // Head subtle yaw & pitch
  const headRotateY = currentCoord.x * 7.5; // -7.5deg to +7.5deg
  const headRotateX = -currentCoord.y * 5.0; // -5.0deg to +5.0deg
  const headRotateZ = currentCoord.x * 1.2; // subtle head tilt

  // Torso / shoulders rotate less (creating anatomical depth)
  const bodyRotateY = currentCoord.x * 2.8;
  const bodyRotateX = -currentCoord.y * 1.8;

  // Pupil offsets in pixels (clamped to realistic ocular radius so pupil stays inside eye)
  const pupilOffsetX = currentCoord.x * 4.8;
  const pupilOffsetY = currentCoord.y * 3.4;

  // Subtle dynamic light coordinates based on mouse
  const lightX = 50 + currentCoord.x * 30;
  const lightY = 30 + currentCoord.y * 25;

  return (
    <div
      id="interactive-character-stage"
      ref={containerRef}
      onClick={handleCharacterClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-[420px] sm:max-w-[460px] md:max-w-[500px] aspect-[736/876] mx-auto select-none cursor-pointer group"
      style={{ perspective: 1200 }}
      title="Click to interact"
    >
      {/* 1. Behind Character: Soft Moonlight Aura */}
      <div
        className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-40 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(143, 165, 184, 0.25) 0%, rgba(197, 160, 89, 0.08) 45%, transparent 70%)`
        }}
      />

      {/* 2. Floating Poetry Snippets Spawning on Interaction */}
      <AnimatePresence>
        {floatingQuotes.map((q) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, y: -80, scale: 0.95 }}
            transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-30 pointer-events-none whitespace-nowrap bg-[#0d0f16]/90 border border-amber-500/30 px-4 py-2 rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.6)] backdrop-blur-md"
            style={{
              left: Math.max(20, Math.min(260, q.x - 100)),
              top: Math.max(10, q.y - 60)
            }}
          >
            <p className="font-urdu text-base text-amber-200/95 leading-relaxed text-right">
              {q.urdu}
            </p>
            <p className="text-[10px] text-zinc-400 font-literary tracking-wider text-right mt-0.5">
              — {q.poet}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 3. Main Character Rig Container */}
      <motion.div
        className="relative w-full h-full transform-gpu"
        animate={{
          scale: isReacting ? 1.025 : 1,
          y: isReacting ? -4 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          transformStyle: "preserve-3d",
          rotateY: bodyRotateY,
          rotateX: bodyRotateX
        }}
      >
        {/* Subtle breathing animation container */}
        <div className="relative w-full h-full animate-[pulse_4.5s_ease-in-out_infinite]">
          {/* Base Character Image Layer (Transparent Clean Sclera PNG - No Static Pupils or Back Dots) */}
          <div className="relative w-full h-full">
            <Image
              src="/images/character.png"
              alt="Contemplative young man character"
              width={736}
              height={876}
              priority
              className="w-full h-full object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
            />
          </div>

          {/* 4. Enhanced Eye Pupils Tracking Layer (Exact Hazel Iris Sprite from Artwork) */}
          {/* Left Eye (Viewer's Left: ~50.58% X, ~34.27% Y) */}
          <div
            className="absolute pointer-events-none select-none rounded-full overflow-hidden"
            style={{
              left: "50.58%",
              top: "34.27%",
              width: "4.8%",
              height: "4.0%",
              minWidth: "22px",
              minHeight: "22px",
              borderRadius: "50%",
              clipPath: "circle(50% at 50% 50%)",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.75)",
              transform: `translate(calc(-50% + ${pupilOffsetX}px), calc(-50% + ${pupilOffsetY}px))`,
              transition: "transform 0.08s cubic-bezier(0.2, 0.8, 0.4, 1)"
            }}
          >
            <Image
              src="/images/shaggy-iris.png"
              alt="Shaggy left eye iris"
              width={32}
              height={32}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Right Eye (Viewer's Right: ~59.52% X, ~34.15% Y) */}
          <div
            className="absolute pointer-events-none select-none rounded-full overflow-hidden"
            style={{
              left: "59.52%",
              top: "34.15%",
              width: "4.8%",
              height: "4.0%",
              minWidth: "22px",
              minHeight: "22px",
              borderRadius: "50%",
              clipPath: "circle(50% at 50% 50%)",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.75)",
              transform: `translate(calc(-50% + ${pupilOffsetX}px), calc(-50% + ${pupilOffsetY}px))`,
              transition: "transform 0.08s cubic-bezier(0.2, 0.8, 0.4, 1)"
            }}
          >
            <Image
              src="/images/shaggy-iris.png"
              alt="Shaggy right eye iris"
              width={32}
              height={32}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* 5. Dynamic Specular Moonlight Lighting Sheen */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-60 rounded-full transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255, 255, 255, 0.35) 0%, transparent 55%)`
            }}
          />
        </div>
      </motion.div>

      {/* 6. Subtle interactive invitation tooltip */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-75 transition-opacity duration-300 text-center pointer-events-none">
        <span className="text-[11px] font-literary tracking-[0.25em] uppercase text-zinc-400">
          Click to awaken thoughts
        </span>
      </div>
    </div>
  );
}
