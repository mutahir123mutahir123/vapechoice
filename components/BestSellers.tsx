"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const initialBestSellers = [
  {
    id: 1,
    name: "Aspire Minican Plus",
    brand: "Aspire",
    price: 3500,
    category: "Pod Kit",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    image: "/images/Aspire Pod Kits – VAPE CHOICE/imgi_19_store-minican-plus-2-600x809_360x.webp",
  },
  {
    id: 2,
    name: "Uwell Caliburn G4 Pro",
    brand: "Uwell",
    price: 5500,
    category: "Pod System",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    image: "/images/Uwell Pod Kits – VAPE CHOICE/imgi_21_uwell-caliburn-g4-pro-pod-vape-kit-stripe-black_360x.webp",
  },
  {
    id: 3,
    name: "Drip Down Cola Ice E-Liquid",
    brand: "Drip Down",
    price: 3200,
    category: "Freebase",
    gradient: "linear-gradient(135deg, #fce38a 0%, #f38181 100%)",
    image: "/images/DRIP DOWN FREEBASE – VAPE CHOICE/imgi_11_Drip-Down-Cola-Ice-E-Liquids-60ml_360x.jpg",
  },
  {
    id: 4,
    name: "IVG Regal 6000 Puffs",
    brand: "IVG",
    price: 2200,
    category: "Disposable",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    image: "/images/IVG – VAPE CHOICE/imgi_13_IVG-Disposable-Red-Apple-Ice-8k-Puffs-35mg_360x.webp",
  },
  {
    id: 5,
    name: "Tokyo Super Cool",
    brand: "Tokyo",
    price: 1800,
    category: "Nic Salt",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    image: "/images/Tokyo nic salt – VAPE CHOICE/imgi_15_Super-Cool-05_1445x_30e23352-fe44-4cc3-a6b5-46021a100651_360x.webp",
  },
  {
    id: 6,
    name: "Infinity Disposable 5000",
    brand: "Infinity",
    price: 1500,
    category: "Disposable",
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    image: "/images/INFINITY DISPOSABLE – VAPE CHOICE/imgi_12_3_1_2048x_d26db9e5-cb22-49b2-a994-6ab16899f46a_360x.webp",
  },
];

export default function BestSellers() {
  const [cards, setCards] = useState(initialBestSellers);

  const handleNextCard = () => {
    setCards((prevCards) => {
      const newArray = [...prevCards];
      // Take the top card and move to back
      const first = newArray.shift();
      if (first) newArray.push(first);
      return newArray;
    });
  };

  return (
    <section
      id="best-sellers"
      className="relative min-h-screen py-20 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center mb-16 relative z-10">
        <span
          className="text-neon-purple text-sm font-semibold tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Top Picks
        </span>
        <h2 className="section-title mt-2">
          <span className="gradient-text">Best Sellers</span>
        </h2>
        {/* <p className="section-subtitle">
          Click the card to view the next. Tap button to view the product.
        </p> */}
      </div>

      {/* Cards Container */}
      <div className="relative w-full max-w-sm sm:max-w-xl mx-auto h-[480px] sm:h-[450px]">
        {cards.map((product, i) => {
          // Cards get progressively smaller, dimmer, and shifted right/up based on their index
          const isTop = i === 0;
          const styles = {
            scale: 1 - i * 0.05,
            x: i * 25,
            y: -i * 25,
            zIndex: cards.length - i,
            opacity: i < 4 ? 1 - i * 0.2 : 0, 
            boxShadow: isTop 
              ? "0 0 40px rgba(168,85,247,0.4), inset 0 0 20px rgba(168,85,247,0.2)" 
              : "0 10px 30px rgba(0,0,0,0.5)",
          };

          return (
            <motion.div
              key={product.id}
              layout
              initial={false}
              animate={styles}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              onClick={() => {
                if (isTop) handleNextCard();
              }}
              className={`absolute top-0 left-0 right-0 mx-auto w-[90%] sm:w-full max-w-[480px] glass-card-strong transition-all overflow-hidden ${
                isTop ? "cursor-pointer" : ""
              }`}
              style={{
                border: isTop ? "2px solid rgba(168, 85, 247, 0.6)" : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5 select-none">
                {/* Product Visual */}
                <div
                  className="w-full sm:w-[55%] h-56 sm:h-auto min-h-[220px] rounded-2xl flex items-center justify-center relative flex-shrink-0"
                  style={{ background: product.gradient }}
                >
                  <Image 
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 480px"
                    className="object-contain p-2 drop-shadow-xl"
                  />
                </div>

                {/* Product Info */}
                <div className={`flex-1 flex flex-col justify-between transition-opacity duration-300 py-1 ${!isTop ? "opacity-0 invisible pointer-events-none" : "opacity-100"}`}>
                  <div>
                    <span
                      className="text-[10px] font-semibold text-neon-purple tracking-wider uppercase"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {product.brand} — {product.category}
                    </span>
                    <h3
                      className="text-lg sm:text-xl font-bold mt-1 mb-1 leading-tight"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-xl sm:text-2xl font-extrabold gradient-text mt-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      PKR {product.price.toLocaleString()}
                    </p>
                  </div>

                  <a 
                    href="#product"
                    onClick={(e) => {
                      if (!isTop) {
                        e.preventDefault();
                      } else {
                        e.stopPropagation();
                      }
                    }}
                    className={`btn-primary mt-6 text-sm px-6 py-2.5 w-full sm:w-auto ${
                      !isTop ? "pointer-events-none opacity-0" : "opacity-100"
                    } transition-opacity duration-300`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    View Product
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

