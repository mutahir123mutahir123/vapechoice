"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const discountSets = {
  weekend: [
    {
      id: 201,
      name: "Drip Down Cola Ice",
      brand: "Drip Down",
      originalPrice: 2500,
      salePrice: 1800,
      discount: 28,
      category: "Freebase E-Liquid",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      image: "/images/DRIP DOWN FREEBASE – VAPE CHOICE/imgi_11_Drip-Down-Cola-Ice-E-Liquids-60ml_360x.jpg",
    },
    {
      id: 202,
      name: "Lyon Passion Fruit",
      brand: "Lyon",
      originalPrice: 2000,
      salePrice: 1400,
      discount: 30,
      category: "Nic Salt",
      gradient: "linear-gradient(135deg, #f5576c 0%, #f093fb 100%)",
      image: "/images/Lyon Nic Salt – VAPE CHOICE/imgi_12_download_45a586e6-a61e-4aed-b67e-d45f004a98cc_360x.webp",
    },
    {
      id: 203,
      name: "YOZO Lemon Mint",
      brand: "YOZO",
      originalPrice: 1200,
      salePrice: 800,
      discount: 33,
      category: "Disposable",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      image: "/images/YOZO DISPOSABLE – VAPE CHOICE/imgi_11_900B5699-F016-455C-B09A-61DA5E8AB6AE_360x.jpg",
    },
    {
      id: 204,
      name: "Infinity Brain Freeze",
      brand: "Infinity",
      originalPrice: 2200,
      salePrice: 1500,
      discount: 32,
      category: "Nic Salt",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      image: "/images/Infinity Nic Salt – VAPE CHOICE/imgi_19_INFINITY_BRAIN_FREEZE_BLUEBERRY_WATERMELON_ICE_SALTNIC_30ML_55MG_360x.webp",
    },
    {
      id: 205,
      name: "VGOD Berry Bomb",
      brand: "VGOD",
      originalPrice: 2800,
      salePrice: 1900,
      discount: 32,
      category: "Freebase E-Liquid",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      image: "/images/Vgod Freebase E-Liquids – VAPE CHOICE/imgi_18_Berry-Bomb_360x.png",
    },
    {
      id: 206,
      name: "Tokyo Watermelon Ice",
      brand: "Tokyo",
      originalPrice: 1800,
      salePrice: 1200,
      discount: 33,
      category: "Nic Salt",
      gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      image: "/images/Tokyo nic salt – VAPE CHOICE/imgi_29_TOKYOSUPERCOOLWATERMELONBUBBLEGUMICESALTNIC30ML35MG_360x.webp",
    },
  ],
  monday: [
    {
      id: 207,
      name: "VGOD Mango Bomb",
      brand: "VGOD",
      originalPrice: 2800,
      salePrice: 2100,
      discount: 25,
      category: "Freebase E-Liquid",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      image: "/images/Vgod Freebase E-Liquids – VAPE CHOICE/imgi_12_mango-bombline-box_3_360x.png",
    },
    {
      id: 208,
      name: "IVG Regal Aloe Grape",
      brand: "IVG",
      originalPrice: 2800,
      salePrice: 1960,
      discount: 30,
      category: "Disposable",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      image: "/images/IVG – VAPE CHOICE/imgi_11_ivg-regal-5-6000-puffs-aloe-grape-ice_360x.webp",
    },
    {
      id: 209,
      name: "Drip Down Watermelon Grape",
      brand: "Drip Down",
      originalPrice: 2500,
      salePrice: 1750,
      discount: 30,
      category: "Freebase E-Liquid",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      image: "/images/DRIP DOWN FREEBASE – VAPE CHOICE/imgi_13_WatermelonGrape_360x.jpg",
    },
    {
      id: 210,
      name: "YOZO Watermelon",
      brand: "YOZO",
      originalPrice: 1200,
      salePrice: 840,
      discount: 30,
      category: "Disposable",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      image: "/images/YOZO DISPOSABLE – VAPE CHOICE/imgi_12_6E6D1BA5-F59F-40CD-B94F-0C02670888F2_360x.jpg",
    },
    {
      id: 211,
      name: "Lyon Mixed Berries",
      brand: "Lyon",
      originalPrice: 2000,
      salePrice: 1300,
      discount: 35,
      category: "Nic Salt",
      gradient: "linear-gradient(135deg, #f5576c 0%, #f093fb 100%)",
      image: "/images/Lyon Nic Salt – VAPE CHOICE/imgi_13_download_8b33b14c-ec71-49a4-8288-7b8756289c57_360x.webp",
    },
    {
      id: 212,
      name: "Infinity Tropical Peach",
      brand: "Infinity",
      originalPrice: 2200,
      salePrice: 1540,
      discount: 30,
      category: "Nic Salt",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      image: "/images/Infinity Nic Salt – VAPE CHOICE/imgi_24_tropical-peach-ice_1_180x.webp",
    },
  ],
  midweek: [
    {
      id: 213,
      name: "Tokyo Super Cool",
      brand: "Tokyo",
      originalPrice: 1800,
      salePrice: 1260,
      discount: 30,
      category: "Nic Salt",
      gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      image: "/images/Tokyo nic salt – VAPE CHOICE/imgi_15_Super-Cool-05_1445x_30e23352-fe44-4cc3-a6b5-46021a100651_360x.webp",
    },
    {
      id: 214,
      name: "IVG Red Apple Ice",
      brand: "IVG",
      originalPrice: 3200,
      salePrice: 2240,
      discount: 30,
      category: "Disposable",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      image: "/images/IVG – VAPE CHOICE/imgi_13_IVG-Disposable-Red-Apple-Ice-8k-Puffs-35mg_360x.webp",
    },
    {
      id: 215,
      name: "Lyon Blue Razz",
      brand: "Lyon",
      originalPrice: 2000,
      salePrice: 1300,
      discount: 35,
      category: "Nic Salt",
      gradient: "linear-gradient(135deg, #f5576c 0%, #f093fb 100%)",
      image: "/images/Lyon Nic Salt – VAPE CHOICE/imgi_19_download_d1c2a95d-ff14-4d52-a53a-4d8c17736a7a_360x.webp",
    },
    {
      id: 216,
      name: "YOZO Grape",
      brand: "YOZO",
      originalPrice: 1200,
      salePrice: 840,
      discount: 30,
      category: "Disposable",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      image: "/images/YOZO DISPOSABLE – VAPE CHOICE/imgi_13_315084A6-4E41-4322-AA2E-EE0AC306C0FE_360x.jpg",
    },
    {
      id: 217,
      name: "Infinity Mixed Melon",
      brand: "Infinity",
      originalPrice: 2200,
      salePrice: 1650,
      discount: 25,
      category: "Nic Salt",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      image: "/images/Infinity Nic Salt – VAPE CHOICE/imgi_21_INFINITY_BRAIN_FREEZE_MIXED_MELON_ICE_SALTNIC_30ML_540x_1_360x.webp",
    },
    {
      id: 218,
      name: "IVG Guava Ice",
      brand: "IVG",
      originalPrice: 3200,
      salePrice: 2400,
      discount: 25,
      category: "Disposable",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      image: "/images/IVG – VAPE CHOICE/imgi_14_IVG-8000-Puffs-Guava-Ice-3_360x.jpg",
    },
  ],
  friday: [
    {
      id: 219,
      name: "Tokyo Classic",
      brand: "Tokyo",
      originalPrice: 1800,
      salePrice: 1170,
      discount: 35,
      category: "Nic Salt",
      gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      image: "/images/Tokyo nic salt – VAPE CHOICE/imgi_12_Classic-05_1445x_3f52c87e-5980-4a6f-aeeb-2576e3b7c0b3_360x.webp",
    },
    {
      id: 220,
      name: "YOZO Berry",
      brand: "YOZO",
      originalPrice: 1200,
      salePrice: 720,
      discount: 40,
      category: "Disposable",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      image: "/images/YOZO DISPOSABLE – VAPE CHOICE/imgi_14_D0715E9E-22EA-4F21-B6D5-CF77CFB51DAA_360x.webp",
    },
    {
      id: 221,
      name: "Lyon Passion Fruit",
      brand: "Lyon",
      originalPrice: 2000,
      salePrice: 1200,
      discount: 40,
      category: "Nic Salt",
      gradient: "linear-gradient(135deg, #f5576c 0%, #f093fb 100%)",
      image: "/images/Lyon Nic Salt – VAPE CHOICE/imgi_12_download_45a586e6-a61e-4aed-b67e-d45f004a98cc_360x.webp",
    },
    {
      id: 222,
      name: "IVG Regal Berry Lemonade",
      brand: "IVG",
      originalPrice: 2800,
      salePrice: 1960,
      discount: 30,
      category: "Disposable",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      image: "/images/IVG – VAPE CHOICE/imgi_12_ivg-regal-5-6000-puffs-berry-lemonade-ice-510x510-ezgif.com-webp-to-jpg-converter_360x.webp",
    },
    {
      id: 223,
      name: "Drip Down Cola Ice",
      brand: "Drip Down",
      originalPrice: 2500,
      salePrice: 1750,
      discount: 30,
      category: "Freebase E-Liquid",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      image: "/images/DRIP DOWN FREEBASE – VAPE CHOICE/imgi_11_Drip-Down-Cola-Ice-E-Liquids-60ml_360x.jpg",
    },
    {
      id: 224,
      name: "Infinity Classic",
      brand: "Infinity",
      originalPrice: 2200,
      salePrice: 1540,
      discount: 30,
      category: "Nic Salt",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      image: "/images/Infinity Nic Salt – VAPE CHOICE/imgi_15_2670886000302_2048x_fe2922b6-4eb1-4ae6-9133-8ac04c138fd6_360x.webp",
    },
  ],
};

