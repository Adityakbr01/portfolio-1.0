"use client";

import dynamic from "next/dynamic";
import { Footer } from "./layouts/footer/Footer";

const HeroSection = dynamic(() => import("@/src/sections/HeroSection"), {
  ssr: false,
});
const ProjectsSection = dynamic(
  () => import("@/src/sections/ProjectsSection"),
  {
    ssr: false,
  },
);
const FeatureProjects = dynamic(
  () => import("@/src/sections/FeatureProjects"),
  {
    ssr: false,
  },
);
const AboutSection = dynamic(() => import("@/src/sections/AboutSection"), {
  ssr: false,
});
const SkillsSection = dynamic(() => import("@/src/sections/SkillsSection"), {
  ssr: false,
});
// const Testimonial = dynamic(() => import("@/src/sections/Testimonial"), {
//   ssr: false,
// });
const ContactSection = dynamic(() => import("@/src/sections/ContactSection"), {
  ssr: false,
});

export default function HomeSectionsClient() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <FeatureProjects />
      <AboutSection />
      <SkillsSection />
      {/* <Testimonial /> */}
      <ContactSection />
      <Footer />
    </>
  );
}
