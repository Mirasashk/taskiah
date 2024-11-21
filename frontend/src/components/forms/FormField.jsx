import React from 'react';

export default function FormField({
    label,
    labelClassName = '',
    inputClassName = '',
    containerClassName = '',
    children,
}) {
    const baseLabelClasses =
        'text-lg font-normal text-gray-900 dark:text-white';
    const baseContainerClasses = 'flex items-center space-x-8';

    return (
        <div
            className={`${baseContainerClasses} ${containerClassName}`}
        >
            <label
                className={`text-nowrap ${baseLabelClasses} ${labelClassName}`}
            >
                {label}
            </label>
            <div className='w-full'>{children}</div>
        </div>
    );
}
