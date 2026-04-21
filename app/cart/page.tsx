"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AgeGate from "@/components/AgeGate";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const nicotineStrengths = [
  { value: "3mg", label: "3mg" },
  { value: "10mg", label: "10mg" },
  { value: "25mg", label: "25mg" },
  { value: "35mg", label: "35mg" },
  { value: "50mg", label: "50mg" },
];

const cartItems = [
  {
    id: 1,
    name: "Uwell Caliburn G4 Pro",
    brand: "Uwell",
    price: 5500,
    quantity: 1,
    image: "/images/Uwell Pod Kits – VAPE CHOICE/imgi_21_uwell-caliburn-g4-pro-pod-vape-kit-stripe-black_360x.webp",
    variant: "Stripe Black",
  },
  {
    id: 2,
    name: "Drip Down Cola Ice",
    brand: "Drip Down",
    price: 3200,
    quantity: 2,
    image: "/images/DRIP DOWN FREEBASE – VAPE CHOICE/imgi_11_Drip-Down-Cola-Ice-E-Liquids-60ml_360x.jpg",
    variant: "60ml - 3mg",
  },
];

export default function CartPage() {
  const { items, updateQuantity } = useCart();
  const cartItems = items.length > 0 ? items : [
  {
    id: 1,
    name: "Uwell Caliburn G4 Pro",
    brand: "Uwell",
    price: 5500,
    quantity: 1,
    image: "/images/Uwell Pod Kits – VAPE CHOICE/imgi_21_uwell-caliburn-g4-pro-pod-vape-kit-stripe-black_360x.webp",
    variant: "Stripe Black",
  },
  {
    id: 2,
    name: "Drip Down Cola Ice",
    brand: "Drip Down",
    price: 3200,
    quantity: 2,
    image: "/images/DRIP DOWN FREEBASE – VAPE CHOICE/imgi_11_Drip-Down-Cola-Ice-E-Liquids-60ml_360x.jpg",
    variant: "60ml - 3mg",
  },
];

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + shipping;

  return (
    <>
      <AgeGate />
      <Navbar />
      <div className="min-h-screen">
      {/* Cart Section */}
      <section
        className="relative py-20 sm:py-28 min-h-screen"
      >
        {/* Section Header */}
        <div className="text-center mb-12 px-4">
          <span
            className="text-neon-purple text-sm font-semibold tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Your Shopping
          </span>
          <h2 className="section-title mt-2">
            <span className="gradient-text">Cart</span>
          </h2>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full glass-card flex items-center justify-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-white/40"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <h3
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Your cart is empty
            </h3>
            <p className="text-white/40 mb-6">
              Looks like you haven&apos;t added anything yet
            </p>
            <a href="/vapes" className="btn-primary inline-flex">
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-4 sm:p-6 flex flex-col sm:flex-row gap-4"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                      }}
                    />
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-neon-purple uppercase tracking-wider">
                        {item.brand}
                      </span>
                      <h3
                        className="text-lg font-bold mt-1"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {item.name}
                      </h3>
                      <p className="text-sm text-white/40 mt-1">
                        {item.variant}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <p
                        className="text-xl font-extrabold gradient-text"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        PKR {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => updateQuantity(item.id, -item.quantity)}
                    className="self-start sm:self-center p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-white/40 hover:text-red-500"
                    >
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div
                className="glass-card p-6 sticky top-24"
                style={{
                  border: "1px solid rgba(168,85,247,0.3)",
                }}
              >
                <h3
                  className="text-lg font-bold mb-6"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-white/80">
                    <span>Subtotal</span>
                    <span>PKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-400">Free</span>
                      ) : (
                        `PKR ${shipping}`
                      )}
                    </span>
                  </div>
                  {subtotal < 5000 && (
                    <p className="text-xs text-white/40">
                      Add PKR {(5000 - subtotal).toLocaleString()} more for free
                      shipping
                    </p>
                  )}
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <p
                      className="text-xl font-extrabold gradient-text"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      PKR {total.toLocaleString()}
                    </p>
                  </div>
                </div>

                <button className="btn-primary w-full py-3">
                  Proceed to Checkout
                </button>

                <p className="text-xs text-white/30 text-center mt-4">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
    </div>
    <Footer />
    </>
  );
}