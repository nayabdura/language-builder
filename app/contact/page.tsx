import ContactHero from "../components/animations/ContactHero";
import ContactInfo from "../components/animations/ContactInfo";
import ContactForm from "../components/animations/ContactForm";
import ContactFAQ from "../components/animations/ContactFAQ";
import ContactCTA from "../components/animations/ContactCTA";

export const metadata = {
  title: "Contact Us | Language Builders",
  description: "Get in touch with our team for inquiries, support, or custom projects.",
};

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen overflow-x-hidden">
      <ContactHero />
      <section className="relative pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-12">
            <ContactInfo />
          </div>
          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>
      <ContactFAQ />
      <ContactCTA />
    </main>
  );
}