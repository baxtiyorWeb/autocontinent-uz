"use client";
import type React from "react";
import { type JSX, useState, useEffect } from "react";
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
  X,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { EnhancedProductCard } from "@/components/ui/enhanced-product-card";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Interface definitions
interface ProductImage {
  id: number;
  image: string;
}

interface ProductDetail {
  id: number;
  name: string;
  price_uzs: number;
  price_usd: string;
  description: string;
  youtube_link: string | null;
  images: ProductImage[];
  is_active: boolean;
  category: number;
  car_model: number;
  brand?: string;
  rating?: number;
  review_count?: number;
  stock_count?: number;
}

interface Comment {
  id: number;
  user: string; // Username for display
  rating: number; // Parsed from text
  date: string; // Formatted created_at
  comment: string; // Text without rating prefix
  likes: number;
}

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

// Related products (unchanged)
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
];

// Component definitions
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
          <source src={videoUrl} type="video/webm" />
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
      className="resize-none border rounded-md focus:ring focus:ring-primary focus:border-primary"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      rows={3}
      required
    />
  );
};

export default function ProductDetailPage(): JSX.Element {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [newReviewRating, setNewReviewRating] = useState<number>(0);
  const [newReviewComment, setNewReviewComment] = useState<string>("");
  const [showVideo, setShowVideo] = useState(false);
  const { id } = useParams();
  const { toast } = useToast();

  // Mock user ID (replace with actual auth logic)
  const userId = 2; // Replace with: const { user } = useAuth(); const userId = user?.id;

  // Parse rating from comment text
  const parseRating = (text: string): number => {
    const match = text.match(/^Rating: (\d)\/5/);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Fetch product and comments
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = Array.isArray(id) ? id[0] : id;
        if (!productId) {
          throw new Error("Product ID is undefined.");
        }

        const response = await api.get(`/products/${productId}/`);
        const apiProduct = response.data;
        const parsedComments: Comment[] = (apiProduct.comments || []).map(
          (c: any) => ({
            id: c.id,
            user: c.user.username || "User", // Replace with actual username
            rating: parseRating(c.text),
            date: new Date(c.created_at).toISOString().split("T")[0],
            comment: c.text.replace(/^Rating: \d\/5\n/, ""),
            likes: c.like_count || 0,
          })
        );
        const fetchedProduct: ProductDetail = {
          id: apiProduct.id,
          name: apiProduct.name,
          price_uzs: apiProduct.price_uzs,
          price_usd: apiProduct.price_usd,
          description: apiProduct.description,
          youtube_link: apiProduct.youtube_link || null,
          images: apiProduct.images || [],
          is_active: apiProduct.is_active,
          category: apiProduct.car_model, // Use car_model as category
          car_model: apiProduct.car_model,
          brand: apiProduct.brand ? "Daewoo" : "Noma'lum", // Map brand ID
          rating:
            parsedComments.length > 0
              ? parsedComments.reduce((sum, c) => sum + c.rating, 0) /
                parsedComments.length
              : 0,
          review_count: parsedComments.length,
          stock_count: apiProduct.stock_count || 0,
        };
        setProduct(fetchedProduct);
        setComments(parsedComments);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "Xatolik",
          description:
            "Mahsulot ma'lumotlarini yuklashda xato yuz berdi. Iltimos, keyinroq urinib ko'ring.",
          variant: "destructive",
        });
      }
    };

    fetchProduct();
  }, [id, toast]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Mahsulot tafsilotlari yuklanmoqda...
      </div>
    );
  }

  // Handle review submission
  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newReviewComment.trim() === "") {
      toast({
        title: "Xato",
        description: "Iltimos, sharh yozing.",
        variant: "destructive",
      });
      return;
    }

    if (!userId) {
      toast({
        title: "Xatolik",
        description:
          "Sharh qoldirish uchun ro'yxatdan o'ting yoki tizimga kiring.",
        variant: "destructive",
      });
      return;
    }

    const commentPayload = {
      user: userId,
      product: product.id,
      text: newReviewComment,
    };

    try {
      const response = await api.post("/comments/", commentPayload);
      toast({
        title: "Muvaffaqiyatli",
        description: "Sharhingiz qabul qilindi!",
        variant: "default",
      });

      // Add new comment to state
      const newComment: Comment = {
        id: response.data.id || Date.now(),
        user: "User", // Replace with actual username
        rating: newReviewRating,
        date: new Date().toISOString().split("T")[0],
        comment: newReviewComment,
        likes: 0,
      };
      setComments((prev) => [...prev, newComment]);

      // Update product rating and review count
      setProduct((prev) => {
        if (!prev) return prev;
        const newComments = [...comments, newComment];
        const newRating =
          newComments.length > 0
            ? newComments.reduce((sum, c) => sum + c.rating, 0) /
              newComments.length
            : 0;
        return {
          ...prev,
          rating: newRating,
          review_count: newComments.length,
        };
      });

      // Reset form
      setNewReviewRating(0);
      setNewReviewComment("");
    } catch (error: any) {
      console.error("Failed to submit comment:", error);
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        (error.response?.data && JSON.stringify(error.response.data)) ||
        error.message ||
        "Noma'lum xatolik";
      toast({
        title: "Xatolik",
        description: `Sharhni yuborishda xatolik yuz berdi: ${errorMessage}`,
        variant: "destructive",
      });
    }
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

    const productDetailPayload = {
      id: product.id,
      name: product.name,
      category: product.category,
      car_model: product.car_model,
      price_usd: product.price_usd,
      description: product.description,
      youtube_link: product.youtube_link || "",
      is_active: product.is_active,
      uploaded_images: product.images.map((img) => img.image),
    };

    const cartPayload = {
      product: productDetailPayload,
      quantity: quantity,
    };

    try {
      const response = await api.post("/cart/", cartPayload);
      toast({
        title: "Muvaffaqiyatli",
        description: `${product.name} savatga qo'shildi!`,
        variant: "default",
      });
    } catch (error: any) {
      console.error("Failed to add to cart:", error);
      if (error.response && error.response.status === 401) {
        toast({
          title: "Xatolik",
          description: "Savatga mahsulot qo'shish uchun ro'yxatdan o'ting.",
          variant: "destructive",
        });
      } else {
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

  const averageRating = product.rating || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 max-sm-xs:px-0 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 flex flex-col gap-6 min-w-0">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
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
                            i < Math.floor(averageRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-sm text-gray-900">
                      {averageRating.toFixed(1)}
                    </span>
                    <Link
                      href="#reviews"
                      className="text-xs text-gray-500 hover:text-primary transition-colors"
                    >
                      ({product.review_count || 0} sharh)
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
                <div className="relative flex flex-col items-center gap-4 md:sticky md:top-6 self-start min-w-0">
                  <div className="relative w-full h-[350px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
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
                    {product.images.length > 0 ? (
                      product.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`flex-shrink-0 border-2 rounded-md overflow-hidden transition-all duration-300 ${
                            selectedImage === index
                              ? "border-primary"
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
                      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 min-w-0">
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-bold text-gray-900">
                        {product.price_uzs.toLocaleString()} so'm
                      </span>
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
                              )
                            )
                          }
                          disabled={
                            quantity >= (product.stock_count || Infinity)
                          }
                          className="h-10 w-10 rounded-none hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      size="lg"
                      className="flex-1 h-10 bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 text-primary-foreground font-semibold text-base"
                      onClick={handleAddToCart}
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
                  <div className="space-y-1 text-gray-700 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Brend:</span>
                      <span>{product.brand || "Noma'lum"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Mavjudligi:</span>
                      <span
                        className={
                          product.is_active ? "text-green-600" : "text-red-600"
                        }
                      >
                        {product.is_active ? "Omborda mavjud" : "Tugagan"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Tavsif
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                {product.description}
              </p>
            </div>

            <div className="lg:col-span-1 lg:hidden min-w-0">
              <Card className="sticky top-6 bg-white rounded-xl border border-gray-200">
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
                      {(product.price_uzs / 6).toLocaleString()} so'm
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-base text-gray-900">
                    <span>Umumiy summa:</span>
                    <span>{product.price_uzs.toLocaleString()} so'm</span>
                  </div>
                  <Button
                    onClick={() => {
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

            <div
              className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6"
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

            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                O'xshash mahsulotlar
              </h3>
              <div className="grid gap-4 xs:gap-3 sm:gap-4 grid-cols-2 max-sm-xs:grid-cols-2 max-sm-xs:gap-2 max-sm-xs:shadow-none sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
                {relatedProducts.map((product) => (
                  <EnhancedProductCard
                    key={product.id}
                    {...product}
                    youtube_link={product.youtube_link || ""}
                    brand={product.brand || "Noma'lum"}
                    stock_count={product.stock_count || 0}
                    is_liked={product.is_liked || false}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 hidden lg:block min-w-0">
            <Card className="sticky top-6 bg-white rounded-xl border border-gray-200">
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
                    {(product.price_uzs / 6).toLocaleString()} so'm
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-base text-gray-900">
                  <span>Umumiy summa:</span>
                  <span>{product.price_uzs.toLocaleString()} so'm</span>
                </div>
                <Button
                  onClick={() => {
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
