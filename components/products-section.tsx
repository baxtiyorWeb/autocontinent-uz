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
  category: number;
  car_model: number;
  price_usd: string; // "3999.00"
  price_uzs: number; // 49987500
  description: string;
  youtube_link: string | null; // API might return null for no video
  is_active: boolean; // For 'inStock'
  images: { id: number; image: string }[]; // Array of image objects
  // Optional fields that might be present or missing from your API
  original_price?: number;
  rating?: number;
  review_count?: number;
  like_count?: number;
  brand?: string;
  stock_count?: number;
  is_liked?: boolean;
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
      category: apiProduct.category,
      car_model: apiProduct.car_model,
      price_usd: apiProduct.price_usd,
      price_uzs: apiProduct.price_uzs,
      description: apiProduct.description,
      youtube_link: apiProduct.youtube_link,
      is_active: apiProduct.is_active,
      images: apiProduct.images,

      // optional or default fields:
      rating: 0,
      review_count: 0,
      like_count: 0,
      brand: apiProduct.car_model || "Unknown",
      is_liked: false,
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
          asChild
        >
          <Link href="/products">Barchasini ko'rish</Link>
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
        {products?.map((product: any) => (
          <EnhancedProductCard
            key={product.id}
            {...product} // This spreads all properties of the product object
            // You might want to explicitly pass some for clarity or if names differ
            id={product.id}
            name={product.name}
            price_uzs={product.price_uzs}
            price_usd={product.price_usd}
            images={product.images}
            brand={product.brand} // The numeric brand ID from the product
            brand_name={product.brand_name} // The brand name from the parent carModel
            car_model={product.car_model}
            description={product.description}
            youtube_link={product.youtube_link}
            is_active={product.is_active}
            // ... other optional props like rating, review_count, like_count
          />
        ))}
      </div>
    </section>
  );
}
