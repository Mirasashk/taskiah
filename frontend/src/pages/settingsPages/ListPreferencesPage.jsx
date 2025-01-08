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
	const [preferences, setPreferences] = useState({
		defaultView: 'grid',
		sortBy: 'name',
		autoSave: true,
		showArchived: false,
		defaultSharePermission: 'view',
		notifyOnShare: true,
	});

	useEffect(() => {
		if (userData?.preferences?.lists) {
			setPreferences(userData.preferences.lists);
		}
	}, [userData]);

	const handlePreferenceChange = (key, value) => {
		setPreferences((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleSave = async () => {
		setIsSaving(true);
		setSaveMessage({ type: '', text: '' });

		try {
			await userService.updateUserPreferences(userData.id, {
				lists: preferences,
			});

			setSaveMessage({
				type: 'success',
				text: 'List preferences saved successfully!',
			});

			setTimeout(() => {
				setSaveMessage({ type: '', text: '' });
			}, 3000);
		} catch (error) {
			console.error('Error saving list preferences:', error);
			setSaveMessage({
				type: 'error',
				text: 'Failed to save list preferences. Please try again.',
			});
		} finally {
			setIsSaving(false);
		}
	};

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
		<div className='container mx-auto px-4 sm:px-6'>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6'>
				<h1 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0'>
					List Preferences
				</h1>
			</div>

			<div className='bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 space-y-4 sm:space-y-6'>
				{/* List Display Section */}
				<div>
					<h2 className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4'>
						List Display
					</h2>
					<div className='space-y-4'>
						<FormField label='Default List View'>
							<select
								value={preferences.defaultView}
								onChange={(e) =>
									handlePreferenceChange(
										'defaultView',
										e.target.value
									)
								}
								className='mt-1 block w-full px-3 py-3 sm:py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md dark:bg-gray-700 dark:text-white bg-slate-200'
							>
								<option value='grid'>Grid View</option>
								<option value='list'>List View</option>
								<option value='compact'>Compact View</option>
							</select>
						</FormField>

						<FormField label='Sort Lists By'>
							<select
								value={preferences.sortBy}
								onChange={(e) =>
									handlePreferenceChange(
										'sortBy',
										e.target.value
									)
								}
								className='mt-1 block w-full px-3 py-3 sm:py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md dark:bg-gray-700 dark:text-white bg-slate-200'
							>
								<option value='name'>Name</option>
								<option value='createdAt'>Created Date</option>
								<option value='lastModified'>
									Last Modified
								</option>
							</select>
						</FormField>
					</div>
				</div>

				{/* List Behavior Section */}
				<div>
					<h2 className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4'>
						List Behavior
					</h2>
					<div className='space-y-4'>
						<div className='flex flex-col sm:flex-row gap-4'>
							<label className='flex items-center space-x-3'>
								<input
									type='checkbox'
									checked={preferences.autoSave}
									onChange={(e) =>
										handlePreferenceChange(
											'autoSave',
											e.target.checked
										)
									}
									className='form-checkbox h-5 w-5'
								/>
								<span className='text-gray-700 dark:text-gray-300'>
									Auto-save list changes
								</span>
							</label>
							<label className='flex items-center space-x-3'>
								<input
									type='checkbox'
									checked={preferences.showArchived}
									onChange={(e) =>
										handlePreferenceChange(
											'showArchived',
											e.target.checked
										)
									}
									className='form-checkbox h-5 w-5'
								/>
								<span className='text-gray-700 dark:text-gray-300'>
									Show archived lists
								</span>
							</label>
						</div>
					</div>
				</div>

				{/* Sharing Section */}
				<div>
					<h2 className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4'>
						Sharing Preferences
					</h2>
					<div className='space-y-4'>
						<FormField label='Default Share Permission'>
							<select
								value={preferences.defaultSharePermission}
								onChange={(e) =>
									handlePreferenceChange(
										'defaultSharePermission',
										e.target.value
									)
								}
								className='mt-1 block w-full px-3 py-3 sm:py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md dark:bg-gray-700 dark:text-white bg-slate-200'
							>
								<option value='view'>View Only</option>
								<option value='edit'>Can Edit</option>
								<option value='manage'>Can Manage</option>
							</select>
						</FormField>

						<div className='flex flex-col sm:flex-row gap-4'>
							<label className='flex items-center space-x-3'>
								<input
									type='checkbox'
									checked={preferences.notifyOnShare}
									onChange={(e) =>
										handlePreferenceChange(
											'notifyOnShare',
											e.target.checked
										)
									}
									className='form-checkbox h-5 w-5'
								/>
								<span className='text-gray-700 dark:text-gray-300'>
									Notify me when someone shares a list
								</span>
							</label>
						</div>
					</div>
				</div>

				{/* Save Button */}
				<div className='flex justify-center sm:justify-end mt-6'>
					<button
						onClick={handleSave}
						disabled={isSaving}
						className={`w-full sm:w-auto px-6 py-3 sm:py-2 bg-blue-600 text-white rounded-lg ${
							isSaving
								? 'opacity-50 cursor-not-allowed'
								: 'hover:bg-blue-700'
						}`}
					>
						{isSaving ? (
							<div className='flex items-center justify-center gap-2'>
								<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
								Saving...
							</div>
						) : (
							'Save Changes'
						)}
					</button>
				</div>

				{saveMessage.text && (
					<div
						className={`mt-4 p-4 rounded-lg ${
							saveMessage.type === 'success'
								? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200'
								: 'bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200'
						}`}
					>
						{saveMessage.text}
					</div>
				)}
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
