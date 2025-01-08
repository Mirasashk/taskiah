import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import {
	HiPaintBrush,
	HiUser,
	HiLockClosed,
	HiBell,
	HiShare,
} from 'react-icons/hi2';
import { HiCollection } from 'react-icons/hi';

export default function SettingsSideBar() {
	const location = useLocation();

	const menuItems = [
		{
			name: 'Profile',
			path: '/settings/profile',
			icon: <HiUser />,
		},
		{
			name: 'Theme Preferences',
			path: '/settings/theme-preferences',
			icon: <HiPaintBrush />,
		},
		{
			name: 'Task Preferences',
			path: '/settings/task-preferences',
			icon: <HiCollection />,
		},
		{
			name: 'List Preferences',
			path: '/settings/list-preferences',
			icon: <HiCollection />,
		},
		{
			name: 'Security',
			path: '/settings/security',
			icon: <HiLockClosed />,
		},

		{
			name: 'Notifications',
			path: '/settings/notifications',
			icon: <HiBell />,
		},
	];

	return (
		<div className='md:w-64 md:h-full bg-white dark:bg-gray-800 md:pb-4'>
			<nav className='md:mt-5 md:px-2'>
				{/* Mobile View - Horizontal Scrolling */}
				<div className='flex md:hidden overflow-x-auto pb-3 px-4 gap-4 whitespace-nowrap scrollbar-hide'>
					{menuItems.map((item) => (
						<Link
							key={item.name}
							to={item.path}
							className={`${
								location.pathname === item.path
									? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
									: 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
							} flex flex-col items-center px-4 py-2 rounded-lg  text-center`}
						>
							<span className='text-xl mb-1'>{item.icon}</span>
							<span className='text-xs'>{item.name}</span>
						</Link>
					))}
				</div>

				{/* Desktop View - Vertical List */}
				<div className='hidden md:block space-y-2'>
					{menuItems.map((item) => (
						<Link
							key={item.name}
							to={item.path}
							className={`${
								location.pathname === item.path
									? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-normal'
									: 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white font-normal'
							} group flex items-center px-2 py-2 text-base rounded-md`}
						>
							{item.icon}
							<span className='ml-3 px-2'>{item.name}</span>
						</Link>
					))}
				</div>
			</nav>
		</div>
	);
}
