"use client";

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

    // Note: totalCards - 1 is used because the LAST card doesn't need to scroll AWAY.
    // However, if we do window.innerHeight * (totalCards), there will be an extra segment
    // of scroll space where nothing happens (since the last card is pinned).
    // To make it end EXACTLY when the last card arrives without extra scroll,
    // the end trigger height should be `+=${window.innerHeight * (totalCards - 1)}px`.
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * (totalCards - 1)}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        // Because the end is (totalCards - 1), progress mapped via (1 / (totalCards - 1))
        // represents exactly the transition between cards.
        const progress = self.progress;

        // We use totalCards - 1 as the denominator for segProgress
        // Example: 3 cards. totalCards - 1 = 2 segments of animation.
        // segment 0: Card 1 goes away, Card 2 scales up.
        // segment 1: Card 2 goes away, Card 3 scales up.
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
            // Because our scroll length exactly matches the number of transitions...
            // When progress is 1.0, activeIndex will technically be totalCards - 1,
            // but segment progress will be 0 (from the Math.min clamp).
            // This cleanly pins the final card in the center.
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
      style={{ perspective: "900px", background: "#111" }}
    >
      {/* Header */}
      <div className="absolute top-10 left-10 z-50 pointer-events-none select-none">
        <p
          style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.3em" }}
          className="text-white/30 text-xs uppercase mb-1"
        >
          Selected Work
        </p>
        <h2 className="text-white text-4xl font-display font-bold uppercase leading-none">
          Projects
        </h2>
      </div>

      <div className="absolute top-10 right-10 z-50 pointer-events-none select-none">
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
          // wider: 95vw / max-w-325  |  taller: 72vh / min-h-130
          className="absolute group top-1/2 left-1/2 w-[95vw] max-w-325 h-[72vh] min-h-130 origin-bottom will-change-transform"
        >
          {/* Card body — browser window style */}
          <div
            style={{
              width: "100%",
              height: "100%",
              background: project.bg,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              borderRadius: "24px", // standard clean radius
              border: `1px solid ${project.accent}18`, // perfectly applies now
            }}
          >
            {/* macOS Browser Header */}
            <div
              className="relative z-40 flex items-center justify-between px-5 py-3 border-b"
              style={{
                borderColor: `${project.accent}18`,
                background: "#111111",
              }}
            >
              {/* Traffic Lights */}
              <div className="flex gap-2 w-20">
                <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                  {/* Close */}
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-[8px] font-bold text-black/70 leading-none">
                      ×
                    </span>
                  </div>

                  {/* Minimize */}
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-[8px] font-bold text-black/70 leading-none">
                      –
                    </span>
                  </div>

                  {/* Maximize */}
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-[8px] font-bold text-black/70 leading-none">
                      +
                    </span>
                  </div>
                </div>
                {/* Browser Navigation Arrows */}
                <div className="hidden sm:flex items-center gap-2 text-white/30 ml-2">
                  <ChevronLeft
                    size={16}
                    className="hover:text-white/60 cursor-pointer transition-colors"
                  />
                  <ChevronRight size={16} className="opacity-40" />
                  <RotateCw
                    size={14}
                    className="ml-1 hover:text-white/60 cursor-pointer transition-colors"
                  />
                </div>
              </div>

              {/* URL Bar */}
              <div
                className="flex-1 flex  items-center justify-center gap-2 px-4 py-1.5 rounded-md font-mono text-xs max-w-sm mx-4"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                <Lock size={10} className="opacity-50" />
                <span>{project.live.replace("https://", "")}</span>
              </div>

              {/* Status Badge */}
              {(() => {
                const s = STATUS_CONFIG[project.status];
                return (
                  <div
                    className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-mono text-[10px] tracking-wide ${s.text} ${s.border} ${s.bg}`}
                  >
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      {project.status !== "archived" && (
                        <span
                          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${s.ping}`}
                        />
                      )}
                      <span
                        className={`relative inline-flex rounded-full h-1.5 w-1.5 ${s.dot}`}
                      />
                    </span>
                    {s.label}
                  </div>
                );
              })()}

              {/* Action Buttons */}
              <div className="flex gap-2 w-20 justify-end z-40">
                {[
                  {
                    href: project.repo,
                    label: "GitHub",
                    icon: <Github size={16} strokeWidth={1.8} />,
                  },
                  {
                    href: project.live,
                    label: "Live",
                    icon: <ArrowUpRight size={16} strokeWidth={1.8} />,
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
                      width: 35,
                      height: 35,
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

            {/* Clickable Content Body */}
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 relative block outline-none"
              style={{ textDecoration: "none" }}
            >
              {/* CSS plastic sheen */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 20,
                  pointerEvents: "none",
                  background: `
                    linear-gradient(
                      118deg,
                      transparent 18%,
                      rgba(255,255,255,0.04) 40%,
                      rgba(255,255,255,0.085) 17%,
                      rgba(255,255,255,0.025) 44%,
                      transparent 54%,
                      rgba(255,255,255,0.045) 69%,
                      rgba(255,255,255,0.015) 72%,
                      transparent 82%
                    )
                  `,
                }}
              />
              {/* Specular top-left highlight */}
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
              {/* Inner border shimmer (only sides & bottom now, top is handled by header) */}
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

              {/* Content */}
              <div
                style={{ position: "relative", zIndex: 30, height: "100%" }}
                className="flex flex-col md:flex-row justify-between p-10 md:p-14 gap-8"
              >
                {/* Left Side: Text Details */}
                <div className="flex flex-col justify-between h-full w-full md:w-1/2">
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      color: project.accent,
                      opacity: 0.45,
                    }}
                    className="text-xs tracking-[0.3em] uppercase mb-4 md:mb-0"
                  >
                    {project.num}
                  </span>

                  <div className="flex-1 mt-4 md:mt-0">
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#fff",
                      }}
                      className="text-5xl md:text-6xl font-bold uppercase leading-none mb-5"
                    >
                      {project.title}
                    </h3>
                    <div
                      className="w-12 h-px mb-5"
                      style={{
                        background: `linear-gradient(90deg, ${project.accent}, transparent)`,
                      }}
                    />
                    <p
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        color: "rgba(255,255,255,0.38)",
                      }}
                      className="text-xs leading-relaxed max-w-lg mb-8 md:mb-0"
                    >
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag.name}
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          color: `${project.accent}70`,
                          background: `${project.accent}08`,
                        }}
                        className="px-3 py-2 flex items-center gap-1.5 text-[10px] tracking-wider uppercase rounded-full apple-border-shine duration-700 transition-all"
                      >
                        <img
                          src={tag.icon}
                          alt={`${tag.name} icon`}
                          className="w-3 h-3 object-contain opacity-70"
                          loading="lazy"
                        />
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Mockup Image */}
                {project.image && (
                  <div className="w-[19%]">
                    <img
                      src={project.image}
                      alt={`${project.title} mockup`}
                      className="object-cover w-full h-full transform scale-110 transition-transform duration-1000 origin-center"
                    />
                  </div>
                )}
              </div>
            </a>
          </div>
        </div>
      ))}

      <div
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-50"
        style={{ background: "linear-gradient(to top, #111, transparent)" }}
      />
    </section>
  );
}
