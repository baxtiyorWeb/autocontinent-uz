import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { BottomNavbar } from "@/components/bottom-navbar";
import { Providers } from "@/providers/provider";
import { JSX } from "react";
import { Toaster } from "@/components/ui/toaster"; // <-- Toaster komponentini import qiling

export const metadata: Metadata = {
  title: "AvtoKontinent.uz",
  description: "AvtoKontinent uz saytiga hush kelibsiz",
  generator: "AvtoKontinent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <BottomNavbar />
        </Providers>
        <Toaster /> {/* <-- Toaster komponentini shu yerga qo'shing */}
      </body>
    </html>
  );
}
