"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ReviewsHero() {
  // Animation variants for floating blobs
  const blobVariant = {
    animate: {
      y: [0, -20, 0],
      x: [0, 15, 0],
      rotate: [0, 10, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  //   variants={blobVariant}
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Floating Shapes */}
      <motion.div
       // variants={blobVariant}
        animate="animate"
        className="absolute top-20 left-[-10%] w-64 h-64 bg-purple-100/60 rounded-full blur-3xl -z-10"
      />
      <motion.div
      
        animate="animate"
        transition={{ delay: 1 }} // Offset animation
        className="absolute bottom-10 right-[-5%] w-80 h-80 bg-blue-100/50 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-black text-[#1a1f2d] mb-8 leading-tight">
            Loved by Children.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b14bf4] to-[#6d91fe] relative">
              Trusted by Parents.
              {/* Soft underline accent */}
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-purple-200/70" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 10, 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-[#5e626f] text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
            Real stories from families building confidence and joy through learning.
          </p>
        </motion.div>
      </div>
    </section>
  );
}