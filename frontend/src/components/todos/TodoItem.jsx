import { useTodoContext } from '../../context/TodoContext';

export default function TodoItem({ todo }) {
    const { toggleTodo, deleteTodo } = useTodoContext();

    if (!todo) return null;

    return (
        <div className='flex items-center justify-between p-4 bg-white rounded-lg shadow'>
            <div className='flex items-center gap-2'>
                <input
                    type='checkbox'
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className='w-4 h-4'
                />
                <span
                    className={
                        todo.completed
                            ? 'line-through text-gray-500'
                            : ''
                    }
                >
                    {todo.title}
                </span>
            </div>
            <button
                onClick={() => deleteTodo(todo.id)}
                className='text-red-500 hover:text-red-700'
            >
                Delete
            </button>
        </div>
    );
}
