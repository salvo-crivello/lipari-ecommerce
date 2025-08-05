import clsx from 'clsx';
import { Heart, LoaderIcon } from 'lucide-react';
import React, { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productType } from '../store/sliceProducts';
import { addToWishList, removeFromWishList } from '../store/sliceWishList';
import { AppDispatch, RootState } from '../store/store';
import Icon from './ui/Icon';

function ProductLikeIcon({ product }: { product: productType }) {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, items } = useSelector((state: RootState) => state.wishListData);
	const isInList = useMemo(() => items.find((item) => item.id === product.id), [items, product.id]);

	const toggleLike = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (isInList) {
			dispatch(removeFromWishList(product.id));
		} else {
			dispatch(addToWishList(product));
		}
	};

	return (
		<Icon
			Icon={isLoading ? LoaderIcon : Heart}
			className={clsx('transition-colors duration-150 ease-in active:scale-95', {
				'text-pink-600 hover:text-pink-700 active:text-pink-600': isInList,
				'text-neutral-300 hover:text-neutral-400 active:text-neutral-300': !isInList,
			})}
			fill={clsx({ currentColor: isInList, none: !isInList })}
			onClick={toggleLike}
		/>
	);
}

export default memo(ProductLikeIcon);
