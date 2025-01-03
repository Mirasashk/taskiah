import React, { useState, useRef, useEffect } from 'react';
import Input from '../forms/Input';
import UserSearch from '../common/UserSearch';
import { listService } from '../../services/listApi';
import { useUser } from '../../context/UserContext';
const CreateListForm = ({ onClose }) => {
	const [formData, setFormData] = useState({
		name: '',
		ownerId: '',
		sharedWith: [],
		createdAt: '',
		updatedAt: '',
		tasks: [],
	});
	const [selectedUsers, setSelectedUsers] = useState([]);
	const { userData } = useUser();

	useEffect(() => {
		console.log('userData.id:', userData.id);
		console.log('Current formData before update:', formData);
		setFormData((prevFormData) => {
			const newFormData = {
				...prevFormData,
				ownerId: userData.id,
			};
			console.log('New formData after update:', newFormData);
			return newFormData;
		});
	}, [userData.id]);

	useEffect(() => {
		setFormData((prevFormData) => ({
			...prevFormData,
			sharedWith: selectedUsers,
		}));
	}, [selectedUsers]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Submitting formData:', formData);
		listService.createList(formData);
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
