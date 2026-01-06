"use client"
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import gsap from "gsap";

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}

const AnimatedDropdown = ({ label, options, value, onChange, placeholder }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // GSAP Stagger Animation when menu opens
  useEffect(() => {
    if (isOpen && listRef.current) {
      gsap.fromTo(
        listRef.current.querySelectorAll(".menu-item"),
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, stagger: 0.05, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  return (
    <div className="text-left space-y-2 w-full relative">
      <label className="text-sm font-semibold text-slate-400 ml-1">{label}</label>
      
      {/* Trigger Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-between bg-slate-50 rounded-2xl px-6 py-4 text-slate-800 font-bold cursor-pointer transition-all border-2 ${
          isOpen ? "border-[#582066] bg-white ring-4 ring-purple-50" : "border-transparent hover:bg-slate-100"
        }`}
      >
        <span className={!value ? "text-slate-400" : "text-[#582066]"}>
          {value || placeholder}
        </span>
        <ChevronDown 
          size={20} 
          className={`text-slate-400 transition-transform duration-500 ${isOpen ? "rotate-180 text-[#582066]" : ""}`} 
        />

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white rounded-3xl shadow-[0_20px_50px_rgba(88,32,102,0.15)] border border-purple-50 p-3 z-[100] overflow-hidden"
            >
              <div ref={listRef} className="max-h-64 overflow-y-auto custom-scrollbar">
                {options.map((opt) => (
                  <div
                    key={opt}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(opt);
                      setIsOpen(false);
                    }}
                    className={`menu-item flex items-center justify-between px-4 py-3 mb-1 rounded-xl transition-all cursor-pointer group ${
                      value === opt 
                        ? "bg-purple-50 text-[#582066]" 
                        : "hover:bg-slate-50 text-slate-600 hover:text-[#582066]"
                    }`}
                  >
                    <span className="font-semibold">{opt}</span>
                    {value === opt && <Check size={16} className="text-[#582066]" />}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background overlay to close on outside click */}
      {isOpen && (
        <div className="fixed inset-0 z-[90]" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default AnimatedDropdown;