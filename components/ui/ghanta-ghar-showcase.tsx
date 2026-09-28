"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Clock, Landmark, MapPin, Ruler, Award, Compass, History } from "lucide-react";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function GhantaGharShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    let targetP = 0;
    let currentP = 0;
    let isRunning = false;

    const startLoop = () => {
      if (isRunning) return;
      isRunning = true;

      const loop = () => {
        const diff = targetP - currentP;
        if (Math.abs(diff) > 0.0003) {
          // Smooth damped lerp for silky 60fps tracking
          currentP += diff * 0.12;
          setProgress(currentP);
          rafId = requestAnimationFrame(loop);
        } else {
          if (currentP !== targetP) {
            currentP = targetP;
            setProgress(currentP);
          }
          isRunning = false;
        }
      };
      rafId = requestAnimationFrame(loop);
    };

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Only compute when near or inside viewport
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;

      const scrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const raw = -rect.top / scrollable;
      targetP = clamp(raw, 0, 1);
      startLoop();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Background scenic depth: stays in place with subtle natural parallax
  const bgScale = 1.0 + progress * 0.04;

  // Ghanta Ghar PNG Tower Scale: starts at 0.32 and smoothly expands to majestic full height 1.08
  const towerScale = 0.32 + progress * 0.76;

  // Tower vertical rise: anchored to the courtyard plaza behind the pond railing
  const towerTranslateY = (1 - progress) * 8;

  // Progressive reveal thresholds for details as user scrolls and tower expands:
  // Detail 1 (Left & Right upper items): starts entering early as tower begins expanding
  const p1 = clamp((progress - 0.06) / 0.36, 0, 1);
  // Detail 2 (Left & Right lower items): enters as tower grows larger
  const p2 = clamp((progress - 0.30) / 0.40, 0, 1);
  // Key stats highlights: enters at peak expansion
  const pStats = clamp((progress - 0.52) / 0.40, 0, 1);

  return (
    <section
      ref={containerRef}
      id="ghanta-ghar-section"
      className="relative w-full bg-[#05070d] select-none"
      style={{ height: "350vh" }}
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#05070d] z-10">
        {/* ========================================================================= */}
        {/* LAYER 1 (z-10): SCENIC BACKGROUND (Sunset sky, gardens, horizon — NO TOWER) */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-0 w-full h-full will-change-transform z-10"
          style={{
            transform: `scale(${bgScale.toFixed(4)})`,
            transition: "transform 0.05s ease-out",
          }}
        >
          <Image
            src="/images/lucknow_ghanta_ghar_bg.jpg"
            alt="हुसैनाबाद रॉयल हेरिटेज गार्डन परिसर"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* Cinematic Vignette Shadows */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070d]/85 via-transparent to-black/35" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2 (z-20): GHANTA GHAR TOWER (Standing ON PLAZA GROUND behind pond) */}
        {/* ========================================================================= */}
        <div
          className="absolute left-0 right-0 flex justify-center pointer-events-none z-20 overflow-visible"
          style={{
            bottom: "19vh", // Grounded on courtyard plaza pavement behind the pond railing!
          }}
        >
          <div
            className="relative will-change-transform flex flex-col items-center"
            style={{
              width: "min(38vw, 370px)",
              height: "72vh",
              transform: `translate3d(0, ${towerTranslateY.toFixed(2)}%, 0) scale(${towerScale.toFixed(4)})`,
              transformOrigin: "bottom center",
            }}
          >
            {/* Ground Contact Shadow on the plaza pavement */}
            <div
              className="absolute -bottom-2 w-[85%] h-5 bg-black/60 rounded-full blur-md pointer-events-none"
              style={{
                transform: `scaleX(${towerScale.toFixed(2)})`,
                opacity: 0.6 + progress * 0.4,
              }}
            />

            <Image
              src="/images/ghanta_ghar_tower.png"
              alt="हुसैनाबाद घंटाघर (PNG)"
              fill
              priority
              sizes="(max-width: 768px) 80vw, 40vw"
              className="object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 3 (z-30): FOREGROUND POND & STONE RAILING (Always in front of tower!) */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none will-change-transform z-30"
          style={{
            transform: `scale(${bgScale.toFixed(4)})`,
            transition: "transform 0.05s ease-out",
          }}
        >
          <Image
            src="/images/ghanta_ghar_foreground_pond.png"
            alt="हुसैनाबाद सरोवर व रेलिंग (Foreground Layer)"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* ========================================================================= */}
        {/* LAYER 4 (z-40): FLOATING SIDE DETAILS (Pure Transparent Typography - No Cards/Borders) */}
        {/* ========================================================================= */}
        <div className="hidden md:flex absolute inset-0 z-40 pointer-events-none items-center justify-between px-6 lg:px-12 xl:px-16">
          {/* -------------------- LEFT SIDE DETAILS -------------------- */}
          <div className="flex flex-col gap-8 max-w-[320px] lg:max-w-[380px] xl:max-w-[410px]">
            {/* Left Item 1: Stature & History */}
            <div
              className="will-change-[transform,opacity] transition-all duration-300"
              style={{
                opacity: p1,
                transform: `translateX(${((1 - p1) * -35).toFixed(1)}px)`,
                visibility: p1 > 0.01 ? "visible" : "hidden",
              }}
            >
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                <Landmark className="w-4 h-4 text-amber-400" />
                <span>1881 ईस्वी · अवध धरोहर</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight mb-1 drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
                हुसैनाबाद घंटाघर
              </h3>
              <p className="text-[11px] lg:text-xs font-bold text-amber-400/95 tracking-widest uppercase font-mono mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                INDIA&apos;S TALLEST CLOCK TOWER
              </p>
              <p className="text-sm lg:text-[15px] text-white/90 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                लंदन के बिग बेन की तर्ज़ पर नवाबों की नगरी लखनऊ में निर्मित, यह 221 फीट (67m) ऊंचा मीनार पूरे भारत का सबसे ऊंचा ऐतिहासिक क्लॉक टॉवर है।
              </p>
              <div className="mt-2.5 flex items-center gap-3 text-xs text-amber-300/95 font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                <span>कुल ऊंचाई: 221 फीट (67 मी.)</span>
                <span className="text-white/40">•</span>
                <span>लागत: ₹1.17 लाख</span>
              </div>
            </div>

            {/* Left Item 2: Victorian-Gothic Architecture */}
            <div
              className="will-change-[transform,opacity] transition-all duration-300"
              style={{
                opacity: p2,
                transform: `translateX(${((1 - p2) * -35).toFixed(1)}px)`,
                visibility: p2 > 0.01 ? "visible" : "hidden",
              }}
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                <Ruler className="w-4 h-4 text-amber-400" />
                <span>वास्तुकला एवं शिल्पकला</span>
              </div>
              <h4 className="text-xl lg:text-2xl font-bold text-white mb-1.5 drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
                विक्टोरियन-गोथिक व लखौरी ईंटें
              </h4>
              <p className="text-sm lg:text-[15px] text-white/90 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                प्रसिद्ध ब्रिटिश वास्तुकार रोज़केल कैवेंडिश ने विक्टोरियन गोथिक स्थापत्य को अवध की पारम्परिक लखौरी कारीगरी के साथ मिलाकर इस अजूबे की रचना की।
              </p>
              <div className="mt-2.5 flex items-center gap-2 text-xs text-zinc-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                <span>अवधी लखौरी ईंट एवं चूना प्लास्टर</span>
              </div>
            </div>
          </div>

          {/* -------------------- RIGHT SIDE DETAILS -------------------- */}
          <div className="flex flex-col gap-8 max-w-[320px] lg:max-w-[380px] xl:max-w-[410px] text-left">
            {/* Right Item 1: J.W. Benson Clockwork Dial */}
            <div
              className="will-change-[transform,opacity] transition-all duration-300"
              style={{
                opacity: p1,
                transform: `translateX(${((1 - p1) * 35).toFixed(1)}px)`,
                visibility: p1 > 0.01 ? "visible" : "hidden",
              }}
            >
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>J.W. Benson, London</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-black text-white tracking-tight leading-tight mb-1.5 drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
                12 पंखुड़ियों वाला गनमेटल डायल
              </h3>
              <p className="text-sm lg:text-[15px] text-white/90 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                घड़ी का डायल 12 पंखुड़ियों वाले सुनहरे फूल जैसा दिखता है। इसकी सुइयां शुद्ध गनमेटल से और विशाल घंटियां 1.5 टन वजनी कांस्य से गढ़ी गई थीं।
              </p>
              <div className="mt-2.5 flex items-center gap-3 text-xs text-amber-300/95 font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                <span>डायल व्यास: 13 फीट</span>
                <span className="text-white/40">•</span>
                <span>विशाल घंटी: 1.5 टन कांस्य</span>
              </div>
            </div>

            {/* Right Item 2: Royal Heritage Corridor */}
            <div
              className="will-change-[transform,opacity] transition-all duration-300"
              style={{
                opacity: p2,
                transform: `translateX(${((1 - p2) * 35).toFixed(1)}px)`,
                visibility: p2 > 0.01 ? "visible" : "hidden",
              }}
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>हुसैनाबाद हेरिटेज ज़ोन</span>
              </div>
              <h4 className="text-xl lg:text-2xl font-bold text-white mb-1.5 drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
                शाही सरोवर व हेरिटेज कॉम्प्लेक्स
              </h4>
              <p className="text-sm lg:text-[15px] text-white/90 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                बड़ा इमामबाड़ा, पिक्चर गैलरी और छोटा इमामबाड़ा के ठीक मध्य में स्थित, सामने का शांत जलकुंड शाम के समय घंटाघर का स्वर्णिम प्रतिबिंब दर्शाता है।
              </p>
              <div className="mt-2.5 flex items-center gap-2 text-xs text-amber-300/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>अवध हेरिटेज कॉरिडोर, पुराना लखनऊ</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE VIEW (Screen < md): Pure transparent text */}
        {/* ========================================================================= */}
        <div 
          className="md:hidden absolute inset-x-6 top-16 z-40 pointer-events-none transition-all duration-300"
          style={{
            opacity: p1,
            transform: `translateY(${((1 - p1) * -15).toFixed(1)}px)`,
            visibility: p1 > 0.01 ? "visible" : "hidden",
          }}
        >
          <div className="text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              हुसैनाबाद घंटाघर · 221 FT
            </span>
            <p className="text-xs text-white/90 mt-1 leading-snug">
              भारत का सबसे ऊंचा क्लॉक टॉवर (1881 ईस्वी), विक्टोरियन-गोथिक व अवधी लखौरी वास्तुकला।
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM METRICS: Transparent without card boxes or borders */}
        {/* ========================================================================= */}
        <div
          className="absolute bottom-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none transition-all duration-300"
          style={{
            opacity: pStats,
            transform: `translateY(${((1 - pStats) * 15).toFixed(1)}px)`,
            visibility: pStats > 0.01 ? "visible" : "hidden",
          }}
        >
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            <div className="flex items-center gap-1.5 text-white/90 text-xs sm:text-sm font-medium">
              <Ruler className="w-3.5 h-3.5 text-amber-400" />
              <span>ऊंचाई: <strong className="text-amber-300 font-bold">221 फीट</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-white/90 text-xs sm:text-sm font-medium">
              <History className="w-3.5 h-3.5 text-amber-400" />
              <span>वर्ष: <strong className="text-amber-300 font-bold">1881</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-white/90 text-xs sm:text-sm font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>घड़ी: <strong className="text-amber-300 font-bold">J.W. Benson, लंदन</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-white/90 text-xs sm:text-sm font-medium">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>घंटी: <strong className="text-amber-300 font-bold">1.5 टन कांस्य</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
