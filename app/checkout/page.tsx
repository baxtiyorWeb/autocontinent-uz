"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CreditCard, Upload, CheckCircle, AlertCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  brand: string
}

const cartItems: CartItem[] = [
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
]

interface CustomerInfo {
  fullName: string
  phone: string
  address: string
  notes: string
}

export default function CheckoutPage(): JSX.Element {
  const [step, setStep] = useState<"details" | "payment" | "success">("details")
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false)
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: "",
    phone: "",
    address: "",
    notes: "",
  })

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal >= 500000 ? 0 : 25000
  const total = subtotal + deliveryFee

  const cardNumber = "8600 1234 5678 9012"
  const cardHolder = "AVTOKONTINENT UZ"

  const handleDetailsSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setStep("payment")
  }

  const handlePaymentSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setStep("success")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (file) {
      setPaymentProof(file)
    }
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Buyurtma muvaffaqiyatli yuborildi!</h1>
            <p className="text-gray-600 mb-8">
              Sizning buyurtmangiz qabul qilindi. Tez orada Telegram bot orqali buyurtma holati haqida xabar beramiz.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/">Bosh sahifaga qaytish</Link>
              </Button>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/orders">Buyurtmalarimni ko'rish</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/cart" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Buyurtmani rasmiylashtirish</h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${step === "details" ? "text-primary" : "text-green-600"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === "details" ? "bg-primary text-white" : "bg-green-600 text-white"
                  }`}
                >
                  {step === "details" ? "1" : <CheckCircle className="h-4 w-4" />}
                </div>
                <span className="font-medium">Ma'lumotlar</span>
              </div>
              <div className="w-12 h-px bg-gray-300"></div>
              <div
                className={`flex items-center gap-2 ${
                  step === "payment" ? "text-primary" : step === "success" ? "text-green-600" : "text-gray-400"
                }`}
              >
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
                <span className="font-medium">To'lov</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === "details" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Yetkazib berish ma'lumotlari</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleDetailsSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                            To'liq ism
                          </label>
                          <Input
                            id="fullName"
                            value={customerInfo.fullName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setCustomerInfo({ ...customerInfo, fullName: e.target.value })
                            }
                            className="input-no-outline"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Telefon raqam
                          </label>
                          <Input
                            id="phone"
                            type="tel"
                            value={customerInfo.phone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setCustomerInfo({ ...customerInfo, phone: e.target.value })
                            }
                            className="input-no-outline"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                          Yetkazib berish manzili
                        </label>
                        <Textarea
                          id="address"
                          value={customerInfo.address}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setCustomerInfo({ ...customerInfo, address: e.target.value })
                          }
                          className="input-no-outline"
                          rows={3}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                          Qo'shimcha izoh (ixtiyoriy)
                        </label>
                        <Textarea
                          id="notes"
                          value={customerInfo.notes}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setCustomerInfo({ ...customerInfo, notes: e.target.value })
                          }
                          className="input-no-outline"
                          rows={2}
                        />
                      </div>

                      <Button type="submit" className="w-full bg-gradient-to-r from-primary to-blue-700">
                        To'lovga o'tish
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {step === "payment" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        To'lov ma'lumotlari
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gradient-to-r from-primary to-blue-800 rounded-xl p-6 text-white mb-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-blue-100 text-sm">Karta raqami</p>
                            <p className="text-xl font-mono tracking-wider">{cardNumber}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-blue-100 text-sm">Summa</p>
                            <p className="text-xl font-bold">{total.toLocaleString()} so'm</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-blue-100 text-sm">Karta egasi</p>
                          <p className="font-medium">{cardHolder}</p>
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                        <div className="flex gap-3">
                          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-amber-800 mb-1">To'lov qilish tartibi:</h4>
                            <ol className="text-sm text-amber-700 space-y-1">
                              <li>1. Yuqoridagi karta raqamiga to'lov qiling</li>
                              <li>2. To'lov chekini yoki skrinshotini yuklang</li>
                              <li>3. Buyurtmani tasdiqlang</li>
                            </ol>
                          </div>
                        </div>
                      </div>

                      <form onSubmit={handlePaymentSubmit} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            To'lov cheki yoki skrinshotini yuklang
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                              id="payment-proof"
                              required
                            />
                            <label htmlFor="payment-proof" className="cursor-pointer">
                              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">
                                {paymentProof ? paymentProof.name : "Rasm yuklash uchun bosing"}
                              </p>
                            </label>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="terms"
                            checked={acceptedTerms}
                            onCheckedChange={(checked: boolean) => setAcceptedTerms(checked)}
                          />
                          <label htmlFor="terms" className="text-sm text-gray-700">
                            Men{" "}
                            <Link href="/terms" className="text-primary hover:underline">
                              foydalanish shartlari
                            </Link>{" "}
                            va{" "}
                            <Link href="/privacy" className="text-primary hover:underline">
                              maxfiylik siyosati
                            </Link>{" "}
                            bilan tanishdim va roziman
                          </label>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                          disabled={!acceptedTerms || !paymentProof}
                        >
                          Buyurtmani tasdiqlash
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.brand}
                          </Badge>
                          <span className="text-xs text-gray-500">×{item.quantity}</span>
                        </div>
                        <p className="font-semibold text-sm mt-1">
                          {(item.price * item.quantity).toLocaleString()} so'm
                        </p>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Mahsulotlar:</span>
                      <span>{subtotal.toLocaleString()} so'm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Yetkazib berish:</span>
                      <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                        {deliveryFee === 0 ? "Bepul" : `${deliveryFee.toLocaleString()} so'm`}
                      </span>
                    </div>
                    {deliveryFee === 0 && (
                      <p className="text-xs text-green-600">500,000 so'mdan yuqori xaridlarda yetkazib berish bepul</p>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Jami:</span>
                    <span>{total.toLocaleString()} so'm</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
