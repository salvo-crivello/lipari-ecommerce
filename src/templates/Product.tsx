"use client";
import { BotOffIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ProductDescription from "./product/ProductDescription";
import ProductDetails from "./product/ProductDetails";
import ProductHero from "./product/ProductHero";
import ProductPayment from "./product/ProductPayment";

function Product() {
  const router = useRouter();
  const { id } = useParams();

  const product = useSelector((state: RootState) => {
    const { pagination, products } = state.productsData;
    const pageProducts = products[pagination];
    if (!pageProducts || !Array.isArray(pageProducts)) return undefined;
    return pageProducts.find((p) => p.id === Number(id));
  });

  useLayoutEffect(() => {
    if (product) return;
    router.push("/products");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!product)
    return (
      <header className="h-screen px-5 lg:px-10 pt-40 pb-20 flex flex-col relative max-w-7xl mx-auto">
        <BotOffIcon size={120} className="text-neutral-300" />
        <h2>Qualcosa è andato storto</h2>
        <p className="text-neutral-500">
          Il prodotto che stai cercando non esiste o è stato rimosso.
        </p>
      </header>
    );

  return (
    <>
      <article className="px-5 lg:px-10 max-w-7xl flex gap-5 lg:gap-10 mx-auto">
        <div>
          <ProductHero product={product} />
          <ProductDescription product={product} />
          <ProductDetails product={product} />
        </div>
        <aside>
          <ProductPayment product={product} />
        </aside>
      </article>
    </>
  );
}

export default Product;
