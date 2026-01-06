"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Book,
    Binary,
    FlaskConical,
    Languages,
    Mic2,
    PenTool,
    CheckCircle2
} from "lucide-react";
import AnimatedDropdown from "../animations/AnimatedDropdown";

const HeroSection = () => {
    // 1. Define State for the dropdowns
    const [subject, setSubject] = useState("");
    const [grade, setGrade] = useState("");

    const subjects = ["English", "Urdu", "Mathematics", "Science", "General Knowledge", "Speaking Skills", "Writing Skills"];
    const grades = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "O Level / Secondary"];

    const handleStartLearning = () => {
        const nextSection = document.getElementById("courses-section");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Animation variants for floating icons
    const floatAnimation = (delay: number) => ({
        initial: { y: 0 },
        animate: {
            y: [0, -15, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
            },
        },
    });

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-[#FDF8F3] pt-24 pb-16 px-6 overflow-hidden">

            {/* --- Floating Icons Layer --- */}
            <div className="absolute inset-0 pointer-events-none hidden md:block">
                {/* English */}
                <motion.div
                    {...floatAnimation(0)}
                    className="absolute top-[15%] left-[10%] bg-white p-4 rounded-2xl shadow-lg text-blue-500"
                >
                    <Book size={32} />
                </motion.div>

                {/* Math */}
                <motion.div
                    {...floatAnimation(1)}
                    className="absolute bottom-[20%] left-[15%] bg-white p-4 rounded-2xl shadow-lg text-purple-600"
                >
                    <Binary size={32} />
                </motion.div>

                {/* Science */}
                <motion.div
                    {...floatAnimation(0.5)}
                    className="absolute top-[20%] right-[10%] bg-white p-4 rounded-2xl shadow-lg text-emerald-500"
                >
                    <FlaskConical size={32} />
                </motion.div>

                {/* Speaking Skills */}
                <motion.div
                    {...floatAnimation(1.5)}
                    className="absolute bottom-[25%] right-[15%] bg-white p-4 rounded-2xl shadow-lg text-orange-500"
                >
                    <Mic2 size={32} />
                </motion.div>

                {/* Writing Skills */}
                <motion.div
                    {...floatAnimation(2)}
                    className="absolute top-[50%] right-[5%] bg-white p-3 rounded-xl shadow-md text-rose-500"
                >
                    <PenTool size={24} />
                </motion.div>

                {/* Urdu/Languages */}
                <motion.div
                    {...floatAnimation(0.8)}
                    className="absolute top-[55%] left-[5%] bg-white p-3 rounded-xl shadow-md text-amber-600"
                >
                    <Languages size={24} />
                </motion.div>
            </div>

            {/* --- Main Content --- */}
            <div className="relative z-10 max-w-4xl w-full text-center space-y-8">

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1]"
                >
                    Build Strong Foundations <br />
                    <span className="text-[#582066]">in Every Subject</span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
                >
                    Helping students grow with expert-led lessons in English, Urdu, Math, Science, and more.
                </motion.p>

                {/* Trust Indicator Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-6 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-3xl shadow-sm border border-slate-100"
                >
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                            </div>
                        ))}
                    </div>
                    <div className="text-left">
                        <p className="text-slate-900 font-bold text-sm">Trusted by Parents & Students</p>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-[12px] text-slate-500">
                                <CheckCircle2 size={14} className="text-emerald-500" /> Personalized
                            </span>
                            <span className="flex items-center gap-1 text-[12px] text-slate-500">
                                <CheckCircle2 size={14} className="text-emerald-500" /> Expert Tutors
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* --- CTA Card / Search Section --- */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="w-full bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-4 md:p-6 lg:p-8 mt-12"
                >
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-6 items-end">
                        <AnimatedDropdown
                            label="What do you want to learn?"
                            placeholder="Select Subject"
                            options={subjects}
                            value={subject}
                            onChange={setSubject}
                        />

                        <AnimatedDropdown
                            label="Select Class"
                            placeholder="Select Class"
                            options={grades}
                            value={grade}
                            onChange={setGrade}
                        />

                        <button 
                            onClick={handleStartLearning}
                            className="bg-[#582066] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#4a1b56] hover:shadow-2xl hover:shadow-purple-200 transition-all active:scale-95 h-[62px] whitespace-nowrap"
                        >
                            Start Learning
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;