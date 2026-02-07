"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Award, PlayCircle } from "lucide-react"; // Added PlayCircle icon

// --- Imports ---
import fabihaCert from "../../assets/fabihaCert.jpeg";
import naqiCert from "../../assets/naqiCert.jpeg";
import mariumCert from "../../assets/mariumCert.jpeg";


import type { StaticImageData } from "next/image";

// --- Types ---
interface Certificate {
  id: number;
  studentName: string;
  achievement: string;
  image: string | StaticImageData;
}

const certificates: Certificate[] = [
  {
    id: 1,
    studentName: "Fabiha Azeem",
    achievement: "English 1123 'O' Level Workshop",
    image: fabihaCert,
  },
  {
    id: 2,
    studentName: "Marium Tosif",
    achievement: "English Excellence Award",
    image: mariumCert,
  },
  {
    id: 3,
    studentName: "Naqi Noor Ali",
    achievement: "Reading Goals Achievement",
    image: naqiCert,
  },
];

// --- Sub-Component: Certificate Card ---
const CertificateCard = ({ cert, index }: { cert: Certificate; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    const img = imageRef.current;

    if (!card || !img) return;

    const hoverAnimation = gsap.to(card, {
      y: -8,
      boxShadow: "0px 25px 50px rgba(0,0,0,0.1)",
      duration: 0.4,
      paused: true,
      ease: "power2.out",
    });

    const imgScale = gsap.to(img, {
      scale: 1.02,
      duration: 0.5,
      paused: true,
      ease: "power2.out",
    });

    card.addEventListener("mouseenter", () => {
      hoverAnimation.play();
      imgScale.play();
    });
    card.addEventListener("mouseleave", () => {
      hoverAnimation.reverse();
      imgScale.reverse();
    });
  }, { scope: cardRef });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group flex flex-col bg-white rounded-2xl p-3 shadow-sm border border-slate-100"
    >
      <div className="relative w-full aspect-[1.4] rounded-xl overflow-hidden bg-slate-50 mb-5 border border-slate-100">
        <div ref={imageRef} className="relative w-full h-full">
          <Image
            src={cert.image}
            alt={`${cert.studentName} Certificate`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <div className="px-2 pb-2 text-center">
        <h3 className="text-lg font-bold text-slate-800 leading-tight mb-1">
          {cert.achievement}
        </h3>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
          {cert.studentName}
        </p>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
export default function StudentCertificates() {
  // Extract video ID from: https://youtu.be/7pw_WV1aD2I
  const videoId = "7pw_WV1aD2I"; 

  return (
    <section className="bg-white mx-auto px-6 py-20 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="text-center mb-16 space-y-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 mb-2"
            >
                <Award size={24} />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Hall of Fame
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                Celebrating the outstanding achievements and certified success of our brilliant students.
            </p>
        </div>

        {/* --- Certificate Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {certificates.map((cert, index) => (
            <CertificateCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>

        {/* --- Video Section --- */}
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-5xl mx-auto"
        >
            <div className="flex items-center gap-3 mb-6">
                <PlayCircle className="text-red-500" size={28} />
                <h3 className="text-2xl font-bold text-slate-800">
                    Event Highlights
                </h3>
            </div>

            {/* Video Container with Aspect Ratio */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-slate-900">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                    title="Student Success Highlights"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            </div>
             <p className="text-center text-slate-400 text-sm mt-4">
                Watch the highlights of our recent workshop and student success stories.
            </p>
        </motion.div>

      </div>
    </section>
  );
}