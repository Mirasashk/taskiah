import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useListContext } from '../../context/ListContext';
import { listService } from '../../services/listApi';
import { userService } from '../../services/userApi';
import FormField from '../../components/forms/FormField';
import UserSearch from '../../components/common/UserSearch';
import Modal from '../../components/common/Modal';
import CreateListForm from '../../components/tasks/CreateListForm';
import CreateTagForm from '../../components/tasks/CreateTagForm';
import {
	HiTrash,
	HiUserAdd,
	HiUserRemove,
	HiPencil,
	HiTag,
	HiPlus,
} from 'react-icons/hi';
import DeleteModal from '../../components/common/DeleteModal';
const ListPreferencesPage = () => {
	const { userData } = useUser();
	const { myLists, sharedLists, refreshContext, tags } = useListContext();
	const [selectedList, setSelectedList] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editedName, setEditedName] = useState('');
	const [showUserSearch, setShowUserSearch] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });
	const [showCreateListModal, setShowCreateListModal] = useState(false);
	const [showCreateTagModal, setShowCreateTagModal] = useState(false);
	const [showEditListModal, setShowEditListModal] = useState(false);
	const [showLeaveListModal, setShowLeaveListModal] = useState(false);
	const [showRemoveListModal, setShowRemoveListModal] = useState(false);
	const [listOwners, setListOwners] = useState({});

	useEffect(() => {
		const fetchListOwners = async () => {
			try {
				const ownerPromises = sharedLists.map((list) =>
					userService.getUser(list.ownerId)
				);
				const ownerResponses = await Promise.all(ownerPromises);
				const ownersMap = {};
				ownerResponses.forEach((response, index) => {
					if (response && response.data) {
						const userData = response.data;
						// Create display name from firstName and lastName, fallback to username
						const displayName =
							userData.firstName && userData.lastName
								? `${userData.firstName} ${userData.lastName}`
								: userData.username;
						ownersMap[sharedLists[index].ownerId] = displayName;
					}
				});
				setListOwners(ownersMap);
			} catch (error) {
				console.error('Error fetching list owners:', error);
			}
		};

		if (sharedLists.length > 0) {
			fetchListOwners();
		}
	}, [sharedLists]);

	const handleEditList = (list) => {
		setSelectedList(list);
		setShowEditListModal(true);
	};

	const handleUpdateList = async () => {
		setIsSaving(true);
		try {
			await listService.updateList(selectedList.id, { name: editedName });
			await refreshContext();
			setSaveMessage({
				type: 'success',
				text: 'List updated successfully!',
			});
			setIsEditing(false);
		} catch (error) {
			setSaveMessage({
				type: 'error',
				text: 'Failed to update list. Please try again.',
			});
		} finally {
			setIsSaving(false);
			setTimeout(() => setSaveMessage({ type: '', text: '' }), 3000);
		}
	};

	const handleDeleteList = async (list) => {
		if (window.confirm('Are you sure you want to delete this list?')) {
			try {
				await listService.deleteList(list.id);
				await refreshContext();
				setSaveMessage({
					type: 'success',
					text: 'List deleted successfully!',
				});
			} catch (error) {
				setSaveMessage({
					type: 'error',
					text: 'Failed to delete list. Please try again.',
				});
			}
			setTimeout(() => setSaveMessage({ type: '', text: '' }), 3000);
		}
	};

	const handleLeaveList = async (list) => {
		setSelectedList(list);
		setShowLeaveListModal(true);
	};

	const handleModalClose = () => {
		setShowCreateListModal(false);
		setShowCreateTagModal(false);
		setShowEditListModal(false);
		setShowLeaveListModal(false);
		setShowRemoveListModal(false);
		setSelectedList(null);
	};

	const renderEditListModal = () => {
		return (
			<Modal
				isOpen={showEditListModal}
				onClose={handleModalClose}
				title='Edit List'
			>
				<CreateListForm
					list={selectedList}
					onClose={handleModalClose}
				/>
			</Modal>
		);
	};

	return (
		<div className='container mx-auto px-6'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
					List Preferences
				</h1>
			</div>

			{saveMessage.text && (
				<div
					className={`mb-4 p-4 rounded-lg ${
						saveMessage.type === 'success'
							? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200'
							: 'bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200'
					}`}
				>
					{saveMessage.text}
				</div>
			)}

			<div className='flex gap-6'>
				{/* My Lists Section */}
				<div className='flex flex-col bg-white w-1/2 dark:bg-gray-800 rounded-lg shadow p-6'>
					<div className='flex justify-between items-center mb-4'>
						<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
							My Lists
						</h2>
						<button
							onClick={() => setShowCreateListModal(true)}
							className='flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
						>
							<HiPlus className='w-5 h-5' />
							Create List
						</button>
					</div>
					<div className='space-y-4'>
						{myLists.map((list) => (
							<div
								key={list.id}
								className='flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'
							>
								<div className='flex-1 flex items-center gap-2'>
									<div className='text-gray-900 dark:text-white font-medium'>
										{list.name}
									</div>
									<div className='text-sm text-gray-500 dark:text-gray-400'>
										({list.tasks?.length || 0} tasks)
									</div>
								</div>
								<div className='flex items-center space-x-2'>
									<button
										onClick={() => handleEditList(list)}
										className='p-2 text-gray-600 hover:text-blue-600 dark:text-gray-300'
									>
										<HiPencil className='w-5 h-5' />
									</button>

									<button
										onClick={() => {
											setSelectedList(list);
											setShowRemoveListModal(true);
										}}
										className='p-2 text-gray-600 hover:text-red-600 dark:text-gray-300'
									>
										<HiTrash className='w-5 h-5' />
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Shared Lists Section */}
				<div className='flex flex-col bg-white w-1/2 dark:bg-gray-800 rounded-lg shadow p-6'>
					<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
						Shared Lists
					</h2>
					<div className='space-y-4'>
						{sharedLists.map((list) => (
							<div
								key={list.id}
								className='flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'
							>
								<div className='flex-1'>
									<div className='flex items-center space-x-2'>
										<span className='text-gray-900 dark:text-white font-medium'>
											{list.name}
										</span>
										<span className='text-sm text-gray-500 dark:text-gray-400'>
											({list.tasks?.length || 0} tasks)
										</span>
									</div>
									<div className='text-sm text-gray-500 dark:text-gray-400'>
										Shared by:{' '}
										{listOwners[list.ownerId] || 'Unknown'}
									</div>
								</div>
								<button
									onClick={() => handleLeaveList(list)}
									className='p-2 text-gray-600 hover:text-red-600 dark:text-gray-300'
								>
									<HiUserRemove className='w-5 h-5' />
								</button>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Create List Modal */}
			<Modal
				isOpen={showCreateListModal}
				onClose={handleModalClose}
				title='Create New List'
			>
				<CreateListForm onClose={handleModalClose} />
			</Modal>

			{/* Create Tag Modal */}
			<Modal
				isOpen={showCreateTagModal}
				onClose={handleModalClose}
				title='Create New Tag'
			>
				<CreateTagForm onClose={handleModalClose} />
			</Modal>

			{/* Leave Shared List Modal */}
			<DeleteModal
				open={showLeaveListModal}
				onClose={() => setShowLeaveListModal(false)}
				itemType='sharedList'
				item={selectedList}
				title='Leave List'
				message='Are you sure you want to leave this list?'
			/>
			{/* Remove List Modal */}
			<DeleteModal
				open={showRemoveListModal}
				onClose={() => setShowRemoveListModal(false)}
				itemType='list'
				item={selectedList}
				title='Remove List'
				message='Are you sure you want to remove this list? This action will also delete all tasks in the list. Users who have access to this list will no longer be able to see or edit these tasks.'
			/>

			{renderEditListModal()}
		</div>
	);
};

export default ListPreferencesPage;
