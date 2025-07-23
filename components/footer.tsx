import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, TextIcon as Telegram } from "lucide-react"
import type { JSX } from "react"

export function Footer(): JSX.Element {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-white p-2 rounded-lg">
                <span className="font-bold text-xl">AK</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">AvtoKontinent</h3>
                <p className="text-sm text-gray-400">Avto ehtiyot qismlar</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              O'zbekistondagi eng yirik avto ehtiyot qismlar do'koni. Sifatli mahsulotlar va tez yetkazib berish
              xizmati.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Telegram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Tezkor havolalar</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  Biz haqimizda
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-gray-400 hover:text-white">
                  Yetkazib berish
                </Link>
              </li>
              <li>
                <Link href="/payment" className="text-gray-400 hover:text-white">
                  To'lov usullari
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-400 hover:text-white">
                  Kafolat
                </Link>
              </li>
              <li>
                <Link href="/return" className="text-gray-400 hover:text-white">
                  Qaytarish
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Kategoriyalar</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/motor" className="text-gray-400 hover:text-white">
                  Motor qismlari
                </Link>
              </li>
              <li>
                <Link href="/categories/tormoz" className="text-gray-400 hover:text-white">
                  Tormoz tizimi
                </Link>
              </li>
              <li>
                <Link href="/categories/elektr" className="text-gray-400 hover:text-white">
                  Elektr qismlari
                </Link>
              </li>
              <li>
                <Link href="/categories/filtrlar" className="text-gray-400 hover:text-white">
                  Filtrlar
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-gray-400 hover:text-white">
                  Barcha brendlar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Aloqa</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">+998 (71) 123-45-67</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">info@avtokontinent.uz</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5" />
                <span className="text-gray-400">
                  Toshkent sh., Chilonzor tumani,
                  <br />
                  Bunyodkor ko'chasi, 1-uy
                </span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Ish vaqti:</p>
              <p className="text-sm">Dush-Juma: 9:00 - 18:00</p>
              <p className="text-sm">Shanba: 9:00 - 15:00</p>
              <p className="text-sm text-red-400">Yakshanba: Dam olish</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 AvtoKontinent.uz. Barcha huquqlar himoyalangan.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
              Maxfiylik siyosati
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
              Foydalanish shartlari
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
