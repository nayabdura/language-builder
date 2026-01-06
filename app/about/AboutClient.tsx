"use client";
import { useState, useEffect } from "react";
import AboutIntroOverlay from "../components/animations/AboutIntroOverlay";

export default function AboutClient({ children }: { children: React.ReactNode }) {
  const [isIntroDone, setIsIntroDone] = useState(false);

  // Prevent scrolling while the intro is playing
  useEffect(() => {
    if (!isIntroDone) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isIntroDone]);

  return (
    <>
      {/* Show overlay only if not done */}
      {!isIntroDone && (
        <AboutIntroOverlay onComplete={() => setIsIntroDone(true)} />
      )}
      
      {/* Content fades in after intro is done */}
      <div 
        className={`transition-opacity duration-1000 ${
          isIntroDone ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}