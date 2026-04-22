"use client";

import { usePathname } from "next/navigation";
import { CartProvider } from "@/context/CartContext";
import NavigationFix from "@/components/NavigationFix";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <NavigationFix />
      <CartProvider>
        <main key={pathname} className="relative z-10">
          {children}
        </main>
      </CartProvider>
    </>
  );
}