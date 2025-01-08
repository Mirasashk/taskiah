import React, { useState } from 'react';
import { useNotificationContext } from '../../context/NotificationContext';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import { FaRegEnvelope } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import InvitesModal from './InvitesModal';

const UserMenu = ({
	userData,
	userImage,
	menuRef,
	setShowUserMenu,
	setShowInviteModal,
	sharedListNotifications,
	showInviteModal,
}) => {
	const { clearUserData } = useUser();
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async (e) => {
		e.stopPropagation();
		try {
			await logout();
			clearUserData();
			setShowUserMenu(false);
			navigate('/');
		} catch (error) {
			console.error('Failed to logout:', error);
		}
	};

	const handleInvitesClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowInviteModal(true);
		setShowUserMenu(false);
	};

	const handleMenuItemClick = (e) => {
		e.stopPropagation();
		setShowUserMenu(false);
	};

	return (
		<div className='relative'>
			<div
				className='absolute z-40 right-0 top-12 w-72 rounded-md shadow-lg py-0 bg-white dark:bg-gray-600 ring-1 ring-black ring-opacity-5'
				ref={menuRef}
				data-menu-item
				onClick={(e) => e.stopPropagation()}
			>
				<div className='ml-4 pt-6 pb-3'>
					<div className='text-gray-600 text-2xl font-medium dark:text-gray-300 flex items-center space-x-2 cursor-pointer'>
						<img
							src={userImage || userData?.photoURL}
							alt='avatar'
							className='w-12 h-12 rounded-full mr-4'
						/>
						{userData.username || userData.email}
					</div>
				</div>
				<div className='text-gray-600 text-sm dark:text-gray-300 flex items-center space-x-2 cursor-pointer mb-2'>
					<hr className='w-[90%] mx-auto border-gray-200' />
				</div>
				{sharedListNotifications.length > 0 && (
					<button
						onClick={handleInvitesClick}
						data-menu-item
						className='block w-full px-4 py-2 text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
					>
						<div className='flex justify-between items-center'>
							<div className='flex items-center space-x-2'>
								<FaRegEnvelope className='w-4 h-4' />
								<div>Invites</div>
							</div>
							<div className='text-gray-600 text-sm dark:text-gray-300'>
								{sharedListNotifications.length}
							</div>
						</div>
					</button>
				)}
				<Link
					to='/settings/profile'
					onClick={handleMenuItemClick}
					data-menu-item
					className='block px-4 py-2 text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
				>
					<div className='flex items-center space-x-2'>
						<FiUser className='w-4 h-4' />
						<div>Profile</div>
					</div>
				</Link>
				<Link
					to='/settings/preferences'
					onClick={handleMenuItemClick}
					data-menu-item
					className='block px-4 py-2 text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
				>
					<div className='flex items-center space-x-2'>
						<FiSettings className='w-4 h-4' />
						<div>Settings</div>
					</div>
				</Link>
				<button
					onClick={handleLogout}
					data-menu-item
					className='block w-full text-left px-4 py-2 text-lg rounded-b-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
				>
					<div className='flex items-center space-x-2'>
						<FiLogOut className='w-4 h-4' />
						<div>Sign out</div>
					</div>
				</button>
			</div>
		</div>
	);
};

export default UserMenu;
