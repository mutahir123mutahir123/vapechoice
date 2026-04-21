"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import AgeGate from "@/components/AgeGate";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const products: Record<number, {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  productType?: 'pod' | 'eliquid' | 'disposable';
  nicotineOptions?: number[];
  sizes?: number[];
}> = {
  1: {
    id: 1,
    name: "Uwell Caliburn G4 Pro",
    brand: "Uwell",
    price: 5500,
    originalPrice: 6500,
    image: "/images/Uwell Pod Kits – VAPE CHOICE/imgi_21_uwell-caliburn-g4-pro-pod-vape-kit-stripe-black_360x.webp",
    category: "Pod System",
    description: "The Uwell Caliburn G4 Pro is a powerful and sleek pod system that delivers exceptional flavor and vapor production. With its 650mAh battery and 15W maximum output, it's perfect for both beginners and experienced vapers.",
    features: [
      "650mAh built-in battery",
      "15W maximum output",
      "2ml pod capacity",
      "Side-fill system",
      "Pro-FOCS flavor technology",
      "Multiple color options",
    ],
    specs: {
      Battery: "650mAh",
      Output: "15W",
      Capacity: "2ml",
      Weight: "42g",
    },
    productType: 'pod',
  },
  2: {
    id: 2,
    name: "Drip Down Cola Ice",
    brand: "Drip Down",
    price: 3200,
    originalPrice: 4000,
    image: "/images/DRIP DOWN FREEBASE – VAPE CHOICE/imgi_11_Drip-Down-Cola-Ice-E-Liquids-60ml_360x.jpg",
    category: "Freebase E-Liquid",
    description: "Experience the refreshing taste of classic cola with a cool icy twist.",
    features: [
      "Premium quality ingredients",
      "70/30 VG/PG ratio",
      "60ml bottle size",
      "Multiple nicotine strengths",
      "Made in USA",
    ],
    specs: {
      Size: "60ml",
      VGPG: "70/30",
      Flavors: "Cola, Menthol",
    },
    productType: 'eliquid',
    nicotineOptions: [3, 6, 12, 25],
    sizes: [60],
  },
  3: {
    id: 3,
    name: "Tokyo Super Cool",
    brand: "Tokyo",
    price: 1800,
    originalPrice: 2200,
    image: "/images/Tokyo nic salt – VAPE CHOICE/imgi_15_Super-Cool-05_1445x_30e23352-fe44-4cc3-a6b5-46021a100651_360x.webp",
    category: "Nic Salt",
    description: "A refreshing blend of juicy watermelon and bubblegum with a cool ice finish.",
    features: [
      "High nicotine salt formula",
      "50/50 VG/PG ratio",
      "30ml bottle size",
      "Smooth throat hit",
      "Fast absorption",
    ],
    specs: {
      Size: "30ml",
      VGPG: "50/50",
      Flavors: "Watermelon, Bubblegum, Ice",
    },
    productType: 'eliquid',
    nicotineOptions: [10, 25, 35, 50],
    sizes: [30],
  },
  4: {
    id: 4,
    name: "Aspire Minican Plus",
    brand: "VGOD",
    price: 2800,
    originalPrice: 3500,
    image: "/images/Vgod Freebase E-Liquids – VAPE CHOICE/imgi_18_Berry-Bomb_360x.png",
    category: "Freebase E-Liquid",
    description: "An explosive blend of mixed berries that delivers a burst of sweet and tangy flavor.",
    features: [
      "High VG formula",
      "70/30 VG/PG ratio",
      "60ml bottle",
      "Premium US ingredients",
    ],
    specs: {
      Size: "60ml",
      VGPG: "70/30",
      Flavors: "Mixed Berries",
    },
    productType: 'eliquid',
    nicotineOptions: [3, 6, 12, 25],
    sizes: [60],
  },
  // YOZO Disposables
  101: {
    id: 101,
    name: "YOZO Lemon Mint",
    brand: "YOZO",
    price: 1200,
    originalPrice: 1500,
    image: "/images/YOZO DISPOSABLE – VAPE CHOICE/imgi_11_900B5699-F016-455C-B09A-61DA5E8AB6AE_360x.jpg",
    category: "Disposable",
    description: "Refreshing lemon mint flavor with 900 puffs. Perfect for on-the-go vaping.",
    features: ["900 puffs", "Pre-charged ready to use", "Compact design"],
    specs: { Puffs: "900", Flavor: "Lemon Mint" },
    productType: 'disposable',
  },
  102: {
    id: 102,
    name: "YOZO Watermelon",
    brand: "YOZO",
    price: 1200,
    originalPrice: 1500,
    image: "/images/YOZO DISPOSABLE – VAPE CHOICE/imgi_12_6E6D1BA5-F59F-40CD-B94F-0C02670888F2_360x.jpg",
    category: "Disposable",
    description: "Sweet watermelon flavor with 900 puffs.",
    features: ["900 puffs", "Pre-charged ready to use", "Compact design"],
    specs: { Puffs: "900", Flavor: "Watermelon" },
    productType: 'disposable',
  },
  103: {
    id: 103,
    name: "YOZO Grape",
    brand: "YOZO",
    price: 1200,
    originalPrice: 1500,
    image: "/images/YOZO DISPOSABLE – VAPE CHOICE/imgi_13_315084A6-4E41-4322-AA2E-EE0AC306C0FE_360x.jpg",
    category: "Disposable",
    description: "Delicious grape flavor with 900 puffs.",
    features: ["900 puffs", "Pre-charged ready to use", "Compact design"],
    specs: { Puffs: "900", Flavor: "Grape" },
    productType: 'disposable',
  },
  104: {
    id: 104,
    name: "YOZO Berry",
    brand: "YOZO",
    price: 1200,
    originalPrice: 1500,
    image: "/images/YOZO DISPOSABLE – VAPE CHOICE/imgi_14_D0715E9E-22EA-4F21-B6D5-CF77CFB51DAA_360x.webp",
    category: "Disposable",
    description: "Mixed berry flavor with 900 puffs.",
    features: ["900 puffs", "Pre-charged ready to use", "Compact design"],
    specs: { Puffs: "900", Flavor: "Mixed Berry" },
    productType: 'disposable',
  },
  // IVG Disposables
  105: {
    id: 105,
    name: "IVG Regal Aloe Grape",
    brand: "IVG",
    price: 2800,
    originalPrice: 3500,
    image: "/images/IVG – VAPE CHOICE/imgi_11_ivg-regal-5-6000-puffs-aloe-grape-ice_360x.webp",
    category: "Disposable",
    description: "Premium aloe grape ice flavor with 6000 puffs.",
    features: ["6000 puffs", "Pre-charged ready to use", "Premium quality"],
    specs: { Puffs: "6000", Flavor: "Aloe Grape Ice" },
    productType: 'disposable',
  },
  106: {
    id: 106,
    name: "IVG Regal Berry Lemonade",
    brand: "IVG",
    price: 2800,
    originalPrice: 3500,
    image: "/images/IVG – VAPE CHOICE/imgi_12_ivg-regal-5-6000-puffs-berry-lemonade-ice-510x510-ezgif.com-webp-to-jpg-converter_360x.webp",
    category: "Disposable",
    description: "Refreshing berry lemonade flavor with 6000 puffs.",
    features: ["6000 puffs", "Pre-charged ready to use", "Premium quality"],
    specs: { Puffs: "6000", Flavor: "Berry Lemonade Ice" },
    productType: 'disposable',
  },
  107: {
    id: 107,
    name: "IVG Red Apple Ice",
    brand: "IVG",
    price: 3200,
    originalPrice: 4500,
    image: "/images/IVG – VAPE CHOICE/imgi_13_IVG-Disposable-Red-Apple-Ice-8k-Puffs-35mg_360x.webp",
    category: "Disposable",
    description: "Crisp red apple with cool ice finish. 8000 puffs.",
    features: ["8000 puffs", "Pre-charged ready to use", "Extra long-lasting"],
    specs: { Puffs: "8000", Flavor: "Red Apple Ice" },
    productType: 'disposable',
  },
  108: {
    id: 108,
    name: "IVG Guava Ice",
    brand: "IVG",
    price: 3200,
    originalPrice: 4500,
    image: "/images/IVG – VAPE CHOICE/imgi_14_IVG-8000-Puffs-Guava-Ice-3_360x.jpg",
    category: "Disposable",
    description: "Exotic guava with refreshing ice. 8000 puffs.",
    features: ["8000 puffs", "Pre-charged ready to use", "Extra long-lasting"],
    specs: { Puffs: "8000", Flavor: "Guava Ice" },
    productType: 'disposable',
  },
  // Additional Pod Products
  5: {
    id: 5,
    name: "Aspire Minican 2",
    brand: "Aspire",
    price: 2800,
    originalPrice: 3500,
    image: "/images/Aspire Pod Kits – VAPE CHOICE/imgi_25_matte-white_360x.webp",
    category: "Pod Kit",
    description: "Compact and lightweight pod system perfect for beginners.",
    features: ["350mAh battery", "2ml pod capacity", "USB-C charging"],
    specs: { Battery: "350mAh", Capacity: "2ml", Weight: "20g" },
    productType: 'pod',
  },
  6: {
    id: 6,
    name: "Uwell Caliburn AZ2",
    brand: "Uwell",
    price: 3800,
    originalPrice: 4500,
    image: "/images/Uwell Pod Kits – VAPE CHOICE/imgi_24_black-uwell-caliburn-az2-kit-vape-direct_360x.webp",
    category: "Pod System",
    description: "Enhanced version of the popular Caliburn A2 with improved battery life.",
    features: ["520mAh battery", "2ml pod capacity", "Pro-FOCS technology"],
    specs: { Battery: "520mAh", Output: "15W", Capacity: "2ml" },
    productType: 'pod',
  },
  7: {
    id: 7,
    name: "SMOK Nord 5",
    brand: "SMOK",
    price: 4800,
    originalPrice: 5500,
    image: "/images/Aspire Pod Kits – VAPE CHOICE/imgi_21_aqua_blue_360x.webp",
    category: "Pod System",
    description: "Advanced pod system with adjustable airflow and mesh coils.",
    features: ["2000mAh battery", "5ml pod capacity", "Adjustable airflow"],
    specs: { Battery: "2000mAh", Output: "5-80W", Capacity: "5ml" },
    productType: 'pod',
  },
  8: {
    id: 8,
    name: "VOOPOO Vinci pod",
    brand: "VOOPOO",
    price: 5200,
    originalPrice: 6000,
    image: "/images/Aspire Pod Kits – VAPE CHOICE/imgi_16_blue-1_360x.webp",
    category: "Pod Kit",
    description: "Innovative pod system with gene chip for instant firing.",
    features: ["1500mAh battery", "4.5ml pod capacity", "Gene chip"],
    specs: { Battery: "1500mAh", Output: "5-40W", Capacity: "4.5ml" },
    productType: 'pod',
  },
  9: {
    id: 9,
    name: "Aspire Minican Plus Gum",
    brand: "Aspire",
    price: 3200,
    originalPrice: 3800,
    image: "/images/Aspire Pod Kits – VAPE CHOICE/imgi_14_gum_684ec92e-1738-4cee-8372-490b01aeb09a_360x.webp",
    category: "Pod Kit",
    description: "Vibrant colored pod system with excellent flavor production.",
    features: ["350mAh battery", "2ml pod capacity", "Multiple color options"],
    specs: { Battery: "350mAh", Capacity: "2ml", Weight: "20g" },
    productType: 'pod',
  },
  // Additional E-Liquid Products
  51: {
    id: 51,
    name: "Drip Down Watermelon Grape",
    brand: "Drip Down",
    price: 3200,
    originalPrice: 4000,
    image: "/images/DRIP DOWN FREEBASE – VAPE CHOICE/imgi_13_WatermelonGrape_360x.jpg",
    category: "Freebase E-Liquid",
    description: "Sweet watermelon blended with grapey goodness.",
    features: ["60ml bottle", "70/30 VG/PG ratio", "Premium quality"],
    specs: { Size: "60ml", VGPG: "70/30", Flavors: "Watermelon, Grape" },
    productType: 'eliquid',
    nicotineOptions: [3, 6, 12, 25],
    sizes: [60],
  },
  52: {
    id: 52,
    name: "VGOD Mango Bomb",
    brand: "VGOD",
    price: 2800,
    originalPrice: 3500,
    image: "/images/Vgod Freebase E-Liquids – VAPE CHOICE/imgi_12_mango-bombline-box_3_360x.png",
    category: "Freebase E-Liquid",
    description: "Explosive mango flavor with tropical notes.",
    features: ["60ml bottle", "70/30 VG/PG ratio", "High VG for clouds"],
    specs: { Size: "60ml", VGPG: "70/30", Flavors: "Mango" },
    productType: 'eliquid',
    nicotineOptions: [3, 6, 12, 25],
    sizes: [60],
  },
  53: {
    id: 53,
    name: "Tokyo Classic",
    brand: "Tokyo",
    price: 1800,
    originalPrice: 2200,
    image: "/images/Tokyo nic salt – VAPE CHOICE/imgi_12_Classic-05_1445x_3f52c87e-5980-4a6f-aeeb-2576e3b7c0b3_360x.webp",
    category: "Nic Salt",
    description: "Classic tobacco flavor with smooth throat hit.",
    features: ["30ml bottle", "50/50 VG/PG ratio", "Rich tobacco taste"],
    specs: { Size: "30ml", VGPG: "50/50", Flavors: "Tobacco" },
productType: 'eliquid',
    nicotineOptions: [10, 25, 35, 50],
    sizes: [30],
  },
  55: {
    id: 55,
    name: "Infinity Tropical Peach",
    brand: "Infinity",
    price: 2200,
    originalPrice: 2800,
    image: "/images/Infinity Nic Salt – VAPE CHOICE/imgi_24_tropical-peach-ice_1_180x.webp",
    category: "Nic Salt",
    description: "Juicy tropical peach with refreshing ice.",
    features: ["30ml bottle", "50/50 VG/PG ratio", "High nicotine salt"],
    specs: { Size: "30ml", VGPG: "50/50", Flavors: "Tropical Peach, Ice" },
    productType: 'eliquid',
    nicotineOptions: [10, 25, 35, 50],
    sizes: [30],
  },
  10: {
    id: 10,
    name: "Infinity Mixed Melon",
    brand: "Infinity",
    price: 2200,
    originalPrice: 2800,
    image: "/images/Infinity Nic Salt – VAPE CHOICE/imgi_21_INFINITY_BRAIN_FREEZE_MIXED_MELON_ICE_SALTNIC_30ML_540x_1_360x.webp",
    category: "Nic Salt",
    description: "Assorted melon flavors with cool ice.",
    features: ["30ml bottle", "50/50 VG/PG ratio", "High nicotine salt"],
    specs: { Size: "30ml", VGPG: "50/50", Flavors: "Mixed Melon, Ice" },
    productType: 'eliquid',
    nicotineOptions: [10, 25, 35, 50],
    sizes: [30],
  },
  56: {
    id: 56,
    name: "Lyon Blue Razz",
    brand: "Lyon",
    price: 2000,
    originalPrice: 2500,
    image: "/images/Lyon Nic Salt – VAPE CHOICE/imgi_19_download_d1c2a95d-ff14-4d52-a53a-4d8c17736a7a_360x.webp",
    category: "Nic Salt",
    description: "Blue raspberry tartness with sweet finish.",
    features: ["30ml bottle", "50/50 VG/PG ratio", "Smooth throat hit"],
    specs: { Size: "30ml", VGPG: "50/50", Flavors: "Blue Razz" },
    productType: 'eliquid',
    nicotineOptions: [10, 25, 35, 50],
    sizes: [30],
  },
  57: {
    id: 57,
    name: "Vaporesso Luxe X",
    brand: "Vaporesso",
    price: 6500,
    originalPrice: 7500,
    image: "/images/Aspire Pod Kits – VAPE CHOICE/imgi_20_store-minican-plus-4-600x809_360x.webp",
    category: "Pod System",
    description: "Advanced pod system with digital display and adjustable settings.",
    features: ["1500mAh battery", "5ml pod capacity", "Digital display"],
    specs: { Battery: "1500mAh", Output: "5-40W", Capacity: "5ml" },
    productType: 'pod',
  },

  // Additional Disposable Products
  109: {
    id: 109,
    name: "Infinity Classic",
    brand: "Infinity",
    price: 1500,
    originalPrice: 2000,
    image: "/images/Infinity Nic Salt – VAPE CHOICE/imgi_15_2670886000302_2048x_fe2922b6-4eb1-4ae6-9133-8ac04c138fd6_360x.webp",
    category: "Disposable",
    description: "Classic disposable vape with 3500 puffs.",
    features: ["3500 puffs", "Pre-charged ready to use", "Compact design"],
    specs: { Puffs: "3500", Flavor: "Classic" },
    productType: 'disposable',
  },
  110: {
    id: 110,
    name: "Infinity Blue Razz",
    brand: "Infinity",
    price: 1500,
    originalPrice: 2000,
    image: "/images/Infinity Nic Salt – VAPE CHOICE/imgi_21_INFINITY_BRAIN_FREEZE_MIXED_MELON_ICE_SALTNIC_30ML_540x_1_360x (1).webp",
    category: "Disposable",
    description: "Blue raspberry flavor with 3500 puffs.",
    features: ["3500 puffs", "Pre-charged ready to use", "Compact design"],
    specs: { Puffs: "3500", Flavor: "Blue Razz" },
    productType: 'disposable',
  },
  111: {
    id: 111,
    name: "YOZO Mango",
    brand: "YOZO",
    price: 1200,
    originalPrice: 1500,
    image: "/images/YOZO DISPOSABLE – VAPE CHOICE/imgi_11_900B5699-F016-455C-B09A-61DA5E8AB6AE_360x.jpg",
    category: "Disposable",
    description: "Sweet mango flavor with 900 puffs.",
    features: ["900 puffs", "Pre-charged ready to use", "Compact design"],
    specs: { Puffs: "900", Flavor: "Mango" },
    productType: 'disposable',
  },
  112: {
    id: 112,
    name: "IVG Watermelon Wave",
    brand: "IVG",
    price: 2800,
    originalPrice: 3500,
    image: "/images/IVG – VAPE CHOICE/imgi_11_ivg-regal-5-6000-puffs-aloe-grape-ice_360x.webp",
    category: "Disposable",
    description: "Refreshing watermelon ice with 6000 puffs.",
    features: ["6000 puffs", "Pre-charged ready to use", "Premium quality"],
    specs: { Puffs: "6000", Flavor: "Watermelon Ice" },
    productType: 'disposable',
  },

  // Discount products
  201: {
    id: 201,
    name: "Drip Down Cola Ice",
    brand: "Drip Down",
    price: 1800,
    originalPrice: 2500,
    image: "/images/DRIP DOWN FREEBASE – VAPE CHOICE/imgi_11_Drip-Down-Cola-Ice-E-Liquids-60ml_360x.jpg",
    category: "Freebase E-Liquid",
    description: "Classic cola with cool icy twist. 28% off!",
    features: ["60ml bottle", "70/30 VG/PG ratio", "Premium quality"],
    specs: { Size: "60ml", VGPG: "70/30", Flavors: "Cola, Menthol" },
    productType: 'eliquid',
    nicotineOptions: [3, 6, 12, 25],
    sizes: [60],
  },
  202: {
    id: 202,
    name: "Lyon Passion Fruit",
    brand: "Lyon",
    price: 1400,
    originalPrice: 2000,
    image: "/images/Lyon Nic Salt – VAPE CHOICE/imgi_12_download_45a586e6-a61e-4aed-b67e-d45f004a98cc_360x.webp",
    category: "Nic Salt",
    description: "Tropical passion fruit. 30% off!",
    features: ["30ml bottle", "50/50 VG/PG ratio", "Smooth throat hit"],
    specs: { Size: "30ml", VGPG: "50/50", Flavors: "Passion Fruit" },
    productType: 'eliquid',
    nicotineOptions: [10, 25, 35, 50],
    sizes: [30],
  },
  203: {
    id: 203,
    name: "YOZO Lemon Mint",
    brand: "YOZO",
    price: 800,
    originalPrice: 1200,
    image: "/images/YOZO DISPOSABLE – VAPE CHOICE/imgi_11_900B5699-F016-455C-B09A-61DA5E8AB6AE_360x.jpg",
    category: "Disposable",
    description: "Refreshing lemon mint. 33% off!",
    features: ["900 puffs", "Pre-charged ready to use"],
    specs: { Puffs: "900", Flavor: "Lemon Mint" },
    productType: 'disposable',
  },
  204: {
    id: 204,
    name: "Infinity Brain Freeze",
    brand: "Infinity",
    price: 1500,
    originalPrice: 2200,
    image: "/images/Infinity Nic Salt – VAPE CHOICE/imgi_19_INFINITY_BRAIN_FREEZE_BLUEBERRY_WATERMELON_ICE_SALTNIC_30ML_55MG_360x.webp",
    category: "Nic Salt",
    description: "Blueberry watermelon ice. 32% off!",
    features: ["30ml bottle", "High nicotine salt", "Smooth throat hit"],
    specs: { Size: "30ml", VGPG: "50/50", Flavors: "Blueberry, Watermelon, Ice" },
    productType: 'eliquid',
    nicotineOptions: [10, 25, 35, 50],
    sizes: [30],
  },
  205: {
    id: 205,
    name: "VGOD Berry Bomb",
    brand: "VGOD",
    price: 1900,
    originalPrice: 2800,
    image: "/images/Vgod Freebase E-Liquids – VAPE CHOICE/imgi_18_Berry-Bomb_360x.png",
    category: "Freebase E-Liquid",
    description: "Explosive mixed berries. 32% off!",
    features: ["60ml bottle", "70/30 VG/PG ratio", "High VG for clouds"],
    specs: { Size: "60ml", VGPG: "70/30", Flavors: "Mixed Berries" },
    productType: 'eliquid',
    nicotineOptions: [3, 6, 12, 25],
    sizes: [60],
  },
  206: {
    id: 206,
    name: "Tokyo Watermelon Ice",
    brand: "Tokyo",
    price: 1200,
    originalPrice: 1800,
    image: "/images/Tokyo nic salt – VAPE CHOICE/imgi_29_TOKYOSUPERCOOLWATERMELONBUBBLEGUMICESALTNIC30ML35MG_360x.webp",
    category: "Nic Salt",
    description: "Juicy watermelon with ice. 33% off!",
    features: ["30ml bottle", "High nicotine salt", "Refreshing flavor"],
    specs: { Size: "30ml", VGPG: "50/50", Flavors: "Watermelon, Bubblegum, Ice" },
    productType: 'eliquid',
    nicotineOptions: [10, 25, 35, 50],
    sizes: [30],
  },
  // Additional discount products (rotating)
  207: {
    id: 207,
    name: "VGOD Mango Bomb",
    brand: "VGOD",
    price: 2100,
    originalPrice: 2800,
    image: "/images/Vgod Freebase E-Liquids – VAPE CHOICE/imgi_12_mango-bombline-box_3_360x.png",
    category: "Freebase E-Liquid",
    description: "Explosive mango flavor. 25% off!",
    features: ["60ml bottle", "70/30 VG/PG ratio", "High VG for clouds"],
    specs: { Size: "60ml", VGPG: "70/30", Flavors: "Mango" },
    productType: 'eliquid',
    nicotineOptions: [3, 6, 12, 25],
    sizes: [60],
  },
  208: {
    id: 208,
    name: "IVG Regal Aloe Grape",
    brand: "IVG",
    price: 1960,
    originalPrice: 2800,
    image: "/images/IVG – VAPE CHOICE/imgi_11_ivg-regal-5-6000-puffs-aloe-grape-ice_360x.webp",
    category: "Disposable",
    description: "Premium aloe grape ice. 30% off!",
    features: ["6000 puffs", "Pre-charged ready to use"],
    specs: { Puffs: "6000", Flavor: "Aloe Grape Ice" },
    productType: 'disposable',
  },
  209: {
    id: 209,
    name: "Drip Down Watermelon Grape",
    brand: "Drip Down",
    price: 1750,
    originalPrice: 2500,
    image: "/images/DRIP DOWN FREEBASE – VAPE CHOICE/imgi_13_WatermelonGrape_360x.jpg",
    category: "Freebase E-Liquid",
    description: "Sweet watermelon grape. 30% off!",
    features: ["60ml bottle", "70/30 VG/PG ratio", "Premium quality"],
    specs: { Size: "60ml", VGPG: "70/30", Flavors: "Watermelon, Grape" },
    productType: 'eliquid',
    nicotineOptions: [3, 6, 12, 25],
    sizes: [60],
  },
  210: {
    id: 210,
    name: "YOZO Watermelon",
    brand: "YOZO",
    price: 840,
    originalPrice: 1200,
    image: "/images/YOZO DISPOSABLE – VAPE CHOICE/imgi_12_6E6D1BA5-F59F-40CD-B94F-0C02670888F2_360x.jpg",
    category: "Disposable",
    description: "Sweet watermelon. 30% off!",
    features: ["900 puffs", "Pre-charged ready to use"],
    specs: { Puffs: "900", Flavor: "Watermelon" },
    productType: 'disposable',
  },
  211: {
    id: 211,
    name: "Lyon Mixed Berries",
    brand: "Lyon",
    price: 1300,
    originalPrice: 2000,
    image: "/images/Lyon Nic Salt – VAPE CHOICE/imgi_13_download_8b33b14c-ec71-49a4-8288-7b8756289c57_360x.webp",
    category: "Nic Salt",
    description: "Mixed berries. 35% off!",
    features: ["30ml bottle", "50/50 VG/PG ratio", "Smooth throat hit"],
    specs: { Size: "30ml", VGPG: "50/50", Flavors: "Mixed Berries" },
    productType: 'eliquid',
    nicotineOptions: [10, 25, 35, 50],
    sizes: [30],
  },
  212: {
    id: 212,
    name: "Infinity Tropical Peach",
    brand: "Infinity",
    price: 1540,
    originalPrice: 2200,
    image: "/images/Infinity Nic Salt – VAPE CHOICE/imgi_24_tropical-peach-ice_1_180x.webp",
    category: "Nic Salt",
    description: "Tropical peach ice. 30% off!",
    features: ["30ml bottle", "50/50 VG/PG ratio", "High nicotine salt"],
    specs: { Size: "30ml", VGPG: "50/50", Flavors: "Tropical Peach, Ice" },
    productType: 'eliquid',
    nicotineOptions: [10, 25, 35, 50],
    sizes: [30],
  },
  213: {
    id: 213,
    name: "Tokyo Super Cool",
    brand: "Tokyo",
    price: 1260,
    originalPrice: 1800,
    image: "/images/Tokyo nic salt – VAPE CHOICE/imgi_15_Super-Cool-05_1445x_30e23352-fe44-4cc3-a6b5-46021a100651_360x.webp",
    category: "Nic Salt",
    description: "Watermelon bubblegum ice. 30% off!",
    features: ["30ml bottle", "High nicotine salt", "Refreshing flavor"],
    specs: { Size: "30ml", VGPG: "50/50", Flavors: "Watermelon, Bubblegum, Ice" },
    productType: 'eliquid',
    nicotineOptions: [10, 25, 35, 50],
    sizes: [30],
  },
  214: {
    id: 214,
    name: "IVG Red Apple Ice",
    brand: "IVG",
    price: 2240,
    originalPrice: 3200,
    image: "/images/IVG – VAPE CHOICE/imgi_13_IVG-Disposable-Red-Apple-Ice-8k-Puffs-35mg_360x.webp",
    category: "Disposable",
    description: "Crisp red apple. 30% off!",
    features: ["8000 puffs", "Pre-charged ready to use"],
    specs: { Puffs: "8000", Flavor: "Red Apple Ice" },
    productType: 'disposable',
  },
  215: {
    id: 215,
    name: "Lyon Blue Razz",
    brand: "Lyon",
    price: 1300,
    originalPrice: 2000,
    image: "/images/Lyon Nic Salt – VAPE CHOICE/imgi_19_download_d1c2a95d-ff14-4d52-a53a-4d8c17736a7a_360x.webp",
    category: "Nic Salt",
    description: "Blue raspberry. 35% off!",
    features: ["30ml bottle", "50/50 VG/PG ratio", "Smooth throat hit"],
    specs: { Size: "30ml", VGPG: "50/50", Flavors: "Blue Razz" },
    productType: 'eliquid',
    nicotineOptions: [10, 25, 35, 50],
    sizes: [30],
  },
  216: {
    id: 216,
    name: "YOZO Grape",
    brand: "YOZO",
    price: 840,
    originalPrice: 1200,
    image: "/images/YOZO DISPOSABLE – VAPE CHOICE/imgi_13_315084A6-4E41-4322-AA2E-EE0AC306C0FE_360x.jpg",
    category: "Disposable",
    description: "Delicious grape. 30% off!",
    features: ["900 puffs", "Pre-charged ready to use"],
    specs: { Puffs: "900", Flavor: "Grape" },
    productType: 'disposable',
  },
  217: {
    id: 217,
    name: "Infinity Mixed Melon",
    brand: "Infinity",
    price: 1650,
    originalPrice: 2200,
    image: "/images/Infinity Nic Salt – VAPE CHOICE/imgi_21_INFINITY_BRAIN_FREEZE_MIXED_MELON_ICE_SALTNIC_30ML_540x_1_360x.webp",
    category: "Nic Salt",
    description: "Mixed melon ice. 25% off!",
    features: ["30ml bottle", "50/50 VG/PG ratio", "High nicotine salt"],
    specs: { Size: "30ml", VGPG: "50/50", Flavors: "Mixed Melon, Ice" },
    productType: 'eliquid',
    nicotineOptions: [10, 25, 35, 50],
    sizes: [30],
  },
  218: {
    id: 218,
    name: "IVG Guava Ice",
    brand: "IVG",
    price: 2400,
    originalPrice: 3200,
    image: "/images/IVG – VAPE CHOICE/imgi_14_IVG-8000-Puffs-Guava-Ice-3_360x.jpg",
    category: "Disposable",
    description: "Exotic guava ice. 25% off!",
    features: ["8000 puffs", "Pre-charged ready to use"],
    specs: { Puffs: "8000", Flavor: "Guava Ice" },
    productType: 'disposable',
  },
  219: {
    id: 219,
    name: "Tokyo Classic",
    brand: "Tokyo",
    price: 1170,
    originalPrice: 1800,
    image: "/images/Tokyo nic salt – VAPE CHOICE/imgi_12_Classic-05_1445x_3f52c87e-5980-4a6f-aeeb-2576e3b7c0b3_360x.webp",
    category: "Nic Salt",
    description: "Classic tobacco. 35% off!",
    features: ["30ml bottle", "50/50 VG/PG ratio", "Rich tobacco taste"],
    specs: { Size: "30ml", VGPG: "50/50", Flavors: "Tobacco" },
    productType: 'eliquid',
    nicotineOptions: [10, 25, 35, 50],
    sizes: [30],
  },
  220: {
    id: 220,
    name: "YOZO Berry",
    brand: "YOZO",
    price: 720,
    originalPrice: 1200,
    image: "/images/YOZO DISPOSABLE – VAPE CHOICE/imgi_14_D0715E9E-22EA-4F21-B6D5-CF77CFB51DAA_360x.webp",
    category: "Disposable",
    description: "Mixed berry. 40% off!",
    features: ["900 puffs", "Pre-charged ready to use"],
    specs: { Puffs: "900", Flavor: "Mixed Berry" },
    productType: 'disposable',
  },
  221: {
    id: 221,
    name: "Lyon Passion Fruit",
    brand: "Lyon",
    price: 1200,
    originalPrice: 2000,
    image: "/images/Lyon Nic Salt – VAPE CHOICE/imgi_12_download_45a586e6-a61e-4aed-b67e-d45f004a98cc_360x.webp",
    category: "Nic Salt",
    description: "Tropical passion fruit. 40% off!",
    features: ["30ml bottle", "50/50 VG/PG ratio", "Smooth throat hit"],
    specs: { Size: "30ml", VGPG: "50/50", Flavors: "Passion Fruit" },
    productType: 'eliquid',
    nicotineOptions: [10, 25, 35, 50],
    sizes: [30],
  },
  222: {
    id: 222,
    name: "IVG Regal Berry Lemonade",
    brand: "IVG",
    price: 1960,
    originalPrice: 2800,
    image: "/images/IVG – VAPE CHOICE/imgi_12_ivg-regal-5-6000-puffs-berry-lemonade-ice-510x510-ezgif.com-webp-to-jpg-converter_360x.webp",
    category: "Disposable",
    description: "Berry lemonade. 30% off!",
    features: ["6000 puffs", "Pre-charged ready to use"],
    specs: { Puffs: "6000", Flavor: "Berry Lemonade Ice" },
    productType: 'disposable',
  },
  223: {
    id: 223,
    name: "Drip Down Cola Ice",
    brand: "Drip Down",
    price: 1750,
    originalPrice: 2500,
    image: "/images/DRIP DOWN FREEBASE – VAPE CHOICE/imgi_11_Drip-Down-Cola-Ice-E-Liquids-60ml_360x.jpg",
    category: "Freebase E-Liquid",
    description: "Classic cola with ice. 30% off!",
    features: ["60ml bottle", "70/30 VG/PG ratio", "Premium quality"],
    specs: { Size: "60ml", VGPG: "70/30", Flavors: "Cola, Menthol" },
    productType: 'eliquid',
    nicotineOptions: [3, 6, 12, 25],
    sizes: [60],
  },
  224: {
    id: 224,
    name: "Infinity Classic",
    brand: "Infinity",
    price: 1540,
    originalPrice: 2200,
    image: "/images/Infinity Nic Salt – VAPE CHOICE/imgi_15_2670886000302_2048x_fe2922b6-4eb1-4ae6-9133-8ac04c138fd6_360x.webp",
    category: "Nic Salt",
    description: "Classic disposable. 30% off!",
    features: ["3500 puffs", "Pre-charged ready to use"],
    specs: { Puffs: "3500", Flavor: "Classic" },
    productType: 'disposable',
  },
};

