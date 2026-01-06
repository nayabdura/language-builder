"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

const testimonials = [
  {
    id: 1,
    name: "Andrew Williams",
    role: "UX/UI Designer",
    avatar: "",
    content: "I have been a Junior Graphic Designer for more than 10 years. Some things are problem that I had and teach how to solve them.",
  },
  {
    id: 2,
    name: "Sarah Miller",
    role: "Product Designer",
    avatar: "",
    content: "The depth of information provided here is unparalleled. I finally understand the 'why' behind design choices.",
  },
  {
    id: 3,
    name: "Cristian Doru Barin",
    role: "UX/UI Designer",
    avatar: "",
    content: "I have been a Junior Graphic Designer for more than 10 years. That's why this course is so great!",
  },
];

// Double the array to create the infinite loop base
const infiniteTestimonials = [...testimonials, ...testimonials];

const TestimonialCard = ({ testimonial }: { testimonial: (typeof testimonials)[0] }) => {
  return (
    <div className="flex-shrink-0 w-full md:w-[380px] bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 flex flex-col items-center text-center mx-4 select-none">
      <div className="relative mb-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-200">
          <Image src={testimonial.avatar} alt={testimonial.name} width={80} height={80} className="object-cover" />
        </div>
        <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5">
          <CheckCircle2 className="w-6 h-6 text-green-500 fill-green-500 stroke-white" />
        </div>
      </div>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{testimonial.role}</p>
      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">{testimonial.name}</h3>
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="fill-orange-300 text-orange-300" />
        ))}
      </div>
      <p className="text-slate-600 leading-relaxed text-[15px]">{testimonial.content}</p>
    </div>
  );
};

export default function TestimonialsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const cards = gsap.utils.toArray(".flex-shrink-0") as HTMLElement[];
    const cardWidth = cards[0].offsetWidth + 32; // Width + Margin
    const totalWidth = cardWidth * testimonials.length;

    // Set initial position to the middle to allow dragging both ways
    gsap.set(slider, { x: -totalWidth });

    Draggable.create(slider, {
      type: "x",
      inertia: true,
      onDrag: function() {
        // Infinite Wrap Logic
        if (this.x > 0) {
          gsap.set(this.target, { x: this.x - totalWidth });
          this.update();
        } else if (this.x < -totalWidth) {
          gsap.set(this.target, { x: this.x + totalWidth });
          this.update();
        }
        
        // Update pagination dots (modulo for looping)
        const rawIndex = Math.abs(Math.round(this.x / cardWidth));
        setActiveIndex(rawIndex % testimonials.length);
      },
      onThrowUpdate: function() {
        // Same logic for inertia throw
        if (this.x > 0) {
          gsap.set(this.target, { x: this.x - totalWidth });
          this.update();
        } else if (this.x < -totalWidth) {
          gsap.set(this.target, { x: this.x + totalWidth });
          this.update();
        }
        const rawIndex = Math.abs(Math.round(this.x / cardWidth));
        setActiveIndex(rawIndex % testimonials.length);
      },
      snap: (value) => Math.round(value / cardWidth) * cardWidth,
    });
  }, { scope: containerRef });

  return (
    <section className="bg-[#FCF8F3] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
              What Our Happy <br /> Students Says
            </h2>
            <p className="text-slate-600 text-lg">Build skills with our courses and mentor from world-class companies.</p>
          </div>
          <button className="px-8 py-3 border-2 border-purple-900 rounded-full text-purple-900 font-bold hover:bg-purple-900 hover:text-white transition-all">
            Give Your Review
          </button>
        </div>

        {/* --- The Transparent Box Container --- */}
        <div 
          className="relative rounded-[40px] border border-white/40 bg-white/20 backdrop-blur-sm p-4 md:p-10 overflow-hidden shadow-inner"
          ref={containerRef}
        >
          <div 
            ref={sliderRef}
            className="flex w-fit cursor-grab active:cursor-grabbing"
          >
            {infiniteTestimonials.map((testimonial, idx) => (
              <TestimonialCard key={`${testimonial.id}-${idx}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i ? "w-8 bg-slate-800" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}