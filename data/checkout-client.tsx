// app/checkout/page.tsx
import type React from "react";
import { Suspense } from "react"; // Suspense'ni import qilish muhim
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import dynamic from "next/dynamic";

// CheckoutForm'ni dinamik ravishda import qilish
// ssr: false - bu komponent serverda renderlanmasligini ta'minlaydi.
const CheckoutForm = dynamic(() => import("./../app/checkout/page"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-lg text-gray-700">Yuklanmoqda...</p>
    </div>
  ), // Yuklanish holati uchun opsiyonel fallback
});

export default function CheckoutPage(): React.JSX.Element {
  return (
    <>
      <Header />
      {/*
        Client Component'ni <Suspense> ichiga oling.
        Bu, useSearchParams kabi hooklar brauzerda mavjud bo'lmaguncha
        yuklanish holatini ko'rsatadi.
      */}
      <Suspense
        fallback={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <p className="text-lg text-gray-700">Sahifa yuklanmoqda...</p>
          </div>
        }
      >
        {/* Mana bu yerda client-side form komponentini chaqiramiz */}
        <CheckoutForm />
      </Suspense>
      <Footer />
    </>
  );
}
