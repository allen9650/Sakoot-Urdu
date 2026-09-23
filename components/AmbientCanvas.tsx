"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speedY: number;
  speedX: number;
  phase: number;
  phaseSpeed: number;
}

export default function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive particle count
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 75;

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.45 + 0.15,
        speedY: -(Math.random() * 0.25 + 0.08),
        speedX: (Math.random() - 0.5) * 0.15,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.015 + 0.005
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    const render = () => {
      // Smooth lerp mouse coordinates
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

      ctx.clearRect(0, 0, width, height);

      // 1. Soft nocturnal moonlight radial glow in upper background
      const moonX = width * 0.72 + (mouseX - width / 2) * 0.02;
      const moonY = height * 0.22 + (mouseY - height / 2) * 0.02;
      const moonGrad = ctx.createRadialGradient(
        moonX,
        moonY,
        10,
        moonX,
        moonY,
        width * 0.55
      );
      moonGrad.addColorStop(0, "rgba(143, 165, 184, 0.07)");
      moonGrad.addColorStop(0.4, "rgba(90, 110, 135, 0.025)");
      moonGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = moonGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle warm candlelight / tea ambience in lower corner
      const warmGrad = ctx.createRadialGradient(
        width * 0.15,
        height * 0.85,
        10,
        width * 0.15,
        height * 0.85,
        width * 0.4
      );
      warmGrad.addColorStop(0, "rgba(197, 160, 89, 0.035)");
      warmGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = warmGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. Floating dust particles & subtle star motes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.phase += p.phaseSpeed;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.phase) * 0.2;

        // Subtle mouse parallax reaction
        const dx = (p.x - mouseX) / width;
        const dy = (p.y - mouseY) / height;
        const distSq = dx * dx + dy * dy;
        if (distSq < 0.04) {
          p.x += dx * 0.5;
          p.y += dy * 0.5;
        }

        // Loop boundaries
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Twinkle factor
        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.phase));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225, 235, 245, ${currentAlpha.toFixed(3)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
}

