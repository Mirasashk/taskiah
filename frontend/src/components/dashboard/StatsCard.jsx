import React from 'react';

const StatsCard = ({ title, value, icon, trend, trendValue, onClick }) => {
	return (
		<div
			className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow cursor-pointer'
			onClick={onClick}
		>
			<div className='flex justify-between items-start'>
				<div>
					<p className='text-gray-500 dark:text-gray-400 text-sm font-medium'>
						{title}
					</p>
					<h3 className='text-2xl font-bold text-gray-900 dark:text-white mt-2'>
						{value}
					</h3>
				</div>
				<div className='p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
					{icon}
				</div>
			</div>
			{trend && (
				<div className='mt-4 flex items-center'>
					<span
						className={`text-sm font-medium ${
							trend === 'up' ? 'text-green-500' : 'text-red-500'
						}`}
					>
						{trend === 'up' ? '↑' : '↓'} {trendValue}%
					</span>
					<span className='text-gray-500 dark:text-gray-400 text-sm ml-2'>
						from last week
					</span>
				</div>
			)}
		</div>
	);
};

export default StatsCard;
