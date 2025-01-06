import React, { useState } from 'react';
import Input from '../forms/Input';
import { ColorPicker, useColor } from 'react-color-palette';
import { listService } from '../../services/listApi';
import DropDown from '../common/DropDown';
import { useUser } from '../../context/UserContext';
import { useListContext } from '../../context/ListContext';
const CreateTagForm = ({ onClose }) => {
	const [color, setColor] = useColor('#555555');
	const [tagName, setTagName] = useState('');
	const [error, setError] = useState('');
	const [priority, setPriority] = useState('low');
	const { userData } = useUser();
	const { getTags } = useListContext();

	const handleCreateTag = async () => {
		if (!tagName) {
			setError({
				element: 'tagName',
				message: 'Tag name is required',
			});
			return;
		}

		const tag = {
			name: tagName,
			color: color.hex,
			priority: priority,
			ownerId: userData.id,
		};

		await listService.createTag(tag);
		await getTags(userData.id);

		onClose();
	};

	return (
		<div className='flex flex-col gap-4'>
			<Input
				placeholder='Tag Name'
				value={tagName}
				onChange={(e) => setTagName(e.target.value)}
				error={error.element === 'tagName' ? error.message : ''}
			/>

			<ColorPicker
				color={color}
				onChange={setColor}
				hideAlpha
				hideInput
				height={100}
			/>
			<div className='flex items-center gap-2'>
				<DropDown
					options={[
						{ label: 'Low', value: 'low' },
						{ label: 'Medium', value: 'medium' },
						{ label: 'High', value: 'high' },
					]}
					value={priority}
					label='Select Tag priority'
					onChange={(value, option) => setPriority(option.value)}
				/>
			</div>
			<button
				className='bg-blue-500 text-white px-4 py-2 rounded-md'
				onClick={handleCreateTag}
			>
				Create Tag
			</button>
		</div>
	);
};

export default CreateTagForm;
