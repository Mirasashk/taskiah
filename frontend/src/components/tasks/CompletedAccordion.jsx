import React, { useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

const CompletedAccordion = ({ tasks, recentlyCompleted }) => {
	const [isOpen, setIsOpen] = useState(false);
	const { setSelectedTask, setIsEditing, toggleTask } = useTaskContext();

	const completedTasks =
		tasks?.filter((task) => task.status === 'completed') || [];

	const handleTaskSelect = (task) => {
		setSelectedTask(task);
	};

	const handleTaskEdit = (task) => {
		setSelectedTask(task);
		setIsEditing(true);
	};

	const handleClearCompletedTasks = () => {
		completedTasks.forEach((task) => {
			toggleTask(task.id, { status: 'archived' });
		});
	};

	return (
		<div className='mt-4 pb-8'>
			<div className='flex items-center justify-between w-full p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg'>
				<div className='flex w-full items-center justify-between gap-2'>
					<div
						className='flex flex-grow items-center gap-2'
						onClick={() => setIsOpen(!isOpen)}
					>
						{isOpen ? <FiChevronDown /> : <FiChevronRight />}
						<div className='flex-1'>
							Completed ({completedTasks.length})
						</div>
					</div>
					<button
						className='text-base text-gray-500 dark:text-gray-400 
					hover:text-gray-700 dark:hover:text-gray-200'
						onClick={handleClearCompletedTasks}
					>
						Clear All
					</button>
				</div>
			</div>
			{isOpen && completedTasks.length > 0 && (
				<div className='mt-2 space-y-2'>
					{completedTasks.map((task) => (
						<div
							key={task.id}
							className={`transform transition-all duration-500 ${
								recentlyCompleted?.has(task.id)
									? 'animate-fade-in-down'
									: ''
							}`}
						>
							<TaskItem
								key={task.id}
								task={task}
								onTaskSelect={handleTaskSelect}
								onTaskEdit={handleTaskEdit}
								showDelete={false}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default CompletedAccordion;
