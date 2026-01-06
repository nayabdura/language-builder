"use client";
import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-black text-[#1a1f2d] mb-6">
            Let’s Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b14bf4] to-[#6d91fe]">Conversation</span>
          </h1>
          <p className="text-[#5e626f] text-xl max-w-2xl mx-auto">
            Have a question or a project in mind? We’re here to help you bridge the gap between where you are and where you want to be.
          </p>
        </motion.div>
      </div>
    </section>
  );
}