import { useEffect, useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { useUser } from '../../context/UserContext';
import TaskItem from './TaskItem';
import TaskDetailSideBar from './TaskDetailSideBar';

const TaskList = ({ setIsEditing }) => {
	const {
		getTasks,
		tasks,
		filteredTasks,
		filter,
		deletedTasks,
		deleteAllTasks,
		setFilter,
		selectedTask,
		setSelectedTask,
	} = useTaskContext();

	const { userData } = useUser();
	const [localTasks, setLocalTasks] = useState([]);
	const [showDeletePermBtn, setShowDeletePermBtn] = useState(false);

	useEffect(() => {
		getTasks(userData?.id);
	}, []);

	useEffect(() => {
		setLocalTasks(filteredTasks);
		if (filter === 'Deleted') {
			setLocalTasks(deletedTasks);
		} else {
			setLocalTasks(filteredTasks);
		}
	}, [filteredTasks, deletedTasks]);

	useEffect(() => {
		setLocalTasks(tasks);
	}, [tasks]);

	const handleTaskSelect = (task) => {
		setSelectedTask(task);
	};

	const handleTaskEdit = (task) => {
		setSelectedTask(task);
		setIsEditing(true);
	};

	return (
		<div className='flex gap-4'>
			<div className='flex-1 flex-col space-y-4'>
				<div className='flex items-center gap-4'>
					{filter && filter !== 'All tasks' && (
						<span className='text-gray-500 dark:text-gray-400'>
							Filtered by {filter}
						</span>
					)}
				</div>
				{localTasks.length === 0 ? (
					<p className='text-gray-500 dark:text-gray-400'>
						No tasks yet!
					</p>
				) : (
					localTasks.map((task) => (
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
		</div>
	);
};

export default TaskList;
