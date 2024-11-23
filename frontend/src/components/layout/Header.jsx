import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import TaskiahLogo from '../../assets/TaskiahLogo';

export default function Header() {
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const { userData, userImage, clearUserData } = useUser();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const menuRef = useRef(null);

    // Add click outside handler
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !event.target.closest('[data-user-display]')
            ) {
                setShowUserMenu(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            );
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            clearUserData();
            navigate('/');
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    const userMenuDisplay = showUserMenu ? (
        <div className='relative'>
            <div
                className='absolute right-0 top-12 w-48 rounded-md shadow-lg py-0 bg-white dark:bg-gray-600 ring-1 ring-black ring-opacity-5'
                ref={menuRef}
            >
                <div className='ml-4 pt-6 pb-3'>
                    <div className='text-gray-600 text-xl font-medium dark:text-gray-300 flex items-center space-x-2 cursor-pointer'>
                        <img
                            src={userImage || userData?.photoURL}
                            alt='avatar'
                            className='w-6 h-6 rounded-full mr-4'
                        />
                        {userData.username || userData.email}
                    </div>
                </div>
                <div className='text-gray-600 text-sm dark:text-gray-300 flex items-center space-x-2 cursor-pointer mb-2'>
                    <hr className='w-[90%] mx-auto border-gray-200' />
                </div>
                <Link
                    to='/settings/profile'
                    onClick={() => setShowUserMenu(false)}
                    className='block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                >
                    Profile
                </Link>
                <Link
                    to='/settings/preferences'
                    onClick={() => setShowUserMenu(false)}
                    className='block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                >
                    Settings
                </Link>
                <button
                    onClick={() => {
                        setShowUserMenu(false);
                        handleLogout();
                    }}
                    className='block w-full text-left px-4 py-2 text-sm rounded-b-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                >
                    Sign out
                </button>
            </div>
        </div>
    ) : null;

    const userDisplay = userData ? (
        <div className='relative'>
            {userMenuDisplay}
            <div
                data-user-display
                onClick={(e) => {
                    e.stopPropagation();
                    setShowUserMenu(!showUserMenu);
                }}
                className='text-gray-600 dark:text-gray-300 flex items-center gap-2 cursor-pointer'
            >
                <img
                    src={userImage || userData?.photoURL}
                    alt='avatar'
                    className='w-8 h-8 rounded-full'
                />
                {userData.username || userData.email}
            </div>
        </div>
    ) : null;

    const navigationLinks = user ? (
        // Authenticated user links
        <>
            <Link
                to='/dashboard'
                className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            >
                Home
            </Link>
            <Link
                to='/tasks'
                className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            >
                tasks
            </Link>
            <Link
                to='/notes'
                className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            >
                Notes
            </Link>
        </>
    ) : (
        // Non-authenticated user links
        <>
            <Link
                to='/'
                className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            >
                Home
            </Link>
            <Link
                to='/features'
                className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            >
                Features
            </Link>
            <Link
                to='/pricing'
                className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            >
                Pricing
            </Link>
        </>
    );

    return (
        <header className='bg-white dark:bg-gray-800 shadow-sm'>
            <nav className='container mx-auto px-4 py-3'>
                <div className='grid grid-cols-4 w-full items-center'>
                    {/* Logo */}
                    <div className='flex col-span-1 justify-center items-center'>
                        <Link
                            to='/'
                            className='text-xl font-bold text-gray-800 dark:text-white'
                        >
                            <TaskiahLogo className='w-36 h-12 text-gray-800 dark:text-white' />
                        </Link>
                    </div>

                    {/* Navigation Items */}
                    <div className='hidden col-span-2 md:flex items-center justify-center space-x-8'>
                        {navigationLinks}
                    </div>

                    {/* Auth & Theme Toggle */}
                    <div className='flex col-span-1 items-center justify-center space-x-4'>
                        {user && userDisplay}
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className='px-4 py-2 dark:bg-gray-200 rounded-lg bg-gray-700 text-gray-300 dark:text-gray-700 hover:text-gray-900 dark:hover:text-white'
                            >
                                Sign Out
                            </button>
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
