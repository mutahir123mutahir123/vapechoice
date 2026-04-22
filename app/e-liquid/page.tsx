"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import AgeGate from "@/components/AgeGate";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

export const dynamic = "force-dynamic";

const eLiquidProducts = [
  {
    id: 1,
    name: "Drip Down Cola Ice",
    brand: "Drip Down",
    price: 3200,
    image: "/images/DRIP DOWN FREEBASE – VAPE CHOICE/imgi_11_Drip-Down-Cola-Ice-E-Liquids-60ml_360x.jpg",
    category: "Freebase",
    sizes: [60, 100],
    nicotine: [3, 6, 12, 25],
  },
  {
    id: 2,
    name: "VGOD Berry Bomb",
    brand: "VGOD",
    price: 2800,
    image: "/images/Vgod Freebase E-Liquids – VAPE CHOICE/imgi_18_Berry-Bomb_360x.png",
    category: "Freebase",
    sizes: [60, 100],
    nicotine: [3, 6, 12, 25],
  },
  {
    id: 3,
    name: "Tokyo Super Cool",
    brand: "Tokyo",
    price: 1800,
    image: "/images/Tokyo nic salt – VAPE CHOICE/imgi_15_Super-Cool-05_1445x_30e23352-fe44-4cc3-a6b5-46021a100651_360x.webp",
    category: "Nic Salt",
    sizes: [30],
    nicotine: [10, 25, 35, 50],
  },
  {
    id: 4,
    name: "Infinity Brain Freeze",
    brand: "Infinity",
    price: 2200,
    image: "/images/Infinity Nic Salt – VAPE CHOICE/imgi_19_INFINITY_BRAIN_FREEZE_BLUEBERRY_WATERMELON_ICE_SALTNIC_30ML_55MG_360x.webp",
    category: "Nic Salt",
    sizes: [30],
    nicotine: [10, 25, 35, 50],
  },
  {
    id: 5,
    name: "Lyon Passion Fruit",
    brand: "Lyon",
    price: 2000,
    image: "/images/Lyon Nic Salt – VAPE CHOICE/imgi_12_download_45a586e6-a61e-4aed-b67e-d45f004a98cc_360x.webp",
    category: "Nic Salt",
    sizes: [30],
    nicotine: [10, 25, 35, 50],
  },
  {
    id: 6,
    name: "Drip Down Watermelon Grape",
    brand: "Drip Down",
    price: 3200,
    image: "/images/DRIP DOWN FREEBASE – VAPE CHOICE/imgi_13_WatermelonGrape_360x.jpg",
    category: "Freebase",
    sizes: [60, 100],
    nicotine: [3, 6, 12, 25],
  },
  {
    id: 7,
    name: "VGOD Mango Bomb",
    brand: "VGOD",
    price: 2800,
    image: "/images/Vgod Freebase E-Liquids – VAPE CHOICE/imgi_12_mango-bombline-box_3_360x.png",
    category: "Freebase",
    sizes: [60, 100],
    nicotine: [3, 6, 12, 25],
  },
  {
    id: 8,
    name: "Tokyo Classic",
    brand: "Tokyo",
    price: 1800,
    image: "/images/Tokyo nic salt – VAPE CHOICE/imgi_12_Classic-05_1445x_3f52c87e-5980-4a6f-aeeb-2576e3b7c0b3_360x.webp",
    category: "Nic Salt",
    sizes: [30],
    nicotine: [10, 25, 35, 50],
  },
  {
    id: 9,
    name: "Lyon Mixed Berries",
    brand: "Lyon",
    price: 2000,
    image: "/images/Lyon Nic Salt – VAPE CHOICE/imgi_13_download_8b33b14c-ec71-49a4-8288-7b8756289c57_360x.webp",
    category: "Nic Salt",
    sizes: [30],
    nicotine: [10, 25, 35, 50],
  },
  {
    id: 10,
    name: "Infinity Tropical Peach",
    brand: "Infinity",
    price: 2200,
    image: "/images/Infinity Nic Salt – VAPE CHOICE/imgi_24_tropical-peach-ice_1_180x.webp",
    category: "Nic Salt",
    sizes: [30],
    nicotine: [10, 25, 35, 50],
  },
  {
    id: 11,
    name: "Infinity Mixed Melon",
    brand: "Infinity",
    price: 2200,
    image: "/images/Infinity Nic Salt – VAPE CHOICE/imgi_21_INFINITY_BRAIN_FREEZE_MIXED_MELON_ICE_SALTNIC_30ML_540x_1_360x.webp",
    category: "Nic Salt",
    sizes: [30],
    nicotine: [10, 25, 35, 50],
  },
  {
    id: 12,
    name: "Lyon Blue Razz",
    brand: "Lyon",
    price: 2000,
    image: "/images/Lyon Nic Salt – VAPE CHOICE/imgi_19_download_d1c2a95d-ff14-4d52-a53a-4d8c17736a7a_360x.webp",
    category: "Nic Salt",
    sizes: [30],
    nicotine: [10, 25, 35, 50],
  },
];

function ELiquidsContent() {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent, product: typeof eLiquidProducts[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      variant: product.category,
    });
  };

  return (
    <section
      className="relative py-20 sm:py-28 min-h-screen"
    >
      <div className="flex items-center justify-between mb-16 px-4 max-w-7xl mx-auto">
        <div className="flex-1">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span className="hidden md:inline">Back</span>
          </button>
        </div>
        <div className="text-center flex-1">
          <span
            className="text-pink-500 text-sm font-semibold tracking-[0.2em] uppercase hidden md:block"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Premium Flavors
          </span>
          <h2 className="section-title mt-2">
            <span className="gradient-text">E-Liquids</span>
          </h2>
          <p className="section-subtitle hidden md:block">
            Explore our wide range of e-liquid flavors and nicotine options
          </p>
        </div>
        <div className="flex-1" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {eLiquidProducts.map((product, i) => (
            <motion.a
              href={`/product/${product.id}`}
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="glass-card group cursor-pointer overflow-hidden"
              style={{
                border: hoveredId === product.id ? "2px solid rgba(236,72,153,0.6)" : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="relative h-40 sm:h-56 overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: product.category === "Nic Salt" 
                      ? "linear-gradient(135deg, #ec4899, #9f1239)"
                      : "linear-gradient(135deg, #f5576c, #f093fb)",
                  }}
                />
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-2 left-2 px-2 py-1 text-[9px] font-bold rounded-full bg-white/20 text-white">
                  {product.category}
                </span>
              </div>

              <div className="p-1.5 sm:p-4">
                <span
                  className="text-[8px] sm:text-[10px] font-semibold text-pink-500 tracking-wider uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {product.brand}
                </span>
                <h3
                  className="text-xs sm:text-sm font-bold mt-1 mb-1 sm:mb-2 group-hover:text-pink-500 transition-colors duration-300 line-clamp-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {product.name}
                </h3>
                <div className="flex flex-wrap gap-1 mb-1 sm:mb-2">
                  {product.nicotine.map((nic) => (
                    <span
                      key={nic}
                      className="text-[8px] px-1 py-0.5 rounded bg-white/10 text-white/60"
                    >
                      {nic}mg
                    </span>
                  ))}
                </div>
                <p
                  className="text-base sm:text-lg font-extrabold text-pink-500"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  PKR {product.price.toLocaleString()}
                </p>
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="btn-primary w-full text-[10px] py-1.5"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ELiquidsPage() {
  return (
    <>
      <AgeGate />
      <Navbar />
      <div className="min-h-screen">
        <ELiquidsContent />
      </div>
      <Footer />
    </>
  );
}