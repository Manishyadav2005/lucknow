"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

export interface MetroHeroProps {
  videoSrc?: string
  title?: string
  scrollHint?: string
  tagline?: string
  signature?: { name: string; url: string } | false
  scrubDistance?: number
  className?: string
  style?: React.CSSProperties
}

const DEFAULT_VIDEO = "/videos/metro.mp4"
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

const COL_BG = "#05070d"
const COL_TEXT = "#f2f4f8"

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

export default function MetroHero({
  videoSrc = DEFAULT_VIDEO,
  title = "THE CITY OPENS",
  scrollHint = "SCROLL",
  tagline = "मुस्कुराइए, आप लखनऊ में हैं",
  className,
  style,
}: MetroHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    let duration = 0
    let rafId = 0
    let targetProgress = 0
    let currentProgress = 0
    let isSeeking = false
    let pendingTime: number | null = null

    const onLoadedData = () => {
      duration = video.duration || 0
      setReady(true)
      if (reduceMotion) {
        video.currentTime = duration * 0.92
      }
    }

    if (video.readyState >= 2) {
      onLoadedData()
    } else {
      video.addEventListener("loadeddata", onLoadedData)
      video.addEventListener("canplay", onLoadedData)
      video.addEventListener("loadedmetadata", onLoadedData)
    }

    const onSeeked = () => {
      isSeeking = false
      if (pendingTime !== null) {
        const t = pendingTime
        pendingTime = null
        isSeeking = true
        if (video) {
          video.currentTime = t
        }
      }
    }
    video.addEventListener("seeked", onSeeked)

    function seekTo(t: number) {
      if (isSeeking) {
        pendingTime = t
        return
      }
      isSeeking = true
      if (video) {
        video.currentTime = t
      }
    }

    const updateScroll = () => {
      if (!container) return
      const rect = container.getBoundingClientRect()
      const scrollableDistance = container.offsetHeight - window.innerHeight
      if (scrollableDistance <= 0) return
      const rawProgress = -rect.top / scrollableDistance
      targetProgress = clamp(rawProgress, 0, 1)
    }

    window.addEventListener("scroll", updateScroll, { passive: true })
    window.addEventListener("resize", updateScroll, { passive: true })
    updateScroll()

    function frame() {
      currentProgress += (targetProgress - currentProgress) * 0.16

      if (duration > 0) {
        seekTo(currentProgress * duration)
      }

      if (videoRef.current) {
        const scale = 1 + currentProgress * 0.06
        videoRef.current.style.transform = `scale(${scale})`
      }

      if (titleRef.current) {
        const t = 1 - clamp(currentProgress / 0.35, 0, 1)
        titleRef.current.style.opacity = String(t)
        titleRef.current.style.transform = `translateY(${(1 - t) * -24}px) scale(${0.96 + t * 0.04})`
        titleRef.current.style.filter = `blur(${(1 - t) * 10}px)`
      }

      if (hintRef.current) {
        hintRef.current.style.opacity = currentProgress > 0.05 ? "0" : "1"
      }

      if (taglineRef.current) {
        // Appears smoothly as the video reaches towards the end
        const t = clamp((currentProgress - 0.65) / 0.25, 0, 1)
        taglineRef.current.style.opacity = String(t)
        taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px) scale(${0.97 + t * 0.03})`
        taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`
      }

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`
      }

      rafId = requestAnimationFrame(frame)
    }

    if (!reduceMotion) {
      rafId = requestAnimationFrame(frame)
    }

    return () => {
      video.removeEventListener("loadeddata", onLoadedData)
      video.removeEventListener("seeked", onSeeked)
      window.removeEventListener("scroll", updateScroll)
      window.removeEventListener("resize", updateScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      id="metro-hero"
      className={className}
      style={{
        position: "relative",
        height: "260vh",
        background: COL_BG,
        ...style,
      }}
    >
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          background: COL_BG,
        }}
      >
        {/* Instant Hero Backdrop Poster (Zero Black Screen Delay) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/images/lucknow_night_metro.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: ready ? 0 : 0.85,
            transition: "opacity 0.6s ease",
            pointerEvents: "none",
          }}
        />

        <video
          ref={videoRef}
          src={videoSrc}
          poster="/images/lucknow_night_metro.jpg"
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: ready ? 1 : 0,
            transformOrigin: "center center",
            willChange: "transform",
            transition: "opacity 0.6s ease",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(5,7,13,0.35), rgba(5,7,13,0) 30%, rgba(5,7,13,0.15) 70%, rgba(5,7,13,0.65))",
            pointerEvents: "none",
          }}
        />

        {/* Title */}
        <div
          ref={titleRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 6%",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: "clamp(30px, 7vw, 96px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: COL_TEXT,
              textShadow: "0 4px 30px rgba(0,0,0,0.5)",
              display: "inline-block",
              willChange: "transform, filter, opacity",
            }}
          >
            {title}
          </span>
        </div>

        {/* Tagline: मुस्कुराइए, आप लखनऊ में हैं */}
        {tagline && (
          <div
            ref={taglineRef}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 8%",
              textAlign: "center",
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontFamily: SANS,
                fontWeight: 900,
                fontSize: "clamp(32px, 5.5vw, 68px)",
                lineHeight: 1.3,
                letterSpacing: "0.01em",
                color: "#ffffff",
                textShadow: "0 4px 30px rgba(0,0,0,0.95), 0 2px 10px rgba(0,0,0,0.9)",
                maxWidth: "1100px",
              }}
            >
              {tagline}
            </span>
          </div>
        )}


        {/* Progress Bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 3,
            background: "rgba(255,255,255,0.12)",
          }}
        >
          <div
            ref={progressBarRef}
            style={{
              height: "100%",
              width: "100%",
              background: "linear-gradient(90deg, #FF6A00, #FBBF24)",
              transform: "scaleX(0)",
              transformOrigin: "left center",
            }}
          />
        </div>
      </div>
    </div>
  )
}
