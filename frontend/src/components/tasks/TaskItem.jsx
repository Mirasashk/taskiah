import { useEffect, useState, useRef } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { FaCircle } from 'react-icons/fa';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useUser } from '../../context/UserContext';

export default function TaskItem({ task }) {
    const { toggleTask, deleteTask, editTask, tasks } =
        useTaskContext();
    const { userData } = useUser();
    const tags = Object.values(userData?.tags || {});
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const taskDetailRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                taskDetailRef.current &&
                !taskDetailRef.current.contains(event.target)
            ) {
                setShowTaskDetails(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            );
        };
    }, []);

    const handleClick = () => {
        setShowTaskDetails(!showTaskDetails);
    };

    // const handleTaskToggle = (task, status) => {
    //     console.log('toggling', task);
    //     toggleTask(task.id, status);
    // };

    const handleDelete = (task) => {
        if (task.status === 'deleted') {
            console.log('deleting permanently', task);
            deleteTask(task);
        } else {
            console.log('deleting', task);
            deleteTask(task);
        }
    };

    const handleEdit = (task) => {
        console.log('editing', task);
    };

    if (!task) return null;

    return (
        <div ref={taskDetailRef}>
            <div
                className={`flex items-center justify-between p-4 bg-white dark:bg-gray-800 ${
                    showTaskDetails
                        ? 'rounded-t-lg'
                        : 'rounded-lg shadow'
                }`}
                onClick={() => handleClick(task)}
            >
                <div className='flex items-center gap-6'>
                    <div className='flex items-center gap-2'>
                        <input
                            type='checkbox'
                            checked={task.completed}
                            onChange={() =>
                                toggleTask(task.id, {
                                    status:
                                        task.status == 'active'
                                            ? 'completed'
                                            : 'active',
                                })
                            }
                            className='w-4 h-4'
                        />
                        <span
                            className={`${
                                task.status == 'completed'
                                    ? 'line-through text-gray-500 dark:text-gray-400'
                                    : 'text-gray-900 dark:text-white'
                            }`}
                        >
                            {task.title}
                        </span>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <button
                        onClick={() => handleEdit(task)}
                        className='text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
                    >
                        <FiEdit />
                    </button>
                    <button
                        onClick={() => handleDelete(task)}
                        className='text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
                    >
                        <FiTrash />
                    </button>
                </div>
            </div>
            {showTaskDetails && (
                <div className='flex flex-col items-center justify-between p-4 bg-white dark:bg-gray-600 rounded-b-lg shadow'>
                    {task.description && (
                        <div className='flex w-full gap-2'>
                            <label className='items-start text-gray-500 dark:text-gray-400'>
                                Description:
                            </label>
                            <textarea
                                style={{
                                    minHeight: '50px',
                                    height: 'auto',
                                }}
                                className='p-2 w-full border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700'
                                name='description'
                                value={task.description}
                                disabled
                                placeholder='Enter task description'
                                rows={Math.min(
                                    10,
                                    Math.max(
                                        3,
                                        task.description.split('\n')
                                            .length
                                    )
                                )}
                            />
                        </div>
                    )}
                    <div className='flex w-full gap-16 items-center pt-2'>
                        {task.category && (
                            <span className='text-gray-500 dark:text-gray-400'>
                                Category: {task.category}
                            </span>
                        )}
                        {task.priority && (
                            <span className='text-gray-500 dark:text-gray-400'>
                                Priority: {task.priority}
                            </span>
                        )}
                        {task.tags && (
                            <span className='text-gray-500 dark:text-gray-400 flex items-center gap-2'>
                                Tags:{' '}
                                <FaCircle
                                    size={16}
                                    color={
                                        tags.find(
                                            (tag) =>
                                                tag.name === task.tags
                                        )?.color
                                    }
                                />
                                {tags
                                    .filter((tag) =>
                                        task.tags.includes(tag.name)
                                    )
                                    .map((tag) => tag.name)
                                    .join(', ')}
                            </span>
                        )}
                        {task.dueDate && (
                            <span className='text-gray-500 dark:text-gray-400'>
                                Due Date: {task.dueDate}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
