import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTaskContext } from '../../context/TaskContext';
import { useUser } from '../../context/UserContext';
import { useNotificationContext } from '../../context/NotificationContext';
import { useListContext } from '../../context/ListContext';
import FormField from '../forms/FormField';
import Input from '../forms/Input';
import CustomDropdown from '../forms/CustomDropdown';
import DropDown from '../common/DropDown';
const PRIORITY_OPTIONS = [
	{ value: 'low', label: 'Low' },
	{ value: 'medium', label: 'Medium' },
	{ value: 'high', label: 'High' },
];

const DEFAULT_FORM_STATE = {
	title: '',
	description: '',
	status: 'active',
	category: '',
	priority: 'low',
	dueDate: '',
	listId: '',
	tags: [],
	createdAt: new Date(),
	ownerId: '',
};

/**
 * TaskForm Component - Allows users to create new tasks with various properties
 * @component
 * @returns {JSX.Element} A form component for creating tasks
 */
const TaskForm = () => {
	const { addTask } = useTaskContext();
	const { addNotification } = useNotificationContext();
	const { userData } = useUser();
	const { tags, lists, myLists, myTasksList } = useListContext();

	const [showNewTaskSubForm, setShowNewTaskSubForm] = useState(false);
	const [selectedTag, setSelectedTag] = useState(tags[0]);
	const [formData, setFormData] = useState({
		...DEFAULT_FORM_STATE,
		tags: [tags[0]?.id].filter(Boolean),
		ownerId: userData?.id,
		listId: myTasksList?.id,
	});

	useEffect(() => {
		setFormData((prevFormData) => ({
			...prevFormData,
			listId: myTasksList?.id,
		}));
	}, [myTasksList]);

	useEffect(() => {
		setShowNewTaskSubForm(formData.title.trim() !== '');
	}, [formData.title]);

	/**
	 * Resets the form to its initial state
	 */
	const resetForm = () => {
		setFormData({
			...DEFAULT_FORM_STATE,
			tags: [tags[0]?.id].filter(Boolean),
			ownerId: userData.id,
			listId: myTasksList?.id,
		});
		setShowNewTaskSubForm(false);
	};

	/**
	 * Handles the form submission
	 * @param {React.FormEvent<HTMLFormElement>} e - The form submission event
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.title.trim()) return;

		await addTask(formData);
		resetForm();
	};

	/**
	 * Handles changes to form inputs
	 * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} e - The input change event
	 */
	const handleFormChange = (e) => {
		e.preventDefault();
		setFormData((prevFormData) => ({
			...prevFormData,
			[e.target.name]: e.target.value,
		}));
	};

	/**
	 * Renders the expanded task form with additional fields
	 * @returns {JSX.Element} The expanded form section
	 */
	const renderExpandedForm = () => (
		<div className='grid flex-col grid-cols-2 gap-4 pt-2 w-full bg-gray-700 rounded-lg p-4'>
			<div className='grid col-span-1 w-full gap-4'>
				<div className='flex flex-col gap-2'>
					<label className='text-white'>Description</label>
					<textarea
						className='p-2 h-24 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700'
						name='description'
						value={formData.description}
						onChange={handleFormChange}
						placeholder='Enter task description'
					/>
				</div>
				<FormField label='Priority'>
					<select
						name='priority'
						value={formData.priority}
						onChange={handleFormChange}
						className='w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700'
					>
						{PRIORITY_OPTIONS.map((option) => (
							<option
								key={option.value}
								value={option.value}
							>
								{option.label}
							</option>
						))}
					</select>
				</FormField>
			</div>

			<div className='grid col-span-1 gap-2'>
				<FormField label='Tags'>
					<CustomDropdown
						options={tags}
						selected={selectedTag}
						onChange={(value) => {
							setSelectedTag(value);
							setFormData({ ...formData, tags: [value.id] });
						}}
					/>
				</FormField>

				<FormField
					label='List'
					className='w-48'
				>
					<select
						name='listId'
						value={formData.listId}
						onChange={handleFormChange}
						className='w-full p-2 pr-8 border rounded bg-white dark:bg-gray-800 
						text-gray-900 dark:text-white border-gray-300 dark:border-gray-700
						'
					>
						{lists.map((list) => (
							<option
								key={list.id}
								value={list.id}
							>
								{list.name}
							</option>
						))}
					</select>
				</FormField>

				<FormField
					label='Due Date'
					className='w-48'
				>
					<Input
						type='date'
						name='dueDate'
						value={formData.dueDate}
						onChange={handleFormChange}
					/>
				</FormField>
				<div className='flex gap-2 justify-end'>
					<button
						type='submit'
						className='px-4 h-12 w-16 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
					>
						Add
					</button>
					<button
						type='button'
						className='px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900 dark:bg-gray-500 dark:hover:bg-gray-900 h-12 w-24 justify-self-end'
						onClick={resetForm}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);

	return (
		<form
			onSubmit={handleSubmit}
			className='mb-4 w-full'
		>
			<div className='flex flex-col gap-3'>
				<div className='flex gap-2 w-full'>
					<input
						type='text'
						value={formData.title}
						name='title'
						onChange={handleFormChange}
						placeholder='Add a new task'
						className='flex-1 p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700'
					/>
					<button
						type='submit'
						className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
					>
						Add
					</button>
				</div>

				{showNewTaskSubForm && renderExpandedForm()}
			</div>
		</form>
	);
};

TaskForm.propTypes = {
	// Add prop types if needed in the future
};

export default TaskForm;
