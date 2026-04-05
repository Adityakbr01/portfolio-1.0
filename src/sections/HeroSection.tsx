"use client";
import { SOCIAL_LINKS_PUBLIC } from "@/src/constants/socialLinks";
import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "motion/react"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.21, 0.47, 0.32, 0.67],
    },
  },
};

function HeroSection() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      id="Home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#171717] px-4 sm:px-6"
    >
      {/* ── Noise texture overlay (kept for extra grain on top of shader) ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] z-1"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto pt-24 sm:pt-32 pb-16 flex flex-col items-center text-center gap-6 sm:gap-1">
        {/* Availability badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center sm:mb-6 gap-2 px-3 sm:px-4 py-1.5 rounded-full apple-border-shine bg-white/5 backdrop-blur-sm text-xs sm:text-sm font-body text-white/60">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute shadow-accent-soft shadow-2xl inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          Available for work
        </motion.div>

        {/* Name */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-0">
          <h1 className="font-display font-bold uppercase text-[3rem] sm:text-7xl md:text-[9rem] leading-[0.85] tracking-tight text-white">
            Aditya
            <br />
            <span className="text-amber-200">KABIR</span>
          </h1>
        </motion.div>

        {/* Role */}
        <motion.p variants={itemVariants} className="font-display uppercase text-sm sm:text-lg md:text-2xl text-white/90 tracking-[0.2em] sm:tracking-[0.25em]">
          Full Stack Developer
        </motion.p>

        {/* Description */}
        <motion.p variants={itemVariants} className="max-w-lg font-body text-white/70 text-sm sm:text-base md:text-lg leading-relaxed">
          I craft high-performance web applications with clean architecture and
          obsessive attention to detail — from <u>pixel-perfect</u> UIs to
          scalable backends.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
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
        </motion.div>

        {/* Socials */}
        <motion.div variants={itemVariants} className="flex items-center gap-5 mt-2">
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
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 1.5 } },
        }}
        className="absolute bottom-3 md:bottom-0  left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 animate-bounce z-10"
      >
        <span className="font-body text-xs tracking-widest uppercase">
          Scroll
        </span>
        <ArrowDown size={14} />
      </motion.div>

      {/* Horizontal rule */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent z-10" />
    </motion.section>
  );
}

export default HeroSection;
