import CustomCursor from "@/src/components/CustomCursor";
import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/src/components/layouts/navbar/Nav";

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
        <ReactLenis
          root
          options={{
            lerp: 0.1,
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.5,
            duration: 1.3,
            orientation: "vertical",
            gestureOrientation: "vertical",
            autoResize: true,
            overscroll: false,
            syncTouch: false,
          }}
        >
          <Nav />
          {children}
          <CustomCursor />
        </ReactLenis>
      </body>
    </html>
  );
}
