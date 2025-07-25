import { navLinks } from '@/src/utils/data';
import Link from 'next/link';

type linkType = {
	id: string;
	path: string;
	name: string;
};

const Header = () => {
	return (
		<header className="bg-blue-950 fixed top-0 inset-x-0 px-5 lg:px-10 text-white py-5">
			<nav>
				<ul className="flex gap-5">
					{Object.entries(navLinks).map(([key, pageLink]: [string, linkType]) => (
						<li key={pageLink.id} className="inline-block mr-4">
							<Link
								href={pageLink.path}
								aria-label={`Navigate to ${pageLink.name}`}
								className="text-white hover:text-blue-300"
							>
								{pageLink.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
