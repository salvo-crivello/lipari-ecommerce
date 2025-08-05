'use client';
import { HTMLAttributes, memo } from 'react';
import currencyFormat from '../utils/currencyFormat';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

/////////////////////////////////////////////

export const badgeVariants = cva('text-xs font-black leading-none', {
	variants: {
		variant: {
			primary: '',
			secondary: 'bg-transparent border',
		},
		size: {
			default: 'px-2 py-1.5',
			custom: '',
		},
		rounded: {
			default: 'rounded-md',
			full: 'rounded-full',
			custom: '',
		},
		palette: {
			blue: 'bg-sky-300 text-sky-800 border-sky-800',
			green: 'bg-green-300 text-green-800 border-green-800',
			custom: '',
		},
	},

	defaultVariants: {
		variant: 'primary',
		size: 'default',
		rounded: 'default',
		palette: 'blue',
	},
});

//////////////////////////////////////////////

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
	popular?: boolean | undefined;
	discount?: number | undefined;
}

///////////////////////////////////////////////

const PopularBadge = memo(({ popular, variant, size, rounded, palette }: BadgeProps) => {
	if (!popular) return null;
	return <span className={clsx(badgeVariants({ variant, size, rounded, palette }))}>Popular</span>;
});

/////////////////////////////////////////////

const DiscountBadge = memo(({ discount, variant, size, rounded, palette = 'green' }: BadgeProps) => {
	if (!discount) return null;
	return <span className={clsx(badgeVariants({ variant, size, rounded, palette }))}>-{discount}% Off</span>;
});

/////////////////////////////////////////////

const DiscountLabel = memo(({ discount, price }: { discount: number | undefined; price: number }) => {
	if (!discount) return null;
	return <span className="line-through opacity-50 text-[0.7em] ml-2">{currencyFormat(price)}</span>;
});

/////////////////////////////////////////////

PopularBadge.displayName = 'PopularBadge';
DiscountBadge.displayName = 'DiscountBadge';
DiscountLabel.displayName = 'DiscountLabel';

export { PopularBadge, DiscountBadge, DiscountLabel };
