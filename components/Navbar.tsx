"use client";

import React, { useState, useEffect } from "react";
import SoundManager from "./SoundManager";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#hero", urdu: "آغاز" },
  { name: "Poetry", href: "#poetry", urdu: "شاعری" },
  { name: "Thoughts", href: "#thoughts", urdu: "خیالات" },
  { name: "Stories", href: "#stories", urdu: "کہانیاں" },
  { name: "About", href: "#about", urdu: "تعارف" },
  { name: "Contact", href: "#contact", urdu: "رابطہ" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Detect current section
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-[#08090d]/80 backdrop-blur-md border-b border-white/[0.06] py-3.5 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand / Logo: Shaggy & Urdu monoline */}
        <a
          href="#hero"
          className="group flex items-center gap-3 text-zinc-300 hover:text-white transition-colors"
        >
          <span className="font-urdu text-xl text-amber-200/90 group-hover:text-amber-200 transition-colors">
            سکوت
          </span>
          <span className="h-3 w-[1px] bg-white/20" />
          <span className="font-literary text-sm tracking-[0.25em] font-medium uppercase text-zinc-300 group-hover:text-amber-200 transition-colors">
            SHAGGY
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative group text-xs tracking-[0.16em] uppercase transition-colors duration-300 ${
                  isActive
                    ? "text-amber-200 font-medium"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                <span>{link.name}</span>
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-300 rounded-full shadow-[0_0_6px_#c5a059]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Ambient Sound & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <SoundManager />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0c12]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-sm tracking-widest text-zinc-300 hover:text-amber-200 border-b border-white/5"
              >
                <span>{link.name}</span>
                <span className="font-urdu text-sm text-zinc-500">{link.urdu}</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

