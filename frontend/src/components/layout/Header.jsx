import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function Header() {
    const { isDarkMode, toggleTheme } = useTheme();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <header className='bg-white dark:bg-gray-800 shadow-sm'>
            <nav className='container mx-auto px-4 py-3'>
                <div className='flex items-center justify-between'>
                    {/* Logo */}
                    <div className='flex items-center'>
                        <Link
                            to='/'
                            className='text-xl font-bold text-gray-800 dark:text-white'
                        >
                            TodoApp
                        </Link>
                    </div>

                    {/* Navigation Items */}
                    <div className='hidden md:flex items-center space-x-8'>
                        <Link
                            to='/'
                            className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                        >
                            Home
                        </Link>
                        <Link
                            to='/todos'
                            className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                        >
                            Todos
                        </Link>
                        <Link
                            to='/notes'
                            className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                        >
                            Notes
                        </Link>
                    </div>

                    {/* Auth & Theme Toggle */}
                    <div className='flex items-center space-x-4'>
                        {user ? (
                            <>
                                <span className='text-gray-600 dark:text-gray-300'>
                                    {user.displayName || user.email}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className='px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to='/login'
                                    className='px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                                >
                                    Login
                                </Link>
                                <Link
                                    to='/signup'
                                    className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className='p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                        >
                            {isDarkMode ? (
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-6 w-6'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-6 w-6'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
