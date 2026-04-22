"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./AliveBackground.module.css";

export function AliveBackground() {
  const [isActive, setIsActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);
  const layerCRef = useRef<HTMLDivElement>(null);
  const layerDRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsActive(scrolled < 800);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollY = useScroll();
  const globalScrollY = scrollY.scrollYProgress;

  const layerA_Y = useTransform(globalScrollY, [0, 1], [0, -50]);
  const layerB_Y = useTransform(globalScrollY, [0, 1], [0, -30]);
  const layerC_Y = useTransform(globalScrollY, [0, 1], [0, 150]);
  const layerD_Y = useTransform(globalScrollY, [0, 1], [0, -20]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    };

    const layers = [layerARef.current, layerBRef.current, layerCRef.current, layerDRef.current];
    const intensities = [1, 1.5, 3, 0.5];
    
    layers.forEach((layer, index) => {
      if (!layer) return;
      const intensity = intensities[index] || 1;
      const direction = index < 2 ? -1 : 1;

      gsap.to(layer, {
        x: mousePos.current.x * 30 * intensity * direction,
        y: mousePos.current.y * 20 * intensity * direction,
        duration: 0.8,
        ease: "power2.out",
      });
    });
  }, []);

  const initShimmer = useCallback(() => {
    if (!shimmerRef.current) return;

    gsap.to(shimmerRef.current, {
      opacity: 0.15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  useEffect(() => {
    if (!isActive) return;
    window.addEventListener("mousemove", handleMouseMove);
    initShimmer();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, initShimmer, isActive]);

  const particles = useMemo(() => Array.from({ length: 72 }), []);

  if (!isActive) return null;

  return (
    <div ref={containerRef} className={styles.container}>
      <motion.div
        className={styles.layerA}
        ref={layerARef}
        style={{ y: layerA_Y }}
      >
        <div className={styles.gradientA} />
      </motion.div>

      <motion.div
        className={styles.layerB}
        ref={layerBRef}
        style={{ y: layerB_Y }}
      >
        <div className={styles.gradientB} />
      </motion.div>

      <motion.div
        className={styles.layerC}
        ref={layerCRef}
        style={{ y: layerC_Y }}
      >
        <div className={styles.gradientC} ref={shimmerRef} />
        <div className={styles.sunsetCore} />
      </motion.div>

      <motion.div
        className={styles.layerD}
        ref={layerDRef}
        style={{ y: layerD_Y }}
      >
        <div className={styles.noiseOverlay} />
      </motion.div>

      <div className={styles.particleSystem} ref={particleRef}>
        {particles.map((_, i) => (
          <FloatingParticle key={i} index={i} scrollY={globalScrollY} />
        ))}
      </div>

      <div className={styles.globalTint} />
    </div>
  );
}

interface ParticleProps {
  index: number;
  scrollY: ReturnType<typeof useScroll>["scrollYProgress"];
}

function FloatingParticle({ index, scrollY }: ParticleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useTransform(scrollY, [0, 1], [0, -200 - index * 30]);
  const x = useTransform(scrollY, [0, 1], [0, (index % 3) * 50 - 50]);

  const floatY = (index % 3) * 5 + 10;
  const floatDuration = 3 + (index % 4);

  return (
    <motion.div
      ref={ref}
      className={`${styles.particle} ${index % 3 === 0 ? styles.particleGold : index % 3 === 1 ? styles.particleWhite : styles.particleWarm}`}
      style={{
        y,
        x,
        left: `${(index * 4) % 100}%`,
        top: `${20 + (index % 8) * 10}%`,
        animation: `particle-float ${floatDuration}s ease-in-out infinite`,
        animationDelay: `${index * 0.5}s`,
        width: index % 2 === 0 ? '7px' : '6px',
        height: index % 2 === 0 ? '7px' : '6px',
      }}
    />
  );
}

export default AliveBackground;