import { createContext, useContext, useState } from 'react';

const TaskContext = createContext(null); // Initialize with null

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([
        // Add some initial tasks for testing
        { id: 1, title: 'Test Task', completed: false },
    ]);

    const addTask = (title) => {
        const newTask = {
            id: Date.now(),
            title,
            completed: false,
        };
        setTasks([...tasks, newTask]);
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

    const value = {
        tasks,
        addTask,
        deleteTask,
        toggleTask,
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
