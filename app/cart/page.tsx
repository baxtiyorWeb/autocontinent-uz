"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { JSX } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  brand: string
  inStock: boolean
}

const cartItems: CartItem[] = [
  {
    id: 1,
    name: "Motor yog'i filteri Chevrolet Lacetti",
    price: 45000,
    originalPrice: 55000,
    quantity: 2,
    image: "/placeholder.svg?height=120&width=120",
    brand: "Chevrolet",
    inStock: true,
  },
  {
    id: 2,
    name: "Tormoz kolodkalari Mercedes W205",
    price: 320000,
    quantity: 1,
    image: "/placeholder.svg?height=120&width=120",
    brand: "Mercedes-Benz",
    inStock: true,
  },
]

export default function CartPage(): JSX.Element {
  const [items, setItems] = useState<CartItem[]>(cartItems)

  const updateQuantity = (id: number, newQuantity: number): void => {
    if (newQuantity === 0) {
      setItems(items.filter((item) => item.id !== id))
    } else {
      setItems(items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: number): void => {
    setItems(items.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal >= 500000 ? 0 : 25000
  const total = subtotal + deliveryFee

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Savatcha bo'sh</h1>
            <p className="text-gray-600 mb-8">Hozircha hech qanday mahsulot qo'shilmagan</p>
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-blue-700">
              <Link href="/">Xarid qilishni boshlash</Link>
            </Button>
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
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Savatcha</h1>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {items.length} mahsulot
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="rounded-xl object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <Badge variant="outline" className="mb-2">
                          {item.brand}
                        </Badge>
                        <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-xl text-gray-900">{item.price.toLocaleString()} so'm</div>
                          {item.originalPrice && (
                            <div className="text-sm text-gray-500 line-through">
                              {item.originalPrice.toLocaleString()} so'm
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-10 w-10"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-4 py-2 font-semibold min-w-[60px] text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-10 w-10"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-lg">
                          Jami: {(item.price * item.quantity).toLocaleString()} so'm
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Buyurtma xulosasi</h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Mahsulotlar ({items.length}):</span>
                    <span>{subtotal.toLocaleString()} so'm</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Yetkazib berish:</span>
                    <span className={deliveryFee === 0 ? "text-green-600 font-semibold" : ""}>
                      {deliveryFee === 0 ? "Bepul" : `${deliveryFee.toLocaleString()} so'm`}
                    </span>
                  </div>
                  {deliveryFee === 0 && (
                    <p className="text-sm text-green-600">
                      🎉 500,000 so'mdan yuqori xaridlarda yetkazib berish bepul!
                    </p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Jami to'lov:</span>
                  <span>{total.toLocaleString()} so'm</span>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 text-primary-foreground font-semibold"
                >
                  <Link href="/checkout">Rasmiylashtirish</Link>
                </Button>

                <Button variant="outline" asChild size="lg" className="w-full bg-transparent">
                  <Link href="/">Xaridni davom ettirish</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
