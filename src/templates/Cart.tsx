import clsx from 'clsx';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CartHero from './cart/CartHero';
import CartList from './cart/CartList';
import CartPayment from './cart/CartPayment';

function Cart() {
	const { items, isOpen: cartIsOpen, totalCost } = useSelector((state: RootState) => state.cartData);

	useEffect(() => {
		if (cartIsOpen) {
			document.body.style.overflow = 'hidden';
			console.log('Cart is open', document.body.style.overflow);
		} else {
			document.body.style.overflow = '';
			console.log('Cart is closed', document.body.style.overflow);
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [cartIsOpen]);

	return (
		<>
			<motion.div
				className={clsx(
					'fixed inset-0 transition-all duration-500 ease-out h-screen bg-neutral-100 flex flex-col z-[9001]'
				)}
				initial={{ y: cartIsOpen ? '0%' : '-100%' }}
				animate={cartIsOpen ? { y: cartIsOpen ? '0%' : '-100%' } : undefined}
				transition={{
					ease: [0.54, 0.01, 0, 1],
					duration: 0.8,
					delay: cartIsOpen ? 0.2 : 0,
				}}
			>
				<CartHero />
				<section className="flex flex-row gap-5 px-5 lg:px-10 max-w-7xl mx-auto overflow-y-auto">
					<CartList items={items} />
					<CartPayment items={items} totalCost={totalCost} />
				</section>
			</motion.div>

			<motion.div
				className={clsx('w-full fixed inset-0 h-screen z-[9000]', "bg-[url('/hero.webp')] bg-cover bg-top")}
				initial={{ y: cartIsOpen ? '0%' : '-100%' }}
				animate={cartIsOpen ? { y: cartIsOpen ? '0%' : '-100%' } : undefined}
				transition={{
					ease: [0.54, 0.01, 0, 1],
					duration: 0.8,
					delay: cartIsOpen ? 0 : 0.2,
				}}
			/>
		</>
	);
}

export default Cart;
