import { useEffect } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import TaskItem from './TaskItem';

export default function TaskList() {
    const { getTasks, tasks } = useTaskContext();

    useEffect(() => {
        getTasks();
    }, []);

    if (tasks.length === 0) {
        return (
            <p className='text-gray-500 dark:text-gray-400'>
                No tasks yet!
            </p>
        );
    }

    return (
        <div className='space-y-4'>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
}
