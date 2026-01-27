"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Star, Quote } from "lucide-react";
import gsap from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

// --- Data ---
const testimonials = [
  { id: 1, name: "Dr. Faiza Raza", role: "London", content: "Thanks to Language Builders, my child achieved an A+ in their IGCSE English exam. The learning experience has been exceptional." },
  { id: 2, name: "Asma Wakeel", role: "Parent", content: "Major improvement in my son's speaking skills within 2-3 months. The teacher is dedicated and broadens my child's worldview." },
  { id: 3, name: "Dr. Khalil", role: "Parent", content: "Exceptional learning support for my child at The Gems School Dubai. Interactive sessions led to significant improvement." },
  { id: 4, name: "Sarah Ahmed", role: "O Levels Parent", content: "The structured approach to O Level English was exactly what my daughter needed. The mock exams were a game changer." },
  { id: 5, name: "Mrs. Hameed", role: "Karachi", content: "I was worried about online classes, but the engagement level is higher than physical school! Breakout sessions are very well managed." },
  { id: 6, name: "Taimoor Khan", role: "IGCSE Student", content: "Science concepts were always hard, but the visual way Language Builders explains them made it click instantly." }
];

// Create infinite list: [Clone] [Original] [Clone]
const infiniteItems = [...testimonials, ...testimonials, ...testimonials];

const TestimonialCard = ({ data }: { data: typeof testimonials[0] }) => (
  <div className="card-item flex-shrink-0 w-[320px] md:w-[400px] bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 flex flex-col mx-4 select-none relative group transition-all hover:-translate-y-1 hover:shadow-md">
    <div className="absolute top-6 right-8 opacity-10 group-hover:scale-110 transition-transform">
      <Quote size={60} className="text-[#582066]" />
    </div>
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-orange-400 text-orange-400" />)}
    </div>
    <p className="text-slate-600 leading-relaxed text-[15px] mb-8 flex-grow">&quot;{data.content}&quot;</p>
    <div className="mt-auto border-t border-slate-100 pt-6">
      <h3 className="text-xl font-bold text-[#582066]">{data.name}</h3>
      <p className="text-xs font-bold text-slate-400 uppercase mt-1">{data.role}</p>
    </div>
  </div>
);

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const cards = gsap.utils.toArray(".card-item") as HTMLElement[];
    const cardWidth = cards[0].offsetWidth + 32; // Width + Margin (mx-4)
    const setWidth = cardWidth * testimonials.length; // Width of one full set

    // Start in the middle set
    gsap.set(slider, { x: -setWidth });

    // Define logic using arrow function (no 'this')
    const updateLogic = () => {
      // Safely get the instance without 'this'
      const instance = Draggable.get(slider);
      if (!instance) return;

      let x = instance.x;

      // Infinite Loop Logic: Teleport instantly when hitting edges
      if (x > 0) { x -= setWidth; } 
      else if (x < -setWidth * 2) { x += setWidth; }
      
      // Sync internal pointer and DOM if teleported
      if (x !== instance.x) {
        instance.x = x;
        gsap.set(slider, { x });
      }

      // Update Pagination Dots
      const rawIndex = Math.round(Math.abs((x + setWidth) / cardWidth));
      setActiveIndex(rawIndex % testimonials.length);
    };

    Draggable.create(slider, {
      type: "x",
      inertia: true,
      edgeResistance: 0.65,
      onDrag: updateLogic,
      onThrowUpdate: updateLogic,
      snap: (val) => Math.round(val / cardWidth) * cardWidth,
    });

  }, { scope: containerRef });

  return (
    <section className="bg-[#FCF8F3] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              What Our Happy <br /> <span className="text-[#582066]">Parents Say</span>
            </h2>
            <p className="text-slate-600 text-lg">Real feedback from families using our personalized learning.</p>
          </div>
          <Link href="/reviews" className="px-8 py-3 border-2 border-[#582066] rounded-full text-[#582066] font-bold hover:bg-[#582066] hover:text-white transition-all">
            Check More Reviews
          </Link>
        </div>

        {/* Slider Window */}
        <div ref={containerRef} className="relative rounded-[40px] border border-white/40 bg-white/20 backdrop-blur-sm p-4 md:p-10 overflow-hidden shadow-inner">
          <div ref={sliderRef} className="flex w-fit cursor-grab active:cursor-grabbing pl-4">
            {infiniteItems.map((item, i) => (
              <TestimonialCard key={`${item.id}-${i}`} data={item} />
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${activeIndex === i ? "w-8 bg-[#582066]" : "w-2 bg-slate-300"}`} />
          ))}
        </div>

      </div>
    </section>
  );
}