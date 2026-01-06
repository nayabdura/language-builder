"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const infoItems = [
  { icon: Mail, title: "Email Us", detail: "hello@langbuilders.com", color: "bg-purple-50 text-[#b14bf4]" },
  { icon: Phone, title: "Call Us", detail: "+1 (555) 000-0000", color: "bg-blue-50 text-[#6d91fe]" },
  { icon: MapPin, title: "Visit Us", detail: "123 Design St, San Francisco", color: "bg-slate-50 text-slate-600" },
];

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      {infoItems.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all flex items-start gap-6"
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.color}`}>
            <item.icon size={28} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
            <p className="text-slate-500 font-medium">{item.detail}</p>
          </div>
        </motion.div>
      ))}
      <div className="pt-6 p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] text-white">
        <p className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-2">Response Time</p>
        <p className="text-lg font-medium">We typically respond within 24 business hours.</p>
      </div>
    </div>
  );
}