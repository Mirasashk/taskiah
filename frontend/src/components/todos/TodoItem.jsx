import { useTodoContext } from '../../context/TodoContext';

export default function TodoItem({ todo }) {
    const { toggleTodo, deleteTodo } = useTodoContext();

    if (!todo) return null;

    return (
        <div className='flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow'>
            <div className='flex items-center gap-2'>
                <input
                    type='checkbox'
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className='w-4 h-4'
                />
                <span
                    className={`${
                        todo.completed
                            ? 'line-through text-gray-500 dark:text-gray-400'
                            : 'text-gray-900 dark:text-white'
                    }`}
                >
                    {todo.title}
                </span>
            </div>
            <button
                onClick={() => deleteTodo(todo.id)}
                className='text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
            >
                Delete
            </button>
        </div>
    );
}
