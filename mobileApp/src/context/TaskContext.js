import {createContext, useContext, useState, useEffect} from 'react';
import {taskService} from '../services/taskApi';
import {AuthContext} from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const TaskContext = createContext(null); // Initialize with null

export function TaskProvider({children}) {
	const [tasks, setTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [deletedTasks, setDeletedTasks] = useState([]);
	const [filter, setFilter] = useState('All tasks');
	const {user} = useContext(AuthContext);
	const [selectedTask, setSelectedTask] = useState(null);

	useEffect(() => {
		if (user) {
			getTasks(user.id);
		}
	}, [user]);

	useEffect(() => {
		filterTasks(filteredTasks, filter);
		console.log('filter in context', filter);
		console.log('filteredTasks in context', filteredTasks);
	}, [filteredTasks, filter]);

	const addTask = async task => {
		try {
			await addNotification(task).then(notification => {
				task.notifications = {
					[notification.type]: notification,
				};
				return task;
			});
			const response = await taskService.createTask(task);

			//Sort tasks by createdAt date
			const sortedTasks = [...tasks, response.data].sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
			);
			setTasks(sortedTasks);
		} catch (error) {
			console.error('Error adding task:', error);
		}
	};

	const filterTasks = (filteredTasks, filter) => {
		console.log(filter);
		// sort filteredTasks by createdAt date
		const sortedFilteredTasks = filteredTasks.sort(
			(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
		);
		console.log('sortedFilteredTasks', sortedFilteredTasks);
		setFilter(filter);
		setFilteredTasks(sortedFilteredTasks);
	};

	const deleteTask = async task => {
		if (task.status === 'deleted') {
			await taskService.deleteTask(task.id);
			setDeletedTasks(deletedTasks.filter(t => t.id !== task.id));
		} else {
			const deletedStatus = {
				status: 'deleted',
			};
			await taskService.updateTask(task.id, deletedStatus);
			await getTasks(task.ownerId);
		}
	};

	const toggleTask = async (taskId, taskData) => {
		setTasks(
			tasks.map(task =>
				task.id === taskId ? {...task, ...taskData} : task,
			),
		);
		await taskService.updateTask(taskId, taskData);
	};

	const getTasks = async () => {
		console.log('getTasks', user.id);

		const response = await taskService.getTasks(user.id);

		// sort tasks by createdAt date
		const deletedTasks = response.data.filter(
			task => task.status === 'deleted',
		);
		setDeletedTasks(deletedTasks);

		const filteredTasks = response.data.filter(
			task => task.status !== 'deleted',
		);
		const sortedTasks = filteredTasks.sort(
			(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
		);
		setTasks(sortedTasks);
	};

	const deleteAllTasks = async userId => {
		await taskService.deleteAllTasks(userId);
		await getTasks(userId);
	};

	const updateTask = async (taskId, newTaskData) => {
		await taskService.updateTask(taskId, newTaskData);
		await getTasks();
	};

	const value = {
		tasks,
		filter,
		filteredTasks,
		deletedTasks,
		selectedTask,
		setSelectedTask,
		setFilteredTasks,
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

const addNotification = async task => {
	const setNotificationType = task => {
		if (task.priority === 'high') {
			return 'important';
		} else if (task.dueDate) {
			return 'dueDate';
		} else {
			return 'reminder';
		}
	};

	const setMessage = task => {
		switch (type) {
			case 'important':
				return `${task.title} is a high priority task`;
			case 'dueDate':
				return `${task.title} is due on ${task.dueDate}`;
			case 'reminder':
				return `This is a reminder for ${task.title}`;
		}
	};

	const setNotifyOn = task => {
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

const storeOnDevice = async (key, value) => {
	await AsyncStorage.setItem(key, JSON.stringify(value));
};

const getFromDevice = async key => {
	const value = await AsyncStorage.getItem(key);
	return JSON.parse(value);
};
