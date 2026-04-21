"use client";

import { useRef, useEffect } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn("Video autoplay failed:", err);
      }
    };

    playVideo();
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center pt-20 lg:pt-32"
    >
      {/* Hero Video Container */}
      <div className="relative z-[1] w-[90%] sm:w-[85%] lg:w-[80%] h-[80vh] rounded-[30px] overflow-hidden shadow-2xl border border-white/10">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}