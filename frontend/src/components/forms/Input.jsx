import React from 'react';

export default function Input({
    type = 'text',
    name,
    value,
    onChange,
    disabled,
    className = '',
    ...props
}) {
    const baseClasses = `appearance-none block w-full px-3 py-2 border-2 rounded-md shadow-sm 
        placeholder-gray-400 dark:placeholder-gray-500 
        focus:outline-none focus:ring-blue-500 focus:border-blue-500`;

    const enabledClasses =
        'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white';
    const disabledClasses =
        'disabled:bg-gray-200 dark:disabled:bg-gray-600 disabled:text-gray-500 dark:disabled:text-gray-400 border-gray-200 dark:border-gray-600';

    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`${baseClasses} ${
                disabled ? disabledClasses : enabledClasses
            } ${className}`}
            {...props}
        />
    );
}
