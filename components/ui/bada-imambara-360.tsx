"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Sparkles, ShieldCheck, Landmark, Flame, Eye, Layers } from "lucide-react";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

// 6 Milestone angles across the complete 360-degree orbit of Bada Imambara
const MILESTONES = [
  {
    id: 0,
    angle: "0°",
    src: "/images/lucknow_bada_imambada.jpg",
    badge: "1784 ई. · अवध का ऐतिहासिक मुकुट",
    icon: Landmark,
    title: "बड़ा इमामबाड़ा · भव्य शाही प्रांगण",
    subtitle: "ASAF-UD-DAULA'S IMPERIAL PLAZA",
    desc: "1784 ईस्वी के भीषण अकाल में नवाब आसफ़ुद्दौला ने गरीबों और रईसों दोनों को स्वाभिमान से रोज़गार देने के लिए इस अनुपम स्मारक का निर्माण कराया था। यह अवधी वास्तुकला का सिरमौर है।",
    chips: ["शाही प्रांगण", "लखौरी ईंटें", "अकाल राहत संकल्प"],
  },
  {
    id: 1,
    angle: "72°",
    src: "/images/imambada_360_1.jpg",
    badge: "ध्वनि विज्ञान का बेजोड़ चमत्कार",
    icon: Sparkles,
    title: "फुसफुसाहट वाली दीवार (Whispering Gallery)",
    subtitle: "ACOUSTIC SECRET CHANNELS",
    desc: "हॉल की दीवारों के भीतर खोखले गुप्त ध्वनि-मार्ग बने हैं। एक कोने में खड़े होकर की गई धीमी फुसफुसाहट या माचिस की तीली जलने की आवाज़ भी 50 मीटर दूर दूसरे कोने पर स्पष्ट सुनाई देती है।",
    chips: ["50 मीटर ध्वनि रेंज", "गुप्त ध्वनि चैनल", "प्राचीन ध्वनिशास्त्र"],
  },
  {
    id: 2,
    angle: "144°",
    src: "/images/imambada_360_2.jpg",
    badge: "विश्व रिकॉर्ड · बिना बीम की छत",
    icon: ShieldCheck,
    title: "बिना खंभों की 50-मीटर डाटदार छत",
    subtitle: "ZERO-PILLAR ARCHITECTURAL MARVEL",
    desc: "एशिया का सबसे विशाल मेहराबदार हॉल, जिसकी 50 मीटर लंबी और 15 मीटर ऊंची छत बिना किसी लोहे या लकड़ी के बीम के टिकी है। यह पूरी तरह interlocking लखौरी ईंटों और उड़द दाल के गारे से निर्मित है।",
    chips: ["शून्य खंभा वास्तुकला", "15m मेहराबदार ऊंचाई", "उड़द दाल व चूने का गारा"],
  },
  {
    id: 3,
    angle: "216°",
    src: "/images/imambada_360_3.jpg",
    badge: "3D भूलभुलैया · 489 दरवाज़े",
    icon: Layers,
    title: "3D रहस्यमयी भूलभुलैया (The Labyrinth)",
    subtitle: "489 IDENTICAL DOORS & 1000 PASSAGES",
    desc: "छत के ऊपर बने 489 एक जैसे दिखने वाले मेहराबदार दरवाज़े और 1000 से अधिक परस्पर जुड़े रास्ते। यहां बिना गाइड के जाना आज भी रहस्य है, जहां हर मोड़ पर नया भ्रम पैदा होता है।",
    chips: ["489 समरूप दरवाज़े", "1000+ गुप्त रास्ते", "अभेद्य रक्षाव्यूह"],
  },
  {
    id: 4,
    angle: "288°",
    src: "/images/imambada_360_4.jpg",
    badge: "गुप्त सुरक्षा तंत्र · शाही बावली",
    icon: Eye,
    title: "शाही बावली जल दर्पण (Water Mirror Security)",
    subtitle: "ROYAL STEPWELL & DEFENSE MIRROR",
    desc: "गोमती नदी से जुड़ी अनूठी सात मंजिला शाही बावली। इसके जल के विशेष कोण से बाहर मुख्य द्वार पर खड़े किसी भी शत्रु का प्रतिबिंब पानी में दिखता था, जबकि शत्रु को कोई नहीं देख सकता था।",
    chips: ["7 मंजिला बावली", "जल दर्पण सुरक्षा", "गोमती नदी का शीतल जल"],
  },
  {
    id: 5,
    angle: "360°",
    src: "/images/lucknow_bada_imambada.jpg",
    badge: "360° परिक्रमा संपन्न",
    icon: Flame,
    title: "लखनऊ की शान",
    subtitle: "360° COMPLETED HERITAGE VOYAGE",
    desc: "240 से अधिक वर्षों से समय के थपेड़ों को झेलकर अडिग खड़ा बड़ा इमामबाड़ा केवल पत्थरों की इमारत नहीं, बल्कि लखनऊ की नवाबी नफ़ासत, भाईचारे और गौरव की जीती-जागती अमर पहचान है।",
    chips: ["240+ वर्ष का गौरव", "अखंड नवाबी वास्तुकला", "विश्व धरोहर"],
  },
];

