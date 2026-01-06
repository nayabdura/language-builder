"use client";

import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { Users, Star, Globe } from "lucide-react";

// Helper component for counting up animation
const Counter = ({ from, to }: { from: number; to: number }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, { duration: 2.5, ease: "easeOut" });
    return controls.stop;
  }, [count, to]);

  return <motion.span>{rounded}</motion.span>;
};

const stats = [
  { icon: Users, value: 1000, suffix: "+", label: "Happy Families" },
  { icon: Star, value: 4.9, suffix: "/5", label: "Average Rating", isDecimal: true },
  { icon: Globe, value: 25, suffix: "+", label: "Countries Reached" },
];

export default function ReviewsStats() {
  return (
    <section className="py-20 px-6 bg-white relative">
       {/* Subtle divider line */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
       
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-purple-50 text-[#b14bf4] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <stat.icon size={32} />
            </div>
            <h4 className="text-4xl md:text-5xl font-black text-[#1a1f2d] mb-2 flex items-center justify-center gap-1">
                {stat.isDecimal ? <span>{stat.value}</span> : <Counter from={0} to={stat.value} />}
                <span className="text-purple-500">{stat.suffix}</span>
            </h4>
            <p className="text-[#5e626f] font-medium text-lg">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}