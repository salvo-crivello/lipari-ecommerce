import { productType } from "@/src/store/sliceProducts";
import React, { memo } from "react";

function ProductDescription({ product }: { product: productType }) {
  const { description } = product;
  return (
    <section className="mb-10 mx-auto">
      <h3 className="text-md font-semibold mb-5">Descrizione Prodotto</h3>
      <p className="text-neutral-600 mb-4 text-sm">
        {description
          ? description
          : "error... non è stata trovata una descrizione"}
      </p>
    </section>
  );
}

export default memo(ProductDescription);
