import PricingHero from "../components/animations/PricingHero";
import PricingCards from "../components/animations/PricingCards";
import FeatureComparison from "../components/animations/FeatureComparison";
import FAQAccordion from "../components/animations/FAQAccordion";
import PricingCTA from "../components/animations/PricingCTA";

export const metadata = {
  title: "Pricing | Language Builders",
  description: "Simple, transparent pricing for creators and students.",
};

export default function PricingPage() {
  return (
    <main className="bg-white min-h-screen">
      <PricingHero />
      <PricingCards />
      <FeatureComparison />
      <FAQAccordion />
      <PricingCTA />
    </main>
  );
}