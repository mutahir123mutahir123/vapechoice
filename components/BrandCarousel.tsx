"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const brands = [
  { id: "smok", name: "SMOK", image: "/images/brands logo/smok.png" },
  { id: "voopoo", name: "VOOPOO", image: "/images/brands logo/voopoo.png" },
  { id: "vaporesso", name: "VAPORESSO", image: "/images/brands logo/vaporesso.png" },
  { id: "uwell", name: "UWELL", image: "/images/brands logo/uwell.png" },
  { id: "vgod", name: "VGOD", image: "/images/brands logo/vgod.jpeg" },
  { id: "ivg", name: "IVG", image: "/images/brands logo/ivg.jpeg" },
  { id: "tokyo", name: "TOKYO", image: "/images/brands logo/tokyo.png" },
];

// Triple for seamless scroll
const allBrands = [...brands, ...brands, ...brands];

export default function BrandCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const singleSetWidth = brands.length * (160 + 32); // logo width + gap

    const tween = gsap.to(track, {
      x: -singleSetWidth,
      duration: 20,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: string) => {
          return parseFloat(x) % singleSetWidth;
        }),
      },
    });

    const handleEnter = () => gsap.to(tween, { timeScale: 0.2, duration: 0.5 });
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
      id="brands"
      className="relative py-16 sm:py-20 overflow-hidden"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Section Header */}
      <div className="text-center mb-10 px-4">
        <span
          className="text-neon-purple text-sm font-semibold tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Trusted Brands
        </span>
        <h2 className="section-title mt-2">
          <span className="gradient-text">Shop by Brand</span>
        </h2>
      </div>

      {/* Brand Logo Carousel */}
      <div className="relative">
        {/* Edge fades */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(15,12,41,1) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, rgba(15,12,41,1) 0%, transparent 100%)",
          }}
        />

        <div
          ref={trackRef}
          className="flex gap-8 items-center will-change-transform"
          style={{ width: "max-content" }}
        >
          {allBrands.map((brand, i) => (
            <a
              key={`${brand.id}-${i}`}
              href="#"
              className="flex-shrink-0 group"
            >
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl glass-card flex flex-col items-center justify-center transition-all duration-500 group-hover:neon-glow group-hover:scale-105 overflow-hidden">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                  <Image 
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <span className="text-[10px] text-white/40 mt-1 group-hover:text-white/60 transition-colors">
                  {brand.name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
