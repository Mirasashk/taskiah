import { useEffect, useState, useRef } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { FaCircle } from 'react-icons/fa';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useUser } from '../../context/UserContext';
import { FiFlag } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import { IoArchive } from 'react-icons/io5';

export default function TaskItem({
	task,
	onTaskSelect,
	onTaskEdit,
	showDelete = true,
}) {
	const { toggleTask, deleteTask } = useTaskContext();
	const { userData } = useUser();

	const handleDelete = (e, task) => {
		e.stopPropagation();
		deleteTask(task);
	};

	const handleEdit = (e, task) => {
		e.stopPropagation();
		onTaskEdit(task);
	};

	const handleActivate = (e, task) => {
		e.stopPropagation();
		toggleTask(task.id, { status: 'active' });
	};

	const handleArchive = (e, task) => {
		e.stopPropagation();
		toggleTask(task.id, { status: 'archived' });
	};

	if (!task) return null;

	return (
		<div
			className='flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700'
			onClick={() => onTaskSelect(task)}
		>
			<div className='flex items-center gap-2 md:gap-6'>
				<div className='flex items-center gap-2'>
					{showDelete && (
						<input
							type='checkbox'
							checked={task.completed}
							onChange={(e) => {
								e.stopPropagation();
								toggleTask(task.id, {
									status:
										task.status == 'active'
											? 'completed'
											: 'active',
								});
							}}
							className='w-4 h-4'
						/>
					)}
					<span
						className={`${
							task.status == 'completed'
								? 'line-through text-gray-500 dark:text-gray-400'
								: 'text-gray-900 dark:text-white'
						}`}
					>
						<div className='flex flex-col items-center  md:pt-0 md:flex-row md:items-center md:gap-8'>
							<div className='font-medium'>
								{task.title.substring(0, 23) +
									(task.title.length > 23 ? '...' : '')}
							</div>
							<div className='flex flex-wrap gap-2 md:gap-4 text-xs md:mt-0'>
								{task.priority == 'high' && (
									<div className='flex items-center gap-2'>
										<div className='flex gap-0'>
											<FiFlag className='text-red-500' />
											<label className='text-xs text-gray-500 dark:text-gray-400'>
												Priority:
											</label>
										</div>
										<span className='text-xs text-gray-500 dark:text-gray-400'>
											{task.priority}
										</span>
									</div>
								)}
								{task.dueDate && (
									<div className='flex items-center gap-2'>
										<label className='text-xs text-gray-500 dark:text-gray-400'>
											Due:
										</label>
										<span className='text-xs text-gray-500 dark:text-gray-400'>
											{task.dueDate}
										</span>
									</div>
								)}
							</div>
						</div>
					</span>
				</div>
			</div>
			<div className='flex items-center gap-4'>
				{showDelete && (
					<>
						<button
							onClick={(e) => handleEdit(e, task)}
							className='text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
						>
							<FiEdit />
						</button>

						<button
							onClick={(e) => handleDelete(e, task)}
							className='text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
						>
							<FiTrash />
						</button>
					</>
				)}
				{!showDelete && (
					<div className='flex items-center gap-4 md:gap-8'>
						<button
							onClick={(e) => handleActivate(e, task)}
							className='text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
						>
							<div className='flex items-center gap-2'>
								Activate <FaPlus />
							</div>
						</button>
						<button
							onClick={(e) => handleArchive(e, task)}
							className='text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
						>
							<div className='flex items-center gap-2'>
								Archive
								<IoArchive />
							</div>
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
