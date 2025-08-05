'use client';
import { useSearchParams } from 'next/navigation';
import ProductsSectionHero from './products/ProductsSectionHero';
import ProductsSectionStore from './products/ProductsSectionStore';
import ProductsFilteredStore from './products/ProductsFilteredStore';

//

function Products() {
	const param = useSearchParams();
	const hasFilter = param.get('category') !== null;

	return (
		<article>
			<ProductsSectionHero />
			{hasFilter ? <ProductsFilteredStore /> : <ProductsSectionStore />}
		</article>
	);
}

export default Products;
