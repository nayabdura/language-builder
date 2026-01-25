"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Minus, Info } from "lucide-react";

const features = [
  { 
    name: "Video Lessons", 
    basic: "8 Lessons", 
    creative: "8 Lessons", 
    Pro: "12 Lessons",
    category: "Learning" 
  },
  { 
    name: "Time & Days", 
    basic: "Mutually Decided", 
    creative: "Mutually Decided", 
    Pro: "Flexible",
    category: "Learning" 
  },
  { 
    name: "Student Group Size", 
    basic: "10 Students", 
    creative: "6 Students", 
    Pro: "One to One",
    category: "Support" 
  },
  { 
    name: "Resources Access", 
    basic: false, 
    creative: false, 
    Pro: true,
    category: "Social" 
  },
  { 
    name: "Certificate Provided", 
    basic: true, 
    creative: true, 
    Pro: true,
    category: "Learning" 
  },
  { 
    name: "Custom Learning Path", 
    basic: false, 
    creative: false, 
    Pro: true,
    category: "Learning" 
  },
  { 
    name: "Priority Support", 
    basic: false, 
    creative: true, 
    Pro: "24/7 Dedicated",
    category: "Support" 
  },
];

// Helper to render Check, Minus, or Text
const RenderValue = ({ value }: { value: string | boolean }) => {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="text-[#b14bf4] mx-auto" size={20} />
    ) : (
      <Minus className="text-slate-300 mx-auto" size={20} />
    );
  }
  return <span className="text-sm font-semibold text-slate-700">{value}</span>;
};

export default function FeatureComparison() {
  return (
    <section className="py-24 px-6 bg-[#FCF8F3]/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#1a1f2d] mb-4">Detailed Comparison</h2>
          <p className="text-slate-500 font-medium">Everything you need to know about our plans.</p>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-4 gap-4 px-8 py-6 bg-white rounded-t-[30px] border-x border-t border-slate-100 shadow-sm">
          <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Features</div>
          <div className="text-center text-sm font-bold text-slate-900">basic</div>
          <div className="text-center text-sm font-bold text-[#b14bf4]">Creative</div>
          <div className="text-center text-sm font-bold text-slate-900">Pro</div>
        </div>

        {/* Feature Rows */}
        <div className="space-y-2 md:space-y-0 bg-white md:border-x md:border-b border-slate-100 md:rounded-b-[30px] overflow-hidden shadow-sm">
          {features.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Desktop Row */}
              <div className="hidden md:grid grid-cols-4 gap-4 px-8 py-5 items-center hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700">{item.name}</span>
                  <Info size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-help" />
                </div>
                <div className="text-center"><RenderValue value={item.basic} /></div>
                <div className="text-center bg-purple-50/50 py-2 rounded-xl"><RenderValue value={item.creative} /></div>
                <div className="text-center"><RenderValue value={item.Pro} /></div>
              </div>

              {/* Mobile Card (Visible on mobile only) */}
              <div className="md:hidden p-6 bg-white rounded-3xl border border-slate-100 shadow-sm mb-4">
                <h4 className="font-bold text-slate-900 mb-4 text-lg border-b border-slate-100 pb-2">{item.name}</h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Basic</p>
                    <RenderValue value={item.basic} />
                  </div>
                  <div className="bg-purple-50 rounded-xl py-2">
                    <p className="text-[10px] font-bold text-[#b14bf4] uppercase mb-1">Creative</p>
                    <RenderValue value={item.creative} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Pro</p>
                    <RenderValue value={item.Pro} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
            <Info size={16} /> All plans include a 14-day money-back guarantee.
          </p>
        </div>
      </div>
    </section>
  );
}