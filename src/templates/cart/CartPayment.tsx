import { Button } from '@/src/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '@/src/components/ui/card';
import { PromoForm } from '@/src/forms/PromoForm';
import { CartItem } from '@/src/store/sliceCart';
import currencyFormat from '@/src/utils/currencyFormat';
import clsx from 'clsx';
import { memo, useMemo, useState } from 'react';

export interface promoCodeType {
	id: string;
	valid: boolean;
	type: 'percentage' | 'fixed';
	value: number;
}

const CartPayment = ({ items, totalCost }: { items: CartItem[]; totalCost: number }) => {
	const [promoCode, setPromoCode] = useState<promoCodeType | null>(null);

	const cartNr = useMemo(() => items.reduce((acc, item) => acc + item.quantity, 0), [items]);

	const promoDiscount = useMemo(() => {
		if (!promoCode || !promoCode.valid) return 0;
		if (promoCode.type === 'percentage') {
			return (totalCost * promoCode.value) / 100;
		}
		return promoCode.value;
	}, [promoCode, totalCost]);

	return (
		<Card className="w-full sm:min-w-[300px] sm:max-w-[300px] rounded-lg flex flex-col items-start bg-white shadow-xl shadow-neutral-100 border border-neutral-100 h-fit">
			<CardHeader className="w-full">
				<PromoForm promoCode={promoCode} setPromoCode={setPromoCode} />
			</CardHeader>
			<CardContent className="w-full text-sm font-medium flex flex-col gap-2">
				<p className="flex justify-between items-baseline w-full">
					<span className="text-neutral-500 font-normal">{`${cartNr} prodott${cartNr > 1 ? 'i' : 'o'}:`}</span>
					<span>{currencyFormat(totalCost)}</span>
				</p>
				<p className="flex justify-between items-baseline w-full">
					<span className="text-neutral-500 font-normal">{`Spedizione:`}</span>
					<span>{currencyFormat(0)}</span>
				</p>
				<p className="flex justify-between items-baseline w-full">
					<span className="text-neutral-500 font-normal">{`Sconto:`}</span>
					<span className={clsx({ 'text-lime-600': promoCode && promoCode.valid })}>
						{promoCode && promoCode.valid ? `-${currencyFormat(promoDiscount)}` : `${currencyFormat(0)}`}
					</span>
				</p>
				<p className="flex w-full justify-between items-baseline text-md mt-2 pt-2 border-t border-neutral-200">
					<span className="font-normal">{'Totale: '}</span>
					<span>{currencyFormat(totalCost - promoDiscount)}</span>
				</p>
			</CardContent>
			<CardFooter className="w-full">
				<Button className="w-full">Vai al pagamento</Button>
			</CardFooter>
		</Card>
	);
};

export default memo(CartPayment);
