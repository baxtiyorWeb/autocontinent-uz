"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { Filter, Grid3X3, List, ChevronRight, Search, X } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { EnhancedProductCard } from "@/components/ui/enhanced-product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { JSX } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface CategoryData {
  name: string;
  description: string;
  productCount: number;
}

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

interface BrandFilter {
  name: string;
  count: number;
}

interface Subcategory {
  name: string;
  count: number;
  href: string;
}

interface MainCategory {
  name: string;
  href: string;
}

interface MaterialFilter {
  name: string;
  count: number;
}

const categoryData: CategoryData = {
  name: "Motor qismlari",
  description: "Avtomobil motorlari uchun barcha kerakli ehtiyot qismlar",
  productCount: 1247,
};

// ===========================================================================================
// MUHIM: Bu yerga haqiqiy rasm URL-manzillarini qo'shdim. Siz ularni o'zingizning resurslaringizdan almashtirishingiz kerak!
// ===========================================================================================
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

const brands: BrandFilter[] = [
  { name: "Chevrolet", count: 234 },
  { name: "Mercedes-Benz", count: 189 },
  { name: "BMW", count: 156 },
  { name: "Toyota", count: 298 },
  { name: "Hyundai", count: 167 },
  { name: "Volkswagen", count: 203 },
];

const mainCategories: MainCategory[] = [
  { name: "Barcha Turkumlar", href: "/categories" },
  { name: "Motor qismlari", href: "/categories/motor-qismlari" },
  { name: "Tormoz tizimi", href: "/categories/tormoz-tizimi" },
  { name: "Elektr qismlari", href: "/categories/elektr-qismlari" },
  { name: "Suspenziya", href: "/categories/suspenziya" },
  { name: "Transmissiya", href: "/categories/transmissiya" },
];

const materialFilters: MaterialFilter[] = [
  { name: "Metall", count: 500 },
  { name: "Plastik", count: 300 },
  { name: "Kauchuk", count: 150 },
  { name: "Kompozit", count: 80 },
];

const horizontalSubcategories: Subcategory[] = [
  { name: "Suv uchun kulerlar", count: 345, href: "/categories/suv-kulerlar" },
  { name: "Suv pompalari", count: 123, href: "/categories/suv-pompalari" },
  { name: "Filtrlar", count: 345, href: "/categories/filtrlar" },
  { name: "Pistonlar", count: 123, href: "/categories/pistonlar" },
  { name: "Klapanlar", count: 89, href: "/categories/klapanlar" },
  { name: "Pompalar", count: 167, href: "/categories/pompalar" },
  { name: "Termostatlar", count: 78, href: "/categories/termostatlar" },
  { name: "Radiatorlar", count: 234, href: "/categories/radiatorlar" },
  {
    name: "Dvigatel bloklari",
    count: 50,
    href: "/categories/dvigatel-bloklari",
  },
  {
    name: "Gaz taqsimlash mexanizmi",
    count: 65,
    href: "/categories/gaz-taqsimlash-mexanizmi",
  },
  { name: "Kollektorlar", count: 40, href: "/categories/kollektorlar" },
  {
    name: "Gidravlik kompensatorlar",
    count: 30,
    href: "/categories/gidravlik-kompensatorlar",
  },
  { name: "Svechalar", count: 110, href: "/categories/svechalar" },
  { name: "Turbinalar", count: 25, href: "/categories/turbinalar" },
  { name: "Starterlar", count: 90, href: "/categories/starterlar" },
  { name: "Generatorlar", count: 70, href: "/categories/generatorlar" },
  { name: "Injektorlar", count: 130, href: "/categories/injektorlar" },
];

