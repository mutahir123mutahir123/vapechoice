"use client";

import { useEffect, useRef } from "react";
import styles from "./GalaxyBackground.module.css";

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let stars: any[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      stars = Array.from({ length: 120 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        alpha: Math.random(),
        speed: Math.random() * 0.02,
      }));
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.alpha += star.speed;

        if (star.alpha > 1 || star.alpha < 0) {
          star.speed *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawStars);
    };

    resize();
    createStars();
    drawStars();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* Gradient blobs */}
      <div className={styles.gradientLayer}></div>

      {/* Stars */}
      <canvas ref={canvasRef} className={styles.canvas}></canvas>

      {/* Noise overlay */}
      <div className={styles.noise}></div>
    </div>
  );
}