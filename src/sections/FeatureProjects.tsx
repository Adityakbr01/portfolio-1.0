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

const PROJECTS = [
  {
    id: "card-1",
    tag: "Full-Stack Web App",
    title: "Project One",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=600&fit=crop",
    color: "#3d2fa9",
    zIndex: 5,
  },
  {
    id: "card-2",
    tag: "Mobile Application",
    title: "Project Two",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=600&fit=crop",
    color: "#ff7722",
    zIndex: 4,
  },
  {
    id: "card-3",
    tag: "Design System",
    title: "Project Three",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=600&fit=crop",
    color: "#ff3d33",
    zIndex: 3,
  },
  {
    id: "card-4",
    tag: "Open Source Tool",
    title: "Project Four",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&h=600&fit=crop",
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
      ref={sectionRef}
      className="relative w-full h-svh overflow-hidden perspective-[850px]"
    >
      {/* Section label */}
      <p className="absolute top-8 left-1/2 -translate-x-1/2 md:text-3xl text-sm tracking-[0.25em] text-white uppercase">
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
            max-[1000px]:w-[calc(100%-4rem)] max-[1000px]:h-[75%] max-[1000px]:flex-col
          "
        >
          {/* Text column */}
          <div className="flex-1 h-full flex flex-col justify-between p-2">
            <p className="text-xs tracking-[0.2em] uppercase opacity-60">
              {project.tag}
            </p>
            <h1 className="font-display text-5xl leading-none uppercase">
              {project.title}
            </h1>
          </div>

          {/* Image column */}
          <div className="relative flex-1 h-full rounded-xl overflow-hidden">
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