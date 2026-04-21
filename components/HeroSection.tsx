"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Static Bento Grid - No Animation */}
      <div className="absolute inset-0 z-[2] flex items-center justify-center px-4 sm:px-8 pointer-events-none">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full max-w-7xl h-[50vh] md:h-[60vh]">
          {tokyoImages.map((src, i) => (
            <div
              key={i}
              className="relative flex items-center justify-center rounded-2xl overflow-hidden glass-card"
            >
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  background: i % 2 === 0 ? "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 60%)" : "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 60%)"
                }}
              />
              <Image
                src={src}
                alt={`Tokyo Nic Salt ${i + 1}`}
                fill
                className="object-cover z-10"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hero Content - Fades in when scrolled into view */}
      <motion.div 
        className="absolute inset-0 z-[10] flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-8 lg:px-20 max-w-7xl mx-auto w-full pointer-events-none"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Featured Product Card */}
        <Link 
          href={`/product/${featuredProduct.id}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="order-1 lg:order-2 w-[55%] max-w-[200px] lg:max-w-[240px] mb-6 lg:mb-0 glass-card rounded-2xl overflow-hidden mx-auto lg:mx-0 pointer-events-auto cursor-pointer"
          style={{ 
            border: isHovered ? "2px solid rgba(168,85,247,0.8)" : "1px solid rgba(255,255,255,0.1)",
            transition: "all 0.3s ease"
          }}
        >
          <div className="relative w-full aspect-[4/5]" style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(59,130,246,0.15) 100%)" }}>
            <Image 
              src={featuredProduct.image}
              alt={featuredProduct.name}
              fill
              sizes="(max-width: 640px) 100vw, 240px"
              className="object-contain p-3 z-10"
            />
          </div>
          <div className="p-3 text-left bg-black/30 backdrop-blur-sm">
            <span className="text-[10px] font-semibold text-neon-purple tracking-wider uppercase">Uwell Premium</span>
            <h3 className="text-sm font-bold mt-1 text-white truncate">{featuredProduct.name}</h3>
            <div className="flex justify-between items-center mt-1">
              <span className="text-base font-extrabold gradient-text">PKR {featuredProduct.price.toLocaleString()}</span>
            </div>
          </div>
        </Link>

        {/* Text Area */}
        <div className="order-2 lg:order-1 text-center lg:text-left w-full lg:w-[50%] mt-[-10px] lg:mt-0 flex flex-col items-center lg:items-start">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-4">
            Choose Your Flavor. <br />
            <span className="gradient-text">Own Your Vibe.</span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg lg:text-xl mb-6 max-w-md mx-auto lg:mx-0">
            Premium Vapes, Pods & Accessories
          </p>
          <Link
            href="/e-liquid"
            className="btn-primary text-sm sm:text-base px-8 py-3"
          >
            Shop Now
          </Link>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[15] pointer-events-none bg-gradient-to-t from-[#0f0c29] to-transparent" />
    </section>
  );
}