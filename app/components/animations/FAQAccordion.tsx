"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Which plan is best for me?", a: "If you're a solo learner, the Starter plan is great. For career growth, the Professional plan is our most popular choice." },
  { q: "Can I upgrade or cancel anytime?", a: "Absolutely! You can upgrade your plan at any moment from your dashboard, or cancel with one click." },
  { q: "Do you offer custom pricing?", a: "Yes, for teams over 50 people, we offer custom enterprise packages. Contact our sales team." },
];

export default function FAQAccordion() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section className="py-24 max-w-3xl mx-auto px-6">
      <h2 className="text-4xl font-black text-center text-[#1a1f2d] mb-12">Common Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-slate-100 last:border-0 pb-4">
            <button 
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              className="w-full flex justify-between items-center py-4 text-left font-bold text-lg text-[#1a1f2d]"
            >
              {faq.q}
              {activeIdx === i ? <Minus size={20} /> : <Plus size={20} />}
            </button>
            <AnimatePresence>
              {activeIdx === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 text-[#5e626f] leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}