import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
	const location = useLocation();

	// Add paths that should not show the footer (protected routes)
	const protectedRoutes = [
		'/dashboard',
		'/profile',
		'/settings',
		'/tasks',
		'/notes',
	];
	const isProtectedRoute = protectedRoutes.some((route) =>
		location.pathname.startsWith(route)
	);

	return (
		<div className='bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen flex flex-col'>
			<div className='transition-all duration-200 ease-in flex-1'>
				<Header />
				<main className='lg:px-4 lg:py-8'>
					<Outlet />
				</main>
			</div>
			{!isProtectedRoute && <Footer />}
		</div>
	);
}
