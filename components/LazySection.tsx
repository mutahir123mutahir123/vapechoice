"use client";

import { useRef, useState, useEffect } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

const pulseClass =
  "bg-gradient-to-r from-galaxy-700 via-galaxy-600 to-galaxy-700 bg-[length:200%_100%] animate-shimmer";

function Skeleton() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className={`inline-block w-24 h-3 mx-auto ${pulseClass} mb-4`} />
          <div className={`w-48 h-8 mx-auto ${pulseClass}`} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`glass-card overflow-hidden ${pulseClass}`} style={{ height: 280 }} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LazySection({
  children,
  threshold = 0.1,
  rootMargin = "200px",
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div ref={ref} onLoad={handleLoad}>
      {visible && loaded ? children : <Skeleton />}
    </div>
  );
}