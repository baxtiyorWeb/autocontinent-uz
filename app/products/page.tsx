"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EnhancedProductCard } from "@/components/ui/enhanced-product-card";
import type { JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { Filter, SortAsc, SortDesc } from "lucide-react"; // Ixtiyoriy ikonalar

// Define the structure of your API product data more precisely
interface ApiProduct {
  id: number;
  name: string;
  price_uzs: number;
  price_usd: string; // Assuming this comes as a string from the API
  images: { id: number; image: string }[]; // Updated to match your serializer
  description: string;
  youtube_link: string;
  is_active: boolean;
  category: number;
  car_model: number;
  // Brand name direct from product if your API provides it (highly recommended for cards)
  brand_name?: string; // Add this if your ProductSerializer exposes brand.name
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
  brand_name?: string; // Explicitly pass brand_name to card
  // Optional fields that might be present or missing from your API
  original_price?: number;
  rating?: number;
  review_count?: number;
  like_count?: number;
  stock_count?: number;
  is_liked?: boolean;
}

interface ProductsSectionSearchProps {
  // `title` prop bu sahifada kamroq ahamiyatga ega, chunki u qidiruv natijasi.
  // Lekin agar kerak bo'lsa, qoldiramiz.
  title?: string; // Optional if not always needed
  type?: string; // Not directly used in search results, but can be kept for consistency
}

export default function ProductsSectionSearch({
  title, // `title` is now optional for this search page
}: ProductsSectionSearchProps): JSX.Element {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || ""; // Qidiruv so'rovi
  const page = searchParams.get("page") || "1"; // Pagination
  const sort = searchParams.get("sort") || ""; // Saralash
  const categoryFilter = searchParams.get("category") || ""; // Kategoriya filtri
  const brandFilter = searchParams.get("brand") || ""; // Brend filtri

  const { data, isLoading, isError, refetch } = useQuery<{
    results: ApiProduct[];
    count: number;
  }>({
    queryKey: [
      "products-search",
      searchQuery,
      page,
      sort,
      categoryFilter,
      brandFilter,
    ],

    queryFn: async () => {
      let url = `/products?page=${page}`;
      if (searchQuery) url += `&search=${searchQuery}`;
      if (sort) url += `&ordering=${sort}`; // `ordering` is the DRF default for sort
      if (categoryFilter) url += `&category=${categoryFilter}`;
      if (brandFilter) url += `&brand=${brandFilter}`;

      const response = await api.get(url);
      return response.data;
    },

    // Sahifalar o'tganda ma'lumotni ushlab turish
  });

  // Pagination uchun
  const totalResults = data?.count || 0;
  const productsPerPage = 10; // API pagination limits or your desired limit
  const totalPages = Math.ceil(totalResults / productsPerPage);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    // Use next/router or window.location.href for navigation
    window.location.href = `/search?${params.toString()}`;
  };

  // Filter/Sort handling (Conceptual - actual implementation might need dropdowns, etc.)
  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    params.set("page", "1"); // Sorting resets to first page
    window.location.href = `/search?${params.toString()}`;
  };

  const handleFilterChange = (filterType: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(filterType, value);
    } else {
      params.delete(filterType);
    }
    params.set("page", "1"); // Filtering resets to first page
    window.location.href = `/search?${params.toString()}`;
  };

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
      brand_name: apiProduct.brand_name || "Noma'lum", // Ensure brand_name is passed
      rating: 0,
      review_count: 0,
      like_count: 0,
      stock_count: 0,
      is_liked: false,
    })) || [];

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-6">
        {searchQuery ? (
          <h1 className="text-3xl font-bold mb-2">
            "{searchQuery}" uchun qidiruv natijalari
          </h1>
        ) : (
          <h1 className="text-3xl font-bold mb-2">Mahsulotlar</h1>
        )}
        {totalResults > 0 && (
          <p className="text-gray-600 text-lg">
            Jami {totalResults} ta mahsulot topildi.
          </p>
        )}
      </div>

      {/* Filters and Sort (Conceptual UI - you'd replace with actual dropdowns/components) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-700">Filtrlar:</span>
          {/* Example Filter Buttons/Dropdowns */}
          <Button
            variant={categoryFilter === "1" ? "default" : "outline"}
            size="sm"
            onClick={() =>
              handleFilterChange("category", categoryFilter === "1" ? "" : "1")
            }
          >
            Avtomobil Qismlari
          </Button>
          <Button
            variant={brandFilter === "2" ? "default" : "outline"}
            size="sm"
            onClick={() =>
              handleFilterChange("brand", brandFilter === "2" ? "" : "2")
            }
          >
            BMW
          </Button>
          {/* ... More filter options */}
        </div>

        <div className="flex items-center gap-2">
          <SortAsc className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-700">Saralash:</span>
          {/* Example Sort Buttons/Dropdowns */}
          <Button
            variant={sort === "price_usd" ? "default" : "outline"}
            size="sm"
            onClick={() => handleSortChange("price_usd")}
          >
            Narxi (O'sish)
          </Button>
          <Button
            variant={sort === "-price_usd" ? "default" : "outline"}
            size="sm"
            onClick={() => handleSortChange("-price_usd")}
          >
            Narxi (Kamayish)
          </Button>
          {/* ... More sort options */}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-4 xs:gap-3 sm:gap-4 grid-cols-2 max-sm-xs:grid-cols-2 max-sm-xs:gap-2 max-sm-xs:shadow-none sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-sm p-4 animate-pulse bg-white"
            >
              <div className="w-full h-32 bg-gray-200 mb-2 rounded"></div>
              <div className="h-4 bg-gray-200 w-3/4 mb-2 rounded"></div>
              <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-10">
          <p className="text-red-500 text-lg">
            Mahsulotlarni yuklashda xatolik yuz berdi. Iltimos, keyinroq urinib
            ko'ring.
          </p>
          <Button onClick={() => refetch()} className="mt-4">
            Qayta urinish
          </Button>
        </div>
      )}

      {/* No Results State */}
      {!isLoading && !isError && products.length === 0 && (
        <div className="text-center py-10">
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            Hech qanday mahsulot topilmadi.
          </h3>
          {searchQuery && (
            <p className="text-gray-500">
              "{searchQuery}" so'rovi bo'yicha hech qanday natija yo'q. Boshqa
              so'zlar bilan urinib ko'ring.
            </p>
          )}
          <Button asChild className="mt-4">
            <Link href="/">Bosh sahifaga qaytish</Link>
          </Button>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !isError && products.length > 0 && (
        <>
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
              <EnhancedProductCard
                key={product.id}
                // Ensure all props expected by EnhancedProductCard are passed
                // Your current {...product} spread is good if Product matches EnhancedProductCardProps
                {...product}
                // Explicitly pass brand_name if it's available in API response
                brand_name={product.brand_name || "Noma'lum"}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalResults > productsPerPage && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(parseInt(page) - 1)}
                disabled={parseInt(page) <= 1}
              >
                Oldingi
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={parseInt(page) === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(parseInt(page) + 1)}
                disabled={parseInt(page) >= totalPages}
              >
                Keyingi
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
