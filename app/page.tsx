"use client"
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroOverlay from './components/animations/IntroOverlay';

import Hero from './components/home/Hero';
import SubjectsSection from './components/home/SubjectsSection';
import TeachersSection from './components/home/TeacherSection';
// import ExperienceSection from './components/home/experince';
import Testimonials from './components/home/Testimonials';


export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <main className="relative min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroOverlay key="intro" onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Main Website Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >

        <Hero />
        <SubjectsSection />
        <TeachersSection />
        {/* <ExperienceSection /> */}
        <Testimonials />
    
      </motion.div>
    </main>
  );
}