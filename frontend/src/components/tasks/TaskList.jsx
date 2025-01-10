import { useState, useMemo, useCallback, useEffect } from 'react';
import { useTaskContext } from '../../context/TaskContext';

import TaskItem from './TaskItem';

import { GrSort } from 'react-icons/gr';
import Modal from '../common/Modal';
import SortListModalContent from './SortListModalContent';
import { useSortTasks } from '../../hooks/useSortTasks';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import { useFilterTasks } from '../../hooks/useFilterTasks';
const TaskList = ({ setIsEditing }) => {
	const { isLoading, error, tasks, setSelectedTask } = useTaskContext();
	const { selectedFilter, selectedList } = useTaskContext();
	const [sortKey, setSortKey] = useState('createdAt');
	const [sortDirection, setSortDirection] = useState(false);
	const [showSortModal, setShowSortModal] = useState(false);
	const filteredTasks = useFilterTasks(tasks, selectedFilter, selectedList);
	const sortedTasks = useSortTasks(filteredTasks, sortKey, sortDirection);

	useEffect(() => {
		console.log('Tasks updated:', {
			contextTasks: tasks?.length,
			filteredTasks: filteredTasks?.length,
			sortedTasks: sortedTasks?.length,
		});
	}, [tasks, filteredTasks, sortedTasks]);

	const options = useMemo(
		() => [
			{ label: 'Created date', value: 'createdAt' },
			{ label: 'Due date', value: 'dueDate' },
			{ label: 'Priority', value: 'priority' },
			{ label: 'Status', value: 'status' },
		],
		[]
	);

	const handleTaskSelect = (task) => {
		setSelectedTask(task);
	};

	const handleTaskEdit = (task) => {
		setSelectedTask(task);
		setIsEditing(true);
	};

	const handleTaskDelete = (task) => {
		setSelectedTask(task);
	};

	const toggleSortDirection = useCallback(() => {
		setSortDirection((prev) => !prev);
	}, []);

	const toggleSortModal = useCallback(() => {
		setShowSortModal((prev) => !prev);
	}, []);

	if (error) {
		return (
			<div className='text-red-500 dark:text-red-400 p-4'>
				Error loading tasks: {error}
			</div>
		);
	}

	return (
		<div className='flex gap-4'>
			<div className='flex-1 flex-col space-y-4'>
				<div
					className={`w-full ${
						sortedTasks?.length > 0
							? 'flex justify-end'
							: sortedTasks?.length > 0
							? 'flex justify-between'
							: 'flex justify-start'
					} items-center gap-4 mr-2`}
				>
					{/* <span className='text-gray-500 dark:text-gray-400 text-sm'>
						{filter != 'All tasks' && `Filtered by ${filter}`}
					</span> */}

					{sortedTasks?.length > 0 && (
						<div className='flex items-center justify-center gap-4'>
							<label className='text-md text-gray-500 dark:text-gray-400'>
								<div
									className='flex items-center gap-1 text-sm cursor-pointer'
									onClick={toggleSortDirection}
								>
									{
										options.find(
											(option) => option.value === sortKey
										)?.label
									}
									{sortDirection ? (
										<BsArrowUp className='text-sm text-white' />
									) : (
										<BsArrowDown className='text-sm text-white' />
									)}
								</div>
							</label>
							<button
								className='text-gray-500 dark:text-gray-400'
								onClick={toggleSortModal}
							>
								<GrSort className='text-xl text-white' />
							</button>
						</div>
					)}
				</div>
				{isLoading ? (
					<div className='flex items-center justify-center p-4'>
						<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white'></div>
					</div>
				) : sortedTasks?.length === 0 ? (
					<p className='text-gray-500 dark:text-gray-400'>
						No tasks yet!
					</p>
				) : (
					sortedTasks?.map((task) => (
						<TaskItem
							key={task.id}
							task={task}
							onTaskSelect={handleTaskSelect}
							onTaskEdit={handleTaskEdit}
							onTaskDelete={handleTaskDelete}
						/>
					))
				)}
			</div>
			<Modal
				isOpen={showSortModal}
				onClose={toggleSortModal}
				title='Sort Tasks'
				className='w-fit'
			>
				<SortListModalContent
					tasks={sortedTasks}
					sortKey={sortKey}
					options={options}
					setSortKey={setSortKey}
					sortDirection={sortDirection}
					setSortDirection={setSortDirection}
				/>
			</Modal>
		</div>
	);
};

export default TaskList;