export default function BadaImambara360() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Preload all high-res milestone images immediately
  useEffect(() => {
    MILESTONES.forEach((item) => {
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
          // Smooth damped interpolation identical to the hero page
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
  const totalSlides = MILESTONES.length; // 6 slides (0 to 5)
  const maxTrackDistance = (totalSlides - 1) * 100; // 500vw total translation
  const trackTranslateX = -(progress * maxTrackDistance);

  return (
    <section
      ref={containerRef}
      id="bada-imambara-360"
      className="relative w-full bg-[#05070d] select-none"
      style={{ height: "600vh" }}
    >
      {/* ========================================================================= */}
      {/* STICKY 3D BACKGROUND (100% Solid Opaque Moving Building — Zero Fade Ghosting) */}
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
          {/* Continuous Physical Horizontal Moving Track (NO OPACITY FADE) */}
          <div
            className="flex h-full will-change-transform"
            style={{
              width: `${totalSlides * 100}vw`,
              transform: `translate3d(${trackTranslateX}vw, 0, 0)`,
              transformStyle: "preserve-3d",
            }}
          >
            {MILESTONES.map((milestone, idx) => {
              // Calculate spatial offset relative to current screen center
              const slideOffset = (progress * (totalSlides - 1)) - idx;
              // 3D yaw angle curving naturally like an orbital amphitheater
              const yaw = (slideOffset * -15).toFixed(2);
              const scale = (1 - Math.min(0.06, Math.abs(slideOffset) * 0.03)).toFixed(3);

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
                    {/* 100% Solid, Opaque High-Resolution Image — Zero Fade Double Exposure */}
                    <Image
                      src={milestone.src}
                      alt={milestone.title}
                      fill
                      priority={idx < 2}
                      sizes="100vw"
                      className="object-cover"
                    />

                    {/* Subtle Cinematic Vignette for Contrast with Content */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-black/50" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Minimal Bottom Orbit Track Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30 pointer-events-none">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-300 transition-all duration-75"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SCROLLING CONTENT STREAM (Pure Transparent Floating Content — Zero Card, Zero Border) */}
      {/* ========================================================================= */}
      <div className="relative z-10 pointer-events-none -mt-[100vh]">
        {MILESTONES.map((milestone, index) => {
          const Icon = milestone.icon;
          return (
            <div
              key={milestone.id}
              className="min-h-screen flex items-center justify-start px-6 sm:px-12 md:px-20 lg:px-28 py-12"
            >
              {/* Pure Floating Transparent Typography — Zero Card Box, Zero Border */}
              <div className="pointer-events-auto max-w-2xl w-full">
                {/* Milestone Angle & Tagline */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-amber-400 text-sm font-black tracking-widest uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    <Icon className="w-4 h-4 text-amber-400" />
                    <span>{milestone.badge}</span>
                  </span>

                  <span className="text-white/60 font-mono text-xs font-bold tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    // {milestone.angle}
                  </span>
                </div>

                {/* Monument Title */}
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-tight">
                  {milestone.title}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-amber-300/85 tracking-widest uppercase mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {milestone.subtitle}
                </p>

                {/* Engaging Architectural Story Description */}
                <p className="text-base sm:text-lg text-white/95 leading-relaxed mb-6 font-medium drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)] max-w-xl">
                  {milestone.desc}
                </p>

                {/* Fact Chips — Clean transparent text with glowing bullet, zero boxes or borders */}
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {milestone.chips.map((chip, chipIdx) => (
                    <span
                      key={chipIdx}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm text-amber-200/90 font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                      {chip}
                    </span>
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
