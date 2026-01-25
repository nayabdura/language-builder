"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Book,
  Binary,
  FlaskConical,
  Languages,
  Clock,
  Stars,
  Atom,
  BarChart,
  GraduationCap,
  Calculator,
  Globe,
  Palette,
  Terminal,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Ensure GSAP plugin is registered only on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ALL_SUBJECTS_MARQUEE = ["Australia", "Canada", "United States", "United Kingdom", "Saudi Arabia", "Dubai", "Turkey"];
const CATEGORIES = ["Primary", "Middle", "Secondary", "Language"] as const;
type CategoryType = typeof CATEGORIES[number];

// --- Interfaces for Type Safety ---

interface IconConfig {
  id: string;
  x: number;
  delay: number;
  height: number;
  duration: number;
  floatSpeed: number;
}

interface FloatingIconProps extends IconConfig {
  children: React.ReactNode;
}

interface SubjectItem {
  name: string;
  level?: string;
}

interface ProcessedSubject {
  id: string;
  title: string;
  badge: string;
  icon: React.ReactNode;
}

// --- Helper Components ---

const getSubjectIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes("math")) return <Calculator className="w-12 h-12 text-purple-500" />;
  if (t.includes("science") || t.includes("physics") || t.includes("biology") || t.includes("chemistry")) return <FlaskConical className="w-12 h-12 text-emerald-600" />;
  if (t.includes("english") || t.includes("writing") || t.includes("literature")) return <Book className="w-12 h-12 text-blue-500" />;
  if (t.includes("urdu") || t.includes("language")) return <Languages className="w-12 h-12 text-rose-500" />;
  if (t.includes("computer") || t.includes("digital") || t.includes("canva")) return <Terminal className="w-12 h-12 text-orange-500" />;
  if (t.includes("art")) return <Palette className="w-12 h-12 text-pink-500" />;
  if (t.includes("studies") || t.includes("history") || t.includes("geo")) return <Globe className="w-12 h-12 text-cyan-600" />;
  return <GraduationCap className="w-12 h-12 text-slate-500" />;
};

const FloatingIcon = ({ children, x, delay, height, duration, floatSpeed }: FloatingIconProps) => (
  <motion.div
    initial={{ y: "110vh", x: `${x}%`, opacity: 0 }}
    animate={{ y: ["110vh", `${height}vh`], opacity: [0, 0.4, 0.3] }}
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

const StatItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <div className="flex flex-col items-center gap-2">
    <span className="text-slate-400">{icon}</span>
    <span className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase whitespace-nowrap">{label}</span>
  </div>
);

// --- Main Component ---

const SubjectsSection = () => {
  const [activeTab, setActiveTab] = useState<CategoryType>("Primary");
  const [iconConfigs, setIconConfigs] = useState<IconConfig[]>([]);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const RAW_DATA: Record<CategoryType, (string | SubjectItem)[]> = {
    Primary: ["English", "Creative Writing", "Mathematics", "Mental Math", "Science", "Arts & Crafts", "Computers (Canva)", "Social Studies", "Urdu"],
    Middle: ["English Language", "Creative Writing", "English Literature", "Mathematics", "Math Mastery", "Science", "Biology", "Chemistry", "Physics", "History", "Geography"],
    Secondary: ["English (0500/1123)", "Urdu (3247/3248)", "Physics (5054)", "Chemistry (5070)", "Biology (5090)", "Mathematics (4024)", "Add Math (4037)", "Computer Science", "Economics", "Business Studies", "Accounting", "Islamiyat", "Pakistan Studies"],
    Language: [
      { name: "English: Beginner Level", level: "Beginner" },
      { name: "English: Intermediate Level", level: "Intermediate" },
      { name: "English: Advanced Mastery", level: "Advanced" },
      { name: "Urdu Language Skills", level: "Language" }
    ]
  };

  useEffect(() => {
    const configs: IconConfig[] = [...Array(12)].map((_, i) => ({
      id: `icon-${i}`,
      x: Math.floor(Math.random() * 90),
      delay: Math.random() * 5,
      height: 10 + Math.random() * 80,
      duration: 15 + Math.random() * 10,
      floatSpeed: 5 + Math.random() * 3
    }));
    
    // setIconConfigs(configs);

    const ctx = gsap.context(() => {
      if (marqueeRef.current) {
        const marqueeInner = marqueeRef.current.querySelector(".marquee-inner");
        if (marqueeInner) {
          gsap.to(marqueeInner, { xPercent: -50, repeat: -1, duration: 30, ease: "none" });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter subjects based on activeTab
  const currentSubjects: ProcessedSubject[] = RAW_DATA[activeTab].map((sub, idx) => {
    const isObject = typeof sub !== 'string';
    const title = isObject ? sub.name : sub;
    const badge = isObject && sub.level ? sub.level : activeTab;

    return {
      id: `${activeTab}-${idx}`,
      title,
      badge,
      icon: getSubjectIcon(title)
    };
  });

  const backgroundIcons = [
    <Book key="b1" size={28}/>, 
    <Binary key="b2" size={28}/>, 
    <Stars key="b3" size={28}/>, 
    <Atom key="b4" size={28}/>
  ];

  return (
    <section id="courses-section" ref={sectionRef} className="relative py-24 bg-[#FDF8F3] overflow-hidden min-h-screen">
      
      {/* Background Floating Elements */}
      <div className="absolute inset-0 z-0">
        {iconConfigs.map((config, i) => (
          <FloatingIcon key={config.id} {...config}>
            {backgroundIcons[i % backgroundIcons.length]}
          </FloatingIcon>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Marquee Section */}
        <div ref={marqueeRef} className="mb-20 overflow-hidden">
          <p className="text-center text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-8">
            Global Learning Community
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

        {/* Header Section */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-none">
              Explore Our <span className="text-[#582066]">Subjects</span>
            </h2>
            <div className="h-2 w-24 bg-[#582066] rounded-full" />
          </div>
        </div>

        {/* Categories Tabs */}
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

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* FIX: Removed mode="wait" to fix the multiple children warning */}
          <AnimatePresence mode="popLayout">
            {currentSubjects.map((subject, idx) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-[2.5rem] p-5 shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col"
              >
                <div className="bg-slate-50 rounded-[2rem] aspect-video flex items-center justify-center relative overflow-hidden">
                   <motion.div whileHover={{ rotate: 5, scale: 1.1 }}>{subject.icon}</motion.div>
                </div>

                <div className="px-2 py-6 flex flex-col flex-grow text-left">
                  <div className="mb-4">
                    <span className="bg-purple-100 text-[#582066] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {subject.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-6 leading-tight h-14 overflow-hidden">
                    {subject.title}
                  </h3>
                  
                  <div className="mt-auto grid grid-cols-3 gap-2 border-t border-slate-50 pt-6">
                    <StatItem icon={<BookOpen size={16}/>} label="1 Hour" />
                    <StatItem icon={<Clock size={16}/>} label="12 / Month" />
                    <StatItem icon={<BarChart size={16}/>} label="Age 5-16" />
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

export default SubjectsSection;