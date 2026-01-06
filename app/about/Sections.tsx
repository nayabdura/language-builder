"use client";

import { motion } from "framer-motion";
import { Target, Eye, Globe, Zap, Heart } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import imran from "../assets/imran.jpeg"
import sakina from "../assets/sakina.jpeg"


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- 1. About Hero: Smooth Mask Reveal & Parallax ---
export const AboutHero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const shapeRef = useRef(null);

  useGSAP(() => {
    // Floating Animation
    gsap.to(shapeRef.current, {
      y: 40,
      x: 20,
      rotation: 15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Masked Title Reveal
    gsap.from(".hero-title-span", {
      y: 120,
      skewY: 7,
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.1
    });

    // Parallax background shapes on scroll
    gsap.to(".parallax-shape", {
      y: -150,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative pt-32 pb-40 overflow-hidden bg-[#FCF8F3]">
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <h1 ref={titleRef} className="text-6xl md:text-8xl font-black text-slate-900 mb-8">
          <div className="overflow-hidden">
            <span className="hero-title-span inline-block">About Language</span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-title-span inline-block text-purple-700">Builders</span>
          </div>
        </h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          A world-class platform where language meets culture. We build bridges through words and confidence through mentorship.
        </motion.p>
      </div>
      
      {/* Decorative Parallax Shapes */}
      <div ref={shapeRef} className="parallax-shape absolute top-20 -right-20 w-96 h-96 bg-rose-200/50 rounded-full blur-3xl" />
      <div className="parallax-shape absolute -bottom-32 -left-20 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl" />
    </section>
  );
};

// --- 2. Mission & Vision: Horizontal Slide Reveal ---
export const MissionVision = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".mission-card");
    
    cards.forEach((card: any, i) => {
      gsap.from(card, {
        x: i === 0 ? -150 : 150,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 30%",
          toggleActions: "play reverse play reverse", // Animates on scroll up too!
        }
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-32 max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="mission-card bg-orange-50 p-12 rounded-[48px] border border-orange-100 shadow-sm">
          <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
            <Target className="text-orange-500" size={32} />
          </div>
          <h2 className="text-4xl font-bold mb-6 text-slate-900">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            To empower 1 million students by 2030 with the linguistic tools necessary to thrive in an interconnected global economy.
          </p>
        </div>
        <div className="mission-card bg-indigo-50 p-12 rounded-[48px] border border-indigo-100 shadow-sm">
          <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
            <Eye className="text-indigo-500" size={32} />
          </div>
          <h2 className="text-4xl font-bold mb-6 text-slate-900">Our Vision</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            A world where language is no longer a barrier to opportunity, but a gateway to empathy and mutual understanding.
          </p>
        </div>
      </div>
    </section>
  );
};

// --- 3. Teachers Section: Staggered Zoom & 3D Hover ---
const teachers = [
  { id: 1, name: "Imran", role: "English Mentor", color: "bg-purple-50", img: imran },
  { id: 2, name: "Sakina Imran", role: "Spanish Instructor", color: "bg-amber-50", img: sakina },
];

export const TeachersSection = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(".teacher-card", {
      y: 100,
      opacity: 0,
      stagger: 0.3,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      }
    });
  }, { scope: sectionRef });

  const onMouseMove = (e: React.MouseEvent, target: HTMLDivElement) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = target.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    gsap.to(target, { rotationY: x * 20, rotationX: -y * 20, transformPerspective: 1000, duration: 0.4 });
  };

  return (
    <section ref={sectionRef} className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-black text-slate-900 mb-20">The Minds Behind Your Growth</h2>
        <div className="grid sm:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {teachers.map((t) => (
            <div 
              key={t.id}
              onMouseMove={(e) => onMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { rotationY: 0, rotationX: 0 })}
              className={`teacher-card p-10 rounded-[50px] ${t.color} border border-slate-100 flex flex-col items-center cursor-pointer`}
            >
              <div className="relative w-40 h-40 rounded-full overflow-hidden mb-5 border-8 border-white shadow-lg">
                <Image src={t.img} alt={t.name} fill className="object-cover" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">{t.name}</h3>
              <p className="text-purple-600 font-bold uppercase tracking-widest text-sm mb-6">{t.role}</p>
              <p className="text-slate-600">Expert in immersive learning techniques and cognitive linguistic development.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 4. Why Us: Elastic Staggered Reveal ---
export const WhyUs = () => {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".feature-item", {
      opacity: 0,
      scale: 0.3,
      y: 80,
      stagger: 0.2,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-12">
        {features.map((f, i) => (
          <div key={i} className="feature-item group p-10 bg-white rounded-[40px] hover:bg-slate-900 transition-colors duration-500 shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <f.icon className="text-purple-600" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-4">{f.title}</h3>
            <p className="text-slate-500 group-hover:text-slate-300 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- 5. CTA: Expand & Glow ---
export const AboutCTA = () => {
  const ctaRef = useRef(null);

  useGSAP(() => {
    gsap.from(ctaRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 90%",
        toggleActions: "play reverse play reverse",
      }
    });
  }, { scope: ctaRef });

  return (
    <section className="py-32 px-6">
      <div ref={ctaRef} className="max-w-5xl mx-auto bg-[#5B2C6F] rounded-[60px] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-purple-900/20">
        <h2 className="text-4xl md:text-6xl font-black mb-10 relative z-10">Start Your Journey Today</h2>
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
          whileTap={{ scale: 0.9 }}
          className="bg-white text-[#5B2C6F] px-12 py-5 rounded-full font-black text-xl relative z-10 transition-all"
        >
          Explore All Subjects
        </motion.button>
        {/* Animated Background Blob */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[100px] animate-pulse" />
      </div>
    </section>
  );
};

const features = [
  { icon: Globe, title: "Global Reach", desc: "Connect with native speakers and students from over 120 countries." },
  { icon: Zap, title: "Fast Progression", desc: "Our method is designed to get you conversational in 90 days." },
  { icon: Heart, title: "Cultural Depth", desc: "We don't just teach words; we teach the soul of the language." },
];