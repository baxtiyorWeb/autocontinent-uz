"use client";

import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react"; // ArrowRight olib tashlandi
import type { JSX } from "react";

interface CategoryCardProps {
  id: number;
  name: string;
  icon: string;
  count: number;
  href: string;
  description?: string;
}

export function CategoryCard({
  id,
  name,
  icon,
  count,
  href,
  description,
}: CategoryCardProps): JSX.Element {
  return (
    <Link href={href}>
      <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary transform hover:-translate-y-0.5 cursor-pointer">
        {/* Content */}
        <div className="relative p-3 text-center space-y-2">
          {/* Icon container */}
          <div className="relative mx-auto w-16 h-16 flex items-center justify-center rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
            {icon ? (
              <Image
                src={icon || "/placeholder.svg"}
                alt={name}
                width={40} // Kichiklashtirildi
                height={40} // Kichiklashtirildi
                className="rounded-lg object-contain group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <Package className="h-10 w-10 text-primary group-hover:text-blue-700 transition-colors duration-300" />
            )}
          </div>
          {/* Category name */}
          <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2 min-h-[2.5rem]">
            {name}
          </h3>
          {/* Product count */}
          <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
            {count.toLocaleString()} mahsulot
          </p>
          {/* Description if provided (not in image, keeping for flexibility) */}
          {description && (
            <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
