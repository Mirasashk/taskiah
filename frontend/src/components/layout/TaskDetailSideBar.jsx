import { FiX } from 'react-icons/fi';
import { FaCircle } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';
import { useState } from 'react';

// @BUG: There is a bug with states, when a task is selected then the
//edit button on a different task is clicked the information
//is the old selected task and not the newly selected task.

const TaskDetailSideBar = ({
    task,
    onClose,
    onSave,
    isEditing,
    onEdit,
}) => {
    const { userData } = useUser();
    const tags = Object.values(userData?.tags || {});
    const [editedTask, setEditedTask] = useState(task);

    if (!task) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value });
    };

    const handleSave = () => {
        onSave(editedTask);
        onEdit(false);
    };

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
                    {isEditing ? (
                        <input
                            type='text'
                            name='title'
                            value={editedTask.title}
                            onChange={handleInputChange}
                            className='flex-1 p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700'
                        />
                    ) : (
                        <p className='text-gray-900 dark:text-white'>
                            {task.title}
                        </p>
                    )}
                </div>

                {/* Description */}

                {isEditing ? (
                    <div>
                        <label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
                            Description
                        </label>
                        <textarea
                            className='p-2 w-full h-40 max-h-[30rem] border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700'
                            name='description'
                            value={editedTask.description}
                            onChange={handleInputChange}
                            placeholder='Enter task description'
                        />
                    </div>
                ) : (
                    task.description && (
                        <div>
                            <label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
                                Description
                            </label>
                            <p className='text-gray-900 dark:text-white whitespace-pre-wrap'>
                                {task.description}
                            </p>
                        </div>
                    )
                )}

                {/* Status */}
                <div>
                    <label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
                        Status
                    </label>
                    {isEditing ? (
                        <select
                            name='status'
                            value={editedTask.status}
                            onChange={handleInputChange}
                            className='w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700'
                        >
                            <option value='active'>Active</option>
                            <option value='completed'>
                                Completed
                            </option>
                            <option value='deleted'>Deleted</option>
                        </select>
                    ) : (
                        <p className='capitalize text-gray-900 dark:text-white'>
                            {task.status}
                        </p>
                    )}
                </div>

                {/* Priority */}
                {task.priority && (
                    <div>
                        <label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
                            Priority
                        </label>
                        {isEditing ? (
                            <select
                                name='priority'
                                value={editedTask.priority}
                                onChange={handleInputChange}
                                className='w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700'
                            >
                                <option value='low'>Low</option>
                                <option value='medium'>Medium</option>
                                <option value='high'>High</option>
                            </select>
                        ) : (
                            <p className='capitalize text-gray-900 dark:text-white'>
                                {task.priority}
                            </p>
                        )}
                    </div>
                )}

                {/* Category */}
                {task.category && (
                    <div>
                        <label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
                            Category
                        </label>
                        {isEditing ? (
                            <input
                                type='text'
                                name='category'
                                value={editedTask.category}
                                onChange={handleInputChange}
                                className='flex-1 p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700'
                            />
                        ) : (
                            <p className='text-gray-900 dark:text-white'>
                                {task.category}
                            </p>
                        )}
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
                        {isEditing ? (
                            <input
                                type='date'
                                name='dueDate'
                                value={editedTask.dueDate}
                                onChange={handleInputChange}
                                className='w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700'
                            />
                        ) : (
                            <p className='text-gray-900 dark:text-white'>
                                {task.dueDate}
                            </p>
                        )}
                    </div>
                )}

                {isEditing && (
                    <button
                        onClick={handleSave}
                        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                    >
                        Save
                    </button>
                )}
            </div>
        </aside>
    );
};

export default TaskDetailSideBar;
