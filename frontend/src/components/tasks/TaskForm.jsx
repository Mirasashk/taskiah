import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { useUser } from '../../context/UserContext';
import { useNotificationContext } from '../../context/NotificationContext';
import { useListContext } from '../../context/ListContext';
import FormField from '../forms/FormField';
import Input from '../forms/Input';
import CustomDropdown from '../forms/CustomDropdown';

const TaskForm = () => {
	const { addTask } = useTaskContext();
	const { addNotification } = useNotificationContext();
	const { userData } = useUser();
	const { tags } = useListContext();
	const [showNewTaskSubForm, setShowNewTaskSubForm] = useState(false);
	const [selectedTag, setSelectedTag] = useState(tags[0]);
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		status: 'active',
		category: '',
		priority: 'low',
		dueDate: '',
		tags: [tags[0]?.id].filter(Boolean),
		createdAt: new Date(),
		ownerId: userData?.id,
	});

	useEffect(() => {
		if (formData.title.trim() === '') {
			setShowNewTaskSubForm(false);
		} else {
			setShowNewTaskSubForm(true);
		}
	}, [formData.title]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.title.trim()) return;

		await addTask(formData);

		//clear formData
		setFormData({
			title: '',
			description: '',
			status: 'active',
			category: '',
			priority: 'low',
			dueDate: '',
			tags: [tags[0]?.id].filter(Boolean),
			createdAt: new Date(),
			ownerId: userData.id,
		});
		setShowNewTaskSubForm(false);
	};

	const handleFormChange = (e) => {
		e.preventDefault();

		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleCancel = () => {
		setFormData({
			title: '',
			description: '',
			status: 'active',
			category: '',
			priority: 'low',
			dueDate: '',
			tags: [tags[0]?.id].filter(Boolean),
			createdAt: new Date(),
			ownerId: userData.id,
		});
		setShowNewTaskSubForm(false);
	};

	const displayNewTaskSubForm = () => {
		return (
			<div className='grid flex-col grid-cols-2 gap-4 pt-2 w-full bg-gray-700 rounded-lg p-4'>
				{/* First Row */}
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
					<FormField
						label='Priority'
						className=''
					>
						<select
							name='priority'
							value={formData.priority}
							onChange={handleFormChange}
							className='w-full p-2 border rounded bg-white dark:bg-gray-800
							 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700'
						>
							<option value='low'>Low</option>
							<option value='medium'>Medium</option>
							<option value='high'>High</option>
						</select>
					</FormField>
				</div>

				{/* Second Row */}
				<div className='grid col-span-1 gap-2'>
					<FormField
						label='Tags'
						labelClassName=''
					>
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
							className='px-4 h-12 w-16 py-2 bg-blue-500 text-white rounded
							 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
						>
							Add
						</button>
						<button
							type='cancel'
							className='px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900
							 dark:bg-gray-500 dark:hover:bg-gray-900 h-12 w-24 justify-self-end'
							onClick={handleCancel}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='mb-4 w-full'
		>
			<div className='flex flex-col gap-3'>
				{/* Title Row */}
				<div className='flex gap-2 w-full'>
					<input
						type='text'
						value={formData.title}
						name='title'
						onChange={(e) => handleFormChange(e)}
						placeholder='Add a new task'
						className='flex-1 p-2 border rounded bg-white dark:bg-gray-800
						 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
						  border-gray-300 dark:border-gray-700'
					/>
					<button
						type='submit'
						className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600
						 dark:bg-blue-600 dark:hover:bg-blue-700'
					>
						Add
					</button>
				</div>

				{showNewTaskSubForm && displayNewTaskSubForm()}
			</div>
		</form>
	);
};

export default TaskForm;
