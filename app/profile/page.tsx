import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { User, ShoppingBag, Heart, Settings } from "lucide-react"
import type { JSX } from "react"

export default function ProfilePage(): JSX.Element {
  return (
    <>
      <PageHeader title="Mening Profilim" subtitle="Shaxsiy ma'lumotlaringiz va buyurtmalaringiz" />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Navigation */}
          <div className="md:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Navigatsiya</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors text-primary font-medium"
                >
                  <User className="h-5 w-5" />
                  Shaxsiy ma'lumotlar
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Mening buyurtmalarim
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
                >
                  <Heart className="h-5 w-5" />
                  Sevimlilar
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
                >
                  <Settings className="h-5 w-5" />
                  Sozlamalar
                </Link>
              </li>
            </ul>
            <Button variant="outline" className="w-full mt-6 bg-transparent">
              Chiqish
            </Button>
          </div>

          {/* Profile Content */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Shaxsiy ma'lumotlar</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Ism:</p>
                <p className="text-gray-900 font-semibold">John Doe</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Telefon raqami:</p>
                <p className="text-gray-900 font-semibold">+998 (90) 123-45-67</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Elektron pochta:</p>
                <p className="text-gray-900 font-semibold">john.doe@example.com</p>
              </div>
            </div>
            <Button className="mt-6 bg-primary hover:bg-blue-600">Ma'lumotlarni tahrirlash</Button>
          </div>
        </div>
      </div>
    </>
  )
}
