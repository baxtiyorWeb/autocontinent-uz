"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Play, ShoppingCart, Eye, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { QuickViewModal } from "@/components/quick-view-modal";
import type { JSX } from "react/jsx-runtime";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api"; // Your axios instance

// Define types that exactly match your API's product structure
interface ProductImage {
  id?: number; // Optional as it might not be sent for new images
  image: string; // The URL of the image
}

// No longer need ProductDetailsForCart as we're sending just ID and quantity

interface EnhancedProductCardProps {
  // Directly map props to match the API response structure where possible
  id: number;
  name: string;
  price_uzs: number;
  price_usd: string;
  original_price?: number; // Optional, for display
  images: ProductImage[]; // Use the ProductImage interface
  // The following props are part of the 'product' object within your car model's 'products' array
  brand: number; // Assuming this refers to brand ID from the product object
  car_model: number;
  description: string;
  youtube_link: string | null; // Can be null, so allow for it
  is_active: boolean;

  // Props for display/card specific logic (can have defaults if not from API)
  rating?: number;
  review_count?: number;
  like_count?: number;
  brand_name?: string; // To display brand name, derived from 'brand' ID or passed separately
  stock_count?: number; // Display only, not for API
  is_liked?: boolean;
  onLike?: () => void;
}

export function EnhancedProductCard({
  id,
  name,
  price_uzs,
  price_usd,
  original_price,
  images,
  // These props are still needed for QuickViewModal and potentially other parts of the card
  brand, // From product object
  car_model, // From product object
  description, // From product object
  youtube_link, // From product object
  is_active, // From product object

  // Default values for optional/display-only props
  rating = 0,
  review_count = 0,
  like_count = 0,
  brand_name = "Noma'lum Brend",
  is_liked = false,
  onLike,
}: EnhancedProductCardProps): JSX.Element {
  const { toast } = useToast();

  // Internal mapping for display and `QuickViewModal`
  const price = price_uzs;
  const originalPrice = original_price;
  const primaryImage = images[0]?.image || "/placeholder.svg";
  const hasVideo = !!youtube_link;
  const inStock = true; // Using is_active to determine stock status
  const reviewCount = review_count;
  const likeCountProp = like_count;

  const discountPercent = originalPrice
    ? Math.round((1 - price / originalPrice) * 100)
    : 0;
  const [isQuickViewOpen, setIsQuickViewOpen] = useState<boolean>(false);

  // Product data for QuickViewModal remains the same, as it needs full details
  const productDataForQuickView = {
    id,
    name,
    price,
    originalPrice,
    image: primaryImage,
    rating,
    reviewCount,
    likeCount: likeCountProp,
    brand: brand_name,
    inStock,
    description,
    youtube_link,
  };

  const handleAddToCart = async () => {
    if (!inStock) {
      toast({
        title: "Xato", // Error
        description: "Mahsulot omborda mavjud emas.", // Product is not available in stock.
        variant: "destructive",
      });
      return;
    }

    // --- KORREKSIYA BU YERDA ---
    // Backendning talabiga mos keladigan payloadni yaratish
    const cartPayload = {
      product: id, // Faqat mahsulot ID'sini yuboramiz
      quantity: 1, // Miqdorni 1 qilib belgilaymiz
    };
    // --- ----------------- ---

    try {
      const response = await api.post("/cart/", cartPayload);
      console.log("Product added to cart successfully:", response.data);
      toast({
        title: "Muvaffaqiyatli", // Success
        description: `${name} savatga qo'shildi!`, // ${name} added to cart!
        variant: "default",
      });
      // Optionally, update a global cart state (e.g., using a context)
    } catch (error: any) {
      console.error("Failed to add to cart:", error);

      if (error.response) {
        if (error.response.status === 401) {
          toast({
            title: "Xatolik", // Error
            description: "Savatga mahsulot qo'shish uchun ro'yxatdan o'ting.", // Please register to add products to cart.
            variant: "destructive",
          });
        } else if (error.response.data) {
          const errorMessage =
            error.response.data.detail ||
            error.response.data.message ||
            (typeof error.response.data === "string"
              ? error.response.data
              : JSON.stringify(error.response.data)) ||
            "Noma'lum xatolik"; // Unknown error
          toast({
            title: "Xatolik", // Error
            description: `Savatga qo'shishda xatolik yuz berdi: ${errorMessage}`, // Error adding to cart: ${errorMessage}
            variant: "destructive",
          });
        }
      } else if (error.request) {
        toast({
          title: "Xatolik", // Error
          description:
            "Tarmoq xatosi. Iltimos, internetga ulanishni tekshiring.", // Network error. Please check your internet connection.
          variant: "destructive",
        });
      } else {
        toast({
          title: "Xatolik", // Error
          description: `Kutilmagan xatolik: ${error.message}`, // Unexpected error: ${error.message}
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <div className="group relative flex flex-col bg-white  transition-all duration-300 overflow-hidden border-none  transform hover:-translate-y-0.5">
        {/* Product Image Section */}
        <div className="relative overflow-hidden rounded-t-lg">
          <Link href={`/product/${id}`}>
            <Image
              src={primaryImage}
              alt={name}
              width={220}
              height={140}
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
                        opacity-100 md:opacity-0 md:group-hover:opacity-100
                        transform md:translate-x-4 md:group-hover:translate-x-0
                        transition-all duration-300`}
          >
            <Button
              variant="secondary"
              size="icon"
              className="h-6 w-6 xs:h-7 xs:w-7 bg-white/90 hover:bg-white shadow-md backdrop-blur-sm rounded-full"
              onClick={onLike}
              aria-label={is_liked ? "Unlike" : "Like"}
            >
              <Heart
                className={`h-3 w-3 xs:h-4 xs:w-4 ${
                  is_liked
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
              <Link href={`/product/${id}`}>
                <Eye className="h-3 w-3 xs:h-4 xs:w-4 text-gray-600" />
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
          {/* Brand and Like Count */}
          <div className="flex items-center justify-between mb-1">
            <Badge
              variant="outline"
              className="text-primary border-blue-200 bg-blue-50 font-semibold text-[9px] xs:text-[10px] px-1.5 py-0.5"
            >
              {brand_name}
            </Badge>
            <div className="flex items-center gap-0.5 text-[9px] xs:text-[10px] text-gray-500">
              <Heart className="h-2.5 w-2.5" />
              <span className="font-medium">{likeCountProp}</span>
            </div>
          </div>
          {/* Product Name */}
          <Link href={`/product/${id}`} className="flex-grow">
            <h3 className="font-semibold max-sm-xs:text-xs text-gray-800 text-xs xs:text-sm leading-tight line-clamp-2 hover:text-primary transition-colors duration-200 min-h-[2.5rem]  max-sm-xs:max-h-[1.5rem] mb-1">
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
              {rating}
            </span>
            <span className="text-[9px] xs:text-[10px] text-gray-500">
              ({reviewCount})
            </span>
          </div>
          {/* Price Information */}
          <div className="space-y-0 mb-3   max-sm-xs:mb-1">
            <div className="flex items-center gap-1">
              <span className="text-base max-sm-xs:text-sm xs:text-lg font-bold text-gray-900">
                {price}{" "}
                <span className="text-sm xs:text-base text-gray-600">
                  so&apos;m
                </span>
              </span>
            </div>
            {originalPrice && (
              <div className="flex items-center gap-1">
                <span className="text-[9px] xs:text-[10px] text-gray-500 line-through">
                  {originalPrice} so&apos;m
                </span>
                <span className="text-[9px] xs:text-[10px] text-green-600 font-semibold">
                  {originalPrice - price}{" "}
                  <span className="max-sm-xs:hidden">so&apos;m</span> tejash
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
            onClick={handleAddToCart}
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