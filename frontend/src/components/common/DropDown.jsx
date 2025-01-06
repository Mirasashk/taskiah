import React, { useState } from 'react';
import Input from '../forms/Input';

/**
 * A reusable dropdown component that displays a list of options in a popup menu.
 * @typedef {Object} DropDownOption
 * @property {string|number} value - The value of the option
 * @property {string} label - The display text for the option
 *
 * @param {Object} props - Component props
 * @param {DropDownOption[]} props.options - Array of options to display in the dropdown
 * @param {string|number} props.value - Currently selected value
 * @param {(value: string|number, option: DropDownOption) => void} props.onChange - Callback function when value changes
 * @param {string} [props.placeholder] - Placeholder text for the input
 * @param {string} [props.className] - Additional CSS classes for the container
 * @param {string} [props.inputClassName] - Additional CSS classes for the input
 * @param {string} [props.optionsClassName] - Additional CSS classes for the options container
 * @param {string} [props.optionClassName] - Additional CSS classes for individual options
 * @param {boolean} [props.disabled] - Whether the dropdown is disabled
 * @param {(option: DropDownOption) => React.ReactNode} [props.renderOption] - Custom render function for options
 * @returns {JSX.Element}
 */
const DropDown = ({
	options = [],
	value,
	onChange,
	placeholder = 'Select an option',
	className = '',
	inputClassName = '',
	optionsClassName = '',
	optionClassName = '',
	label = '',
	disabled = false,
	renderOption,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	// Find the selected option to display its label
	const selectedOption = options.find((opt) => opt.value === value);
	const displayValue = selectedOption ? selectedOption.label : '';

	const handleOptionClick = (option) => {
		if (onChange) {
			onChange(option.value, option);
		}
		setIsOpen(false);
	};

	const renderDefaultOption = (option) => {
		return option.label;
	};

	return (
		<div className={`flex-1 flex-col gap-2 ${className}`}>
			<div className='flex items-center gap-2'>
				<label className='text-sm text-gray-300'>{label}</label>
			</div>
			<Input
				type='text'
				value={displayValue}
				onChange={() => {}} // Input is read-only
				onClick={() => !disabled && setIsOpen(!isOpen)}
				placeholder={placeholder}
				className={inputClassName}
				disabled={disabled}
				readOnly
			/>
			{isOpen && (
				<div className='relative z-50'>
					<div
						className={`absolute top-0 left-0 w-full bg-white dark:bg-gray-600 rounded-lg shadow-lg ${optionsClassName}`}
					>
						<div className='flex flex-col gap-2 p-2'>
							{options.map((option) => (
								<div
									className={`p-2 hover:bg-gray-500 cursor-pointer ${optionClassName}`}
									key={option.value}
									onClick={() => handleOptionClick(option)}
								>
									{renderOption
										? renderOption(option)
										: renderDefaultOption(option)}
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DropDown;
