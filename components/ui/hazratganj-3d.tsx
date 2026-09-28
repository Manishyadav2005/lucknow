"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Utensils,
  Landmark,
  Flame,
  BookOpen,
  Heart,
} from "lucide-react";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

// 6 Milestone angles across the complete 360-degree orbit of Hazratganj Market
const MARKET_MILESTONES = [
  {
    id: 0,
    angle: "0°",
    src: "/images/hazratganj_promenade.jpg",
    badge: "1810 ई. · नवाब सआदत अली खां",
    icon: Landmark,
    title: "हज़रतगंज मुख्य मार्ग · गंजिंग प्रोमेनेड",
    subtitle: "200+ YEARS HERITAGE BOULEVARD",
    desc: "1810 में नवाब सआदत अली खां द्वारा बसाया गया ऐतिहासिक एवेन्यू। विंटेज काले लोहे के लैंप-पोस्ट, क्रीम रंग की विक्टोरियन इमारतें और ब्लैक-एंड-व्हाइट यूनिफॉर्म साइनेज इसकी पहचान हैं।",
    chips: ["विक्टोरियन वास्तुकला", "विंटेज लैंप-पोस्ट", "यूनिफॉर्म साइनेज"],
  },
  {
    id: 1,
    angle: "72°",
    src: "/images/hazratganj_janpath_chikan.jpg",
    badge: "विश्व-प्रसिद्ध अवधी हस्तशिल्प",
    icon: ShoppingBag,
    title: "जनपथ बाज़ार · लखनवी चिकनकारी",
    subtitle: "AUTHENTIC CHIKANKARI EMPORIUMS",
    desc: "हज़रतगंज का हृदय—जनपथ मार्केट। यहां 32 प्रकार के पारंपरिक सुई-टांकों (बखरी, फंदा, तेपची, जाली) से तैयार किए गए शुद्ध मलमल, चंदेरी और जॉर्जेट के हस्तनिर्मित परिधान मिलते हैं।",
    chips: ["GI टैग्ड चिकनकारी", "३२ प्रकार के टांके", "हस्तशिल्प इम्पोरियम"],
  },
  {
    id: 2,
    angle: "144°",
    src: "/images/hazratganj_love_lane.jpg",
    badge: "युवाओं की धड़कन · ट्रेंडी एली",
    icon: Heart,
    title: "हज़रतगंज लव लेन · फैशन व एक्सेसरीज़",
    subtitle: "VIBRANT TRENDY SHOPPING ALLEY",
    desc: "हज़रतगंज की सबसे लोकप्रिय और जीवंत तंग गली। फेयरी लाइट्स से सजी यह लेन ट्रेंडी कपड़ों, फुटवियर, बैग्स और आभूषणों के लिए पूरे लखनऊ के युवाओं की पहली पसंद है।",
    chips: ["लव लेन फैशन", "ट्रेंडी एक्सेसरीज़", "जीवंत शाम की रौनक"],
  },
  {
    id: 3,
    angle: "216°",
    src: "/images/hazratganj_basket_chaat.jpg",
    badge: "विश्व-प्रसिद्ध स्वाद · 1928 से",
    icon: Utensils,
    title: "रॉयल कैफ़े · ओरिजिनल बास्केट चाट",
    subtitle: "LEGENDARY TOKRI CHAAT & KULLHAD CHAI",
    desc: "1928 का ऐतिहासिक रॉयल कैफ़े, जिसने दुनिया को मशहूर 'आलू लच्छा बास्केट चाट' दी। इसके साथ ही शर्मा जी की कड़क कुल्हड़ चाय और राम आसरे की मलाई गिलोरी का बेमिसाल स्वाद।",
    chips: ["ओरिजिनल बास्केट चाट", "शर्मा जी कुल्हड़ चाय", "राम आसरे मलाई पान"],
  },
  {
    id: 4,
    angle: "288°",
    src: "/images/hazratganj_halwasiya_market.jpg",
    badge: "विंटेज कोलोनेड्स व कला केंद्र",
    icon: BookOpen,
    title: "मेफेयर व हलवासिया कोर्ट · विंटेज आर्केड",
    subtitle: "HERITAGE BOOKSHOPS & CLOCK EMPORIUMS",
    desc: "क्लासिक अर्धचंद्राकार मेहराबें, विंटेज घड़ियां, यूनिवर्सल बुकसेलर्स और प्राचीन पीतल व हैंडीक्राफ्ट की दुकानें। यह पुराने लखनऊ की बौद्धिक और साहित्यिक पहचान है।",
    chips: ["मेफेयर आर्केड्स", "यूनिवर्सल बुकस्टोर", "एंटीक हैंडीक्राफ्ट"],
  },
  {
    id: 5,
    angle: "360°",
    src: "/images/hazratganj_promenade.jpg",
    badge: "360° गंजिंग परिक्रमा संपन्न",
    icon: Flame,
    title: "शाम-ए-अवध · गंजिंग की अमर तहज़ीब",
    subtitle: "360° COMPLETED HAZRATGANJ CIRCUIT",
    desc: "'गंजिंग' केवल बाज़ार में घूमना नहीं, बल्कि शाम को इत्मीनान से टहलने, दोस्तों से गपशप करने और लखनऊ की नफ़ासत का आनंद लेने की 200 साल पुरानी जीवित परंपरा है।",
    chips: ["गंजिंग परंपरा", "शाम-ए-अवध", "अमर लखनवी तहज़ीब"],
  },
];

