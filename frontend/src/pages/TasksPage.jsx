import React from 'react';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';

const TasksPage = () => {
    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white'>
                My Tasks
            </h1>
            <TaskForm />
            <TaskList />
        </div>
    );
};

export default TasksPage;
