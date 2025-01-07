import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useListContext } from '../../context/ListContext';
import FormField from '../../components/forms/FormField';
import { userService } from '../../services/userApi';

const TaskPreferencesPage = () => {
	const { userData } = useUser();
	const { tags } = useListContext();
	const [preferences, setPreferences] = useState({
		defaultSort: 'dueDate',
		defaultPriority: 'medium',
		enableRecurring: true,
		showCompletedTasks: true,
		defaultView: 'list',
	});
	const [isSaving, setIsSaving] = useState(false);
	const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });

	useEffect(() => {
		if (userData?.preferences?.tasks) {
			setPreferences(userData.preferences.tasks);
		}
	}, [userData]);

	const handleSave = async () => {
		setIsSaving(true);
		setSaveMessage({ type: '', text: '' });

		try {
			await userService.updateUserPreferences(userData.id, {
				tasks: preferences,
			});

			setSaveMessage({
				type: 'success',
				text: 'Task preferences saved successfully!',
			});

			setTimeout(() => {
				setSaveMessage({ type: '', text: '' });
			}, 3000);
		} catch (error) {
			console.error('Error saving task preferences:', error);
			setSaveMessage({
				type: 'error',
				text: 'Failed to save task preferences. Please try again.',
			});
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<div className='container mx-auto px-6'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
					Task Preferences
				</h1>
			</div>

			<div className='bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6'>
				{/* Default Sort */}
				<FormField label='Default Sort Order'>
					<select
						value={preferences.defaultSort}
						onChange={(e) =>
							setPreferences({
								...preferences,
								defaultSort: e.target.value,
							})
						}
						className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white bg-slate-200'
					>
						<option value='dueDate'>Due Date</option>
						<option value='priority'>Priority</option>
						<option value='createdAt'>Creation Date</option>
						<option value='title'>Title</option>
					</select>
				</FormField>

				{/* Default Priority */}
				<FormField label='Default Priority'>
					<select
						value={preferences.defaultPriority}
						onChange={(e) =>
							setPreferences({
								...preferences,
								defaultPriority: e.target.value,
							})
						}
						className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white bg-slate-200'
					>
						<option value='low'>Low</option>
						<option value='medium'>Medium</option>
						<option value='high'>High</option>
					</select>
				</FormField>

				{/* Task View */}
				<FormField label='Default View'>
					<select
						value={preferences.defaultView}
						onChange={(e) =>
							setPreferences({
								...preferences,
								defaultView: e.target.value,
							})
						}
						className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white bg-slate-200'
					>
						<option value='list'>List View</option>
						<option value='board'>Board View</option>
						<option value='calendar'>Calendar View</option>
					</select>
				</FormField>

				{/* Toggle Settings */}
				<div className='flex gap-4'>
					<h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
						General Settings:
					</h2>
					<div className='flex flex-col gap-4'>
						<label className='flex items-center space-x-3'>
							<input
								type='checkbox'
								checked={preferences.enableRecurring}
								onChange={(e) =>
									setPreferences({
										...preferences,
										enableRecurring: e.target.checked,
									})
								}
								className='form-checkbox h-5 w-5 text-blue-600'
							/>
							<span className='text-gray-700 dark:text-gray-300'>
								Enable recurring tasks
							</span>
						</label>

						<label className='flex items-center space-x-3'>
							<input
								type='checkbox'
								checked={preferences.showCompletedTasks}
								onChange={(e) =>
									setPreferences({
										...preferences,
										showCompletedTasks: e.target.checked,
									})
								}
								className='form-checkbox h-5 w-5 text-blue-600'
							/>
							<span className='text-gray-700 dark:text-gray-300'>
								Show completed tasks
							</span>
						</label>
					</div>
				</div>

				<div className='flex justify-end'>
					<button
						onClick={handleSave}
						disabled={isSaving}
						className={`px-4 py-2 bg-blue-600 text-white rounded-lg
                            ${
								isSaving
									? 'opacity-50 cursor-not-allowed'
									: 'hover:bg-blue-700'
							}`}
					>
						{isSaving ? (
							<div className='flex items-center gap-2'>
								<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
								Saving...
							</div>
						) : (
							'Save Changes'
						)}
					</button>
				</div>

				{saveMessage.text && (
					<div
						className={`mt-4 p-4 rounded-lg ${
							saveMessage.type === 'success'
								? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200'
								: 'bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200'
						}`}
					>
						{saveMessage.text}
					</div>
				)}
			</div>
		</div>
	);
};

export default TaskPreferencesPage;
