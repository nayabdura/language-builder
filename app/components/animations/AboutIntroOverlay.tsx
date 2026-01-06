"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface IntroOverlayProps {
  onComplete: () => void;
}

export default function AboutIntroOverlay({ onComplete }: IntroOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => onComplete(),
      });

      // 1. Ensure container is visible initially
      tl.set(containerRef.current, { opacity: 1 })
        
        // 2. First Text Animation (Building Language...)
        .fromTo(text1Ref.current, 
          { opacity: 0, scale: 0.9, y: 10 }, 
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0.5 }
        )
        .to(text1Ref.current, { opacity: 0, duration: 0.8, ease: "power2.in" }, "+=0.8")

        // 3. Second Text Animation (Meet the educators...)
        .fromTo(text2Ref.current, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
        )
        .to(text2Ref.current, { opacity: 0, duration: 0.8, ease: "power2.in" }, "+=1")

        // 4. Exit Overlay smoothly
        .to(containerRef.current, { 
          opacity: 0, 
          duration: 1, 
          display: "none",
          ease: "power4.inOut" 
        });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black px-6 text-center pointer-events-none"
    >
      <div className="relative w-full max-w-4xl">
        {/* We use absolute positioning to prevent text jumping when one disappears */}
        <h1 
          ref={text1Ref} 
          className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl font-bold text-white opacity-0"
        >
          Building Language. <br /> Building Confidence. 👩‍👧‍👦
        </h1>
        <p 
          ref={text2Ref} 
          className="text-xl md:text-3xl text-gray-200 max-w-2xl mx-auto leading-relaxed opacity-0"
        >
          Meet the educators behind Language Builders.
        </p>
      </div>
    </div>
  );
}