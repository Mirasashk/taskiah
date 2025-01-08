import React from 'react';
import classNames from 'classnames';

export default function Input({
	type = 'text',
	name,
	value,
	onChange,
	disabled,
	className = '',
	label,
	labelPosition = 'left',
	error,
	wrapperClassName,
	...props
}) {
	const baseClasses = `appearance-none block w-full px-3 py-2 border-2 rounded-md shadow-sm 
        placeholder-gray-400 dark:placeholder-gray-300 
        focus:outline-none focus:ring-blue-500 focus:border-blue-500`;

	const enabledClasses =
		'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white';
	const disabledClasses =
		'disabled:bg-gray-50 dark:disabled:bg-gray-600 disabled:text-gray-500 dark:disabled:text-gray-400 border-gray-200 dark:border-gray-600';
	const errorClasses = 'border-red-500 dark:border-red-400';

	const inputClasses = classNames(
		baseClasses,
		disabled ? disabledClasses : enabledClasses,
		error && errorClasses,
		className
	);

	const wrapperClasses = classNames('flex gap-2', wrapperClassName, {
		'flex-col': labelPosition === 'top' || labelPosition === 'bottom',
		'flex-col-reverse': labelPosition === 'bottom',
		'flex-row': labelPosition === 'left' || labelPosition === 'right',
		'flex-row-reverse': labelPosition === 'right',
	});

	const labelClasses = classNames('text-gray-700 dark:text-gray-200', {
		'self-center': labelPosition === 'left' || labelPosition === 'right',
	});

	const inputWrapper = (
		<div className='w-full'>
			<input
				id={name}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				disabled={disabled}
				className={inputClasses}
				aria-invalid={!!error}
				aria-errormessage={error ? `${name}-error` : undefined}
				{...props}
			/>
			{error && (
				<p
					id={`${name}-error`}
					className='mt-1 text-sm text-red-600 dark:text-red-400'
					role='alert'
				>
					{error}
				</p>
			)}
		</div>
	);

	if (!label) {
		return inputWrapper;
	}

	return (
		<div className={wrapperClasses}>
			<label
				htmlFor={name}
				className={labelClasses}
			>
				{label}
			</label>
			{inputWrapper}
		</div>
	);
}
