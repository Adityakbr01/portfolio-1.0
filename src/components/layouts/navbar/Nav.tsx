"use client";

import { CONTACT_EMAIL, SOCIAL_LINKS_PUBLIC } from "@/src/constants/socialLinks";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type MenuLink   = { name: string; url: string };

const ITEM_COLORS = [
  "#F2A900",
  "#38BDF8",
  "#34D399",
  "#A78BFA",
  "#F472B6",
  "#FB923C",
];


const MENU_LINKS: MenuLink[] = [
  { name: "Home",         url: "#Home" },
  { name: "Projects",     url: "#Projects" },
  { name: "Feature Work", url: "#FeatureProjects" },
  { name: "About",        url: "#About" },
  { name: "Skills",       url: "#Skills" },
  { name: "Contact",      url: "#Contact" },
];

const DESKTOP_NAV_ITEMS = [
  { id: 1, text: "Home",     link: "#Home" },
  { id: 2, text: "Projects", link: "#Projects" },
  { id: 3, text: "About",    link: "#About" },
  { id: 4, text: "Skills",   link: "#Skills" },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const close = () => setIsMenuOpen(false);

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

          {/* Desktop */}
          <div className="hidden lg:flex w-full items-center justify-between font-display">
            <Link href="#Home" className="text-2xl font-bold uppercase">
              Aditya<span className="text-accent-soft">.dev</span>
            </Link>
            <div className="flex items-center gap-10">
              {DESKTOP_NAV_ITEMS.map((item) => (
                <Link key={item.id} href={item.link}>
                  <div className="relative overflow-hidden cursor-pointer group h-6">
                    <div className="transition-transform uppercase duration-300 ease-out group-hover:-translate-y-full">
                      {item.text}
                    </div>
                    <div className="absolute uppercase inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 text-accent-soft">
                      {item.text}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="#Contact"
              className="
                group relative inline-flex items-center justify-center
                px-6 py-2 rounded-full text-accent-light font-medium tracking-wide
                antialiased transition-all duration-300 backdrop-blur-xl
                bg-linear-to-b from-accent-soft/30 to-accent-soft/10
                apple-border-shine
                hover:from-accent-soft/40 hover:to-accent-soft/20
                hover:border-accent-soft/40 active:scale-95
              "
            >
              Let&apos;s Talk
              <ArrowRight className="w-4 h-4 ml-2 transition-all duration-300 group-hover:-rotate-45" />
            </Link>
          </div>

          {/* Mobile top bar */}
          <div className="lg:hidden w-full flex items-center justify-between">
            <button
              onClick={() => { router.push("#Home"); close(); }}
              className="font-display text-xl font-bold uppercase"
            >
              Aditya<span className="text-accent-soft">.dev</span>
            </button>

            {/* Hamburger */}
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

      {/* ── Dark backdrop ── z-[110] */}
      <div
        className={cn(
          "fixed inset-0 z-[110] lg:hidden transition-all duration-300",
          "bg-black/75",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={close}
      />

      {/* ── Floating card panel ── z-[120]
          Matches screenshot: rounded card, inset from screen edges,
          starts just below the navbar, does NOT fill full screen height.
      ── */}
      <div
        className={cn(
          "fixed z-[120] lg:hidden",
          // position: inset 12px from left/right, starts just below navbar
          "top-[72px] sm:top-[88px] left-3 right-3",
          // rounded card — exactly like the screenshot
          "rounded-2xl overflow-hidden",
          "bg-[#1a1a1a] border border-white/10",
          "shadow-[0_24px_80px_rgba(0,0,0,0.6)]",
          // animate: scale + fade from top
          "transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] origin-top",
          isMenuOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none",
        )}
      >
        {/* Scrollable inner */}
        <div className="max-h-[calc(100dvh-100px)] overflow-y-auto flex flex-col px-5 sm:px-6 pt-6 pb-5 gap-6">

          {/* MENU section */}
          <div>
            <p className="text-white/30 text-[10px] tracking-[0.22em] uppercase font-mono mb-4">
              Menu
            </p>
            <ul className="flex flex-col">
              {MENU_LINKS.map((link, idx) => (
                <li key={link.name}>
                  <button
                    onClick={() => { router.push(link.url); close(); }}
                    className="group w-full flex items-center gap-4 py-3.5 border-b border-white/6 last:border-b-0 transition-all duration-150 active:pl-1"
                    style={{
                      transitionDelay: isMenuOpen ? `${idx * 40 + 60}ms` : "0ms",
                      opacity:    isMenuOpen ? 1 : 0,
                      transform:  isMenuOpen ? "translateX(0)" : "translateX(12px)",
                      transition: "opacity 0.3s, transform 0.3s, padding 0.15s",
                    }}
                  >
                    {/* Colored dot — matches screenshot size */}
                    <span
                      className="w-[9px] h-[9px] rounded-full flex-shrink-0"
                      style={{ background: ITEM_COLORS[idx % ITEM_COLORS.length] }}
                    />
                    {/* Link text */}
                    <span className="flex-1 text-left text-lg font-medium text-white/85 group-hover:text-white transition-colors duration-150">
                      {link.name}
                    </span>
                    {/* Arrow — muted like screenshot */}
                    <span className="text-white/25 text-base leading-none transition-all duration-150 group-hover:text-white/60 group-hover:translate-x-0.5">
                      →
                    </span>
                  </button>
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
                    opacity:   isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? "translateY(0)" : "translateY(6px)",
                    transition: "opacity 0.25s, transform 0.25s, color 0.15s, background 0.15s",
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Let's Talk CTA — pill style matching screenshot */}
          <div
            style={{
              opacity:   isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? "translateY(0)" : "translateY(6px)",
              transitionDelay: isMenuOpen ? "380ms" : "0ms",
              transition: "opacity 0.25s, transform 0.25s",
            }}
          >
            <button
              onClick={() => { router.push("#Contact"); close(); }}
              className="group w-full flex items-center gap-2 px-5 py-3 rounded-full border border-[#F2A900]/30 bg-[#F2A900]/10 text-[#F2A900] text-sm font-medium hover:bg-[#F2A900]/18 hover:border-[#F2A900]/50 transition-all duration-200 active:scale-[0.98]"
            >
              Let&apos;s Talk
              <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ml-0.5" />
            </button>
          </div>

          {/* GET IN TOUCH footer — pinned at bottom of card */}
          <div
            className="border-t border-white/7 pt-4"
            style={{
              opacity:   isMenuOpen ? 1 : 0,
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