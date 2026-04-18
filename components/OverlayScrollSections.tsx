"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("all", () => {
        panelRefs.current.forEach((panel, i) => {
          if (!panel || i === 0) return;

          ScrollTrigger.create({
            trigger: panel,
            start: "top bottom",
            end: "top top",
            scrub: 1,
            onUpdate: (self) => {
              const prev = panelRefs.current[i - 1];
              if (prev) {
                const progress = self.progress;
                gsap.set(prev, {
                  scale: 1 - progress * 0.05,
                  filter: `blur(${progress * 4}px)`,
                  opacity: 1 - progress * 0.3,
                });
              }
            },
          });
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  useEffect(() => {
    const handlePopstate = () => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        window.scrollTo(0, 1);
        setTimeout(() => {
          window.scrollTo(0, 0);
          ScrollTrigger.refresh();
        }, 100);
      });
    };

    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, []);

  return (
    <section id="categories" ref={containerRef}>
      {categories.map((cat, i) => (
        <div
          key={cat.id}
          ref={(el) => { panelRefs.current[i] = el; }}
          className="sticky top-0 w-full h-screen overflow-hidden"
          style={{ zIndex: 10 + i }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={cat.image}
              alt={cat.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i < 2}
            />
            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, rgba(15,12,41,0.85) 0%, rgba(15,12,41,0.4) 50%, rgba(15,12,41,0.7) 100%), ${cat.color}`,
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32">
            <div className="max-w-2xl">
              {/* Category Number */}
              <span
                className="text-7xl sm:text-8xl md:text-9xl font-black text-white/5 absolute top-8 right-8 sm:top-12 sm:right-12 select-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                0{i + 1}
              </span>

              <span
                className="inline-block text-neon-purple text-sm font-semibold tracking-[0.2em] uppercase mb-4"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Explore Category
              </span>

              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-[1.05]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {cat.title}
              </h2>

              <p
                className="text-white/60 text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed max-w-lg"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {cat.subtitle}
              </p>

              <a
                href={cat.href}
                className="btn-primary text-base px-8 py-3.5 inline-flex"
              >
                Explore {cat.title}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 z-[11] pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(15,12,41,0.6) 0%, transparent 100%)",
            }}
          />
        </div>
      ))}
    </section>
  );
}





// "use client";

// import { useEffect, useRef } from "react";
// import Image from "next/image";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const categories = [
//   {
//     id: "vapes",
//     title: "Vapes",
//     subtitle: "Premium devices for the perfect hit",
//     image: "/images/category-vapes.png",
//     color: "rgba(168, 85, 247, 0.15)",
//   },
//   {
//     id: "pods",
//     title: "Pods",
//     subtitle: "Compact power, bold flavors",
//     image: "/images/category-pods.png",
//     color: "rgba(59, 130, 246, 0.15)",
//   },
//   {
//     id: "eliquids",
//     title: "E-Liquids",
//     subtitle: "Crafted flavors for every palate",
//     image: "/images/category-eliquids.png",
//     color: "rgba(168, 85, 247, 0.15)",
//   },
//   {
//     id: "accessories",
//     title: "Accessories",
//     subtitle: "Everything you need to elevate your setup",
//     image: "/images/category-accessories.png",
//     color: "rgba(59, 130, 246, 0.15)",
//   },
// ];

// export default function OverlayScrollSections() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const panels = panelRefs.current;

//       panels.forEach((panel, i) => {
//         if (!panel) return;

//         // First section stays in place
//         if (i === 0) {
//           gsap.set(panel, { y: "0%" });
//           return;
//         }

//         // Start each next panel below screen
//         gsap.set(panel, { y: "100%" });

//         // Slide up overlay animation
//         gsap.to(panel, {
//           y: "0%",
//           ease: "none",
//           scrollTrigger: {
//             trigger: panel,
//             start: "top 75%", // 🔥 triggers at 75%
//             end: "top top",
//             scrub: true,
//           },
//         });

//         // Subtle effect on previous panel
//         const prev = panels[i - 1];
//         if (prev) {
//           gsap.to(prev, {
//             scale: 0.97,
//             opacity: 0.85,
//             filter: "blur(2px)",
//             scrollTrigger: {
//               trigger: panel,
//               start: "top 75%",
//               end: "top top",
//               scrub: true,
//             },
//           });
//         }
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section id="categories" ref={containerRef} className="relative">
//       {categories.map((cat, i) => (
//         <div
//           key={cat.id}
//           ref={(el) => {
//             panelRefs.current[i] = el;
//           }}
//           className="relative w-full h-screen overflow-hidden"
//           style={{ zIndex: i + 1 }}
//         >
//           {/* Background Image */}
//           <div className="absolute inset-0">
//             <Image
//               src={cat.image}
//               alt={cat.title}
//               fill
//               className="object-cover"
//               sizes="100vw"
//               priority={i < 2}
//             />

//             {/* Overlay */}
//             <div
//               className="absolute inset-0"
//               style={{
//                 background: `linear-gradient(to right, rgba(15,12,41,0.85) 0%, rgba(15,12,41,0.4) 50%, rgba(15,12,41,0.7) 100%), ${cat.color}`,
//               }}
//             />
//           </div>

//           {/* Content */}
//           <div className="relative z-10 h-full flex items-center px-6 sm:px-12 md:px-20 lg:px-32">
//             <div className="max-w-2xl">
//               {/* Big Number */}
//               <span className="text-7xl sm:text-8xl md:text-9xl font-black text-white/5 absolute top-8 right-8 select-none">
//                 0{i + 1}
//               </span>

//               <span className="inline-block text-purple-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4">
//                 Explore Category
//               </span>

//               <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
//                 {cat.title}
//               </h2>

//               <p className="text-white/60 text-lg sm:text-xl md:text-2xl mb-8 max-w-lg">
//                 {cat.subtitle}
//               </p>

//               <button className="bg-white text-black px-8 py-3.5 rounded-full font-semibold hover:scale-105 transition">
//                 Explore {cat.title}
//               </button>
//             </div>
//           </div>

//           {/* Bottom gradient */}
//           <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-[#0f0c29]/70 to-transparent" />
//         </div>
//       ))}
//     </section>
//   );
// }


