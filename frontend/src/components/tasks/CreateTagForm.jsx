import React, { useState, useEffect } from 'react';
import Input from '../forms/Input';
import { ColorPicker, useColor } from 'react-color-palette';
import { listService } from '../../services/listApi';
import DropDown from '../common/DropDown';
import { useUser } from '../../context/UserContext';
import { useListContext } from '../../context/ListContext';

const CreateTagForm = ({ onClose, existingTag = null }) => {
	const [color, setColor] = useColor(existingTag?.color || '#555555');
	const [tagName, setTagName] = useState('');
	const [error, setError] = useState('');
	const [priority, setPriority] = useState('low');
	const { userData } = useUser();
	const { getTags } = useListContext();

	useEffect(() => {
		if (existingTag) {
			setTagName(existingTag.name);
			setPriority(existingTag.priority);
		}
	}, [existingTag]);

	const validateForm = () => {
		if (!tagName.trim()) {
			setError('Tag name is required');
			return false;
		}
		setError('');
		return true;
	};

	const handleCreateTag = async () => {
		if (!validateForm()) return;

		try {
			const tag = {
				name: tagName,
				color: color.hex,
				priority: priority,
				ownerId: userData.id,
			};

			if (existingTag) {
				await listService.updateTag(existingTag.id, tag);
			} else {
				await listService.createTag(tag);
			}

			await getTags(userData.id);
			onClose();
		} catch (error) {
			console.error('Error saving tag:', error);
			setError('Failed to save tag. Please try again.');
		}
	};

	return (
		<div className='space-y-4'>
			<Input
				label='Tag Name'
				placeholder='Enter tag name'
				value={tagName}
				onChange={(e) => setTagName(e.target.value)}
				error={error}
				wrapperClassName='text-nowrap'
			/>

			<div className='space-y-2'>
				<label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
					Tag Color
				</label>
				<ColorPicker
					color={color}
					onChange={setColor}
					hideAlpha
					hideInput
					height={100}
				/>
			</div>

			<div className='space-y-2'>
				<label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
					Priority Level
				</label>
				<DropDown
					options={[
						{ label: 'Low', value: 'low' },
						{ label: 'Medium', value: 'medium' },
						{ label: 'High', value: 'high' },
					]}
					value={priority}
					onChange={(value, option) => setPriority(option.value)}
				/>
			</div>

			{error && <p className='text-red-500 text-sm'>{error}</p>}

			<div className='flex justify-end gap-4 pt-4'>
				<button
					type='button'
					onClick={onClose}
					className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
				>
					Cancel
				</button>
				<button
					className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
					onClick={handleCreateTag}
				>
					{existingTag ? 'Update' : 'Create'} Tag
				</button>
			</div>
		</div>
	);
};

export default CreateTagForm;
