import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import useOutClickHandle from "../hooks/useOutClickHandle";
import { Button } from "./ui/Button";
import { InputGroup } from "./ui/InputGroup";

type QuantityInputProps = {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>> | undefined;
  maxQty?: number;
  handleAddToCart?: (newQty: number) => void;
};

function PayQtySelector({
  quantity,
  setQuantity,
  maxQty = 100,
  handleAddToCart,
}: QuantityInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const maxQuantity = useMemo(() => maxQty, [maxQty]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useOutClickHandle(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      <InputGroup.Label
        htmlFor="quantity"
        className="block text-sm font-medium text-neutral-700 mb-1"
      >
        Quantità
      </InputGroup.Label>
      <Button
        variant={"inputButton"}
        id="quantity"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md min-w-20"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <ChevronDown
          size={"1.5em"}
          className={clsx(
            "absolute right-1 text-neutral-500 transition-all duration-150 ease-in",
            {
              "rotate-180": isOpen,
            }
          )}
        />
        {quantity}
      </Button>

      {isOpen && (
        <ul
          role="listbox"
          tabIndex={-1}
          className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-neutral-300 rounded-md shadow-md"
        >
          {Array.from({ length: maxQuantity }, (_, i) => (
            <li
              key={i}
              role="option"
              aria-selected={quantity === i + 1}
              onClick={() => {
                if (setQuantity) {
                  setQuantity(i + 1);
                }
                if (handleAddToCart) {
                  handleAddToCart(i + 1);
                }
                setIsOpen(false);
              }}
              className={clsx("px-4 py-2 cursor-pointer hover:bg-blue-100", {
                "bg-blue-50 font-semibold": quantity === i + 1,
              })}
            >
              {i + 1}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PayQtySelector;
