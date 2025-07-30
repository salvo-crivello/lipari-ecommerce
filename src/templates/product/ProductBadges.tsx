import Icon from "@/src/components/ui/Icon";
import { productType } from "@/src/store/sliceProducts";
import { productsCategory } from "@/src/utils/data";
import { BadgeCheck, Cast, TruckIcon } from "lucide-react";
import { memo, useMemo } from "react";

const ProductBadges = ({ product }: { product: productType }) => {
  const { category } = product;

  const iconCategory = useMemo(() => {
    return productsCategory[category as keyof typeof productsCategory]?.icon;
  }, [category]);

  return (
    <div className="flex items-start justify-start w-full mb-5 text-2xs sm:text-sm text-neutral-400 font-normal flex-wrap gap-3">
      <p className="flex items-center gap-2 text-nowrap">
        <Icon
          Icon={iconCategory || Cast}
          size={"1.5em"}
          className="text-lime-500"
        />
        <span>{category}</span>
      </p>
      <p className="flex items-center gap-2 text-nowrap">
        <TruckIcon size={"1.5em"} className="text-lime-500" />
        <span>Spedizione Gratuita</span>
      </p>
      <p className="flex items-center gap-2 text-nowrap">
        <BadgeCheck size={"1.5em"} className="text-lime-500" />
        <span>Prodotto Garantito</span>
      </p>
    </div>
  );
};

export default memo(ProductBadges);
