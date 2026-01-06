"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function PricingHero() {
  return (
    <section className="pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-[#1a1f2d] mb-6"
        >
          Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b14bf4] to-[#6d91fe]">Level Up?</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#5e626f] text-xl max-w-2xl mx-auto mb-10"
        >
          Choose a plan that fits your ambition. Whether you're just starting or scaling to the stars, we've got you covered.
        </motion.p>
      </div>
    </section>
  );
}