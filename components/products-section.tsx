import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EnhancedProductCard } from "@/components/ui/enhanced-product-card";
import type { JSX } from "react";

interface Product {
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
}

interface ProductsSectionProps {
  title: string;
  type: string;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Motor yog'i filteri Chevrolet Lacetti",
    price: 45000,
    originalPrice: 55000,
    // Prom.uz saytidan olingan rasmga olib boruvchi havola
    image:
      "https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload//products/2023/2/20/2/15-1.PNG",
    rating: 4.8,
    reviewCount: 124,
    likeCount: 89,
    hasVideo: true,
    brand: "Chevrolet",
    inStock: true,
  },
  {
    id: 2,
    name: "Tormoz kolodkalari Mercedes W205",
    price: 320000,
    // Bu havola to'g'ridan-to'g'ri rasm emas, tormoz kolodkalari haqida sahifaga olib borishi mumkin.
    image:
      "https://files.glotr.uz/company/000/005/148/products/2018/01/20/15164302157735-060b8bdbc89e007edc8612b2e5b2d0fe.jpg?_=ozb9y",
    rating: 4.9,
    reviewCount: 67,
    likeCount: 156,
    brand: "Mercedes-Benz",
    inStock: true,
  },
  {
    id: 3,
    name: "Akkumulyator 60Ah Universal",
    price: 850000,
    originalPrice: 950000,
    // OLX.uz saytidan olingan rasmga olib boruvchi havola
    image:
      "https://frankfurt.apollo.olxcdn.com/v1/files/gs4spq08t6uu3-UZ/image;s=1000x700",
    rating: 4.7,
    reviewCount: 203,
    likeCount: 234,
    hasVideo: true,
    brand: "Universal",
    inStock: false,
  },
  {
    id: 4,
    name: "Spark plug BMW E90",
    price: 25000,
    // eBay.com saytidan olingan rasmga olib boruvchi havola
    image: "https://i.ebayimg.com/images/g/SGkAAOSw66hmTNah/s-l1600.webp",
    rating: 4.6,
    reviewCount: 89,
    likeCount: 67,
    brand: "BMW",
    inStock: true,
  },
  {
    id: 5,
    name: "Havo filtri Toyota Camry XV70",
    price: 90000,
    originalPrice: 100000,
    // Uzum Market saytidan olingan rasmga olib boruvchi havola
    image: "https://images.uzum.uz/cpdgksjmdtjnp737srug/original.jpg",
    rating: 4.5,
    reviewCount: 75,
    likeCount: 110,
    brand: "Toyota",
    inStock: true,
  },
  {
    id: 6,
    name: "Rul gidravlikasi moyi Lada Granta",
    price: 60000,
    // Lada Granta rul gidravlikasi moyi uchun umumiy qidiruv havolasi. Aniq rasm topilmadi, shuning uchun siz ushbu sahifalarda o'zingiz mos rasmni topishingiz kerak bo'ladi.
    image:
      "https://files.glotr.uz/company/000/004/377/products/2015/08/24/14404312035167-680d995de4babcd3869231f81b369eac.jpg?_=ozb9y",
    rating: 4.2,
    reviewCount: 45,
    likeCount: 30,
    brand: "Lada",
    inStock: true,
  },
  {
    id: 7,
    name: "Shina 205/55 R16 (yozgi)",
    price: 700000,
    originalPrice: 750000,
    // Sello.uz saytidan olingan shina rasmiga olib boruvchi havola
    image:
      "https://static.sello.uz/unsafe/x500/https://static.sello.uz/fm/20220719/c38cd196-4738-49df-8d6a-aefe51bc4acf.JPEG",
    rating: 4.9,
    reviewCount: 310,
    likeCount: 450,
    brand: "Michelin",
    inStock: true,
  },
  {
    id: 8,
    name: "Antifriz (Qizil) 5L",
    price: 120000,
    // Drivers Shop saytidan olingan rasmga olib boruvchi havola
    image:
      "https://shop.driversvillage.uz/uploads/product/KK/KK/f3/antifriz-krasnyi-5l-g12-40-c-super-yuko-4820070248227-1-6.jpg?cacheimg=77903",
    rating: 4.7,
    reviewCount: 95,
    likeCount: 180,
    hasVideo: true,
    brand: "Liqui Moly",
    inStock: true,
  },
  {
    id: 9,
    name: "Avtomobil polikchalari GM Cobalt",
    price: 180000,
    originalPrice: 200000,
    // Sello.uz saytidan olingan avtomobil gilamchalari rasmiga olib boruvchi havola
    image:
      "https://static.sello.uz/unsafe/x500/https://static.sello.uz/fm/20240226/18217fba0e9fac667350ae818f8d0e55.png",
    rating: 4.3,
    reviewCount: 50,
    likeCount: 70,
    brand: "GM",
    inStock: false,
  },
  {
    id: 10,
    name: "Avtomobil tozalash uchun vositalar to'plami",
    price: 250000,
    // Ushbu havolada to'plamning o'zi emas, balki avtomobil tozalash vositalari sotiladigan umumiy sahifa bo'lishi mumkin.
    image:
      "https://images2.zoodmall.uz/cdn-cgi/image/w=500,fit=contain,f=auto/https%3A%2F%2Fimages2.zoodmall.com%2Fhttps%253A%2Fimg.joomcdn.net%2F536a3055093bae4f735fb3560bc45645ae8accdf_original.jpeg",
    rating: 4.6,
    reviewCount: 150,
    likeCount: 200,
    brand: "Turtle Wax",
    inStock: true,
  },
];

export function ProductsSection({
  title,
  type,
}: ProductsSectionProps): JSX.Element {
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
        {sampleProducts.map((product) => (
          <EnhancedProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
