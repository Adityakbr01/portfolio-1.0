// "use client";

// import gsap from "gsap";
// import { Draggable } from "gsap/Draggable";
// import { InertiaPlugin } from "gsap/InertiaPlugin";
// import { useEffect, useRef } from "react";

// gsap.registerPlugin(Draggable, InertiaPlugin);

// const testimonials = [
//   {
//     quote:
//       "Working with Aditya was an absolute game-changer. He delivered a product that far exceeded our expectations — the animations were silky smooth and the code was impeccably clean.",
//     author: "Sarah Chen",
//     role: "CTO, Novaflow Labs",
//     initials: "SC",
//     color: "#f59e0b",
//     rotation: -3,
//     top: "50%",
//     left: "32%",
//   },
//   {
//     quote:
//       "Rarely do you come across a developer who cares as deeply about design as well as performance. Aditya nailed it — shipped in record time with zero bugs.",
//     author: "Marcus Reid",
//     role: "Founder, Vertex Studio",
//     initials: "MR",
//     color: "#818cf8",
//     rotation: 6,
//     top: "38%",
//     left: "52%",
//   },
//   {
//     quote:
//       "Our dashboard went from clunky to world-class in 3 weeks. Aditya's attention to micro-interactions made the whole product feel premium. Clients noticed immediately.",
//     author: "Priya Sharma",
//     role: "Product Lead, Solaris HQ",
//     initials: "PS",
//     color: "#34d399",
//     rotation: -2,
//     top: "62%",
//     left: "68%",
//   },
//   {
//     quote:
//       "Exceptional TypeScript discipline, beautiful UI systems, and he communicates clearly throughout. Already working on our next project together.",
//     author: "Leon Müller",
//     role: "Engineering Manager, Arcline",
//     initials: "LM",
//     color: "#fb7185",
//     rotation: 3,
//     top: "28%",
//     left: "77%",
//   },

//   // NEW

//   {
//     quote:
//       "Aditya combines strong engineering fundamentals with an incredible eye for UI detail. Every component felt intentional and highly polished.",
//     author: "Daniel Park",
//     role: "Head of Product, Lumina AI",
//     initials: "DP",
//     color: "#22d3ee",
//     rotation: -5,
//     top: "70%",
//     left: "22%",
//   },
//   {
//     quote:
//       "One of the fastest developers we've collaborated with. Clean architecture, excellent documentation, and the final result looked stunning.",
//     author: "Olivia Carter",
//     role: "Design Director, Prism Labs",
//     initials: "OC",
//     color: "#a78bfa",
//     rotation: 4,
//     top: "22%",
//     left: "40%",
//   },
//   {
//     quote:
//       "Aditya transformed our prototype into a production-grade platform. Performance improvements alone increased our user retention by 35%.",
//     author: "Ravi Mehta",
//     role: "CEO, CloudForge",
//     initials: "RM",
//     color: "#f97316",
//     rotation: -4,
//     top: "75%",
//     left: "55%",
//   },
//   {
//     quote:
//       "From concept to deployment, Aditya was thoughtful, precise, and incredibly efficient. Easily one of the best developers we've worked with.",
//     author: "Emily Dawson",
//     role: "Operations Lead, Brightscale",
//     initials: "ED",
//     color: "#4ade80",
//     rotation: 5,
//     top: "45%",
//     left: "85%",
//   },
// ];

// const EDGE_PADDING = 20;

// // How many ms of no pointer movement counts as "not moving" on leave
// const SPEED_RESET_MS = 80;

// function Testimonial() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const cards =
//         containerRef.current?.querySelectorAll<HTMLElement>(".t-card");

//       cards?.forEach((card) => {
//         /* ── Per-card state ──────────────────────────────────────── */
//         let lastX = 0;
//         let lastY = 0;
//         let speedX = 0;
//         let speedY = 0;
//         let isDragging = false;
//         let entranceDone = false;
//         let lastMoveTime = 0;

//         const startRotation = Number(card.dataset.rotation ?? 0);
//         const idx = Number(card.dataset.idx ?? 0);
//         const entranceDuration = 0.9;
//         const entranceDelay = 0.12 * idx;

//         /* ── Staggered entrance ──────────────────────────────────── */
//         // Set initial state first so card is invisible before tween starts
//         gsap.set(card, {
//           opacity: 0,
//           y: 50,
//           scale: 0.88,
//           rotation: startRotation - 6,
//         });

