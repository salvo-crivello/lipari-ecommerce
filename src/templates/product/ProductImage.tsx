import { productType } from "@/src/store/sliceProducts";
import Image from "next/image";
import { memo } from "react";

const ProductImage = ({ product }: { product: productType }) => {
  const { image, title, popular } = product;

  return (
    <div className="flex w-full lg:min-w-[240px] h-full max-sm:aspect-square relative rounded-xl overflow-hidden shadow-xl shadow-neutral-100">
      {popular && (
        <span className="absolute top-5 left-0 bg-lime-500 rounded-tr-xl p-2 pr-4 text-white uppercase text-sm font-semibold">
          Popolare
        </span>
      )}
      <Image
        src={image || "/placeholder.png"}
        alt={title || "product image"}
        width={400}
        height={400}
        className="object-cover md:mx-auto max-md:w-full max-md:h-full"
        placeholder="blur"
        blurDataURL="/placeholder.png"
      />
    </div>
  );
};

export default memo(ProductImage);
