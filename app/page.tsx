import { BannerCarousel } from "@/components/banner-carousel";
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
        <Header/>
        {/* Banner karuseli sahifaning yuqori qismida joylashgan */}
        <BannerCarousel />
        {/* Kontent konteyneri. Responsive bo'lishi uchun Tailwind CSS klasslari ishlatilgan. */}
        {/* `container mx-auto`: Kontentni markazlashtiradi va maksimal kenglikni belgilaydi. */}
        {/* `px-4`: Standart gorizontal bo'shliq (padding). */}
        {/* `xs:px-0`: 340px dan kichik ekranlarda gorizontal bo'shliqni olib tashlaydi. */}
        {/* `py-8`: Vertikal bo'shliq. */}
        {/* `space-y-12`: Ichki elementlar orasiga vertikal bo'shliq qo'shadi. */}
        <div className="container mx-auto px-4 py-8   max-sm-xs:px-1 max-sm-xs:py-4 ">
          {/* Kategoriyalar bo'limi (hozircha izohga olingan) */}
          {/* <CategoriesSection title="Kategoriyalar" /> */}
          {/* Brendlar bo'limi grid ko'rinishida (hozircha izohga olingan) */}
          {/* <BrandGridSection /> */}
          {/* Eng ko'p sotilgan mahsulotlar bo'limi */}
          <ProductsSection
            title="Eng ko'p sotilgan mahsulotlar"
            type="bestselling"
          />
          {/* Eng ko'p yoqtirilgan mahsulotlar bo'limi */}
          <ProductsSection
            title="Eng ko'p yoqtirilgan mahsulotlar"
            type="mostliked"
          />
          {/* Tavsiya qilingan mahsulotlar bo'limi */}
          <ProductsSection
            title="Tavsiya qilingan mahsulotlar"
            type="recommended"
          />
        </div>
      </main>
    </>
  );
}
