"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Image from "next/image";

function ProductsSectionStore() {
  const products = useSelector(
    (state: RootState) => state.productsData.products
  );
  return (
    <section>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 bg-white">
        {products.map((product) => (
          <li
            key={product.id}
            className="p-4 border border-gray-200 rounded-lg shadow-sm"
          >
            <Image
              src={product.image}
              alt={product.title}
              width={100}
              height={100}
              className="object-cover w-24 h-24"
            />
            <h4 className="text-xl font-bold">{product.title}</h4>
            <p className="text-gray-700">{product.description}</p>
            <span className="text-green-600">${product.price}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProductsSectionStore;
