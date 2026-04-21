"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const collections = [
  {
    id: "vapes",
    title: "Vapes",
    color: "from-purple-600 to-violet-800",
    gradient: "linear-gradient(135deg, #7c3aed, #4c1d95)",
    image: "/images/category-vapes.png",
    href: "/vapes",
  },
  {
    id: "pods",
    title: "Pods",
    color: "from-blue-500 to-indigo-700",
    gradient: "linear-gradient(135deg, #3b82f6, #3730a3)",
    image: "/images/category-pods.png",
    href: "/pods",
  },
  {
    id: "e-liquids",
    title: "E-Liquids",
    color: "from-pink-500 to-rose-700",
    gradient: "linear-gradient(135deg, #ec4899, #9f1239)",
    image: "/images/category-eliquids.png",
    href: "/e-liquid",
  },
  {
    id: "disposable",
    title: "Disposable Vapes",
    color: "from-amber-500 to-orange-700",
    gradient: "linear-gradient(135deg, #f59e0b, #c2410c)",
    image: "/images/IVG – VAPE CHOICE/imgi_13_IVG-Disposable-Red-Apple-Ice-8k-Puffs-35mg_360x.webp",
    href: "/disposables",
  },
];

// Duplicate for seamless loop
const allCards = [...collections, ...collections, ...collections];

export default function ShopByCollection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Calculate single set width
    const cardWidth = 280 + 24; // card width + gap
    const singleSetWidth = collections.length * cardWidth;

    // Set up infinite scroll animation
    const tween = gsap.to(track, {
      x: -singleSetWidth,
      duration: 25,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: string) => {
          return parseFloat(x) % singleSetWidth;
        }),
      },
    });

    // Pause on hover
    const handleEnter = () => gsap.to(tween, { timeScale: 0.3, duration: 0.5 });
    const handleLeave = () => gsap.to(tween, { timeScale: 1, duration: 0.5 });

    track.addEventListener("mouseenter", handleEnter);
    track.addEventListener("mouseleave", handleLeave);

    return () => {
      tween.kill();
      track.removeEventListener("mouseenter", handleEnter);
      track.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center mb-12 px-4">
        <span
          className="text-neon-purple text-sm font-semibold tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Browse
        </span>
        <h2 className="section-title mt-2">
          <span className="gradient-text">Shop by Collection</span>
        </h2>
        <p className="section-subtitle">
          Find exactly what you&apos;re looking for across our curated
          collections
        </p>
      </div>

      {/* Infinite Slider Track */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(15,12,41,1) 0%, transparent 100%)",
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, rgba(15,12,41,1) 0%, transparent 100%)",
          }}
        />

        <div
          ref={trackRef}
          className="flex gap-6 will-change-transform"
          style={{ width: "max-content" }}
        >
          {allCards.map((col, i) => (
            <a
              key={`${col.id}-${i}`}
              href={col.href}
              className="group flex-shrink-0 w-[260px] sm:w-[280px]"
            >
              <div className="glass-card overflow-hidden transition-all duration-500 group-hover:neon-glow group-hover:scale-[1.04]">
                {/* Card Image */}
                <div
                  className="h-48 sm:h-56 flex items-center justify-center relative overflow-hidden"
                  style={{ background: col.gradient }}
                >
                  <Image 
                    src={col.image}
                    alt={col.title}
                    fill
                    className="object-contain p-4"
                    unoptimized
                  />
                </div>

                {/* Card Label */}
                <div className="p-5 text-center">
                  <h3
                    className="text-lg font-bold group-hover:text-neon-purple transition-colors duration-300"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {col.title}
                  </h3>
                  <span
                    className="text-xs text-white/40 mt-1 inline-flex items-center gap-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    View Collection
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
