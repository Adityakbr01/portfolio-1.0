import { ArrowRight } from "lucide-react";
import Link from "next/link";

const NavItems = [
  { id: 1, text: "Home", link: "#Home" },
  { id: 2, text: "Projects", link: "#Projects" },
  { id: 3, text: "About", link: "#About" },
  { id: 4, text: "Skills", link: "#Skills" },
];

export const Nav = () => {
  return (
    <div className="fixed top-0  left-0 w-full h-24 backdrop-blur-md z-50 font-display">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-8">
        {/* Logo */}
        <div className="text-2xl font-bold uppercase">
          Aditya<span className="text-accent-soft">.dev</span>
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-10">
          {NavItems.map((item) => (
            <Link key={item.id} href={item.link}>
              <div className="relative overflow-hidden cursor-pointer group h-6">
                {/* Default Text */}
                <div className="transition-transform uppercase duration-300 ease-out group-hover:-translate-y-full">
                  {item.text}
                </div>

                {/* Hover Text */}
                <div className="absolute uppercase inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 text-accent-soft">
                  {item.text}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Contact Button */}

     <Link
  href="#Contact"
  className="
    group relative inline-flex items-center justify-center
    px-6 py-2 rounded-full 
    text-accent-light font-medium tracking-wide
    antialiased
    transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
    backdrop-blur-xl
    bg-linear-to-b from-accent-soft/30 to-accent-soft/10
    apple-border-shine
    hover:from-accent-soft/40 hover:to-accent-soft/20
    hover:border-accent-soft/40
    active:scale-95 active:translate-y-0 
    active:shadow-[0_5px_10px_-5px_rgba(0,0,0,0.3)]
  "
>
  Let&apos;s Talk
  <ArrowRight
    className="
      w-4 h-4 ml-2
      transition-all duration-300
      group-hover:-rotate-45
    "
  />
</Link>
      </div>
    </div>
  );
};
