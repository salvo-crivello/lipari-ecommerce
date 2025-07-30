import { Heart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { CartItem, changeItemQuantity } from "../store/sliceCart";
import currencyFormat from "../utils/currencyFormat";
import PayLastPrice from "./PayLastPrice";
import PayQtySelector from "./PayQtySelector";
import { IconButton } from "./ui/Button";
import { Card, CardContent, CardFooter } from "./ui/card";

function CartProduct({ CartProduct }: { CartProduct: CartItem }) {
  const { id, title, image, price, quantity, discount, finalPrice } =
    CartProduct;

  const dispatch = useDispatch();

  const handleAddToCart = (newQty: number) => {
    dispatch(changeItemQuantity({ id, quantity: newQty }));
  };

  return (
    <Card className="relative w-full flex p-4 bg-white h-fit">
      <div className="h-40 aspect-square relative rounded-md shadow-md">
        <Image
          src={image || "/placeholder.png"}
          alt={title || "product image"}
          width={500}
          height={500}
          className="object-cover w-full h-full rounded-md"
          placeholder="blur"
          blurDataURL="/placeholder.png"
        />
      </div>
      <CardContent className="relative w-full text-black h-fit py-0">
        <h4 className="text-lg font-bold mb-4 leading-snug line-clamp-2 text-ellipsis">
          {title}
        </h4>
        <h3 className="text-xl font-semibold relative">
          {currencyFormat(finalPrice)}
          <span className="text-neutral-400 text-sm font-normal mr-2">
            {" /unità"}
          </span>
        </h3>
        {discount && <PayLastPrice priceFull={currencyFormat(price)} />}
      </CardContent>
      <CardFooter className="flex flex-col justify-between !p-0 !pl-10">
        <h5 className="ml-auto text-2xl font-semibold">
          {currencyFormat(finalPrice * quantity)}
        </h5>
        <div className="flex items-end gap-2">
          <PayQtySelector
            quantity={quantity}
            setQuantity={undefined}
            handleAddToCart={handleAddToCart}
          />
          <IconButton icon={null} rounded={"default"}>
            <Heart
              size={"1.2em"}
              className="text-neutral-600 group-hover:text-blue-600"
            />
          </IconButton>
          <IconButton rounded={"default"} icon={null}>
            <Trash2
              size={"1.2em"}
              className="shrink-0 text-neutral-600 group-hover:text-blue-600"
            />
          </IconButton>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CartProduct;
