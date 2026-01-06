"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "How quickly do you respond?", a: "Our team typically responds within 24 hours on business days." },
  { q: "Do you offer free consultations?", a: "Yes! For enterprise and custom projects, we offer a 30-minute discovery call." },
  { q: "Can I contact you for custom work?", a: "Absolutely. Most of our enterprise solutions are custom-built for specific team needs." },
];

export default function ContactFAQ() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-24 bg-slate-50/50">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-black text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
              <button 
                onClick={() => setActive(active === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center font-bold text-slate-900"
              >
                {faq.q}
                {active === i ? <Minus size={20} className="text-[#b14bf4]" /> : <Plus size={20} />}
              </button>
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="p-6 pt-0 text-slate-500 leading-relaxed font-medium">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}