import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import axios from 'axios';

export default function ProfilePage() {
    const { user } = useAuth();
    const { userData, userImage, updateUserData } = useUser();
    const [stats, setStats] = useState({
        taskCount: 0,
        noteCount: 0,
        sharedWith: [],
    });
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        photoURL: '',
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                username: userData.username || '',
                email: userData.email || '',
                photoURL: userData.photoURL || '',
            });
            fetchUserStats();
        }
    }, [userData]);

    const fetchUserStats = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_EXPRESS_APP_API_URL}/users/${
                    user.uid
                }/stats`
            );
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching user stats:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserData(formData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className='max-w-full w-full mx-auto'>
            <div className='bg-white dark:bg-gray-800 shadow rounded-lg p-6'>
                <div className='flex items-center justify-between mb-8'>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
                        Profile Settings
                    </h1>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                    >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                {isEditing ? (
                    <form
                        onSubmit={handleSubmit}
                        className='space-y-6'
                    >
                        <div>
                            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                                Username
                            </label>
                            <input
                                type='text'
                                name='username'
                                value={formData.username}
                                onChange={handleInputChange}
                                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                                Profile Picture URL
                            </label>
                            <input
                                type='text'
                                name='photoURL'
                                value={formData.photoURL}
                                onChange={handleInputChange}
                                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600'
                            />
                        </div>
                        <button
                            type='submit'
                            className='w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                        >
                            Save Changes
                        </button>
                    </form>
                ) : (
                    <div className='space-y-8'>
                        <div className='flex items-center space-x-6'>
                            <img
                                src={userImage || userData?.photoURL}
                                alt='Profile'
                                className='w-24 h-24 rounded-full'
                            />
                            <div>
                                <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
                                    {userData?.username ||
                                        userData?.email}
                                </h2>
                                <p className='text-gray-500 dark:text-gray-400'>
                                    {userData?.email}
                                </p>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
                                <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
                                    Tasks
                                </h3>
                                <p className='text-3xl font-bold text-blue-600'>
                                    {stats.taskCount}
                                </p>
                            </div>
                            <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
                                <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
                                    Notes
                                </h3>
                                <p className='text-3xl font-bold text-blue-600'>
                                    {stats.noteCount}
                                </p>
                            </div>
                            <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
                                <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
                                    Shared With
                                </h3>
                                <p className='text-3xl font-bold text-blue-600'>
                                    {stats.sharedWith.length}
                                </p>
                            </div>
                        </div>

                        <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
                            <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-4'>
                                Shared With
                            </h3>
                            <div className='space-y-2'>
                                {stats.sharedWith.map(
                                    (person, index) => (
                                        <div
                                            key={index}
                                            className='flex items-center space-x-2'
                                        >
                                            <img
                                                src={
                                                    person.photoURL ||
                                                    '/default-avatar.png'
                                                }
                                                alt={person.username}
                                                className='w-8 h-8 rounded-full'
                                            />
                                            <span className='text-gray-700 dark:text-gray-300'>
                                                {person.username}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
