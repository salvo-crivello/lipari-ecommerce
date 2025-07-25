import React, { PropsWithChildren } from 'react';
import Header from './Header';
import Footer from './Footer';
import { AuthProvider } from '@/src/contexts/AuthProvider';

function Body({ children }: PropsWithChildren) {
	return (
		<body>
			<Header />
			<AuthProvider>
				<main>{children}</main>
			</AuthProvider>
			<Footer />
		</body>
	);
}

export default Body;
