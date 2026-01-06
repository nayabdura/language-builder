"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ReviewsCTA() {
  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto rounded-[48px] bg-gradient-to-r from-[#b14bf4] to-[#6d91fe] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-purple-900/20"
      >
        {/* Background decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Join Hundreds of Happy Families
          </h2>
          <p className="text-white/90 text-xl mb-12 max-w-xl mx-auto font-medium leading-relaxed">
            Give your child the gift of confident learning. Start their journey today.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            // Gentle pulse animation to draw attention
            animate={{ boxShadow: ["0 0 0 0 rgba(255,255,255,0.4)", "0 0 0 12px rgba(255,255,255,0)"] }}
            transition={{
                boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }}
            className="px-12 py-5 bg-white text-[#b14bf4] rounded-full font-black text-lg shadow-xl flex items-center gap-3 mx-auto group"
          >
            Start Learning Today
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}