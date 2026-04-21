"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResult {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
}

const mockProducts: SearchResult[] = [
  { id: 1, name: "Uwell Caliburn G4 Pro", brand: "Uwell", category: "Pod System", price: 5500 },
  { id: 2, name: "Aspire Minican Plus", brand: "Aspire", category: "Pod Kit", price: 3500 },
  { id: 3, name: "Vaporesso Luxe X", brand: "Vaporesso", category: "Pod System", price: 6500 },
  { id: 4, name: "Drip Down Cola Ice", brand: "Drip Down", category: "Freebase", price: 3200 },
  { id: 5, name: "Tokyo Super Cool", brand: "Tokyo", category: "Nic Salt", price: 1800 },
  { id: 6, name: "IVG Regal 6000", brand: "IVG", category: "Disposable", price: 2200 },
  { id: 7, name: "SMOK Morph 2", brand: "SMOK", category: "Box Mod", price: 8500 },
  { id: 8, name: "VOOPOO Drag X", brand: "VOOPOO", category: "Pod Mod", price: 7000 },
  { id: 9, name: "YOZO Lemon Mint", brand: "YOZO", category: "Disposable", price: 1200 },
  { id: 10, name: "Infinity Brain Freeze", brand: "Infinity", category: "Nic Salt", price: 2200 },
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = query.trim()
    ? mockProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
  };

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") handleClose();
  };

  return (
    <div ref={containerRef} className="relative">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="trigger"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={handleOpen}
            className="glass-button flex items-center justify-center p-2.5 rounded-full cursor-pointer"
            aria-label="Open search"
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
          </motion.button>
        ) : (
          <motion.div
            key="input"
            initial={{ opacity: 0, scale: 0.95, width: "3rem" }}
            animate={{ opacity: 1, scale: 1, width: "100%", maxWidth: "600px" }}
            exit={{ opacity: 0, scale: 0.95, width: "3rem" }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="glass-card-strong rounded-full overflow-hidden flex items-center">
              <div className="pl-5 flex-shrink-0 text-white/40">
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
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search products, brands..."
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none"
                autoComplete="off"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="pr-4 flex-shrink-0 text-white/40 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
              <button
                onClick={handleClose}
                className="pr-4 flex-shrink-0 text-white/40 hover:text-white transition-colors"
                aria-label="Close search"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <AnimatePresence>
              {results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-3 glass-card-strong rounded-2xl overflow-hidden max-h-[320px] overflow-y-auto z-50"
                >
                  {results.map((product, i) => (
                    <motion.a
                      key={product.id}
                      href={`/product/${product.id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={handleClose}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple/20 to-electric-blue/20 flex items-center justify-center flex-shrink-0">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="text-neon-purple"
                        >
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                          <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate group-hover:text-neon-purple transition-colors">
                          {product.name}
                        </p>
                        <p className="text-xs text-white/40">
                          {product.brand} — {product.category}
                        </p>
                      </div>
                      <p className="text-sm font-bold gradient-text flex-shrink-0">
                        PKR {product.price.toLocaleString()}
                      </p>
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}