"use client";

import Image from "next/image";
import Link from "next/link";
import type { JSX } from "react/jsx-runtime";

interface BrandCardProps {
  id: number;
  name: string;
  logo: string;
  href: string;
  // productCount prop is not used in this specific design, so we can remove it
  productCount?: number;
}

export function BrandCard({
  id,
  name,
  logo,
  href,
  productCount, // Removed from destructuring
}: BrandCardProps): JSX.Element {
  return (
    <Link href={href} className="flex  flex-col items-center justify-start text-center cursor-pointer group">
      {/* Circular Logo Container */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-gray-100 border border-gray-200 overflow-hidden hover:bg-gray-200 transition-colors duration-300">
        <Image
          src={
            logo ||
            "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" // Fallback image
          }
          alt={name}
          // The width/height props here should be larger than the container if you want object-contain to scale it down.
          // Or, match the container size (w-16 = 64px, w-20 = 80px) and let object-contain manage.
          width={80} // Example: a larger value so object-contain scales it down
          height={80} // Example: a larger value
          className="object-contain w-full h-full p-2" // Ensures image fits inside, adjust padding as needed
        />
      </div>
      {/* Brand Name */}
      <span className="mt-2 text-sm font-medium text-gray-800 group-hover:text-black transition-colors duration-200 truncate max-w-[calc(100%-8px)]">
        {name}
      </span>
      {/* Product count is removed as it's not in the target design */}
      {productCount && (
        <p className="text-[10px] text-gray-600">
          {productCount.toLocaleString()} mahsulot
        </p>
      )}
    </Link>
  );
}