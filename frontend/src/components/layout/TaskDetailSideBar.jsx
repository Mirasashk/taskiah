import { FiX } from 'react-icons/fi';
import { FaCircle } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';

const TaskDetailSideBar = ({ task, onClose }) => {
    const { userData } = useUser();
    const tags = Object.values(userData?.tags || {});

    if (!task) return null;

    return (
        <aside className='w-96 bg-white dark:bg-gray-800 h-full rounded-lg p-6 shadow-lg'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
                    Task Details
                </h2>
                <button
                    onClick={onClose}
                    className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                >
                    <FiX size={24} />
                </button>
            </div>

            <div className='space-y-6'>
                {/* Title */}
                <div>
                    <label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
                        Title
                    </label>
                    <p className='text-gray-900 dark:text-white'>
                        {task.title}
                    </p>
                </div>

                {/* Description */}
                {task.description && (
                    <div>
                        <label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
                            Description
                        </label>
                        <p className='text-gray-900 dark:text-white whitespace-pre-wrap'>
                            {task.description}
                        </p>
                    </div>
                )}

                {/* Status */}
                <div>
                    <label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
                        Status
                    </label>
                    <p className='capitalize text-gray-900 dark:text-white'>
                        {task.status}
                    </p>
                </div>

                {/* Priority */}
                {task.priority && (
                    <div>
                        <label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
                            Priority
                        </label>
                        <p className='capitalize text-gray-900 dark:text-white'>
                            {task.priority}
                        </p>
                    </div>
                )}

                {/* Category */}
                {task.category && (
                    <div>
                        <label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
                            Category
                        </label>
                        <p className='text-gray-900 dark:text-white'>
                            {task.category}
                        </p>
                    </div>
                )}

                {/* Tags */}
                {task.tags && (
                    <div>
                        <label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
                            Tags
                        </label>
                        <div className='flex items-center gap-2'>
                            <FaCircle
                                size={16}
                                color={
                                    tags.find(
                                        (tag) =>
                                            tag.name === task.tags
                                    )?.color
                                }
                            />
                            <span className='text-gray-900 dark:text-white'>
                                {tags
                                    .filter((tag) =>
                                        task.tags.includes(tag.name)
                                    )
                                    .map((tag) => tag.name)
                                    .join(', ')}
                            </span>
                        </div>
                    </div>
                )}

                {/* Due Date */}
                {task.dueDate && (
                    <div>
                        <label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
                            Due Date
                        </label>
                        <p className='text-gray-900 dark:text-white'>
                            {task.dueDate}
                        </p>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default TaskDetailSideBar;
