import React from "react";

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "20+", label: "Projects Shipped" },
  { value: "10+", label: "Happy Clients" },
  { value: "5k+", label: "GitHub Commits" },
];

function AboutSection() {
  return (
    <section
      id="About"
      className="relative w-full bg-[#171717] py-32 overflow-hidden"
    >
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-125 h-125 rounded-full bg-amber-400/6 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-display uppercase text-amber-200/60 tracking-[0.3em] text-sm mb-3">
                Who I Am
              </p>
              <h2 className="font-display font-bold uppercase text-5xl md:text-7xl text-white leading-[0.9]">
                About
              </h2>
              <div className="mt-4 h-px w-16 bg-amber-200/40" />
            </div>

            <div className="flex flex-col gap-4 font-body text-white/50 text-base leading-relaxed">
              <p>
                I&apos;m Aditya, a Full Stack Developer based in India with a
                passion for building products that are both technically sound
                and a pleasure to use. I specialise in the JavaScript/TypeScript
                ecosystem — from crafting polished frontends with React and
                Next.js to architecting robust Node.js backends.
              </p>
              <p>
                I care deeply about performance, accessibility, and developer
                experience. When I&apos;m not coding, I&apos;m exploring system
                design, contributing to open source, or obsessing over good
                typography.
              </p>
              <p>
                I&apos;m currently open to full-time roles and selective
                freelance projects.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center
                  px-7 py-3 rounded-full font-body font-medium tracking-wide
                  bg-amber-200 text-[#171717]
                  transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                  shadow-[0_0_30px_-5px_rgba(251,191,36,0.4)]
                  hover:bg-amber-100 hover:shadow-[0_0_50px_-5px_rgba(251,191,36,0.6)]
                  hover:-translate-y-0.5 active:scale-95
                "
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Right: Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="
                  relative flex flex-col items-start justify-end
                  p-7 rounded-2xl overflow-hidden
                  apple-border-shine  bg-white/3
                  transition-all duration-300
                  hover:border-amber-200/20 hover:bg-white/5
                "
              >
                {/* Glow */}
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-amber-400/10 blur-2xl" />
                <span className="relative font-display font-bold text-5xl text-amber-200">
                  {stat.value}
                </span>
                <span className="relative font-body text-sm text-white/40 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

export default AboutSection;