//         gsap.to(card, {
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           rotation: startRotation,
//           duration: entranceDuration,
//           delay: entranceDelay,
//           ease: "back.out(1.5)",
//           onComplete: () => {
//             entranceDone = true;
//             // Now that the card is in its final visual position,
//             // initialise Draggable so getBounds() reads correct coords.
//             initDraggable();
//           },
//         });

//         /* ── Draggable (created AFTER entrance so bounds are correct) */
//         let draggable: Draggable | null = null;

//         const getBounds = () => {
//           const cw = card.offsetWidth;
//           const ch = card.offsetHeight;
//           const wW = window.innerWidth;
//           const wH = window.innerHeight;

//           // getBoundingClientRect() already reflects GSAP's current transform,
//           // so the rect IS the card's live screen position.
//           const rect = card.getBoundingClientRect();

//           // How much can we move from the current GSAP x/y?
//           const gx = gsap.getProperty(card, "x") as number;
//           const gy = gsap.getProperty(card, "y") as number;

//           // Left edge of card in screen space (no gsap offset)
//           const baseLeft = rect.left - gx;
//           const baseTop = rect.top - gy;

//           return {
//             minX: -(baseLeft - EDGE_PADDING),
//             maxX: wW - (baseLeft + cw) - EDGE_PADDING,
//             minY: -(baseTop - EDGE_PADDING),
//             maxY: wH - (baseTop + ch) - EDGE_PADDING,
//           };
//         };

//         const initDraggable = () => {
//           const [d] = Draggable.create(card, {
//             type: "x,y",
//             inertia: true,
//             edgeResistance: 0.85,
//             // Do NOT pass bounds here — set after first drag start so the
//             // entrance animation has fully settled layout.
//             cursor: "grab",
//             activeCursor: "grabbing",
//             // zIndexBoost disabled: it sets z-index via inline style which
//             // can conflict with our z-10 and cause the card to vanish behind
//             // other elements after the drag ends on some browsers.
//             zIndexBoost: false,

//             snap: {
//               x: (v: number) => {
//                 const b = getBounds();
//                 return gsap.utils.clamp(b.minX, b.maxX, v);
//               },
//               y: (v: number) => {
//                 const b = getBounds();
//                 return gsap.utils.clamp(b.minY, b.maxY, v);
//               },
//             },

//             onDragStart() {
//               isDragging = true;
//               // Apply fresh bounds on every drag start
//               this.applyBounds(getBounds());

//               // Kill only scale/shadow tweens, NOT opacity (avoid disappear bug)
//               gsap.killTweensOf(card, "scale,boxShadow");

//               gsap.to(card, {
//                 scale: 1.07,
//                 duration: 0.22,
//                 ease: "power2.out",
//                 overwrite: "auto",
//               });
//             },

//             onDrag() {
//               const vx = this.getVelocity("x");
//               const tilt = gsap.utils.clamp(-22, 22, vx * 0.022);
//               gsap.to(card, {
//                 rotation: startRotation + tilt,
//                 duration: 0.1,
//                 ease: "none",
//                 overwrite: "auto",
//               });
//             },

//             onDragEnd() {
//               isDragging = false;

//               gsap.to(card, {
//                 scale: 1,
//                 duration: 0.5,
//                 ease: "power3.out",
//                 overwrite: "auto",
//               });

//               gsap.to(card, {
//                 rotation: startRotation,
//                 delay: 0.28,
//                 duration: 0.8,
//                 ease: "elastic.out(1, 0.5)",
//               });
//             },

//             onThrowComplete() {
//               // Safety clamp after inertia — use gsap.getProperty, not draggable.x/y
//               const b = getBounds();
//               const liveX = gsap.getProperty(card, "x") as number;
//               const liveY = gsap.getProperty(card, "y") as number;
//               const cx = gsap.utils.clamp(b.minX, b.maxX, liveX);
//               const cy = gsap.utils.clamp(b.minY, b.maxY, liveY);

//               if (Math.abs(cx - liveX) > 1 || Math.abs(cy - liveY) > 1) {
//                 gsap.to(card, {
//                   x: cx,
//                   y: cy,
//                   duration: 0.35,
//                   ease: "power2.out",
//                   onComplete: () => {
//                     d.update();
//                   },
//                 });
//               }
//             },
//           });

//           draggable = d;
//         };

//         /* ── Hover (mouse-only, blocked on touch + during entrance) ─ */
//         const isTouchDevice = () =>
//           window.matchMedia("(hover: none) and (pointer: coarse)").matches;

