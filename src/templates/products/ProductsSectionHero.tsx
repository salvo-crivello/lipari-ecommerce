'use client';
import { Button } from '@/src/components/ui/Button';
import { useRouter } from 'next/navigation';

function ProductsSectionHero() {
	const router = useRouter();

	const handleCategoryClick = (cat: string) => {
		router.push(`/products?category=${cat}`);
	};

	return (
		<header className="px-5 lg:px-10 pt-40 max-w-7xl mx-auto">
			<h2 className="text-4xl font-bold leading-tight">
				Prodotti <span className="text-blue-500 uppercase">tech</span> della Community
			</h2>
			<div>
				<Button onClick={() => handleCategoryClick('all')}>All</Button>
				<Button onClick={() => handleCategoryClick('laptop')}>Laptop</Button>
				<Button onClick={() => handleCategoryClick('mobile')}>Mobile</Button>
				<Button onClick={() => handleCategoryClick('audio')}>Audio</Button>
			</div>
		</header>
	);
}

export default ProductsSectionHero;
