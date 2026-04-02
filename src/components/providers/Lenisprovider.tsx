// "use client";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "lenis/dist/lenis.css";
// import { ReactLenis, useLenis } from "lenis/react";
// import { useEffect, type ReactNode } from "react";

// gsap.registerPlugin(ScrollTrigger);

// function LenisSyncWithGSAP() {
//   useLenis(ScrollTrigger.update);

//   const lenis = useLenis(); // get lenis instance

//   useEffect(() => {
//     gsap.ticker.lagSmoothing(0);
//     ScrollTrigger.normalizeScroll(true);

//     const raf = requestAnimationFrame(() => {
//       ScrollTrigger.refresh();
//     });

//     // ── FIX: Intercept ALL anchor clicks and route them through Lenis ──────
//     // Native <a href="#section"> links bypass Lenis and use the browser's
//     // native scroll jump. We intercept them here and call lenis.scrollTo()
//     // so the easing and virtual scroll stay in sync.
//     const handleAnchorClick = (e: MouseEvent) => {
//       const anchor = (e.target as HTMLElement).closest("a[href^='#']");
//       if (!anchor) return;

//       const href = anchor.getAttribute("href");
//       if (!href || href === "#") return;

//       const target = document.querySelector(href);
//       if (!target) return;

//       e.preventDefault();
//       lenis?.scrollTo(target as HTMLElement, {
//         offset: 0,
//         duration: 1.4,
//         easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
//       });
//     };

//     document.addEventListener("click", handleAnchorClick);

//     return () => {
//       cancelAnimationFrame(raf);
//       document.removeEventListener("click", handleAnchorClick);
//     };
//   }, [lenis]); // re-run when lenis instance is ready

//   return null;
// }

// export default function LenisProvider({ children }: { children: ReactNode }) {
//   return (
//     <ReactLenis
//       root
//       options={{
//         lerp: 0.08,
//         smoothWheel: true,
//         wheelMultiplier: 0.85,
//         touchMultiplier: 1.2,
//         syncTouch: true,
//         duration: 0.9,
//         orientation: "vertical",
//         gestureOrientation: "vertical",
//         autoResize: true,
//         overscroll: false,
//       }}
//     >
//       <LenisSyncWithGSAP />
//       {children}
//     </ReactLenis>
//   );
// }