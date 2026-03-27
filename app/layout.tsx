import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "The Economic Times — AI News Experience",
  description: "AI-powered news experience by The Economic Times. Personalized briefings, story intelligence, and vernacular news.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased" style={{ background: "#f5f5f5", color: "#1a1a1a" }}>
        <Navbar />
        <main style={{ minHeight: "calc(100vh - 120px)" }}>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
