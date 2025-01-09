import {
	createContext,
	useContext,
	useState,
	useEffect,
	useMemo,
	useCallback,
} from 'react';
import { taskService } from '../services/taskApi';
import { useUser } from './UserContext';
import { useListContext } from './ListContext';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
	const [tasks, setTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [deletedTasks, setDeletedTasks] = useState([]);
	const [filter, setFilter] = useState('All tasks');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const { userData } = useUser();
	const { myLists, sharedLists, tags, selectedList, refreshListContext } =
		useListContext();
	const [selectedTask, setSelectedTask] = useState(null);

	useEffect(() => {
		if (userData) {
			refreshContext();
		}
	}, [userData]);

	const refreshContext = useCallback(async () => {
		console.log('Refreshing Task Context');
		try {
			setIsLoading(true);
			await refreshListContext();
			await getTasks(userData.id);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	}, [userData?.id]);

	const addTask = useCallback(async (task) => {
		try {
			setIsLoading(true);
			const notification = await addNotification(task);
			task.notifications = {
				[notification.type]: notification,
			};
			await taskService.createTask(task);
			await refreshContext();
		} catch (error) {
			setError(error.message);
			console.error('Error adding task:', error);
		} finally {
			setIsLoading(false);
		}
	});

	const filterTasks = useCallback(
		(tasks, filterName) => {
			const today = new Date();
			const getFilteredTasks = () => {
				switch (filterName) {
					case 'All tasks':
						return tasks.filter(
							(task) =>
								task.status !== 'deleted' &&
								task.status !== 'archived'
						);
					case 'Today':
						return tasks.filter((task) => {
							if (!task.dueDate || task.status === 'deleted')
								return false;
							const taskDate = new Date(task.dueDate);
							return (
								taskDate.toDateString() ===
									today.toDateString() &&
								(!selectedList ||
									selectedList.tasks?.includes(task.id))
							);
						});
					case 'Important':
						return tasks.filter(
							(task) =>
								task.priority === 'high' &&
								task.status !== 'deleted' &&
								(!selectedList ||
									selectedList.tasks?.includes(task.id))
						);
					case 'Deleted':
						return deletedTasks.filter(
							(task) =>
								task.updatedAt >
								new Date() - 1000 * 60 * 60 * 24 * 7
						);
					default:
						console.log('filterName', filterName);
						const list =
							myLists.find((list) => list.name === filterName) ||
							sharedLists.find(
								(list) => list.name === filterName
							);
						const tag = tags.find((tag) => tag.name === filterName);

						if (list) {
							return tasks.filter(
								(task) =>
									list.tasks?.includes(task.id) &&
									task.status !== 'deleted'
							);
						} else if (tag) {
							return tasks.filter(
								(task) =>
									task.tagIds?.includes(tag.id) &&
									task.status !== 'deleted' &&
									(!selectedList ||
										selectedList.tasks?.includes(task.id))
							);
						}
						return tasks.filter(
							(task) =>
								task.status !== 'deleted' &&
								(!selectedList ||
									selectedList.tasks?.includes(task.id))
						);
				}
			};

			const filteredResults = getFilteredTasks();
			const sortedFilteredTasks = filteredResults.sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			);

			setFilteredTasks(sortedFilteredTasks);
			setFilter(filterName);
		},
		[myLists, sharedLists, tags, filter, deletedTasks, selectedList]
	);

	const deleteTask = useCallback(
		async (task) => {
			try {
				setIsLoading(true);
				await taskService.updateTask(task.id, { status: 'deleted' });
				await refreshContext();
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		},
		[refreshContext]
	);

	const toggleTask = useCallback(
		async (taskId, taskData) => {
			try {
				setIsLoading(true);
				setTasks((prev) =>
					prev.map((task) =>
						task.id === taskId ? { ...task, ...taskData } : task
					)
				);
				await taskService.updateTask(taskId, taskData);
				await refreshContext();
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		},
		[refreshContext]
	);

	const getTasks = useCallback(async (userId) => {
		try {
			const response = await taskService.getTasks(userId);
			const sevenDaysAgo = new Date();
			sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

			const filteredTasks = response.data.filter(
				(task) =>
					(task.status !== 'completed' &&
						task.status !== 'archived' &&
						task.status !== 'deleted') ||
					(task.status === 'completed' &&
						new Date(task.updatedAt) > sevenDaysAgo)
			);

			setTasks(filteredTasks);
			setDeletedTasks(
				response.data.filter(
					(task) =>
						task.status === 'deleted' &&
						new Date(task.updatedAt) > sevenDaysAgo
				)
			);
		} catch (error) {
			setError(error.message);
		}
	}, []);

	const deleteAllTasks = useCallback(
		async (userId) => {
			try {
				setIsLoading(true);
				await taskService.deleteAllTasks(userId);
				await getTasks(userId);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		},
		[getTasks]
	);

	const updateTask = useCallback(
		async (taskId, newTaskData) => {
			try {
				setIsLoading(true);
				await taskService.updateTask(taskId, newTaskData);
				await getTasks(userData.id);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		},
		[getTasks, userData?.id]
	);

	const value = useMemo(
		() => ({
			tasks,
			filter,
			filteredTasks,
			deletedTasks,
			selectedTask,
			isLoading,
			error,
			setSelectedTask,
			setFilter,
			addTask,
			deleteTask,
			toggleTask,
			updateTask,
			getTasks,
			filterTasks,
			deleteAllTasks,
		}),
		[
			tasks,
			filter,
			filteredTasks,
			deletedTasks,
			selectedTask,
			isLoading,
			error,
			addTask,
			deleteTask,
			toggleTask,
			updateTask,
			getTasks,
			filterTasks,
			deleteAllTasks,
		]
	);

	if (error) {
		console.error('TaskContext Error:', error);
	}

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