export default function CategoryPage(): JSX.Element {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]); // New state for materials
  const [showFilters, setShowFilters] = useState<boolean>(false); // Mobile filter toggle
  const [showAllSubcategories, setShowAllSubcategories] =
    useState<boolean>(false); // For sidebar subcategories
  const scrollContainerRef = useRef<HTMLDivElement>(null); // For horizontal scroll

  const handleBrandChange = (brand: string, checked: boolean): void => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    }
  };

  const handleMaterialChange = (material: string, checked: boolean): void => {
    if (checked) {
      setSelectedMaterials([...selectedMaterials, material]);
    } else {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material));
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Ko'rsatiladigan sidebar kichik kategoriyalarini aniqlash
  const displayedSidebarSubcategories = showAllSubcategories
    ? horizontalSubcategories // Renamed subcategories to horizontalSubcategories
    : horizontalSubcategories.slice(0, 10);

  const breadcrumbItems = [
    { label: "Bosh sahifa", href: "/" },
    { label: "Barcha toifalar", href: "/categories" },
    { label: "Maishiy texnika", href: "/categories/maishiy-texnika" },
    {
      label: "Katta maishiy texnika",
      href: "/categories/katta-maishiy-texnika",
    },
    { label: categoryData.name }, // Current category
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-0 py-0 sm:px-4 sm:py-6">
        {/* Mobile Search Bar (visible only on small screens) */}
        <div className="lg:hidden sticky top-0 z-20 bg-white p-4 border-b border-gray-200 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Mahsulotlar va turkumlar izlash"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowFilters(true)}
            className="h-10 w-10"
          >
            <Filter className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        <div className="px-4 py-6 sm:px-0 sm:py-0">
          <Breadcrumb
            items={breadcrumbItems}
            className="mb-4 text-xs sm:text-sm"
          />

          <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
            {" "}
            {/* Gapni kamaytirdim */}
            {/* Filters Sidebar (Desktop) */}
            <div className="hidden lg:block w-full flex-shrink-0">
              <div className="sticky top-24 space-y-4">
                {" "}
                {/* space-y-6 dan space-y-4 ga o'zgartirildi */}
                {/* Turkumlar (Main Categories) */}
                <Card className="rounded-lg shadow-sm border-gray-100">
                  {" "}
                  {/* Yengilroq stil */}
                  <CardHeader className="pb-2">
                    {" "}
                    {/* Padding kamaytirildi */}
                    <CardTitle className="text-base font-semibold">
                      Turkumlar
                    </CardTitle>{" "}
                    {/* Font size kamaytirildi */}
                  </CardHeader>
                  <CardContent className="space-y-1">
                    {" "}
                    {/* space-y-2 dan space-y-1 ga o'zgartirildi */}
                    {mainCategories.map((cat) => (
                      <Link key={cat.name} href={cat.href}>
                        <div className="py-1.5 px-2 -mx-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer text-sm text-gray-700">
                          {" "}
                          {/* Padding va font size kamaytirildi */}
                          {cat.name}
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
                {/* Price Filter */}
                <Card className="rounded-lg shadow-sm border-gray-100">
                  {" "}
                  {/* Yengilroq stil */}
                  <CardHeader className="pb-2">
                    {" "}
                    {/* Padding kamaytirildi */}
                    <CardTitle className="text-base font-semibold">
                      Narx, baho, so'm
                    </CardTitle>{" "}
                    {/* Font size kamaytirildi */}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {" "}
                    {/* space-y-4 dan space-y-3 ga o'zgartirildi */}
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="dan"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([Number(e.target.value), priceRange[1]])
                        }
                        className="w-1/2 text-sm h-9 px-3 py-2 border rounded-md focus:ring-1 focus:ring-primary focus:border-primary" // Input stilini yaxshiladim
                      />
                      <Input
                        type="number"
                        placeholder="oldin"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], Number(e.target.value)])
                        }
                        className="w-1/2 text-sm h-9 px-3 py-2 border rounded-md focus:ring-1 focus:ring-primary focus:border-primary" // Input stilini yaxshiladim
                      />
                    </div>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={1000000}
                      step={10000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-600">
                      {" "}
                      {/* Font size kamaytirildi */}
                      <span>{priceRange[0].toLocaleString()} so'm</span>
                      <span>{priceRange[1].toLocaleString()} so'm</span>
                    </div>
                  </CardContent>
                </Card>
                {/* Hovuz materiallari (Material Filter) */}
                <Card className="rounded-lg shadow-sm border-gray-100">
                  {" "}
                  {/* Yengilroq stil */}
                  <CardHeader className="pb-2">
                    {" "}
                    {/* Padding kamaytirildi */}
                    <CardTitle className="text-base font-semibold">
                      Hovuz materiallari
                    </CardTitle>{" "}
                    {/* Font size kamaytirildi */}
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {" "}
                    {/* space-y-3 dan space-y-2 ga o'zgartirildi */}
                    {materialFilters.map((material) => (
                      <div
                        key={material.name}
                        className="flex items-center justify-between py-1"
                      >
                        {" "}
                        {/* Padding kamaytirildi */}
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={material.name}
                            checked={selectedMaterials.includes(material.name)}
                            onCheckedChange={(checked: boolean) =>
                              handleMaterialChange(material.name, checked)
                            }
                          />
                          <label
                            htmlFor={material.name}
                            className="text-sm font-medium text-gray-700"
                          >
                            {material.name}
                          </label>
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-xs px-2 py-0.5"
                        >
                          {" "}
                          {/* Badge o'lchami */}
                          {material.count}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                {/* Brand Filter (Existing) */}
                <Card className="rounded-lg shadow-sm border-gray-100">
                  {" "}
                  {/* Yengilroq stil */}
                  <CardHeader className="pb-2">
                    {" "}
                    {/* Padding kamaytirildi */}
                    <CardTitle className="text-base font-semibold">
                      Brendlar
                    </CardTitle>{" "}
                    {/* Font size kamaytirildi */}
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {" "}
                    {/* space-y-3 dan space-y-2 ga o'zgartirildi */}
                    {brands.map((brand) => (
                      <div
                        key={brand.name}
                        className="flex items-center justify-between py-1"
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={brand.name}
                            checked={selectedBrands.includes(brand.name)}
                            onCheckedChange={(checked: boolean) =>
                              handleBrandChange(brand.name, checked)
                            }
                          />
                          <label
                            htmlFor={brand.name}
                            className="text-sm font-medium text-gray-700"
                          >
                            {brand.name}
                          </label>
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-xs px-2 py-0.5"
                        >
                          {" "}
                          {/* Badge o'lchami */}
                          {brand.count}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                {/* Sidebar Subcategories (Kichik kategoriyalar) - O'zgartirilgan qism */}
                <Card className="rounded-lg shadow-sm border-gray-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">
                      Kichik kategoriyalar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {displayedSidebarSubcategories.map((sub) => (
                      <Link key={sub.name} href={sub.href}>
                        <div className="flex items-center justify-between py-1.5 hover:bg-gray-100 rounded px-2 cursor-pointer transition-colors">
                          <span className="text-sm text-gray-700">
                            {sub.name}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-xs px-2 py-0.5"
                          >
                            {sub.count}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                    {horizontalSubcategories.length > 10 &&
                      !showAllSubcategories && (
                        <Button
                          variant="ghost"
                          className="w-full justify-center text-primary hover:text-blue-700 text-sm mt-2"
                          onClick={() => setShowAllSubcategories(true)}
                        >
                          Barcha kategoriyalar (
                          {horizontalSubcategories.length - 10} tadan ko'p)
                        </Button>
                      )}
                    {horizontalSubcategories.length > 10 &&
                      showAllSubcategories && (
                        <Button
                          variant="ghost"
                          className="w-full justify-center text-primary hover:text-blue-700 text-sm mt-2"
                          onClick={() => setShowAllSubcategories(false)}
                        >
                          Kamroq ko'rsatish
                        </Button>
                      )}
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Category Title and Product Count */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  Suv uchun kulerlar va aksessuarlar
                </h1>
                <p className="text-gray-600 text-sm">
                  {categoryData.productCount} ta tovar
                </p>
              </div>

              {/* Horizontal Subcategory/Filter Bar (Mobile & Desktop) */}
              <div className="relative mb-6">
                <div
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto whitespace-nowrap scrollbar-hide py-2 -mx-4 px-4"
                >
                  {horizontalSubcategories.slice(0, 3).map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      className="flex-shrink-0 mr-2 last:mr-0"
                    >
                      <Button
                        variant="secondary"
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 transition-colors rounded-lg h-auto"
                      >
                        {sub.name}
                      </Button>
                    </Link>
                  ))}
                  {horizontalSubcategories.length > 3 && (
                    <Button
                      variant="secondary"
                      className="flex-shrink-0 px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 transition-colors rounded-lg h-auto"
                    >
                      Yana {horizontalSubcategories.length - 3}{" "}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Filter/Sort Buttons (Mobile & Desktop) */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3 max-sm-xs:flex max-sm-xs:flex-wrap">
                    {/* Sort Select */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40 h-9 text-sm rounded-lg">
                        <SelectValue placeholder="Saralash" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">Mashhur</SelectItem>
                        <SelectItem value="price-low">Arzon narx</SelectItem>
                        <SelectItem value="price-high">Qimmat narx</SelectItem>
                        <SelectItem value="newest">Yangi</SelectItem>
                        <SelectItem value="rating">Yuqori baho</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* Filter Buttons (for mobile, these would open the filter modal) */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-3 text-sm rounded-lg lg:hidden bg-transparent"
                    >
                      Rang
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-3 text-sm rounded-lg lg:hidden bg-transparent"
                    >
                      Brend
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-3 text-sm rounded-lg lg:hidden bg-transparent"
                    >
                      Narx, baho
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      {sampleProducts.length} ta mahsulot
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="icon"
                        className="h-9 w-9 rounded-lg"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="icon"
                        className="h-9 w-9 rounded-lg"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedBrands.length > 0 || selectedMaterials.length > 0) && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-600">
                      Tanlangan filtrlar:
                    </span>
                    {selectedBrands.map((brand) => (
                      <Badge
                        key={brand}
                        variant="secondary"
                        className="cursor-pointer hover:bg-red-100 hover:text-destructive text-sm px-2 py-0.5"
                        onClick={() => handleBrandChange(brand, false)}
                      >
                        {brand} ×
                      </Badge>
                    ))}
                    {selectedMaterials.map((material) => (
                      <Badge
                        key={material}
                        variant="secondary"
                        className="cursor-pointer hover:bg-red-100 hover:text-destructive text-sm px-2 py-0.5"
                        onClick={() => handleMaterialChange(material, false)}
                      >
                        {material} ×
                      </Badge>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedBrands([]);
                        setSelectedMaterials([]);
                      }}
                      className="text-destructive hover:text-red-700 text-sm h-9 px-3"
                    >
                      Barchasini tozalash
                    </Button>
                  </div>
                </div>
              )}

              {/* Products Grid */}
              <div
                className={`grid gap-3 sm:gap-4 ${
                  viewMode === "grid"
                    ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                    : "grid-cols-1"
                }`}
              >
                {sampleProducts.map((product) => (
                  <EnhancedProductCard
                    key={product.id}
                    {...product}
                  
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 overflow-hidden max-sm-xs:px-10  flex justify-center">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    disabled
                    className="h-9 px-4 text-sm bg-transparent"
                  >
                    Oldingi
                  </Button>
                  <Button variant="default" className="h-9 w-9 text-sm">
                    1
                  </Button>
                  <Button
                    variant="outline"
                    className="h-9 w-9 text-sm bg-transparent"
                  >
                    2
                  </Button>
                  <Button
                    variant="outline"
                    className="h-9 w-9 text-sm bg-transparent"
                  >
                    3
                  </Button>
                  <span className="px-2 text-sm text-gray-600">...</span>
                  <Button
                    variant="outline"
                    className="h-9 w-9 text-sm bg-transparent"
                  >
                    15
                  </Button>
                  <Button
                    variant="outline"
                    className="h-9 px-4 text-sm bg-transparent"
                  >
                    Keyingi
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal/Drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col lg:hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">Filtrlar</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFilters(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Turkumlar (Main Categories) */}
            <Card className="rounded-lg shadow-sm border-gray-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">
                  Turkumlar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {mainCategories.map((cat) => (
                  <Link key={cat.name} href={cat.href}>
                    <div className="py-1.5 px-2 -mx-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer text-sm text-gray-700">
                      {cat.name}
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
            {/* Price Filter */}
            <Card className="rounded-lg shadow-sm border-gray-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">
                  Narx, baho, so'm
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="dan"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    className="w-1/2 text-sm h-9 px-3 py-2 border rounded-md focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                  <Input
                    type="number"
                    placeholder="oldin"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-1/2 text-sm h-9 px-3 py-2 border rounded-md focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000000}
                  step={10000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{priceRange[0].toLocaleString()} so'm</span>
                  <span>{priceRange[1].toLocaleString()} so'm</span>
                </div>
              </CardContent>
            </Card>
            {/* Hovuz materiallari (Material Filter) */}
            <Card className="rounded-lg shadow-sm border-gray-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">
                  Hovuz materiallari
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {materialFilters.map((material) => (
                  <div
                    key={material.name}
                    className="flex items-center justify-between py-1"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-${material.name}`}
                        checked={selectedMaterials.includes(material.name)}
                        onCheckedChange={(checked: boolean) =>
                          handleMaterialChange(material.name, checked)
                        }
                      />
                      <label
                        htmlFor={`mobile-${material.name}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        {material.name}
                      </label>
                    </div>
                    <Badge variant="secondary" className="text-xs px-2 py-0.5">
                      {material.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
            {/* Brand Filter */}
            <Card className="rounded-lg shadow-sm border-gray-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">
                  Brendlar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {brands.map((brand) => (
                  <div
                    key={brand.name}
                    className="flex items-center justify-between py-1"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-${brand.name}`}
                        checked={selectedBrands.includes(brand.name)}
                        onCheckedChange={(checked: boolean) =>
                          handleBrandChange(brand.name, checked)
                        }
                      />
                      <label
                        htmlFor={`mobile-${brand.name}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        {brand.name}
                      </label>
                    </div>
                    <Badge variant="secondary" className="text-xs px-2 py-0.5">
                      {brand.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
            {/* Mobile Subcategories (Kichik kategoriyalar) */}
            <Card className="rounded-lg shadow-sm border-gray-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">
                  Kichik kategoriyalar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {displayedSidebarSubcategories.map((sub) => (
                  <Link key={sub.name} href={sub.href}>
                    <div className="flex items-center justify-between py-1.5 hover:bg-gray-100 rounded px-2 cursor-pointer transition-colors">
                      <span className="text-sm text-gray-700">{sub.name}</span>
                      <Badge variant="outline" className="text-xs px-2 py-0.5">
                        {sub.count}
                      </Badge>
                    </div>
                  </Link>
                ))}
                {horizontalSubcategories.length > 10 &&
                  !showAllSubcategories && (
                    <Button
                      variant="ghost"
                      className="w-full justify-center text-primary hover:text-blue-700 text-sm mt-2"
                      onClick={() => setShowAllSubcategories(true)}
                    >
                      Barcha kategoriyalar (
                      {horizontalSubcategories.length - 10} tadan ko'p)
                    </Button>
                  )}
                {horizontalSubcategories.length > 10 &&
                  showAllSubcategories && (
                    <Button
                      variant="ghost"
                      className="w-full justify-center text-primary hover:text-blue-700 text-sm mt-2"
                      onClick={() => setShowAllSubcategories(false)}
                    >
                      Kamroq ko'rsatish
                    </Button>
                  )}
              </CardContent>
            </Card>
          </div>
          <div className="p-4 border-t border-gray-200">
            <Button
              className="w-full h-10 text-base"
              onClick={() => setShowFilters(false)}
            >
              Filtrlarni qo'llash
            </Button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
