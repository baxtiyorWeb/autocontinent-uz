"use client"
import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, ShoppingCart, Tag, User } from "lucide-react"
import type { JSX } from "react"

interface NavItem {
  href: string
  icon: React.ElementType
  label: string
}

const navItems: NavItem[] = [
  { href: "/", icon: Home, label: "Bosh sahifa" },
  { href: "/categories", icon: LayoutGrid, label: "Katalog" },
  { href: "/cart", icon: ShoppingCart, label: "Savat" },
  { href: "/promotions", icon: Tag, label: "Aksiyalar" },
  { href: "/profile", icon: User, label: "Profil" },
]

export function BottomNavbar(): JSX.Element {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-[0_-4px_6px_-1px_rgb(0_0_0_/_0.1),_0_-2px_4px_-2px_rgb(0_0_0_/_0.06)] block md:hidden h-20">
      <ul className="grid grid-cols-5 h-full">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/categories" && pathname.startsWith("/categories")) ||
            (item.href === "/profile" && pathname.startsWith("/profile"))
          return (
            <li key={item.label} className="flex items-center justify-center w-10">
              <Link
                href={item.href}
                className={`group flex flex-col items-center justify-center p-2 rounded-full transition-all duration-300 ease-out ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md" // Faol holatda fon va matn rangi
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700" // Faol bo'lmagan holat
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-300 ease-out ${
                    isActive ? "scale-110" : "" // Faol holatda ikonka kattalashadi
                  }`}
                >
                  <item.icon
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
                      isActive ? "text-primary-foreground" : "text-gray-500 group-hover:text-gray-700" // Ikonka rangi
                    }`}
                  />
                </div>
                <span
                  className={` text-[10px] sm:text-xs transition-all duration-300 ${
                    isActive ? "font-bold" : "font-medium" // Matn qalinligi
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
