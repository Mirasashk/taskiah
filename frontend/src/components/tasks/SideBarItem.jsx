import React from 'react';
import { FiTrash } from 'react-icons/fi';
import { Icons } from '../common/Icons';

const SideBarItem = ({
	icon,
	label,
	count,
	selected,
	onClick,
	trash = false,
	color,
	labelStyle,
}) => {
	const handleTrashClick = () => {
		console.log('trash clicked');
	};

	return (
		<div
			className={`flex items-center justify-between rounded-lg 
			text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
				selected ? 'bg-gray-200 dark:bg-gray-600' : ''
			}`}
		>
			<div
				className='flex-1 flex items-center gap-2 hover:cursor-pointer'
				onClick={onClick}
			>
				<div className='flex-1 flex px-3 py-2 items-center gap-2 '>
					{color ? (
						<div
							className='w-3 h-3 rounded-full bg-gray-700 dark:bg-gray-200'
							style={{ backgroundColor: color }}
						></div>
					) : icon ? (
						<Icons icon={icon} />
					) : null}
					<span className={labelStyle}>{label}</span>
				</div>
				<div className='flex-0 pr-4 '>{count}</div>
			</div>

			{trash && (
				<div className='flex items-center justify-between gap-4 pr-3 hover:cursor-pointer'>
					<FiTrash onClick={handleTrashClick} />
				</div>
			)}
		</div>
	);
};

export default SideBarItem;
