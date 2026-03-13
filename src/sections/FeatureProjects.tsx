"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Constants ───────────────────────────────────────────────────────────────

const CARD_Y_OFFSET = 5;
const CARD_SCALE_STEP = 0.075;

// ─── Data ────────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: "card-1",
    tag: "AI SaaS Platform",
    title: "AI Social Media Post Handler",
    description:
      "A platform that allows users to create and publish posts across multiple social media platforms with one click. AI automatically generates captions, hashtags, and post suggestions.",
    tech: [
      "TypeScript",
      "Next.js",
      "Bun",
      "PostgreSQL",
      "Docker",
      "AWS",
      "OpenAI API",
      "Redis",
      "Nginx",
    ],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=600&fit=crop",
    color: "#3d2fa9",
    zIndex: 5,
  },
  {
    id: "card-2",
    tag: "React Native App",
    title: "Student Micro Task Earning App",
    description:
      "A mobile app where students can earn money by completing simple tasks like watching videos, filling forms, and referrals.",
    tech: [
      "React Native",
      "Expo",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "AWS",
      "Nginx",
    ],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=600&fit=crop",
    color: "#ff7722",
    zIndex: 4,
  },
  {
    id: "card-3",
    tag: "AI Knowledge Platform",
    title: "Perplexity / ChatGPT Style AI App",
    description:
      "An AI-powered web and mobile application that allows users to ask questions and receive intelligent answers with sources using RAG and vector search.",
    tech: [
      "Next.js",
      "React Native",
      "TypeScript",
      "pgVector",
      "LangChain",
      "OpenAI",
      "Docker",
      "AWS",
      "Nginx",
    ],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=600&fit=crop",
    color: "#ff3d33",
    zIndex: 3,
  },
  {
    id: "card-4",
    tag: "Full Stack Platform",
    title: "Scalable E-Commerce Platform",
    description:
      "A scalable e-commerce platform with authentication, product management, order tracking, and payment integration.",
    tech: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "AWS",
      "Redis",
      "Nginx",
    ],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&h=600&fit=crop",
    color: "#785f47",
    zIndex: 2,
  },
] as const;

// ─── Component ───────────────────────────────────────────────────────────────

export default function FeatureProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardRefs.current;
    const totalCards = cards.length;

    // Set initial stacked positions
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
        
        // We use totalCards - 1 as the denominator for segProgress
        const segmentSizeFixed = 1 / (totalCards - 1);
        
        const activeIndex = Math.min(
          Math.floor(progress / segmentSizeFixed),
          totalCards - 1,
        );
        const segProgress =
          (progress - activeIndex * segmentSizeFixed) / segmentSizeFixed;

        cards.forEach((card, index) => {
          if (index < activeIndex) {
            // Card has already been scrolled past — fling it up
            gsap.set(card, { yPercent: -250, rotateX: 35, scale: 1 });
          } else if (index === activeIndex) {
            // If it IS the last card, stick it perfectly at yPercent: -50.
            if (index === totalCards - 1) {
              gsap.set(card, {
                yPercent: -50,
                rotationX: 0,
                scale: 1,
              });
            } else {
              // Active card — animate it flying away
              gsap.set(card, {
                yPercent: gsap.utils.interpolate(-50, -200, segProgress),
                rotationX: gsap.utils.interpolate(0, 35, segProgress),
                scale: 1,
              });
            }
          } else {
            // Cards still waiting behind — shift smoothly as active moves.
            const behindIndex = index - activeIndex;
            const effectiveBehind = behindIndex - segProgress;

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
      id="FeatureProjects"
      ref={sectionRef}
      className="relative w-full h-svh overflow-hidden perspective-[850px]"
    >
      {/* Section label */}
      <p className="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 md:text-3xl text-xs sm:text-sm tracking-[0.25em] text-white uppercase z-30">
        Featured Work
      </p>

      {PROJECTS.map((project, index) => (
        <div
          key={project.id}
          id={project.id}
          ref={(el) => {
            if (el) cardRefs.current[index] = el;
          }}
          style={{ backgroundColor: project.color, zIndex: project.zIndex }}
          className="
            absolute top-1/2 left-1/2
            w-[80%] h-[60%]
            flex items-center justify-center gap-4 p-10
            rounded-2xl text-white
            origin-bottom will-change-transform
            max-[1000px]:w-[calc(100%-1.5rem)] sm:max-[1000px]:w-[calc(100%-2.5rem)] max-[1000px]:h-[80%] max-[1000px]:flex-col max-[1000px]:p-5 max-[1000px]:gap-3
          "
        >
          {/* Text column */}
          <div className="flex-1 h-full min-h-0 flex flex-col p-2 overflow-y-auto">
            <p className="text-xs tracking-[0.2em] uppercase opacity-60">
              {project.tag}
            </p>

            <h1 className="mt-3 md:mt-4 font-display text-2xl sm:text-3xl md:text-5xl leading-none uppercase">
              {project.title}
            </h1>

            <p className="mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-white/85 leading-relaxed max-w-2xl">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="px-2.5 sm:px-3 py-1 text-[10px] md:text-xs tracking-wide uppercase rounded-full bg-white/10 border border-white/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Image column */}
          <div className="relative flex-1 h-full w-full max-[1000px]:h-[32%] rounded-xl overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className="object-cover"
              sizes="(max-width: 1000px) 100vw, 50vw"
            />
          </div>
        </div>
      ))}
    </section>
  );
}