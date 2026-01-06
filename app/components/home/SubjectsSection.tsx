"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  ArrowRight,
  Book,
  Binary,
  FlaskConical,
  Languages,
  Clock,
  Stars,
  Atom,
  BarChart
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register GSAP Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ALL_SUBJECTS_MARQUEE = ["English", "Mathematics", "Science", "Urdu", "Chemistry", "Physics", "Biology", "History", "Computer Science"];
const CATEGORIES = ["Primary", "Middle", "Secondary", "Language"];

const FloatingIcon = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const randomX = Math.floor(Math.random() * 90);
  const randomDelay = Math.random() * 5;
  const floatingHeight = 10 + Math.random() * 80;

  return (
    <motion.div
      initial={{ y: "110vh", x: `${randomX}%`, opacity: 0 }}
      animate={{ 
        y: [`110vh`, `${floatingHeight}vh`], 
        opacity: [0, 0.4, 0.3],
      }}
      transition={{ duration: 15 + Math.random() * 10, delay: randomDelay, ease: "easeOut" }}
      className="absolute text-[#582066] pointer-events-none z-0"
    >
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 15, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const SubjectsSection = () => {
  const [activeTab, setActiveTab] = useState("Primary");
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);
  const headerRef = useRef(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Animation for Header & Marquee
      gsap.from([headerRef.current, marqueeRef.current], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", 
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out"
      });

      // 2. Continuous Marquee Loop
      if (marqueeRef.current) {
        const marqueeInner = marqueeRef.current.querySelector(".marquee-inner");
        gsap.to(marqueeInner, {
          xPercent: -50,
          repeat: -1,
          duration: 30,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const SUBJECTS_DATA = [
    { id: 1, title: "English Language Foundations", badge: "Grades 1–5", bgColor: "bg-blue-50", icon: <Book className="w-12 h-12 text-blue-500" /> },
    { id: 2, title: "Mathematics: Advanced Logic", badge: "Grades 6–8", bgColor: "bg-purple-50", icon: <Binary className="w-12 h-12 text-purple-500" /> },
    { id: 3, title: "General Science Explorations", badge: "Primary Level", bgColor: "bg-emerald-50", icon: <FlaskConical className="w-12 h-12 text-emerald-600" /> },
    { id: 4, title: "Urdu Literature & Script", badge: "All Levels", bgColor: "bg-rose-50", icon: <Languages className="w-12 h-12 text-rose-500" /> }
  ];

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#FDF8F3] overflow-hidden min-h-screen">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <FloatingIcon key={i} index={i}>
            {[<Book size={28}/>, <Binary size={28}/>, <Stars size={28}/>, <Atom size={28}/>][i % 4]}
          </FloatingIcon>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- Subject Marquee (GSAP Animated) --- */}
        <div ref={marqueeRef} className="mb-20 overflow-hidden">
          <p className="text-center text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-8">
            Explore Every Subject We Teach
          </p>
          <div className="mask-marquee">
            <div className="marquee-inner inline-flex gap-16 whitespace-nowrap">
              {[...ALL_SUBJECTS_MARQUEE, ...ALL_SUBJECTS_MARQUEE].map((subject, i) => (
                <span key={i} className="text-4xl md:text-6xl font-black text-slate-900/5 hover:text-[#582066]/20 transition-colors select-none">
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* --- Header Section --- */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-none">
              Popular Subjects
            </h2>
            <div className="h-2 w-24 bg-[#582066] rounded-full" />
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-10 py-5 bg-white border-2 border-[#582066] text-[#582066] font-bold rounded-[2rem] hover:bg-[#582066] hover:text-white transition-all duration-300 shadow-xl shadow-purple-900/5"
          >
            Explore All Subjects
            <ArrowRight size={22} />
          </motion.button>
        </div>

        {/* --- Category Tabs --- */}
        <motion.div 
          ref={tabsRef}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex overflow-x-auto pb-6 mb-16 gap-10 no-scrollbar border-b border-slate-200/50"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative pb-4 text-xl font-bold transition-all duration-300 ${
                activeTab === cat ? "text-[#582066] scale-110" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {cat}
              {activeTab === cat && (
                <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#582066] rounded-t-full" />
              )}
            </button>
          ))}
        </motion.div>

        {/* --- Subject Cards Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <AnimatePresence mode="popLayout">
            {SUBJECTS_DATA.map((subject, idx) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -15 }}
                className="group bg-white rounded-[3rem] p-5 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-purple-200/40 border border-white flex flex-col h-full"
              >
                <div className={`${subject.bgColor} rounded-[2.5rem] aspect-square flex items-center justify-center relative overflow-hidden`}>
                   <motion.div whileHover={{ rotate: 12, scale: 1.2 }}>{subject.icon}</motion.div>
                </div>

                <div className="px-2 py-8 flex flex-col flex-grow text-left">
                  <div className="flex items-center justify-between mb-5">
                    <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest">{subject.badge}</span>
                    <span className="text-[#582066] font-extrabold text-[11px] flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      Live Class
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-8 leading-tight group-hover:text-[#582066] transition-colors">{subject.title}</h3>
                  <div className="mt-auto grid grid-cols-3 gap-4 border-t border-slate-50 pt-8">
                    <StatItem icon={<BookOpen size={18}/>} label="18 Lsn" />
                    <StatItem icon={<Clock size={18}/>} label="6-10 Yr" />
                    <StatItem icon={<BarChart size={18}/>} label="Beg" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .mask-marquee {
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

const StatItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <div className="flex flex-col items-center gap-2">
    <span className="text-slate-300">{icon}</span>
    <span className="text-[11px] font-bold text-slate-500 uppercase">{label}</span>
  </div>
);

export default SubjectsSection;