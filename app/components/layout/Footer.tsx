"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Instagram, Dribbble, Twitter, Youtube, Send } from "lucide-react";

// --- Constants for Links ---
const companyLinks = ["Home", "Courses", "Mentors", "Testimonial", "Join", "Contact Us"];
const supportLinks = ["Help center", "Terms of service", "Legal", "Privacy Policy", "Status"];
const socialIcons = [Instagram, Dribbble, Twitter, Youtube];

// --- Newsletter Card Component ---
const NewsletterCard = () => {
  const ribbonRef = useRef(null);
  const containerRef = useRef(null);

  // GSAP Animation for the ribbon badge slide-in
  useGSAP(() => {
    gsap.from(ribbonRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      delay: 0.4,
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-[#FDE5B4] to-[#F9D29D] rounded-[40px] overflow-hidden flex flex-col md:flex-row relative shadow-xl">
        
        {/* Left Content */}
        <div className="p-8 md:p-12 md:w-7/12 lg:w-1/2 flex flex-col justify-center z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-slate-700 mb-8 text-lg">
            Subscribe our newsletter for discounts, promo and many more.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-6 py-4 rounded-full border-none outline-none focus:ring-2 focus:ring-purple-800 text-slate-800 placeholder-slate-400 transition-shadow"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#5B2C6F] text-white px-8 py-4 rounded-full font-bold hover:bg-purple-800 transition-colors"
            >
              Subscribe
            </motion.button>
          </form>
        </div>

        {/* Right Image (Overflowing) */}
        <div className="md:w-5/12 lg:w-1/2 relative min-h-[300px] md:min-h-auto">
          {/* Using a placeholder image that matches the colorful hand concept */}
          <Image
            src=""
            alt="Creative Arts"
            fill
            className="object-cover md:object-contain object-right-bottom md:scale-125 md:translate-x-10 md:translate-y-10"
          />
        </div>

        {/* Ribbon Badge (GSAP Animated) */}
        <div
          ref={ribbonRef}
          className="absolute top-0 right-8 bg-[#FF6B4A] text-white py-4 px-3 flex flex-col items-center text-center font-bold shadow-md"
          // Using clip-path to create the notched ribbon bottom shape
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)" }}
        >
          <span className="text-lg leading-none mb-1">FREE</span>
          <span className="text-[10px] leading-tight opacity-90">FOR NEW<br />USERS</span>
          <div className="h-3"></div> {/* Spacer for the clip-path bottom area */}
        </div>
      </div>
    </div>
  );
};

// --- Main Footer Section Component ---
export default function FooterSection() {
  const footerRef = useRef(null);

  // GSAP Stagger animation for footer columns
  useGSAP(() => {
    const columns = footerRef.current.querySelectorAll(".footer-col");
    gsap.from(columns, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%", // Trigger when top of footer hits 90% viewport height
      }
    });
  }, { scope: footerRef });

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative mt-24"
    >
      {/* The Overlapping Newsletter Card */}
      <NewsletterCard />

      {/* The Main Purple Footer */}
      {/* Negative margin top pulls it under the newsletter card */}
      <div ref={footerRef} className="bg-[#5B2C6F] pt-40 pb-16 -mt-32 relative z-10 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand */}
          <div className="footer-col flex flex-col items-start">
            <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-white">LB</span>
            </div>
            <p className="text-white/80 mb-8 leading-relaxed max-w-xs">
              Level up your skills, and get dream job with passion.
            </p>
            <div className="flex gap-4">
              {socialIcons.map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -3, scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div className="footer-col">
            <h3 className="text-lg font-bold mb-6">Company</h3>
            <ul className="space-y-4">
              {companyLinks.map((link, i) => (
                <li key={i}>
                  <Link href="#" className="text-white/70 hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div className="footer-col">
            <h3 className="text-lg font-bold mb-6">Support</h3>
            <ul className="space-y-4">
              {supportLinks.map((link, i) => (
                <li key={i}>
                  <Link href="#" className="text-white/70 hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Stay up to date */}
          <div className="footer-col">
            <h3 className="text-lg font-bold mb-6">Stay up to date</h3>
            <div className="relative max-w-xs">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-4 pr-12 text-white placeholder-white/50 outline-none focus:border-white/50 focus:bg-white/20 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.1, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-1"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>

        </div>
      </div>
    </motion.footer>
  );
}