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

	const [selectedFilter, setSelectedFilter] = useState(() => {
		const savedFilter = localStorage.getItem('selectedFilter');
		return savedFilter || 'All Lists';
	});

	useEffect(() => {
		if (selectedFilter) {
			localStorage.setItem('selectedFilter', selectedFilter);
		}
	}, [selectedFilter]);

	// Firestore Listener for getting tasks by listId
	useEffect(() => {
		// Reset tasks if no user data
		if (!userData?.id) {
			setTasks([]);
			setIsLoading(false);
			return;
		}

		// Wait for lists to be loaded
		if (!lists) {
			setIsLoading(true);
			return;
		}

		const listsIds = lists.map((list) => list.id);

		// If there are no lists, set empty tasks and return
		if (listsIds.length === 0) {
			setTasks([]);
			setIsLoading(false);
			return;
		}

		try {
			setIsLoading(true);
			const validListIds = lists
				.filter(
					(list) =>
						list &&
						list.id &&
						(list.ownerId === userData.id ||
							(list.sharedWith &&
								list.sharedWith.includes(userData.id)))
				)
				.map((list) => list.id);

			// If there are no valid lists, return empty tasks
			if (validListIds.length === 0) {
				setTasks([]);
				setIsLoading(false);
				return;
			}

			const conditions = [
				where('status', '!=', 'deleted'),
				where('listId', 'in', validListIds),
			];

			const tasksQuery = query(
				collection(db, 'tasks'),
				and(...conditions),
				orderBy('createdAt', 'desc')
			);

			const unsub = onSnapshot(
				tasksQuery,
				(querySnapshot) => {
					try {
						const tasks = [];
						querySnapshot.forEach((doc) => {
							const data = doc.data();
							// Validate task data before adding
							if (!data.ownerId || !data.listId) {
								console.warn(
									`Task ${doc.id} is missing required fields`
								);
								return;
							}
							tasks.push({
								id: doc.id,
								...data,
								// Ensure these fields are never null
								status: data.status || 'active',
								createdAt:
									data.createdAt || new Date().toISOString(),
							});
						});
						setTasks(tasks);
						setIsLoading(false);
					} catch (error) {
						console.error('Error processing tasks:', error);
						setError(error.message);
						setIsLoading(false);
					}
				},
				(error) => {
					console.error('Error in tasks listener:', error);
					setError(error.message);
					setIsLoading(false);
				}
			);

			return () => unsub();
		} catch (error) {
			console.error('Error setting up tasks query:', error);
			setError(error.message);
			setIsLoading(false);
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
