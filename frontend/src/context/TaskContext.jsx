import {
	createContext,
	useContext,
	useState,
	useEffect,
	useMemo,
	useCallback,
} from 'react';
import { db } from '../config/firebase';
import {
	doc,
	setDoc,
	addDoc,
	collection,
	query,
	where,
	or,
	and,
	onSnapshot,
	orderBy,
} from 'firebase/firestore';
import { taskService } from '../services/taskApi';
import { useUser } from './UserContext';
import { useListContext } from './ListContext';
import Task from '../models/TaskModel';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const { userData } = useUser();
	const { selectedList, lists } = useListContext();
	const [selectedTask, setSelectedTask] = useState(null);
	const [selectedFilter, setSelectedFilter] = useState('All tasks');

	// Firestore Listener for getting tasks by listId
	useEffect(() => {
		if (!userData || !lists || lists.length === 0) {
			setIsLoading(false);
			return;
		}
		if (userData && lists) {
			setIsLoading(true);
			const tasksQuery = query(
				collection(db, 'tasks'),
				and(
					or(
						where('ownerId', '==', userData?.id),
						where(
							'listId',
							'in',
							lists?.map((list) => list.id)
						)
					),
					where('status', '!=', 'deleted')
				),
				orderBy('createdAt', 'desc')
			);

			const unsub = onSnapshot(
				tasksQuery,
				(querySnapshot) => {
					try {
						const tasks = [];
						querySnapshot.forEach((doc) => {
							const data = doc.data();
							if (!data.ownerId) {
								console.warn(
									`Task ${doc.id} is missing ownerId`
								);
								return;
							}
							tasks.push({ id: doc.id, ...data });
						});
						setTasks(tasks);
						setIsLoading(false);
					} catch (error) {
						setError(error.message);
						setIsLoading(false);
					}
				},
				(error) => {
					setError(error.message);
					setIsLoading(false);
				}
			);
			return () => unsub(); // Cleanup on listId change or unmount
		}
	}, [userData?.id, lists]);

	const addTaskToFirestore = async (task) => {
		try {
			const notification = await addNotification(task);
			task.notifications = {
				[notification.type]: notification,
			};
			await Task.createTask(task);
		} catch (error) {
			setError(error.message);
		}
	};

	// const getTasksByListId = async (listId) => {
	// 	console.log('File TaskContext.jsx, Line 47, getTasksByListId', listId);
	// 	const tasks = await Task.getTasksByListId(listId);
	// 	console.log('File TaskContext.jsx, Line 51, getTasksByListId', tasks);
	// 	setTasks(tasks);
	// };

	// const refreshContext = useCallback(async () => {
	// 	console.log(
	// 		'File TaskContext.jsx, Line 34, refreshContext',
	// 		userData.id
	// 	);
	// 	try {
	// 		setIsLoading(true);
	// 		await refreshListContext();
	// 		await getTasks(userData.id);
	// 	} catch (err) {
	// 		setError(err.message);
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// }, [userData?.id]);

	// const addTask = useCallback(async (task) => {
	// 	console.log('File TaskContext.jsx, Line 47, addTask', task);
	// 	try {
	// 		setIsLoading(true);
	// 		const notification = await addNotification(task);
	// 		task.notifications = {
	// 			[notification.type]: notification,
	// 		};
	// 		await taskService.createTask(task);
	// 		setTasks((prevTasks) => [...prevTasks, task]);
	// 	} catch (error) {
	// 		setError(error.message);
	// 		console.error('Error adding task:', error);
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// });

	// const filterTasks = useCallback(
	// 	(tasks, filterName) => {
	// 		console.log(
	// 			'File TaskContext.jsx, Line 65, filterTasks',
	// 			tasks,
	// 			filterName
	// 		);
	// 		const today = new Date();
	// 		const getFilteredTasks = () => {
	// 			switch (filterName) {
	// 				case 'All tasks':
	// 					return tasks.filter(
	// 						(task) =>
	// 							task.status !== 'deleted' &&
	// 							task.status !== 'archived'
	// 					);
	// 				case 'Today':
	// 					return tasks.filter((task) => {
	// 						if (!task.dueDate || task.status === 'deleted')
	// 							return false;
	// 						const taskDate = new Date(task.dueDate);
	// 						return (
	// 							taskDate.toDateString() ===
	// 								today.toDateString() &&
	// 							(!selectedList ||
	// 								selectedList.tasks?.includes(task.id))
	// 						);
	// 					});
	// 				case 'Important':
	// 					return tasks.filter(
	// 						(task) =>
	// 							task.priority === 'high' &&
	// 							task.status !== 'deleted' &&
	// 							(!selectedList ||
	// 								selectedList.tasks?.includes(task.id))
	// 					);
	// 				case 'Deleted':
	// 					return deletedTasks.filter(
	// 						(task) =>
	// 							task.updatedAt >
	// 							new Date() - 1000 * 60 * 60 * 24 * 7
	// 					);
	// 				default:
	// 					console.log('filterName', filterName);
	// 					const list =
	// 						myLists.find((list) => list.name === filterName) ||
	// 						sharedLists.find(
	// 							(list) => list.name === filterName
	// 						);
	// 					const tag = tags.find((tag) => tag.name === filterName);

	// 					if (list) {
	// 						return tasks.filter(
	// 							(task) =>
	// 								list.tasks?.includes(task.id) &&
	// 								task.status !== 'deleted'
	// 						);
	// 					} else if (tag) {
	// 						return tasks.filter(
	// 							(task) =>
	// 								task.tagIds?.includes(tag.id) &&
	// 								task.status !== 'deleted' &&
	// 								(!selectedList ||
	// 									selectedList.tasks?.includes(task.id))
	// 						);
	// 					}
	// 					return tasks.filter(
	// 						(task) =>
	// 							task.status !== 'deleted' &&
	// 							(!selectedList ||
	// 								selectedList.tasks?.includes(task.id))
	// 					);
	// 			}
	// 		};

	// 		const filteredResults = getFilteredTasks();
	// 		const sortedFilteredTasks = filteredResults.sort(
	// 			(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	// 		);

	// 		setFilteredTasks(sortedFilteredTasks);
	// 		setFilter(filterName);
	// 	},
	// 	[myLists, sharedLists, tags, filter, deletedTasks, selectedList]
	// );

	const deleteTask = useCallback(async (task) => {
		try {
			await taskService.updateTask(task.id, { status: 'deleted' });
		} catch (error) {
			setError(error.message);
		}
	});

	const toggleTask = useCallback(async (taskId, taskData) => {
		try {
			setTasks((prev) =>
				prev.map((task) =>
					task.id === taskId ? { ...task, ...taskData } : task
				)
			);
			await taskService.updateTask(taskId, taskData);
		} catch (error) {
			setError(error.message);
		}
	});

	// const getTasks = useCallback(async (userId) => {
	// 	console.log('File TaskContext.jsx, Line 186, getTasks', userId);
	// 	try {
	// 		const response = await taskService.getTasks(userId);
	// 		const sevenDaysAgo = new Date();
	// 		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

	// 		const filteredTasks = response.data.filter(
	// 			(task) =>
	// 				(task.status !== 'completed' &&
	// 					task.status !== 'archived' &&
	// 					task.status !== 'deleted') ||
	// 				(task.status === 'completed' &&
	// 					new Date(task.updatedAt) > sevenDaysAgo)
	// 		);

	// 		setTasks(filteredTasks);
	// 		setDeletedTasks(
	// 			response.data.filter(
	// 				(task) =>
	// 					task.status === 'deleted' &&
	// 					new Date(task.updatedAt) > sevenDaysAgo
	// 			)
	// 		);
	// 	} catch (error) {
	// 		setError(error.message);
	// 	}
	// }, []);

	// const deleteAllTasks = useCallback(
	// 	async (userId) => {
	// 		try {
	// 			setIsLoading(true);
	// 			await taskService.deleteAllTasks(userId);
	// 			await getTasks(userId);
	// 		} catch (error) {
	// 			setError(error.message);
	// 		} finally {
	// 			setIsLoading(false);
	// 		}
	// 	},
	// 	[getTasks]
	// );

	const updateTask = useCallback(async (taskId, newTaskData) => {
		try {
			await taskService.updateTask(taskId, newTaskData);
		} catch (error) {
			setError(error.message);
		}
	});

	const value = {
		tasks,
		isLoading,
		error,
		selectedTask,
		setSelectedTask,
		selectedFilter,
		setSelectedFilter,
		addTaskToFirestore,
		deleteTask,
		toggleTask,
		updateTask,
	};

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
