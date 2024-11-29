import { useEffect, useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { useUser } from '../../context/UserContext';
import TaskItem from './TaskItem';

const TaskList = () => {
    const { getTasks, tasks, filteredTasks, filter, deletedTasks } =
        useTaskContext();

    const { userData } = useUser();
    const [localTasks, setLocalTasks] = useState([]);
    const [showDeletePermBtn, setShowDeletePermBtn] = useState(false);

    useEffect(() => {
        getTasks(userData.id);
    }, []);

    useEffect(() => {
        if (filter === 'Deleted') {
            setShowDeletePermBtn(true);
            setLocalTasks(deletedTasks);
        } else {
            setShowDeletePermBtn(false);
            setLocalTasks(filteredTasks);
        }
    }, [filteredTasks, deletedTasks]);

    useEffect(() => {
        setLocalTasks(tasks);
    }, [tasks]);

    if (localTasks.length === 0) {
        return (
            <p className='text-gray-500 dark:text-gray-400'>
                No tasks yet!
            </p>
        );
    }

    return (
        <div className='space-y-4'>
            <div className='flex items-center gap-4'>
                {filter && filter !== 'All tasks' && (
                    <span className='text-gray-500 dark:text-gray-400'>
                        Filtered by {filter}
                    </span>
                )}
                {showDeletePermBtn && (
                    <button className='bg-red-500 text-white px-4 py-2 rounded-md'>
                        Delete all permanently
                    </button>
                )}
            </div>
            {localTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
