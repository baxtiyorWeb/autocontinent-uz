import { BannerCarousel } from "@/components/banner-carousel";
import { BrandGridSection } from "@/components/brand-grid-section";
import { CategoriesSection } from "@/components/categories-section";
import { Header } from "@/components/header";
import { ProductsSection } from "@/components/products-section";
// CategoriesSection va BrandGridSection importlari hozircha izohga olingan
// import { CategoriesSection } from "@/components/categories-section";
// import { BrandGridSection } from "@/components/brand-grid-section";
import type { JSX } from "react";

export default function HomePage(): JSX.Element {
  return (
    <>
      {/* Header va Footer komponentlari app/layout.tsx da render qilinadi, shuning uchun bu yerda olib tashlandi. */}
      <main>
        <Header />
        {/* Banner karuseli sahifaning yuqori qismida joylashgan */}
        <BannerCarousel />
        {/* Kontent konteyneri. Responsive bo'lishi uchun Tailwind CSS klasslari ishlatilgan. */}
        {/* `container mx-auto`: Kontentni markazlashtiradi va maksimal kenglikni belgilaydi. */}
        {/* `px-4`: Standart gorizontal bo'shliq (padding). */}
        {/* `xs:px-0`: 340px dan kichik ekranlarda gorizontal bo'shliqni olib tashlaydi. */}
        {/* `py-8`: Vertikal bo'shliq. */}
        {/* `space-y-12`: Ichki elementlar orasiga vertikal bo'shliq qo'shadi. */}
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-10 sm:space-y-12">
          <div className="hidden sm:block">
            <CategoriesSection title="Kategoriyalar" />
          </div>
          <div className="lg:hidden max-sm-xs:flex">
            <BrandGridSection />
          </div>
          <ProductsSection
            title="Eng ko'p sotilgan mahsulotlar"
            type="bestselling"
          />
        </div>
      </main>
    </>
  );
}
