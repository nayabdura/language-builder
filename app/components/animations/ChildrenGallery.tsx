"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, Sparkles } from "lucide-react";

// --- Imports ---

import studentAimen from '../../assets/studentAimen.jpeg';
import studentHoorain from '../../assets/studentHoorain.jpeg';
import studentAliya from '../../assets/studentAliya.jpeg';
import studentSoofia from '../../assets/studentSoofia.jpeg';
import happy from '../../assets/happy.jpeg';
import review from '../../assets/review.jpeg';

// --- Data Configuration ---
const galleryImages = [
  { src: studentAimen, alt: "Focused learning session" }, 
  { src: studentHoorain, alt: "Joyful discovery" }, 
  { src: studentAliya, alt: "Group collaboration" }, 
  { src: studentSoofia, alt: "Creative writing time" }, 
  { src: happy, alt: "Digital literacy skills" }, 
  { src: review, alt: "Teacher mentorship" }, 
];

export default function ChildrenGallery() {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-purple-600 font-bold mb-4 bg-purple-50 px-4 py-1.5 rounded-full"
          >
            <Camera size={18} />
            <span className="uppercase tracking-widest text-xs">Student Hall of Fame</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
            Capturing Moments of <br/> <span className="text-purple-600">Growth & Joy</span>
          </h2>
          <p className="text-slate-500 text-lg">
             Peek inside our virtual classrooms where engagement meets excellence. Every smile and certificate tells a story of success.
          </p>
        </div>

        {/* Masonry Layout (CSS Columns) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50"
            >
              {/* Image Wrapper */}
              <div className="relative w-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600} 
                  height={600} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              {/* Minimal Overlay (Icon Only - No Text) */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white scale-0 group-hover:scale-100 transition-transform duration-300 border border-white/30">
                    <Sparkles size={24} className="text-yellow-300 fill-yellow-300 drop-shadow-md"/>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}