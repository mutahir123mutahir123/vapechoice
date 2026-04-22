"use client";

import { Suspense } from "react";
import AgeGate from "@/components/AgeGate";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BestSellers from "@/components/BestSellers";
import OverlayScrollSections from "@/components/OverlayScrollSections";
import DiscountSection from "@/components/DiscountSection";
import OurStory from "@/components/OurStory";
import ShopByCollection from "@/components/ShopByCollection";
import BrandCarousel from "@/components/BrandCarousel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <AgeGate />
      <Navbar />
      <main className="relative z-[1]">
        <HeroSection />
        <Suspense fallback={null}>
          <BestSellers />
          <OverlayScrollSections />
          <DiscountSection />
          <OurStory />
          <ShopByCollection />
          <BrandCarousel />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}