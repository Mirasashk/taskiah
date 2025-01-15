import { useEffect, useState, useRef } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { FaCircle } from 'react-icons/fa';
import { FiEdit, FiTrash, FiShare } from 'react-icons/fi';
import { useUser } from '../../context/UserContext';
import { FiFlag } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import { IoArchive } from 'react-icons/io5';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { IoMdShare } from 'react-icons/io';
import DeleteModal from '../common/DeleteModal';

export default function TaskItem({
	list,
	onListSelect,
	onListEdit,
	isEditable = true,
	listItemCount,
}) {
	const { toggleTask, deleteTask } = useTaskContext();
	const isMobile = useMediaQuery('(max-width: 768px)');
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleListDelete = (e, list) => {
		e.stopPropagation();
		deleteTask(list);
	};

	const handleListEdit = (e, list) => {
		e.stopPropagation();
		onListEdit(list);
	};

	const handleListShare = (e, list) => {
		e.stopPropagation();
		onListShare(list);
	};

	const handleActivate = (e, list) => {
		e.stopPropagation();
		toggleTask(list.id, { status: 'active' });
	};

	const handleArchive = (e, list) => {
		e.stopPropagation();
		toggleTask(list.id, { status: 'archived' });
	};

	return (
		<div className='flex w-full items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700'>
			<div className='flex w-full items-center gap-2 md:gap-6'>
				<div className='flex w-full justify-between items-center gap-2'>
					<div
						className='flex w-3/5 items-center gap-2'
						onClick={() => onListSelect(list)}
					>
						<div className='font-medium min-w-[100px] lg:min-w-[200px] text-gray-800 dark:text-gray-200'>
							{list.name}
						</div>
						<div className='flex justify-between lg:min-w-[300px] gap-4'>
							<div className='text-gray-500 dark:text-gray-200 text-sm lg:min-w-[140px] text-nowrap'>
								{isMobile ? 'Items: ' : 'Number of items: '}
								{listItemCount}
							</div>
							{!isMobile && isEditable && (
								<div className='flex text-gray-500 dark:text-gray-400 text-sm text-nowrap'>
									Shared with {list.sharedWith.length} users
								</div>
							)}
						</div>
					</div>

					{isEditable && (
						<div className='flex items-center gap-4'>
							<IoMdShare
								color='gray'
								onClick={(e) => handleListShare(e, list)}
							/>
							<button
								onClick={(e) => handleListEdit(e, list)}
								className='text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
							>
								<FiEdit />
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation();
									setShowDeleteModal(true);
								}}
								className='text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 '
							>
								<FiTrash />
							</button>
						</div>
					)}
				</div>
			</div>
			<DeleteModal
				open={showDeleteModal}
				itemType='list'
				item={list}
				title='Delete List'
				message={`Are you sure you want to delete this list? This action will also delete all ${listItemCount} tasks in this list.`}
				onClose={() => setShowDeleteModal(false)}
				onDelete={() => handleListDelete(list)}
			/>
		</div>
	);
}
