import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import LazySection from "@/components/LazySection";
import ClientAgeGate from "@/components/ClientAgeGate";
import BestSellers from "@/components/BestSellers";
import OverlayScrollSections from "@/components/OverlayScrollSections";
import DiscountSection from "@/components/DiscountSection";
import OurStory from "@/components/OurStory";
import ShopByCollection from "@/components/ShopByCollection";
import BrandCarousel from "@/components/BrandCarousel";

export default function Home() {
  return (
    <>
      <ClientAgeGate />
      <Navbar />
      <main className="relative z-[1]">
        <HeroSection />
        <LazySection>
          <BestSellers />
        </LazySection>
        <LazySection threshold={0.2} rootMargin="300px">
          <OverlayScrollSections />
        </LazySection>
        <LazySection>
          <DiscountSection />
        </LazySection>
        <LazySection>
          <OurStory />
        </LazySection>
        <LazySection>
          <ShopByCollection />
        </LazySection>
        <LazySection>
          <BrandCarousel />
        </LazySection>
      </main>
      <Footer />
    </>
  );
}