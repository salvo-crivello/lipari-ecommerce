import PayDiscountBadge from "@/src/components/PayDiscountBadge";
import PayLastPrice from "@/src/components/PayLastPrice";
import PayQtySelector from "@/src/components/PayQtySelector";
import { Button } from "@/src/components/ui/Button";
import { Card, CardTitle } from "@/src/components/ui/card";
import { addToCart } from "@/src/store/sliceCart";
import { productType } from "@/src/store/sliceProducts";
import currencyFormat from "@/src/utils/currencyFormat";
import { memo, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

const ProductPayment = ({ product }: { product: productType }) => {
  const { price, discount } = product;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const finalPrice = useMemo(() => {
    if (!discount) return price;
    return price - (price * discount) / 100;
  }, [price, discount]);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const productToLoad = {
      ...product,
      quantity,
      finalPrice,
    };

    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart(productToLoad));
  };

  return (
    <Card className="sticky top-40 w-full sm:min-w-[300px] p-6  rounded-lg flex flex-col items-start bg-neutral-50 mt-20 shadow-xl shadow-neutral-100 border border-neutral-100">
      <CardTitle className="mb-10 relative w-full">
        <h3 className="text-2xl font-semibold">{currencyFormat(finalPrice)}</h3>
        {discount && (
          <>
            <PayLastPrice priceFull={currencyFormat(price)} />
            <PayDiscountBadge discount={discount} />
          </>
        )}
      </CardTitle>
      <PayQtySelector quantity={quantity} setQuantity={setQuantity} />
      <Button variant={"fill"} className="w-full mb-2.5">
        Compra adesso
      </Button>
      <Button
        variant={"with_border"}
        className="w-full"
        onClick={handleAddToCart}
      >
        Aggiungi al carrello
      </Button>
    </Card>
  );
};

export default memo(ProductPayment);
