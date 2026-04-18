"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => window.removeEventListener("scroll", onScroll, { capture: true });
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Vapes", href: "/vapes" },
    { label: "Pods", href: "/pods" },
    { label: "E-Liquids", href: "/e-liquid" },
    { label: "Our Story", href: "/#our-story" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "glass py-3 shadow-lg shadow-black/20"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/logo image.png"
                alt="VapeChoice"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span
              className="text-xl sm:text-2xl font-bold tracking-tight hidden sm:block"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-white">Vape</span>
              <span className="text-neon-purple">Choice</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/70 hover:text-white text-sm font-medium transition-all duration-300 relative group"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {link.label}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-gradient-to-r from-neon-purple to-electric-blue transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              id="search-btn"
              className="p-2.5 rounded-xl hover:bg-white/5 transition-colors duration-300 text-white/70 hover:text-white"
              aria-label="Search"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Wishlist */}
            <button
              id="wishlist-btn"
              className="p-2.5 rounded-xl hover:bg-white/5 transition-colors duration-300 text-white/70 hover:text-neon-purple hidden sm:block"
              aria-label="Wishlist"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              id="cart-btn"
              className="p-2.5 rounded-xl hover:bg-white/5 transition-colors duration-300 text-white/70 hover:text-electric-blue relative"
              aria-label="Cart"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
<span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-neon-purple text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              id="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-white/5 transition-colors duration-300 text-white/70 hover:text-white"
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-in Menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[99] lg:hidden transition-all duration-500 ${
          menuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-[280px] sm:w-[320px] glass transition-transform duration-500 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            background:
              "linear-gradient(180deg, rgba(15,12,41,0.98) 0%, rgba(48,43,99,0.98) 100%)",
          }}
        >
          <div className="pt-20 px-6">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-4 border-b border-white/5 text-lg font-medium text-white/80 hover:text-neon-purple transition-all duration-300"
                style={{
                  fontFamily: "var(--font-heading)",
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                {link.label}
              </a>
            ))}

            {/* Mobile Wishlist Link */}
            <a
              href="#"
              className="flex items-center gap-3 py-4 border-b border-white/5 text-lg font-medium text-white/80 hover:text-neon-purple transition-all duration-300"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Wishlist
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
