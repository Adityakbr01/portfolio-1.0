import React from "react";
import { ArrowUpRight, Code2, Layers, Cpu, GitCommit } from "lucide-react";

const stats = [
  { value: "1+", label: "Years Experience", icon: Cpu },
  { value: "10+", label: "Projects Shipped", icon: Layers },
  { value: "3+", label: "Happy Clients", icon: Code2 },
  { value: "1k+", label: "GitHub Commits", icon: GitCommit },
];

const interests = [
  "System Design",
  "Open Source",
  "Typography",
  "Performance",
  "DX",
  "Clean Architecture",
];

function AboutSection() {
  return (
    <div
      id="About"
      className="relative w-full bg-[#171717] py-20 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-400/6 blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-orange-400/5 blur-[100px]" />
      </div>

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* ── Left: Text ── */}
          <div className="flex flex-col gap-8 md:gap-10">
            {/* Header */}
            <div>
              <p className="font-display uppercase text-amber-200/60 tracking-[0.25em] md:tracking-[0.3em] text-xs sm:text-sm mb-3">
                Who I Am
              </p>
              <h2 className="font-display font-bold uppercase text-4xl sm:text-5xl md:text-7xl text-white leading-[0.9]">
                About
              </h2>
              <div className="mt-4 h-px w-16 bg-amber-200/40" />
            </div>

            {/* Body copy */}
            <div className="flex flex-col gap-5 font-body text-white/50 text-sm sm:text-base leading-relaxed">
              <p>
                I&apos;m{" "}
                <span className="text-white/80 font-medium">Aditya</span>, a
                Full Stack Developer from India who loves building fast,
                scalable, and beautifully designed products. I work mainly with
                the JavaScript/TypeScript ecosystem — crafting polished UIs with
                React & Next.js and building robust backends with Node.js. I
                care about performance, accessibility, and great developer
                experience, and I&apos;m currently open to{" "}
                <span className="text-amber-200/80">full-time roles</span> and
                selective freelance projects.
              </p>
            </div>

            {/* Interests */}
            <div className="flex flex-col gap-3">
              <p className="font-display uppercase text-white/25 tracking-[0.2em] text-xs">
                Interests
              </p>
              <div className="flex flex-wrap gap-2">
                {interests.map((tag) => (
                  <span
                    key={tag}
                    className="
                      px-3 py-1 rounded-full
                      apple-border-shine bg-white/3
                      font-body text-xs text-white/40
                      transition-all duration-300
                      hover:text-white/70 hover:bg-white/6
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group inline-flex items-center gap-2
                  px-7 py-3 rounded-full font-body font-medium tracking-wide
                  bg-amber-200 text-[#171717]
                  transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                  shadow-[0_0_30px_-5px_rgba(251,191,36,0.4)]
                  hover:bg-amber-100 hover:shadow-[0_0_50px_-5px_rgba(251,191,36,0.6)]
                  hover:-translate-y-0.5 active:scale-95
                "
              >
                Download Resume
                <ArrowUpRight
                  size={16}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <a
                href="#Contact"
                className="
                  group inline-flex items-center gap-2
                  px-7 py-3 rounded-full font-body font-medium tracking-wide
                  apple-border-shine bg-white/3 text-white/70
                  transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                  hover:bg-white/8 hover:text-white hover:border-white/20
                  hover:-translate-y-0.5 active:scale-95
                "
              >
                Get in Touch
                <ArrowUpRight
                  size={16}
                  strokeWidth={2}
                  className="opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>

          {/* ── Right: Stats grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:pt-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="
                    group relative flex flex-col items-start justify-between
                    p-5 sm:p-7 rounded-3xl overflow-hidden
                    apple-border-shine bg-white/3
                    transition-all duration-300
                    hover:border-amber-200/20 hover:bg-white/5
                    hover:-translate-y-1
                  "
                >
                  {/* Corner glow */}
                  <div
                    className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `hsl(${42 + i * 8}, 90%, 65%, 0.12)` }}
                  />
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-amber-400/8 blur-2xl pointer-events-none" />

                  {/* Icon */}
                  <div className="relative apple-border-shine p-2.5 rounded-xl bg-white/5 text-amber-200/50 mb-6">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>

                  {/* Value + label */}
                  <div className="relative">
                    <span className="block font-display font-bold text-4xl sm:text-5xl text-amber-200 leading-none">
                      {stat.value}
                    </span>
                    <span className="block font-body text-sm text-white/40 mt-2 leading-snug">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

export default AboutSection;
