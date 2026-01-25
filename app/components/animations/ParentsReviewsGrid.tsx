"use client";

import React from "react";
import Image from "next/image";
// 1. Import Variants type
import { motion, Variants } from "framer-motion";
import { Quote } from "lucide-react";
import ayaanCert from "../../assets/ayaanCert.jpeg";
import fabihaCert from "../../assets/fabihaCert.jpeg";
import qasimCert from '../../assets/qasimCert.jpeg';
import hoorainCert from '../../assets/hoorainCert.jpeg';
import mariumCert from '../../assets/mariumCert.jpeg';
import soofiaCert from '../../assets/soofiaCert.jpeg';

const reviews = [
  { id: 1, name: "Ayaan Khalid.", child: "O Levels", img: ayaanCert, quote: "Ayaan asks to do his lessons every morning. It's changed our routine!" },
  { id: 2, name: "Fabiha Azeem.", child: "O Levels", img: fabihaCert, quote: "The mentors are incredible. Maya's confidence has soared." },
  { id: 3, name: "Qasim Noman.", child: "O Levels", img: qasimCert, quote: "Finally, a program that understands how children actually learn." },
  { id: 4, name: "Hoorain Hussain.", child: "English Club", img: hoorainCert, quote: "She's making progress without feeling pressured. We love it." },
  { id: 5, name: "Marium Tosif.", child: "English Club", img: mariumCert, quote: "The best investment we've made in his education so far." },
  { id: 6, name: "Soofia.", child: "English Club", img: soofiaCert, quote: "Joyful, engaging, and effective. Highly recommend!" },
];

// 2. Add the : Variants type here
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// 3. Add the : Variants type here
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      type: "spring", // TypeScript now validates this correctly
      stiffness: 100 
    } 
  },
};

export default function ParentsReviewsGrid() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={itemVariants}
              className="group relative h-[400px] rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={review.img}
                alt={`Parent ${review.name}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2d]/90 via-[#1a1f2d]/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <Quote className="text-purple-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-4 group-hover:translate-y-0" size={32} />
                <p className="text-lg font-medium leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div>
                  <h3 className="font-bold text-xl">{review.name}</h3>
                  <p className="text-purple-200 text-sm font-medium">Student of {review.child}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}