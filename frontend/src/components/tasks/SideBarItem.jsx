import React from 'react';
import {
	FiTrash,
	FiInbox,
	FiCalendar,
	FiStar,
	FiTag,
	FiList,
	FiShare,
	FiTrash2,
} from 'react-icons/fi';
import { Icons } from '../common/Icons';
import Modal from '../common/Modal';
import { useState } from 'react';
import { listService } from '../../services/listApi';
import { useTaskContext } from '../../context/TaskContext';
import { useListContext } from '../../context/ListContext';
import { useUser } from '../../context/UserContext';
import { FaCircle } from 'react-icons/fa';

const SideBarItem = ({
	icon,
	label,
	count,
	selected,
	onClick,
	trash = false,
	color,
	labelStyle,
	itemType,
	item,
	isMobile = false,
}) => {
	const { tasks } = useTaskContext();
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const getIcon = () => {
		switch (icon) {
			case 'inbox':
				return <FiInbox />;
			case 'calendar':
				return <FiCalendar />;
			case 'star':
				return <FiStar />;
			case 'tag':
				return <FiTag />;
			case 'list':
				return <FiList />;
			case 'share':
				return <FiShare />;
			case 'trash':
				return <FiTrash2 />;
			default:
				return null;
		}
	};

	if (isMobile) {
		return (
			<button
				onClick={onClick}
				className={`flex flex-col items-center p-2 rounded-lg min-w-[80px] ${
					selected
						? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
						: 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
				}`}
			>
				<div className='flex items-center justify-center w-8 h-8 mb-1'>
					{color ? (
						<FaCircle
							size={12}
							color={color}
						/>
					) : (
						getIcon()
					)}
				</div>
				<span className='text-xs font-medium truncate max-w-[70px]'>
					{label}
				</span>
				{count > 0 && (
					<span className='text-xs text-gray-500 dark:text-gray-400'>
						{count}
					</span>
				)}
			</button>
		);
	}

	return (
		<>
			<button
				onClick={onClick}
				className={`flex items-center justify-between w-full p-2 rounded-lg ${
					selected
						? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
						: 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
				}`}
			>
				<div className='flex items-center gap-2'>
					{color ? (
						<FaCircle
							size={12}
							color={color}
						/>
					) : (
						getIcon()
					)}
					<span className={`font-medium ${labelStyle || ''}`}>
						{label}
					</span>
				</div>
				{count > 0 && (
					<span className='text-sm text-gray-500 dark:text-gray-400'>
						{count}
					</span>
				)}
			</button>
			{showDeleteModal && (
				<Modal
					isOpen={showDeleteModal}
					onClose={() => setShowDeleteModal(false)}
					title={getModalContent().title}
				>
					<div className='p-4'>
						<p className='text-gray-600 dark:text-gray-300 mb-4'>
							{getModalContent().message}
						</p>
						<div className='flex justify-end gap-4'>
							<button
								onClick={() => setShowDeleteModal(false)}
								className='px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
							>
								Cancel
							</button>
							<button
								onClick={handleDelete}
								className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
							>
								Delete
							</button>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

export default SideBarItem;
