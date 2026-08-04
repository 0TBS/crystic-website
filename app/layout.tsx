import type { Metadata } from "next";
import "./globals.css";
import EnvBanner from "@/components/EnvBanner";

export const metadata: Metadata = {
  title: "Crystic",
  description: "Crystic — official website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <EnvBanner />
        {children}
      </body>
    </html>
  );
}
