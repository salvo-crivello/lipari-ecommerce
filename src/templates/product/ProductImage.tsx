import { DiscountBadge, PopularBadge } from '@/src/components/BadgesAndLabels';
import ProductImg from '@/src/components/ProductImg';
import { productType } from '@/src/store/sliceProducts';
import { memo } from 'react';

const ProductImage = ({ product }: { product: productType }) => {
	const { image, title, popular, discount } = product;

	return (
		<div className="flex max-sm:aspect-square relative rounded-xl overflow-hidden shadow-xl shadow-neutral-100 min-w-[300px] min-h-[300px] items-center justify-center">
			<div className="flex flex-wrap absolute top-4 left-4 gap-2">
				<PopularBadge popular={popular} />
				<DiscountBadge discount={discount} />
			</div>
			<ProductImg image={image} title={title} />
		</div>
	);
};

export default memo(ProductImage);
