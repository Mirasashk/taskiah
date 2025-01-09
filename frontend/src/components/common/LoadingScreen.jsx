import React, { useEffect } from 'react';

export default function LoadingScreen({ error }) {
	useEffect(() => {
		// Store current scroll position
		const scrollPos = window.scrollY;

		// Restore scroll position when component unmounts
		return () => {
			window.scrollTo(0, scrollPos);
		};
	}, []);

	if (error) {
		return (
			<div className='absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 min-h-screen'>
				<div className='text-center p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg'>
					<div className='text-red-500 text-xl mb-2'>Error</div>
					<div className='text-gray-700 dark:text-gray-300'>
						{error}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 min-h-screen'>
			<div className='text-center'>
				<div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4'></div>
				<div className='text-gray-700 dark:text-gray-300'>
					Loading...
				</div>
			</div>
		</div>
	);
}
