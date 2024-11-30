import {
    createContext,
    useContext,
    useState,
    useEffect,
} from 'react';
import { taskService } from '../services/api';
import { useUser } from './UserContext';

const TaskContext = createContext(null); // Initialize with null

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [deletedTasks, setDeletedTasks] = useState([]);
    const [filter, setFilter] = useState('All tasks');
    const { userData } = useUser();

    useEffect(() => {
        if (userData) {
            getTasks(userData.id);
        }
    }, [userData]);

    const addTask = async (task) => {
        try {
            const response = await taskService.createTask(task);

            console.log('new task added!', response);
            //Sort tasks by createdAt date
            const sortedTasks = [...tasks, response.data].sort(
                (a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
            );
            setTasks(sortedTasks);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const filterTasks = (filteredTasks, filter) => {
        // sort filteredTasks by createdAt date
        const sortedFilteredTasks = filteredTasks.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setFilteredTasks(sortedFilteredTasks);
        setFilter(filter);
    };

    const deleteTask = async (task) => {
        if (task.status === 'deleted') {
            console.log('permanently deleting task', task.id);
            await taskService.deleteTask(task.id);
            setDeletedTasks(
                deletedTasks.filter((t) => t.id !== task.id)
            );
        } else {
            console.log('deleting task', task.id);
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
        // sort tasks by createdAt date
        const deletedTasks = response.data.filter(
            (task) => task.status === 'deleted'
        );
        setDeletedTasks(deletedTasks);

        const filteredTasks = response.data.filter(
            (task) => task.status !== 'deleted'
        );
        const sortedTasks = filteredTasks.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTasks(sortedTasks);
    };

    const deleteAllTasks = async (userId) => {
        console.log('deleting all tasks');
        await taskService.deleteAllTasks(userId);
        await getTasks(userId);
    };

    const value = {
        tasks,
        filter,
        filteredTasks,
        deletedTasks,
        setFilter,
        addTask,
        deleteTask,
        toggleTask,
        getTasks,
        filterTasks,
        deleteAllTasks,
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
}

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error(
            'useTaskContext must be used within a TaskProvider'
        );
    }
    return context;
};
