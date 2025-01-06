import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import FormField from '../../components/forms/FormField';
import { userService } from '../../services/userApi';

const PreferencesPage = () => {
	const { theme, updateTheme } = useTheme();
	const { userData } = useUser();
	const [isSaving, setIsSaving] = useState(false);
	const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });

	const fontFamilies = [
		{ label: 'System UI', value: 'system-ui' },
		{ label: 'Roboto', value: 'Roboto' },
		{ label: 'Open Sans', value: 'Open Sans' },
		{ label: 'Montserrat', value: 'Montserrat' },
		{ label: 'Lato', value: 'Lato' },
	];

	const fontSizes = [
		{ label: 'Small', value: 'small' },
		{ label: 'Medium', value: 'medium' },
		{ label: 'Large', value: 'large' },
	];

	const handleSave = async () => {
		setIsSaving(true);
		setSaveMessage({ type: '', text: '' });

		try {
			await userService.updateUserPreferences(userData.id, {
				theme: {
					mode: theme.mode,
					fontFamily: theme.fontFamily,
					fontSize: theme.fontSize,
				},
			});

			setSaveMessage({
				type: 'success',
				text: 'Theme preferences saved successfully!',
			});

			// Clear success message after 3 seconds
			setTimeout(() => {
				setSaveMessage({ type: '', text: '' });
			}, 3000);
		} catch (error) {
			console.error('Error saving theme preferences:', error);
			setSaveMessage({
				type: 'error',
				text: 'Failed to save theme preferences. Please try again.',
			});
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<div className='container mx-auto px-6'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
					Theme Preferences
				</h1>
			</div>

			<div className='bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6'>
				{/* Theme Mode */}
				<FormField label='Theme Mode'>
					<div className='flex gap-4'>
						<label className='inline-flex items-center'>
							<input
								type='radio'
								className='form-radio'
								name='themeMode'
								value='light'
								checked={theme.mode === 'light'}
								onChange={(e) =>
									updateTheme({ mode: e.target.value })
								}
							/>
							<span className='ml-2 text-gray-700 dark:text-gray-300'>
								Light
							</span>
						</label>
						<label className='inline-flex items-center'>
							<input
								type='radio'
								className='form-radio'
								name='themeMode'
								value='dark'
								checked={theme.mode === 'dark'}
								onChange={(e) =>
									updateTheme({ mode: e.target.value })
								}
							/>
							<span className='ml-2 text-gray-700 dark:text-gray-300'>
								Dark
							</span>
						</label>
					</div>
				</FormField>

				{/* Font Family */}
				<FormField label='Font Family'>
					<select
						className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white 
						bg-slate-200'
						value={theme.fontFamily}
						onChange={(e) =>
							updateTheme({ fontFamily: e.target.value })
						}
					>
						{fontFamilies.map((font) => (
							<option
								key={font.value}
								value={font.value}
							>
								{font.label}
							</option>
						))}
					</select>
				</FormField>

				{/* Font Size */}
				<FormField label='Font Size'>
					<div className='flex gap-4'>
						{fontSizes.map((size) => (
							<label
								key={size.value}
								className='inline-flex items-center'
							>
								<input
									type='radio'
									className='form-radio'
									name='fontSize'
									value={size.value}
									checked={theme.fontSize === size.value}
									onChange={(e) =>
										updateTheme({
											fontSize: e.target.value,
										})
									}
								/>
								<span className='ml-2 text-gray-700 dark:text-gray-300'>
									{size.label}
								</span>
							</label>
						))}
					</div>
				</FormField>

				<div className='flex justify-end'>
					<button
						onClick={handleSave}
						disabled={isSaving}
						className={`px-4 py-2 bg-blue-600 text-white rounded-lg
								${isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
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
						className={`mb-4 p-4 rounded-lg ${
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

export default PreferencesPage;
