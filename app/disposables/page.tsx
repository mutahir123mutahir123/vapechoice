"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AgeGate from "@/components/AgeGate";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

export const dynamic = "force-dynamic";

const disposableProducts = [
  {
    id: 101,
    name: "YOZO Lemon Mint",
    brand: "YOZO",
    price: 1200,
    image: "/images/YOZO DISPOSABLE – VAPE CHOICE/imgi_11_900B5699-F016-455C-B09A-61DA5E8AB6AE_360x.jpg",
    puffs: 900,
    category: "Disposable",
  },
  {
    id: 102,
    name: "YOZO Watermelon",
    brand: "YOZO",
    price: 1200,
    image: "/images/YOZO DISPOSABLE – VAPE CHOICE/imgi_12_6E6D1BA5-F59F-40CD-B94F-0C02670888F2_360x.jpg",
    puffs: 900,
    category: "Disposable",
  },
  {
    id: 103,
    name: "YOZO Grape",
    brand: "YOZO",
    price: 1200,
    image: "/images/YOZO DISPOSABLE – VAPE CHOICE/imgi_13_315084A6-4E41-4322-AA2E-EE0AC306C0FE_360x.jpg",
    puffs: 900,
    category: "Disposable",
  },
  {
    id: 104,
    name: "YOZO Berry",
    brand: "YOZO",
    price: 1200,
    image: "/images/YOZO DISPOSABLE – VAPE CHOICE/imgi_14_D0715E9E-22EA-4F21-B6D5-CF77CFB51DAA_360x.webp",
    puffs: 900,
    category: "Disposable",
  },
  {
    id: 105,
    name: "IVG Regal Aloe Grape",
    brand: "IVG",
    price: 2800,
    image: "/images/IVG – VAPE CHOICE/imgi_11_ivg-regal-5-6000-puffs-aloe-grape-ice_360x.webp",
    puffs: 6000,
    category: "Disposable",
  },
  {
    id: 106,
    name: "IVG Regal Berry Lemonade",
    brand: "IVG",
    price: 2800,
    image: "/images/IVG – VAPE CHOICE/imgi_12_ivg-regal-5-6000-puffs-berry-lemonade-ice-510x510-ezgif.com-webp-to-jpg-converter_360x.webp",
    puffs: 6000,
    category: "Disposable",
  },
  {
    id: 107,
    name: "IVG Red Apple Ice",
    brand: "IVG",
    price: 3200,
    image: "/images/IVG – VAPE CHOICE/imgi_13_IVG-Disposable-Red-Apple-Ice-8k-Puffs-35mg_360x.webp",
    puffs: 8000,
    category: "Disposable",
  },
  {
    id: 108,
    name: "IVG Guava Ice",
    brand: "IVG",
    price: 3200,
    image: "/images/IVG – VAPE CHOICE/imgi_14_IVG-8000-Puffs-Guava-Ice-3_360x.jpg",
    puffs: 8000,
    category: "Disposable",
  },
  {
    id: 109,
    name: "Infinity Classic",
    brand: "Infinity",
    price: 1500,
    image: "/images/Infinity Nic Salt – VAPE CHOICE/imgi_15_2670886000302_2048x_fe2922b6-4eb1-4ae6-9133-8ac04c138fd6_360x.webp",
    puffs: 3500,
    category: "Disposable",
  },
  {
    id: 110,
    name: "Infinity Blue Razz",
    brand: "Infinity",
    price: 1500,
    image: "/images/Infinity Nic Salt – VAPE CHOICE/imgi_21_INFINITY_BRAIN_FREEZE_MIXED_MELON_ICE_SALTNIC_30ML_540x_1_360x (1).webp",
    puffs: 3500,
    category: "Disposable",
  },
  {
    id: 111,
    name: "YOZO Mango",
    brand: "YOZO",
    price: 1200,
    image: "/images/YOZO DISPOSABLE – VAPE CHOICE/imgi_11_900B5699-F016-455C-B09A-61DA5E8AB6AE_360x.jpg",
    puffs: 900,
    category: "Disposable",
  },
  {
    id: 112,
    name: "IVG Watermelon Wave",
    brand: "IVG",
    price: 2800,
    image: "/images/IVG – VAPE CHOICE/imgi_11_ivg-regal-5-6000-puffs-aloe-grape-ice_360x.webp",
    puffs: 6000,
    category: "Disposable",
  },
];

function DisposableContent() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent, product: typeof disposableProducts[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      variant: `${product.puffs} puffs`,
    });
  };

  return (
    <section
      className="relative py-20 sm:py-28 min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(245,158,11,0.15) 0%, rgba(15,12,41,1) 70%)",
      }}
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
            className="text-amber-500 text-sm font-semibold tracking-[0.2em] uppercase hidden md:block"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Ready to Use
          </span>
          <h2 className="section-title mt-2">
            <span className="gradient-text">Disposable Vapes</span>
          </h2>
          <p className="section-subtitle hidden md:block">
            Perfect for on-the-go vaping — no charging needed
          </p>
        </div>
        <div className="flex-1" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {disposableProducts.map((product, i) => (
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
                border: hoveredId === product.id ? "2px solid rgba(245,158,11,0.6)" : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Link href={`/product/${product.id}`}>
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, #f59e0b, #c2410c)",
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
                    boxShadow: "inset 0 0 40px rgba(245,158,11,0.2)",
                  }}
                />
              </div>
              </Link>

              <div className="p-5">
                <span
                  className="text-[10px] font-semibold text-amber-500 tracking-wider uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {product.brand} — {product.puffs} puffs
                </span>
                <Link href={`/product/${product.id}`}>
                <h3
                  className="text-lg font-bold mt-1 mb-2 group-hover:text-amber-500 transition-colors duration-300"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {product.name}
                </h3>
                </Link>
                <p
                  className="text-xl font-extrabold text-amber-500"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  PKR {product.price.toLocaleString()}
                </p>
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="btn-primary w-full text-sm py-2.5"
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

export default function DisposablesPage() {
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
        <DisposableContent />
      </div>
      <Footer />
    </>
  );
}