"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Quote, PlayCircle } from "lucide-react";

// --- Asset Imports ---
// Ensure these paths match your project structure
import ayaanCert from "../../assets/ayaanCert.jpeg";
import zaraCert from '../../assets/zaraCert.jpeg';
import mariumCert from '../../assets/mariumCert.jpeg';
import naqiCert from '../../assets/naqiCert.jpeg';
import fatimaCert from '../../assets/fatimaCert.jpeg';
import hoorainCert from '../../assets/hoorainCert.jpeg';

// --- Types ---
interface Review {
  id: number;
  name: string;
  child: string;
  img: any; // Using 'any' for StaticImageData to prevent TS errors if types aren't perfect
  quote: string;
}

const reviews: Review[] = [
  { id: 1, name: "Ayaan Khalid.", child: "O Levels", img: ayaanCert, quote: "Ayaan asks to do his lessons every morning. It's changed our routine!" },
  { id: 2, name: "Zara Nadeem.", child: "Reader Reward", img: zaraCert, quote: "The mentors are incredible. Maya's confidence has soared." },
  { id: 3, name: "Naqi Noor Ali.", child: "Reading Certificate", img: naqiCert, quote: "Finally, a program that understands how children actually learn." },
  { id: 4, name: "Hoorain Hussain.", child: "English Club", img: hoorainCert, quote: "She's making progress without feeling pressured. We love it." },
  { id: 5, name: "Marium Tosif.", child: "English Club", img: mariumCert, quote: "The best investment we've made in his education so far." },
  { id: 6, name: "Umm e Fatima.", child: "English Club", img: fatimaCert, quote: "Joyful, engaging, and effective. Highly recommend!" },
];

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      type: "spring",
      stiffness: 100 
    } 
  },
};

export default function ParentsReviewsGrid() {
  // Video ID from your link
  const videoId = "PUtCXvSsw2w";

  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">What Parents Say</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Read the success stories and feedback from our community.
          </p>
        </div>

        {/* --- REVIEWS GRID --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={itemVariants}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              {/* 1. IMAGE SECTION 
                  Using aspect-[1.4] (landscape ratio) and object-contain
                  so the WHOLE certificate is visible.
              */}
              <div className="relative w-full aspect-[1.4] bg-slate-100 border-b border-slate-100">
                <Image
                  src={review.img}
                  alt={`Certificate for ${review.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-2" // Added padding so edges aren't cut
                />
              </div>
              
              {/* 2. TEXT CONTENT SECTION 
                  Moved below image so it is readable 
              */}
              <div className="p-8 flex flex-col flex-grow bg-white relative">
                <Quote className="text-purple-500 mb-4 opacity-30 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                
                <p className="text-slate-600 italic leading-relaxed mb-6 flex-grow">
                  &ldquo;{review.quote}&rdquo;
                </p>
                
                <div className="mt-auto border-t border-slate-100 pt-4">
                  <h3 className="font-bold text-slate-900 text-lg">{review.name}</h3>
                  <p className="text-purple-600 text-sm font-medium">Student of {review.child}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- VIDEO PLAYER SECTION --- */}
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-5xl mx-auto"
        >
            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                <PlayCircle className="text-red-600" size={32} />
                <h3 className="text-2xl font-bold text-slate-800">
                    See Us In Action
                </h3>
            </div>

            {/* Responsive Video Container (16:9 Aspect Ratio) */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-black">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                    title="Student Success Highlights"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            </div>
             <p className="text-center text-slate-400 text-sm mt-6">
                Watch the highlights of our recent events and student achievements.
            </p>
        </motion.div>

      </div>
    </section>
  );
}