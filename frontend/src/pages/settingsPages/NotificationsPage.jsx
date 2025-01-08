import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { userService } from '../../services/userApi';
import FormField from '../../components/forms/FormField';

const NotificationsPage = () => {
	const { userData } = useUser();
	const [preferences, setPreferences] = useState({
		deliveryMethods: {
			email: true,
			inApp: true,
		},
		notificationTypes: {
			listInvitations: true,
			inviteAccepted: true,
			taskDueDate: true,
			taskOverdue: true,
			taskAssigned: true,
			taskCompleted: true,
			listShared: true,
		},
		reminderTiming: {
			beforeDueDate: '1', // days before due date
		},
	});
	const [isSaving, setIsSaving] = useState(false);
	const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });

	useEffect(() => {
		if (userData?.preferences?.notifications) {
			setPreferences(userData.preferences.notifications);
		}
	}, [userData]);

	const handleSave = async () => {
		setIsSaving(true);
		setSaveMessage({ type: '', text: '' });

		try {
			await userService.updateUserPreferences(userData.id, {
				notifications: preferences,
			});

			setSaveMessage({
				type: 'success',
				text: 'Notification preferences saved successfully!',
			});

			setTimeout(() => {
				setSaveMessage({ type: '', text: '' });
			}, 3000);
		} catch (error) {
			console.error('Error saving notification preferences:', error);
			setSaveMessage({
				type: 'error',
				text: 'Failed to save notification preferences. Please try again.',
			});
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<div className='container mx-auto px-4 sm:px-6'>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6'>
				<h1 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0'>
					Notification Preferences
				</h1>
			</div>

			<div className='bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 space-y-4 sm:space-y-6'>
				{/* Delivery Methods Section */}
				<div>
					<h2 className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4'>
						Delivery Methods
					</h2>
					<div className='space-y-4'>
						<label className='flex items-center space-x-3'>
							<input
								type='checkbox'
								className='form-checkbox h-5 w-5'
								checked={preferences.deliveryMethods.email}
								onChange={(e) =>
									setPreferences({
										...preferences,
										deliveryMethods: {
											...preferences.deliveryMethods,
											email: e.target.checked,
										},
									})
								}
							/>
							<span className='text-gray-700 dark:text-gray-300'>
								Email Notifications
							</span>
						</label>

						<label className='flex items-center space-x-3'>
							<input
								type='checkbox'
								className='form-checkbox h-5 w-5'
								checked={preferences.deliveryMethods.inApp}
								onChange={(e) =>
									setPreferences({
										...preferences,
										deliveryMethods: {
											...preferences.deliveryMethods,
											inApp: e.target.checked,
										},
									})
								}
							/>
							<span className='text-gray-700 dark:text-gray-300'>
								In-App Notifications
							</span>
						</label>
					</div>
				</div>

				{/* Notification Types Section */}
				<div>
					<h2 className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4'>
						Notification Types
					</h2>
					<div className='flex flex-col space-y-4'>
						<label className='flex items-center space-x-3'>
							<input
								type='checkbox'
								className='form-checkbox h-5 w-5'
								checked={
									preferences.notificationTypes
										.listInvitations
								}
								onChange={(e) =>
									setPreferences({
										...preferences,
										notificationTypes: {
											...preferences.notificationTypes,
											listInvitations: e.target.checked,
										},
									})
								}
							/>
							<span className='text-gray-700 dark:text-gray-300'>
								List Invitations
							</span>
						</label>

						<label className='flex items-center space-x-3'>
							<input
								type='checkbox'
								className='form-checkbox h-5 w-5'
								checked={
									preferences.notificationTypes.inviteAccepted
								}
								onChange={(e) =>
									setPreferences({
										...preferences,
										notificationTypes: {
											...preferences.notificationTypes,
											inviteAccepted: e.target.checked,
										},
									})
								}
							/>
							<span className='text-gray-700 dark:text-gray-300'>
								Invite Accepted
							</span>
						</label>

						<label className='flex items-center space-x-3'>
							<input
								type='checkbox'
								className='form-checkbox h-5 w-5'
								checked={
									preferences.notificationTypes.taskDueDate
								}
								onChange={(e) =>
									setPreferences({
										...preferences,
										notificationTypes: {
											...preferences.notificationTypes,
											taskDueDate: e.target.checked,
										},
									})
								}
							/>
							<span className='text-gray-700 dark:text-gray-300'>
								Task Due Date Reminders
							</span>
						</label>

						<label className='flex items-center space-x-3'>
							<input
								type='checkbox'
								className='form-checkbox h-5 w-5'
								checked={
									preferences.notificationTypes.taskOverdue
								}
								onChange={(e) =>
									setPreferences({
										...preferences,
										notificationTypes: {
											...preferences.notificationTypes,
											taskOverdue: e.target.checked,
										},
									})
								}
							/>
							<span className='text-gray-700 dark:text-gray-300'>
								Task Overdue Alerts
							</span>
						</label>

						<label className='flex items-center space-x-3'>
							<input
								type='checkbox'
								className='form-checkbox h-5 w-5'
								checked={
									preferences.notificationTypes.taskAssigned
								}
								onChange={(e) =>
									setPreferences({
										...preferences,
										notificationTypes: {
											...preferences.notificationTypes,
											taskAssigned: e.target.checked,
										},
									})
								}
							/>
							<span className='text-gray-700 dark:text-gray-300'>
								Task Assignments
							</span>
						</label>

						<label className='flex items-center space-x-3'>
							<input
								type='checkbox'
								className='form-checkbox h-5 w-5'
								checked={
									preferences.notificationTypes.taskCompleted
								}
								onChange={(e) =>
									setPreferences({
										...preferences,
										notificationTypes: {
											...preferences.notificationTypes,
											taskCompleted: e.target.checked,
										},
									})
								}
							/>
							<span className='text-gray-700 dark:text-gray-300'>
								Task Completions
							</span>
						</label>

						<label className='flex items-center space-x-3'>
							<input
								type='checkbox'
								className='form-checkbox h-5 w-5'
								checked={
									preferences.notificationTypes.listShared
								}
								onChange={(e) =>
									setPreferences({
										...preferences,
										notificationTypes: {
											...preferences.notificationTypes,
											listShared: e.target.checked,
										},
									})
								}
							/>
							<span className='text-gray-700 dark:text-gray-300'>
								List Sharing Updates
							</span>
						</label>
					</div>
				</div>

				{/* Reminder Timing Section */}
				<div>
					<h2 className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4'>
						Reminder Timing
					</h2>
					<FormField label='Send due date reminders'>
						<select
							value={preferences.reminderTiming.beforeDueDate}
							onChange={(e) =>
								setPreferences({
									...preferences,
									reminderTiming: {
										...preferences.reminderTiming,
										beforeDueDate: e.target.value,
									},
								})
							}
							className='mt-1 block w-full px-3 py-3 sm:py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md dark:bg-gray-700 dark:text-white bg-slate-200'
						>
							<option value='0'>On due date</option>
							<option value='1'>1 day before</option>
							<option value='2'>2 days before</option>
							<option value='3'>3 days before</option>
							<option value='7'>1 week before</option>
						</select>
					</FormField>
				</div>

				{/* Save Button */}
				<div className='flex justify-center sm:justify-end mt-6'>
					<button
						onClick={handleSave}
						disabled={isSaving}
						className={`w-full sm:w-auto px-6 py-3 sm:py-2 bg-blue-600 text-white rounded-lg ${
							isSaving
								? 'opacity-50 cursor-not-allowed'
								: 'hover:bg-blue-700'
						}`}
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

				{/* Save Message */}
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

export default NotificationsPage;
