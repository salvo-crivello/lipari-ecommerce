import { ShoppingCart, XCircle } from "lucide-react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IconButton } from "./ui/Button";

function CartHandler() {
  const { items: cart, isOpen: cartIsOpen } = useSelector(
    (state: RootState) => state.cartData
  );
  const dispatch = useDispatch();

  const cartStatus = useMemo(() => {
    return {
      length: cart.length,
      isEmpty: cart.length === 0,
    };
  }, [cart]);

  return (
    <IconButton
      icon={cartIsOpen ? XCircle : ShoppingCart}
      className="relative"
      onClick={() => dispatch({ type: "cart/toggleCart" })}
      hidden={cartIsOpen}
    >
      {!cartStatus.isEmpty && (
        <span className="absolute bottom-0 right-0 translate-x-1/2  bg-blue-500 text-white text-xs font-semibold rounded-full px-1 py-1">
          {cartStatus.length}
        </span>
      )}
    </IconButton>
  );
}

export default CartHandler;
