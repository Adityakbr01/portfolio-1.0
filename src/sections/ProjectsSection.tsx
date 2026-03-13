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

const projects = [
  {
    id: 1,
    num: "01",
    title: "EduApp 2026",
    description:
      "Production-grade e-learning platform with HLS video streaming via AWS ECS Fargate (~70% cheaper than EC2), Redis caching (96% faster responses), BullMQ email campaigns with priority queues, Razorpay payments, real-time API monitoring via Socket.IO, and granular RBAC across 5 roles.",
    tags: [
      {
        name: "Next.js 16",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      },
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "Redis",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
      },
      {
        name: "BullMQ",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='14' r='8' fill='%23E53E3E'/%3E%3Cpath d='M5 9 Q1 2 7 8' stroke='%23E53E3E' stroke-width='2.5' fill='none' stroke-linecap='round'/%3E%3Cpath d='M19 9 Q23 2 17 8' stroke='%23E53E3E' stroke-width='2.5' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='9.5' cy='13' r='1.4' fill='white'/%3E%3Ccircle cx='14.5' cy='13' r='1.4' fill='white'/%3E%3Cellipse cx='12' cy='16.5' rx='2.5' ry='1.7' fill='%23C53030'/%3E%3C/svg%3E",
      },
      {
        name: "AWS ECS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      },
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
      },
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
      "Multi-tenant SaaS LMS with cohort management, 4-tier RBAC (student / mentor / admin / superadmin), AI-generated feedback & auto-grading via OpenAI, Razorpay/Stripe subscription billing, XP progress tracking, peer & mentor chat, and a job board — built for scale.",
    tags: [
      {
        name: "Next.js 15",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "JWT + RBAC",
        icon: "https://cdn.simpleicons.org/jsonwebtokens/white",
      },
      {
        name: "OpenAI",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.073zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829V6.0505a.0757.0757 0 0 1 .0332-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66v5.5826a.7948.7948 0 0 1-.3927.6813l-4.7783 2.7582-.1419-.0804zm-1.8546-6.6698-4.783-2.7582a.7712.7712 0 0 0-.7806 0L5.1788 5.6946v-2.33a.0804.0804 0 0 1 .0332-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66l-.142-.0852z'/%3E%3C/svg%3E",
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
      "Full-stack clone of Sheryians Coding School — course management, JWT auth with refresh tokens, Cloudinary media uploads, BullMQ email queues with retry & backoff, Redis caching, rate limiting, and a pixel-perfect UI with GSAP + Framer Motion animations.",
    tags: [
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      },
      {
        name: "Express 5",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "BullMQ",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='14' r='8' fill='%23E53E3E'/%3E%3Cpath d='M5 9 Q1 2 7 8' stroke='%23E53E3E' stroke-width='2.5' fill='none' stroke-linecap='round'/%3E%3Cpath d='M19 9 Q23 2 17 8' stroke='%23E53E3E' stroke-width='2.5' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='9.5' cy='13' r='1.4' fill='white'/%3E%3Ccircle cx='14.5' cy='13' r='1.4' fill='white'/%3E%3Cellipse cx='12' cy='16.5' rx='2.5' ry='1.7' fill='%23C53030'/%3E%3C/svg%3E",
      },
      {
        name: "Redis",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
      },
      {
        name: "Cloudinary",
        icon: "https://cdn.simpleicons.org/cloudinary/white",
      },
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
  active: {
    label: "Currently Working",
    dot: "bg-green-400",
    ping: "bg-green-400",
    text: "text-green-400/80",
    border: "border-green-400/20",
    bg: "bg-green-400/8",
  },
  maintaining: {
    label: "Maintaining",
    dot: "bg-amber-400",
    ping: "bg-amber-400",
    text: "text-amber-400/80",
    border: "border-amber-400/20",
    bg: "bg-amber-400/8",
  },
  archived: {
    label: "Not Maintaining",
    dot: "bg-white/30",
    ping: "",
    text: "text-white/30",
    border: "border-white/10",
    bg: "bg-white/5",
  },
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardRefs.current;
    const totalCards = cards.length;

    cards.forEach((card, index) => {
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50 + index * CARD_Y_OFFSET,
        scale: 1 - index * CARD_SCALE_STEP,
      });
    });

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * (totalCards - 1)}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
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
            gsap.set(card, { yPercent: -250, rotateX: 35, scale: 1 });
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

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      id="Projects"
      ref={sectionRef}
      className="relative w-full h-svh overflow-hidden"
      style={{ perspective: "1200px", background: "#111" }}
    >
      {/* Header */}
      <div className="absolute top-6 sm:top-10 left-4 sm:left-10 z-50 pointer-events-none select-none">
        <p
          style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.3em" }}
          className="text-white/30 text-xs uppercase mb-1"
        >
          Selected Work
        </p>
        <h2 className="text-white text-2xl sm:text-4xl font-display font-bold uppercase leading-none">
          Projects
        </h2>
      </div>

      <div className="absolute top-6 sm:top-10 right-4 sm:right-10 z-50 pointer-events-none select-none">
        <p
          style={{ fontFamily: "'DM Mono', monospace" }}
          className="text-white/20 text-xs flex items-center gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute shadow-accent-soft shadow-2xl inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent/40" />
          </span>
          {projects.length} works
        </p>
      </div>

      {/* Cards */}
      {projects.map((project, index) => (
        <div
          key={project.id}
          ref={(el) => {
            if (el) cardRefs.current[index] = el;
          }}
          style={{ zIndex: projects.length - index }}
          className="absolute group top-1/2 left-1/2 w-[80%] origin-bottom will-change-transform max-[1000px]:w-[calc(100%-1.5rem)] sm:max-[1000px]:w-[calc(100%-2.5rem)]"
          /* ─── HEIGHT STRATEGY ───────────────────────────────────────────────
             Mobile  (<640px):  auto height so all content is never cut off
             Tablet  (sm–md):   min-h-[88vh] so the card fills most of screen
             Desktop (md+):     fixed 78vh — original design intent
          ─────────────────────────────────────────────────────────────────── */
          // style={{ zIndex: projects.length - index, height: "auto" }}
        >
          {/* Wrapper that controls height per breakpoint */}
          <div className="h-auto sm:h-[84vh] md:h-[78vh] min-h-130"
            style={{
              background: project.bg,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              borderRadius: "24px",
              border: `1px solid ${project.accent}18`,
              width: "100%",
            }}
          >
            {/* ── macOS Browser Header ───────────────────────────────────── */}
            <div
              className="relative z-40 flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3 border-b shrink-0"
              style={{
                borderColor: `${project.accent}18`,
                background: "#111111",
              }}
            >
              {/* Traffic Lights + Nav */}
              <div className="flex gap-2 items-center w-auto sm:w-20 shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="hidden sm:flex items-center gap-2 text-white/30 ml-2">
                  <ChevronLeft size={16} className="hover:text-white/60 cursor-pointer transition-colors" />
                  <ChevronRight size={16} className="opacity-40" />
                  <RotateCw size={14} className="ml-1 hover:text-white/60 cursor-pointer transition-colors" />
                </div>
              </div>

              {/* URL Bar — hidden on xs, visible sm+ */}
              <div
                className="hidden sm:flex flex-1 items-center justify-center gap-2 px-4 py-1.5 rounded-md font-mono text-xs max-w-sm mx-4 min-w-0"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                <Lock size={10} className="opacity-50 shrink-0" />
                <span className="truncate">{project.live.replace("https://", "")}</span>
              </div>

              {/* Mobile: project title in center instead of URL bar */}
              <div
                className="flex sm:hidden flex-1 items-center justify-center px-2 min-w-0"
              >
                <span
                  className="truncate text-[10px] font-mono"
                  style={{ color: `${project.accent}70` }}
                >
                  {project.title}
                </span>
              </div>

              {/* Status Badge — hidden on mobile */}
              {(() => {
                const s = STATUS_CONFIG[project.status];
                return (
                  <div
                    className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-mono text-[10px] tracking-wide shrink-0 ${s.text} ${s.border} ${s.bg}`}
                  >
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      {project.status !== "archived" && (
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${s.ping}`} />
                      )}
                      <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${s.dot}`} />
                    </span>
                    {s.label}
                  </div>
                );
              })()}

              {/* Action Buttons */}
              <div className="flex gap-1.5 sm:gap-2 w-auto sm:w-20 justify-end z-40 shrink-0">
                {[
                  {
                    href: project.repo,
                    label: "GitHub",
                    icon: <Github size={14} strokeWidth={1.8} />,
                  },
                  {
                    href: project.live,
                    label: "Live",
                    icon: <ArrowUpRight size={14} strokeWidth={1.8} />,
                  },
                ].map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    onClick={(e) => e.stopPropagation()}
                    className="apple-border-shine"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      color: `${project.accent}60`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                      background: `${project.accent}08`,
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = `${project.accent}85`;
                      el.style.color = project.accent;
                      el.style.background = `${project.accent}18`;
                      el.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = `${project.accent}35`;
                      el.style.color = `${project.accent}60`;
                      el.style.background = `${project.accent}08`;
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* ── Card Body ─────────────────────────────────────────────── */}
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 relative flex flex-col outline-none overflow-hidden"
              style={{ textDecoration: "none", minHeight: 0 }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: "-5%",
                  left: "-5%",
                  width: "45%",
                  height: "50%",
                  zIndex: 21,
                  pointerEvents: "none",
                  background:
                    "radial-gradient(ellipse at 20% 35%, rgba(255,255,255,0.055) 0%, transparent 70%)",
                }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 22,
                  pointerEvents: "none",
                  boxShadow: `inset 0 0 0 1px ${project.accent}18, inset 0 1px 0 ${project.accent}28`,
                }}
              />

              {/* ── Responsive Layout ───────────────────────────────────── */}
              <div
                style={{ position: "relative", zIndex: 30 }}
                className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden min-h-0"
              >

                {/* ── MOBILE LAYOUT: Content on top, mockup at bottom ───── */}
                <div className="flex flex-col p-4 sm:p-6 md:p-14 w-full h-full flex-1 md:w-3/5 lg:w-1/2 order-1 md:order-0 min-h-0">
                  {/* Number */}
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      color: project.accent,
                      opacity: 0.45,
                    }}
                    className="text-xs tracking-[0.3em] uppercase mb-2 md:mb-4"
                  >
                    {project.num}
                  </span>

                  {/* Status badge — mobile only, inline */}
                  {(() => {
                    const s = STATUS_CONFIG[project.status];
                    return (
                      <div
                        className={`md:hidden inline-flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-[9px] tracking-wide mb-3 ${s.text} ${s.border} ${s.bg}`}
                      >
                        <span className="relative flex h-1.5 w-1.5 shrink-0">
                          {project.status !== "archived" && (
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${s.ping}`} />
                          )}
                          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${s.dot}`} />
                        </span>
                        {s.label}
                      </div>
                    );
                  })()}

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "#fff",
                    }}
                    className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-none mb-3 sm:mb-4"
                  >
                    {project.title}
                  </h3>

                  {/* Divider */}
                  <div
                    className="w-10 sm:w-12 h-px mb-3 sm:mb-5"
                    style={{
                      background: `linear-gradient(90deg, ${project.accent}, transparent)`,
                    }}
                  />

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      color: "rgba(255,255,255,0.38)",
                    }}
                    className="text-[10px] xs:text-[11px] sm:text-xs leading-relaxed mb-4 sm:mb-6"
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag.name}
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          color: `${project.accent}70`,
                          background: `${project.accent}08`,
                        }}
                        className="px-2 sm:px-2.5 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] tracking-wider uppercase rounded-full apple-border-shine duration-700 transition-all"
                      >
                        <img
                          src={tag.icon}
                          alt={`${tag.name} icon`}
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 object-contain opacity-70"
                          loading="lazy"
                        />
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── DESKTOP Mockup: right side, hidden on mobile ───────── */}
                <div
                  className="hidden md:flex flex-1 overflow-hidden relative"
                  style={{
                    background: `radial-gradient(ellipse at 60% 50%, ${project.accent}06 0%, transparent 70%)`,
                  }}
                >
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={`${project.title} mockup`}
                      fill
                      sizes="(max-width: 1200px) 45vw, 35vw"
                      className="object-contain p-4 lg:p-6 transition-transform duration-1000"
                    />
                  )}
                  {/* Fade edge on left */}
                  <div
                    className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
                    style={{
                      background: `linear-gradient(to right, ${project.bg}, transparent)`,
                    }}
                  />
                </div>

              </div>
            </a>
          </div>
        </div>
      ))}

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 w-full h-24 sm:h-32 pointer-events-none z-50"
        style={{ background: "linear-gradient(to top, #111, transparent)" }}
      />
    </section>
  );
}