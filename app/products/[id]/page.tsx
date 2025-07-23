"use client";
import type React from "react";
import { type JSX, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Star,
  Play,
  Share2,
  ShoppingCart,
  Minus,
  Plus,
  CheckCircle,
} from "lucide-react"; // Barcha kerakli ikonalar import qilindi
import { Header } from "@/components/header";
import { Footer } from "@/components/footer"; // Footer import qilindi
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Card komponentlari import qilindi
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator"; // Separator import qilindi
import { EnhancedProductCard } from "@/components/ui/enhanced-product-card"; // EnhancedProductCard import qilindi
import { TabsContent } from "@/components/ui/tabs"; // Import TabsContent for correct usage

interface ProductDetail {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviews: number;
  likes: number;
  videoUrl?: string;
  brand: string;
  model: string;
  inStock: boolean;
  stockCount: number;
  description: string;
  specifications: { [key: string]: string };
  compatibility: string[];
  colors?: { name: string; hex: string }[];
  capacities?: string[];
  simTypes?: string[];
}

interface Comment {
  id: number;
  user: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
}

interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  likeCount: number;
  brand: string;
  inStock: boolean;
}

const product: ProductDetail = {
  id: 1,
  name: "Motor yog'i filteri Chevrolet Lacetti 1.6L",
  price: 45000,
  originalPrice: 55000,
  images: [
    "/placeholder.svg?height=500&width=500&text=Product+Image+1",
    "/placeholder.svg?height=500&width=500&text=Product+Image+2",
    "/placeholder.svg?height=500&width=500&text=Product+Image+3",
    "/placeholder.svg?height=500&width=500&text=Product+Image+4",
  ],
  rating: 4.8,
  reviews: 124,
  likes: 89,
  videoUrl: "https://youtube.com/watch?v=example",
  brand: "Chevrolet",
  model: "Lacetti",
  inStock: true,
  stockCount: 15,
  description:
    "Yuqori sifatli motor yog'i filteri Chevrolet Lacetti avtomobillari uchun. Original sifat va uzoq muddat xizmat qilish kafolati. Ushbu filtr motoringizni ifloslanishdan himoya qiladi va uning ishlash muddatini uzaytiradi. Mahsulotning ishlash muddati va samaradorligi sinovdan o'tkazilgan bo'lib, u eng yuqori standartlarga javob beradi. O'rnatish oson va texnik xizmat ko'rsatish xarajatlarini kamaytiradi. Avtomobilingizning motorini uzoq muddat himoya qilish uchun ideal tanlov.",
  specifications: {
    Brend: "Chevrolet",
    Model: "Lacetti",
    "Ishlab chiqarish yili": "2005-2013",
    "Motor hajmi": "1.6L",
    Artikul: "96553450",
    "Kafolat muddati": "12 oy",
    "Ishlab chiqaruvchi": "GM Original",
    Material: "Yuqori sifatli qog'oz",
    "Og'irligi (kg)": "0.3",
    "O'lchamlari (sm)": "10x8x8",
  },
  compatibility: [
    "Chevrolet Lacetti 1.6L (2005-2013)",
    "Chevrolet Aveo 1.6L (2006-2011)",
    "Daewoo Gentra 1.6L (2005-2011)",
    "Daewoo Nexia 1.6L (2008-2016)",
    "Chevrolet Cobalt 1.5L (2012-hozirgi)",
    "Chevrolet Spark 1.2L (2010-hozirgi)",
  ],
  colors: [
    { name: "Qora", hex: "#000000" },
    { name: "Kumush", hex: "#C0C0C0" },
    { name: "Oq", hex: "#FFFFFF" },
  ],
  capacities: ["1L", "4L", "5L"],
  simTypes: ["1 SIM", "2 SIM", "eSIM"],
};

