"use client";

import { useState } from "react";
import Image from "next/image";

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

const allCards = [...collections, ...collections, ...collections];

export default function ShopByCollection() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      id="collections"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
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
          Find exactly what you&apos;re looking for across our curated collections
        </p>
      </div>

      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(15,12,41,1) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, rgba(15,12,41,1) 0%, transparent 100%)",
          }}
        />

        <div
          className="flex gap-6"
          style={{
            width: "max-content",
            animation: paused ? "none" : "marquee 30s linear infinite",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {allCards.map((col, i) => (
            <a
              key={`${col.id}-${i}`}
              href={col.href}
              className="group flex-shrink-0 w-[260px] sm:w-[280px]"
            >
              <div className="glass-card overflow-hidden transition-all duration-500 group-hover:neon-glow group-hover:scale-[1.04]">
                <div
                  className="h-48 sm:h-56 flex items-center justify-center relative overflow-hidden"
                  style={{ background: col.gradient }}
                >
                  <Image 
                    src={col.image}
                    alt={col.title}
                    fill
                    sizes="(max-width: 640px) 260px, 280px"
                    className="object-contain p-4"
                    unoptimized
                  />
                </div>

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