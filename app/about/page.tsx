import AboutIntroOverlay from "../components/animations/AboutIntroOverlay";
import { 
  AboutHero, 
  MissionVision, 
  TeachersSection, 
  WhyUs, 
  AboutCTA 
} from "./Sections";

export const metadata = {
  title: "About Us | Language Builders",
  description: "Meet the educators behind Language Builders.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Animation Overlays */}
      <AboutIntroOverlay />
      
      {/* Page Sections */}
      <AboutHero />
      <MissionVision />
      <TeachersSection />
      <WhyUs />
      <AboutCTA />
    </main>
  );
}