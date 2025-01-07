import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { HiLockClosed, HiFingerPrint } from 'react-icons/hi2';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const SecurityPage = () => {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const { user } = useAuth();
	const { updateUserData } = useUser();
	const { resetPassword } = useAuth();

	const handlePasswordReset = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');

		// Basic validation
		if (newPassword !== confirmPassword) {
			setError('New passwords do not match');
			return;
		}

		if (newPassword.length < 8) {
			setError('Password must be at least 8 characters long');
			return;
		}

		try {
			await resetPassword(currentPassword, newPassword);
			setSuccess('Password updated successfully');
			setCurrentPassword('');
			setNewPassword('');
			setConfirmPassword('');
		} catch (error) {
			setError(error.message || 'Failed to update password');
		}
	};

	return (
		<div className='container mx-auto px-6'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2'>
					<HiLockClosed className='w-6 h-6' />
					Security Settings
				</h1>
			</div>

			<div className='bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6 mb-6'>
				<div className='flex items-center gap-2 mb-4'>
					<HiFingerPrint className='w-5 h-5 text-gray-700 dark:text-gray-300' />
					<h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
						Password Reset
					</h2>
				</div>
				<form
					onSubmit={handlePasswordReset}
					className='space-y-4'
				>
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Current Password
						</label>
						<div className='relative'>
							<input
								type={showCurrentPassword ? 'text' : 'password'}
								value={currentPassword}
								onChange={(e) =>
									setCurrentPassword(e.target.value)
								}
								required
								className='w-full px-3 py-2 bg-slate-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white pr-10'
							/>
							<button
								type='button'
								onClick={() =>
									setShowCurrentPassword(!showCurrentPassword)
								}
								className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
							>
								{showCurrentPassword ? (
									<HiEyeOff className='w-5 h-5' />
								) : (
									<HiEye className='w-5 h-5' />
								)}
							</button>
						</div>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							New Password
						</label>
						<div className='relative'>
							<input
								type={showNewPassword ? 'text' : 'password'}
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								required
								className='w-full px-3 py-2 bg-slate-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white pr-10'
							/>
							<button
								type='button'
								onClick={() =>
									setShowNewPassword(!showNewPassword)
								}
								className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
							>
								{showNewPassword ? (
									<HiEyeOff className='w-5 h-5' />
								) : (
									<HiEye className='w-5 h-5' />
								)}
							</button>
						</div>
						<p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
							Password must be at least 8 characters long
						</p>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Confirm New Password
						</label>
						<div className='relative'>
							<input
								type={showConfirmPassword ? 'text' : 'password'}
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
								required
								className='w-full px-3 py-2 bg-slate-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white pr-10'
							/>
							<button
								type='button'
								onClick={() =>
									setShowConfirmPassword(!showConfirmPassword)
								}
								className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
							>
								{showConfirmPassword ? (
									<HiEyeOff className='w-5 h-5' />
								) : (
									<HiEye className='w-5 h-5' />
								)}
							</button>
						</div>
					</div>

					{error && (
						<div className='p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-400 rounded'>
							{error}
						</div>
					)}
					{success && (
						<div className='p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-500 text-green-700 dark:text-green-400 rounded'>
							{success}
						</div>
					)}

					<button
						type='submit'
						className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors'
					>
						Update Password
					</button>
				</form>
			</div>

			<div className='bg-white dark:bg-gray-800 rounded-lg shadow p-6'>
				<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
					Two-Factor Authentication (Coming Soon)
				</h2>
				<p className='text-gray-600 dark:text-gray-400 mb-4'>
					Enhanced security features including two-factor
					authentication will be available soon.
				</p>
				<button
					disabled
					className='w-full border border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 py-2 px-4 rounded-md cursor-not-allowed bg-gray-50 dark:bg-gray-700'
				>
					Enable 2FA
				</button>
			</div>
		</div>
	);
};

export default SecurityPage;
