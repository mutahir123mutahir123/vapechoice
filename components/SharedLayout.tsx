import AgeGate from "@/components/AgeGate";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AgeGate />
      <Navbar />
      <main className="relative z-[1] min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}