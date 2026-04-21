"use client";

import { useEffect, useRef } from "react";
import AgeGate from "@/components/AgeGate";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OverlayScrollSections from "@/components/OverlayScrollSections";
import BestSellers from "@/components/BestSellers";
import DiscountSection from "@/components/DiscountSection";
import OurStory from "@/components/OurStory";
import ShopByCollection from "@/components/ShopByCollection";
import BrandCarousel from "@/components/BrandCarousel";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    gsap.registerPlugin(ScrollTrigger);
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <>
      <AgeGate />
      <Navbar />
      <main className="relative z-[1]">
        <HeroSection />
        <BestSellers />
        <OverlayScrollSections />
        <DiscountSection />
        <OurStory />
        <ShopByCollection />
        <BrandCarousel />
      </main>
      <Footer />
    </>
  );
}