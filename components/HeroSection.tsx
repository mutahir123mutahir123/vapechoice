"use client";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center pt-20 lg:pt-32"
    >
      {/* Hero Video Container */}
      <div className="relative z-[1] w-[90%] sm:w-[85%] lg:w-[80%] h-[80vh] rounded-[30px] overflow-hidden shadow-2xl border border-white/10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}