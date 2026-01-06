"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import sakina from '../../assets/sakina.jpeg';

// Mock Data - joyful kids learning
const images = [
  { src: sakina , alt: "Kid smiling with tablet" },
  { src: sakina, alt: "Teacher and student laughing" },
  { src: sakina, alt: "Engaged student writing" },
  { src: sakina, alt: "Happy kid with headphones" },
];

export default function ChildrenGallery() {
  return (
    <section className="py-24 px-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#1a1f2d]">Moments of Pure Joy</h2>
          <p className="text-[#5e626f] mt-4 text-lg">Learning shouldn't be boring. See the difference engagement makes.</p>
        </div>

        {/* Masonry-ish Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px]">
            {images.map((img, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: "backOut" }}
                    viewport={{ once: true }}
                    // Create varied row spans for visual interest
                    className={`relative rounded-[32px] overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
                        idx === 1 || idx === 2 ? "lg:row-span-1" : "lg:row-span-2"
                    }`}
                >
                    <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}