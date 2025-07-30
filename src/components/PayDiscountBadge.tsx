import { BadgePercent } from "lucide-react";
import React, { memo } from "react";

function PayDiscountBadge({ discount }: { discount: number }) {
  if (!discount) return null;
  return (
    <span className="absolute top-0 right-0 text-lime-500 text-sm font-semibold flex items-center gap-1">
      <BadgePercent size={"1.5em"} />
      {` -${discount} %`}
    </span>
  );
}

export default memo(PayDiscountBadge);
