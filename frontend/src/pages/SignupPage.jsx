import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { userService } from '../services/userApi';
import FormField from '../components/forms/FormField';
import Input from '../components/forms/Input';
import { getAvatarURL } from '../utils/UserPhoto';
import { useUser } from '../context/UserContext';

// Move AvatarSelection to a separate component
const AvatarSelection = ({ onSelect, selectedAvatar, avatars }) => (
	<div className='mt-6'>
		<div className='text-center mb-4 text-gray-700 dark:text-gray-300 font-medium'>
			Choose your avatar
		</div>
		<div className='flex flex-wrap gap-4 w-full justify-center'>
			{avatars.map((url, index) => (
				<button
					type='button'
					key={index}
					onClick={() => onSelect(url.path)}
					className={`relative p-1 rounded-full transition-all duration-200 
                        ${
							selectedAvatar === url
								? 'ring-2 ring-blue-500 dark:ring-blue-400 scale-110'
								: 'hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600 hover:scale-105'
						}`}
				>
					<img
						className='w-20 h-20 rounded-full object-cover'
						src={url.url}
						alt={`Avatar ${index + 1}`}
						loading='lazy'
					/>
					{selectedAvatar === url && (
						<div className='absolute inset-0 rounded-full bg-blue-500 bg-opacity-20 dark:bg-opacity-40 flex items-center justify-center'>
							<div className='bg-blue-500 rounded-full p-1'>
								<svg
									className='w-4 h-4 text-white'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M5 13l4 4L19 7'
									/>
								</svg>
							</div>
						</div>
					)}
				</button>
			))}
		</div>
	</div>
);

export default function SignupPage() {
	const navigate = useNavigate();
	const { updateUserData } = useUser();
	const { isDarkMode } = useTheme();
	const { signup, signInWithGoogle, signInWithGithub, signInWithMicrosoft } =
		useAuth();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		id: '',
		email: '',
		firstName: '',
		lastName: '',
		username: '',
		password: '',
		confirmPassword: '',
		photoURL: '',
	});
	const [avatars, setAvatars] = useState([]);
	const [selectedAvatar, setSelectedAvatar] = useState(null);
	const [avatarsLoaded, setAvatarsLoaded] = useState(false);

	useEffect(() => {
		const loadAvatars = async () => {
			if (!avatarsLoaded) {
				try {
					const urls = await getAvatarURL();
					setAvatars(urls);
					setAvatarsLoaded(true);
				} catch (error) {
					console.error('Error loading avatars:', error);
				}
			}
		};
		loadAvatars();
	}, [avatarsLoaded]); // Only depend on avatarsLoaded

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			return setError('Passwords do not match');
		}

		try {
			setError('');
			setLoading(true);
			const auth = await signup(formData.email, formData.password);

			const userData = {
				...formData,
				id: auth.user.uid,
			};

			try {
				await userService.createUser(userData);
				await updateUserData(auth.user.uid);
				navigate('/');
			} catch (err) {
				await auth.user.delete();
				setError(
					'Failed to create user in database. Please try again.'
				);
			}
		} catch (err) {
			setError('Failed to create an account: ' + err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSocialLogin = async (socialMethod) => {
		try {
			setError('');
			setLoading(true);
			await socialMethod();
			navigate('/tasks');
		} catch (err) {
			setError('Failed to sign in: ' + err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleAvatarSelect = (url) => {
		setSelectedAvatar(url);
		setFormData((prev) => ({
			...prev,
			photoURL: url,
			extraInfo: {
				preferences: {
					theme: isDarkMode ? 'dark' : 'light',
				},
			},
		}));
	};

	return (
		<div className='bg-gray-50 dark:bg-gray-900  flex-col justify-center sm:px-6 lg:px-8 pb-16'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<h2 className='text-center text-3xl font-extrabold text-gray-900 dark:text-white'>
					Create your account
				</h2>
			</div>

			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					{error && (
						<div className='mb-4 p-2 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 rounded'>
							{error}
						</div>
					)}

					<div className='mt-6 grid grid-cols-3 gap-3'>
						<button
							onClick={() => handleSocialLogin(signInWithGoogle)}
							className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
							disabled={loading}
						>
							<img
								className='h-5 w-5'
								src='https://www.svgrepo.com/show/475656/google-color.svg'
								alt='Google logo'
							/>
						</button>

						<button
							onClick={() =>
								handleSocialLogin(signInWithMicrosoft)
							}
							className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
							disabled={loading}
						>
							<img
								className='h-5 w-5'
								src='https://www.svgrepo.com/show/512317/microsoft-176.svg'
								alt='Microsoft logo'
							/>
						</button>

						<button
							onClick={() => handleSocialLogin(signInWithGithub)}
							className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
							disabled={loading}
						>
							<img
								className='h-5 w-5'
								src='https://www.svgrepo.com/show/512317/github-142.svg'
								alt='GitHub logo'
							/>
						</button>
					</div>

					<div className='mt-6'>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-gray-300 dark:border-gray-600' />
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400'>
									Or continue with
								</span>
							</div>
						</div>
					</div>

					<form
						onSubmit={handleSubmit}
						className='space-y-6 mt-6'
					>
						<FormField label='First Name'>
							<Input
								id='firstName'
								name='firstName'
								type='text'
								required
								value={formData.firstName}
								onChange={handleChange}
							/>
						</FormField>

						<FormField label='Last Name'>
							<Input
								id='lastName'
								name='lastName'
								type='text'
								required
								value={formData.lastName}
								onChange={handleChange}
							/>
						</FormField>

						<FormField label='Email address'>
							<Input
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								required
								value={formData.email}
								onChange={handleChange}
							/>
						</FormField>

						<FormField label='Username'>
							<Input
								id='username'
								name='username'
								type='text'
								autoComplete='username'
								required
								value={formData.username}
								onChange={handleChange}
							/>
						</FormField>

						<FormField label='Password'>
							<Input
								id='password'
								name='password'
								type='password'
								required
								value={formData.password}
								onChange={handleChange}
							/>
						</FormField>

						<FormField label='Confirm Password'>
							<Input
								id='confirmPassword'
								name='confirmPassword'
								type='password'
								required
								value={formData.confirmPassword}
								onChange={handleChange}
							/>
						</FormField>

						{/* Pick an avatar */}

						<div className='flex flex-col justify-center'>
							<AvatarSelection
								onSelect={handleAvatarSelect}
								selectedAvatar={selectedAvatar}
								avatars={avatars}
							/>
						</div>

						<div>
							<button
								type='submit'
								disabled={loading || !selectedAvatar}
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 disabled:opacity-50'
							>
								{loading ? 'Signing up...' : 'Sign up'}
							</button>
						</div>

						<div className='text-sm text-center'>
							<Link
								to='/login'
								className='font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300'
							>
								Already have an account? Log in
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
