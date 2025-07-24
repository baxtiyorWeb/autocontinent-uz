"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { CategoryCard } from "@/components/ui/category-card";
import { BrandCard } from "@/components/ui/brand-card";
import { useToast } from "@/hooks/use-toast"; // Assuming you have a toast hook
import api from "@/lib/api";

// Define interfaces for data directly from the API
interface ApiCategory {
  id: number;
  name: string;
  image: string; // API field for category image/icon
  // Assuming API provides a count of products for each category
  product_count?: number;
}

interface ApiCategoriesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiCategory[];
}

interface ApiBrand {
  id: number;
  name: string;
  logo: string; // API field for brand logo
  // Assuming API provides a count of products for each brand
  product_count?: number;
}

interface ApiBrandsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiBrand[];
}

export function CategoriesSection({
  title,
}: {
  title: string;
}): React.JSX.Element {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [brands, setBrands] = useState<ApiBrand[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch Categories
    const fetchCategoriesData = async () => {
      try {
        setLoadingCategories(true);
        const data = await api.get<ApiCategoriesResponse>("/categories/");
        if (Array.isArray(data?.data?.results)) {
          setCategories(data?.data?.results);
        } else {
          console.error("API response for categories was not an array:", data);
          throw new Error(
            "Invalid response: categories results is not an array."
          );
        }
      } catch (error: any) {
        toast({
          title: "Xatolik",
          description: `Kategoriyalar yuklanmadi: ${error.message}`,
          variant: "destructive",
        });
      } finally {
        setLoadingCategories(false);
      }
    };

    // Fetch Brands
    const fetchBrandsData = async () => {
      try {
        setLoadingBrands(true);
        const data = await api.get<ApiBrandsResponse>("/brands/");
        if (Array.isArray(data?.data?.results)) {
          setBrands(data?.data?.results);
        } else {
          console.error("API response for brands was not an array:", data);
          throw new Error("Invalid response: brands results is not an array.");
        }
      } catch (error: any) {
        toast({
          title: "Xatolik",
          description: `Brendlar yuklanmadi: ${error.message}`,
          variant: "destructive",
        });
      } finally {
        setLoadingBrands(false);
      }
    };

    fetchCategoriesData();
    fetchBrandsData();
  }, [toast]); // Depend on toast if it's stable or memoized, otherwise remove

  return (
    <section className="space-y-8">
      {/* Categories */}
      <div>
        <h2 className="text-2xl sm:text-xl xs:text-lg font-bold truncate">
          Kategoriyalar
        </h2>
        {loadingCategories ? (
          <div className="text-center py-8">Kategoriyalar yuklanmoqda...</div>
        ) : categories.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Kategoriyalar topilmadi.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                icon={category.image} // Mapping API's 'image' to CategoryCard's 'icon'
                count={category.product_count || 0} // Use product_count if available, otherwise 0
                href={`/categories/${category.id}`} // Or generate slug if your API provides it
              />
            ))}
          </div>
        )}
      </div>

      {/* Car Brands */}
      <div>
        <h2 className="text-2xl sm:text-xl xs:text-lg font-bold truncate">
          Avtomobil brendlari
        </h2>
        {loadingBrands ? (
          <div className="text-center py-8">Brendlar yuklanmoqda...</div>
        ) : brands.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Brendlar topilmadi.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brands.map((brand) => (
              <BrandCard
                key={brand.id}
                id={brand.id}
                name={brand.name}
                logo={brand.logo} // Mapping API's 'logo' to BrandCard's 'logo'
                productCount={brand.product_count} // Use product_count if available
                href={`/brands/${brand.id}`} // Or generate slug
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
