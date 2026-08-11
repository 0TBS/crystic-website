import type { Metadata } from "next";
import "./globals.css";
import EnvBanner from "@/components/EnvBanner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Crystic — Handcrafted Crystal Bracelets",
    template: "%s · Crystic",
  },
  description:
    "Handcrafted crystal bracelets made in small batches with genuine gemstones — amethyst, rose quartz, tiger's eye and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <EnvBanner />
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
