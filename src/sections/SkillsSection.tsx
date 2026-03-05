import React from "react";

const skillCategories = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "GraphQL", "WebSockets", "Prisma"],
  },
  {
    category: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Supabase", "Firebase"],
  },
  {
    category: "DevOps & Tools",
    skills: ["Docker", "Git", "GitHub Actions", "Vercel", "Linux", "Nginx"],
  },
];

function SkillsSection() {
  return (
    <section
      id="Skills"
      className="relative w-full bg-[#171717] py-32 overflow-hidden"
    >
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-amber-400/5 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="font-display uppercase text-amber-200/60 tracking-[0.3em] text-sm mb-3">
            What I Use
          </p>
          <h2 className="font-display font-bold uppercase text-5xl md:text-7xl text-white leading-[0.9]">
            Skills
          </h2>
          <div className="mt-4 h-px w-16 bg-amber-200/40" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.category}
              className="
                relative flex flex-col gap-5 p-7 rounded-2xl overflow-hidden
                apple-border-shine  bg-white/3
                transition-all duration-300
                hover:border-amber-200/15 hover:bg-white/5 hover:-translate-y-1
              "
            >
              {/* Subtle corner glow */}
              <div
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-60"
                style={{
                  background: `hsl(${45 + i * 10}, 93%, 65%, 0.15)`,
                }}
              />

              <h3 className="relative font-display uppercase text-xs tracking-[0.25em] text-amber-200/60">
                {cat.category}
              </h3>

              <div className="relative flex flex-col gap-2.5">
                {cat.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-amber-200/40 shrink-0" />
                    <span className="font-body text-sm text-white/55">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Marquee strip */}
        <div className="mt-16 overflow-hidden">
          <div className="flex gap-8 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
            {[...skillCategories.flatMap(c => c.skills), ...skillCategories.flatMap(c => c.skills)].map(
              (skill, i) => (
                <span
                  key={i}
                  className="font-display uppercase text-sm text-white/10 tracking-widest"
                >
                  {skill} &nbsp;·
                </span>
              )
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

export default SkillsSection;
