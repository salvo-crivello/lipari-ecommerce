"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchProducts } from "../store/sliceProducts";
import ProductsSectionHero from "./products/ProductsSectionHero";
import ProductsSectionStore from "./products/ProductsSectionStore";

function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const stateSelector = useSelector((state: RootState) => state.productsData);

  useEffect(() => {
    dispatch(fetchProducts(stateSelector.currentPage));
  }, [dispatch, stateSelector.currentPage]);

  return (
    <article>
      <ProductsSectionHero />
      <ProductsSectionStore />
    </article>
  );
}

export default Products;
