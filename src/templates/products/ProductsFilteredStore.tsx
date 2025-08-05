'use client';

import ProductCard from '@/src/components/ProductCard';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useSearchParams } from 'next/navigation';
import { useGetAllProductsQuery, useGetProductsByCategoryQuery } from '@/src/store/productsApiSlice';
import { setFilteredProducts } from '@/src/store/sliceFilteredProducts';

function ProductsFilteredStore() {
	const { products } = useSelector((state: RootState) => state.filteredProductsData);

	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const searchParams = useSearchParams();
	const category = searchParams.get('category');

	const { data: allData } = useGetAllProductsQuery();

	const { data: categoryData } = useGetProductsByCategoryQuery(category || 'all');

	useEffect(() => {
		if (category && category === 'all') {
			dispatch(setFilteredProducts(allData));
		}
		dispatch(setFilteredProducts(categoryData));
	}, [allData, category, categoryData, dispatch]);

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
			{/* {isLoading && <LoadingSpinner />}
			{products && !isLoading && <div ref={loadMoreRef} className="w-40 h-40 absolute bottom-0" />} */}
		</section>
	);
}

export default ProductsFilteredStore;
