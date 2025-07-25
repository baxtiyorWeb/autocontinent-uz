"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Play, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { JSX } from "react";
import { useToast } from "@/hooks/use-toast"; // Assuming you have useToast
import api from "@/lib/api"; // Your axios instance

interface ProductCardProps {
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
  isLiked?: boolean;
  onLike?: () => void;
}

export function ProductCard({
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
  isLiked = false,
  onLike,
}: ProductCardProps): JSX.Element {
  const { toast } = useToast();

  const discountPercent = originalPrice
    ? Math.round((1 - price / originalPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    // Placeholder user data - IMPORTANT: Replace with actual user data or input
    const orderData = {
      full_name: "John Doe",
      phone_number: "+998901234567",
      address: "123 Main St, Anytown",
      items: [
        {
          product_id: id,
          quantity: 1, // Default quantity, could be dynamic
        },
      ],
    };

    try {
      // Use api.post for POST requests with Axios
      // The first argument is the URL, the second is the data payload
      const response = await api.post("/orders/", orderData); // Correct Axios POST syntax
      console.log("Order created successfully:", response.data); // Axios response has data property
      toast({
        title: "Success",
        description: `${name} savatga qo'shildi!`,
        variant: "default",
      });
      // Optionally, you might want to redirect or update cart UI here
    } catch (error: any) {
      console.error("Failed to add to cart:", error);
      // Axios errors often have a response property with more details
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        "Unknown error";
      toast({
        title: "Error",
        description: `Savatga qo'shishda xatolik yuz berdi: ${errorMessage}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden">
        <Link href={`/products/${id}`}>
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={300}
            height={240}
            className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discountPercent > 0 && (
            <Badge className="bg-destructive hover:bg-red-600 text-white font-semibold">
              -{discountPercent}%
            </Badge>
          )}
          {!inStock && (
            <Badge variant="secondary" className="bg-gray-500 text-white">
              Tugagan
            </Badge>
          )}
        </div>

        {/* Video indicator */}
        {hasVideo && (
          <div className="absolute top-3 right-3">
            <div className="bg-black/70 backdrop-blur-sm rounded-full p-2">
              <Play className="h-4 w-4 text-white" />
            </div>
          </div>
        )}

        {/* Like button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white shadow-lg"
          onClick={onLike}
        >
          <Heart
            className={`h-4 w-4 ${
              isLiked ? "fill-destructive text-destructive" : "text-gray-600"
            }`}
          />
        </Button>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <Badge
            variant="outline"
            className="text-xs font-medium text-primary border-blue-200"
          >
            {brand}
          </Badge>
        </div>

        <Link href={`/products/${id}`}>
          <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({reviewCount})</span>
          <div className="flex items-center gap-1 text-xs text-gray-500 ml-auto">
            <Heart className="h-3 w-3" />
            {likeCount}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-bold text-lg text-gray-900">
              {price.toLocaleString()} so'm
            </div>
            {originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                {originalPrice.toLocaleString()} so'm
              </div>
            )}
          </div>
        </div>

        <Button
          className="w-full bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 text-primary-foreground font-medium"
          // disabled={!inStock}
          onClick={handleAddToCart}
        >
          {inStock ? (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Savatga qo'shish
            </>
          ) : (
            "Tugagan"
          )}
        </Button>
      </div>
    </div>
  );
}
