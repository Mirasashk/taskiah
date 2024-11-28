import { useEffect, useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { useUser } from '../../context/UserContext';
import TaskItem from './TaskItem';

const TaskList = () => {
    const { getTasks, tasks, filteredTasks, filter } =
        useTaskContext();

    const { userData } = useUser();
    const [localTasks, setLocalTasks] = useState([]);

    // useEffect(() => {
    //     if (!filteredTasks) {
    //         setTasks(Array.isArray(getTasks()) ? getTasks() : []);
    //     } else {
    //         setTasks(
    //             Array.isArray(filteredTasks) ? filteredTasks : []
    //         );
    //     }
    // }, []);

    useEffect(() => {
        getTasks(userData.id);
    }, []);

    useEffect(() => {
        console.log('These are the filtered tasks:', filteredTasks);
        setLocalTasks(filteredTasks);
    }, [filteredTasks]);

    useEffect(() => {
        setLocalTasks(tasks);
    }, [tasks]);

    // useEffect(() => {
    //     getTasks();
    //     if (!filteredTasks) {
    //         setLocalTasks(tasks);
    //     } else {
    //         setLocalTasks(filteredTasks);
    //     }
    // }, []);

    // useEffect(() => {
    //     console.log('These are the tasks:', localTasks);
    // }, [localTasks]);

    if (localTasks.length === 0) {
        return (
            <p className='text-gray-500 dark:text-gray-400'>
                No tasks yet!
            </p>
        );
    }

    return (
        <div className='space-y-4'>
            {filter && filter !== 'All tasks' && (
                <span className='text-gray-500 dark:text-gray-400'>
                    Filtered by {filter}
                </span>
            )}
            {localTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
