import { CategoryCard } from "@/components/ui/category-card";
import { BrandCard } from "@/components/ui/brand-card";
import type React from "react";
import { useEffect } from "react";

interface Category {
  id: number;
  name: string;
  icon: string;
  count: number;
  href: string;
}

interface Brand {
  id: number;
  name: string;
  logo: string;
  href: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Motor qismlari",
    icon: "/placeholder.svg?height=60&width=60",
    count: 1250,
    href: "/categories/motor-qismlari",
  },
  {
    id: 2,
    name: "Tormoz tizimi",
    icon: "/placeholder.svg?height=60&width=60",
    count: 890,
    href: "/categories/tormoz-tizimi",
  },
  {
    id: 3,
    name: "Elektr qismlari",
    icon: "/placeholder.svg?height=60&width=60",
    count: 2100,
    href: "/categories/elektr-qismlari",
  },
  {
    id: 4,
    name: "Filtrlar",
    icon: "/placeholder.svg?height=60&width=60",
    count: 650,
    href: "/categories/filtrlar",
  },
  {
    id: 5,
    name: "Yoqilg'i tizimi",
    icon: "/placeholder.svg?height=60&width=60",
    count: 780,
    href: "/categories/yoqilgi-tizimi",
  },
  {
    id: 6,
    name: "Salon aksessuarlari",
    icon: "/placeholder.svg?height=60&width=60",
    count: 450,
    href: "/categories/salon-aksesuarlari",
  },
];

const carBrands: Brand[] = [
  {
    id: 1,
    name: "Chevrolet",
    logo: "/placeholder.svg?height=50&width=80",
    href: "/categories/chevrolet",
  },
  {
    id: 2,
    name: "Mercedes-Benz",
    logo: "/placeholder.svg?height=50&width=80",
    href: "/categories/mercedes",
  },
  {
    id: 3,
    name: "BMW",
    logo: "/placeholder.svg?height=50&width=80",
    href: "/categories/bmw",
  },
  {
    id: 4,
    name: "Toyota",
    logo: "/placeholder.svg?height=50&width=80",
    href: "/categories/toyota",
  },
  {
    id: 5,
    name: "Volkswagen",
    logo: "/placeholder.svg?height=50&width=80",
    href: "/categories/volkswagen",
  },
  {
    id: 6,
    name: "Hyundai",
    logo: "/placeholder.svg?height=50&width=80",
    href: "/categories/hyundai",
  },
];

export function CategoriesSection({ title: string }): React.JSX.Element {
  return (
    <section className="space-y-8">
      {/* Categories */}
      <div>
        <h2 className="text-2xl sm:text-xl xs:text-lg font-bold truncate">
          Kategoriyalar
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </div>

      {/* Car Brands */}
      <div>
        <h2 className="text-2xl sm:text-xl xs:text-lg font-bold truncate">
          Avtomobil brendlari
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {carBrands.map((brand) => (
            <BrandCard key={brand.id} {...brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
