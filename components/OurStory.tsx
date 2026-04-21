"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function OurStory() {
  return (
    <section
      id="our-story"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] neon-glow">
              <Image
                src="/images/story-lifestyle.png"
                alt="VapeChoice — Our Story"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(168,85,247,0.15) 0%, transparent 60%)",
                }}
              />
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <span
              className="inline-block text-neon-purple text-sm font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Our Story
            </span>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Built for Those Who{" "}
              <span className="gradient-text">Don&apos;t Follow Trends</span>
            </h2>

            <div
              className="space-y-4 text-white/60 text-base sm:text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <p>
                VapeChoice was built for those who don&apos;t follow trends — they
                create them. We bring premium vape culture with quality, style,
                and authenticity.
              </p>
              <p>
                From our carefully curated selection of devices to our
                hand-picked e-liquid flavors, every product on VapeChoice is
                chosen to deliver an unmatched experience. We believe vaping is
                more than a habit — it&apos;s a lifestyle.
              </p>
              <p>
                Join thousands of vapers across Pakistan who trust VapeChoice
                for authentic products, fast delivery, and unbeatable customer
                support.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-8 sm:gap-12 mt-8 pt-8 border-t border-white/10"
            >
              {[
                { value: "5K+", label: "Happy Customers" },
                { value: "200+", label: "Products" },
                { value: "50+", label: "Brands" },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <span
                    className="text-2xl sm:text-3xl font-extrabold gradient-text"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="block text-xs sm:text-sm text-white/40 mt-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
