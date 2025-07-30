import React, { memo } from "react";

type PayLastPriceProps = {
  label?: string;
  priceFull: string;
};

function PayLastPrice({
  label = "Ultimo prezzo: ",
  priceFull,
}: PayLastPriceProps) {
  return (
    <span className="text-neutral-400 text-sm font-normal mr-2">
      <span>{label}</span>
      <span className="line-through">{priceFull}</span>
    </span>
  );
}

export default memo(PayLastPrice);
