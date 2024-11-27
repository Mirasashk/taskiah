import { createContext, useContext, useState } from 'react';
import { taskService } from '../services/api';

const TaskContext = createContext(null); // Initialize with null

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filter, setFilter] = useState('All tasks');

    const addTask = async (task) => {
        try {
            const response = await taskService.createTask(task);

            console.log('new task added!', response);
            setTasks([...tasks, task]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const filterTasks = (filteredTasks, filter) => {
        setFilteredTasks(filteredTasks);
        setFilter(filter);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const toggleTask = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    const getTasks = async () => {
        const response = await taskService.getTasks();
        setTasks(response.data);
    };

    const value = {
        tasks,
        filter,
        filteredTasks,
        addTask,
        deleteTask,
        toggleTask,
        getTasks,
        filterTasks,
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
