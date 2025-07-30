import React from "react";

import { productType } from "@/src/store/sliceProducts";
import ProductImage from "./ProductImage";
import ProductBadges from "./ProductBadges";

function ProductHero({ product }: { product: productType }) {
  const { title } = product;

  return (
    <header className="pt-40 pb-10 lg:pb-20 flex flex-col lg:flex-row items-start gap-10 sm:max-md:gap-5 relative mx-auto">
      <ProductImage product={product} />
      <div className="flex flex-col items-start justify-start w-full">
        <h2 className="text-xl font-bold mb-5">{title}</h2>
        <ProductBadges product={product} />
      </div>
    </header>
  );
}

export default React.memo(ProductHero);
