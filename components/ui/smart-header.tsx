"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  MapPin,
  Clock,
  Landmark,
  Menu,
  X,
  Sparkles,
  ArrowUp,
} from "lucide-react";

export interface LandmarkItem {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  year: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const LANDMARKS: LandmarkItem[] = [
  {
    id: "metro-hero",
    name: "Lucknow Metro",
    shortName: "Metro",
    tagline: "The City Opens · Modern 3D Horizon",
    year: "Modern 3D",
    icon: Compass,
  },
  {
    id: "temple-experience",
    name: "Hanuman Setu",
    shortName: "Hanuman Setu",
    tagline: "Divine Sanctum & Sacred Gate",
    year: "1960s",
    icon: Sparkles,
  },
  {
    id: "bada-imambara-360",
    name: "Bada Imambara",
    shortName: "Bada Imambara",
    tagline: "3D Labyrinth & Column-less Asafi Hall",
    year: "1784 AD",
    icon: Landmark,
  },
  {
    id: "ghanta-ghar-section",
    name: "Clock Tower",
    shortName: "Clock Tower",
    tagline: "India's Tallest Clock Tower",
    year: "1887 AD",
    icon: Clock,
  },
  {
    id: "hazratganj-360-section",
    name: "Hazratganj 3D",
    shortName: "Hazratganj",
    tagline: "Heritage Promenade & Victorian Boulevard",
    year: "1842 AD",
    icon: MapPin,
  },
];

export default function SmartHeader() {
  const [activeId, setActiveId] = useState<string>("metro-hero");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Scroll Detection: Hide at top, Reveal smoothly on scroll while remaining transparent
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      // Show header only after scrolling past the top hero section threshold
      setIsVisible(currentScroll > 80);

      // Determine active section based on scroll position
      const viewportCenter = currentScroll + window.innerHeight * 0.4;
      let matched = LANDMARKS[0].id;

      for (let i = LANDMARKS.length - 1; i >= 0; i--) {
        const item = LANDMARKS[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (viewportCenter >= top) {
            matched = item.id;
            break;
          }
        }
      }
      setActiveId(matched);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (id === "metro-hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentLandmark = LANDMARKS.find((l) => l.id === activeId) || LANDMARKS[0];

  return (
    <>
      {/* Floating Transparent Round Header - Hidden at top, appears on scroll */}
      <header
        className={`fixed top-3.5 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl transition-all duration-500 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-6 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between gap-4 sm:gap-6 rounded-full transition-all duration-300 px-4 sm:px-6 py-2 sm:py-2.5 bg-black/30 backdrop-blur-md border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          {/* BRAND LOGO & TITLE */}
          <div
            onClick={() => scrollTo("metro-hero")}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20 text-cyan-400 group-hover:bg-white/20 transition-colors">
              <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
            </div>

            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-extrabold tracking-wider text-white uppercase font-sans drop-shadow-md">
                LUCKNOW
              </span>
              <span className="text-[10px] text-gray-300/80 font-normal hidden sm:inline-block drop-shadow">
                Smile, you are in Lucknow
              </span>
            </div>
          </div>

          {/* DESKTOP NAVIGATION PILLS (ROUND CAPSULES) */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-1.5">
            {LANDMARKS.map((landmark) => {
              const isActive = activeId === landmark.id;
              const Icon = landmark.icon;
              return (
                <button
                  key={landmark.id}
                  onClick={() => scrollTo(landmark.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 select-none ${
                    isActive
                      ? "text-white font-semibold bg-white/20 backdrop-blur-md border border-white/25 shadow-sm"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-gray-400"}`} />
                  <span>{landmark.shortName}</span>
                </button>
              );
            })}
          </nav>

          {/* MOBILE ONLY: ACTIVE PILL + ROUND HAMBURGER */}
          <div className="flex md:hidden items-center gap-2">
            <div
              onClick={() => scrollTo(currentLandmark.id)}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-[11px] text-white font-medium cursor-pointer"
            >
              <span>{currentLandmark.shortName}</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full bg-white/15 border border-white/20 text-white hover:bg-white/25 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* MOBILE SLIDE-DOWN DRAWER */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="md:hidden mt-2 p-3 rounded-3xl bg-[#070b16]/95 backdrop-blur-2xl border border-white/15 shadow-2xl space-y-1.5 max-w-sm mx-auto overflow-hidden"
            >
              <div className="px-2 py-1 border-b border-white/10">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Heritage Landmarks
                </span>
              </div>

              <div className="grid grid-cols-1 gap-1.5 pt-1">
                {LANDMARKS.map((lm) => {
                  const isCurrent = activeId === lm.id;
                  const Icon = lm.icon;
                  return (
                    <button
                      key={lm.id}
                      onClick={() => scrollTo(lm.id)}
                      className={`flex items-center justify-between p-2.5 rounded-2xl text-left transition-all ${
                        isCurrent
                          ? "bg-white/15 border border-white/20 text-white"
                          : "bg-white/5 hover:bg-white/10 text-gray-300 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-full bg-black/40 border border-white/10 text-cyan-400">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">{lm.name}</p>
                          <p className="text-[10px] text-gray-400">{lm.tagline}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-cyan-300">
                        {lm.year}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* FLOATING QUICK "RETURN TO TOP" BUTTON (VISIBLE ON SCROLL) */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollTo("metro-hero")}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#080d1c]/80 backdrop-blur-xl border border-white/15 text-gray-300 hover:text-white hover:border-cyan-400/50 shadow-[0_8px_25px_rgba(0,0,0,0.6)] group transition-all"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
