"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isNearCharacter, setIsNearCharacter] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Smooth spring physics for organic, non-laggy cursor movement
  const cursorX = useSpring(0, { stiffness: 450, damping: 32 });
  const cursorY = useSpring(0, { stiffness: 450, damping: 32 });

  useEffect(() => {
    // Detect touch device / coarse pointer
    const checkTouch = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
      );
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check proximity to character container
      const characterEl = document.getElementById("interactive-character-stage");
      if (characterEl) {
        const rect = characterEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        setIsNearCharacter(dist < rect.width * 0.75);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "button, a, input, textarea, [data-interactive='true'], .interactive-hover"
      );
      setIsHovered(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousemove", handleElementHover, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleElementHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer subtle aura */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          width: isNearCharacter ? 52 : isHovered ? 40 : 26,
          height: isNearCharacter ? 52 : isHovered ? 40 : 26,
          backgroundColor: isNearCharacter
            ? "rgba(143, 165, 184, 0.18)"
            : isHovered
            ? "rgba(197, 160, 89, 0.15)"
            : "rgba(255, 255, 255, 0.04)",
          borderColor: isNearCharacter
            ? "rgba(143, 165, 184, 0.4)"
            : isHovered
            ? "rgba(197, 160, 89, 0.4)"
            : "rgba(255, 255, 255, 0.2)",
          borderWidth: 1,
          boxShadow: isNearCharacter
            ? "0 0 20px rgba(143, 165, 184, 0.3)"
            : "none"
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />

      {/* Center pinpoint */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-amber-100"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          width: isHovered ? 6 : 4,
          height: isHovered ? 6 : 4,
          opacity: 0.85
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}

