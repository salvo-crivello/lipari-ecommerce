import { Heart, ShoppingBagIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useWindowSize } from '../hooks/useWindowSize';
import { addToCart } from '../store/sliceCart';
import { productType } from '../store/sliceProducts';
import ProductImage from '../templates/product/ProductImage';
import currencyFormat from '../utils/currencyFormat';
import { DiscountLabel } from './BadgesAndLabels';
import { Button, IconButton } from './ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import Cart from '../templates/Cart';
import Icon from './ui/Icon';
import ProductLikeIcon from './ProductLikeIcon';
import ProductButton from './ProductButton';

function ProductCard({ product }: { product: productType }) {
	const pathname = usePathname();
	const router = useRouter();
	const dispatch = useDispatch();
	const { isMobile } = useWindowSize();

	const { price, discount, title, id: productId } = product;

	const finalPrice = useMemo(() => {
		if (!discount) return price;
		return price - (price * discount) / 100;
	}, [price, discount]);

	const handleAddToCart = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		dispatch(addToCart({ ...product, quantity: 1, finalPrice }));
	};

	return (
		<Card
			className="relative rounded-xl flex flex-col  bg-white transition-all duration-150 ease-in border border-transparent hover:border-lime-500 cursor-pointer shadow-md hover:shadow-xl shadow-neutral-100 "
			onClick={() => router.push(`${pathname}/${productId}`)}
		>
			<CardHeader className="max-h-[300px] max-w-full relative !p-0">
				<ProductImage product={product} />
			</CardHeader>

			<CardContent className="relative gap-2 !items-start">
				<h4 className="max-sm:text-sm text-md font-bold line-clamp-2 leading-snug text-ellipsis text-neutral-600 text-balance">
					{title}
				</h4>
				<h3 className="max-sm:text-md sm:text-lg text-xl font-semibold text-black relative flex-col items-end flex">
					{currencyFormat(finalPrice)}
					<DiscountLabel discount={discount} price={price} />
				</h3>
			</CardContent>
			<CardFooter className="justify-between gap-2">
				{/* <Button icon={ShoppingBagIcon} onClick={handleAddToCart}>
					Aggiungi al carrello
				</Button> */}
				<ProductButton handleAddToCart={handleAddToCart} productId={productId} />
				<ProductLikeIcon product={product} />
			</CardFooter>
		</Card>
	);
}

export default React.memo(ProductCard);
