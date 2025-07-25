"use client";

import Image from "next/image";
import Link from "next/link";
import type { JSX } from "react/jsx-runtime";

interface BrandCardProps {
  id: number;
  name: string;
  logo: string;
  href: string;
  productCount?: number;
}

export function BrandCard({
  id,
  name,
  logo,
  href,
  productCount,
}: BrandCardProps): JSX.Element {
  return (
    <Link href={href}>
      <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary transform hover:-translate-y-0.5 cursor-pointer">
        {/* Content */}
        <div className="relative p-3 text-center space-y-2">
          {/* Logo container */}
          <div className="relative mx-auto h-full w-full flex items-center justify-center rounded-xl  transition-colors duration-300">
            <Image
              src={
                logo ||
                "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg"
              }
              alt={name}
              width={100}
              height={60}
              className="object-contain group-hover:scale-105 transition-transform duration-300 max-h-32 max-w-full"
            />
          </div>
          {/* Brand name */}
          <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2 min-h-[2.5rem]">
            {name}
          </h3>
          {/* Product count if provided */}
          {productCount && (
            <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
              {productCount.toLocaleString()} mahsulot
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
