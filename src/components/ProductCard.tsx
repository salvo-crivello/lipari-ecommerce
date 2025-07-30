import { BadgePercent, ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { productType } from "../store/sliceProducts";
import { Button } from "./ui/Button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { useDispatch } from "react-redux";
import PayDiscountBadge from "./PayDiscountBadge";
import { useWindowSize } from "../hooks/useWindowSize";
import currencyFormat from "../utils/currencyFormat";

function ProductCard({ product }: { product: productType }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isMobile } = useWindowSize();
  const [imageError, setImageError] = useState(false);

  const { price, discount, title, image, id: productId, popular } = product;

  const finalPrice = useMemo(() => {
    if (!discount) return price;
    return price - (price * discount) / 100;
  }, [price, discount]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({
      type: "cart/addToCart",
      payload: { ...product, quantity: 1, finalPrice },
    });
  };

  return (
    <Card
      className="rounded-xl flex flex-col bg-white transition-all duration-150 ease-in border border-transparent hover:border-lime-500  cursor-pointer shadow-md hover:shadow-xl shadow-neutral-100 "
      onClick={() => router.push(`${pathname}/${productId}`)}
    >
      <CardHeader className="w-full aspect-square relative bg-white rounded-xl">
        {popular && (
          <span className="absolute top-5 left-0 bg-lime-500 rounded-tr-xl p-2 pr-4 text-white uppercase text-sm font-semibold">
            Popolare
          </span>
        )}
        {!imageError ? (
          <Image
            src={image || "/placeholder.png"}
            alt={title || "product image"}
            width={500}
            height={500}
            className="object-cover w-full h-full rounded-xl"
            placeholder="blur"
            blurDataURL="/placeholder.png"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Immagine non disponibile</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="relative w-full mt-0">
        <h4 className="text-xl font-bold mb-4 line-clamp-2 leading-snug text-ellipsis">
          {title}
        </h4>
        <h3 className="text-xl font-semibold text-black relative">
          {currencyFormat(finalPrice)}
          <PayDiscountBadge discount={discount} />
        </h3>
        <span className="text-neutral-400  text-xs sm:text-sm font-normal mr-2">
          <span>{discount ? "Ultimo prezzo: " : ""}</span>
          <span className="line-through">
            {discount ? currencyFormat(price) : ""}
          </span>
        </span>
      </CardContent>
      <CardFooter>
        <Button
          icon={ShoppingBagIcon}
          iconPos={isMobile ? "center" : "left"}
          variant={"fill"}
          size={isMobile ? "icon" : "default"}
          className=" w-fit sm:w-full"
          onClick={handleAddToCart}
        >
          {!isMobile && "Aggiungi al carrello"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default React.memo(ProductCard);
