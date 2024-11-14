import React from 'react';
import TodoList from '../components/todos/TodoList';
import TodoForm from '../components/todos/TodoForm';

const TodosPage = () => {
    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white'>
                Todos
            </h1>
            <TodoForm />
            <TodoList />
        </div>
    );
};

export default TodosPage;
