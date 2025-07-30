"use client";

import ProductCard from "@/src/components/ProductCard";
import { useFetchProductsQuery } from "@/src/store/productsApiSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, setProducts } from "../../store/sliceProducts";
import { RootState } from "../../store/store";
import LoadingSpinner from "@/src/components/LoadingSpinner";

function ProductsSectionStore() {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { products, pagination } = useSelector(
    (state: RootState) => state.productsData
  );
  const dispatch = useDispatch();

  const { data, isLoading } = useFetchProductsQuery(pagination);

  useEffect(() => {
    if (!isLoading && !products[pagination]) {
      console.log(`Saving data for page ${pagination}:`, data);
      dispatch(setProducts(data));
    }
  }, [data, pagination, products, isLoading, dispatch]);

  useEffect(() => {
    const currentRef = loadMoreRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !isLoading) {
          dispatch(nextPage());
        }
      },
      {
        root: null,
        rootMargin: "40px",
        threshold: 0.1,
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [dispatch, isLoading]);

  if (isLoading && !data) {
    return <LoadingSpinner />;
  }

  return (
    <section className="px-5 lg:px-10 py-20 bg-neutral-50">
      <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {products &&
          Object.values(products)
            .flat()
            .map((product, i) => {
              if (!product) return null;

              return (
                <li key={`${i}-${product.id}`} className="flex">
                  <ProductCard product={product} />
                </li>
              );
            })}
      </ul>
      <div ref={loadMoreRef}></div>
    </section>
  );
}

export default ProductsSectionStore;
