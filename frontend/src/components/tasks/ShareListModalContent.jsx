import React, { useState, useEffect } from 'react';
import UserSearch from '../common/UserSearch';
import { userService } from '../../services/userApi';
import { listService } from '../../services/listApi';
import { useUser } from '../../context/UserContext';
import { useListContext } from '../../context/ListContext';

const ShareListModalContent = ({ list, onClose }) => {
	const [selectedUsers, setSelectedUsers] = useState([]);
	const { userData } = useUser();
	const { removeSharedUser } = useListContext();
	useEffect(() => {
		console.log('list', list);
		if (list.sharedWith.length > 0) {
			getUsers(list.sharedWith);
		}
	}, []);

	const getUsers = async (userIds) => {
		await userService.getUsersByUserIds(userIds).then((res) => {
			setSelectedUsers(res.data);
		});
	};

	const handleUserSelect = (users) => {
		setSelectedUsers(users);
	};

	const handleUserRemove = (user) => {
		removeSharedUser(list.id, user.id);
	};

	const handleShareList = () => {
		console.log('selectedUsers', selectedUsers);
		selectedUsers.forEach(async (user) => {
			if (!user.id) {
				await listService.postSharedListInvite({
					listId: list.id,
					email: user.email,
					message: `${userData.username} has invited you to join ${list.name}`,
					accepted: false,
					status: 'pending',
				});
			}
		});
		onClose();
	};

	return (
		<div className='flex flex-col justify-center gap-4'>
			<UserSearch
				selectedUsers={selectedUsers}
				onSelectUsers={(users) => handleUserSelect(users)}
				editMode={true}
				onUserToRemove={handleUserRemove}
			/>
			<div className='flex justify-center'>
				<button
					className='bg-blue-500 text-white px-4 py-2 rounded-lg w-1/2'
					onClick={handleShareList}
				>
					Share
				</button>
			</div>
		</div>
	);
};

export default ShareListModalContent;
