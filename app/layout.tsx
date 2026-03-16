import CustomCursor from "@/src/components/CustomCursor";
import { Nav } from "@/src/components/layouts/navbar/Nav";
import LenisProvider from "@/src/components/providers/Lenisprovider";
import HapticsProvider from "@/src/components/providers/HapticsProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/*
          LenisProvider wraps ReactLenis AND adds the critical
          useLenis(ScrollTrigger.update) sync + gsap.ticker.lagSmoothing(0).
          No other config needed here.
        */}
        <LenisProvider>
          <HapticsProvider>
            <Nav />
            {children}
            <CustomCursor />
          </HapticsProvider>
        </LenisProvider>
      </body>
    </html>
  );
}