"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EnhancedProductCard } from "@/components/ui/enhanced-product-card";
import type { JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

// Define the structure of your API product data more precisely
interface ApiProduct {
  id: number;
  name: string;
  price_uzs: number;
  price_usd: string; // Assuming this comes as a string from the API
  images: { image: string }[];
  description: string;
  youtube_link: string;
  is_active: boolean;
  category: number; // Add other fields if needed for the card
  car_model: number; // Add other fields if needed for the card
}

// Update Product interface to match what EnhancedProductCard expects and
// how you'll transform ApiProduct data
interface Product {
  id: number;
  name: string;
  price: number; // This will be price_uzs
  originalPrice?: number; // You might need to add this to your API or calculate it
  image: string; // This will be the first image from the images array
  rating: number; // You might need to add this to your API or use a default
  reviewCount: number; // You might need to add this to your API or use a default
  likeCount: number; // You might need to add this to your API or use a default
  hasVideo?: boolean; // Based on youtube_link
  brand: string; // You might need to add this to your API or derive it
  inStock: boolean; // Based on is_active
  stockCount?: number;
  description?: string;
}

interface ProductsSectionProps {
  title: string;
  type: string;
}

export function ProductsSection({
  title,
  type,
}: ProductsSectionProps): JSX.Element {
  const { data, isLoading, isError } = useQuery<{ results: ApiProduct[] }>({
    queryKey: ["products", type], // Use 'products' and 'type' for a more specific query key
    queryFn: async () => {
      const response = await api.get(`/products/`); // Assuming 'type' can be used as a query parameter
      return response.data; // Access the data property of the response
    },
    // You might want to enable this for caching
    // staleTime: 5 * 60 * 1000, // 5 minutes
    // cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  // Handle loading and error states
  if (isLoading) {
    return (
      <section>
        <div className="flex justify-between items-center mb-6 max-sm-xs:mb-3">
          <h2 className="text-2xl sm:text-xl xs:text-lg font-bold truncate">
            {title}
          </h2>
          <Button
            variant="outline"
            className="text-sm xs:text-xs px-3 py-1 xs:px-2 xs:py-0.5 whitespace-nowrap"
          >
            Barchasini ko'rish
          </Button>
        </div>
        <div className="grid gap-4 xs:gap-3 sm:gap-4 grid-cols-2 max-sm-xs:grid-cols-2 max-sm-xs:gap-2 max-sm-xs:shadow-none sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {/* Display skeleton loaders while loading */}
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-sm p-4 animate-pulse"
            >
              <div className="w-full h-32 bg-gray-200 mb-2 rounded"></div>
              <div className="h-4 bg-gray-200 w-3/4 mb-2 rounded"></div>
              <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <div className="flex justify-between items-center mb-6 max-sm-xs:mb-3">
          <h2 className="text-2xl sm:text-xl xs:text-lg font-bold truncate">
            {title}
          </h2>
          <Button
            variant="outline"
            className="text-sm xs:text-xs px-3 py-1 xs:px-2 xs:py-0.5 whitespace-nowrap"
          >
            Barchasini ko'rish
          </Button>
        </div>
        <p className="text-red-500">
          Error loading products. Please try again later.
        </p>
      </section>
    );
  }

  // Transform the API data into the Product interface expected by EnhancedProductCard
  const products: Product[] =
    data?.results?.map((apiProduct: ApiProduct) => ({
      id: apiProduct.id,
      name: apiProduct.name,
      price: apiProduct.price_uzs,
      // You can add logic for originalPrice if your API provides it or if you have discounts
      // originalPrice: apiProduct.original_price_uzs, // Example if your API had it
      image:
        apiProduct.images.length > 0
          ? apiProduct.images[0].image
          : "/placeholder-image.png", // Use a placeholder if no image
      rating: 0, // Default or fetch from API if available
      reviewCount: 0, // Default or fetch from API if available
      likeCount: 0, // Default or fetch from API if available
      hasVideo: !!apiProduct.youtube_link, // True if youtube_link exists
      brand: "Unknown", // You might need to add a brand field to your API or derive it
      inStock: apiProduct.is_active,
      description: apiProduct.description,
    })) || [];

  return (
    <section>
      <div className="flex justify-between items-center mb-6 max-sm-xs:mb-3">
        <h2 className="text-2xl sm:text-xl xs:text-lg font-bold truncate">
          {title}
        </h2>

        <Button
          variant="outline"
          className="text-sm xs:text-xs px-3 py-1 xs:px-2 xs:py-0.5 whitespace-nowrap"
        >
          Barchasini ko'rish
        </Button>
      </div>

      <div
        className="grid gap-4 xs:gap-3 sm:gap-4
             grid-cols-2                  
             max-sm-xs:grid-cols-2     
             max-sm-xs:gap-2     
             max-sm-xs:shadow-none     
             sm:grid-cols-3
             md:grid-cols-4
             lg:grid-cols-5
             xl:grid-cols-6"
      >
        {products.map((product) => (
          <EnhancedProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
