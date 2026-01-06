"use client";
import { motion } from "framer-motion";

export default function ContactCTA() {
  return (
    <section className="py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-slate-900 mb-6">Prefer a direct approach?</h2>
        <p className="text-xl text-slate-500 mb-10">
          You can also reach us directly at <span className="text-[#b14bf4] font-bold">support@langbuilders.com</span>
        </p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-6 py-2 bg-purple-50 rounded-full text-[#b14bf4] font-bold text-sm"
        >
          <span className="w-2 h-2 bg-[#b14bf4] rounded-full animate-pulse" />
          Currently accepting new projects
        </motion.div>
      </div>
    </section>
  );
}