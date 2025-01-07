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
			path: '/settings/preferences',
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
			name: 'Shared With Me',
			path: '/settings/shared-with-me',
			icon: <HiShare />,
		},

		{
			name: 'Notifications',
			path: '/settings/notifications',
			icon: <HiBell />,
		},
	];

	return (
		<div className='w-64 h-full rounded-lg bg-white dark:bg-gray-800 pb-4'>
			<nav className='mt-5 px-2'>
				<div className='space-y-1'>
					{menuItems.map((item) => (
						<Link
							key={item.name}
							to={item.path}
							className={`${
								location.pathname === item.path
									? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-normal'
									: 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white font-normal'
							} group flex items-center px-2 py-2 text-base font-medium rounded-md`}
						>
							{item.icon}
							<span className='ml-3'>{item.name}</span>
						</Link>
					))}
				</div>
			</nav>
		</div>
	);
}
