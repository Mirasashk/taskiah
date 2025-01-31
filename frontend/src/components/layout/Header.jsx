import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import TaskiahLogo from '../../assets/TaskiahLogo';
import UserMenu from '../header/userMenu';
import InvitesModal from '../header/InvitesModal';
import { useNotificationContext } from '../../context/NotificationContext';
import { GoSun } from 'react-icons/go';
import { GoMoon } from 'react-icons/go';
import MobileDrawer from '../navigation/MobileDrawer';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function Header() {
	const navigate = useNavigate();
	const { theme, updateTheme } = useTheme();
	const { user, logout } = useAuth();
	const { userData, userImage, clearUserData } = useUser();
	const [showUserMenu, setShowUserMenu] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const menuRef = useRef(null);
	const [showInviteModal, setShowInviteModal] = useState(false);
	const { sharedListNotifications } = useNotificationContext();

	// Add click outside handler
	useEffect(() => {
		function handleClickOutside(event) {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target) &&
				!event.target.closest('[data-user-display]') &&
				!event.target.closest('[data-menu-item]')
			) {
				setShowUserMenu(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
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

	const toggleTheme = () => {
		updateTheme({ mode: theme.mode === 'dark' ? 'light' : 'dark' });
	};

	const userMenuDisplay = showUserMenu ? (
		<UserMenu
			userData={userData}
			userImage={userImage}
			menuRef={menuRef}
			setShowUserMenu={setShowUserMenu}
			setShowInviteModal={setShowInviteModal}
			sharedListNotifications={sharedListNotifications}
			showInviteModal={showInviteModal}
		/>
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
				<div className='flex w-20 justify-end'>
					<img
						src={userImage || userData?.photoURL}
						alt='avatar'
						className='w-8 h-8 rounded-full'
					/>
				</div>
				<span className='hidden md:inline'>
					{userData.username || userData.email}
				</span>
			</div>
		</div>
	) : null;

	const navigationLinks = user ? (
		// Authenticated user links
		<>
			<Link
				to='/'
				className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
			>
				Home
			</Link>
			<Link
				to='/tasks'
				className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
			>
				Tasks
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

	// Mobile Header
	const mobileHeader = (
		<div className='md:hidden w-full'>
			<div className='flex items-center justify-between px-4 py-3'>
				{/* Left: Burger Menu */}
				<div className='w-20'>
					<button
						onClick={() => setIsDrawerOpen(true)}
						className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700'
						aria-label='Open menu'
					>
						<RxHamburgerMenu className='w-6 h-6 text-gray-600 dark:text-gray-300' />
					</button>
				</div>

				{/* Center: Logo */}
				<Link
					to='/'
					className='flex items-center'
				>
					<TaskiahLogo className='w-28 h-8 text-gray-800 dark:text-white' />
				</Link>

				{/* Right: Login/User */}
				{user ? (
					userDisplay
				) : (
					<div className='w-20'>
						<Link
							to='/login'
							className='px-4 py-2 w-20 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
						>
							Login
						</Link>
					</div>
				)}
			</div>
		</div>
	);

	// Desktop Header
	const desktopHeader = (
		<div className='hidden md:block'>
			<nav className='container mx-auto px-4 py-3'>
				<div className='grid grid-cols-4 w-full items-center'>
					{/* Logo */}
					<div className='flex col-span-1 justify-center items-center'>
						<Link
							to='/'
							className='flex items-center'
						>
							<TaskiahLogo className='w-36 h-12 text-gray-800 dark:text-white' />
						</Link>
					</div>

					{/* Navigation Items */}
					<div className='col-span-2 flex items-center justify-center space-x-8'>
						{navigationLinks}
					</div>

					{/* Auth & Theme Toggle */}
					<div className='flex col-span-1 items-center justify-center space-x-4'>
						{user && userDisplay}
						{user ? (
							<button
								onClick={handleLogout}
								className='px-4 py-2 dark:bg-gray-200 rounded-lg bg-gray-700 text-gray-300 dark:text-gray-700 hover:text-gray-900 dark:hover:text-white text-nowrap'
							>
								Sign Out
							</button>
						) : (
							<>
								<Link
									to='/login'
									className='px-4 py-2 text-gray-600 ring-1 ring-gray-600 rounded-lg dark:text-gray-300 dark:ring-gray-300 hover:text-gray-900 hover:ring-white  dark:hover:text-white'
								>
									Login
								</Link>
								<Link
									to='/signup'
									className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-opacity-90 text-nowrap'
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
							{theme.mode === 'dark' ? (
								<GoSun className='h-6 w-6' />
							) : (
								<GoMoon className='h-6 w-6' />
							)}
						</button>
					</div>
				</div>
			</nav>
		</div>
	);

	return (
		<header className='bg-white dark:bg-gray-800 shadow-sm'>
			{mobileHeader}
			{desktopHeader}
			<MobileDrawer
				isOpen={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
			/>
			<InvitesModal
				setShowInviteModal={setShowInviteModal}
				showInviteModal={showInviteModal}
				sharedListNotifications={sharedListNotifications}
				userData={userData}
			/>
		</header>
	);
}
