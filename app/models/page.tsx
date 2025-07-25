import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/ui/page-header"
import { BrandCard } from "@/components/ui/brand-card"
import type { JSX } from "react"

interface Brand {
  id: number
  name: string
  logo: string
  href: string
  productCount: number
}

const carBrands: Brand[] = [
  {
    id: 1,
    name: "Chevrolet",
    logo: "/placeholder.svg?height=50&width=80",
    href: "/categories/chevrolet",
    productCount: 1234,
  },
  {
    id: 2,
    name: "Mercedes-Benz",
    logo: "/placeholder.svg?height=50&width=80",
    href: "/categories/mercedes",
    productCount: 876,
  },
  {
    id: 3,
    name: "BMW",
    logo: "/placeholder.svg?height=50&width=80",
    href: "/categories/bmw",
    productCount: 654,
  },
  {
    id: 4,
    name: "Toyota",
    logo: "/placeholder.svg?height=50&width=80",
    href: "/categories/toyota",
    productCount: 1500,
  },
  {
    id: 5,
    name: "Volkswagen",
    logo: "/placeholder.svg?height=50&width=80",
    href: "/categories/volkswagen",
    productCount: 987,
  },
  {
    id: 6,
    name: "Hyundai",
    logo: "/placeholder.svg?height=50&width=80",
    href: "/categories/hyundai",
    productCount: 789,
  },
  {
    id: 7,
    name: "Audi",
    logo: "/placeholder.svg?height=50&width=80",
    href: "/categories/audi",
    productCount: 543,
  },
  {
    id: 8,
    name: "Ford",
    logo: "/placeholder.svg?height=50&width=80",
    href: "/categories/ford",
    productCount: 1122,
  },
  {
    id: 9,
    name: "Honda",
    logo: "/placeholder.svg?height=50&width=80",
    href: "/categories/honda",
    productCount: 678,
  },
  {
    id: 10,
    name: "Kia",
    logo: "/placeholder.svg?height=50&width=80",
    href: "/categories/kia",
    productCount: 910,
  },
  {
    id: 11,
    name: "Nissan",
    logo: "/placeholder.svg?height=50&width=80",
    href: "/categories/nissan",
    productCount: 721,
  },
  {
    id: 12,
    name: "Lada",
    logo: "/placeholder.svg?height=50&width=80",
    href: "/categories/lada",
    productCount: 345,
  },
]

export default function BrandsPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <PageHeader
        title="Avtomobil brendlari"
        subtitle="Barcha mavjud avtomobil brendlari bo'yicha ehtiyot qismlarni toping"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {carBrands.map((brand) => (
            <BrandCard key={brand.id} {...brand} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
