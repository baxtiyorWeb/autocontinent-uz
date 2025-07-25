// app/checkout/CheckoutClientComponent.tsx
"use client"; // Bu direktiva juda muhim! Bu faylni Client Component deb belgilaydi.

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Endi bu hook Client Component ichida
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  brand: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Motor yog'i filteri Chevrolet Lacetti",
    price: 45000,
    quantity: 2,
    image: "/placeholder.svg?height=80&width=80",
    brand: "Chevrolet",
  },
  {
    id: 2,
    name: "Tormoz kolodkalari Mercedes W205",
    price: 320000,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
    brand: "Mercedes-Benz",
  },
];

interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
  notes: string;
}

interface OrderPayload {
  full_name: string;
  address: string;
  phone_number: string;
  product_id: number;
  quantity: number;
  notes?: string;
}

export default function CheckoutClientComponent(): React.JSX.Element {
  const [step, setStep] = useState<"details" | "payment" | "success">(
    "details"
  );
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: "",
    phone: "",
    address: "",
    notes: "",
  });

  const { toast } = useToast();
  const searchParams = useSearchParams(); // << useSearchParams endi shu yerda

  const urlProductId = searchParams.get("productId");
  const urlQuantity = searchParams.get("quantity");

  const [checkoutProduct, setCheckoutProduct] = useState<CartItem | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState<boolean>(true);

  useEffect(() => {
    if (urlProductId && urlQuantity) {
      const parsedProductId = parseInt(urlProductId, 10);
      const parsedQuantity = parseInt(urlQuantity, 10);

      const foundProduct = initialCartItems.find(
        (item) => item.id === parsedProductId
      );

      if (foundProduct) {
        setCheckoutProduct({
          ...foundProduct,
          quantity: parsedQuantity,
        });
      } else {
        setCheckoutProduct({
          id: parsedProductId,
          name: "Noma'lum mahsulot",
          price: 0,
          quantity: parsedQuantity,
          image: "/placeholder.svg?height=80&width=80",
          brand: "Noma'lum",
        });
      }
      setIsLoadingProduct(false);
    } else {
      setIsLoadingProduct(false);
      toast({
        title: "Xato",
        description: "Mahsulot ma'lumotlari URL'da topilmadi.",
        variant: "destructive",
      });
    }
  }, [urlProductId, urlQuantity, toast]);

  const subtotal = checkoutProduct
    ? checkoutProduct.price * checkoutProduct.quantity
    : 0;
  const deliveryFee = subtotal >= 500000 ? 0 : 25000;
  const total = subtotal + deliveryFee;

  const cardNumber = "8600 1234 5678 9012";
  const cardHolder = "AVTOKONTINENT UZ";

  const handleDetailsSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (
      !customerInfo.fullName ||
      !customerInfo.phone ||
      !customerInfo.address
    ) {
      toast({
        title: "Xato",
        description: "Barcha majburiy ma'lumotlarni to'ldiring.",
        variant: "destructive",
      });
      return;
    }
    setStep("payment");
  };

  const handlePaymentSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!acceptedTerms) {
      toast({
        title: "Xato",
        description:
          "Foydalanish shartlari va maxfiylik siyosatiga rozi bo'lishingiz kerak.",
        variant: "destructive",
      });
      return;
    }

    if (!urlProductId || !urlQuantity) {
      toast({
        title: "Xato",
        description:
          "Mahsulot IDsi yoki miqdori topilmadi. Sahifani yangilang.",
        variant: "destructive",
      });
      return;
    }

    const productIdToSend = parseInt(urlProductId, 10);
    const quantityToSend = parseInt(urlQuantity, 10);

    if (isNaN(productIdToSend) || isNaN(quantityToSend)) {
      toast({
        title: "Xato",
        description: "Mahsulot IDsi yoki miqdori noto'g'ri formatda.",
        variant: "destructive",
      });
      return;
    }

    const orderData: OrderPayload = {
      full_name: customerInfo.fullName,
      address: customerInfo.address,
      phone_number: customerInfo.phone,
      product_id: productIdToSend,
      quantity: quantityToSend,
    };

    if (customerInfo.notes) {
      orderData.notes = customerInfo.notes;
    }

    try {
      const response = await api.post("/orders/", orderData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Buyurtma muvaffaqiyatli yuborildi:", response.data);
      toast({
        title: "Muvaffaqiyatli",
        description: "Buyurtmangiz muvaffaqiyatli qabul qilindi!",
        variant: "default",
      });
      setStep("success");
    } catch (error: any) {
      console.error("Buyurtma yuborishda xatolik yuz berdi:", error);
      toast({
        title: "Xato",
        description: `Buyurtma yuborishda xatolik yuz berdi: ${
          error.response?.data?.detail || error.message
        }`,
        variant: "destructive",
      });
    }
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center bg-white p-8 rounded-xl shadow-none border border-gray-200">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Buyurtma muvaffaqiyatli yuborildi!
            </h1>
            <p className="text-gray-600 mb-8">
              Sizning buyurtmangiz qabul qilindi. Tez orada Telegram bot orqali
              buyurtma holati haqida xabar beramiz.
            </p>
            <div className="space-y-3">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-primary to-blue-700"
              >
                <Link href="/">Bosh sahifaga qaytish</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full bg-transparent"
              >
                <Link href="/orders">Buyurtmalarimni ko'rish</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoadingProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-700">
          Mahsulot ma'lumotlari yuklanmoqda...
        </p>
      </div>
    );
  }

  if (!checkoutProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Xato: Mahsulot ma'lumotlari mavjud emas
          </h1>
          <p className="text-gray-600 mb-6">
            Iltimos, mahsulot sahifasidan qayta urinib ko'ring.
          </p>
          <Button asChild className="bg-primary">
            <Link href="/">Bosh sahifaga qaytish</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/cart" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl sm:text-xl xs:text-lg font-bold truncate">
              Buyurtmani rasmiylashtirish
            </h1>
          </div>

          <div className="flex items-center justify-center mb-8 flex-wrap gap-y-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "details"
                    ? "bg-primary text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {step === "details" ? "1" : <CheckCircle className="h-4 w-4" />}
              </div>
              <span
                className={`font-medium ${
                  step === "details" ? "text-primary" : "text-green-600"
                }`}
              >
                Ma'lumotlar
              </span>
            </div>
            <div className="flex-1 h-px bg-gray-300 mx-4 min-w-[30px]"></div>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "payment"
                    ? "bg-primary text-white"
                    : step === "success"
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {step === "success" ? <CheckCircle className="h-4 w-4" /> : "2"}
              </div>
              <span
                className={`font-medium ${
                  step === "payment"
                    ? "text-primary"
                    : step === "success"
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                To'lov
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 min-w-0">
              {step === "details" && (
                <Card className="rounded-xl shadow-none border border-gray-200">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Yetkazib berish ma'lumotlari
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <form onSubmit={handleDetailsSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="fullName"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            To'liq ism
                          </label>
                          <Input
                            id="fullName"
                            value={customerInfo.fullName}
                            onChange={(e) =>
                              setCustomerInfo({
                                ...customerInfo,
                                fullName: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Telefon raqam
                          </label>
                          <Input
                            id="phone"
                            type="tel"
                            value={customerInfo.phone}
                            onChange={(e) =>
                              setCustomerInfo({
                                ...customerInfo,
                                phone: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Yetkazib berish manzili
                        </label>
                        <Textarea
                          id="address"
                          value={customerInfo.address}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              address: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary resize-none"
                          rows={3}
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="notes"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Qo'shimcha izoh (ixtiyoriy)
                        </label>
                        <Textarea
                          id="notes"
                          value={customerInfo.notes}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              notes: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary resize-none"
                          rows={2}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-11 bg-gradient-to-r from-primary to-blue-700"
                      >
                        To'lovga o'tish
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {step === "payment" && (
                <div className="space-y-6">
                  <Card className="rounded-xl shadow-none border border-gray-200">
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                        <CreditCard className="h-6 w-6 text-primary" />
                        To'lov ma'lumotlari
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <div className="bg-gradient-to-r from-primary to-blue-800 rounded-xl p-6 text-white mb-6 shadow-md">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-blue-100 text-sm">
                              Karta raqami
                            </p>
                            <p className="text-2xl font-mono tracking-wider mt-1">
                              {cardNumber}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-blue-100 text-sm">Summa</p>
                            <p className="text-2xl font-bold mt-1">
                              {total.toLocaleString()} so'm
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-blue-100 text-sm">Karta egasi</p>
                          <p className="font-medium text-lg">{cardHolder}</p>
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-amber-800 mb-1">
                            To'lov qilish tartibi:
                          </h4>
                          <ol className="text-sm text-amber-700 space-y-1 list-decimal pl-4">
                            <li>Yuqoridagi karta raqamiga to'lov qiling</li>
                            <li>Buyurtmani tasdiqlang</li>
                          </ol>
                        </div>
                      </div>

                      <form
                        onSubmit={handlePaymentSubmit}
                        className="space-y-6"
                      >
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="terms"
                            checked={acceptedTerms}
                            onCheckedChange={setAcceptedTerms}
                          />
                          <label
                            htmlFor="terms"
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            Men{" "}
                            <Link
                              href="/terms"
                              className="text-primary hover:underline"
                            >
                              foydalanish shartlari
                            </Link>{" "}
                            va{" "}
                            <Link
                              href="/privacy"
                              className="text-primary hover:underline"
                            >
                              maxfiylik siyosati
                            </Link>{" "}
                            bilan tanishdim va roziman
                          </label>
                        </div>

                        <Button
                          type="submit"
                          className="w-full h-11 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                          disabled={!acceptedTerms}
                        >
                          Buyurtmani tasdiqlash
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            <div className="lg:col-span-1 min-w-0">
              <Card className="lg:sticky lg:top-24 rounded-xl shadow-none border border-gray-200">
                <CardContent className="p-4 sm:p-6 space-y-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    Buyurtma xulosasi
                  </h2>
                  {checkoutProduct ? (
                    <div
                      key={checkoutProduct.id}
                      className="flex gap-3 items-center"
                    >
                      <Image
                        src={checkoutProduct.image || "/placeholder.svg"}
                        alt={checkoutProduct.name}
                        width={70}
                        height={70}
                        className="rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-base line-clamp-2 text-gray-900">
                          {checkoutProduct.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="text-xs px-2 py-0.5"
                          >
                            {checkoutProduct.brand}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            ×{checkoutProduct.quantity}
                          </span>
                        </div>
                        <p className="font-semibold text-base mt-1 text-gray-900">
                          {(
                            checkoutProduct.price * checkoutProduct.quantity
                          ).toLocaleString()}{" "}
                          so'm
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      Mahsulot ma'lumotlari mavjud emas.
                    </p>
                  )}
                  <Separator />
                  <div className="space-y-2 text-base">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Mahsulotlar:</span>
                      <span className="font-medium text-gray-900">
                        {subtotal.toLocaleString()} so'm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-700">Yetkazib berish:</span>
                      <span
                        className={`font-medium ${
                          deliveryFee === 0 ? "text-green-600" : "text-gray-900"
                        }`}
                      >
                        {deliveryFee === 0
                          ? "Bepul"
                          : `${deliveryFee.toLocaleString()} so'm`}
                      </span>
                    </div>
                    {deliveryFee === 0 && (
                      <p className="text-sm text-green-600">
                        🎉 500,000 so'mdan yuqori xaridlarda yetkazib berish
                        bepul!
                      </p>
                    )}
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-xl text-gray-900">
                    <span>Jami:</span>
                    <span>{total.toLocaleString()} so'm</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
