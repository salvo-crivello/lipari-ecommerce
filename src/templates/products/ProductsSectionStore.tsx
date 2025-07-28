"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Image from "next/image";
import { useFetchProductsQuery } from "@/src/store/productsApiSlice";
import { nextPage, setProducts } from "../../store/sliceProducts";
import { Button } from "@/src/components/Button";
import { p } from "motion/react-client";
import { useEffect } from "react";

function ProductsSectionStore() {
  const { products, pagination } = useSelector(
    (state: RootState) => state.productsData
  );
  const dispatch = useDispatch();

  const { data, isLoading, error } = useFetchProductsQuery(pagination);

  useEffect(() => {
    if (!products[pagination]) {
      dispatch(setProducts(data));
    }
  }, [data, pagination, products, dispatch]);

  const handleLoadMore = () => {
    dispatch(nextPage());
  };

  return (
    <section>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 bg-white">
        {products &&
          Object.values(products)
            .flat()
            .map((product, i) => (
              <li
                key={`${i}-${product.id}`}
                className="p-4 border border-gray-200 rounded-lg shadow-sm"
              >
                <Image
                  src={product.image || "/placeholder.png"}
                  alt={product.title || "product image"}
                  width={100}
                  height={100}
                  className="object-cover w-24 h-24"
                  placeholder="blur"
                  blurDataURL="/placeholder.png"
                />
                <h4 className="text-xl font-bold">{product.title}</h4>
                <p className="text-gray-700">{product.description}</p>
                <span className="text-green-600">${product.price}</span>
              </li>
            ))}
      </ul>
      <Button onClick={handleLoadMore}>
        {isLoading ? "loading ..." : "vedi altri"}
      </Button>
    </section>
  );
}

export default ProductsSectionStore;
