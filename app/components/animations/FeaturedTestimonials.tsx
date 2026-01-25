"use client";

import React from "react";
// import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import sakina from '../../assets/sakina.jpeg';

const featured = [
  {
    id: 1,
    parent: "Dr. Khalid Ahmed",
    child: "Hoorain, age 16",
    img: sakina, // Family photo
    title: "A complete transformation in 6 months.",
    quote: "Hoorain used to dread English classes and struggled with basic concepts. After enrolling in Language Builders, her enthusiasm for learning skyrocketed. The personalized approach and engaging methods made all the difference. Now, she's not only excelling academically but also enjoys creative writing and public speaking.",
  },
  {
    id: 2,
    parent: "Dr. Faiza Raza",
    child: "Zain, age 15",
    img: sakina, // Father son photo
    title: "From struggling to top of the class.",
    quote: "Zain was always anxious about English exams. After joining Language Builders, his grades skyrocketed, and he even secured an A+ in his IGCSE English exam. The creative writing workshops were a game-changer.",
  },
];

export default function FeaturedTestimonials() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {featured.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-sm border border-purple-100/50"
          >
            {/* Circular Image */}
            {/* <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Image src={item.img} alt={item.parent} fill className="object-cover" />
            </div> */}

            {/* Content */}
            <div className="text-center md:text-left">
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className="fill-[#b14bf4] text-[#b14bf4]" />
                    ))}
                </div>
              <h3 className="text-2xl font-bold text-[#1a1f2d] mb-4 leading-tight">{item.title}</h3>
              <blockquote className="text-[#5e626f] text-lg leading-relaxed mb-6"> &ldquo;{item.quote}&rdquo;</blockquote>
              <div>
                <p className="font-bold text-[#1a1f2d] text-lg">{item.parent}</p>
                <p className="text-purple-600 font-medium">{item.child}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}