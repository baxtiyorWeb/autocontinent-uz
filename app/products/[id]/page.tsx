"use client";
import type React from "react";
import { type JSX, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// Removed direct axios import as you're using `api` from "@/lib/api"
import {
  Heart,
  Star,
  Play,
  Share2,
  ShoppingCart,
  Minus,
  Plus,
  CheckCircle,
  X,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { EnhancedProductCard } from "@/components/ui/enhanced-product-card";
import api from "@/lib/api"; // Your Axios instance
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast"; // Assuming useToast is available

interface ProductImage {
  id?: number; // Added id based on your API response structure
  image: string; // The URL of the image
}

// Updated ProductDetail to closely match your API response
interface ProductDetail {
  id: number;
  name: string;
  price_uzs: number;
  price_usd: string;
  description: string;
  youtube_link: string | null; // Can be null from API
  images: ProductImage[]; // Array of objects with 'image' key
  is_active: boolean; // From API, determines 'inStock'
  category: number; // From API
  car_model: number; // From API

  // Properties below are from mock data and might not be in API, keep for now or remove if not needed
  original_price?: number; // Renamed to match ApiProduct structure
  rating?: number; // Made optional to align with API typically not returning this directly on product detail
  review_count?: number; // Renamed to match ApiProduct structure
  like_count?: number; // Renamed to match ApiProduct structure
  brand?: string;
  model?: string; // This might be derived from `car_model` or a separate field
  stock_count?: number; // Display only
  specifications?: { [key: string]: string };
  compatibility?: string[];
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

// Product interface for EnhancedProductCard, matches ApiProduct structure
interface ProductForCard {
  id: number;
  name: string;
  price_uzs: number;
  price_usd: string;
  original_price?: number;
  images: { id: number; image: string }[];
  category: number;
  car_model: number;
  description: string;
  youtube_link?: string;
  is_active: boolean;
  rating?: number;
  review_count?: number;
  like_count?: number;
  brand?: string;
  stock_count?: number;
  is_liked?: boolean;
}

// --- Mock Data (keep if API doesn't provide all details for now) ---
const mockProduct: ProductDetail = {
  id: 1,
  name: "Motor yog'i filteri Chevrolet Lacetti 1.6L",
  price_uzs: 45000,
  price_usd: "4.00", // Example USD price
  original_price: 55000, // Renamed from originalPrice
  images: [
    {
      id: 1, // Added ID
      image:
        "https://sp-ao.shortpixel.ai/client/to_auto%2Cq_glossy%2Cret_img%2Cw_1024%2Ch_684/https%3A//www.wyotech.edu/wp-content/uploads/2024/10/DirtyAirFilter-1024x684.png",
    },
    {
      id: 2, // Added ID
      image:
        "https://www.take5.com/_next/image/?q=75&url=https%3A%2F%2Fimages.ctfassets.net%2Fv3p61xoag5ig%2F6u6WzKPDO4aTUGSv2VubLs%2F6ec302024a132c7aa2d8703f3d3ccce2%2FAdobeStock_216561912.jpeg&w=1920",
    },
    {
      id: 3, // Added ID
      image:
        "https://scottsauto.com/wp-content/uploads/2024/08/Car-cabin-air-filter.png",
    },
    {
      id: 4, // Added ID
      image:
        "https://www.ebaymotorsblog.com/motors/blog/wp-content/uploads/2023/10/dirty_and_clean_engine_air_filters-2000.jpg",
    },
  ],
  rating: 4.8,
  review_count: 124, // Renamed from reviews
  like_count: 89, // Renamed from likes
  youtube_link:
    "https://v.made-in-china.com/ucv/sbr/fb313a53798062bfa37faa9f57ae7e/7a2d91b43910307427653209950811_h264_def.mp4",
  brand: "Chevrolet",
  model: "Lacetti",
  is_active: true, // Renamed from inStock
  stock_count: 15, // Renamed from stockCount
  category: 1, // Example category ID
  car_model: 1, // Example car model ID
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

// Ensure related products match the `ProductForCard` interface
const relatedProducts: ProductForCard[] = [
  {
    id: 1,
    name: "Motor yog'i filteri Chevrolet Lacetti",
    price_uzs: 45000,
    price_usd: "4.00",
    original_price: 55000,
    images: [
      {
        id: 1,
        image:
          "https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload//products/2023/2/20/2/15-1.PNG",
      },
    ],
    rating: 4.8,
    review_count: 124,
    like_count: 89,
    brand: "Chevrolet",
    is_active: true,
    category: 1,
    car_model: 1,
    description: "Mock description for related product 1",
  },
  {
    id: 2,
    name: "Tormoz kolodkalari Mercedes W205",
    price_uzs: 320000,
    price_usd: "28.00",
    images: [
      {
        id: 1,
        image:
          "https://files.glotr.uz/company/000/005/148/products/2018/01/20/15164302157735-060b8bdbc89e007edc8612b2e5b2d0fe.jpg?_=ozb9y",
      },
    ],
    rating: 4.9,
    review_count: 67,
    like_count: 156,
    brand: "Mercedes-Benz",
    is_active: true,
    category: 2,
    car_model: 2,
    description: "Mock description for related product 2",
  },
  {
    id: 3,
    name: "Akkumulyator 60Ah Universal",
    price_uzs: 850000,
    price_usd: "75.00",
    original_price: 950000,
    images: [
      {
        id: 1,
        image:
          "https://frankfurt.apollo.olxcdn.com/v1/files/gs4spq08t6uu3-UZ/image;s=1000x700",
      },
    ],
    rating: 4.7,
    review_count: 203,
    like_count: 234,
    brand: "Universal",
    is_active: false,
    category: 3,
    car_model: 3,
    description: "Mock description for related product 3",
  },
  {
    id: 4,
    name: "Spark plug BMW E90",
    price_uzs: 25000,
    price_usd: "2.20",
    images: [
      {
        id: 1,
        image: "https://i.ebayimg.com/images/g/SGkAAosw66hmTNah/s-l1600.webp",
      },
    ],
    rating: 4.6,
    review_count: 89,
    like_count: 67,
    brand: "BMW",
    is_active: true,
    category: 4,
    car_model: 4,
    description: "Mock description for related product 4",
  },
  {
    id: 5,
    name: "Havo filtri Toyota Camry XV70",
    price_uzs: 90000,
    price_usd: "8.00",
    original_price: 100000,
    images: [
      {
        id: 1,
        image: "https://images.uzum.uz/cpdgksjmdtjnp737srug/original.jpg",
      },
    ],
    rating: 4.5,
    review_count: 75,
    like_count: 110,
    brand: "Toyota",
    is_active: true,
    category: 5,
    car_model: 5,
    description: "Mock description for related product 5",
  },
  {
    id: 6,
    name: "Rul gidravlikasi moyi Lada Granta",
    price_uzs: 60000,
    price_usd: "5.30",
    images: [
      {
        id: 1,
        image:
          "https://files.glotr.uz/company/000/004/377/products/2015/08/24/14404312035167-680d995de4babcd3869231f81b369eac.jpg?_=ozb9y",
      },
    ],
    rating: 4.2,
    review_count: 45,
    like_count: 30,
    brand: "Lada",
    is_active: true,
    category: 6,
    car_model: 6,
    description: "Mock description for related product 6",
  },
  {
    id: 7,
    name: "Shina 205/55 R16 (yozgi)",
    price_uzs: 700000,
    price_usd: "62.00",
    original_price: 750000,
    images: [
      {
        id: 1,
        image:
          "https://static.sello.uz/unsafe/x500/https://static.sello.uz/fm/20220719/c38cd196-4738-49df-8d6a-aefe51bc4acf.JPEG",
      },
    ],
    rating: 4.9,
    review_count: 310,
    like_count: 450,
    brand: "Michelin",
    is_active: true,
    category: 7,
    car_model: 7,
    description: "Mock description for related product 7",
  },
  {
    id: 8,
    name: "Antifriz (Qizil) 5L",
    price_uzs: 120000,
    price_usd: "10.60",
    images: [
      {
        id: 1,
        image:
          "https://shop.driversvillage.uz/uploads/product/KK/KK/f3/antifriz-krasnyi-5l-g12-40-c-super-yuko-4820070248227-1-6.jpg?cacheimg=77903",
      },
    ],
    rating: 4.7,
    review_count: 95,
    like_count: 180,
    brand: "Liqui Moly",
    is_active: true,
    category: 8,
    car_model: 8,
    description: "Mock description for related product 8",
  },
  {
    id: 9,
    name: "Avtomobil polikchalari GM Cobalt",
    price_uzs: 180000,
    price_usd: "16.00",
    original_price: 200000,
    images: [
      {
        id: 1,
        image:
          "https://static.sello.uz/unsafe/x500/https://static.sello.uz/fm/20240226/18217fba0e9fac667350ae818f8d0e55.png",
      },
    ],
    rating: 4.3,
    review_count: 50,
    like_count: 70,
    brand: "GM",
    is_active: false,
    category: 9,
    car_model: 9,
    description: "Mock description for related product 9",
  },
  {
    id: 10,
    name: "Avtomobil tozalash uchun vositalar to'plami",
    price_uzs: 250000,
    price_usd: "22.00",
    images: [
      {
        id: 1,
        image:
          "https://images2.zoodmall.uz/cdn-cgi/image/w=500,fit=contain,f=auto/https%3A%2F%2Fimages2.zoodmall.com%2Fhttps%253A%2Fimg.joomcdn.net%2F536a3055093bae4f735fb3560bc45645ae8accdf_original.jpeg",
      },
    ],
    rating: 4.6,
    review_count: 150,
    like_count: 200,
    brand: "Turtle Wax",
    is_active: true,
    category: 10,
    car_model: 10,
    description: "Mock description for related product 10",
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

const VideoPlayer = ({
  videoUrl,
  onClose,
}: {
  videoUrl: string;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative w-full max-w-4xl h-auto max-h-[90vh] mx-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:bg-white/20"
        >
          <X className="h-6 w-6" />
        </Button>
        <video
          controls
          autoPlay
          className="w-full h-full object-contain rounded-lg"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
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
      className="resize-none border rounded-md  focus:ring focus:ring-primary focus:border-primary"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      rows={3}
      required
    />
  );
};

export default function ProductDetailPage(): JSX.Element {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [newReviewRating, setNewReviewRating] = useState<number>(0);
  const [newReviewComment, setNewReviewComment] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [selectedSimType, setSelectedSimType] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const { id } = useParams();
  const { toast } = useToast(); // Initialize useToast

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Ensure ID is a number, as useParams returns string
        const productId = Array.isArray(id) ? id[0] : id;
        if (!productId) {
          console.error("Product ID is undefined.");
          setProduct(mockProduct); // Fallback if no ID is found
          return;
        }

        const response = await api.get<ProductDetail>(
          `/products/${productId}/`
        );
        // Merge API data with mock data, prioritizing API data where available
        const fetchedProduct = {
          ...mockProduct, // Start with mock data for optional fields not always in API
          ...response.data, // Overlay with API data
          // Explicitly ensure images and youtube_link are handled
          images:
            response.data.images && response.data.images.length > 0
              ? response.data.images
              : mockProduct.images,
          youtube_link:
            response.data.youtube_link !== undefined
              ? response.data.youtube_link
              : mockProduct.youtube_link,
          // Use properties directly from API response for core fields
          price_uzs: response.data.price_uzs,
          price_usd: response.data.price_usd,
          description: response.data.description,
          name: response.data.name,
          is_active: response.data.is_active,
          category: response.data.category,
          car_model: response.data.car_model,
        };
        setProduct(fetchedProduct);
        // Initialize selected options based on fetched data or mock data
        if (fetchedProduct.colors && fetchedProduct.colors.length > 0) {
          setSelectedColor(fetchedProduct.colors[0].name);
        }
        if (fetchedProduct.capacities && fetchedProduct.capacities.length > 0) {
          setSelectedCapacity(fetchedProduct.capacities[0]);
        }
        if (fetchedProduct.simTypes && fetchedProduct.simTypes.length > 0) {
          setSelectedSimType(fetchedProduct.simTypes[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        // Fallback to mock data if API call fails
        setProduct(mockProduct);
        if (mockProduct.colors && mockProduct.colors.length > 0) {
          setSelectedColor(mockProduct.colors[0].name);
        }
        if (mockProduct.capacities && mockProduct.capacities.length > 0) {
          setSelectedCapacity(mockProduct.capacities[0]);
        }
        if (mockProduct.simTypes && mockProduct.simTypes.length > 0) {
          setSelectedSimType(mockProduct.simTypes[0]);
        }
        toast({
          title: "Xatolik",
          description:
            "Mahsulot ma'lumotlarini yuklashda xato yuz berdi. Iltimos, keyinroq urinib ko'ring.",
          variant: "destructive",
        });
      }
    };
    fetchProduct();
  }, [id, toast]); // Add 'id' to dependency array to re-fetch when ID changes

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Mahsulot tafsilotlari yuklanmoqda...
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Bosh sahifa", href: "/" },
    { label: "Kategoriyalar", href: "/categories" },
    { label: "Motor qismlari", href: "/categories/motor-qismlari" },
    { label: product.name },
  ];

  const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newReviewRating === 0 || newReviewComment.trim() === "") {
      toast({
        title: "Xato",
        description: "Iltimos, baho bering va sharh yozing.",
        variant: "destructive",
      });
      return;
    }
    console.log("New review submitted:", {
      rating: newReviewRating,
      comment: newReviewComment,
    });
    setNewReviewRating(0);
    setNewReviewComment("");
    toast({
      title: "Muvaffaqiyatli",
      description: "Sharhingiz qabul qilindi!",
      variant: "default",
    });
  };

  const handleAddToCart = async () => {
    if (!product.is_active) {
      toast({
        title: "Xato",
        description: "Mahsulot omborda mavjud emas.",
        variant: "destructive",
      });
      return;
    }

    // Prepare product details for the /cart/ POST request body
    const productDetailPayload = {
      id: product.id,
      name: product.name,
      category: product.category,
      car_model: product.car_model,
      price_usd: product.price_usd,
      description: product.description,
      youtube_link: product.youtube_link || "", // Ensure it's a string
      is_active: product.is_active,
      uploaded_images: product.images.map((img) => img.image), // Array of image URLs
    };

    const cartPayload = {
      product: productDetailPayload,
      quantity: quantity, // Use the current quantity state
    };

    try {
      // Make the POST request to /cart/
      const response = await api.post("/cart/", cartPayload);
      console.log("Product added to cart successfully:", response.data);
      toast({
        title: "Muvaffaqiyatli",
        description: `${product.name} savatga qo'shildi!`,
        variant: "default",
      });
      // Optionally, update a global cart state (e.g., using a context)
    } catch (error: any) {
      console.error("Failed to add to cart:", error);
      // Check for 401 Unauthorized status
      if (error.response && error.response.status === 401) {
        toast({
          title: "Xatolik",
          description: "Savatga mahsulot qo'shish uchun ro'yxatdan o'ting.", // "Please register to add products to cart."
          variant: "destructive",
        });
      } else {
        // Handle other types of errors
        const errorMessage =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          (error.response?.data && JSON.stringify(error.response.data)) ||
          error.message ||
          "Noma'lum xatolik";
        toast({
          title: "Xatolik",
          description: `Savatga qo'shishda xatolik yuz berdi: ${errorMessage}`,
          variant: "destructive",
        });
      }
    }
  };

  const averageRating =
    comments.reduce((sum, comment) => sum + comment.rating, 0) /
      comments.length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 max-sm-xs:px-0 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Left Column: Product Image and Details */}
          <div className="lg:col-span-2 flex flex-col gap-6 min-w-0">
            <div className="bg-white rounded-xl  border border-gray-200 p-4 sm:p-6">
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
                            i < Math.floor(product.rating || 0) // Use 0 if rating is undefined
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-sm text-gray-900">
                      {product.rating || 0}
                    </span>
                    <Link
                      href="#reviews"
                      className="text-xs text-gray-500 hover:text-primary transition-colors"
                    >
                      ({product.review_count || 0} sharh){" "}
                      {/* Use review_count */}
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
                <div className="relative flex flex-col items-center gap-4 md:sticky md:top-6 self-start min-w-0">
                  <div className="relative w-full h-[350px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center ">
                    {/* Ensure product.images is not empty before accessing [0] */}
                    <Image
                      src={
                        product.images.length > 0
                          ? product.images[selectedImage]?.image ||
                            "/placeholder.svg"
                          : "/placeholder.svg"
                      }
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                    {product.original_price && // Use original_price
                      product.price_uzs < product.original_price && (
                        <Badge className="absolute top-3 left-3 bg-destructive text-white font-bold text-xs px-2 py-0.5">
                          -
                          {Math.round(
                            (1 - product.price_uzs / product.original_price) *
                              100
                          )}
                          % chegirma
                        </Badge>
                      )}
                    {product.youtube_link &&
                      product.youtube_link.trim() !== "" &&
                      selectedImage === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Button
                            size="sm"
                            className="rounded-full bg-white/90 text-gray-900 hover:bg-white text-xs px-3 py-1"
                            onClick={() => setShowVideo(true)}
                          >
                            <Play className="h-4 w-4 mr-1.5" />
                            Video ko'rish
                          </Button>
                        </div>
                      )}
                  </div>
                  <div className="flex gap-2 justify-center mt-4 overflow-x-auto pb-2">
                    {/* Only map if images array has items */}
                    {product.images.length > 0 ? (
                      product.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`flex-shrink-0 border-2 rounded-md overflow-hidden transition-all duration-300 ${
                            selectedImage === index
                              ? "border-primary "
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Image
                            src={img.image || "/placeholder.svg"}
                            alt={`${product.name} ${index + 1}`}
                            width={70}
                            height={70}
                            className="w-16 h-16 object-cover"
                          />
                        </button>
                      ))
                    ) : (
                      // Fallback for when no images are available
                      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Options & Details */}
                <div className="space-y-4 min-w-0">
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
                        {product.price_uzs.toLocaleString()} so'm
                      </span>
                      {product.original_price && (
                        <span className="text-lg text-gray-500 line-through">
                          {product.original_price.toLocaleString()} so'm
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
                              Math.min(
                                product.stock_count || Infinity,
                                quantity + 1
                              ) // Use stock_count
                            )
                          }
                          disabled={
                            quantity >= (product.stock_count || Infinity)
                          } // Use stock_count
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
                      onClick={handleAddToCart} // Call the add to cart function
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
                      <span>{product.brand || "Noma'lum"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Model:</span>
                      <span>{product.model || "Noma'lum"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Mavjudligi:</span>
                      <span
                        className={
                          product.is_active ? "text-green-600" : "text-red-600" // Use is_active
                        }
                      >
                        {product.is_active ? "Omborda mavjud" : "Tugagan"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-xl  border border-gray-200 p-4 sm:p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Tavsif
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                {product.description}
              </p>
            </div>

            <div className="lg:col-span-1 lg:hidden min-w-0 ">
              <Card className="sticky top-6 bg-white  rounded-xl  border border-gray-200">
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
                    {/* Calculate monthly payment based on product.price_uzs and a hypothetical interest/term */}
                    <span className="font-bold text-blue-800 text-base">
                      {(product.price_uzs / 6).toLocaleString()} so'm{" "}
                      {/* Example for 6 months */}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-base text-gray-900">
                    <span>Umumiy summa:</span>
                    <span>{product.price_uzs.toLocaleString()} so'm</span>{" "}
                    {/* Total sum is product price */}
                  </div>
                  <Button
                    onClick={() => {
                      // You'll need to send the `product_id` and `quantity` to the checkout endpoint.
                      // For now, it redirects. Implement actual POST request to /cart/checkout/ here.
                      // Example payload for /cart/checkout/:
                      // {
                      //   "full_name": "string",
                      //   "phone_number": "string",
                      //   "address": "string",
                      //   "items": [
                      //     {
                      //       "product_id": 0,
                      //       "quantity": 9223372036854776000
                      //     }
                      //   ]
                      // }
                      window.location.href = "/checkout";
                    }}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base py-2.5"
                  >
                    Rassrochka orqali buyurtma berish
                  </Button>
                </CardContent>
              </Card>
            </div>
            {/* Specifications Section */}
            <div className="bg-white rounded-xl  border border-gray-200 p-4 sm:p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Xususiyatlar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {product.specifications &&
                  Object.entries(product.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between text-gray-700 text-sm"
                    >
                      <span className="font-medium">{key}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Compatibility Section */}
            {product.compatibility && product.compatibility.length > 0 && (
              <div className="bg-white rounded-xl  border border-gray-200 p-4 sm:p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Mos keladi
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  {product.compatibility.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reviews Section */}
            <div
              className="bg-white rounded-xl  border border-gray-200 p-4 sm:p-6"
              id="reviews"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Mijozlar Sharhlari ({comments.length})
              </h3>
              <div className="flex items-center gap-2 mb-4">
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
                <span className="font-semibold text-lg text-gray-900">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-gray-500 text-sm">
                  ({comments.length} ta sharh asosida)
                </span>
              </div>
              <Separator className="my-6" />

              {/* Review List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="pb-4 border-b last:border-b-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          {comment.user}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {comment.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <Heart className="h-3 w-3" />
                        <span>{comment.likes}</span>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < comment.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {comment.comment}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              {/* Add New Review */}
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Sharh qoldirish
              </h4>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Bahoyingizni bering:
                  </label>
                  <NewReviewRating
                    rating={newReviewRating}
                    setRating={setNewReviewRating}
                  />
                </div>
                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Sizning sharhingiz:
                  </label>
                  <NewReviewComment
                    comment={newReviewComment}
                    setComment={setNewReviewComment}
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2"
                >
                  Sharhni yuborish
                </Button>
              </form>
            </div>

            {/* Related Products Section */}
            <div className="bg-white rounded-xl  border border-gray-200 p-4 sm:p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                O'xshash mahsulotlar
              </h3>
              <div
                className="grid gap-4 xs:gap-3 sm:gap-4
             grid-cols-2
             max-sm-xs:grid-cols-2
             max-sm-xs:gap-2
             max-sm-xs:shadow-none
             sm:grid-cols-3
             md:grid-cols-4
             lg:grid-cols-3 xl:grid-cols-4"
              >
                {relatedProducts.map((product) => (
                  <EnhancedProductCard
                    key={product.id}
                    {...product}
                    // Ensure all required props for EnhancedProductCard are passed
                    // and match its interface. If a prop is optional in ProductForCard
                    // but required in EnhancedProductCardProps, provide a default here.
                    youtube_link={product.youtube_link || ""}
                    brand={product.brand || "Noma'lum"}
                    stock_count={product.stock_count || 0}
                    is_liked={product.is_liked || false}
                    // Pass onLike if you have a like functionality
                    // onLike={() => handleLike(product.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Rassrochka (Installment) Details - Visible on large screens */}
          <div className="lg:col-span-1 hidden lg:block min-w-0">
            <Card className="sticky top-6 bg-white  rounded-xl  border border-gray-200">
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
                    {(product.price_uzs / 6).toLocaleString()} so'm{" "}
                    {/* Example for 6 months */}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-base text-gray-900">
                  <span>Umumiy summa:</span>
                  <span>{product.price_uzs.toLocaleString()} so'm</span>
                </div>
                <Button
                  onClick={() => {
                    // Assuming your checkout page expects a product ID and quantity
                    const productId = product.id;
                    const productQuantity = quantity;
                    window.location.href = `/checkout?productId=${productId}&quantity=${productQuantity}`;
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base py-2.5"
                >
                  Rassrochka orqali buyurtma berish
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />

      {showVideo && product.youtube_link && (
        <VideoPlayer
          videoUrl={product.youtube_link}
          onClose={() => setShowVideo(false)}
        />
      )}
    </div>
  );
}
