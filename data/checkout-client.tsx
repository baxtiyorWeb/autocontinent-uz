"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

export default function CheckoutClient() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const quantity = searchParams.get("quantity");

  return (
    <div>
      <p>Product ID: {productId}</p>
      <p>Quantity: {quantity}</p>
      {/* Sizning qolgan checkout UI va logic */}
    </div>
  );
}
