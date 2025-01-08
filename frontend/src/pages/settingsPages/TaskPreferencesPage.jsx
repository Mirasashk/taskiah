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
		<div className='container mx-auto px-4 sm:px-6'>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6'>
				<h1 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0'>
					Task Preferences
				</h1>
			</div>

			<div className='bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 space-y-4 sm:space-y-6'>
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
						className='mt-1 block w-full pl-3 pr-10py-2.5 sm:py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500  rounded-md dark:bg-gray-700 dark:text-white bg-slate-200'
					>
						<option value='dueDate'>Due Date</option>
						<option value='priority'>Priority</option>
						<option value='createdAt'>Created Date</option>
						<option value='title'>Title</option>
					</select>
				</FormField>

				{/* Toggle Settings */}
				<div className='flex flex-col sm:flex-row gap-4'>
					<h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
						General Settings:
					</h2>
					<div className='flex flex-col gap-4 w-full'>
						<label className='flex items-center space-x-3 min-h-[44px]'>
							<input
								type='checkbox'
								checked={preferences.enableRecurring}
								onChange={(e) =>
									setPreferences({
										...preferences,
										enableRecurring: e.target.checked,
									})
								}
								className='form-checkbox h-6 w-6 text-blue-600'
							/>
							<span className='text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
								Enable recurring tasks
							</span>
						</label>

						<label className='flex items-center space-x-3 min-h-[44px]'>
							<input
								type='checkbox'
								checked={preferences.showCompletedTasks}
								onChange={(e) =>
									setPreferences({
										...preferences,
										showCompletedTasks: e.target.checked,
									})
								}
								className='form-checkbox h-6 w-6 text-blue-600'
							/>
							<span className='text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
								Show completed tasks
							</span>
						</label>
					</div>
				</div>

				<div className='flex justify-center sm:justify-end mt-6'>
					<button
						onClick={handleSave}
						disabled={isSaving}
						className={`w-full sm:w-auto px-6 py-3 sm:py-2 bg-blue-600 text-white rounded-lg text-base
							${isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
					>
						{isSaving ? (
							<div className='flex items-center justify-center gap-2'>
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
