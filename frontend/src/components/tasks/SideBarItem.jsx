import React from 'react';
import { FiTrash } from 'react-icons/fi';
import { Icons } from '../common/Icons';

const SideBarItem = ({ item, trash = false }) => {
	return (
		<div
			className='flex items-center justify-between px-3 py-2 rounded-lg 
		 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
		>
			<div className='flex items-center gap-2'>
				{item.color ? (
					<div
						className='w-3 h-3 rounded-full bg-gray-700 dark:bg-gray-200'
						style={{ backgroundColor: item.color }}
					></div>
				) : item.icon ? (
					<Icons icon={item.icon} />
				) : null}
				{item.name}
			</div>

			<div className='flex items-center justify-between pl-1 gap-4 '>
				<div>0</div>
				{trash && <FiTrash />}
			</div>
		</div>
	);
};

export default SideBarItem;