"use client"

import type React from "react"
import { JSX, useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, Heart, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("")

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              +998 (71) 123-45-67
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>Bepul yetkazib berish 500,000 so'mdan yuqori xaridlarda</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-white p-2 rounded-lg">
              <span className="font-bold text-xl">AK</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-xl text-gray-900">AvtoKontinent</h1>
              <p className="text-sm text-gray-600">Avto ehtiyot qismlar</p>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Qidirish... (masalan: motor, tormoz, filtr)"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/favorites">
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  2
                </Badge>
              </Link>
            </Button>

            <Button variant="outline" className="hidden sm:flex items-center gap-2 bg-transparent" asChild>
              <Link href="/login">
                <User className="h-4 w-4" />
                Kirish
              </Link>
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  <Button className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Kirish
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Heart className="h-4 w-4 mr-2" />
                    Sevimlilar
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Savatcha
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
