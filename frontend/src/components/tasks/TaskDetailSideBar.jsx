import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { TiDelete } from 'react-icons/ti';
import { FaCircle } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';
import { useListContext } from '../../context/ListContext';

import CustomDropdown from '../forms/CustomDropdown';
import FormField from '../forms/FormField';

const TaskDetailSideBar = ({ task, onClose, onSave, isEditing, onEdit }) => {
	const { lists, sharedLists, tags } = useListContext();
	const [editedTask, setEditedTask] = useState(task);
	const [selectedTags, setSelectedTags] = useState([]);
	const [showTagDropdown, setShowTagDropdown] = useState(false);

	if (!task) return null;

	useEffect(() => {
		console.log('selectedTags', selectedTags);
	}, [selectedTags]);

	useEffect(() => {
		setEditedTask(task);

		if (tags && task.tagIds) {
			const tagsArray =
				typeof task.tagIds === 'string' ? [task.tagIds] : task.tagIds;
			const filteredTags = tags.filter((tag) => {
				return tagsArray.includes(tag.id);
			});

			setSelectedTags(filteredTags);
		} else {
			setSelectedTags([]);
		}
	}, [task, tags]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditedTask({ ...editedTask, [name]: value });
	};

	const handleSave = () => {
		// Convert selected tags to array of names
		editedTask.tagIds = selectedTags.map((tag) => tag.id);
		onSave(editedTask);
		onEdit(false);
	};

	const handleTagSelect = (tag) => {
		const tagExists = selectedTags.some((t) => t.id === tag.id);
		if (!tagExists) {
			setSelectedTags([...selectedTags, tag]);
		}
		setShowTagDropdown(false);
	};

	const handleRemoveTag = (tagToRemove) => {
		setSelectedTags(
			selectedTags.filter((tag) => tag.id !== tagToRemove.id)
		);
	};

	const renderSelectedTags = () => {
		return selectedTags.map((tag) => (
			<div
				key={tag.id}
				className='inline-block mr-2 mb-2'
			>
				<div
					className='flex items-center gap-1 border border-gray-300 p-2 rounded-3xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
					onClick={() => handleRemoveTag(tag)}
				>
					<span className='flex items-center gap-2 text-sm'>
						<FaCircle
							size={12}
							color={tag.color}
						/>
						{tag.name}
					</span>
					<TiDelete size={20} />
				</div>
			</div>
		));
	};

	const isSharedList = sharedLists.some((list) => list.id === task.listId);

	return (
		<aside className='w-full bg-white dark:bg-gray-800 rounded-lg p-3 md:p-6 shadow-lg max-h-[calc(100vh-2rem)] overflow-y-auto'>
			<div className='flex justify-between items-center mb-4 md:mb-6'>
				<h2 className='text-lg md:text-xl font-semibold text-gray-900 dark:text-white'>
					Task Details
				</h2>
				<button
					onClick={onClose}
					className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
				>
					<FiX size={24} />
				</button>
			</div>

			<div className='space-y-4 md:space-y-6'>
				{/* Title */}
				<div>
					<label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
						Title
					</label>
					{isEditing ? (
						<input
							type='text'
							name='title'
							value={editedTask.title}
							onChange={handleInputChange}
							className='flex-1 w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700'
						/>
					) : (
						<p className='text-gray-900 dark:text-white break-words'>
							{task.title}
						</p>
					)}
				</div>

				{/* Description */}
				{isEditing ? (
					<div>
						<label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
							Description
						</label>
						<textarea
							className='p-2 w-full h-32 md:h-40 max-h-[30rem] border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-700'
							name='description'
							value={editedTask.description}
							onChange={handleInputChange}
							placeholder='Enter task description'
						/>
					</div>
				) : (
					task.description && (
						<div>
							<label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
								Description
							</label>
							<p className='text-gray-900 dark:text-white whitespace-pre-wrap break-words'>
								{task.description}
							</p>
						</div>
					)
				)}

				{/* List */}
				<div>
					<label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
						List
					</label>
					{isEditing && !isSharedList ? (
						<select
							name='listId'
							value={editedTask.listId}
							onChange={handleInputChange}
							className='w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700'
						>
							{lists.map((list) => (
								<option
									key={list.id}
									value={list.id}
								>
									{list.name}
								</option>
							))}
						</select>
					) : (
						<p className='text-gray-900 dark:text-white'>
							{lists.find((list) => list.id === task.listId)
								?.name || 'Unknown List'}
						</p>
					)}
				</div>

				{/* Status */}
				<div>
					<label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
						Status
					</label>
					{isEditing ? (
						<select
							name='status'
							value={editedTask.status}
							onChange={handleInputChange}
							className='w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700'
						>
							<option value='active'>Active</option>
							<option value='completed'>Completed</option>
							<option value='deleted'>Deleted</option>
						</select>
					) : (
						<p className='capitalize text-gray-900 dark:text-white'>
							{task.status}
						</p>
					)}
				</div>

				{/* Priority */}
				{task.priority && (
					<div>
						<label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
							Priority
						</label>
						{isEditing ? (
							<select
								name='priority'
								value={editedTask.priority}
								onChange={handleInputChange}
								className='w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700'
							>
								<option value='low'>Low</option>
								<option value='medium'>Medium</option>
								<option value='high'>High</option>
							</select>
						) : (
							<p className='capitalize text-gray-900 dark:text-white'>
								{task.priority}
							</p>
						)}
					</div>
				)}

				{/* Tags */}
				<div>
					<label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
						Tags
					</label>
					{isEditing ? (
						<div className='space-y-2'>
							<div className='flex flex-wrap gap-2'>
								{renderSelectedTags()}
							</div>
							<div className='relative'>
								<button
									onClick={() =>
										setShowTagDropdown(!showTagDropdown)
									}
									className='w-full p-2 text-left border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700'
								>
									Select tags...
								</button>
								{showTagDropdown && (
									<div className='absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg'>
										<div className='max-h-48 overflow-y-auto'>
											{tags.map((tag) => (
												<div
													key={tag.id}
													className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
													onClick={() =>
														handleTagSelect(tag)
													}
												>
													<div className='flex items-center gap-2'>
														<FaCircle
															size={12}
															color={tag.color}
														/>
														{tag.name}
													</div>
												</div>
											))}
										</div>
									</div>
								)}
							</div>
						</div>
					) : (
						<div className='flex flex-wrap gap-2'>
							{selectedTags.map((tag) => (
								<span
									key={tag.id}
									className='px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm'
								>
									<div className='flex items-center gap-2'>
										<FaCircle
											size={12}
											color={tag.color}
										/>
										{tag.name}
									</div>
								</span>
							))}
						</div>
					)}
				</div>

				{/* Due Date */}
				<div>
					<label className='block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
						Due Date
					</label>
					{isEditing ? (
						<div className='flex flex-col md:flex-row gap-2'>
							<input
								type='date'
								name='dueDate'
								value={(editedTask.dueDate || '').split('T')[0]}
								onChange={handleInputChange}
								className='flex-1 p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 [color-scheme:light] dark:[color-scheme:dark]'
							/>
							{editedTask.dueDate && (
								<input
									type='time'
									name='dueTime'
									value={
										(editedTask.dueDate || '')
											.split('T')[1]
											?.split('.')[0] || ''
									}
									onChange={(e) => {
										const date = (
											editedTask.dueDate || ''
										).split('T')[0];
										const newDateTime = `${date}T${e.target.value}`;
										handleInputChange({
											target: {
												name: 'dueDate',
												value: newDateTime,
											},
										});
									}}
									className='w-full md:w-32 p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 [color-scheme:light] dark:[color-scheme:dark]'
								/>
							)}
						</div>
					) : (
						task.dueDate && (
							<p className='text-gray-900 dark:text-white'>
								{new Date(task.dueDate).toLocaleString()}
							</p>
						)
					)}
				</div>

				{isEditing && (
					<div className='flex gap-2 justify-end mt-4'>
						<button
							onClick={handleSave}
							className='w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
						>
							Save
						</button>
					</div>
				)}
			</div>
		</aside>
	);
};

export default TaskDetailSideBar;
