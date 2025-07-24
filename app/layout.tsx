import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { BottomNavbar } from "@/components/bottom-navbar";
import { Providers } from "@/providers/provider";
import { JSX } from "react";

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
        <Providers>
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <BottomNavbar />
        </Providers>
      </body>
    </html>
  );
}
