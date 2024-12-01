import React, { useState } from 'react';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import TasksSideBar from '../components/layout/TasksSideBar';
import TaskDetailSideBar from '../components/layout/TaskDetailSideBar';
import { useTaskContext } from '../context/TaskContext';

const TasksPage = () => {
    const [filteredTasks, setFilteredTasks] = useState();
    const { selectedTask, setSelectedTask } = useTaskContext();
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
                    <div className='flex gap-4'>
                        <div className='flex-1 '>
                            <TaskList filteredTasks={filteredTasks} />
                        </div>
                        {selectedTask && (
                            <div className='flex'>
                                <div className='container mx-auto w-96'>
                                    <div className='mt-4'>
                                        <div className='fixed'>
                                            <TaskDetailSideBar
                                                task={selectedTask}
                                                onClose={() =>
                                                    setSelectedTask(
                                                        null
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TasksPage;
