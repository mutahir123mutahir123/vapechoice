"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const featuredProduct = {
  id: 1,
  name: "Uwell Caliburn G4 Pro",
  brand: "Uwell",
  price: 5500,
  image: "/images/Uwell Pod Kits – VAPE CHOICE/imgi_21_uwell-caliburn-g4-pro-pod-vape-kit-stripe-black_360x.webp",
};

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Single Hero Image - Static Background */}
      <div className="absolute inset-0 z-[1]">
        <Image
          src="/hero-img.png"
          alt="VapeChoice Hero"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0c29]/60 via-transparent to-[#0f0c29]/80" />
      </div>

      {/* Hero Content - Fades in when scrolled into view */}
      <motion.div 
        className="relative z-[10] flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-8 lg:px-20 max-w-7xl mx-auto w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Featured Product Card */}
        <Link 
          href={`/product/${featuredProduct.id}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="order-1 lg:order-2 w-[60%] max-w-[220px] lg:max-w-[260px] mb-6 lg:mb-0 glass-card rounded-2xl overflow-hidden mx-auto lg:mx-0 pointer-events-auto cursor-pointer"
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
              sizes="(max-width: 640px) 100vw, 260px"
              className="object-contain p-4 z-10"
            />
          </div>
          <div className="p-4 text-left bg-black/40 backdrop-blur-md">
            <span className="text-[10px] sm:text-xs font-semibold text-neon-purple tracking-wider uppercase">Uwell Premium</span>
            <h3 className="text-base font-bold mt-1 mb-1 text-white truncate">{featuredProduct.name}</h3>
            <div className="flex justify-between items-center">
              <span className="text-lg font-extrabold gradient-text">PKR {featuredProduct.price.toLocaleString()}</span>
            </div>
          </div>
        </Link>

        {/* Text Area */}
        <div className="order-2 lg:order-1 text-center lg:text-left w-full lg:w-[50%] flex flex-col items-center lg:items-start">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-5 drop-shadow-lg">
            Choose Your Flavor. <br />
            <span className="gradient-text">Own Your Vibe.</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg lg:text-xl mb-8 max-w-md mx-auto lg:mx-0">
            Premium Vapes, Pods & Accessories
          </p>
          <Link
            href="/e-liquid"
            className="btn-primary text-sm sm:text-base px-10 py-4"
          >
            Shop Now
          </Link>
        </div>
      </motion.div>
    </section>
  );
}