"use client";
import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, Tag, User } from "lucide-react";
import type { JSX } from "react";

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/", icon: Home, label: "Home" }, // Home
  { href: "/catalog", icon: LayoutGrid, label: "Katalog" }, // Categories
  { href: "/cart", icon: ShoppingCart, label: "Savat" }, // Cart
  { href: "/promotions", icon: Tag, label: "Aksiyalar" }, // Promotions
  { href: "/profile", icon: User, label: "Profil" }, // Profile
];

export function BottomNavbar(): JSX.Element {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white block md:hidden h-20">
      <ul className="grid grid-cols-5 h-full">
        {navItems.map((item) => {
          // Asl routing mantiqi tiklandi
          const isActive =
            pathname === item.href ||
            (item.href === "/categories" &&
              pathname.startsWith("/categories")) ||
            (item.href === "/profile" && pathname.startsWith("/profile"));
          // Boshqa itemlar uchun ham startsWith qo'shishingiz mumkin, agar kerak bo'lsa
          // Masalan: (item.href === "/cart" && pathname.startsWith("/cart"))

          return (
            <li
              key={item.label}
              className="flex items-center justify-center h-full"
            >
              <Link
                href={item.href}
                className="group flex flex-col items-center justify-center h-full w-full px-2 py-3 transition-all duration-300 ease-in-out"
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ease-in-out ${
                    isActive ? "bg-blue-500 shadow-md transform scale-110" : ""
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 transition-colors duration-300 ease-in-out ${
                      isActive
                        ? "text-white"
                        : "text-gray-500 group-hover:text-blue-400"
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] mt-1 transition-all duration-300 ease-in-out ${
                    isActive
                      ? "font-bold text-blue-600"
                      : "font-medium text-gray-500 group-hover:text-blue-500"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
