import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AfterLife AI | A Digital Memorial Garden",
  description:
    "A retro-futuristic legacy planning experience inspired by memorial books, family archives, and luminous sky gardens."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
