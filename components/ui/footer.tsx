"use client";

import {
  Compass,
  MapPin,
  Sparkles,
  Landmark,
  Clock,
  ArrowUp,
  Heart,
} from "lucide-react";

export default function Footer() {
  const scrollTo = (id: string) => {
    if (id === "metro-hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="relative w-full bg-[#020408] text-white overflow-hidden border-t border-white/10 select-none">
      {/* Top Ambient Glow Gradient */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-cyan-500/10 via-amber-500/5 to-transparent blur-[120px]" />

      {/* Main Footer Container */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-20 pb-12">
        {/* ========================================================================= */}
        {/* SECTION 1: ELEGANT TITLE */}
        {/* ========================================================================= */}
        <div className="text-center mb-16 pt-2">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-lg">
            मुस्कुराइए, आप <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200">लखनऊ</span> में हैं
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: MULTI-COLUMN CONTENT GRID */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Col 1: Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-cyan-400">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-wider text-white uppercase font-sans">
                LUCKNOW
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium">
              Smile, you are in Lucknow
            </p>
          </div>

          {/* Col 2: Heritage Sights */}
          <div>
            <h4 className="text-xs font-bold text-gray-200 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Landmark className="w-3.5 h-3.5 text-cyan-400" />
              <span>Heritage Sights</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => scrollTo("metro-hero")}
                  className="text-gray-400 hover:text-white transition-colors text-left group"
                >
                  <span className="group-hover:translate-x-1 transition-transform inline-block">Lucknow Metro</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("temple-experience")}
                  className="text-gray-400 hover:text-white transition-colors text-left group"
                >
                  <span className="group-hover:translate-x-1 transition-transform inline-block">Hanuman Setu Mandir</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("bada-imambara-360")}
                  className="text-gray-400 hover:text-white transition-colors text-left group"
                >
                  <span className="group-hover:translate-x-1 transition-transform inline-block">Bada Imambara</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("ghanta-ghar-section")}
                  className="text-gray-400 hover:text-white transition-colors text-left group"
                >
                  <span className="group-hover:translate-x-1 transition-transform inline-block">Hussainabad Clock Tower</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("hazratganj-360-section")}
                  className="text-gray-400 hover:text-white transition-colors text-left group"
                >
                  <span className="group-hover:translate-x-1 transition-transform inline-block">Hazratganj Boulevard</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Cultural Highlights */}
          <div>
            <h4 className="text-xs font-bold text-gray-200 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Awadh Culture</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>32 Stitches Chikankari Craft</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>World's Largest Column-less Hall</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span>Original Royal Basket Chaat</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>489 Identical Labyrinth Arches</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Lakhori Brick & Urad Dal Lime Mortar</span>
              </li>
            </ul>
          </div>

          {/* Col 4: City Coordinates & Timings */}
          <div>
            <h4 className="text-xs font-bold text-gray-200 uppercase tracking-widest mb-4 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Coordinates & Info</span>
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-gray-400">
              <div>
                <p className="text-gray-300 font-medium">Location</p>
                <p className="text-gray-400 text-xs">Lucknow, Uttar Pradesh, India</p>
                <p className="text-[11px] text-gray-500 font-mono mt-0.5">26.8467° N, 80.9462° E</p>
              </div>
              <div>
                <p className="text-gray-300 font-medium">River</p>
                <p className="text-gray-400 text-xs">Gomti Riverfront Basin</p>
              </div>
              <div>
                <p className="text-gray-300 font-medium">Heritage Status</p>
                <p className="text-cyan-400 text-xs font-medium">ASI Protected Monuments</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: BOTTOM COPYRIGHT & ATTRIBUTION */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Lucknow Heritage Experience.</span>
            <span className="hidden sm:inline">Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500/20" />
            <span className="hidden sm:inline">Nawabi Tehzeeb.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo("metro-hero")}
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
