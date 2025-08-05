import { Minus, Plus, ShoppingBagIcon, Trash2 } from 'lucide-react';
import React, { memo, useMemo } from 'react';
import { Button, IconButton } from './ui/Button';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem, changeItemQuantity, removeFromCart } from '../store/sliceCart';

type ProductButtonProps = {
	handleAddToCart: (e: React.MouseEvent) => void;
	productId: number;
};

function ProductButton({ handleAddToCart, productId }: ProductButtonProps) {
	const cartItems = useSelector((state: RootState) => state.cartData.items);

	const itemInCart = useMemo(() => cartItems.find((item) => item.id === productId), [cartItems, productId]);

	const isInCart = useMemo(() => cartItems.some((item) => item.id === productId), [cartItems, productId]);

	return (
		<>
			{itemInCart ? (
				<ButtonQuantity itemInCart={itemInCart} />
			) : (
				<Button icon={ShoppingBagIcon} onClick={handleAddToCart}>
					Aggiungi al carrello
				</Button>
			)}
		</>
	);
}

export default memo(ProductButton);

const ButtonQuantity = ({ itemInCart }: { itemInCart: CartItem }) => {
	const { quantity } = itemInCart;
	const dispatch = useDispatch();

	const handleIncrement = (event: React.MouseEvent) => {
		event.stopPropagation();
		event.preventDefault();
		dispatch(changeItemQuantity({ id: itemInCart.id, quantity: itemInCart.quantity + 1 }));
	};

	const handleDecrement = (event: React.MouseEvent) => {
		event.stopPropagation();
		event.preventDefault();
		dispatch(changeItemQuantity({ id: itemInCart.id, quantity: itemInCart.quantity - 1 }));
	};

	const handleElimination = (event: React.MouseEvent) => {
		event.stopPropagation();
		event.preventDefault();
		dispatch(removeFromCart(itemInCart.id));
	};

	return (
		<div className="flex items-center gap-4 rounded-md border border-blue-200">
			{quantity > 1 && (
				<IconButton icon={Minus} onClick={handleDecrement} variant={'ghost'} className="!border-none !rounded-r-none" />
			)}
			{quantity === 1 && (
				<IconButton
					icon={Trash2}
					onClick={handleElimination}
					variant={'ghost'}
					className="!border-none !rounded-r-none"
				/>
			)}
			<span>{quantity}</span>
			<IconButton icon={Plus} onClick={handleIncrement} variant={'ghost'} className="!border-none !rounded-l-none" />
		</div>
	);
};
