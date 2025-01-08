import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';

export default function LoginPage() {
	const navigate = useNavigate();
	const { login, signInWithGoogle, signInWithGithub, signInWithMicrosoft } =
		useAuth();
	const { updateUserData } = useUser();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			const auth = await login(formData.email, formData.password);
			await updateUserData(auth.user.uid);
			navigate('/');
		} catch (err) {
			setError('Failed to sign in: ' + err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSocialLogin = async (socialMethod) => {
		try {
			setError('');
			setLoading(true);
			const auth = await socialMethod();
			await updateUserData(auth.user.uid);
			navigate('/');
		} catch (err) {
			setError('Failed to sign in: ' + err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='bg-gray-50 dark:bg-gray-900  flex-col justify-center px-6 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white'>
					Sign in to your account
				</h2>
			</div>

			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-white dark:bg-gray-800 py-8 px-4 shadow rounded-lg sm:px-10'>
					{error && (
						<div className='mb-4 p-2 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 rounded'>
							{error}
						</div>
					)}

					<form
						onSubmit={handleSubmit}
						className='space-y-6'
					>
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-700 dark:text-gray-200'
							>
								Email address
							</label>
							<div className='mt-1'>
								<input
									id='email'
									name='email'
									type='email'
									autoComplete='email'
									required
									value={formData.email}
									onChange={handleChange}
									className='appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500'
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-gray-700 dark:text-gray-200'
							>
								Password
							</label>
							<div className='mt-1'>
								<input
									id='password'
									name='password'
									type='password'
									autoComplete='current-password'
									required
									value={formData.password}
									onChange={handleChange}
									className='appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500'
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								disabled={loading}
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 dark:focus:ring-offset-gray-800'
							>
								{loading ? 'Signing in...' : 'Sign in'}
							</button>
						</div>
					</form>

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

						<div className='mt-6 grid grid-cols-3 gap-3'>
							<button
								onClick={() =>
									handleSocialLogin(signInWithGoogle)
								}
								disabled={loading}
								className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
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
								disabled={loading}
								className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
							>
								<img
									className='h-5 w-5'
									src='https://www.svgrepo.com/show/512317/microsoft-176.svg'
									alt='Microsoft logo'
								/>
							</button>

							<button
								onClick={() =>
									handleSocialLogin(signInWithGithub)
								}
								disabled={loading}
								className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
							>
								<img
									className='h-5 w-5'
									src='https://www.svgrepo.com/show/512317/github-142.svg'
									alt='GitHub logo'
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
