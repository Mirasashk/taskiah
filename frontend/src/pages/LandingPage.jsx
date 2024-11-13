import React from 'react';

const LandingPage = () => {
    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Hero Section */}
            <div className='container mx-auto px-4 py-16'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
                    <div className='md:w-1/2'>
                        <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
                            Organize Your Tasks with Ease
                        </h1>
                        <p className='text-xl text-gray-600 mb-8'>
                            Simple, intuitive, and powerful todo
                            management to help you stay productive and
                            focused.
                        </p>
                        <div className='flex gap-4'>
                            <a
                                href='/todos'
                                className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                            >
                                Get Started
                            </a>
                            <a
                                href='#learn-more'
                                className='px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors'
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                    <div className='md:w-1/2'>
                        {/* Placeholder for hero image */}
                        <img
                            src='https://via.placeholder.com/600x400'
                            alt='Task Management Illustration'
                            className='rounded-lg shadow-lg'
                        />
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className='bg-white py-16'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-center mb-12'>
                        Key Features
                    </h2>
                    <div className='grid md:grid-cols-3 gap-8'>
                        <div className='p-6 bg-gray-50 rounded-lg'>
                            {/* Feature 1 icon placeholder */}
                            <img
                                src='https://via.placeholder.com/64'
                                alt='Simple Interface'
                                className='mb-4'
                            />
                            <h3 className='text-xl font-semibold mb-2'>
                                Simple Interface
                            </h3>
                            <p className='text-gray-600'>
                                Clean and intuitive design that helps
                                you focus on what matters.
                            </p>
                        </div>
                        <div className='p-6 bg-gray-50 rounded-lg'>
                            {/* Feature 2 icon placeholder */}
                            <img
                                src='https://via.placeholder.com/64'
                                alt='Quick Actions'
                                className='mb-4'
                            />
                            <h3 className='text-xl font-semibold mb-2'>
                                Quick Actions
                            </h3>
                            <p className='text-gray-600'>
                                Add, complete, and manage tasks with
                                just a few clicks.
                            </p>
                        </div>
                        <div className='p-6 bg-gray-50 rounded-lg'>
                            {/* Feature 3 icon placeholder */}
                            <img
                                src='https://via.placeholder.com/64'
                                alt='Progress Tracking'
                                className='mb-4'
                            />
                            <h3 className='text-xl font-semibold mb-2'>
                                Progress Tracking
                            </h3>
                            <p className='text-gray-600'>
                                Keep track of your completed tasks and
                                stay motivated.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
