import { Layout, Server, Database, Terminal } from "lucide-react";
import { motion, Variants } from "motion/react";

// Using widely available Devicon SVGs
const skillCategories = [
  {
    category: "Frontend",
    icon: Layout,
    skills: [
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      },
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      },
      {
        name: "Tailwind",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "Framer Motion",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg",
      },
      {
        name: "Redux",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg",
      },
      {
        name: "Zustand",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='13' r='9' fill='%23EF7D00'/%3E%3Ccircle cx='7' cy='6' r='3' fill='%23EF7D00'/%3E%3Ccircle cx='17' cy='6' r='3' fill='%23EF7D00'/%3E%3Ccircle cx='10' cy='12' r='1.3' fill='white'/%3E%3Ccircle cx='14' cy='12' r='1.3' fill='white'/%3E%3Cellipse cx='12' cy='15.5' rx='2.5' ry='1.8' fill='%23C45E00'/%3E%3C/svg%3E",
      },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    skills: [
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Express.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
      },
      {
        name: "REST APIs",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      }, // generic JS for REST
      {
        name: "GraphQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
      },
      {
        name: "Prisma",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
      },
      {
        name: "Socket.io",
        icon: "https://cdn.simpleicons.org/socketdotio/white",
      },
      {
        name: "BullMQ",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='14' r='8' fill='%23E53E3E'/%3E%3Cpath d='M5 9 Q1 2 7 8' stroke='%23E53E3E' stroke-width='2.5' fill='none' stroke-linecap='round'/%3E%3Cpath d='M19 9 Q23 2 17 8' stroke='%23E53E3E' stroke-width='2.5' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='9.5' cy='13' r='1.4' fill='white'/%3E%3Ccircle cx='14.5' cy='13' r='1.4' fill='white'/%3E%3Cellipse cx='12' cy='16.5' rx='2.5' ry='1.7' fill='%23C53030'/%3E%3C/svg%3E",
      },
    ],
  },
  {
    category: "Database",
    icon: Database,
    skills: [
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
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
        name: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
      },
      {
        name: "Supabase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
      },
      {
        name: "Firebase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
      },
    ],
  },
  {
    category: "DevOps & Tools",
    icon: Terminal,
    skills: [
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
      },
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      },
      {
        name: "GitHub Actions",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
      },
      {
        name: "Vercel",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
      },
      {
        name: "Linux",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
      },
      {
        name: "Nginx",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg",
      },
      {
        name: "AWS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      },
      { name: "Postman", icon: "https://cdn.simpleicons.org/postman/white" },
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const categoryVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
    },
  },
};

const skillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function SkillsSection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      id="Skills"
      className="relative w-full bg-[#171717] py-20 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-amber-400/5 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div variants={categoryVariants} className="mb-12 sm:mb-16">
          <p className="font-display uppercase text-amber-200/60 tracking-[0.25em] md:tracking-[0.3em] text-xs sm:text-sm mb-3">
            What I Use
          </p>
          <h2 className="font-display font-bold uppercase text-4xl sm:text-5xl md:text-7xl text-white leading-[0.9]">
            Skills
          </h2>
          <div className="mt-4 h-px w-16 bg-amber-200/40" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.category}
                variants={categoryVariants}
                className="
                  relative flex flex-col gap-5 sm:gap-6 p-5 sm:p-8 rounded-3xl overflow-hidden
                  apple-border-shine bg-white/3
                  transition-all duration-300
                  hover:border-amber-200/20 hover:bg-white/5
                "
              >
                {/* Subtle corner glow */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-50 pointer-events-none"
                  style={{
                    background: `hsl(${45 + i * 15}, 90%, 60%, 0.15)`,
                  }}
                />

                <div className="flex items-center gap-4 relative">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-amber-200/80">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display uppercase text-xs sm:text-sm tracking-[0.2em] text-white">
                    {cat.category}
                  </h3>
                </div>

                <div className="relative flex flex-wrap gap-3 mt-2">
                  {cat.skills.map((skill) => (
                    <motion.span
                      key={skill.name}
                      variants={skillVariants}
                      className="
                        flex items-center gap-2
                        px-3 sm:px-4 py-2 rounded-full 
                        bg-white/5 apple-border-shine
                        font-body text-xs sm:text-sm text-white/80
                        transition-all duration-300
                        hover:bg-white/10 hover:text-white hover:border-white/20
                        hover:-translate-y-0.5
                        cursor-default
                      "
                    >
                      <img
                        src={skill.icon}
                        alt={`${skill.name} icon`}
                        className="w-4 h-4 object-contain opacity-90"
                        loading="lazy"
                      />
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </motion.div>
  );
}

export default SkillsSection;