export default function Hazratganj3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Preload all high-res milestone images immediately
  useEffect(() => {
    MARKET_MILESTONES.forEach((item) => {
      const img = new window.Image();
      img.src = item.src;
    });
  }, []);

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
          // Smooth damped interpolation identical to Bada Imambara 360
          currentP += diff * 0.14;
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

  // Total slides across the 360 orbit: 6 milestone slides
  const totalSlides = MARKET_MILESTONES.length; // 6 slides (0 to 5)
  const maxTrackDistance = (totalSlides - 1) * 100; // 500vw total translation
  const trackTranslateX = -(progress * maxTrackDistance);

  return (
    <section
      ref={containerRef}
      id="hazratganj-360-section"
      className="relative w-full bg-[#05070d] select-none"
      style={{ height: "600vh" }}
    >
      {/* ========================================================================= */}
      {/* STICKY 360° PANORAMA CANVAS (Full-bleed moving physical 3D track, Pure Natural Photos) */}
      {/* ========================================================================= */}
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-0 bg-[#020408]">
        {/* 3D Perspective Stage */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            perspective: 1400,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Continuous Physical Horizontal Moving Track (Zero Ghosting, 100% Clear Solid Photos) */}
          <div
            className="flex h-full will-change-transform"
            style={{
              width: `${totalSlides * 100}vw`,
              transform: `translate3d(${trackTranslateX}vw, 0, 0)`,
              transformStyle: "preserve-3d",
            }}
          >
            {MARKET_MILESTONES.map((milestone, idx) => {
              // Spatial offset relative to current screen center
              const slideOffset = progress * (totalSlides - 1) - idx;
              // 3D yaw angle curving naturally like an orbital street amphitheater
              const yaw = (slideOffset * -14).toFixed(2);
              const scale = (
                1 - Math.min(0.06, Math.abs(slideOffset) * 0.03)
              ).toFixed(3);

              return (
                <div
                  key={milestone.id}
                  className="relative w-screen h-screen flex-shrink-0 overflow-hidden"
                  style={{
                    perspective: 1200,
                  }}
                >
                  <div
                    className="relative w-full h-full will-change-transform"
                    style={{
                      transform: `rotateY(${yaw}deg) scale(${scale})`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* 100% Solid, Opaque High-Resolution Image — Pure and Natural, NO Dark Shadows */}
                    <Image
                      src={milestone.src}
                      alt={milestone.title}
                      fill
                      priority={idx < 2}
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SCROLLING CONTENT STREAM (Pure Transparent Floating Content — Zero Dark Box, Zero Border, No Text Collisions) */}
      {/* ========================================================================= */}
      <div className="relative z-10 pointer-events-none -mt-[100vh]">
        {MARKET_MILESTONES.map((milestone) => {
          const Icon = milestone.icon;
          return (
            <div
              key={milestone.id}
              className="min-h-screen flex items-end justify-start px-6 sm:px-12 md:px-16 lg:px-20 pb-16"
            >
              {/* Pure Floating Transparent Typography — Zero Card Box, Zero Border */}
              <div className="pointer-events-auto max-w-2xl w-full text-left">
                {/* Milestone Angle & Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                    <Icon className="w-4 h-4 text-amber-400" />
                    <span>{milestone.badge}</span>
                  </span>
                  <span className="text-amber-300 font-mono text-xs font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                    // {milestone.angle}
                  </span>
                </div>

                {/* Monument Title */}
                <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-tight">
                  {milestone.title}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-amber-400/90 tracking-widest uppercase mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  {milestone.subtitle}
                </p>

                {/* Engaging Story Description */}
                <p className="text-sm sm:text-base lg:text-lg text-white/95 leading-relaxed mb-4 font-normal drop-shadow-[0_3px_14px_rgba(0,0,0,0.95)] max-w-xl">
                  {milestone.desc}
                </p>

                {/* Fact Chips — Clean transparent text with glowing bullet, zero boxes or borders */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-amber-300 font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  {milestone.chips.map((chip, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-2">
                      {cIdx > 0 && <span className="text-white/40">•</span>}
                      <span>✦ {chip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
