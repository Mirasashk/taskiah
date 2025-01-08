import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { HiLockClosed, HiFingerPrint } from 'react-icons/hi2';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import FormField from '../../components/forms/FormField';
import Input from '../../components/forms/Input';

const SecurityPage = () => {
	const [formData, setFormData] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });
	const { user } = useAuth();
	const { updateUserData } = useUser();
	const { resetPassword } = useAuth();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handlePasswordReset = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');

		// Basic validation
		if (formData.newPassword !== formData.confirmPassword) {
			setError('New passwords do not match');
			return;
		}

		if (formData.newPassword.length < 8) {
			setError('Password must be at least 8 characters long');
			return;
		}

		try {
			await resetPassword(formData.currentPassword, formData.newPassword);
			setSuccess('Password updated successfully');
			setFormData({
				currentPassword: '',
				newPassword: '',
				confirmPassword: '',
			});
		} catch (error) {
			setError(error.message || 'Failed to update password');
		}
	};

	const handle2FAToggle = () => {
		// Implement 2FA toggle functionality
	};

	const handleLogoutAllDevices = () => {
		// Implement logout all devices functionality
	};

	return (
		<div className='container mx-auto px-4 sm:px-6'>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6'>
				<h1 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0'>
					Security Settings
				</h1>
			</div>

			<div className='bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 space-y-4 sm:space-y-6'>
				<div>
					<h2 className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4'>
						Change Password
					</h2>
					<div className='space-y-4'>
						<FormField label='Current Password'>
							<Input
								type='password'
								name='currentPassword'
								value={formData.currentPassword}
								onChange={handleInputChange}
								className='w-full'
							/>
						</FormField>
						<FormField label='New Password'>
							<Input
								type='password'
								name='newPassword'
								value={formData.newPassword}
								onChange={handleInputChange}
								className='w-full'
							/>
						</FormField>
						<FormField label='Confirm New Password'>
							<Input
								type='password'
								name='confirmPassword'
								value={formData.confirmPassword}
								onChange={handleInputChange}
								className='w-full'
							/>
						</FormField>

						{error && (
							<div className='p-2 sm:p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-400 rounded text-sm sm:text-base'>
								{error}
							</div>
						)}
						{success && (
							<div className='p-2 sm:p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-500 text-green-700 dark:text-green-400 rounded text-sm sm:text-base'>
								{success}
							</div>
						)}

						<div className='flex justify-end'>
							<button
								onClick={handlePasswordReset}
								className='w-full sm:w-auto px-6 py-3 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
							>
								Update Password
							</button>
						</div>
					</div>
				</div>

				<div>
					<h2 className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4'>
						Two-Factor Authentication (Coming Soon)
					</h2>
					<div className='space-y-4'>
						<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
							<div>
								<p className='text-gray-700 dark:text-gray-300'>
									Add an extra layer of security to your
									account
								</p>
								<p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
									Enhanced security features including
									two-factor authentication will be available
									soon.
								</p>
							</div>
							<button
								disabled
								className='w-full sm:w-auto px-6 py-3 sm:py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed'
							>
								Enable 2FA
							</button>
						</div>
					</div>
				</div>

				<div>
					<h2 className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4'>
						Active Sessions
					</h2>
					<div className='space-y-4'>
						<div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4'>
							<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
								<div>
									<p className='text-gray-700 dark:text-gray-300'>
										Current Session
									</p>
									<p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
										Last active: Just now
									</p>
								</div>
								<button
									onClick={handleLogoutAllDevices}
									className='w-full sm:w-auto px-6 py-3 sm:py-2 text-red-600 bg-red-100 rounded-lg hover:bg-red-200'
								>
									Logout All Devices
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SecurityPage;