//         const onMove = (e: MouseEvent) => {
//           speedX = e.clientX - lastX;
//           speedY = e.clientY - lastY;
//           lastX = e.clientX;
//           lastY = e.clientY;
//           lastMoveTime = Date.now();
//         };

//         const onEnter = (e: MouseEvent) => {
//           // Skip on touch devices (tap fires mouseenter/leave instantly)
//           if (isTouchDevice()) return;
//           if (isDragging || !entranceDone) return;

//           speedX = 0;
//           speedY = 0;
//           lastX = e.clientX;
//           lastY = e.clientY;
//           lastMoveTime = Date.now();

//           gsap.to(card, {
//             scale: 1.04,
//             duration: 0.3,
//             ease: "power2.out",
//             overwrite: "auto",
//           });
//         };

//         const onLeave = () => {
//           if (isTouchDevice()) return;
//           if (isDragging || !entranceDone) return;

//           // If mouse hasn't moved recently, treat as stationary leave — no throw
//           const timeSinceMove = Date.now() - lastMoveTime;
//           if (timeSinceMove > SPEED_RESET_MS) {
//             speedX = 0;
//             speedY = 0;
//           }

//           // Always land at the card's current live position
//           const currentX = gsap.getProperty(card, "x") as number;
//           const currentY = gsap.getProperty(card, "y") as number;

//           gsap.to(card, {
//             inertia: {
//               x: { velocity: speedX * 20, end: currentX },
//               y: { velocity: speedY * 20, end: currentY },
//               rotation: { velocity: speedX * 1.5, end: startRotation },
//             },
//           });
//           gsap.to(card, { scale: 1, duration: 0.5, ease: "power2.out" });
//         };

//         card.addEventListener("mousemove", onMove);
//         card.addEventListener("mouseenter", onEnter);
//         card.addEventListener("mouseleave", onLeave);

//         /* ── Resize: re-clamp cards inside new viewport ──────────── */
//         const onResize = () => {
//           if (!draggable) return;
//           draggable.applyBounds(getBounds());

//           const b = getBounds();
//           const liveX = gsap.getProperty(card, "x") as number;
//           const liveY = gsap.getProperty(card, "y") as number;
//           const cx = gsap.utils.clamp(b.minX, b.maxX, liveX);
//           const cy = gsap.utils.clamp(b.minY, b.maxY, liveY);

//           if (Math.abs(cx - liveX) > 1 || Math.abs(cy - liveY) > 1) {
//             gsap.to(card, {
//               x: cx,
//               y: cy,
//               duration: 0.4,
//               ease: "power2.out",
//               onComplete: () => {
//                 draggable?.update();
//               },
//             });
//           }
//         };

//         window.addEventListener("resize", onResize);

//         (card as HTMLElement & { _cleanup?: () => void })._cleanup = () => {
//           card.removeEventListener("mousemove", onMove);
//           card.removeEventListener("mouseenter", onEnter);
//           card.removeEventListener("mouseleave", onLeave);
//           window.removeEventListener("resize", onResize);
//           draggable?.kill();
//         };
//       });
//     }, containerRef);

//     const container = containerRef.current;
//     return () => {
//       container
//         ?.querySelectorAll<HTMLElement & { _cleanup?: () => void }>(".t-card")
//         .forEach((c) => c._cleanup?.());
//       ctx.revert();
//     };
//   }, []);

//   return (
//     <section
//       id="Testimonials"
//       ref={containerRef}
//       className="relative w-full h-screen flex items-center justify-center bg-[#0e0e0e] overflow-hidden px-3 sm:px-0"
//     >
//       {/* Noise texture */}
//       <div
//         className="pointer-events-none absolute inset-0 opacity-[0.025]"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
//           backgroundSize: "200px",
//         }}
//       />

//       {/* Header */}
//       <div className="absolute top-12 sm:top-16 left-4 sm:left-8 md:left-20 z-10 pointer-events-none select-none">
//         <p className="font-display uppercase text-accent/50 tracking-[0.25em] sm:tracking-[0.3em] text-[10px] sm:text-xs mb-2 sm:mb-3">
//           Kind Words
//         </p>
//         <h2 className="font-display font-bold uppercase text-3xl sm:text-5xl md:text-7xl text-white leading-[0.9]">
//           Testimonials
//         </h2>
//         <div className="mt-4 h-px w-16 bg-accent/40" />
//       </div>

//       {/* Drag hint */}
//       <p className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase pointer-events-none select-none font-body animate-pulse">
//         ↔ drag the cards
//       </p>

