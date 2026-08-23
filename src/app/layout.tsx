import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "trustedmedshop - Verified Medicine Delivery",
  description: "Global pharmaceutical importer & exporter of high-quality, authentic medicines. Sourcing and delivery to 107+ countries.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-[#F8FAF9] text-slate-800 flex flex-col antialiased overflow-x-hidden w-full max-w-full`}>
        <CartProvider>
          <Header />
          <main className="flex-grow flex flex-col w-full max-w-full overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
