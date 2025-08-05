'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/Button';
import SectionHero from './homepage/SectionHero';

const Home = () => {
	const router = useRouter();
	const handleCategoryClick = (cat: string) => {
		router.push(`/products?category=${cat}`);
	};

	return (
		<article>
			<SectionHero />
			<section className="container mx-auto px-4">
				<h2 className="text-2xl font-bold mb-4">Le nostre Categorie</h2>
				<div>
					<Button onClick={() => handleCategoryClick('all')}>All</Button>
					<Button onClick={() => handleCategoryClick('laptop')}>Laptop</Button>
					<Button onClick={() => handleCategoryClick('mobile')}>Mobile</Button>
					<Button onClick={() => handleCategoryClick('audio')}>Audio</Button>
				</div>
			</section>
		</article>
	);
};

export default Home;
