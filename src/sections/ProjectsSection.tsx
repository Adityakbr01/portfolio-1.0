"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Github,
  Lock,
  RotateCw,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARD_Y_OFFSET = 6;
const CARD_SCALE_STEP = 0.07;
const MOBILE_TAG_LIMIT = 3;

const projects = [
  {
    id: 1,
    num: "01",
    title: "EduApp 2026",
    description:
      "Production-grade e-learning platform with HLS streaming via AWS ECS Fargate, Redis caching (96% faster responses), BullMQ email campaigns, Razorpay payments, and granular RBAC across 5 roles.",
    tags: [
      { name: "Next.js 16", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
      {
        name: "BullMQ",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='14' r='8' fill='%23E53E3E'/%3E%3Ccircle cx='9.5' cy='13' r='1.4' fill='white'/%3E%3Ccircle cx='14.5' cy='13' r='1.4' fill='white'/%3E%3Cellipse cx='12' cy='16.5' rx='2.5' ry='1.7' fill='%23C53030'/%3E%3C/svg%3E",
      },
      { name: "AWS ECS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    ],
    status: "active" as const,
    live: "https://app.edulaunch.shop",
    repo: "https://github.com/Adityakbr01/eduApp2026",
    bg: "#0B0C10",
    accent: "#F2A900",
    image: "/images/eduAppMock.png",
  },
  {
    id: 2,
    num: "02",
    title: "EduLaunch SaaS",
    description:
      "Multi-tenant SaaS LMS with cohort management, 4-tier RBAC, AI-generated feedback via OpenAI, Razorpay/Stripe billing, XP tracking, peer chat, and a job board — built for scale.",
    tags: [
      { name: "Next.js 15", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
      { name: "JWT + RBAC", icon: "https://cdn.simpleicons.org/jsonwebtokens/white" },
      {
        name: "OpenAI",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.073zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944z'/%3E%3C/svg%3E",
      },
      { name: "Razorpay", icon: "https://cdn.simpleicons.org/razorpay/white" },
      { name: "ShadCN UI", icon: "https://cdn.simpleicons.org/shadcnui/white" },
    ],
    status: "archived" as const,
    live: "https://www.edulaunch.shop",
    repo: "https://github.com/Adityakbr01/Saas_cohort_management",
    bg: "#08101C",
    accent: "#38BDF8",
    image: "/images/eduShopMock.png",
  },
  {
    id: 3,
    num: "03",
    title: "Sheryians Clone",
    description:
      "Full-stack clone of Sheryians Coding School — JWT auth with refresh tokens, Cloudinary uploads, BullMQ queues, Redis caching, rate limiting, and GSAP + Framer Motion animations.",
    tags: [
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
      { name: "Express 5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
      {
        name: "BullMQ",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='14' r='8' fill='%23E53E3E'/%3E%3Ccircle cx='9.5' cy='13' r='1.4' fill='white'/%3E%3Ccircle cx='14.5' cy='13' r='1.4' fill='white'/%3E%3Cellipse cx='12' cy='16.5' rx='2.5' ry='1.7' fill='%23C53030'/%3E%3C/svg%3E",
      },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
      { name: "Cloudinary", icon: "https://cdn.simpleicons.org/cloudinary/white" },
    ],
    status: "archived" as const,
    live: "https://sheryians-clone-full-stack.vercel.app",
    repo: "https://github.com/Adityakbr01/sheryians_Clone_FullStack",
    bg: "#061410",
    accent: "#34D399",
    image: "/images/sheryOldMock.png",
  },
];

const STATUS_CONFIG = {
  active: { label: "Live", dot: "bg-green-400", ping: "bg-green-400", text: "text-green-400/80", border: "border-green-400/20", bg: "bg-green-400/10" },
  maintaining: { label: "Maintaining", dot: "bg-amber-400", ping: "bg-amber-400", text: "text-amber-400/80", border: "border-amber-400/20", bg: "bg-amber-400/10" },
  archived: { label: "Archived", dot: "bg-white/30", ping: "", text: "text-white/30", border: "border-white/10", bg: "bg-white/5" },
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardRefs.current;
    const totalCards = cards.length;

    // Disable GSAP lag compensation — Lenis owns frame timing
    gsap.ticker.lagSmoothing(0);

    cards.forEach((card, index) => {
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50 + index * CARD_Y_OFFSET,
        scale: 1 - index * CARD_SCALE_STEP,
        rotationX: 0,
        force3D: true,
      });
    });

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * (totalCards - 1)}px`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,         // eliminates 1-frame jump on pin entry
      invalidateOnRefresh: true, // recalculates after resize / Lenis refresh
      scrub: true,               // no double-smoothing on top of Lenis
      onUpdate: (self) => {
        const progress = self.progress;
        const segmentSizeFixed = 1 / (totalCards - 1);
        const activeIndex = Math.min(
          Math.floor(progress / segmentSizeFixed),
          totalCards - 1,
        );
        const segProgress =
          (progress - activeIndex * segmentSizeFixed) / segmentSizeFixed;

        cards.forEach((card, index) => {
          if (index < activeIndex) {
            gsap.set(card, { yPercent: -250, rotationX: 35, scale: 1 });
          } else if (index === activeIndex) {
            if (index === totalCards - 1) {
              gsap.set(card, { yPercent: -50, rotationX: 0, scale: 1 });
            } else {
              gsap.set(card, {
                yPercent: gsap.utils.interpolate(-50, -220, segProgress),
                rotationX: gsap.utils.interpolate(0, 35, segProgress),
                scale: 1,
              });
            }
          } else {
            const effectiveBehind = index - activeIndex - segProgress;
            gsap.set(card, {
              yPercent: -50 + effectiveBehind * CARD_Y_OFFSET,
              rotationX: 0,
              scale: 1 - effectiveBehind * CARD_SCALE_STEP,
            });
          }
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      id="Projects"
      ref={sectionRef}
      className="relative w-full h-svh overflow-hidden"
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
        background: "#111",
      }}
    >
      {/* ── Section header ── */}
      <div className="absolute top-4 sm:top-10 left-4 sm:left-10 z-50 pointer-events-none select-none">
        <p
          style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.3em" }}
          className="text-white/30 text-[9px] sm:text-xs uppercase mb-0.5 sm:mb-1"
        >
          Selected Work
        </p>
        <h2 className="text-white text-xl sm:text-4xl font-display font-bold uppercase leading-none">
          Projects
        </h2>
      </div>

      <div className="absolute top-4 sm:top-10 right-4 sm:right-10 z-50 pointer-events-none select-none">
        <p
          style={{ fontFamily: "'DM Mono', monospace" }}
          className="text-white/20 text-[9px] sm:text-xs flex items-center gap-1.5"
        >
          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-full w-full bg-green-400/40" />
          </span>
          {projects.length} works
        </p>
      </div>

      {/* ── Cards ── */}
      {projects.map((project, index) => {
        const s = STATUS_CONFIG[project.status];
        const mobileTags = project.tags.slice(0, MOBILE_TAG_LIMIT);
        const mobileExtra = project.tags.length - MOBILE_TAG_LIMIT;

        return (
          <div
            key={project.id}
            ref={(el) => { if (el) cardRefs.current[index] = el; }}
            style={{
              zIndex: projects.length - index,
              willChange: "transform",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className="absolute group top-1/2 left-1/2 w-[80%] origin-bottom max-[1000px]:w-[calc(100%-1.5rem)] sm:max-[1000px]:w-[calc(100%-2.5rem)]"
          >
            <div
              className="h-auto sm:h-[84vh] md:h-[78vh]"
              style={{
                background: project.bg,
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                borderRadius: "20px",
                border: `1px solid ${project.accent}20`,
                width: "100%",
                // Min heights so content always fits without scroll
                minHeight: "min(82svh, 560px)",
              }}
            >

              {/* ════════════════════════════════════════════════════
                  MOBILE layout  (<768px)
                  ── header bar (shrink-0)
                  ── image      (fixed 36%)
                  ── text zone  (flex-1, NO overflow)
              ════════════════════════════════════════════════════ */}
              <div className="md:hidden flex flex-col h-full">

                {/* ── Mini browser bar ── */}
                <div
                  className="shrink-0 flex items-center justify-between px-3 py-2 border-b"
                  style={{ borderColor: `${project.accent}18`, background: "#0d0d0d" }}
                >
                  {/* Traffic lights */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                    <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                  </div>

                  {/* URL / title */}
                  <div
                    className="flex-1 flex items-center justify-center gap-1.5 mx-3 px-2.5 py-1 rounded font-mono text-[9px] min-w-0"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    <Lock size={8} className="opacity-50 shrink-0" />
                    <span className="truncate">{project.live.replace("https://", "")}</span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Status dot */}
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[8px] font-mono tracking-wide ${s.text} ${s.border} ${s.bg}`}>
                      <span className="relative flex h-1.5 w-1.5 shrink-0">
                        {project.status !== "archived" && (
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${s.ping}`} />
                        )}
                        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${s.dot}`} />
                      </span>
                      {s.label}
                    </span>
                    <a href={project.repo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                      style={{ color: `${project.accent}70`, display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", background: `${project.accent}10`, border: `1px solid ${project.accent}20` }}>
                      <Github size={11} strokeWidth={1.8} />
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                      style={{ color: `${project.accent}70`, display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", background: `${project.accent}10`, border: `1px solid ${project.accent}20` }}>
                      <ArrowUpRight size={11} strokeWidth={1.8} />
                    </a>
                  </div>
                </div>


                {/* ── Text block — fills remaining space, zero scroll ── */}
                <div className="flex flex-col flex-1 min-h-0 px-4 pt-2.5 pb-3">

                  {/* Number + title row */}
                  <div className="flex items-start gap-2 mb-1.5 shrink-0">
                    <span
                      style={{ color: project.accent, opacity: 0.4, fontFamily: "'DM Mono', monospace" }}
                      className="text-[9px] tracking-[0.3em] uppercase mt-1 shrink-0"
                    >
                      {project.num}
                    </span>
                    <h3
                      className="font-bold uppercase leading-[1.05]"
                      style={{
                        fontFamily: "'Playfair Display', serif", color: "#fff",
                        fontSize: "clamp(1.1rem, 5.8vw, 1.65rem)",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      } as React.CSSProperties}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {/* Accent divider */}
                  <div className="w-8 h-px mb-2 shrink-0" style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }} />

                  {/* Description — 3 lines max */}
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      color: "rgba(255,255,255,0.38)",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    } as React.CSSProperties}
                    className="text-[9.5px] leading-relaxed mb-3 shrink-0"
                  >
                    {project.description}
                  </p>

                  {/* Tags — pushed to bottom, never wrap overflow */}
                  <div className="mt-auto shrink-0 flex flex-wrap gap-1.5">
                    {mobileTags.map((tag) => (
                      <span
                        key={tag.name}
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          color: `${project.accent}75`,
                          background: `${project.accent}0c`,
                          border: `1px solid ${project.accent}20`,
                        }}
                        className="flex items-center gap-1 px-2 py-0.75 text-[8px] tracking-wider uppercase rounded-full whitespace-nowrap"
                      >
                        <img src={tag.icon} alt={tag.name} className="w-2.5 h-2.5 object-contain opacity-70" loading="lazy" />
                        {tag.name}
                      </span>
                    ))}
                    {mobileExtra > 0 && (
                      <span
                        style={{ color: `${project.accent}50`, border: `1px solid ${project.accent}15`, background: `${project.accent}08` }}
                        className="px-2 py-0.75 text-[8px] tracking-wide uppercase rounded-full whitespace-nowrap font-mono"
                      >
                        +{mobileExtra}
                      </span>
                    )}
                  </div>
                    {/* ── Image — after text, fixed height, top-anchored ── */}
                <div className="absolute -bottom-1/3 left-2 b-400 w-[95%] mx-auto shrink-0" style={{ height: "100%" }}>
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={`${project.title} mockup`}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      style={{ objectPosition: "top center" }}
                      priority
                    />
                  )}
                  {/* Gradient bleed upward into card bg */}
                  
                  
                </div>
                </div>
              </div>

              {/* ════════════════════════════════════════════════════
                  DESKTOP layout  (≥768px)  — original design
              ════════════════════════════════════════════════════ */}
              <div className="hidden md:flex flex-col h-full">

                {/* Browser chrome */}
                <div
                  className="relative z-40 flex items-center justify-between px-5 py-3 border-b shrink-0"
                  style={{ borderColor: `${project.accent}18`, background: "#111111" }}
                >
                  <div className="flex gap-2 items-center w-20 shrink-0">
                    <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="flex items-center gap-2 text-white/30 ml-2">
                      <ChevronLeft size={16} />
                      <ChevronRight size={16} className="opacity-40" />
                      <RotateCw size={14} className="ml-1" />
                    </div>
                  </div>

                  <div
                    className="flex flex-1 items-center justify-center gap-2 px-4 py-1.5 rounded-md font-mono text-xs max-w-sm mx-4 min-w-0"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    <Lock size={10} className="opacity-50 shrink-0" />
                    <span className="truncate">{project.live.replace("https://", "")}</span>
                  </div>

                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-mono text-[10px] tracking-wide shrink-0 ${s.text} ${s.border} ${s.bg}`}>
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      {project.status !== "archived" && (
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${s.ping}`} />
                      )}
                      <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${s.dot}`} />
                    </span>
                    {STATUS_CONFIG[project.status].label === "Live" ? "Currently Working" : STATUS_CONFIG[project.status].label}
                  </div>

                  <div className="flex gap-2 w-20 justify-end z-40 shrink-0">
                    {[
                      { href: project.repo, label: "GitHub", icon: <Github size={14} strokeWidth={1.8} /> },
                      { href: project.live, label: "Live", icon: <ArrowUpRight size={14} strokeWidth={1.8} /> },
                    ].map(({ href, label, icon }) => (
                      <a
                        key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                        onClick={(e) => e.stopPropagation()}
                        style={{ width: 28, height: 28, borderRadius: "50%", color: `${project.accent}60`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s ease", background: `${project.accent}08`, textDecoration: "none" }}
                        onMouseEnter={(e) => { const el = e.currentTarget; el.style.color = project.accent; el.style.background = `${project.accent}18`; el.style.transform = "translateY(-2px)"; }}
                        onMouseLeave={(e) => { const el = e.currentTarget; el.style.color = `${project.accent}60`; el.style.background = `${project.accent}08`; el.style.transform = "translateY(0)"; }}
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Card body */}
                <a
                  href={project.live} target="_blank" rel="noopener noreferrer"
                  className="flex-1 relative flex flex-col outline-none overflow-hidden"
                  style={{ textDecoration: "none", minHeight: 0 }}
                >
                  <div aria-hidden style={{ position: "absolute", top: "-5%", left: "-5%", width: "45%", height: "50%", zIndex: 21, pointerEvents: "none", background: "radial-gradient(ellipse at 20% 35%, rgba(255,255,255,0.055) 0%, transparent 70%)" }} />
                  <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 22, pointerEvents: "none", boxShadow: `inset 0 0 0 1px ${project.accent}18, inset 0 1px 0 ${project.accent}28` }} />

                  <div style={{ position: "relative", zIndex: 30 }} className="flex-1 flex flex-row overflow-hidden min-h-0">
                    <div className="flex flex-col p-14 w-3/5 lg:w-1/2 min-h-0">
                      <span style={{ fontFamily: "'DM Mono', monospace", color: project.accent, opacity: 0.45 }} className="text-xs tracking-[0.3em] uppercase mb-4">{project.num}</span>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#fff" }} className="text-5xl lg:text-6xl font-bold uppercase leading-none mb-4">{project.title}</h3>
                      <div className="w-12 h-px mb-5" style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }} />
                      <p style={{ fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.38)" }} className="text-xs leading-relaxed mb-6">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map((tag) => (
                          <span key={tag.name} style={{ fontFamily: "'DM Mono', monospace", color: `${project.accent}70`, background: `${project.accent}08` }}
                            className="px-2.5 py-1.5 flex items-center gap-1.5 text-[10px] tracking-wider uppercase rounded-full">
                            <img src={tag.icon} alt={tag.name} className="w-3 h-3 object-contain opacity-70" loading="lazy" />
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-1 overflow-hidden relative" style={{ background: `radial-gradient(ellipse at 60% 50%, ${project.accent}06 0%, transparent 70%)` }}>
                      {project.image && (
                        <Image src={project.image} alt={`${project.title} mockup`} fill sizes="45vw" className="object-contain p-6" />
                      )}
                      <div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, ${project.bg}, transparent)` }} />
                    </div>
                  </div>
                </a>
              </div>

            </div>
          </div>
        );
      })}

      <div className="absolute bottom-0 left-0 w-full h-24 pointer-events-none z-50" style={{ background: "linear-gradient(to top, #111, transparent)" }} />
    </section>
  );
}