import { useEffect, useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { useUser } from '../../context/UserContext';
import TaskItem from './TaskItem';
import TaskDetailSideBar from './TaskDetailSideBar';
import { GrSort } from 'react-icons/gr';
import Modal from '../common/Modal';
import SortListModalContent from './SortListModalContent';
import { useSortTasks } from '../../hooks/useSortTasks';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
const TaskList = ({ setIsEditing }) => {
	const {
		getTasks,
		tasks,
		filteredTasks,
		filter,
		deletedTasks,
		setSelectedTask,
	} = useTaskContext();

	const [localTasks, setLocalTasks] = useState([]);
	const [sortKey, setSortKey] = useState('createdAt');
	const [sortDirection, setSortDirection] = useState(true);
	const [showSortModal, setShowSortModal] = useState(false);

	useEffect(() => {
		if (filter === 'Deleted') {
			setLocalTasks(deletedTasks);
		} else {
			setLocalTasks(filteredTasks);
		}
	}, [filteredTasks, deletedTasks, filter]);

	const options = [
		{ label: 'Created date', value: 'createdAt' },
		{ label: 'Due date', value: 'dueDate' },
		{ label: 'Priority', value: 'priority' },
		{ label: 'Status', value: 'status' },
	];

	useEffect(() => {
		setLocalTasks(tasks);
	}, [tasks]);

	const sortedTasks = useSortTasks(localTasks, sortKey, sortDirection);

	const handleTaskSelect = (task) => {
		setSelectedTask(task);
	};

	const handleTaskEdit = (task) => {
		setSelectedTask(task);
		setIsEditing(true);
	};

	const displayTasks = sortedTasks || [];

	return (
		<div className='flex gap-4'>
			<div className='flex-1 flex-col space-y-4'>
				<div
					className={`w-full ${
						displayTasks.length > 0 && filter == 'All tasks'
							? 'flex justify-end'
							: displayTasks.length > 0 && filter != 'All tasks'
							? 'flex justify-between'
							: 'flex justify-start'
					} items-center gap-4 mr-2`}
				>
					<span className='text-gray-500 dark:text-gray-400 text-sm'>
						{filter != 'All tasks' && `Filtered by ${filter}`}
					</span>

					{displayTasks.length > 0 && (
						<div className='flex items-center justify-center gap-4'>
							<label className='text-md text-gray-500 dark:text-gray-400'>
								<div
									className='flex items-center gap-1 text-sm'
									onClick={() =>
										setSortDirection(!sortDirection)
									}
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
								onClick={() => setShowSortModal(true)}
							>
								<GrSort className='text-xl text-white' />
							</button>
						</div>
					)}
				</div>
				{displayTasks.length === 0 ? (
					<p className='text-gray-500 dark:text-gray-400'>
						No tasks yet!
					</p>
				) : (
					displayTasks.map((task) => (
						<TaskItem
							key={task.id}
							task={task}
							onTaskSelect={handleTaskSelect}
							onTaskEdit={handleTaskEdit}
							showDelete={filter === 'Deleted' ? false : true}
						/>
					))
				)}
			</div>
			<Modal
				isOpen={showSortModal}
				onClose={() => setShowSortModal(false)}
				title='Sort Tasks'
				className='w-fit'
			>
				<SortListModalContent
					tasks={localTasks}
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
