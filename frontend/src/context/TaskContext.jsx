import { createContext, useContext, useState, useEffect } from 'react';
import { taskService } from '../services/taskApi';
import { useUser } from './UserContext';
import { useListContext } from './ListContext';

const TaskContext = createContext(null); // Initialize with null

export function TaskProvider({ children }) {
	const [tasks, setTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [deletedTasks, setDeletedTasks] = useState([]);
	const [filter, setFilter] = useState('All tasks');
	const { userData } = useUser();
	const { myLists, sharedLists, tags } = useListContext();
	const [selectedTask, setSelectedTask] = useState(null);

	useEffect(() => {
		if (userData) {
			getTasks(userData.id);
		}
	}, [userData]);

	const addTask = async (task) => {
		try {
			await addNotification(task).then((notification) => {
				task.notifications = {
					[notification.type]: notification,
				};
				return task;
			});
			const response = await taskService.createTask(task);

			//Sort tasks by createdAt date
			const sortedTasks = [...tasks, response.data].sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			);
			setTasks(sortedTasks);
		} catch (error) {
			console.error('Error adding task:', error);
		}
	};

	const filterTasks = (tasks, filterName) => {
		let filteredTasks = [];
		const today = new Date();
		console.log('filterName', filterName);
		switch (filterName) {
			case 'All tasks':
				filteredTasks = tasks.filter(
					(task) => task.status !== 'deleted'
				);
				break;
			case 'Today':
				filteredTasks = tasks.filter((task) => {
					if (!task.dueDate || task.status === 'deleted')
						return false;
					const taskDate = new Date(task.dueDate);
					return taskDate.toDateString() === today.toDateString();
				});
				break;
			case 'Important':
				filteredTasks = tasks.filter(
					(task) =>
						task.priority === 'high' && task.status !== 'deleted'
				);
				break;
			case 'Deleted':
				filteredTasks = tasks.filter(
					(task) => task.status === 'deleted'
				);
				break;
			default:
				// Check if it's a list or tag
				const list =
					myLists.find((list) => list.name === filterName) ||
					sharedLists.find((list) => list.name === filterName);
				const tag = tags.find((tag) => tag.name === filterName);

				if (list) {
					console.log('list', list);
					filteredTasks = tasks.filter(
						(task) =>
							list.tasks?.includes(task.id) &&
							task.status !== 'deleted'
					);
				} else if (tag) {
					console.log('tag', tag);
					filteredTasks = tasks.filter(
						(task) =>
							task.tagIds?.includes(tag.id) &&
							task.status !== 'deleted'
					);
				} else {
					filteredTasks = tasks.filter(
						(task) => task.status !== 'deleted'
					);
				}
		}

		// Sort filteredTasks by createdAt date
		const sortedFilteredTasks = filteredTasks.sort(
			(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
		);
		setFilteredTasks(sortedFilteredTasks);
		setFilter(filterName);
	};

	const deleteTask = async (task) => {
		if (task.status === 'deleted') {
			await taskService.deleteTask(task.id);
			setDeletedTasks(deletedTasks.filter((t) => t.id !== task.id));
		} else {
			const deletedStatus = {
				status: 'deleted',
			};
			await taskService.updateTask(task.id, deletedStatus);
			await getTasks(task.ownerId);

			// setDeletedTasks([...deletedTasks, task]);
			// setTasks(tasks.filter((t) => t.id !== task.id));
		}
	};

	const toggleTask = async (taskId, taskData) => {
		setTasks(
			tasks.map((task) =>
				task.id === taskId ? { ...task, ...taskData } : task
			)
		);
		await taskService.updateTask(taskId, taskData);
	};

	const getTasks = async (userId) => {
		const response = await taskService.getTasks(userId);
		setTasks(response.data);
	};

	const deleteAllTasks = async (userId) => {
		await taskService.deleteAllTasks(userId);
		await getTasks(userId);
	};

	const updateTask = async (taskId, newTaskData) => {
		await taskService.updateTask(taskId, newTaskData);
		await getTasks(userData.id);
	};

	const value = {
		tasks,
		filter,
		filteredTasks,
		deletedTasks,
		selectedTask,
		setSelectedTask,
		setFilter,
		addTask,
		deleteTask,
		toggleTask,
		updateTask,
		getTasks,
		filterTasks,
		deleteAllTasks,
	};

	return (
		<TaskContext.Provider value={value}>{children}</TaskContext.Provider>
	);
}

export const useTaskContext = () => {
	const context = useContext(TaskContext);
	if (!context) {
		throw new Error('useTaskContext must be used within a TaskProvider');
	}
	return context;
};

const addNotification = async (task) => {
	const setNotificationType = (task) => {
		if (task.priority === 'high') {
			return 'important';
		} else if (task.dueDate) {
			return 'dueDate';
		} else {
			return 'reminder';
		}
	};

	const setMessage = (task) => {
		switch (type) {
			case 'important':
				return `${task.title} is a high priority task`;
			case 'dueDate':
				return `${task.title} is due on ${task.dueDate}`;
			case 'reminder':
				return `This is a reminder for ${task.title}`;
		}
	};

	const setNotifyOn = (task) => {
		// set notify date 1 day before due date
		if (task.dueDate) {
			const dueDate = new Date(task.dueDate);
			dueDate.setDate(dueDate.getDate() - 1);
			return dueDate.toISOString();
		} else {
			return null;
		}
	};

	const type = setNotificationType(task);
	const message = setMessage(task);
	const notifyOn = setNotifyOn(task);

	const notification = {
		message: message,
		type: type,
		notifyOn: notifyOn,
	};

	return notification;
};
