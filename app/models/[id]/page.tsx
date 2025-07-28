"use client";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/ui/page-header";
import { BrandCard } from "@/components/ui/brand-card"; // Re-using BrandCard for models
import type { JSX } from "react";
import api from "@/lib/api";
import { useParams } from "next/navigation";

// Define the interfaces to match your API response structure more closely
interface CarModel {
  id: number;
  name: string;
  brand: number; // The ID of the brand it belongs to
  brand_name: string; // The name of the brand (from API)
  image: string | null; // URL of the car model's image
  products: any[]; // Assuming products is an array, though not used here
}

interface BrandDetailResponse {
  id: number;
  name: string;
  image: string; // The brand's own image/logo
  car_models: CarModel[]; // Array of car models associated with this brand
}

export default function ModelsPage(): JSX.Element {
  const [carModels, setCarModels] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [brandName, setBrandName] = useState("Modellar"); // State to store brand name for page header
  const params = useParams();
  const brandId = params?.id;

  useEffect(() => {
    const fetchCarModels = async () => {
      setLoading(true); // Start loading
      try {
        // Fetch data for a specific brand, which includes its car_models
        const res = await api.get<BrandDetailResponse>(`/brands/${brandId}/`);
        const data = res.data; // Access the data directly from the response

        setBrandName(data.name); // Set the brand name for the header

        // The car models are inside the 'car_models' key of the brand detail response
        if (Array.isArray(data.car_models)) {
          setCarModels(data.car_models);
        } else {
          console.warn("API response for car_models was not an array:", data);
          setCarModels([]); // Ensure it's an empty array if not an array
        }
      } catch (error) {
        console.error("Error fetching car models:", error);
        // You might want to show a toast message here for the user
        // Example: toast({ title: "Xato", description: "Modellarni yuklashda xato yuz berdi.", variant: "destructive" });
        setCarModels([]); // Clear models on error
      } finally {
        setLoading(false); // End loading
      }
    };

    if (brandId) {
      fetchCarModels();
    } else {
      setLoading(false); // If no brandId, stop loading immediately
    }
  }, [brandId]); // Re-run effect when brandId changes

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <PageHeader
        title={`${brandName} modellari`}
        subtitle="Mashina modellarini tanlab, mos ehtiyot qismlarni toping"
      />

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center text-lg py-12">Yuklanmoqda...</p>
        ) : carModels.length === 0 ? (
          <p className="text-center text-lg py-12 text-muted-foreground">
            Bu brend uchun modellar topilmadi.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-sm:grid-cols-4">
            {carModels.map((model) => (
              <BrandCard
                key={model.id}
                id={model.id}
                name={model.name}
                // --- KORREKSIYA BU YERDA ---s
                // `model.image` to'g'ridan-to'g'ri rasm URL manzilini o'z ichiga oladi
                // Agar `model.image` null bo'lsa, placeholder rasm ishlatilsin
                logo={model.image || "/placeholder.svg"}
                // Har bir model o'zining kategoriyalariga emas, balki
                // o'ziga mos mahsulotlar sahifasiga yo'naltirishi kerak
                // Masalan: `/models/${model.id}/products` yoki shunga o'xshash
                href={`/categories/${model.id}`} // Kategoriya emas, mahsulotlar sahifasiga yo'naltirish
                productCount={model.products?.length || 0} // Mahsulotlar sonini API javobidan olish
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
