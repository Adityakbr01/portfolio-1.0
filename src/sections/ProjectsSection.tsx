"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Github, Lock, RotateCw } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const CARD_Y_OFFSET = 6;
const CARD_SCALE_STEP = 0.07;

const projects = [
  {
    id: 1,
    num: "01",
    title: "Horizon Dashboard",
    description:
      "A full-stack SaaS analytics dashboard with real-time data visualization, role-based access control, and a REST + WebSocket API backend.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Recharts"],
    live: "https://horizon-dashboard.vercel.app",
    repo: "https://github.com/yourusername/horizon-dashboard",
    bg: "#0f0f0f",
    accent: "#d4a853",
  },
  {
    id: 2,
    num: "02",
    title: "Threadly",
    description:
      "A social platform for developers to share short code snippets with syntax highlighting, comments, and a follow system built with Next.js App Router.",
    tags: ["Next.js", "MongoDB", "Tailwind CSS", "NextAuth"],
    live: "https://threadly.vercel.app",
    repo: "https://github.com/yourusername/threadly",
    bg: "#0a0f18",
    accent: "#5b9bd5",
  },
  {
    id: 3,
    num: "03",
    title: "DevDeploy CLI",
    description:
      "An open-source CLI tool that automates Dockerised app deployment to VPS instances via SSH — zero configuration required.",
    tags: ["Node.js", "Docker", "SSH2", "Inquirer.js"],
    live: "https://www.npmjs.com/package/devdeploy",
    repo: "https://github.com/yourusername/devdeploy-cli",
    bg: "#091410",
    accent: "#4ecb8d",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    const rafHandler = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafHandler);
    gsap.ticker.lagSmoothing(0);

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
          totalCards - 1
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
      gsap.ticker.remove(rafHandler);
      lenis.destroy();
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
        <h2
          
          className="text-white text-4xl font-display font-bold uppercase leading-none"
        >
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
          ref={(el) => { if (el) cardRefs.current[index] = el; }}
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
                  <ChevronLeft size={16} className="hover:text-white/60 cursor-pointer transition-colors" />
                  <ChevronRight size={16} className="opacity-40" />
                  <RotateCw size={14} className="ml-1 hover:text-white/60 cursor-pointer transition-colors" />
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

              {/* Action Buttons */}
              <div className="flex gap-2 w-20 justify-end z-40">
                {[
                  { href: project.repo, label: "GitHub", icon: <Github size={16} strokeWidth={1.8} /> },
                  { href: project.live, label: "Live",   icon: <ArrowUpRight size={16} strokeWidth={1.8} /> },
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
                      border: `1px solid ${project.accent}35`,
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
                className="flex flex-col justify-between p-10 md:p-14"
              >
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    color: project.accent,
                    opacity: 0.45,
                  }}
                  className="text-xs tracking-[0.3em] uppercase"
                >
                  {project.num}
                </span>

                <div>
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
                    className="text-xs leading-relaxed max-w-lg"
                  >
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        color: `${project.accent}70`,
                        background: `${project.accent}08`,
                      }}
                      className="px-3 py-1 text-[10px] tracking-wider uppercase rounded-full apple-border-shine  duration-700 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
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