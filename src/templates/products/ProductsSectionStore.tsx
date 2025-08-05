'use client';

import ProductCard from '@/src/components/ProductCard';
import { useFetchProductsQuery } from '@/src/store/productsApiSlice';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextPage, setProducts } from '../../store/sliceProducts';
import { RootState } from '../../store/store';
import LoadingSpinner from '@/src/components/LoadingSpinner';

function ProductsSectionStore() {
	const loadMoreRef = useRef<HTMLDivElement>(null);
	const { products, pagination } = useSelector((state: RootState) => state.productsData);
	const dispatch = useDispatch();

	const shouldFetch = !products[pagination];
	const { isLoading, isSuccess, currentData } = useFetchProductsQuery(pagination, { skip: !shouldFetch });

	useEffect(() => {
		if (isSuccess && currentData) {
			dispatch(setProducts(currentData));
		}
	}, [currentData, dispatch, isSuccess]);

	useEffect(() => {
		const currentRef = loadMoreRef.current;
		if (!currentRef) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];

				if (entry.isIntersecting && !isLoading) {
					dispatch(nextPage());
					console.log(`Loading more products`);
				}
			},
			{
				root: null,
				rootMargin: '40px',
				threshold: 0.1,
			}
		);

		observer.observe(currentRef);

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [dispatch, isLoading]);

	return (
		<section className="px-2 sm:px-5 lg:px-10 py-20 min-h-screen relative bg-neutral-100">
			<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 sm:gap-4 w-full  max-w-7xl mx-auto ">
				{products &&
					Object.values(products)
						.flat()
						.map((product, i) => {
							if (!product) return null;

							return (
								<li key={product.id} className="flex">
									<ProductCard product={product} />
								</li>
							);
						})}
			</ul>
			{isLoading && <LoadingSpinner />}
			{products && !isLoading && <div ref={loadMoreRef} className="w-40 h-40 absolute bottom-0" />}
		</section>
	);
}

export default ProductsSectionStore;
