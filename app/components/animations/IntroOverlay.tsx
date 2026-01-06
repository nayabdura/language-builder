"use main"
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface IntroOverlayProps {
  onComplete: () => void;
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => onComplete(),
      });

      // Step 1: Initial Black Screen (1s delay built into timeline)
      tl.set(containerRef.current, { opacity: 1 })
        
        // Step 2: First Text Animation
        .fromTo(text1Ref.current, 
          { opacity: 0, scale: 0.9 }, 
          { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out", delay: 1 }
        )
        .to(text1Ref.current, { opacity: 0, duration: 0.8, ease: "power2.in" }, "+=0.5")

        // Step 3: Second Text Animation
        .fromTo(text2Ref.current, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
        )
        .to(text2Ref.current, { opacity: 0, duration: 0.8, ease: "power2.in" }, "+=1")

        // Step 4: Exit Overlay
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black px-6 text-center"
    >
      <div className="relative">
        <h1 
          ref={text1Ref} 
          className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl font-bold text-white whitespace-nowrap opacity-0"
        >
          We are <br /> Language Builders 👩‍👧‍👦
        </h1>
        <p 
          ref={text2Ref} 
          className="text-xl md:text-3xl text-gray-200 max-w-2xl leading-relaxed opacity-0"
        >
          At Language Builders, we believe every child can become a confident learner.
        </p>
      </div>
    </div>
  );
}