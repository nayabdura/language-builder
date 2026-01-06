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

// 1. Define an Interface to satisfy the "Unexpected any" error
interface IconConfig {
  id: string;
  x: number;
  delay: number;
  height: number;
  duration: number;
  floatSpeed: number;
}

const FloatingIcon = ({ 
  children, 
  x, 
  delay, 
  height, 
  duration, 
  floatSpeed 
}: { 
  children: React.ReactNode;
  x: number;
  delay: number;
  height: number;
  duration: number;
  floatSpeed: number;
}) => {
  return (
    <motion.div
      initial={{ y: "110vh", x: `${x}%`, opacity: 0 }}
      animate={{ 
        y: ["110vh", `${height}vh`], 
        opacity: [0, 0.4, 0.3],
      }}
      transition={{ duration, delay, ease: "easeOut" }}
      className="absolute text-[#582066] pointer-events-none z-0"
    >
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 15, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: floatSpeed, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const SubjectsSection = () => {
  const [activeTab, setActiveTab] = useState("Primary");
  
  // 2. Specify the Type instead of using 'any'
  const [iconConfigs, setIconConfigs] = useState<IconConfig[]>([]);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate values only once on the client
    const configs: IconConfig[] = [...Array(12)].map((_, i) => ({
      id: `icon-${i}`,
      x: Math.floor(Math.random() * 90),
      delay: Math.random() * 5,
      height: 10 + Math.random() * 80,
      duration: 15 + Math.random() * 10,
      floatSpeed: 5 + Math.random() * 3
    }));
    
    // This is safe because it happens after the first render (Mounting)
   // setIconConfigs(configs);

    const ctx = gsap.context(() => {
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

      if (marqueeRef.current) {
        const marqueeInner = marqueeRef.current.querySelector(".marquee-inner");
        if (marqueeInner) {
          gsap.to(marqueeInner, {
            xPercent: -50,
            repeat: -1,
            duration: 30,
            ease: "none",
          });
        }
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

  const bgIcons = [
    <Book key="b-book" size={28}/>, 
    <Binary key="b-bin" size={28}/>, 
    <Stars key="b-star" size={28}/>, 
    <Atom key="b-atom" size={28}/>
  ];

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#FDF8F3] overflow-hidden min-h-screen">
      
      <div className="absolute inset-0 z-0">
        {iconConfigs.map((config, i) => (
          <FloatingIcon 
            key={config.id} 
            x={config.x}
            delay={config.delay}
            height={config.height}
            duration={config.duration}
            floatSpeed={config.floatSpeed}
          >
            {bgIcons[i % bgIcons.length]}
          </FloatingIcon>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div ref={marqueeRef} className="mb-20 overflow-hidden">
          <p className="text-center text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-8">
            Explore Every Subject We Teach
          </p>
          <div className="mask-marquee">
            <div className="marquee-inner inline-flex gap-16 whitespace-nowrap">
              {[...ALL_SUBJECTS_MARQUEE, ...ALL_SUBJECTS_MARQUEE].map((subject, i) => (
                <span key={`mq-${i}`} className="text-4xl md:text-6xl font-black text-slate-900/5 hover:text-[#582066]/20 transition-colors select-none">
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-none">
              Popular Subjects
            </h2>
            <div className="h-2 w-24 bg-[#582066] rounded-full" />
          </div>
          <button className="flex items-center gap-3 px-10 py-5 bg-white border-2 border-[#582066] text-[#582066] font-bold rounded-[2rem] hover:bg-[#582066] hover:text-white transition-all duration-300">
            Explore All Subjects
            <ArrowRight size={22} />
          </button>
        </div>

        <div className="flex overflow-x-auto pb-6 mb-16 gap-10 no-scrollbar border-b border-slate-200/50">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative pb-4 text-xl font-bold transition-all duration-300 ${activeTab === cat ? "text-[#582066]" : "text-slate-400 hover:text-slate-600"}`}
            >
              {cat}
              {activeTab === cat && (
                <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#582066] rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <AnimatePresence mode="popLayout">
            {SUBJECTS_DATA.map((subject, idx) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -15 }}
                className="group bg-white rounded-[3rem] p-5 shadow-xl shadow-slate-200/50 border border-white flex flex-col h-full"
              >
                <div className={`${subject.bgColor} rounded-[2.5rem] aspect-square flex items-center justify-center relative overflow-hidden`}>
                   <motion.div whileHover={{ rotate: 12, scale: 1.2 }}>{subject.icon}</motion.div>
                </div>

                <div className="px-2 py-8 flex flex-col flex-grow text-left">
                  <div className="flex items-center justify-between mb-5">
                    <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest">{subject.badge}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-8 leading-tight">{subject.title}</h3>
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