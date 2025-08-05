import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCartFromLocalStorage } from '../store/sliceCart';
import { RootState } from '../store/store';

function CartFromLocalStorage() {
	const dispatch = useDispatch();
	const cartItems = useSelector((state: RootState) => state.cartData.items);

	useLayoutEffect(() => {
		if (typeof window === 'undefined') return;
		const stored = localStorage.getItem('cart');
		const storedParsed = stored ? JSON.parse(stored) : null;

		if (storedParsed && storedParsed.length > 0) {
			console.log('Loading cart from localStorage:', storedParsed);
			dispatch(loadCartFromLocalStorage(storedParsed));
		}
	}, [dispatch]);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		localStorage.setItem('cart', JSON.stringify(cartItems));
	}, [cartItems]);

	return null;
}

export default CartFromLocalStorage;
