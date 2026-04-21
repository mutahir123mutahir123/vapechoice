import type { Metadata } from "next";
import { Poppins, Inter, Space_Grotesk } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import NavigationFix from "@/components/NavigationFix";
import AliveBackground from "@/components/AliveBackground";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VapeChoice — Premium Vapes, Pods & Accessories",
  description:
    "Discover premium vapes, pod systems, e-liquids, and accessories at VapeChoice. Top brands like SMOK, Voopoo, Vaporesso. Fast delivery across Pakistan.",
  keywords: [
    "vape",
    "vapes Pakistan",
    "pod systems",
    "e-liquids",
    "SMOK",
    "Voopoo",
    "Vaporesso",
    "disposable vapes",
    "vape accessories",
    "VapeChoice",
  ],
  openGraph: {
    title: "VapeChoice — Premium Vapes, Pods & Accessories",
    description:
      "Shop premium vapes, pods, e-liquids & accessories. Pakistan's top vape destination.",
    type: "website",
    locale: "en_PK",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen antialiased">
        <AliveBackground />
        <NavigationFix />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
