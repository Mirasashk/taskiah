import React, { useState } from 'react';
import { useTodoContext } from '../../context/TodoContext';

export default function TodoForm() {
    const [title, setTitle] = useState('');
    const { addTodo } = useTodoContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        addTodo(title);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className='mb-4'>
            <div className='flex gap-2'>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Add a new todo'
                    className='flex-1 p-2 border rounded'
                />
                <button
                    type='submit'
                    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                >
                    Add
                </button>
            </div>
        </form>
    );
}
