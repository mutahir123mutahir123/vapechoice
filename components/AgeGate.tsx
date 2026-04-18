"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function AgeGate() {
  const [showGate, setShowGate] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("vapechoice-age-verified");
    if (!verified) {
      setShowGate(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem("vapechoice-age-verified", "true");
    setFadeOut(true);
    setTimeout(() => {
      setShowGate(false);
      document.body.style.overflow = "";
    }, 500);
  };

  const handleDeny = () => {
    window.location.href = "https://www.google.com";
  };

  if (!showGate) return null;

  return (
    <div
      id="age-gate"
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(48,43,99,0.97) 0%, rgba(15,12,41,0.99) 70%)",
      }}
    >
      {/* Decorative smoke wisps */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.3), transparent 70%)",
            animation: "smoke-rise 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 right-1/3 w-48 h-48 rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%)",
            animation: "smoke-rise 8s ease-in-out infinite 2s",
          }}
        />
      </div>

      <div className="glass-card-strong p-8 sm:p-12 max-w-md w-[90%] text-center relative z-10">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-24 h-24">
            <Image
              src="/images/logo image.png"
              alt="VapeChoice"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Title */}
        <h2
          className="text-2xl sm:text-3xl font-bold mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="gradient-text">Age Verification</span>
        </h2>

        {/* Message */}
        <p
          className="text-white/60 text-sm sm:text-base mb-8 leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
        >
          You must be <span className="text-neon-purple font-semibold">18 years or older</span> to
          enter this website. By clicking &ldquo;Enter&rdquo;, you confirm that you are of
          legal age to purchase vaping products.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            id="age-verify-yes"
            onClick={handleVerify}
            className="btn-primary text-base px-8 py-3.5"
          >
            I am 18+ — Enter
          </button>
          <button
            id="age-verify-no"
            onClick={handleDeny}
            className="btn-secondary text-base px-8 py-3.5 text-white/60"
          >
            I am under 18
          </button>
        </div>

        {/* Fine print */}
        <p className="text-white/30 text-xs mt-6">
          By entering, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
