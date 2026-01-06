import AboutClient from "./AboutClient";
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
      <AboutClient>
        <AboutHero />
        <MissionVision />
        <TeachersSection />
        <WhyUs />
        <AboutCTA />
      </AboutClient>
    </main>
  );
}