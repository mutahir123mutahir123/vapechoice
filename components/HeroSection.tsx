"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const loadOnIdle = () => {
      if ("requestIdleCallback" in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => {
          setLoadVideo(true);
        });
      } else {
        setTimeout(() => setLoadVideo(true), 500);
      }
    };

    loadOnIdle();
  }, []);

  useEffect(() => {
    if (!loadVideo || !videoRef.current) return;

    const playVideo = async () => {
      try {
        await videoRef.current?.play();
        setVideoReady(true);
      } catch {
        setVideoReady(true);
      }
    };

    playVideo();
  }, [loadVideo]);

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center pt-20 lg:pt-32"
    >
      <div className="relative z-[1] w-[90%] sm:w-[85%] lg:w-[80%] h-[80vh] rounded-[30px] overflow-hidden shadow-2xl border border-white/10">
        {!videoReady && (
          <Image
            src="/hero-img.png"
            alt="VapeChoice Hero"
            fill
            priority
            sizes="80vw"
            className="object-cover"
          />
        )}
        
        {loadVideo && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            onCanPlay={() => setVideoReady(true)}
            className="w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        )}
      </div>
    </section>
  );
}