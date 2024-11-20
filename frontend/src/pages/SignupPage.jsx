import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/api';

export default function SignupPage() {
    const navigate = useNavigate();
    const {
        signup,
        signInWithGoogle,
        signInWithGithub,
        signInWithMicrosoft,
    } = useAuth();
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
    });

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
            const auth = await signup(
                formData.email,
                formData.password
            );

            const userData = {
                ...formData,
                id: auth.user.uid,
            };

            try {
                await userService.createUser(userData);
                navigate('/dashboard');
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
            navigate('/todos');
        } catch (err) {
            setError('Failed to sign in: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900 mt-24 flex-col justify-center py-12 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white'>
                    Create your account
                </h2>
            </div>

            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                    {error && (
                        <div className='mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded'>
                            {error}
                        </div>
                    )}

                    <div className='mt-6 grid grid-cols-3 gap-3'>
                        <button
                            onClick={() =>
                                handleSocialLogin(signInWithGoogle)
                            }
                            className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
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
                            className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                            disabled={loading}
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
                            className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
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
                                <div className='w-full border-t border-gray-300' />
                            </div>
                            <div className='relative flex justify-center text-sm'>
                                <span className='px-2 bg-white text-gray-500'>
                                    Or continue with
                                </span>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className='space-y-6 mt-6'
                    >
                        <div>
                            <label
                                htmlFor='firstName'
                                className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                            >
                                First Name
                            </label>
                            <input
                                id='firstName'
                                name='firstName'
                                type='text'
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                className='mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                            />
                        </div>

                        <div>
                            <label
                                htmlFor='lastName'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Last Name
                            </label>
                            <div className='mt-1'>
                                <input
                                    id='lastName'
                                    name='lastName'
                                    type='text'
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Email address
                            </label>
                            <div className='mt-1'>
                                <input
                                    id='email'
                                    name='email'
                                    type='email'
                                    autoComplete='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor='username'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Username
                            </label>
                            <div className='mt-1'>
                                <input
                                    id='username'
                                    name='username'
                                    type='username'
                                    autoComplete='username'
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor='password'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Password
                            </label>
                            <div className='mt-1'>
                                <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor='confirmPassword'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Confirm Password
                            </label>
                            <div className='mt-1'>
                                <input
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    type='password'
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                disabled={loading}
                                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
                            >
                                {loading
                                    ? 'Signing up...'
                                    : 'Sign up'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
