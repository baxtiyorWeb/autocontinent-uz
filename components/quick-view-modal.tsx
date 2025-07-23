"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Star, ShoppingCart, Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import type { JSX } from "react"

interface ProductForQuickView {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  likeCount: number
  brand: string
  inStock: boolean
  stockCount?: number
  description?: string
}

interface QuickViewModalProps {
  product: ProductForQuickView
  isOpen: boolean
  onClose: () => void
  onAddToCart?: () => void
}

export function QuickViewModal({ product, isOpen, onClose, onAddToCart }: QuickViewModalProps): JSX.Element | null {
  const [quantity, setQuantity] = useState<number>(1)
  const [isLiked, setIsLiked] = useState<boolean>(false)

  if (!product) return null

  const discountPercent = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden rounded-2xl">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Image Section */}
          <div className="relative h-80 md:h-auto bg-gray-100 flex items-center justify-center overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className="object-contain w-full h-full p-4"
            />
            {discountPercent > 0 && (
              <Badge className="absolute top-4 left-4 bg-destructive text-white font-bold text-sm px-3 py-1">
                -{discountPercent}%
              </Badge>
            )}
            {!product.inStock && (
              <Badge className="absolute top-4 left-4 bg-gray-500 text-white font-semibold text-sm px-3 py-1">
                Tugagan
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full shadow-md"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-destructive text-destructive" : "text-gray-600"}`} />
            </Button>
          </div>

          {/* Product Details Section */}
          <div className="p-6 md:p-8 space-y-5">
            <DialogHeader className="relative pr-8">
              <DialogTitle className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </DialogHeader>

            <div className="flex items-center gap-4 text-sm">
              <Badge variant="outline" className="text-primary border-blue-200 bg-blue-50 font-semibold px-2 py-0.5">
                {product.brand}
              </Badge>
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium text-gray-700">{product.rating}</span>
                <span className="text-gray-500">({product.reviewCount} sharh)</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-3xl font-bold text-gray-900">
                {product.price.toLocaleString()} <span className="text-xl text-gray-600">so'm</span>
              </span>
              {product.originalPrice && (
                <p className="text-lg text-gray-500 line-through">{product.originalPrice.toLocaleString()} so'm</p>
              )}
            </div>

            {product.description && <p className="text-gray-700 text-sm line-clamp-3">{product.description}</p>}

            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-900">Miqdor:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-9 w-9 rounded-none hover:bg-gray-100"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 font-semibold text-base">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stockCount || 99, quantity + 1))}
                  disabled={quantity >= (product.stockCount || 99)}
                  className="h-9 w-9 rounded-none hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 h-12 bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 text-primary-foreground font-semibold text-base"
                disabled={!product.inStock}
                onClick={() => {
                  if (product.inStock && onAddToCart) {
                    onAddToCart()
                    onClose() // Savatga qo'shgandan keyin modalni yopish
                  }
                }}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Savatga qo'shish
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-4 bg-transparent" asChild>
                <Link href={`/products/${product.id}`} onClick={onClose}>
                  Batafsil
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
