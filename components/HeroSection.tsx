"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tokyoImages = [
  "/images/Tokyo nic salt – VAPE CHOICE/1.webp",
  "/images/Tokyo nic salt – VAPE CHOICE/2.webp",
  "/images/Tokyo nic salt – VAPE CHOICE/3.webp",
  "/images/Tokyo nic salt – VAPE CHOICE/4.webp",
  "/images/Tokyo nic salt – VAPE CHOICE/5.webp",
  "/images/Tokyo nic salt – VAPE CHOICE/6.webp",
];

const featuredProduct = {
  id: 1,
  name: "Uwell Caliburn G4 Pro",
  brand: "Uwell",
  price: 5500,
  image: "/images/Uwell Pod Kits – VAPE CHOICE/imgi_21_uwell-caliburn-g4-pro-pod-vape-kit-stripe-black_360x.webp",
  description: "The Uwell Caliburn G4 Pro is a powerful and sleek pod system that delivers exceptional flavor and vapor production.",
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

useEffect(() => {
    const ctx = gsap.context(() => {
      // Check if mobile - skip pin animation on small screens
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        // Simple fade in for mobile - no scroll animation
        gsap.set([headingRef.current, descRef.current, btnRef.current], { opacity: 0, y: 20 });
        gsap.set(".hero-card-link", { opacity: 0, y: 20 });
        
        gsap.to([headingRef.current, descRef.current, btnRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.3
        });
        
        gsap.to(".hero-card-link", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.8
        });
        return;
      }

      // Desktop: subtle smooth scroll animation WITHOUT pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Initial state - subtle starting positions
      gsap.set([headingRef.current, descRef.current, btnRef.current], { opacity: 0, y: 30 });
      gsap.set(".hero-card-link", { opacity: 0, y: 30 });

      // Subtle bento movement - just gentle parallax, no explosion
      const boxes = gsap.utils.toArray(".bento-box") as HTMLDivElement[];
      
      boxes.forEach((box, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const rowDir = row === 0 ? -1 : 1;
        const colDir = col === 0 ? -1 : col === 1 ? (i % 2 === 0 ? -0.3 : 0.3) : 1;

        tl.to(
          box,
          {
            x: colDir * 100,
            y: rowDir * 80,
            scale: 1.1,
            rotation: colDir * 5,
            opacity: 0.9,
            ease: "power1.out",
            duration: 1,
          },
          0
        );
      });

      // Smooth text reveal with proper stagger
      tl.to(
        headingRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        0.3
      )
      .to(
        descRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .to(
        btnRef.current,
        { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .to(
        ".hero-card-link",
        { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.8, ease: "power2.out" },
        ">"
      );
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div
          className="absolute top-10 left-[20%] w-[300px] h-[300px] rounded-full opacity-40 blur-[80px]"
          style={{ background: "rgba(168,85,247,0.5)" }}
        />
        <div
          className="absolute bottom-10 right-[20%] w-[400px] h-[400px] rounded-full opacity-40 blur-[100px]"
          style={{ background: "rgba(59,130,246,0.3)" }}
        />
      </div>

      {/* Grid Wrapper (The Bento Gallery) */}
      <div
        ref={gridWrapperRef}
        className="absolute inset-0 z-[2] flex items-center justify-center px-4 sm:px-8 pointer-events-none"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-7xl h-[60vh] md:h-[70vh]">
          {tokyoImages.map((src, i) => (
            <div
              key={i}
              className="bento-box relative flex items-center justify-center rounded-3xl overflow-hidden glass-card-strong shadow-2xl transition-transform"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)"
              }}
            >
              {/* Radial glow behind image inside the bento box */}
              <div 
                className="absolute inset-0 opacity-50 z-0"
                style={{
                  background: i % 2 === 0 ? "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 60%)" : "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 60%)"
                }}
              />
              <Image
                src={src}
                alt={`Tokyo Nic Salt ${i + 1}`}
                fill
                className="object-cover z-10 transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hero Content Overlay - Animates in AFTER bento grid */}
      <div 
        ref={textRef} 
        className="absolute inset-0 z-[10] flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-8 lg:px-20 max-w-7xl mx-auto w-full pointer-events-none"
      >
        <Link 
          href={`/product/${featuredProduct.id}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="hero-card-link order-1 lg:order-2 w-[60%] max-w-[220px] lg:max-w-[260px] mb-8 lg:mb-0 glass-card-strong rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] mx-auto lg:mx-0 pointer-events-auto cursor-pointer"
          style={{ 
            border: isHovered ? "2px solid rgba(168,85,247,0.8)" : "1px solid rgba(255,255,255,0.1)",
            boxShadow: isHovered ? "0 0 40px rgba(168,85,247,0.5), 0 20px 50px rgba(0,0,0,0.5)" : "0 20px 50px rgba(0,0,0,0.5)",
            transition: "all 0.3s ease"
          }}
        >
          <div className="relative w-full aspect-[4/5]" style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(59,130,246,0.2) 100%)" }}>
            <Image 
              src={featuredProduct.image}
              alt={featuredProduct.name}
              fill
              sizes="(max-width: 640px) 100vw, 260px"
              className="object-contain p-4 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] z-10 transition-transform duration-500"
              style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
            />
          </div>
          <div className="p-4 text-left bg-black/40 backdrop-blur-md">
            <span className="text-[10px] sm:text-xs font-semibold text-neon-purple tracking-wider uppercase flex">Uwell Premium</span>
            <h3 className="text-base font-bold mt-1 mb-1 text-white truncate">{featuredProduct.name}</h3>
            <div className="flex justify-between items-center">
              <span className="text-lg font-extrabold gradient-text">PKR {featuredProduct.price.toLocaleString()}</span>
              <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neon-purple"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Text Area - appears bottom on mobile, left on desktop */}
        <div className="order-2 lg:order-1 text-center lg:text-left w-full lg:w-[50%] mt-[-20px] lg:mt-0 flex flex-col items-center lg:items-start">
          <h1
          ref={headingRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-5 drop-shadow-2xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Choose Your Flavor. <br />
          <span className="gradient-text">Own Your Vibe.</span>
        </h1>

          <p
            ref={descRef}
            className="text-white/80 text-base sm:text-lg lg:text-xl mb-8 leading-relaxed drop-shadow-md max-w-md mx-auto lg:mx-0"
            style={{ fontFamily: "var(--font-body)" }}
          >
          Premium Vapes, Pods & Accessories
        </p>

        <div ref={btnRef} className="flex justify-center lg:justify-start">
          <Link
            href="/e-liquid"
            className="btn-primary text-sm sm:text-base px-10 py-4 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Shop Now
          </Link>
        </div>
      </div>

      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[15] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(15,12,41,1) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
