import React from 'react';
import { FiTrash } from 'react-icons/fi';
import { Icons } from '../common/Icons';
import Modal from '../common/Modal';
import { useState } from 'react';
import { listService } from '../../services/listApi';
import { useTaskContext } from '../../context/TaskContext';
import { useListContext } from '../../context/ListContext';
import { useUser } from '../../context/UserContext';

const SideBarItem = ({
	icon,
	label,
	count,
	selected,
	onClick,
	trash = false,
	color,
	labelStyle,
	itemType, // 'list', 'sharedList', or 'tag'
	item,
}) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { updateTask, tasks } = useTaskContext();
	const { refreshContext } = useListContext();
	const { userData } = useUser();

	const handleTrashClick = (e) => {
		e.stopPropagation();
		setShowDeleteModal(true);
	};

	const filterTasksByItem = (tasks, item) => {
		if (itemType === 'list') {
			return tasks.filter((task) => item.tasks?.includes(task.id));
		} else if (itemType === 'sharedList') {
			return tasks.filter((task) => item.tasks?.includes(task.id));
		} else if (itemType === 'tag') {
			return tasks.filter((task) => task.tagIds?.includes(item.id));
		} else {
			return tasks;
		}
	};

	const handleDelete = async () => {
		try {
			if (itemType === 'list') {
				// Delete list and archive its tasks
				const listTasks = filterTasksByItem(tasks, item);
				await Promise.all(
					listTasks.map((task) =>
						updateTask(task.id, { status: 'archived' })
					)
				);
				await listService.deleteList(item.id);
			} else if (itemType === 'sharedList') {
				// Remove user from shared list
				await listService.updateList(item.id, {
					...item,
					sharedWith: item.sharedWith.filter(
						(userId) => userId !== userData.id
					),
				});
			} else if (itemType === 'tag') {
				// Remove tag from all tasks that have it
				const tasksWithTag = filterTasksByItem(tasks, item);
				await Promise.all(
					tasksWithTag.map((task) =>
						updateTask(task.id, {
							...task,
							tagIds: task.tagIds.filter((id) => id !== item.id),
						})
					)
				);
				// Delete the tag
				await listService.deleteTag(item.id);
			}
			await refreshContext();
			setShowDeleteModal(false);
		} catch (error) {
			console.error('Error deleting item:', error);
		}
	};

	const getModalContent = () => {
		switch (itemType) {
			case 'list':
				return {
					title: 'Delete List',
					message: `Are you sure you want to delete this list? All tasks in this list will be archived. This action cannot be undone. There are ${
						filterTasksByItem(tasks, item).length
					} tasks in this list.`,
				};
			case 'sharedList':
				return {
					title: 'Remove Shared List',
					message: `This will remove your access to this shared list. You can always be re-invited later. There are ${
						filterTasksByItem(tasks, item).length
					} tasks in this list.`,
				};
			case 'tag':
				return {
					title: 'Delete Tag',
					message: `Are you sure you want to delete this tag? It will be removed from all tasks that use it. There are ${
						filterTasksByItem(tasks, item).length
					} tasks with this tag.`,
				};
			default:
				return { title: '', message: '' };
		}
	};

	const modalContent = getModalContent();

	return (
		<>
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

			<Modal
				isOpen={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				title={modalContent.title}
			>
				<div className='p-4'>
					<p className='mb-4'>{modalContent.message}</p>
					<div className='flex justify-end gap-2'>
						<button
							className='px-4 py-2 text-gray-600 hover:text-gray-800'
							onClick={() => setShowDeleteModal(false)}
						>
							Cancel
						</button>
						<button
							className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
							onClick={handleDelete}
						>
							Delete
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default SideBarItem;