const getDiscountSet = () => {
  const day = new Date().getDay();
  const hour = new Date().getHours();
  
  if (day === 0 || day === 6) return { products: discountSets.weekend, title: "Weekend Special Deals" };
  if (day === 1) return { products: discountSets.monday, title: "Monday Flash Sales" };
  if (day === 2 || day === 3) return { products: discountSets.midweek, title: "Midweek Madness" };
  if (day === 4) return { products: discountSets.midweek, title: "Thursday Deals" };
  if (day === 5) return { products: discountSets.friday, title: "Friday Frenzy" };
  return { products: discountSets.weekend, title: "Weekend Special Deals" };
};

function CountdownTimer() {
  const [time, setTime] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex gap-3 justify-center mb-10">
      {[
        { label: "Hours", value: time.hours },
        { label: "Minutes", value: time.minutes },
        { label: "Seconds", value: time.seconds },
      ].map((unit) => (
        <div key={unit.label} className="text-center">
          <div
            className="glass-card w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-2xl sm:text-3xl font-bold text-neon-purple"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {pad(unit.value)}
          </div>
          <span
            className="text-white/40 text-xs mt-1 block"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function DiscountSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const [discountInfo, setDiscountInfo] = useState(getDiscountSet());

  useEffect(() => {
    const interval = setInterval(() => {
      setDiscountInfo(getDiscountSet());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const discountProducts = discountInfo.products;

  const handleAddToCart = (e: React.MouseEvent, product: typeof discountProducts[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.salePrice,
      image: product.image,
      variant: product.category,
    });
  };

  return (
    <section
      id="discounts"
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 80%, rgba(168,85,247,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.06) 0%, transparent 50%), linear-gradient(180deg, rgba(15,12,41,1) 0%, rgba(10,8,25,1) 50%, rgba(15,12,41,1) 100%)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-6">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-red-500/10 text-red-400 border border-red-500/20 mb-4"
            style={{ fontFamily: "var(--font-body)" }}
          >
            🔥 {discountInfo.title}
          </span>
          <h2 className="section-title">
            <span className="gradient-text">Sale Zone</span>
          </h2>
          <p className="section-subtitle">
            Don&apos;t miss out on these incredible deals — limited stock
            available!
          </p>
        </div>

        <CountdownTimer />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {discountProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="glass-card group cursor-pointer overflow-hidden relative"
            >
              <div className="absolute top-4 right-4 z-20">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-red-500 text-white animate-badge-pulse">
                  {product.discount}% OFF
                </span>
              </div>

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px]"
                style={{
                  boxShadow:
                    "inset 0 0 40px rgba(168,85,247,0.1), 0 0 30px rgba(168,85,247,0.15)",
                }}
              />

              <Link href={`/product/${product.id}`} className="block">
              <div
                className="h-44 flex items-center justify-center rounded-t-[20px] relative overflow-hidden"
                style={{ background: product.gradient }}
              >
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-3 drop-shadow-xl"
                />
              </div>
              </Link>

              <div className="p-5">
                <span
                  className="text-[11px] font-semibold text-white/40 tracking-wider uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {product.brand} — {product.category}
                </span>
                <h3
                  className="text-lg font-bold mt-1 mb-3 group-hover:text-neon-purple transition-colors duration-300"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  <Link href={`/product/${product.id}`} className="hover:text-neon-purple">
                  {product.name}
                  </Link>
                </h3>

                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-2xl font-extrabold text-neon-purple"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    PKR {product.salePrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-white/30 line-through">
                    PKR {product.originalPrice.toLocaleString()}
                  </span>
                </div>

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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}