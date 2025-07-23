import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import type { JSX } from "react";
import { BottomNavbar } from "@/components/bottom-navbar";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="flex-1 pb-16 md:pb-0">
          {/* Add padding-bottom for mobile navbar */}
          {children}
        </main>
        <BottomNavbar /> {/* Render the bottom navbar */}
      </body>
    </html>
  );
}
