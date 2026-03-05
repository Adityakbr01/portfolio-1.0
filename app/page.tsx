import { Footer } from "@/src/components/layouts/footer/Footer";
import AboutSection from "@/src/sections/AboutSection";
import ContactSection from "@/src/sections/ContactSection";
import FeatureProjects from "@/src/sections/FeatureProjects";
import HeroSection from "@/src/sections/HeroSection";
import ProjectsSection from "@/src/sections/ProjectsSection";
import SkillsSection from "@/src/sections/SkillsSection";
import Testimonial from "@/src/sections/Testimonial";

function page() {
  return (
    <main className="h-full w-full bg-[#171717]">
      <HeroSection />
      <ProjectsSection />
      <FeatureProjects />
      <AboutSection />
      <SkillsSection />
      <Testimonial/>
      <ContactSection />
      <Footer />
    </main>
  );
}

export default page;
