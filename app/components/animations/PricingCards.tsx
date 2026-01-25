"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "The Basic",
    monthlyPrice: 10,
    dollarprice: 30-35,
    yearlyPrice: 100,
    desc: "8 classes per month.",
    features: ["Learn the basics of creative writing & compreshensive skill", "Time & Days can be decided mutually", "Group of 10 Students", "Certicificate will be provided"],
    highlight: false,
  },
  {
    name: "The Creative",
    monthlyPrice: 15,
    yearlyPrice: 200,
    desc: "8 classes per month.",
    features: ["Enhance creative writing, Access the online resources & customized resource pack ", "Time & Days can be decided mutually", "Group of 6 Students", "Certicificate will be provided"],
    highlight: true,
  },
  {
    name: "The Pro",
    monthlyPrice: 18,
    yearlyPrice: 400,
    desc: "12 classes per month.",
    features: ["Get individual access to classes & resources", "Flexible days & timings", "Extra Support Provided", "One to One Attention", "Certficates will be provided"],
    highlight: false,
  },
];

export default function PricingCards() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="pb-24 px-6">
      {/* Toggle */}
      <div className="flex justify-center items-center gap-4 mb-16">
        <span className={`text-sm font-bold ${!isYearly ? "text-slate-900" : "text-slate-400"}`}>Monthly</span>
        <button 
          onClick={() => setIsYearly(!isYearly)}
          className="w-16 h-8 bg-slate-100 rounded-full p-1 relative flex items-center"
        >
          <motion.div 
            animate={{ x: isYearly ? 32 : 0 }}
            className="w-6 h-6 bg-gradient-to-r from-[#b14bf4] to-[#6d91fe] rounded-full shadow-md"
          />
        </button>
        <span className={`text-sm font-bold ${isYearly ? "text-slate-900" : "text-slate-400"}`}>
          Yearly <span className="ml-2 text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded-full">Save 20%</span>
        </span>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className={`relative p-8 rounded-[40px] border-2 flex flex-col ${
              plan.highlight 
              ? "border-[#b14bf4] bg-white shadow-2xl z-10" 
              : "border-slate-100 bg-slate-50/50"
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#b14bf4] to-[#6d91fe] text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1 shadow-lg">
                <Zap size={12} fill="white" /> MOST POPULAR
              </div>
            )}
            
            <h3 className="text-xl font-bold text-[#1a1f2d] mb-2">{plan.name}</h3>
            <p className="text-[#5e626f] text-sm mb-6">{plan.desc}</p>
            
            <div className="mb-8">
              <AnimatePresence mode="wait">
                <motion.span
                  key={isYearly ? "yearly" : "monthly"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-5xl font-black text-[#1a1f2d]"
                >
                  PKR {isYearly ? plan.yearlyPrice : plan.monthlyPrice}K
                </motion.span>
              </AnimatePresence>
              <span className="text-[#5e626f] font-medium"> / month</span>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-center gap-3 text-sm text-[#5e626f] font-medium">
                  <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-[#b14bf4]" strokeWidth={3} />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>

            <Link
  href="/contact"
  className={`w-full py-4 rounded-full font-bold transition-all block text-center ${
    plan.highlight
      ? "bg-gradient-to-r from-[#b14bf4] to-[#6d91fe] text-white shadow-lg shadow-purple-200 hover:opacity-90"
      : "bg-white border-2 border-slate-200 text-[#1a1f2d] hover:border-[#b14bf4]"
  }`}
>
  Get Started
</Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}