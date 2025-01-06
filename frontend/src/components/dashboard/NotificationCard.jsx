import React from 'react';
import { FiX, FiClock, FiCalendar, FiFlag } from 'react-icons/fi';

const NotificationCard = ({ notification, onDismiss }) => {
	const getIcon = (type) => {
		switch (type) {
			case 'dueDate':
				return <FiCalendar className='text-yellow-500' />;
			case 'important':
				return <FiFlag className='text-red-500' />;
			default:
				return <FiClock className='text-blue-500' />;
		}
	};

	return (
		<div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-start justify-between'>
			<div className='flex items-start space-x-4'>
				<div className='p-2 bg-gray-100 dark:bg-gray-700 rounded-lg'>
					{getIcon(notification.type)}
				</div>
				<div>
					<h4 className='text-sm font-medium text-gray-900 dark:text-white'>
						{notification.title}
					</h4>
					<p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
						{notification.message}
					</p>
					<span className='text-xs text-gray-400 dark:text-gray-500 mt-2 block'>
						{notification.time}
					</span>
				</div>
			</div>
			{onDismiss && (
				<button
					onClick={() => onDismiss(notification.id)}
					className='text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400'
				>
					<FiX />
				</button>
			)}
		</div>
	);
};

export default NotificationCard;
