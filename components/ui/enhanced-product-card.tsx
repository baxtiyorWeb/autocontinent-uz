"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Play, ShoppingCart, Eye, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { QuickViewModal } from "@/components/quick-view-modal"; // Ensure this path is correct
import type { JSX } from "react/jsx-runtime";

interface EnhancedProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  likeCount: number;
  hasVideo?: boolean;
  brand: string;
  inStock: boolean;
  stockCount?: number;
  description?: string;
  isLiked?: boolean;
  onLike?: () => void;
  onAddToCart?: () => void;
}

export function EnhancedProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  likeCount,
  hasVideo,
  brand,
  inStock,
  stockCount,
  description,
  isLiked = false,
  onLike,
  onAddToCart,
}: EnhancedProductCardProps): JSX.Element {
  const discountPercent = originalPrice
    ? Math.round((1 - price / originalPrice) * 100)
    : 0;
  const [isQuickViewOpen, setIsQuickViewOpen] = useState<boolean>(false);

  const productDataForQuickView = {
    id,
    name,
    price,
    originalPrice,
    image,
    rating,
    reviewCount,
    likeCount,
    brand,
    inStock,
    stockCount,
    description,
  };

  return (
    <>
      <div className="group relative flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary transform hover:-translate-y-0.5">
        {/* Product Image Section */}
        <div className="relative overflow-hidden rounded-t-lg">
          <Link href={`/products/${id}`}>
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              width={220} // Maksimal kenglik
              height={140} // Maksimal balandlik
              className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Overlay for hover effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Top-left badges */}
          <div className="absolute top-1 left-1 flex flex-col gap-0.5 z-10">
            {discountPercent > 0 && (
              <Badge className="bg-destructive text-white font-bold text-[10px] px-1.5 py-0.5">
                -{discountPercent}%
              </Badge>
            )}
            {!inStock && (
              <Badge className="bg-gray-500 text-white font-semibold text-[10px] px-1.5 py-0.5">
                Tugagan
              </Badge>
            )}
            {hasVideo && (
              <Badge className="bg-purple-600 text-white font-semibold text-[10px] px-1.5 py-0.5">
                <Play className="h-2.5 w-2.5 mr-0.5" />
                Video
              </Badge>
            )}
          </div>

          {/* Top-right action buttons */}
          <div
            className={`absolute top-1 right-1 flex flex-col gap-0.5 z-10
                        opacity-100 md:opacity-0 md:group-hover:opacity-100           {/* Mobil ekranda doim ko'rinadi, kattaroq ekranda hoverda */}
                        transform md:translate-x-4 md:group-hover:translate-x-0     {/* Mobil ekranda doim o'rnida, kattaroq ekranda hover animatsiyasi */}
                        transition-all duration-300`}
          >
            <Button
              variant="secondary"
              size="icon"
              className="h-6 w-6 xs:h-7 xs:w-7 bg-white/90 hover:bg-white shadow-md backdrop-blur-sm rounded-full"
              onClick={onLike}
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <Heart
                className={`h-3 w-3 xs:h-4 xs:w-4 ${
                  // xs:h-4, xs:w-4 qo'shildi
                  isLiked
                    ? "fill-destructive text-destructive"
                    : "text-gray-600"
                }`}
              />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-6 w-6 xs:h-7 xs:w-7 bg-white/90 hover:bg-white shadow-md backdrop-blur-sm rounded-full"
              asChild
              aria-label="View product details"
            >
              <Link href={`/products/${id}`}>
                <Eye className="h-3 w-3 xs:h-4 xs:w-4 text-gray-600" />{" "}
                {/* xs:h-4, xs:w-4 qo'shildi */}
              </Link>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-6 w-6 xs:h-7 xs:w-7 bg-white/90 hover:bg-white shadow-md backdrop-blur-sm rounded-full"
              aria-label="Share product"
            >
              <Share2 className="h-3 w-3 xs:h-4 xs:w-4 text-gray-600" />
            </Button>
          </div>

          <div
            className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 z-10
                        opacity-100 md:opacity-0 md:group-hover:opacity-100           
                        md:translate-y-4 md:group-hover:translate-y-0             
                        transition-all duration-300`}
          >
            <Button
              variant="secondary"
              size="sm"
              className="h-6 px-2 py-0.5 text-[10px] xs:h-7 xs:px-3 xs:text-xs bg-white/95 hover:bg-white shadow-md backdrop-blur-sm font-semibold"
              onClick={() => setIsQuickViewOpen(true)}
            >
              Tezkor ko&apos;rish
            </Button>
          </div>
        </div>

        {/* Product Details Content */}
        <div className="p-3 xs:p-2 flex flex-col flex-grow">
          {" "}
          {/* Kichik ekranlar uchun padding kamaytirildi */}
          {/* Brand and Like Count */}
          <div className="flex items-center justify-between mb-1">
            <Badge
              variant="outline"
              className="text-primary border-blue-200 bg-blue-50 font-semibold text-[9px] xs:text-[10px] px-1.5 py-0.5" // xs:text-[10px] qo'shildi
            >
              {brand}
            </Badge>
            <div className="flex items-center gap-0.5 text-[9px] xs:text-[10px] text-gray-500">
              {" "}
              {/* xs:text-[10px] qo'shildi */}
              <Heart className="h-2.5 w-2.5" />
              <span className="font-medium">{likeCount}</span>
            </div>
          </div>
          {/* Product Name */}
          <Link href={`/products/${id}`} className="flex-grow">
            <h3 className="font-semibold max-sm-xs:text-xs text-gray-800 text-xs xs:text-sm leading-tight line-clamp-2 hover:text-primary transition-colors duration-200 min-h-[2.5rem]  max-sm-xs:max-h-[1.5rem] mb-1">
              {" "}
              {/* text-xs qo'shildi */}
              {name}
            </h3>
          </Link>
          {/* Rating and Review Count */}
          <div className="flex items-center gap-0.5 mb-2  max-sm-xs:mb-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-2.5 w-2.5 ${
                    i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-[9px] xs:text-[10px] font-medium text-gray-700">
              {" "}
              {/* xs:text-[10px] qo'shildi */}
              {rating}
            </span>
            <span className="text-[9px] xs:text-[10px] text-gray-500">
              ({reviewCount})
            </span>{" "}
            {/* xs:text-[10px] qo'shildi */}
          </div>
          {/* Price Information */}
          <div className="space-y-0 mb-3   max-sm-xs:mb-1">
            <div className="flex items-center gap-1">
              <span className="text-base max-sm-xs:text-sm xs:text-lg font-bold text-gray-900">
                {" "}
                {/* text-base qo'shildi */}
                {price.toLocaleString()}{" "}
                <span className="text-sm xs:text-base text-gray-600">
                  so&apos;m
                </span>{" "}
                {/* text-sm qo'shildi */}
              </span>
            </div>
            {originalPrice && (
              <div className="flex items-center gap-1">
                <span className="text-[9px] xs:text-[10px] text-gray-500 line-through">
                  {" "}
                  {/* xs:text-[10px] qo'shildi */}
                  {originalPrice.toLocaleString()} so&apos;m
                </span>
                <span className="text-[9px] xs:text-[10px] text-green-600 font-semibold">
                  {" "}
                  {/* xs:text-[10px] qo'shildi */}
                  {(originalPrice - price).toLocaleString()} so&apos;m tejash
                </span>
              </div>
            )}
          </div>
          {/* Add to Cart Button */}
          <Button
            className={`w-full h-8 xs:h-9 font-semibold text-xs xs:text-sm mt-auto transition-all duration-300
    flex items-center justify-center gap-2 text-center
    ${
      inStock
        ? "bg-gradient-to-r from-primary via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-primary-foreground shadow-sm hover:shadow-md"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }
  `}
            disabled={!inStock}
            onClick={onAddToCart}
          >
            {inStock ? (
              <>
                <ShoppingCart className="w-4 h-4 shrink-0" />
                <span className="truncate">Savatga </span>
              </>
            ) : (
              "Tugagan"
            )}
          </Button>
        </div>
      </div>

      <QuickViewModal
        product={productDataForQuickView}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
