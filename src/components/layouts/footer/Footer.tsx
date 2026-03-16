"use client";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/src/constants/socialLinks";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { text: "Home", href: "#Home" },
  { text: "Projects", href: "#Projects" },
  { text: "About", href: "#About" },
  { text: "Skills", href: "#Skills" },
  { text: "Contact", href: "#Contact" },
];



const DeveloperTextInteractive = dynamic(
  () => import("@/src/sections/DeveloperTextInteractive"),
  { ssr: false },
);

const WATERMARK_WORDS = [
  { fillText: "BUILD", xFraction: 0.25, rgba: "rgba(250, 197, 40,  1)", color: "#fac528" },
  { fillText: "SHIP",  xFraction: 0.50, rgba: "rgba(251, 120, 30,  1)", color: "#fb781e" },
  { fillText: "LEARN", xFraction: 0.75, rgba: "rgba(248,  80, 100, 1)", color: "#f85064" },
] as const;

const sharedRipple = {
  rippleRadius:    420,
  rippleAmplitude: 15,
  rippleFrequency: 0.038,
  rippleSpeed:     0.1,
  mouseSmoothing:  0.05,
};

export function Footer() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
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
            Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </div>

      {/* ── Watermark: staircase BUILD / SHIP / LEARN ── */}

      {/* DESKTOP: WebGL interactive canvases, stacked rows */}
      {isDesktop && (
        <div className="w-full pb-40">
          {WATERMARK_WORDS.map(({ fillText, xFraction, rgba }) => (
            <div key={fillText} className="relative w-full h-[15vw] -mb-32 select-none pointer-events-none">
              <DeveloperTextInteractive
                {...sharedRipple}
                fillText={fillText}
                xFraction={xFraction}
                rgba={rgba}
              />
            </div>
          ))}
        </div>
      )}

      {/* MOBILE: static CSS-only staircase — zero JS, zero canvas, zero WebGL */}
      {!isDesktop && (
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
                opacity:     0.12 - i * 0.02,        // BUILD 0.12 → SHIP 0.10 → LEARN 0.08
                paddingLeft: `${i * 8}vw`,            // staircase indent
                letterSpacing: "-0.02em",
              }}
            >
              {fillText}
            </span>
          ))}
        </div>
      )}
    </footer>
  );
}