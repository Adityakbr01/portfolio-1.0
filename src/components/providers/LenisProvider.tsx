"use client";

/**
 * LenisProvider
 *
 * A single, app-wide smooth-scroll provider.
 * • Creates one Lenis instance for the whole app — no duplicate instances.
 * • Drives it through GSAP's ticker so GSAP ScrollTrigger stays in perfect
 *   sync with Lenis scroll position (required for pin/scrub animations).
 * • Applies sensible defaults that match the portfolio aesthetic.
 *
 * Usage — wrap your page (or layout) once:
 *   <LenisProvider>
 *     <YourContent />
 *   </LenisProvider>
 *
 * Individual sections must NOT create their own Lenis instances.
 * They only need `ScrollTrigger.create(...)` — Lenis feeds it automatically.
 */

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Config ──────────────────────────────────────────────────────────────────

const LENIS_CONFIG: ConstructorParameters<typeof Lenis>[0] = {
  // Smoothness (0.1–0.15 best for portfolio)
  lerp: 0.1,

  // Enable smooth wheel scrolling
  smoothWheel: true,

  // Touch scrolling behaviour
  touchMultiplier: 1.2,

  // Wheel sensitivity
  wheelMultiplier: 1,

  // Keep GSAP animations perfectly synced
  syncTouch: false,

  // Prevent overscroll bounce
  overscroll: false,

  // Direction detection
  orientation: "vertical",
  gestureOrientation: "vertical",

  // Auto resize when layout changes
  autoResize: true,
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis(LENIS_CONFIG);

    // 1. Keep GSAP ScrollTrigger in sync on every Lenis scroll tick.
    lenis.on("scroll", ScrollTrigger.update);

    // 2. Drive Lenis from GSAP's RAF loop.
    //    `time` coming from gsap.ticker is in seconds; Lenis wants milliseconds.
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);

    // 3. Prevent ScrollTrigger from adding its own RAF — Lenis owns the loop.
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  // Provider is layout-only; renders children as-is with no wrapper element.
  return <>{children}</>;
}
