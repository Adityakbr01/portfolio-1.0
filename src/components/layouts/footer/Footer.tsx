import Link from "next/link";

const links = [
  { text: "Home", href: "#Home" },
  { text: "Projects", href: "#Projects" },
  { text: "About", href: "#About" },
  { text: "Skills", href: "#Skills" },
  { text: "Contact", href: "#Contact" },
];

export function Footer() {
  return (
    <footer className="relative w-full bg-[#171717] border-t border-white/8 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center gap-7 sm:gap-8">
        {/* Logo */}
        <Link href="#Home" className="font-display font-bold uppercase text-xl sm:text-2xl text-white">
          Aditya<span className="text-amber-200">.dev</span>
        </Link>

        {/* Nav */}
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-8">
          {links.map(l => (
            <Link
              key={l.text}
              href={l.href}
              className="font-body text-sm text-white/30 hover:text-amber-200 transition-colors uppercase tracking-widest"
            >
              {l.text}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />

        {/* Bottom */}
        <p className="font-body text-xs text-white/20 text-center">
          © {new Date().getFullYear()} Aditya Kumar. Designed & built with Next.js & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
