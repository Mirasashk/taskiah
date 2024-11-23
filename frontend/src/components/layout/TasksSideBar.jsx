import { useState } from 'react';
import {
    FiInbox,
    FiCalendar,
    FiStar,
    FiTag,
    FiChevronDown,
    FiChevronRight,
} from 'react-icons/fi';

export default function TasksSidebar() {
    const [showProjects, setShowProjects] = useState(true);

    const filterOptions = [
        { icon: <FiInbox />, label: 'Inbox', count: 0 },
        { icon: <FiCalendar />, label: 'Today', count: 0 },
        { icon: <FiStar />, label: 'Important', count: 0 },
    ];

    const tags = [
        { id: 1, name: 'Work', color: 'bg-blue-500' },
        { id: 2, name: 'Personal', color: 'bg-green-500' },
        { id: 3, name: 'Shopping', color: 'bg-yellow-500' },
    ];

    return (
        <aside className='w-64 bg-white rounded-lg dark:bg-gray-800 h-full border-r border-gray-200 dark:border-gray-700'>
            <div className='p-4'>
                {/* Filter Options */}
                <nav className='space-y-2'>
                    {filterOptions.map((option, index) => (
                        <button
                            key={index}
                            className='flex items-center w-full px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
                        >
                            <span className='text-lg mr-3'>
                                {option.icon}
                            </span>
                            <span className='flex-1'>
                                {option.label}
                            </span>
                            <span className='text-sm text-gray-500'>
                                {option.count}
                            </span>
                        </button>
                    ))}
                </nav>

                {/* Tags Section */}
                <div className='mt-6'>
                    <button
                        onClick={() => setShowProjects(!showProjects)}
                        className='flex items-center w-full px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
                    >
                        <span className='text-lg mr-3'>
                            {showProjects ? (
                                <FiChevronDown />
                            ) : (
                                <FiChevronRight />
                            )}
                        </span>
                        <span className='flex-1'>Tags</span>
                        <FiTag className='text-lg' />
                    </button>

                    {showProjects && (
                        <div className='ml-6 mt-2 space-y-2'>
                            {tags.map((tag) => (
                                <button
                                    key={tag.id}
                                    className='flex items-center w-full px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
                                >
                                    <div
                                        className={`w-3 h-3 rounded-full ${tag.color} mr-3`}
                                    />
                                    <span>{tag.name}</span>
                                </button>
                            ))}
                            <button className='flex items-center w-full px-3 py-2 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'>
                                + Add New Tag
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
