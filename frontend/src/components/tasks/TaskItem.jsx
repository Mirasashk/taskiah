import { useEffect, useState, useRef } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { FaCircle } from 'react-icons/fa';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useUser } from '../../context/UserContext';

export default function TaskItem({ task, onTaskSelect }) {
    const { toggleTask, deleteTask } = useTaskContext();
    const { userData } = useUser();

    const handleDelete = (e, task) => {
        e.stopPropagation();
        if (task.status === 'deleted') {
            console.log('deleting permanently', task);
            deleteTask(task);
        } else {
            console.log('deleting', task);
            deleteTask(task);
        }
    };

    const handleEdit = (e, task) => {
        e.stopPropagation();
        console.log('editing', task);
    };

    if (!task) return null;

    return (
        <div
            className='flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700'
            onClick={() => onTaskSelect(task)}
        >
            <div className='flex items-center gap-6'>
                <div className='flex items-center gap-2'>
                    <input
                        type='checkbox'
                        checked={task.completed}
                        onChange={(e) => {
                            e.stopPropagation();
                            toggleTask(task.id, {
                                status:
                                    task.status == 'active'
                                        ? 'completed'
                                        : 'active',
                            });
                        }}
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
                    onClick={(e) => handleEdit(e, task)}
                    className='text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
                >
                    <FiEdit />
                </button>
                <button
                    onClick={(e) => handleDelete(e, task)}
                    className='text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
                >
                    <FiTrash />
                </button>
            </div>
        </div>
    );
}
