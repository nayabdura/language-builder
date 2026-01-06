"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000); // Simulate API call
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-2xl shadow-slate-200/50 relative overflow-hidden"
    >
      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900 ml-1">Full Name</label>
            <input 
              required
              placeholder="John Doe"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#b14bf4] focus:bg-white outline-none transition-all font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900 ml-1">Email Address</label>
            <input 
              required
              type="email"
              placeholder="john@example.com"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#b14bf4] focus:bg-white outline-none transition-all font-medium"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-900 ml-1">Subject</label>
          <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#b14bf4] focus:bg-white outline-none transition-all font-medium">
            <option>General Inquiry</option>
            <option>Course Support</option>
            <option>Enterprise Projects</option>
            <option>Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-900 ml-1">Your Message</label>
          <textarea 
            required
            rows={5}
            placeholder="Tell us about your project..."
            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#b14bf4] focus:bg-white outline-none transition-all font-medium resize-none"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
          className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-[#b14bf4] to-[#6d91fe] text-white rounded-full font-black text-lg shadow-xl shadow-purple-200 flex items-center justify-center gap-3 disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
          <Send size={20} />
        </motion.button>
      </form>

      {/* Decorative Blob */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-100/50 rounded-full blur-3xl -z-0" />
    </motion.div>
  );
}