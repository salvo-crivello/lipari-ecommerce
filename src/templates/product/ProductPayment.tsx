import { DiscountLabel } from '@/src/components/BadgesAndLabels';
import PayQtySelector from '@/src/components/PayQtySelector';
import ProductLikeIcon from '@/src/components/ProductLikeIcon';
import { Button } from '@/src/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '@/src/components/ui/card';
import { addToCart } from '@/src/store/sliceCart';
import { productType } from '@/src/store/sliceProducts';
import currencyFormat from '@/src/utils/currencyFormat';
import { ShoppingBagIcon } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

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
		<Card className="sticky top-40 w-[300px] rounded-lg flex flex-col items-start bg-neutral-50 mt-20 shadow-xl shadow-neutral-100 border border-neutral-100">
			<CardHeader className="relative gap-2 !items-start w-full flex !justify-between">
				<h3 className="max-sm:text-md sm:text-lg text-xl font-semibold text-black relative flex-col items-end flex">
					{currencyFormat(finalPrice)}
					<DiscountLabel discount={discount} price={price} />
				</h3>
				<PayQtySelector quantity={quantity} setQuantity={setQuantity} />
			</CardHeader>
			<CardContent className="relative gap-2 !items-start flex flex-col w-full">
				<p className="flex justify-between items-baseline w-full">
					<span className="text-neutral-500 font-normal">{`${quantity} prodott${quantity > 1 ? 'i' : 'o'}:`}</span>
					<span>{currencyFormat(finalPrice)}</span>
				</p>
				<p className="flex justify-between items-baseline w-full">
					<span className="text-neutral-500 font-normal">{`Spedizione:`}</span>
					<span>{currencyFormat(0)}</span>
				</p>
				<p className="flex w-full justify-between items-baseline text-md mt-2 pt-2 border-t border-neutral-200">
					<span className="font-normal">{'Totale: '}</span>
					<span>{currencyFormat(finalPrice * quantity)}</span>
				</p>
			</CardContent>

			<CardFooter className="flex-col gap-2.5 w-full">
				<Button icon={ShoppingBagIcon} className="w-full">
					Acquista
				</Button>
				<div className="flex items-center justify-between w-full gap-2">
					<Button variant={'ghost'} icon={ShoppingBagIcon} onClick={handleAddToCart}>
						Aggiungi al carrello
					</Button>
					<ProductLikeIcon product={product} />
				</div>
			</CardFooter>
		</Card>
	);
};

export default memo(ProductPayment);
