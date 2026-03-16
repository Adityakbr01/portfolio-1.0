"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARD_Y_OFFSET = 5;
const CARD_SCALE_STEP = 0.075;
const MOBILE_TAG_LIMIT = 7;

export const PROJECTS = [
  {
    id: "card-1",
    tag: "AI SaaS Platform",
    title: "AI Social Media Post Handler",
    description:
      "A platform that allows users to create and publish posts across multiple social media platforms with one click.",
    tech: ["TypeScript", "Next.js", "Bun", "PostgreSQL", "Docker", "AWS", "OpenAI API", "Redis", "Nginx"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=600&fit=crop",
    color: "#3d2fa9",
    zIndex: 5,
  },
  {
    id: "card-2",
    tag: "React Native App",
    title: "Student Micro Task Earning App",
    description:
      "A mobile app where students can earn money by completing simple tasks like watching videos, filling forms, and referrals.",
    tech: ["React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS", "Nginx"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=600&fit=crop",
    color: "#ff7722",
    zIndex: 4,
  },
  {
    id: "card-3",
    tag: "AI Knowledge Platform",
    title: "Perplexity / ChatGPT Style AI App",
    description:
      "An AI-powered app that answers questions with intelligent sources using RAG and vector search.",
    tech: ["Next.js", "React Native", "TypeScript", "pgVector", "LangChain", "OpenAI", "Docker", "AWS", "Nginx"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=600&fit=crop",
    color: "#ff3d33",
    zIndex: 3,
  },
  {
    id: "card-4",
    tag: "Full Stack Platform",
    title: "Scalable E-Commerce Platform",
    description:
      "A scalable e-commerce platform with authentication, product management, order tracking, and payment integration.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Docker", "AWS", "Redis", "Nginx"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&h=600&fit=crop",
    color: "#785f47",
    zIndex: 2,
  },
] as const;

export default function FeatureProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardRefs.current;
    const totalCards = cards.length;

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

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * (totalCards - 1)}px`,
      pin: true,
      pinSpacing: true,
      // anticipatePin: 1 pre-calculates the pin position one frame early,
      // eliminating the 1-frame position jump when pinning activates.
      anticipatePin: 1,
      // invalidateOnRefresh recalculates start/end when ScrollTrigger.refresh()
      // fires (e.g. on resize or after Lenis init). Without this, the section
      // may pin at the wrong scroll position if the page height shifts.
      invalidateOnRefresh: true,
      scrub: true,
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
                yPercent: gsap.utils.interpolate(-50, -200, segProgress),
                rotationX: gsap.utils.interpolate(0, 35, segProgress),
                scale: 1,
              });
            }
          } else {
            const effectiveBehind = (index - activeIndex) - segProgress;
            gsap.set(card, {
              yPercent: -50 + effectiveBehind * CARD_Y_OFFSET,
              rotationX: 0,
              scale: 1 - effectiveBehind * CARD_SCALE_STEP,
            });
          }
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      id="FeatureProjects"
      ref={sectionRef}
      className="relative w-full h-svh overflow-hidden"
      style={{ perspective: "850px", transformStyle: "preserve-3d" }}
    >
      <p className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 text-[10px] md:text-3xl sm:text-sm tracking-[0.25em] text-white/50 uppercase z-30 whitespace-nowrap pointer-events-none select-none">
        Featured Work
      </p>

      {PROJECTS.map((project, index) => {
        const mobileTags = project.tech.slice(0, MOBILE_TAG_LIMIT);
        const mobileExtra = project.tech.length - MOBILE_TAG_LIMIT;

        return (
          <div
            key={project.id}
            id={project.id}
            ref={(el) => { if (el) cardRefs.current[index] = el; }}
            style={{
              backgroundColor: project.color,
              zIndex: project.zIndex,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              willChange: "transform",
            }}
            className="
              absolute top-1/2 left-1/2 origin-bottom overflow-hidden rounded-2xl text-white
              w-[80%] h-[65%]
              max-[1000px]:w-[calc(100%-1.5rem)]
              sm:max-[1000px]:w-[calc(100%-2.5rem)]
              max-[1000px]:h-[84%]
            "
          >
            {/* ── MOBILE layout (<1000px) ─── */}
            <div className="min-[1000px]:hidden flex flex-col h-full">
              <div className="relative w-full shrink-0" style={{ height: "50%" }}>
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-14 pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, ${project.color} 10%, transparent 100%)`,
                  }}
                />
              </div>

              <div className="flex flex-col flex-1 min-h-0 px-4 pt-2 pb-4 sm:px-5 sm:pb-5">
                <p className="shrink-0 text-[9px] sm:text-[10px] tracking-[0.22em] uppercase opacity-50 mb-1">
                  {project.tag}
                </p>
                <h2
                  className="shrink-0 font-display font-bold uppercase leading-[1.1] mb-2"
                  style={{
                    fontSize: "clamp(1.05rem, 5.2vw, 1.55rem)",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {project.title}
                </h2>
                <p
                  className="shrink-0 text-[10px] sm:text-[11px] text-white/70 leading-relaxed mb-3"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {project.description}
                </p>
                <div className="mt-auto shrink-0 flex flex-wrap gap-1.5">
                  {mobileTags.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.75 text-[8.5px] sm:text-[9px] tracking-wide uppercase rounded-full bg-white/10 border border-white/20 whitespace-nowrap"
                    >
                      {item}
                    </span>
                  ))}
                  {mobileExtra > 0 && (
                    <span className="px-2 py-0.75 text-[8.5px] sm:text-[9px] tracking-wide uppercase rounded-full bg-white/20 border border-white/30 whitespace-nowrap">
                      +{mobileExtra}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ── DESKTOP layout (≥1000px) ─── */}
            <div className="hidden min-[1000px]:flex h-full items-center gap-4 p-10">
              <div className="flex-1 h-full flex flex-col p-2">
                <p className="text-xs tracking-[0.2em] uppercase opacity-60">{project.tag}</p>
                <h1 className="mt-4 font-display text-3xl md:text-5xl leading-none uppercase">{project.title}</h1>
                <p className="mt-4 text-sm md:text-base text-white/85 leading-relaxed max-w-2xl">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span key={item} className="px-3 py-1 text-xs tracking-wide uppercase rounded-full bg-white/10 border border-white/20">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative flex-1 h-full rounded-xl overflow-hidden">
                <Image src={project.image} alt={`${project.title} preview`} fill className="object-cover" sizes="50vw" />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}