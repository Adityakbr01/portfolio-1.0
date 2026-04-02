"use client";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/src/constants/socialLinks";
import dynamic from "next/dynamic";
import Link from "next/link";
import { memo, useEffect, useState } from "react";

const links = [
  { text: "Home",     href: "#Home"    },
  { text: "Projects", href: "#Projects"},
  { text: "About",    href: "#About"   },
  { text: "Skills",   href: "#Skills"  },
  { text: "Contact",  href: "#Contact" },
];

// Lazy-load WebGL canvas — never shipped to SSR, code-split from the main bundle
const DeveloperTextInteractive = dynamic(
  () => import("@/src/sections/DeveloperTextInteractive"),
  { ssr: false },
);

const WATERMARK_WORDS = [
  { fillText: "BUILD", xFraction: 0.25, rgba: "rgba(250,197, 40,1)", color: "#fac528" },
  { fillText: "SHIP",  xFraction: 0.50, rgba: "rgba(251,120, 30,1)", color: "#fb781e" },
  { fillText: "LEARN", xFraction: 0.75, rgba: "rgba(248, 80,100,1)", color: "#f85064" },
] as const;

const SHARED_RIPPLE = {
  rippleRadius:    420,
  rippleAmplitude: 15,
  rippleFrequency: 0.038,
  rippleSpeed:     0.1,
  mouseSmoothing:  0.05,
};

// ── Memoized watermark rows — never re-render unless props change ─────────────
const DesktopWatermark = memo(function DesktopWatermark() {
  return (
    <div className="w-full pb-40">
      {WATERMARK_WORDS.map(({ fillText, xFraction, rgba }) => (
        <div
          key={fillText}
          // contain:strict tells the browser this subtree doesn't affect layout
          className="relative w-full h-[15vw] -mb-32 select-none pointer-events-none"
          style={{ contain: "strict" }}
        >
          <DeveloperTextInteractive
            {...SHARED_RIPPLE}
            fillText={fillText}
            xFraction={xFraction}
            rgba={rgba}
          />
        </div>
      ))}
    </div>
  );
});

const MobileWatermark = memo(function MobileWatermark() {
  return (
    <div
      className="w-full flex flex-col pb-6 pt-2 overflow-hidden select-none"
      aria-hidden
    >
      {WATERMARK_WORDS.map(({ fillText, color }, i) => (
        <span
          key={fillText}
          className="font-display font-black uppercase leading-none"
          style={{
            fontSize:    "clamp(3rem, 24vw, 14rem)",
            color,
            opacity:     0.82 - i * 0.3,
            paddingLeft: `${i * 8}vw`,
            letterSpacing: "-0.02em",
            // Promote to its own compositor layer — prevents repaints from
            // sibling elements bleeding into this text.
            willChange: "opacity",
          }}
        >
          {fillText}
        </span>
      ))}
    </div>
  );
});

export function Footer() {
  // Start with null so SSR produces neither branch — avoids hydration mismatch
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    // matchMedia is cheaper than a resize listener for a static breakpoint
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <footer className="relative w-full bg-[#171717] border-t border-white/8 overflow-hidden">
      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link
              href="#Home"
              className="font-display font-black uppercase text-2xl text-white tracking-tight w-fit"
            >
              Aditya<span className="text-amber-200">.dev</span>
            </Link>
            <p className="font-body text-sm text-white/35 leading-relaxed max-w-[22ch]">
              Crafting fast, precise digital experiences — one commit at a time.
            </p>
            <div className="flex items-center gap-4 mt-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="text-white/25 hover:text-amber-200 transition-colors duration-200"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <span className="font-body text-[10px] uppercase tracking-[0.22em] text-white/20 mb-1">
              Pages
            </span>
            {links.map((l) => (
              <Link
                key={l.text}
                href={l.href}
                className="font-body text-sm text-white/40 hover:text-amber-200 transition-colors duration-200 w-fit"
              >
                {l.text}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span className="font-body text-[10px] uppercase tracking-[0.22em] text-white/20 mb-1">
              Get in touch
            </span>
            <a
              href="mailto:hello@aditya.dev"
              className="font-body text-sm text-white/40 hover:text-amber-200 transition-colors duration-200 w-fit"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="font-body text-xs text-white/20 leading-relaxed mt-2 max-w-[28ch]">
              Open to freelance projects, full-time roles, and interesting collabs.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="font-body text-xs text-white/20">
            © {new Date().getFullYear()} Aditya Kumar. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/15">
            Built with Next.js &amp; Tailwind CSS.
          </p>
        </div>
      </div>

      {/* ── Watermark ── */}
      {/* null = SSR / hydrating — render nothing to avoid flash */}
      {isDesktop === true  && <DesktopWatermark />}
      {isDesktop === false && <MobileWatermark  />}
    </footer>
  );
}