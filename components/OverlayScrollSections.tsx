"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./OverlayScrollSections.module.css";

const categories = [
  {
    id: "vapes",
    title: "Vapes",
    subtitle: "Premium devices for the perfect hit",
    image: "/images/category-vapes.png",
    color: "rgba(168, 85, 247, 0.15)",
    href: "/vapes",
  },
  {
    id: "pods",
    title: "Pods",
    subtitle: "Compact power, bold flavors",
    image: "/images/category-pods.png",
    color: "rgba(59, 130, 246, 0.15)",
    href: "/pods",
  },
  {
    id: "eliquids",
    title: "E-Liquids",
    subtitle: "Crafted flavors for every palate",
    image: "/images/category-eliquids.png",
    color: "rgba(168, 85, 247, 0.15)",
    href: "/e-liquid",
  },
  {
    id: "accessories",
    title: "Accessories",
    subtitle: "Everything you need to elevate your setup",
    image: "/images/category-accessories.png",
    color: "rgba(59, 130, 246, 0.15)",
    href: "/contact",
  },
];

export default function OverlayScrollSections() {
  return (
    <div className={styles.container}>
      {categories.map((cat, i) => (
        <div
          key={cat.id}
          className={styles.section}
          style={{ zIndex: i + 1 }}
        >
          <div className={styles.imageContainer}>
            <Image
              src={cat.image}
              alt={cat.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i < 2}
            />
            <div
              className={styles.overlay}
              style={{
                background: `linear-gradient(to right, rgba(15,12,41,0.85) 0%, rgba(15,12,41,0.4) 50%, rgba(15,12,41,0.7) 100%), ${cat.color}`,
              }}
            />
          </div>

          <div className={styles.content}>
            <div className={styles.contentInner}>
              <span className={styles.number}>0{i + 1}</span>
              <span className={styles.label}>Explore Category</span>
              <h2 className={styles.title}>{cat.title}</h2>
              <p className={styles.subtitle}>{cat.subtitle}</p>
              <a href={cat.href} className="btn-primary">
                Explore {cat.title}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.fadeBottom} />
        </div>
      ))}
    </div>
  );
}