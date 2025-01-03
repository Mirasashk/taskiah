import { useRef, useState, useEffect } from 'react';
import { TiDelete } from 'react-icons/ti';
import SearchInput from './SearchInput';
import UserInviteModal from './UserInviteModal';
const UserSearch = ({ selectedUsers, onSelectUsers }) => {
	const searchInputRef = useRef();
	const [showSearchResults, setShowSearchResults] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const [openUserInvite, setOpenUserInvite] = useState(false);

	useEffect(() => {
		if (
			searchInputRef.current?.getCurrentSearchTerm() === '' ||
			searchInputRef.current?.getCurrentSearchTerm() === null
		) {
			setShowSearchResults(false);
		}
	}, [searchInputRef.current?.getCurrentSearchTerm()]);

	const handleSearchResults = (results) => {
		if (results.length > 0) {
			setShowSearchResults(true);
			setSearchResults(results);
		} else {
			setSearchResults([]);
			setShowSearchResults(true);
		}
	};

	const clearSearch = () => {
		setSearchResults([]);

		searchInputRef.current?.clearSearch();
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
		onSelectUsers(selectedUsers.filter((u) => u.email !== user.email));
	};

	const renderSearchResults = () => {
		if (
			searchResults.length === 0 &&
			searchInputRef.current?.getCurrentSearchTerm() !== null
		) {
			return (
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
							src={user.photoURL}
							alt={`${user.firstName} ${user.lastName}`}
							className='w-10 h-10 rounded-full'
						/>
					</div>
					<div className='flex-1'>
						{user.firstName} {user.lastName}
					</div>
					<div className='flex-1'>{user.email}</div>
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
						{user.firstName} {user.lastName}
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
				{showSearchResults && (
					<div className='dark:bg-gray-600 bg-gray-100 p-2 rounded-md flex flex-col gap-2'>
						{renderSearchResults()}
					</div>
				)}

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
