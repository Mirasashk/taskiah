import { useTodoContext } from '../../context/TodoContext';
import TodoItem from './TodoItem';

export default function TodoList() {
    const { todos } = useTodoContext();

    if (todos.length === 0) {
        return (
            <p className='text-gray-500 dark:text-gray-400'>
                No todos yet!
            </p>
        );
    }

    return (
        <div className='space-y-4'>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
}
