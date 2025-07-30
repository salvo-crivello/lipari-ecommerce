"use client";

import { lazy, Suspense } from "react";
const ProductDetails = lazy(() => import("@/src/templates/Product"));

export default function ProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetails />
    </Suspense>
  );
}
