import React, { memo } from "react";
import { CartItem } from "@/src/store/sliceCart";
import CartProduct from "@/src/components/CartProduct";

function CartList({ items }: { items: CartItem[] }) {
  return (
    <ul className="flex flex-col w-full h-full overflow-y-auto gap-4 pr-2">
      {items.map((item) => (
        <li key={`${item.id}-${item.title}`}>
          <CartProduct CartProduct={item} />
        </li>
      ))}
    </ul>
  );
}

export default memo(CartList);