export default function ProductPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const product = products[productId];

  const [selectedNicotine, setSelectedNicotine] = useState<number | null>(null);

  useEffect(() => {
    if (product?.productType === 'eliquid' && product.nicotineOptions) {
      setSelectedNicotine(product.nicotineOptions[1]);
    }
  }, [product]);

  const [quantity, setQuantity] = useState(1);
  const { addToCart, items } = useCart();
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(items.some((item) => item.id === product?.id));
  }, [items, product]);

  if (!product) {
    return (
      <>
        <AgeGate />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
        <Footer />
      </>
    );
  }

  const getProductColor = () => {
    if (product.productType === 'disposable') return 'rgba(245,158,11,0.2)';
    if (product.productType === 'eliquid') return 'rgba(236,72,153,0.2)';
    return 'rgba(168,85,247,0.2)';
  };

  const getGradient = () => {
    if (product.productType === 'disposable') return 'linear-gradient(135deg, #f59e0b, #c2410c)';
    if (product.productType === 'eliquid') return 'linear-gradient(135deg, #ec4899, #9f1239)';
    return 'linear-gradient(135deg, #667eea, #764ba2)';
  };

  const getBorderColor = () => {
    if (product.productType === 'disposable') return 'rgba(245,158,11,0.3)';
    if (product.productType === 'eliquid') return 'rgba(236,72,153,0.3)';
    return 'rgba(168,85,247,0.3)';
  };

  const getAccentColor = () => {
    if (product.productType === 'disposable') return 'text-amber-500';
    if (product.productType === 'eliquid') return 'text-pink-500';
    return 'text-neon-purple';
  };

  return (
    <>
      <AgeGate />
      <Navbar />
      <div className="min-h-screen">
      <section
      className="relative py-20 sm:py-28 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <button onClick={() => window.history.back()} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back
            </button>
          </div>
          <nav className="flex-1 text-center text-sm">
            <ol className="flex items-center justify-center gap-2 text-white/40">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li>/</li>
              <li><a href="/vapes" className="hover:text-white">Shop</a></li>
              <li>/</li>
              <li className="text-white">{product.name}</li>
            </ol>
          </nav>
          <div className="flex-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="glass-card p-8 relative overflow-hidden" style={{ border: `1px solid ${getBorderColor()}` }}>
              {product.originalPrice > product.price && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white z-10">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              )}
              <div className="relative h-96">
                <div className="absolute inset-0 rounded-2xl" style={{ background: getGradient() }} />
                <Image src={product.image} alt={product.name} fill className="object-contain p-8" />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="space-y-6">
              <div>
                <span className={`text-sm font-semibold tracking-wider uppercase ${getAccentColor()}`} style={{ fontFamily: "var(--font-body)" }}>
                  {product.brand} — {product.category}
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold mt-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {product.name}
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-3xl font-extrabold gradient-text" style={{ fontFamily: "var(--font-display)" }}>
                  PKR {product.price.toLocaleString()}
                </p>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-white/40 line-through">
                    PKR {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-white/60 leading-relaxed">{product.description}</p>

              {product.productType === 'eliquid' && product.nicotineOptions && (
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">Nicotine Strength</label>
                  <div className="flex flex-wrap gap-3">
                    {product.nicotineOptions?.map((nic) => (
                      <button key={nic} onClick={() => setSelectedNicotine(nic)}
                        className={`px-4 py-2 rounded-lg border transition-all ${selectedNicotine === nic ? 'bg-amber-500/20 border-amber-500/50 text-amber-500' : 'bg-white/10 border-white/20 hover:border-white/40'}`}>
                        {nic}mg
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center">-</button>
                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center">+</button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => {
                  if (!inCart) {
                    let variant: string | undefined;
                    if (product.productType === 'eliquid' && selectedNicotine) variant = `${selectedNicotine}mg`;
                    else if (product.productType === 'disposable' && product.specs?.Puffs) variant = `${product.specs.Puffs} puffs`;
                    addToCart({ id: product.id, name: product.name, brand: product.brand, price: product.price, image: product.image, variant });
                  }
                }} className="btn-primary flex-1 py-4 text-lg">
                  {!inCart ? (
                    <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg> Add to Cart - PKR {(product.price * quantity).toLocaleString()}</>
                  ) : (
                    <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> Added to Cart</>
                  )}
                </button>
                <button className="w-14 h-14 rounded-xl glass-card flex items-center justify-center hover:neon-glow transition-all">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>Key Features</h3>
            <ul className="space-y-3">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`flex-shrink-0 ${getAccentColor()}`}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass-card p-8" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>Specifications</h3>
            <div className="space-y-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-white/60">{key}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </div>
    <Footer />
    </>
  );
}