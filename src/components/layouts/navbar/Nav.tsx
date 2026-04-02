"use client";

import {
  CONTACT_EMAIL,
  SOCIAL_LINKS_PUBLIC,
} from "@/src/constants/socialLinks";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

type MenuLink = {
  name: string;
  url: string;
  newTab?: boolean;
};

const ITEM_COLORS = [
  "#F2A900",
  "#38BDF8",
  "#34D399",
  "#A78BFA",
  "#F472B6",
  "#FB923C",
];

const MENU_LINKS: MenuLink[] = [
  { name: "Home", url: "#Home" },
  { name: "Projects", url: "#Projects" },
  { name: "Feature Work", url: "#FeatureProjects" },
  { name: "About", url: "#About" },
  { name: "Skills", url: "#Skills" },
  { name: "Contact", url: "#Contact" },
  { name: "Resume", url: "/Aditya_FullStack.pdf", newTab: true },
];

const DESKTOP_NAV_ITEMS = [
  { id: 1, text: "Home", link: "#Home" },
  { id: 2, text: "Projects", link: "#Projects" },
  { id: 3, text: "About", link: "#About" },
  { id: 4, text: "Skills", link: "#Skills" },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  // ── Get lenis instance so we can call scrollTo directly ──────────────────
  // This is the fix: instead of router.push("#id") which Next.js handles as
  // a route change (not a scroll), we call lenis.scrollTo(element) directly
  // so Lenis easing and ScrollTrigger stay fully in sync.
  const lenis = useLenis();

  // ── Smooth scroll helper ──────────────────────────────────────────────────
  const scrollTo = (hash: string) => {
    if (!hash.startsWith("#")) return;
    const target = document.querySelector(hash);
    if (!target) return;
    lenis?.scrollTo(target as HTMLElement, {
      offset: 0,
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  useEffect(() => {
    if (isMenuOpen) {
      // Stop Lenis so it doesn't intercept touch events behind the menu.
      // DO NOT set body overflow:hidden — that blocks the menu panel's own
      // overflow-y-auto scroll on iOS Safari.
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => {
      lenis?.start(); // always re-enable on unmount
    };
  }, [isMenuOpen, lenis]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["Home", "Projects", "About", "Skills"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const close = () => setIsMenuOpen(false);

  // ── Unified nav click handler for mobile menu items ───────────────────────
  const handleNavClick = (url: string) => {
    close();
    // Small delay so the menu close animation doesn't fight the scroll
    requestAnimationFrame(() => scrollTo(url));
  };

  return (
    <>
      {/* ── Top Navbar ── */}
      <div
        className={cn(
          "fixed top-0 left-0 w-full h-16 sm:h-20 z-[100] transition-all duration-300",
          isScrolled
            ? "backdrop-blur-md bg-[#171717]/60 border-b border-white/5"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          {/* ── Desktop ── */}
          <div className="hidden lg:flex w-full items-center justify-between font-display">
            {/* Logo — uses <a> so LenisProvider interceptor handles it */}
            <a
              href="#Home"
              className="text-2xl font-bold uppercase"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#Home");
              }}
            >
              Aditya<span className="text-accent-soft">.dev</span>
            </a>

            <div className="flex items-center gap-10">
              {DESKTOP_NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.text;
                return (
                  <a
                    key={item.id}
                    href={item.link}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.link);
                    }}
                  >
                    <div className="relative overflow-hidden cursor-pointer group h-6">
                      <div
                        className={cn(
                          "transition-transform uppercase duration-300 ease-out group-hover:-translate-y-full",
                          isActive ? "text-accent-soft" : "",
                        )}
                      >
                        {item.text}
                      </div>
                      <div className="absolute uppercase inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 text-accent-soft">
                        {item.text}
                      </div>
                      {isActive && (
                        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-soft" />
                      )}
                    </div>
                  </a>
                );
              })}
            </div>

            {/* CTA */}
            <a
              href="#Contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#Contact");
              }}
              className="
                group relative inline-flex items-center justify-center
                px-6 py-2 rounded-full font-medium tracking-wide
                antialiased overflow-hidden cursor-pointer
                border border-accent-soft/30
                bg-accent-soft/10 text-accent-light
                transition-colors duration-700
                hover:border-accent-soft/50
                hover:shadow-[0_0_20px_rgba(242,169,0,0.15)]
                active:scale-95
              "
            >
              <span className="absolute right-[1.4rem] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-accent-soft scale-0 transition-transform duration-500 ease-out origin-center group-hover:scale-[12] -z-0" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-[#171717] mr-2">
                Let&apos;s Talk
              </span>
              <span className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-white/10 text-accent-light transition-all duration-300 group-hover:bg-[#171717] group-hover:text-accent-soft group-hover:rotate-[-45deg]">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>

          {/* ── Mobile top bar ── */}
          <div className="lg:hidden w-full flex items-center justify-between">
            <a
              href="#Home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#Home");
                close();
              }}
              className="font-display text-xl font-bold uppercase"
            >
              Aditya<span className="text-accent-soft">.dev</span>
            </a>

            <button
              className="relative z-[200] w-10 h-10 rounded-full flex flex-col items-center justify-center gap-[5px] transition-all duration-200 hover:bg-white/10 active:scale-95"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <span
                className={cn(
                  "block w-4 h-[1.5px] bg-white rounded-full origin-center transition-all duration-300",
                  isMenuOpen ? "rotate-45 translate-y-[3.25px]" : "",
                )}
              />
              <span
                className={cn(
                  "block w-4 h-[1.5px] bg-white rounded-full origin-center transition-all duration-300",
                  isMenuOpen ? "-rotate-45 -translate-y-[3.25px]" : "",
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── Dark backdrop ── */}
      <div
        className={cn(
          "fixed inset-0 z-[110] lg:hidden transition-all duration-300 bg-black/75",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={close}
      />

      {/* ── Floating card panel ── */}
      <div
        className={cn(
          "fixed z-[120] lg:hidden",
          "top-[72px] sm:top-[88px] left-3 right-3",
          "rounded-2xl overflow-hidden",
          "bg-[#1a1a1a] border border-white/10",
          "shadow-[0_24px_80px_rgba(0,0,0,0.6)]",
          "transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] origin-top",
          isMenuOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none",
        )}
      >
        <div className="max-h-[calc(100dvh-100px)] overflow-y-auto flex flex-col px-5 sm:px-6 pt-6 pb-5 gap-6">
          {/* MENU section */}
          <div>
            <p className="text-white/30 text-[10px] tracking-[0.22em] uppercase font-mono mb-4">
              Menu
            </p>
            <ul className="flex flex-col gap-0">
              {MENU_LINKS.map((link, idx) => (
                <li key={link.name}>
                  {link.newTab ? (
                    // External links (Resume) — open in new tab as normal
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                      className="group w-full py-0.5 flex items-center gap-4 border-b border-white/6 last:border-b-0 transition-all duration-150 active:pl-1"
                      style={{
                        transitionDelay: isMenuOpen
                          ? `${idx * 40 + 60}ms`
                          : "0ms",
                        opacity: isMenuOpen ? 1 : 0,
                        transform: isMenuOpen
                          ? "translateX(0)"
                          : "translateX(12px)",
                        transition:
                          "opacity 0.3s, transform 0.3s, padding 0.15s",
                      }}
                    >
                      <span
                        className="w-[9px] h-[9px] rounded-full flex-shrink-0"
                        style={{
                          background: ITEM_COLORS[idx % ITEM_COLORS.length],
                        }}
                      />
                      <span className="flex-1 text-left text-lg font-medium text-white/85 group-hover:text-white transition-colors duration-150">
                        {link.name}
                      </span>
                      <span className="text-white/25 text-base leading-none transition-all duration-150 group-hover:text-white/60 group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </a>
                  ) : (
                    // Internal hash links — use scrollTo via Lenis, NOT router.push
                    <button
                      onClick={() => handleNavClick(link.url)}
                      className="group w-full flex items-center py-0.5 gap-4 border-b border-white/6 last:border-b-0 transition-all duration-150 active:pl-1"
                      style={{
                        transitionDelay: isMenuOpen
                          ? `${idx * 40 + 60}ms`
                          : "0ms",
                        opacity: isMenuOpen ? 1 : 0,
                        transform: isMenuOpen
                          ? "translateX(0)"
                          : "translateX(12px)",
                        transition:
                          "opacity 0.3s, transform 0.3s, padding 0.15s",
                      }}
                    >
                      <span
                        className="w-[9px] h-[9px] rounded-full flex-shrink-0"
                        style={{
                          background: ITEM_COLORS[idx % ITEM_COLORS.length],
                        }}
                      />
                      <span className="flex-1 text-left text-lg font-medium text-white/85 group-hover:text-white transition-colors duration-150">
                        {link.name}
                      </span>
                      <span className="text-white/25 text-base leading-none transition-all duration-150 group-hover:text-white/60 group-hover:translate-x-0.5">
                        →
                      </span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/7" />

          {/* SOCIAL section */}
          <div>
            <p className="text-white/30 text-[10px] tracking-[0.22em] uppercase font-mono mb-4">
              Social
            </p>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS_PUBLIC.map((link, idx) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full border border-white/15 text-sm text-white/75 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-150 active:scale-95"
                  style={{
                    transitionDelay: isMenuOpen ? `${idx * 40 + 320}ms` : "0ms",
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? "translateY(0)" : "translateY(6px)",
                    transition:
                      "opacity 0.25s, transform 0.25s, color 0.15s, background 0.15s",
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Let's Talk CTA */}
          <div
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? "translateY(0)" : "translateY(6px)",
              transitionDelay: isMenuOpen ? "380ms" : "0ms",
              transition: "opacity 0.25s, transform 0.25s",
            }}
          >
            <button
              onClick={() => handleNavClick("#Contact")}
              className="group w-full flex items-center gap-2 px-5 py-3 rounded-full border border-[#F2A900]/30 bg-[#F2A900]/10 text-[#F2A900] text-sm font-medium hover:bg-[#F2A900]/18 hover:border-[#F2A900]/50 transition-all duration-200 active:scale-[0.98]"
            >
              Let&apos;s Talk
              <ArrowUpRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ml-0.5"
              />
            </button>
          </div>

          {/* GET IN TOUCH footer */}
          <div
            className="border-t border-white/7 pt-4"
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? "translateY(0)" : "translateY(4px)",
              transitionDelay: isMenuOpen ? "420ms" : "0ms",
              transition: "opacity 0.25s, transform 0.25s",
            }}
          >
            <p className="text-white/30 text-[10px] tracking-[0.22em] uppercase font-mono mb-1.5">
              Get In Touch
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-[#F2A900]/80 hover:text-[#F2A900] transition-colors duration-150 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