const relatedProducts: RelatedProduct[] = [
  {
    id: 2,
    name: "Havo filteri Chevrolet Lacetti",
    price: 35000,
    originalPrice: 42000,
    image: "/placeholder.svg?height=240&width=300&text=Related+Product+1",
    rating: 4.7,
    reviewCount: 89,
    likeCount: 67,
    brand: "Chevrolet",
    inStock: true,
  },
  {
    id: 3,
    name: "Yoqilg'i filteri Chevrolet Lacetti",
    price: 28000,
    image: "/placeholder.svg?height=240&width=300&text=Related+Product+2",
    rating: 4.6,
    reviewCount: 156,
    likeCount: 98,
    brand: "Chevrolet",
    inStock: true,
  },
  {
    id: 4,
    name: "Salon filteri Chevrolet Lacetti",
    price: 32000,
    image: "/placeholder.svg?height=240&width=300&text=Related+Product+3",
    rating: 4.5,
    reviewCount: 78,
    likeCount: 123,
    brand: "Chevrolet",
    inStock: true,
  },
  {
    id: 5,
    name: "Tormoz suyuqligi DOT4",
    price: 50000,
    image: "/placeholder.svg?height=240&width=300&text=Related+Product+4",
    rating: 4.9,
    reviewCount: 45,
    likeCount: 30,
    brand: "Bosch",
    inStock: true,
  },
  {
    id: 6,
    name: "Antifriz konsentrati",
    price: 60000,
    image: "/placeholder.svg?height=240&width=300&text=Related+Product+5",
    rating: 4.7,
    reviewCount: 60,
    likeCount: 40,
    brand: "Liqui Moly",
    inStock: true,
  },
  {
    id: 7,
    name: "Shisha yuvish suyuqligi",
    price: 15000,
    image: "/placeholder.svg?height=240&width=300&text=Related+Product+6",
    rating: 4.2,
    reviewCount: 200,
    likeCount: 150,
    brand: "Turtle Wax",
    inStock: true,
  },
];

const comments: Comment[] = [
  {
    id: 1,
    user: "Aziz Karimov",
    rating: 5,
    date: "2024-01-15",
    comment:
      "Juda sifatli mahsulot, tez yetkazib berishdi. Motorim endi yanada yaxshi ishlayapti. Tavsiya qilaman!",
    likes: 12,
  },
  {
    id: 2,
    user: "Sardor Umarov",
    rating: 4,
    date: "2024-01-10",
    comment:
      "Yaxshi filtr, narxi ham mos. Faqat qadoqlash biroz yaxshiroq bo'lsa edi. Lekin sifati zo'r.",
    likes: 8,
  },
  {
    id: 3,
    user: "Dilshod Toshmatov",
    rating: 5,
    date: "2024-01-08",
    comment:
      "Original mahsulot, hech qanday muammo yo'q. Uch oydan beri ishlataman, juda mamnunman.",
    likes: 15,
  },
  {
    id: 4,
    user: "Nigora Aliyeva",
    rating: 3,
    date: "2024-01-05",
    comment:
      "Narxiga arziydi, lekin yetkazib berish biroz kechikdi. Mahsulotning o'zi yaxshi.",
    likes: 5,
  },
];

const NewReviewRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-6 w-6 cursor-pointer transition-colors duration-200 ${
            rating > i
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300 hover:text-yellow-400"
          }`}
          onClick={() => setRating(i + 1)}
        />
      ))}
    </div>
  );
};

const NewReviewComment = ({
  comment,
  setComment,
}: {
  comment: string;
  setComment: (comment: string) => void;
}) => {
  return (
    <Textarea
      placeholder="Sizning fikringiz..."
      className="resize-none border rounded-md shadow-sm focus:ring focus:ring-primary focus:border-primary"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      rows={3}
      required
    />
  );
};

export default function ProductDetailPage(): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [newReviewRating, setNewReviewRating] = useState<number>(0);
  const [newReviewComment, setNewReviewComment] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.[0]?.name || null
  );
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(
    product.capacities?.[0] || null
  );
  const [selectedSimType, setSelectedSimType] = useState<string | null>(
    product.simTypes?.[0] || null
  );

  const breadcrumbItems = [
    { label: "Bosh sahifa", href: "/" },
    { label: "Kategoriyalar", href: "/categories" },
    { label: "Motor qismlari", href: "/categories/motor-qismlari" },
    { label: product.name },
  ];

  const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newReviewRating === 0 || newReviewComment.trim() === "") {
      alert("Iltimos, baho bering va sharh yozing.");
      return;
    }
    // Simulate adding a new comment
    console.log("New review submitted:", {
      rating: newReviewRating,
      comment: newReviewComment,
    });
    // In a real app, you would send this to a backend
    setNewReviewRating(0);
    setNewReviewComment("");
    alert("Sharhingiz qabul qilindi!");
  };

  const averageRating =
    comments.reduce((sum, comment) => sum + comment.rating, 0) /
      comments.length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb - keeping it commented out as in original */}
        {/* <Breadcrumb items={breadcrumbItems} className="mb-4" /> */}

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Left Column: Product Image and Details */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6">
              {/* Product Title & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-sm text-gray-900">
                      {product.rating}
                    </span>
                    <Link
                      href="#reviews"
                      className="text-xs text-gray-500 hover:text-primary transition-colors"
                    >
                      ({product.reviews} sharh)
                    </Link>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-primary"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Ulashish</span>
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {/* Image Gallery - Sticky on larger screens */}
                <div className="relative flex flex-col items-center gap-4 md:sticky md:top-6 self-start">
                  <div className="relative w-full h-[350px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center shadow-sm">
                    <Image
                      src={product.images[selectedImage] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                    {product.originalPrice &&
                      product.price < product.originalPrice && (
                        <Badge className="absolute top-3 left-3 bg-destructive text-white font-bold text-xs px-2 py-0.5">
                          -
                          {Math.round(
                            (1 - product.price / product.originalPrice) * 100
                          )}
                          % chegirma
                        </Badge>
                      )}
                    {product.videoUrl && selectedImage === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Button
                          size="sm"
                          className="rounded-full bg-white/90 text-gray-900 hover:bg-white text-xs px-3 py-1"
                        >
                          <Play className="h-4 w-4 mr-1.5" />
                          Video ko'rish
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 justify-center mt-4 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 border-2 rounded-md overflow-hidden transition-all duration-300 ${
                          selectedImage === index
                            ? "border-primary shadow-sm"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${product.name} ${index + 1}`}
                          width={70}
                          height={70}
                          className="w-16 h-16 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Options & Details */}
                <div className="space-y-4">
                  {product.colors && product.colors.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Rang: {selectedColor}
                      </h3>
                      <div className="flex gap-1.5">
                        {product.colors.map((color) => (
                          <Button
                            key={color.name}
                            variant={
                              selectedColor === color.name
                                ? "default"
                                : "outline"
                            }
                            onClick={() => setSelectedColor(color.name)}
                            className={`h-8 w-8 rounded-full border-2 ${
                              selectedColor === color.name
                                ? "border-primary"
                                : "border-gray-300"
                            }`}
                            style={{
                              backgroundColor: color.hex,
                              borderColor:
                                selectedColor === color.name
                                  ? "hsl(var(--primary))"
                                  : "hsl(var(--border))",
                            }}
                            aria-label={color.name}
                          >
                            {color.name === "Oq" && selectedColor === "Oq" && (
                              <CheckCircle className="h-3.5 w-3.5 text-primary-foreground" />
                            )}
                            {color.name === "Qora" &&
                              selectedColor === "Qora" && (
                                <CheckCircle className="h-3.5 w-3.5 text-primary-foreground" />
                              )}
                            {color.name === "Kumush" &&
                              selectedColor === "Kumush" && (
                                <CheckCircle className="h-3.5 w-3.5 text-primary-foreground" />
                              )}
                            <span className="sr-only">{color.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  {product.capacities && product.capacities.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Hajmi: {selectedCapacity}
                      </h3>
                      <div className="flex gap-1.5">
                        {product.capacities.map((capacity) => (
                          <Button
                            key={capacity}
                            variant={
                              selectedCapacity === capacity
                                ? "default"
                                : "outline"
                            }
                            onClick={() => setSelectedCapacity(capacity)}
                            className="px-3 py-1.5 h-8 text-sm"
                          >
                            {capacity}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  {product.simTypes && product.simTypes.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        SIM: {selectedSimType}
                      </h3>
                      <div className="flex gap-1.5">
                        {product.simTypes.map((simType) => (
                          <Button
                            key={simType}
                            variant={
                              selectedSimType === simType
                                ? "default"
                                : "outline"
                            }
                            onClick={() => setSelectedSimType(simType)}
                            className="px-3 py-1.5 h-8 text-sm"
                          >
                            {simType}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  <Separator />
                  {/* Price & Quantity */}
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-bold text-gray-900">
                        {product.price.toLocaleString()} so'm
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          {product.originalPrice.toLocaleString()} so'm
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900 text-base">
                        Miqdor:
                      </span>
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                          className="h-10 w-10 rounded-none hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-4 py-2 min-w-[60px] text-center font-semibold text-lg">
                          {quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setQuantity(
                              Math.min(product.stockCount, quantity + 1)
                            )
                          }
                          disabled={quantity >= product.stockCount}
                          className="h-10 w-10 rounded-none hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      size="lg"
                      className="flex-1 h-10 bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 text-primary-foreground font-semibold text-base"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Savatga qo'shish
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-10 w-10 bg-transparent"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isLiked ? "fill-destructive text-destructive" : ""
                        }`}
                      />
                    </Button>
                  </div>
                  {/* Product Attributes */}
                  <div className="space-y-1.0 text-gray-700 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Brend:</span>
                      <span>{product.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Model:</span>
                      <span>{product.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Mavjudligi:</span>
                      <span
                        className={
                          product.inStock ? "text-green-600" : "text-red-600"
                        }
                      >
                        {product.inStock ? "Omborda mavjud" : "Tugagan"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Content (Overview, Description, etc.) */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6">
              <Tabs defaultValue="overview" className="mb-0">
                <TabsList className="grid w-full grid-cols-4 h-10 text-sm bg-white rounded-lg shadow-sm border border-gray-200">
                  <TabsTrigger value="overview">Obzor</TabsTrigger>
                  <TabsTrigger value="description">Tavsif</TabsTrigger>
                  <TabsTrigger value="specifications">Xususiyatlar</TabsTrigger>
                  <TabsTrigger value="reviews">
                    Sharhlar ({product.reviews})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <Card className="border-none shadow-none">
                    <CardContent className="p-0">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Mahsulotga umumiy nazar
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm mb-3">
                        {product.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4"></div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="description" className="mt-4">
                  <Card className="border-none shadow-none">
                    <CardContent className="p-0">
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {product.description}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="specifications" className="mt-4">
                  <Card className="border-none shadow-none">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                        {Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between items-center py-1.5 border-b border-gray-200 last:border-0"
                            >
                              <span className="font-medium text-gray-900 text-sm">
                                {key}:
                              </span>
                              <span className="text-gray-700 text-right text-sm">
                                {value}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                {/* Added Compatibility tab as it was in the original code's data but not rendered */}
                <TabsContent value="compatibility" className="mt-4">
                  <Card className="border-none shadow-none">
                    <CardContent className="p-0">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Quyidagi avtomobillarga mos keladi:
                      </h3>
                      <ul className="space-y-2">
                        {product.compatibility.map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="reviews" className="mt-4" id="reviews">
                  <div className="space-y-6">
                    {/* Review Summary */}
                    <Card className="border-none shadow-none">
                      <CardContent className="p-0 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="text-4xl font-bold text-gray-900">
                            {averageRating.toFixed(1)}
                          </div>
                          <div className="flex flex-col">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < Math.floor(averageRating)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-gray-600 text-xs">
                              {comments.length} ta sharh asosida
                            </span>
                          </div>
                        </div>
                        <Button className="bg-primary hover:bg-blue-600 text-primary-foreground font-semibold py-2.5 px-5 rounded-md text-sm">
                          Sharh qoldirish
                        </Button>
                      </CardContent>
                    </Card>
                    {/* Add review form */}
                    <Card className="border-none shadow-none">
                      <CardContent className="p-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-5">
                          Sharh qoldiring
                        </h3>
                        <form
                          onSubmit={handleReviewSubmit}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Baho bering:
                            </label>
                            <NewReviewRating
                              rating={newReviewRating}
                              setRating={setNewReviewRating}
                            />
                          </div>
                          <div>
                            <NewReviewComment
                              comment={newReviewComment}
                              setComment={setNewReviewComment}
                            />
                          </div>
                          <Button
                            type="submit"
                            className="bg-primary hover:bg-blue-600 text-primary-foreground font-semibold py-2.5 px-5 rounded-md text-sm"
                          >
                            Sharh qoldirish
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                    {/* Reviews list */}
                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <Card
                          key={comment.id}
                          className="border-none shadow-none"
                        >
                          <CardContent className="p-0">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-base">
                                  {comment.user.charAt(0)}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 text-sm">
                                    {comment.user}
                                  </h4>
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-3.5 w-3.5 ${
                                            i < comment.rating
                                              ? "fill-yellow-400 text-yellow-400"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-gray-500">
                                      {comment.date}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 text-gray-600 hover:text-primary"
                              >
                                <Heart className="h-3.5 w-3.5 mr-1" />
                                {comment.likes}
                              </Button>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-sm">
                              {comment.comment}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Column: Installment Payment - Sticky on larger screens */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 bg-white p-5 rounded-xl shadow-lg border border-gray-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-gray-900">
                  Rassrochka to'lovi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-gray-700 text-sm">
                  <span className="font-medium">Oylar:</span>
                  <div className="flex gap-1.5">
                    <Button
                      variant="default"
                      size="sm"
                      className="h-8 px-3 text-sm"
                    >
                      6
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 text-sm bg-transparent"
                    >
                      12
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 text-sm bg-transparent"
                    >
                      18
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-md p-2.5">
                  <div className="flex items-center gap-1.5">
                    <Image
                      src="/placeholder.svg?height=20&width=20&text=X"
                      alt="Xazna logo"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <span className="font-semibold text-blue-800 text-sm">
                      xazna
                    </span>
                  </div>
                  <span className="font-bold text-blue-800 text-base">
                    2 066 400 so'm
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-base text-gray-900">
                  <span>Umumiy summa:</span>
                  <span>24 796 800 so'm</span>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base py-2.5">
                  Rassrochka orqali buyurtma berish
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-12 bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            O'xshash mahsulotlar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {relatedProducts.map((product) => (
              <EnhancedProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
