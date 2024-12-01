import { useEffect, useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { useUser } from '../../context/UserContext';
import TaskItem from './TaskItem';
import TaskDetailSideBar from '../layout/TaskDetailSideBar';

const TaskList = () => {
    const {
        getTasks,
        tasks,
        filteredTasks,
        filter,
        deletedTasks,
        deleteAllTasks,
        setFilter,
        selectedTask,
        setSelectedTask,
    } = useTaskContext();

    const { userData } = useUser();
    const [localTasks, setLocalTasks] = useState([]);
    const [showDeletePermBtn, setShowDeletePermBtn] = useState(false);

    useEffect(() => {
        getTasks(userData.id);
    }, []);

    useEffect(() => {
        if (filter === 'Deleted') {
            setShowDeletePermBtn(true);
            setLocalTasks(deletedTasks);
        } else {
            setShowDeletePermBtn(false);
            setLocalTasks(filteredTasks);
        }
    }, [filteredTasks, deletedTasks]);

    useEffect(() => {
        setLocalTasks(tasks);
    }, [tasks]);

    const handleDeleteAll = async () => {
        console.log('deleting all tasks');
        await deleteAllTasks(userData.id);
        setFilter('All tasks');
    };

    const handleTaskSelect = (task) => {
        setSelectedTask(task);
    };

    return (
        <div className='flex gap-4'>
            <div className='flex-1 flex-col space-y-4'>
                <div className='flex items-center gap-4'>
                    {filter && filter !== 'All tasks' && (
                        <span className='text-gray-500 dark:text-gray-400'>
                            Filtered by {filter}
                        </span>
                    )}
                    {showDeletePermBtn && (
                        <button
                            onClick={handleDeleteAll}
                            className='bg-red-500 text-white px-4 py-2 rounded-md'
                        >
                            Delete all permanently
                        </button>
                    )}
                </div>
                {localTasks.length === 0 ? (
                    <p className='text-gray-500 dark:text-gray-400'>
                        No tasks yet!
                    </p>
                ) : (
                    localTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onTaskSelect={handleTaskSelect}
                        />
                    ))
                )}
            </div>
            {/* {selectedTask && (
                <div className='flex'>
                    <div
                        className='fixed top-0 pt-16 right-0 bottom-0 w-96 transform transition-transform duration-300 ease-in-out z-50 bg-white dark:bg-gray-800'
                        style={{
                            transform: selectedTask
                                ? 'translateX(0)'
                                : 'translateX(100%)',
                        }}
                    >
                        <div className='h-full overflow-y-auto pr-4'>
                            <div className='animate-slideIn'>
                                <TaskDetailSideBar
                                    task={selectedTask}
                                    onClose={() =>
                                        setSelectedTask(null)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default TaskList;
