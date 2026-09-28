"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function TempleGateReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    let targetP = 0;
    let currentP = 0;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const raw = -rect.top / scrollable;
      targetP = clamp(raw, 0, 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    const loop = () => {
      currentP += (targetP - currentP) * 0.12;
      setProgress(currentP);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Door angle: starts opening at progress 0.08, fully opens by 0.46
  const doorOpenFactor = clamp((progress - 0.08) / 0.38, 0, 1);
  const leftDoorAngle = -doorOpenFactor * 105;
  const rightDoorAngle = doorOpenFactor * 105;

  const zoomScale = 1 + progress * 0.18;
  const frameZoom = 1 + clamp((progress - 0.54) / 0.40, 0, 1) * 0.85;
  const frameOpacity = 1 - clamp((progress - 0.64) / 0.26, 0, 1);

  // Stage 1: Sacred Mantra visibility (appears as doors open, dissolves on further scroll)
  const mantraFadeIn = clamp((progress - 0.12) / 0.18, 0, 1);
  const mantraFadeOut = 1 - clamp((progress - 0.48) / 0.12, 0, 1);
  const mantraOpacity = mantraFadeIn * mantraFadeOut;
  const mantraScale = 0.94 + clamp((progress - 0.12) / 0.40, 0, 1) * 0.08;

  // Stage 2: Hanuman Ji Photo visibility (emerges smoothly after mantra)
  const photoOpacity = clamp((progress - 0.52) / 0.22, 0, 1);
  const photoScale = 0.94 + clamp((progress - 0.52) / 0.48, 0, 1) * 0.06;

  return (
    <section
      ref={containerRef}
      id="temple-experience"
      className="relative w-full bg-[#05070d] text-white"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#030508]">
        {/* ========================================================================= */}
        {/* LAYER 1: INNER SANCTUM (गर्भगृह) */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform will-change-transform"
          style={{
            transform: `scale(${zoomScale})`,
          }}
        >
          {/* Sanctum Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/ancient_temple_gate.jpg"
              alt="Temple Sanctum Background"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-60 filter blur-[2px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-black/40 to-[#05070d]/90" />
          </div>

          {/* Golden Divine Rays & Light Glow */}
          <div
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity"
            style={{ opacity: doorOpenFactor }}
          >
            <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-r from-amber-500/25 via-orange-500/30 to-yellow-300/20 blur-[130px] animate-pulse" />
          </div>

          {/* STAGE 1: SACRED MANTRA (Pure floating text inside gate - Zero Card, Zero Border, Only Mantra) */}
          <div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-all duration-300 px-4"
            style={{
              opacity: mantraOpacity,
              transform: `scale(${mantraScale})`,
              visibility: mantraOpacity > 0.01 ? "visible" : "hidden",
            }}
          >
            <div className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] text-center select-none py-6 px-4 rounded-full bg-radial from-black/80 via-black/40 to-transparent">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-black leading-relaxed md:leading-[1.7] tracking-wider text-amber-50 drop-shadow-[0_4px_20px_rgba(0,0,0,1)] [text-shadow:_0_2px_4px_rgba(0,0,0,1),_0_4px_16px_rgba(0,0,0,0.95),_0_0_24px_rgba(255,190,0,0.7)] font-serif">
                <span className="block text-[#fffbe6]">
                  मनोजवं मारुततुल्यवेगं
                </span>
                <span className="block text-[#ffd56b]">
                  जितेन्द्रियं बुद्धिमतां वरिष्ठम्।
                </span>
                <span className="block mt-2.5 sm:mt-3 text-[#fffbe6]">
                  वातात्मजं वानरयूथमुख्यं
                </span>
                <span className="block text-[#ffd56b]">
                  श्रीरामदूतं शरणं प्रपद्ये॥
                </span>
              </h3>
            </div>
          </div>

          {/* STAGE 2: PURE HANUMAN JI PHOTO (Reveals on further scroll, borderless) */}
          <div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-all duration-300 px-4"
            style={{
              opacity: photoOpacity,
              transform: `scale(${photoScale})`,
              visibility: photoOpacity > 0.01 ? "visible" : "hidden",
            }}
          >
            {/* Big Screen Grand Sanctum Image Frame (Border-free, pure photo) */}
            <div className="relative h-[76vh] sm:h-[80vh] md:h-[82vh] max-h-[840px] aspect-[896/1200] max-w-[90vw] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_0_120px_rgba(255,140,0,0.55),0_20px_60px_rgba(0,0,0,0.95)] bg-black/60 group">
              <Image
                src="/images/hanuman_ji_divine.jpg"
                alt="श्री लेटे हुए हनुमान जी महाराज"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 1100px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2: THE GRAND 3D TEMPLE DOORS (मंदिर के कपाट) THAT OPEN ON SCROLL */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center transition-all will-change-transform"
          style={{
            transform: `scale(${frameZoom})`,
            opacity: frameOpacity,
          }}
        >
          {/* Outer Temple Stone Archway Frame */}
          <div className="relative w-full h-full max-w-6xl max-h-[96vh] flex items-center justify-center px-2 sm:px-4">
            {/* The Door Opening Chamber Frame (Enlarged Grand Temple Gate) */}
            <div
              className="relative h-[82vh] sm:h-[86vh] md:h-[89vh] max-h-[900px] aspect-[896/1200] max-w-[92vw] rounded-t-[120px] sm:rounded-t-[170px] md:rounded-t-[220px] shadow-[0_0_140px_rgba(0,0,0,0.95)]"
              style={{
                perspective: 1400,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Ornate Arch Frame Surroundings (Hollow Doorway Frame) */}
              <div className="pointer-events-none absolute -inset-3.5 sm:-inset-5 rounded-t-[130px] sm:rounded-t-[185px] md:rounded-t-[235px] border-[10px] sm:border-[16px] border-[#3a2818] shadow-[0_12px_60px_rgba(0,0,0,0.9)] -z-10 flex flex-col items-center">
                {/* Decorative Stone Arch Motif */}
                <div className="pt-2 text-center text-amber-500/50 text-xs sm:text-sm font-black tracking-widest">
                  ◆ ◆ ◆
                </div>
              </div>

              {/* Door Container (Split into Left & Right Door Leaf) */}
              <div
                className="relative w-full h-full rounded-t-[120px] sm:rounded-t-[170px] md:rounded-t-[220px] overflow-hidden flex"
                style={{
                  perspective: 1400,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* LEFT DOOR PANEL (Opens to the Left) */}
                <div
                  className="relative w-1/2 h-full will-change-transform"
                  style={{
                    transformOrigin: "left center",
                    transform: `rotateY(${leftDoorAngle}deg)`,
                    transition: "transform 0.05s linear",
                    boxShadow: "inset -5px 0 25px rgba(0,0,0,0.7)",
                  }}
                >
                  <Image
                    src="/images/temple_door_left.png"
                    alt="Temple Left Door"
                    fill
                    priority
                    sizes="(max-width: 768px) 50vw, 300px"
                    className="object-cover"
                  />
                  {/* Dynamic 3D Door Shadow as it turns */}
                  <div
                    className="absolute inset-0 bg-black pointer-events-none transition-opacity"
                    style={{ opacity: doorOpenFactor * 0.7 }}
                  />
                </div>

                {/* RIGHT DOOR PANEL (Opens to the Right) */}
                <div
                  className="relative w-1/2 h-full will-change-transform"
                  style={{
                    transformOrigin: "right center",
                    transform: `rotateY(${rightDoorAngle}deg)`,
                    transition: "transform 0.05s linear",
                    boxShadow: "inset 5px 0 25px rgba(0,0,0,0.7)",
                  }}
                >
                  <Image
                    src="/images/temple_door_right.png"
                    alt="Temple Right Door"
                    fill
                    priority
                    sizes="(max-width: 768px) 50vw, 300px"
                    className="object-cover"
                  />
                  {/* Dynamic 3D Door Shadow as it turns */}
                  <div
                    className="absolute inset-0 bg-black pointer-events-none transition-opacity"
                    style={{ opacity: doorOpenFactor * 0.7 }}
                  />
                </div>

                {/* Center Light Beam when Doors crack open */}
                <div
                  className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1.5 bg-amber-400 blur-[2px] transition-opacity duration-300"
                  style={{
                    opacity: doorOpenFactor > 0.02 && doorOpenFactor < 0.6 ? 1 : 0,
                    boxShadow: "0 0 20px 4px #ff9900",
                  }}
                />
              </div>

              {/* Hanging Bells on sides of the Arch */}
              <div
                className="absolute -left-8 sm:-left-12 top-1/4 flex flex-col items-center gap-6 text-amber-400 transition-transform"
                style={{
                  transform: `rotate(${Math.sin(progress * 15) * 8 * (1 - doorOpenFactor)}deg)`,
                  transformOrigin: "top center",
                }}
              >
                <div className="w-1 h-14 bg-amber-600/80" />
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-b-full bg-gradient-to-b from-amber-300 to-amber-600 shadow-[0_0_15px_rgba(255,180,0,0.5)] border border-amber-200" />
              </div>

              <div
                className="absolute -right-8 sm:-right-12 top-1/4 flex flex-col items-center gap-6 text-amber-400 transition-transform"
                style={{
                  transform: `rotate(${-Math.sin(progress * 15) * 8 * (1 - doorOpenFactor)}deg)`,
                  transformOrigin: "top center",
                }}
              >
                <div className="w-1 h-14 bg-amber-600/80" />
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-b-full bg-gradient-to-b from-amber-300 to-amber-600 shadow-[0_0_15px_rgba(255,180,0,0.5)] border border-amber-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Bottom Scroll Indicator Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 z-40">
          <div
            className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 transition-all duration-75"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
