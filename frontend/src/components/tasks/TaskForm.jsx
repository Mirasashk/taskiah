import React, { useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';

export default function TaskForm() {
    const [title, setTitle] = useState('');
    const { addTask } = useTaskContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        addTask(title);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className='mb-4'>
            <div className='flex gap-2'>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Add a new task'
                    className='flex-1 p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700'
                />
                <button
                    type='submit'
                    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                >
                    Add
                </button>
            </div>
        </form>
    );
}