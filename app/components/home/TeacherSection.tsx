"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import imran from "../../assets/imran.jpeg"
import sakina from "../../assets/sakina.jpeg"
import type { StaticImageData } from "next/image";

// --- Types ---
interface Teacher {
  id: number;
  name: string;
  role: string;
  image: string | StaticImageData; // Allow both strings (URLs) and local imports
  bgColor: string; 
}

const teachers: Teacher[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "UI/UX Teacher",
    image: imran,
    bgColor: "bg-rose-50",
  },
  {
    id: 2,
    name: "Sarah Miller",
    role: "Web Development Teacher",
    image: sakina,
    bgColor: "bg-orange-50",
  },
];

// --- Sub-Component: Teacher Card ---
const TeacherCard = ({ teacher, index }: { teacher: Teacher; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // GSAP: Smooth Hover Interaction
  useGSAP(() => {
    const card = cardRef.current;
    const img = imageRef.current;

    if (!card || !img) return;

    const hoverAnimation = gsap.to(card, {
      y: -10,
      scale: 1.02,
      boxShadow: "0px 20px 40px rgba(0,0,0,0.08)",
      duration: 0.4,
      paused: true,
      ease: "power2.out",
    });

    const imgAnimation = gsap.to(img, {
      scale: 1.05,
      duration: 0.4,
      paused: true,
      ease: "power2.out",
    });

    card.addEventListener("mouseenter", () => {
      hoverAnimation.play();
      imgAnimation.play();
    });
    card.addEventListener("mouseleave", () => {
      hoverAnimation.reverse();
      imgAnimation.reverse();
    });
  }, { scope: cardRef });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      className="group relative flex flex-col items-center bg-white rounded-3xl p-4 cursor-pointer"
    >
      {/* Pastel Background & Image Container */}
      <div className={`relative w-full aspect-[4/5] rounded-2xl overflow-hidden ${teacher.bgColor} flex items-end justify-center`}>
        <div ref={imageRef} className="relative w-full h-full transition-transform">
          <Image
            src={teacher.image}
            alt={teacher.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Role Badge - Positioned to overlap image bottom */}
      <div className="absolute top-[75%] left-1/2 -translate-x-1/2 z-10">
        <span className="bg-white px-6 py-2 rounded-lg text-xs font-semibold text-slate-600 shadow-sm border border-slate-100 whitespace-nowrap">
          {teacher.role}
        </span>
      </div>

      {/* Teacher Name */}
      <div className="mt-10 mb-4">
        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
          {teacher.name}
        </h3>
      </div>
    </motion.div>
  );
};

// --- Main Component: Teachers Section ---
export default function TeachersSection() {
  return (
    <section className="max-w-7xl bg-white mx-auto px-6 py-20 font-sans">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Meet Our Teachers
        </h2>

        {/* Explore Button with Framer Motion Icon Animation */}
        <motion.button
          whileHover="hover"
          className="group flex items-center gap-2 px-6 py-3 border-2 border-purple-900 rounded-full text-purple-900 font-bold transition-colors hover:bg-purple-900 hover:text-white"
        >
          Explore our Teachers
          <motion.div
            variants={{
              hover: { x: 5 },
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ArrowRight size={20} />
          </motion.div>
        </motion.button>
      </div>

      {/* Responsive Grid: 1 col on mobile, 2 col on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {teachers.map((teacher, index) => (
          <TeacherCard key={teacher.id} teacher={teacher} index={index} />
        ))}
      </div>
    </section>
  );
}