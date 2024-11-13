import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className='bg-white shadow-sm'>
            <nav className='container mx-auto px-4 py-3'>
                <div className='flex items-center justify-between'>
                    {/* Logo */}
                    <div className='flex items-center'>
                        <Link
                            to='/'
                            className='text-xl font-bold text-gray-800'
                        >
                            TodoApp
                        </Link>
                    </div>

                    {/* Navigation Items */}
                    <div className='hidden md:flex items-center space-x-8'>
                        <Link
                            to='/'
                            className='text-gray-600 hover:text-gray-900'
                        >
                            Home
                        </Link>
                        <Link
                            to='/todos'
                            className='text-gray-600 hover:text-gray-900'
                        >
                            Todos
                        </Link>
                        <Link
                            to='/about'
                            className='text-gray-600 hover:text-gray-900'
                        >
                            About
                        </Link>
                    </div>

                    {/* Auth & Theme Toggle */}
                    <div className='flex items-center space-x-4'>
                        <button className='px-4 py-2 text-gray-600 hover:text-gray-900'>
                            Login
                        </button>
                        <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
                            Sign Up
                        </button>

                        {/* Theme Toggle */}
                        <button className='p-2 text-gray-600 hover:text-gray-900'>
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
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
