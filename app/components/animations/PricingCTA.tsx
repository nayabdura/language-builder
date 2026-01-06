"use client";
import { motion } from "framer-motion";

export default function PricingCTA() {
  return (
    <section className="py-24 px-6">
      <motion.div 
        whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
        className="max-w-6xl mx-auto rounded-[60px] bg-gradient-to-r from-[#b14bf4] to-[#6d91fe] p-12 md:p-24 text-center text-white relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6">Unleash Your Potential</h2>
          <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto font-medium">
            Join over 10,000+ creators and students building the future of design and language.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-white text-[#b14bf4] rounded-full font-black text-xl shadow-2xl"
          >
            Start Your Free Trial
          </motion.button>
        </div>
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
      </motion.div>
    </section>
  );
}