//       {/* Subtle grid */}
//       <div
//         className="pointer-events-none absolute inset-0 opacity-[0.03]"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
//           backgroundSize: "80px 80px",
//         }}
//       />

//       {/* Cards */}
//       {testimonials.map((t, i) => (
//         <div
//           key={i}
//           data-idx={i}
//           data-rotation={t.rotation}
//           className="t-card absolute w-68 sm:w-80 md:w-90 z-10 select-none"
//           style={{
//             top: t.top,
//             left: t.left,
//             // CSS centers the card on its position point.
//             // GSAP will animate on top of this via transform matrix.
//             transform: "translate(-50%, -50%)",
//             willChange: "transform",
//             // Start invisible — GSAP gsap.set() will also set opacity:0
//             // but this prevents a flash before useEffect runs.
//             opacity: 0,
//           }}
//         >
//           {/* Glow ring */}
//           <div
//             className="absolute -inset-px rounded-2xl opacity-20 blur-sm pointer-events-none"
//             style={{ background: t.color }}
//           />

//           {/* Card body */}
//           <div
//             className="relative apple-border-shine rounded-2xl border border-white/8 overflow-hidden"
//             style={{
//               background:
//                 "linear-gradient(135deg,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.02) 100%)",
//               backdropFilter: "blur(18px)",
//             }}
//           >
//             {/* Top accent bar */}
//             <div
//               className="h-px w-full"
//               style={{
//                 background: `linear-gradient(90deg, transparent, ${t.color}80, transparent)`,
//               }}
//             />

//             <div className="p-5 sm:p-7 flex flex-col gap-4 sm:gap-5">
//               {/* Quote mark */}
//               <svg
//                 width="32"
//                 height="24"
//                 viewBox="0 0 32 24"
//                 fill="none"
//                 className="opacity-60"
//               >
//                 <path
//                   d="M0 24V14.4C0 10.4 1.06667 7.06667 3.2 4.4C5.33333 1.73333 8.26667 0.266667 12 0L13.6 2.4C11.2 2.93333 9.33333 4.06667 8 5.8C6.66667 7.4 6 9.2 6 11.2H12V24H0ZM19.2 24V14.4C19.2 10.4 20.2667 7.06667 22.4 4.4C24.5333 1.73333 27.4667 0.266667 31.2 0L32 2.4C29.6 2.93333 27.7333 4.06667 26.4 5.8C25.0667 7.4 24.4 9.2 24.4 11.2H30.4V24H19.2Z"
//                   fill={t.color}
//                 />
//               </svg>

//               {/* Quote text */}
//               <p className="font-body text-white/70 text-xs sm:text-sm leading-relaxed">
//                 {t.quote}
//               </p>

//               {/* Divider */}
//               <div className="h-px w-full bg-white/8" />

//               {/* Author row */}
//               <div className="flex items-center gap-3.5">
//                 <div
//                   className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-display font-bold shrink-0"
//                   style={{
//                     background: `${t.color}20`,
//                     border: `1px solid ${t.color}50`,
//                     color: t.color,
//                   }}
//                 >
//                   {t.initials}
//                 </div>

//                 <div className="flex flex-col">
//                   <span className="font-display text-white/90 text-sm font-bold tracking-wide">
//                     {t.author}
//                   </span>
//                   <span className="font-body text-white/35 text-xs tracking-wider uppercase">
//                     {t.role}
//                   </span>
//                 </div>

//                 {/* Star rating */}
//                 <div className="ml-auto flex gap-0.5">
//                   {[...Array(5)].map((_, s) => (
//                     <svg
//                       key={s}
//                       width="10"
//                       height="10"
//                       viewBox="0 0 10 10"
//                       fill={t.color}
//                       className="opacity-80"
//                     >
//                       <path d="M5 0L6.12 3.45H9.76L6.82 5.58L7.94 9.03L5 6.9L2.06 9.03L3.18 5.58L0.24 3.45H3.88L5 0Z" />
//                     </svg>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Bottom accent */}
//             <div
//               className="h-px w-full"
//               style={{
//                 background: `linear-gradient(90deg, transparent, ${t.color}30, transparent)`,
//               }}
//             />
//           </div>
//         </div>
//       ))}

//       {/* Decorative rings */}
//       <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full border border-white/3" />
//       <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-87.5 h-87.5 rounded-full border border-accent/4" />

//       {/* Bottom divider */}
//       <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
//     </section>
//   );
// }

// export default Testimonial;
