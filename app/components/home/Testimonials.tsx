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

// --- Updated Data from Images ---
const testimonials = [
  {
    id: 1,
    name: "Dr. Faiza Raza",
    role: "London",
    content: "Thanks to Language Builders, my child achieved an A+ in their IGCSE English exam, with a particular highlight in creative writing. For a year now, we've experienced interactive sessions that are not only engaging but also immensely educational. The learning experience has been exceptional, and we credit Language Builders for their fantastic support.",
  },
  {
    id: 2,
    name: "Asma Wakeel",
    role: "Parent",
    content: "I had a really good experience, Alhamdulillah. I've seen a major improvement in my son's speaking skills within just 2-3 months. The teacher is kind, patient, dedicated and passionate about teaching, with a strong grasp of the subject. The cherry on top is that a lot of general knowledge is discussed in the sessions, which broadens my child's worldview.",
  },
  {
    id: 3,
    name: "Dr. Khalil",
    role: "Parent (Gems School Dubai)",
    content: "Language Builders has provided exceptional learning support for my child at The Gems School Dubai. Their interactive sessions for the British curriculum in Science and English have led to significant improvement in academic performance. The tutor's dedication in managing classroom activities while keeping me updated is commendable.",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: (typeof testimonials)[0] }) => {
  return (
    <div className="flex-shrink-0 w-full md:w-[400px] bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 flex flex-col mx-4 select-none relative group transition-all hover:-translate-y-1 hover:shadow-md">
      
      {/* Quote Icon Background */}
      <div className="absolute top-6 right-8 opacity-10">
        <Quote size={60} className="text-[#582066]" />
      </div>

      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={18} className="fill-orange-400 text-orange-400" />
        ))}
      </div>

      <p className="text-slate-600 leading-relaxed text-[15px] mb-8 flex-grow">
        &quot;{testimonial.content}&quot;
      </p>

      <div className="mt-auto border-t border-slate-100 pt-6">
        <h3 className="text-xl font-bold text-[#582066] leading-tight">
          {testimonial.name}
        </h3>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
          {testimonial.role}
        </p>
      </div>
    </div>
  );
};

export default function TestimonialsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    if (!sliderRef.current || !containerRef.current) return;

    const slider = sliderRef.current;
    const container = containerRef.current;
    const cards = gsap.utils.toArray(".flex-shrink-0") as HTMLElement[];
    
    // Calculate boundaries
    const cardWidth = cards[0].offsetWidth + 32; // Width + Margin
    const totalWidth = cardWidth * testimonials.length;
    const containerWidth = container.offsetWidth;
    
    // Calculate max drag distance (negative value)
    // If total content is smaller than container, don't allow dragging left
    const minX = Math.min(0, containerWidth - totalWidth - 40); 

    Draggable.create(slider, {
      type: "x",
      bounds: { minX: minX, maxX: 0 }, // Stops dragging at edges (No Infinite Loop)
      inertia: true,
      edgeResistance: 0.65,
      onDrag: function() {
        const rawIndex = Math.abs(Math.round(this.x / cardWidth));
        setActiveIndex(Math.min(rawIndex, testimonials.length - 1));
      },
      onThrowUpdate: function() {
        const rawIndex = Math.abs(Math.round(this.x / cardWidth));
        setActiveIndex(Math.min(rawIndex, testimonials.length - 1));
      },
      // Snap to card positions
      snap: (value) => {
        return Math.round(value / cardWidth) * cardWidth;
      }
    });
  }, { scope: containerRef });

  return (
    <section className="bg-[#FCF8F3] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
              What Our Happy <br /> <span className="text-[#582066]">Parents Say</span>
            </h2>
            <p className="text-slate-600 text-lg">
              Real feedback from families who have experienced our personalized learning approach.
            </p>
          </div>
          
          <Link 
            href="/reviews" 
            className="px-8 py-3 border-2 border-[#582066] rounded-full text-[#582066] font-bold hover:bg-[#582066] hover:text-white transition-all flex items-center gap-2"
          >
            Check More Reviews
          </Link>
        </div>

        {/* --- The Transparent Box Container --- */}
        <div 
          className="relative rounded-[40px] border border-white/40 bg-white/20 backdrop-blur-sm p-4 md:p-10 overflow-hidden shadow-inner"
          ref={containerRef}
        >
          <div 
            ref={sliderRef}
            className="flex w-fit cursor-grab active:cursor-grabbing pl-4"
          >
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i ? "w-8 bg-[#582066]" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}