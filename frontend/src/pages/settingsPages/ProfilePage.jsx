import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import Input from '../../components/forms/Input';
import FormField from '../../components/forms/FormField';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import {
    SUPPORTED_IMAGE_TYPES,
    createImageUploadHandler,
} from '../../utils/imageUpload';

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
        firstName: '',
        username: '',
        email: '',
        photoURL: '',
    });
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (userData) {
            setFormData({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                username: userData.username || '',
                email: userData.email || '',
                photoURL: userData.photoURL || '',
            });
            //fetchUserStats();
        }
    }, [userData]);

    // const fetchUserStats = async () => {
    //     try {
    //         const response = await axios.get(
    //             `${import.meta.env.VITE_EXPRESS_APP_API_URL}/users/${
    //                 user.uid
    //             }/stats`
    //         );
    //         setStats(response.data);
    //     } catch (error) {
    //         console.error('Error fetching user stats:', error);
    //     }
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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

    const handleImageUploadSuccess = ({ filePath, downloadURL }) => {
        console.log('Image uploaded successfully:', {
            filePath,
            downloadURL,
        });
    };

    const handleImageUploadError = (error) => {
        console.error('Error uploading image:', error);
        alert(error.message);
    };

    const handleImageUpload = createImageUploadHandler(
        handleImageUploadSuccess,
        handleImageUploadError,
        'users',
        userData?.id,
        updateUserData
    );

    const handleImageClick = () => {
        if (!isUploading) {
            fileInputRef.current?.click();
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

                <div className='space-y-8'>
                    <div className='flex items-center space-x-6'>
                        <div className='p-2'>
                            <div className='relative'>
                                <input
                                    type='file'
                                    ref={fileInputRef}
                                    onChange={(e) => {
                                        setIsUploading(true);
                                        handleImageUpload(e).finally(
                                            () =>
                                                setIsUploading(false)
                                        );
                                    }}
                                    accept={Object.keys(
                                        SUPPORTED_IMAGE_TYPES
                                    ).join(',')}
                                    className='hidden'
                                />
                                <HiOutlinePencilSquare
                                    onClick={handleImageClick}
                                    className={`absolute top-0 right-0 w-6 h-6 
                                        text-gray-500 dark:text-gray-200 
                                        hover:text-gray-700 dark:hover:text-gray-400 
                                        stroke-2 cursor-pointer
                                        ${
                                            isUploading
                                                ? 'opacity-50 cursor-not-allowed'
                                                : ''
                                        }`}
                                />
                                {isUploading && (
                                    <div className='absolute top-0 right-0 w-6 h-6 flex items-center justify-center'>
                                        <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 dark:border-white'></div>
                                    </div>
                                )}
                            </div>
                            <img
                                src={userImage || userData?.photoURL}
                                alt='Profile'
                                className='w-24 h-24 rounded-full'
                            />
                        </div>
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
                    <div className='grid grid-cols-3  space-x-6'>
                        <div className='grid col-span-2'>
                            <div className='flex justify-between w-full bg-gray-200 dark:bg-gray-700 p-4 rounded-lg'>
                                <div className='grid grid-flow-row w-full grid-cols-1 gap-6'>
                                    <FormField label='First Name'>
                                        <Input
                                            name='firstName'
                                            value={
                                                isEditing
                                                    ? formData.firstName
                                                    : userData?.firstName ||
                                                      ''
                                            }
                                            onChange={
                                                handleInputChange
                                            }
                                            disabled={!isEditing}
                                        />
                                    </FormField>
                                    <FormField label='Last Name'>
                                        <Input
                                            name='lastName'
                                            value={
                                                isEditing
                                                    ? formData.lastName
                                                    : userData?.lastName ||
                                                      ''
                                            }
                                            onChange={
                                                handleInputChange
                                            }
                                            disabled={!isEditing}
                                        />
                                    </FormField>

                                    <FormField label='Username'>
                                        <Input
                                            name='username'
                                            value={
                                                isEditing
                                                    ? formData.username
                                                    : userData?.username
                                            }
                                            onChange={
                                                handleInputChange
                                            }
                                            disabled={!isEditing}
                                        />
                                    </FormField>

                                    <FormField label='Email'>
                                        <Input
                                            type='email'
                                            name='email'
                                            value={
                                                isEditing
                                                    ? formData.email
                                                    : userData?.email
                                            }
                                            onChange={
                                                handleInputChange
                                            }
                                            disabled={!isEditing}
                                        />
                                    </FormField>

                                    {isEditing && (
                                        <div className='flex justify-end space-x-4 mt-4'>
                                            <button
                                                onClick={() => {
                                                    setIsEditing(
                                                        false
                                                    );
                                                    setFormData({
                                                        firstName:
                                                            userData?.firstName ||
                                                            '',
                                                        username:
                                                            userData?.username ||
                                                            '',
                                                        email:
                                                            userData?.email ||
                                                            '',
                                                        photoURL:
                                                            userData?.photoURL ||
                                                            '',
                                                    });
                                                }}
                                                className='px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500'
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSubmit}
                                                className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='grid col-span-1'>
                            <div className='grid grid-flow-row grid-cols-1 gap-6'>
                                <div className='flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-4 rounded-lg'>
                                    <h3 className='text-lg font-medium text-gray-900 dark:text-white'>
                                        Tasks
                                    </h3>
                                    <p className='text-3xl font-bold text-blue-600'>
                                        {stats.taskCount}
                                    </p>
                                </div>
                                <div className='flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-4 rounded-lg'>
                                    <h3 className='text-lg font-medium text-gray-900 dark:text-white '>
                                        Notes
                                    </h3>
                                    <p className='text-3xl font-bold text-blue-600'>
                                        {stats.noteCount}
                                    </p>
                                </div>
                                <div className='flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-4 rounded-lg'>
                                    <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
                                        Shared With
                                    </h3>
                                    <p className='text-3xl font-bold text-blue-600'>
                                        {stats.sharedWith.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='bg-gray-200 dark:bg-gray-700 p-4 rounded-lg'>
                        <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-4'>
                            Shared With
                        </h3>
                        <div className='space-y-2'>
                            {stats.sharedWith.map((person, index) => (
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
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
