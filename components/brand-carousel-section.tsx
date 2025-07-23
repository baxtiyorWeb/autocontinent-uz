"use client";

import React from "react";
import Link from "next/link";
import { BrandCard } from "@/components/ui/brand-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { JSX } from "react";

interface Brand {
  id: number;
  name: string;
  logo: string;
  href: string;
  productCount?: number;
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
];

export function BrandCarouselSection(): JSX.Element {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = (): void => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = (): void => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <section className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Avtomobil brendlari</h2>
        <Link href="/brands">
          <Button variant="outline">Barchasini ko'rish</Button>
        </Link>
      </div>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto whitespace-nowrap scrollbar-hide py-2 -mx-4 px-4"
        >
          {carBrands.map((brand) => (
            <div
              key={brand.id}
              className="flex-shrink-0 w-[150px] sm:w-[180px] md:w-[200px] lg:w-[180px] xl:w-[160px] mr-4"
            >
              <BrandCard {...brand} />
            </div>
          ))}
        </div>
        {carBrands.length > 6 && ( // Show arrows only if there are more than 6 brands (adjust as needed for responsiveness)
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white z-10 rounded-full shadow-md hidden md:flex"
              onClick={scrollLeft}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white z-10 rounded-full shadow-md hidden md:flex"
              onClick={scrollRight}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
