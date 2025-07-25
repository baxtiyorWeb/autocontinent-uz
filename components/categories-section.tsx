"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { CategoryCard } from "@/components/ui/category-card"; // This component is not used in the provided JSX, but kept for completeness
import { BrandCard } from "@/components/ui/brand-card";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

interface ApiCategory {
  id: number;
  name: string;
  image: string;
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
  image: string; // <-- Changed from 'logo' to 'image' to match your API
  product_count?: number;
}

interface ApiBrandsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiBrand[];
}

export function CategoriesSection({
  title, // 'title' prop is unused in the provided JSX
}: {
  title: string;
}): React.JSX.Element {
  const [categories, setCategories] = useState<ApiCategory[]>([]); // This state is not used in the provided JSX
  const [brands, setBrands] = useState<ApiBrand[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true); // This state is not used for rendering in the provided JSX
  const [loadingBrands, setLoadingBrands] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch Categories (kept for completeness, though not rendered in snippet)
    const fetchCategoriesData = async () => {
      try {
        setLoadingCategories(true);
        const { data } = await api.get<ApiCategoriesResponse>("/categories/"); // Destructure data
        if (Array.isArray(data?.results)) {
          // Access results directly
          setCategories(data.results);
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
        const { data } = await api.get<ApiBrandsResponse>("/brands/"); // Destructure data
        if (Array.isArray(data?.results)) {
          // Access results directly
          setBrands(data.results);
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

    // fetchCategoriesData(); // Call fetch categories
    fetchBrandsData();
  }, [toast]); // Depend on toast if it's stable or memoized, otherwise remove

  return (
    <section className="space-y-8">
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
                // --- KORREKSIYA BU YERDA ---
                logo={brand.image} // API'dan keladigan 'image' maydonini BrandCard'ning 'logo' propiga beryapmiz
                // --- ----------------- ---
                productCount={brand.product_count}
                href={`/models/${brand.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
