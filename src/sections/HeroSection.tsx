"use client";
import { SOCIAL_LINKS_PUBLIC } from "@/src/constants/socialLinks";
import { ArrowDown, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";



// ── Lazy-load the heavy WebGL canvas (client-only, no SSR) ──────────────────
const ShaderBackground = dynamic(() => import("./Shaderbackground"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-175 rounded-full bg-amber-400/10 blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-100 h-100 rounded-full bg-amber-300/8 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-75 h-75 rounded-full bg-orange-400/6 blur-[90px]" />
    </div>
  ),
});

function HeroSection() {


  return (
    <section
      id="Home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#171717] px-4 sm:px-6"
    >
      {/* ── WebGL shader background ── */}
      <ShaderBackground />

      {/* ── Noise texture overlay (kept for extra grain on top of shader) ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto pt-28 sm:pt-32 pb-16 flex flex-col items-center text-center gap-6 sm:gap-1">
        {/* Availability badge */}
        <div className="inline-flex items-center sm:mb-6 gap-2 px-3 sm:px-4 py-1.5 rounded-full apple-border-shine bg-white/5 backdrop-blur-sm text-xs sm:text-sm font-body text-white/60">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute shadow-accent-soft shadow-2xl inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          Available for work
        </div>

        {/* Name */}
        <div className="flex flex-col items-center gap-0">
          <h1 className="font-display font-bold uppercase text-[3rem] sm:text-7xl md:text-[9rem] leading-[0.85] tracking-tight text-white">
            Aditya
            <br />
            <span className="text-amber-200">Kumar</span>
          </h1>
        </div>

        {/* Role */}
        <p className="font-display uppercase text-sm sm:text-lg md:text-2xl text-white/90 tracking-[0.2em] sm:tracking-[0.25em]">
          Full Stack Developer
        </p>

        {/* Description */}
        <p className="max-w-lg font-body text-white/70 text-sm sm:text-base md:text-lg leading-relaxed">
          I craft high-performance web applications with clean architecture and
          obsessive attention to detail — from <u>pixel-perfect</u> UIs to
          scalable backends.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
          <Link
            href="#Projects"
            className="
              inline-flex items-center justify-center
              w-full sm:w-auto px-7 py-3 rounded-full font-body font-medium tracking-wide
              bg-amber-200 text-[#171717]
              transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
              hover:bg-amber-100
              active:scale-95 active:translate-y-0
              apple-border-shine
              group
            "
          >
            View Projects
            <ArrowRight className="w-4 h-4 ml-2 -rotate-45 transition-all duration-300 group-hover:rotate-0" />
          </Link>
          <Link
            href="#Contact"
            className="
              inline-flex items-center justify-center
              w-full sm:w-auto px-7 py-3 rounded-full font-body font-medium tracking-wide
              text-amber-50
              transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
              backdrop-blur-xl
              bg-linear-to-b from-amber-200/20 to-amber-200/5
              shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]
              hover:from-amber-200/30 hover:to-amber-200/10
              hover:border-amber-200/30
              group
              active:scale-95 active:translate-y-0
              apple-border-shine
            "
          >
            Contact Me
            <ArrowRight className="w-4 h-4 ml-2 -rotate-45 transition-all duration-300 group-hover:rotate-0" />
          </Link>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-5 mt-2">
          {SOCIAL_LINKS_PUBLIC.map(({ icon: Icon, url, name }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="
                p-2.5 rounded-full
                text-white/30
                apple-border-shine
                transition-all duration-200
                hover:text-amber-200 hover:border-amber-200/30 hover:bg-amber-200/5
              "
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 animate-bounce z-10">
        <span className="font-body text-xs tracking-widest uppercase">
          Scroll
        </span>
        <ArrowDown size={14} />
      </div>

      {/* Horizontal rule */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent z-10" />
    </section>
  );
}

export default HeroSection;
