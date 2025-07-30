import { productType } from "@/src/store/sliceProducts";
import clsx from "clsx";
import React, { memo, useMemo } from "react";

function ProductDetails({ product }: { product: productType }) {
  const { brand, model, color } = product;

  const productDetails = useMemo(
    () => ({
      brand,
      model,
      color,
    }),
    [brand, model, color]
  );

  return (
    <section className=" mb-10 mx-auto">
      <h3 className="text-md font-semibold mb-5">Dettagli</h3>
      <ul className="w-full">
        {Object.entries(productDetails).map(([key, value], i) => {
          return (
            <li
              key={key}
              className={clsx("flex w-full px-4 py-4 text-sm", {
                "bg-neutral-100": i === 0 || i % 2 === 0,
              })}
            >
              <span className="flex w-32 text-neutral-500">{key}</span>
              <span>{value}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default memo(ProductDetails);
