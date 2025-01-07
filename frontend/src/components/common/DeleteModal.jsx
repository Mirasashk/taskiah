import Modal from '../common/Modal';
import { useTaskContext } from '../../context/TaskContext';
import { useListContext } from '../../context/ListContext';
import { listService } from '../../services/listApi';
import { useUser } from '../../context/UserContext';

const DeleteModal = ({ open, onClose, itemType, item, title, message }) => {
	const { updateTask, tasks } = useTaskContext();
	const { refreshContext } = useListContext();
	const { userData } = useUser();

	const filterTasksByItem = (item) => {
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
				const listTasks = filterTasksByItem(item);
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
				const tasksWithTag = filterTasksByItem(item);
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
			onClose();
		} catch (error) {
			console.error('Error deleting item:', error);
		}
	};

	return (
		<Modal
			isOpen={open}
			onClose={onClose}
			title={title}
		>
			<div className='p-4'>
				<p className='mb-4'>{message}</p>
				<div className='flex justify-end gap-2'>
					<button
						className='px-4 py-2 text-gray-600 hover:text-gray-800'
						onClick={onClose}
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
	);
};

export default DeleteModal;
