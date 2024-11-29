// CustomDropdown.jsx
import React, { useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';

const CustomDropdown = ({ options, selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpen &&
                !event.target.closest('.dropdown-container')
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            );
        };
    }, [isOpen]);

    return (
        <div className='relative dropdown-container'>
            <button
                type='button'
                className='w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700'
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className='flex items-center justify-between'>
                    {selected?.name || 'Create a new tag'}{' '}
                    <FaCircle color={selected?.color} />
                </div>
            </button>
            {isOpen && (
                <ul className='absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded mt-1'>
                    {options.map((option) => (
                        <li
                            key={option.name}
                            className='p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer'
                            onClick={() => handleOptionClick(option)}
                        >
                            <div className='flex w-full items-center justify-between'>
                                <div className='flex justify-start'>
                                    {option.name}{' '}
                                </div>
                                <div className='flex justify-end'>
                                    <FaCircle color={option.color} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdown;
