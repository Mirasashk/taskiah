import React, { useState } from 'react';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import TasksSideBar from '../components/layout/TasksSideBar';

const TasksPage = () => {
    const [filteredTasks, setFilteredTasks] = useState();

    return (
        <div className='container mx-auto p-4'>
            <div className='flex'>
                <div className='flex flex-col'>
                    <h1 className='text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white'>
                        My Tasks
                    </h1>
                    <TasksSideBar onFilterTasks={setFilteredTasks} />
                </div>

                <div className='flex-1 pt-12 pl-6 pr-6'>
                    <TaskForm />
                    <TaskList filteredTasks={filteredTasks} />
                </div>
            </div>
        </div>
    );
};

export default TasksPage;
