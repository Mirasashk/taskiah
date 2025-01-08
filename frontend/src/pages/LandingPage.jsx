import React, { useState } from 'react';
import landingProdGraphic from '../assets/images/6667368_3382856.svg';
import { Link } from 'react-router-dom';
import progressImage from '../assets/images/progress-tracking.png';
import quickActionsImage from '../assets/images/quick-actions.png';
import simpleInterfaceImage from '../assets/images/simple-ui.png';
import MobileDrawer from '../components/navigation/MobileDrawer';

const LandingPage = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	return (
		<div className='min-h-screen rounded-lg dark:bg-gray-900'>
			{/* Hero Section */}
			<div className='container mx-auto px-4 md:py-16'>
				<div className='flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12'>
					<div className='w-full md:w-1/2 text-center md:text-left'>
						<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6'>
							Organize Your Tasks with Ease
						</h1>
						<p className='text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto md:mx-0'>
							Simple, intuitive, and powerful task management to
							help you stay productive and focused.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
							<Link
								to='/signup'
								className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-center'
							>
								Get Started
							</Link>
							<a
								href='#learn-more'
								className='px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white text-center'
							>
								Learn More
							</a>
						</div>
					</div>
					<div className='w-full md:w-1/2 mt-8 md:mt-0'>
						<img
							src={landingProdGraphic}
							alt='Task Management Illustration'
							className='max-w-full h-auto mx-auto'
						/>
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div className='rounded-lg py-12 md:py-16'>
				<div className='container mx-auto px-4'>
					<h2 className='text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 dark:text-white'>
						Key Features
					</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8'>
						<div className='p-6 bg-gray-50 dark:bg-gray-700 rounded-lg transition-transform hover:scale-105'>
							<img
								src={simpleInterfaceImage}
								alt='Simple Interface'
								className='mb-4 h-32 md:h-48 w-auto mx-auto object-contain'
							/>
							<h3 className='text-lg md:text-xl font-semibold mb-2 dark:text-white text-center'>
								Simple Interface
							</h3>
							<p className='text-gray-600 dark:text-gray-300 text-center text-sm md:text-base'>
								Clean and intuitive design that helps you focus
								on what matters.
							</p>
						</div>
						<div className='p-6 bg-gray-50 dark:bg-gray-700 rounded-lg transition-transform hover:scale-105'>
							<img
								src={quickActionsImage}
								alt='Quick Actions'
								className='mb-4 h-32 md:h-48 w-auto mx-auto object-contain'
							/>
							<h3 className='text-lg md:text-xl font-semibold mb-2 dark:text-white text-center'>
								Quick Actions
							</h3>
							<p className='text-gray-600 dark:text-gray-300 text-center text-sm md:text-base'>
								Add, complete, and manage tasks with just a few
								clicks.
							</p>
						</div>
						<div className='p-6 bg-gray-50 dark:bg-gray-700 rounded-lg transition-transform hover:scale-105 sm:col-span-2 md:col-span-1'>
							<img
								src={progressImage}
								alt='Progress Tracking'
								className='mb-4 h-32 md:h-48 w-auto mx-auto object-contain'
							/>
							<h3 className='text-lg md:text-xl font-semibold mb-2 dark:text-white text-center'>
								Progress Tracking
							</h3>
							<p className='text-gray-600 dark:text-gray-300 text-center text-sm md:text-base'>
								Keep track of your completed tasks and stay
								motivated.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
