"use client";

import gsap from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(InertiaPlugin);

function MotionCard() {
  const conatinerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = conatinerRef.current?.querySelectorAll(".card");

      cards?.forEach((card, index) => {
        let lastX = 0;
        let lastY = 0;
        let speedX = 0;
        let speedY = 0;

        const startRotation = gsap.getProperty(card, "rotation");

        const startX = gsap.getProperty(card, "x");
        const startY = gsap.getProperty(card, "y");

        const onMove = (e: MouseEvent) => {
          speedX = e.clientX - lastX;
          speedY = e.clientY - lastY;

          lastX = e.clientX;
          lastY = e.clientY;
        };

        const onEnter = (e: MouseEvent) => {
          speedX = 0;
          speedY = 0;
          lastX = e.clientX;
          lastY = e.clientY;
        };

        const onLeave = (e: MouseEvent) => {
          gsap.to(card, {
            inertia: {
              x: { velocity: speedX * 30, end: startX },
              y: { velocity: speedY * 30, end: startY },
              rotation: { velocity: speedX * 2, end: startRotation },
            },
          });
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
      });
    }, conatinerRef);
    return () => ctx.revert();
  });

  return (
    <section
      ref={conatinerRef}
      className="w-full h-full flex items-center justify-center bg-amber-50"
    >
      <div className="absolute size-[35vw] top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2">
        {/* svg */}
      </div>

      <div className="card h-[22vw] w-[17vw] relative overflow-clip rounded-md -rotate-6 -mr-[2vw]">
        <Image
          src="https://images.unsplash.com/photo-1518770660439-4636190af475"
          alt="Project 1"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="card h-[22vw] w-[17vw] relative overflow-clip rounded-md rotate-6 -mr-[2vw]">
        <Image
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
          alt="Project 2"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="card h-[22vw] w-[17vw] relative overflow-clip rounded-md -rotate-6 -mr-[2vw]">
        <Image
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          alt="Project 3"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="card h-[22vw] w-[17vw] relative overflow-clip rounded-md -rotate-6">
        <Image
          src="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d"
          alt="Project 4"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="card py-[0.5vw] px-[1vw] capitalize rounded-full rounded-bl-none bg-pink-300 absolute top-[30%] left-[30%] -translate-x-1/2 -translate-y-1/2">
        <p className="pointer-events-none">This card look really nice</p>
      </div>

      <div className="card py-[0.5vw] px-[1vw] capitalize rounded-full rounded-bl-none bg-amber-300 absolute top-[30%] left-[60%] -translate-x-1/2 -translate-y-1/2">
        <p className="pointer-events-none">This card look really nice</p>
      </div>

      <div className="card py-[0.5vw] px-[1vw] capitalize rounded-full rounded-bl-none bg-blue-300 absolute top-[30%] left-[40%] -translate-x-1/2 -translate-y-1/2">
        <p className="pointer-events-none">This card look really nice</p>
      </div>
    </section>
  );
}

export default MotionCard;
