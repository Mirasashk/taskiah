import { useTaskContext } from '../../context/TaskContext';

export default function TaskItem({ task }) {
    const { toggleTask, deleteTask } = useTaskContext();

    if (!task) return null;

    return (
        <div className='flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow'>
            <div className='flex items-center gap-2'>
                <input
                    type='checkbox'
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className='w-4 h-4'
                />
                <span
                    className={`${
                        task.completed
                            ? 'line-through text-gray-500 dark:text-gray-400'
                            : 'text-gray-900 dark:text-white'
                    }`}
                >
                    {task.title}
                </span>
            </div>
            <button
                onClick={() => deleteTask(task.id)}
                className='text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
            >
                Delete
            </button>
        </div>
    );
}
