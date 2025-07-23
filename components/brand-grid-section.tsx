"use client"

import Link from "next/link"
import { BrandCard } from "@/components/ui/brand-card"
import { Button } from "@/components/ui/button"
import type { JSX } from "react"

interface Brand {
  id: number
  name: string
  logo: string
  href: string
  productCount?: number
}

const carBrands: Brand[] = [
  {
    id: 1,
    name: "Chevrolet",
    logo: "/placeholder.svg?height=50&width=80&text=Chevrolet",
    href: "/categories/chevrolet",
    productCount: 1234,
  },
  {
    id: 2,
    name: "Mercedes-Benz",
    logo: "/placeholder.svg?height=50&width=80&text=Mercedes",
    href: "/categories/mercedes",
    productCount: 876,
  },
  {
    id: 3,
    name: "BMW",
    logo: "/placeholder.svg?height=50&width=80&text=BMW",
    href: "/categories/bmw",
    productCount: 654,
  },
  {
    id: 4,
    name: "Toyota",
    logo: "/placeholder.svg?height=50&width=80&text=Toyota",
    href: "/categories/toyota",
    productCount: 1500,
  },
  {
    id: 5,
    name: "Volkswagen",
    logo: "/placeholder.svg?height=50&width=80&text=VW",
    href: "/categories/volkswagen",
    productCount: 987,
  },
  {
    id: 6,
    name: "Hyundai",
    logo: "/placeholder.svg?height=50&width=80&text=Hyundai",
    href: "/categories/hyundai",
    productCount: 789,
  },
  {
    id: 7,
    name: "Audi",
    logo: "/placeholder.svg?height=50&width=80&text=Audi",
    href: "/categories/audi",
    productCount: 543,
  },
  {
    id: 8,
    name: "Ford",
    logo: "/placeholder.svg?height=50&width=80&text=Ford",
    href: "/categories/ford",
    productCount: 1122,
  },
  {
    id: 9,
    name: "Honda",
    logo: "/placeholder.svg?height=50&width=80&text=Honda",
    href: "/categories/honda",
    productCount: 678,
  },
  {
    id: 10,
    name: "Kia",
    logo: "/placeholder.svg?height=50&width=80&text=Kia",
    href: "/categories/kia",
    productCount: 910,
  },
  {
    id: 11,
    name: "Nissan",
    logo: "/placeholder.svg?height=50&width=80&text=Nissan",
    href: "/categories/nissan",
    productCount: 721,
  },
  {
    id: 12,
    name: "Lada",
    logo: "/placeholder.svg?height=50&width=80&text=Lada",
    href: "/categories/lada",
    productCount: 345,
  },
]

export function BrandGridSection(): JSX.Element {
  // Komponent nomi BrandGridSection ga o'zgartirildi
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Avtomobil brendlari</h2>
        <Link href="/brands">
          <Button variant="outline">Barchasini ko'rish</Button>
        </Link>
      </div>

      {/* Slayderdan gridga o'zgartirildi */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
        {carBrands.map((brand) => (
          <BrandCard key={brand.id} {...brand} />
        ))}
      </div>
    </section>
  )
}
