import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MobileDrawer = ({ isOpen, onClose }) => {
	const { user } = useAuth();

	const publicRoutes = [
		{ name: 'Home', path: '/' },
		{ name: 'Features', path: '/features' },
		{ name: 'Pricing', path: '/pricing' },
	];

	const privateRoutes = [
		{ name: 'Home', path: '/' },
		{ name: 'Tasks', path: '/tasks' },
		{ name: 'Notes', path: '/notes' },
	];

	const navigationLinks = user ? privateRoutes : publicRoutes;

	return (
		<>
			{/* Overlay */}
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40 ${
					isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
				onClick={onClose}
			/>

			{/* Drawer */}
			<div
				className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<div className='p-4'>
					<button
						onClick={onClose}
						className='absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
					>
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>

					<nav className='mt-16'>
						<ul className='space-y-4'>
							{navigationLinks.map((link) => (
								<li key={link.path}>
									<Link
										to={link.path}
										onClick={onClose}
										className='block py-3 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
};

export default MobileDrawer;
