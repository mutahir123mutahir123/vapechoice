"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AgeGate from "@/components/AgeGate";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

export const dynamic = "force-dynamic";

const vapeProducts = [
  {
    id: 1,
    name: "SMOK Morph 2",
    brand: "SMOK",
    price: 8500,
    image: "/images/Uwell Pod Kits – VAPE CHOICE/imgi_21_uwell-caliburn-g4-pro-pod-vape-kit-stripe-black_360x.webp",
    category: "Box Mod",
  },
  {
    id: 2,
    name: "Vaporesso Luxe X",
    brand: "Vaporesso",
    price: 6500,
    image: "/images/Aspire Pod Kits – VAPE CHOICE/imgi_20_store-minican-plus-4-600x809_360x.webp",
    category: "Pod System",
  },
  {
    id: 3,
    name: "VOOPOO Drag X",
    brand: "VOOPOO",
    price: 7000,
    image: "/images/Aspire Pod Kits – VAPE CHOICE/imgi_16_blue-1_360x.webp",
    category: "Pod Mod",
  },
  {
    id: 4,
    name: "Uwell Caliburn G4",
    brand: "Uwell",
    price: 5500,
    image: "/images/Uwell Pod Kits – VAPE CHOICE/imgi_22_uwell-caliburn-g4-pro-pod-vape-kit-desert-gold_67c49cd1-8ab5-4482-8a25-83c255592749_360x.webp",
    category: "Pod System",
  },
  {
    id: 5,
    name: "Aspire Minican Plus",
    brand: "Aspire",
    price: 3500,
    image: "/images/Aspire Pod Kits – VAPE CHOICE/imgi_19_store-minican-plus-2-600x809_360x.webp",
    category: "Pod Kit",
  },
  {
    id: 6,
    name: "SMOK Nord 5",
    brand: "SMOK",
    price: 4800,
    image: "/images/Aspire Pod Kits – VAPE CHOICE/imgi_21_aqua_blue_360x.webp",
    category: "Pod System",
  },
  {
    id: 7,
    name: "SMOK Mag Solo",
    brand: "SMOK",
    price: 5800,
    image: "/images/Aspire Pod Kits – VAPE CHOICE/imgi_23_blue_8ccc2408-3ec4-4132-97f5-364a56d8a8f8_360x.webp",
    category: "Box Mod",
  },
  {
    id: 8,
    name: "Aspire Cyber G",
    brand: "Aspire",
    price: 6200,
    image: "/images/Aspire Pod Kits – VAPE CHOICE/imgi_27_black_18550a23-64e7-4bbc-8206-92e8b724714f_360x.webp",
    category: "Box Mod",
  },
  {
    id: 9,
    name: "Vaporesso GEN PT60",
    brand: "Vaporesso",
    price: 7200,
    image: "/images/Aspire Pod Kits – VAPE CHOICE/imgi_26_goldblue_360x.webp",
    category: "Pod Mod",
  },
];

function VapesContent() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent, product: typeof vapeProducts[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <section
      className="relative py-20 sm:py-28 min-h-screen"
    >
      <div className="flex items-center justify-between mb-16 px-4 max-w-7xl mx-auto">
        <div className="flex-1">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
        </div>
        <div className="text-center flex-1">
          <span
            className="text-neon-purple text-sm font-semibold tracking-[0.2em] uppercase hidden md:block"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Premium Selection
          </span>
          <h2 className="section-title mt-2">
            <span className="gradient-text">Vapes & Mods</span>
          </h2>
          <p className="section-subtitle hidden md:block">
            Explore our collection of high-performance vaping devices
          </p>
        </div>
        <div className="flex-1" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {vapeProducts.map((product, i) => (
            <motion.a
              href={`/product/${product.id}`}
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="glass-card group cursor-pointer overflow-hidden"
              style={{
                border: hoveredId === product.id ? "2px solid rgba(168, 85, 247, 0.6)" : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #4c1d95)",
                  }}
                />
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    hoveredId === product.id ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    boxShadow: "inset 0 0 40px rgba(168,85,247,0.2)",
                  }}
                />
              </div>

              <div className="p-2 sm:p-5">
                <span
                  className="text-[8px] sm:text-[10px] font-semibold text-neon-purple tracking-wider uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {product.brand} — {product.category}
                </span>
                <h3
                  className="text-sm sm:text-base font-bold mt-1 mb-1 sm:mb-2 group-hover:text-neon-purple transition-colors duration-300"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-base sm:text-lg font-extrabold gradient-text"
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

export default function VapesPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden) {
        setRefreshKey(k => k + 1);
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <>
      <AgeGate />
      <Navbar />
      <div className="min-h-screen" key={refreshKey}>
        <VapesContent />
      </div>
      <Footer />
    </>
  );
}