import React, { useState, useRef, useEffect } from 'react';
import Input from '../forms/Input';
import UserSearch from '../common/UserSearch';
import { listService } from '../../services/listApi';
import { useUser } from '../../context/UserContext';
const CreateListForm = ({ onClose }) => {
	const [formData, setFormData] = useState({
		name: '',
		ownerId: '',
	});
	const [selectedUsers, setSelectedUsers] = useState([]);
	const { userData } = useUser();

	useEffect(() => {
		setFormData((prevFormData) => {
			const newFormData = {
				...prevFormData,
				ownerId: userData.id,
			};
			return newFormData;
		});
	}, [userData.id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const listResponse = await listService.createList(formData);
		const listId = listResponse.data.listId;
		selectedUsers.forEach(async (user) => {
			await listService.postSharedListInvite({
				listId: listId,
				email: user.email,
				message: `${userData.username} has invited you to join ${formData.name}`,
				accepted: false,
				status: 'pending',
			});
		});
		onClose();
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='flex flex-col gap-4'>
				<Input
					type='text'
					name='name'
					placeholder='List Name'
					value={formData.name}
					onChange={(e) =>
						setFormData({ ...formData, name: e.target.value })
					}
				/>
				<div>
					<label htmlFor='sharedWith'>Invite Users:</label>
					<UserSearch
						selectedUsers={selectedUsers}
						onSelectUsers={setSelectedUsers}
					/>
				</div>
				<div className='flex justify-center mt-4'>
					<button
						type='submit'
						className='bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 w-1/2'
					>
						Create
					</button>
				</div>
			</div>
		</form>
	);
};

export default CreateListForm;