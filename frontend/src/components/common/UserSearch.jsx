import { useRef, useState, useEffect } from 'react';
import { TiDelete } from 'react-icons/ti';
import SearchInput from './SearchInput';
import UserInviteModal from './UserInviteModal';
import { getUserPhotoURL } from '../../utils/UserPhoto';

const UserSearch = ({
	selectedUsers,
	onSelectUsers,
	editMode = false,
	onUserToRemove = null,
}) => {
	const searchInputRef = useRef();
	const [showSearchResults, setShowSearchResults] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const [openUserInvite, setOpenUserInvite] = useState(false);
	const [userPhotos, setUserPhotos] = useState({});

	useEffect(() => {
		if (
			searchInputRef.current?.getCurrentSearchTerm() === '' ||
			searchInputRef.current?.getCurrentSearchTerm() === null
		) {
			setShowSearchResults(false);
		}
	}, [searchInputRef.current?.getCurrentSearchTerm()]);

	useEffect(() => {
		const loadUserPhotos = async () => {
			const photos = {};
			for (const user of searchResults) {
				if (user.photoURL) {
					const url = await getUserPhotoURL(user.photoURL);
					photos[user.email] = url;
				}
			}
			setUserPhotos(photos);
		};

		if (searchResults.length > 0) {
			loadUserPhotos();
		}
	}, [searchResults]);

	const handleSearchResults = (results) => {
		if (results.length > 0) {
			setShowSearchResults(true);
			setSearchResults(results);
		} else {
			setSearchResults([]);
			const currentSearchTerm =
				searchInputRef.current?.getCurrentSearchTerm();
			setShowSearchResults(
				currentSearchTerm && currentSearchTerm.trim() !== ''
			);
		}
	};

	const clearSearch = () => {
		searchInputRef.current?.clearSearch();
		setSearchResults([]);
		setShowSearchResults(false);
	};

	const handleSelectUser = (user) => {
		const userExists = selectedUsers.some((u) => u.email === user.email);
		if (userExists) {
			clearSearch();
			return;
		}
		onSelectUsers([
			...selectedUsers,
			{
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				accepted: false,
			},
		]);
		clearSearch();
		setShowSearchResults(false);
	};

	const handleRemoveUser = (user) => {
		if (editMode) {
			onUserToRemove(user);
		} else {
			onSelectUsers(selectedUsers.filter((u) => u.email !== user.email));
		}
	};

	const renderSearchResults = () => {
		const currentSearchTerm =
			searchInputRef.current?.getCurrentSearchTerm();

		if (
			searchResults.length === 0 &&
			currentSearchTerm &&
			currentSearchTerm.trim() !== ''
		) {
			return (
				<div className='dark:bg-gray-600 bg-gray-100 p-2 rounded-md flex flex-col gap-2'>
					<div className='flex flex-col gap-2'>
						<div>No results found</div>
						<div className='flex justify-center'>
							<button
								onClick={() => setOpenUserInvite(true)}
								className='bg-blue-800 text-white dark:hover:bg-blue-900 p-2 rounded-md w-1/2'
							>
								Invite User
							</button>
						</div>
					</div>
				</div>
			);
		}

		return searchResults.map((user) => (
			<div
				className='hover:bg-gray-500 p-2 rounded-md'
				key={user.email}
				onClick={() => handleSelectUser(user)}
			>
				<div className='flex flex-row gap-2 items-center'>
					<div className='flex-0'>
						<img
							src={
								userPhotos[user.email] || '/default-avatar.png'
							}
							alt={`${user.firstName} ${user.lastName}`}
							className='w-10 h-10 rounded-full'
						/>
					</div>
					<div className='flex flex-col'>
						<div className='flex-1'>
							{user.firstName.charAt(0).toUpperCase() +
								user.firstName.slice(1)}{' '}
							{user.lastName.charAt(0).toUpperCase() +
								user.lastName.slice(1)}
						</div>
						<div className='flex-1'>{user.email}</div>
					</div>
				</div>
			</div>
		));
	};

	const renderSelectedUsers = () => {
		return selectedUsers.map((user) => (
			<div key={user.email}>
				<div
					className='inline-block gap-2 items-center border border-gray-300 p-2 rounded-3xl'
					onClick={() => handleRemoveUser(user)}
				>
					<div className='flex items-center gap-1'>
						{user.firstName.charAt(0).toUpperCase() +
							user.firstName.slice(1)}{' '}
						{user.lastName.charAt(0).toUpperCase() +
							user.lastName.slice(1)}
						<TiDelete size={24} />
					</div>
				</div>
			</div>
		));
	};

	return (
		<div className='flex flex-col gap-2'>
			<SearchInput
				ref={searchInputRef}
				onSearchResults={handleSearchResults}
				setShowSearchResults={setShowSearchResults}
			/>
			<div className='flex flex-col gap-2'>
				{showSearchResults && <>{renderSearchResults()}</>}

				{selectedUsers.length > 0 && (
					<div className='flex flex-row flex-wrap gap-2'>
						{renderSelectedUsers()}
					</div>
				)}
			</div>
			<UserInviteModal
				isOpen={openUserInvite}
				onClose={() => setOpenUserInvite(false)}
				emailSearch={searchInputRef.current?.getCurrentSearchTerm()}
			/>
		</div>
	);
};

export default UserSearch;
