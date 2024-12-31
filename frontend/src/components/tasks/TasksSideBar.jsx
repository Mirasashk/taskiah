import { useState, useEffect } from 'react';
import { FiInbox, FiCalendar, FiStar, FiTag, FiList } from 'react-icons/fi';
import { useTaskContext } from '../../context/TaskContext';
import { useUser } from '../../context/UserContext';
import Input from '../forms/Input';

import { useColor } from 'react-color-palette';
import CustomColorPicker from '../common/ColorPicker';
import { FiTrash2 } from 'react-icons/fi';
import SideBarGroup from './SideBarGroup';
import AddNewBtn from './AddNewBtn';
const TasksSidebar = ({ onFilterTasks }) => {
	const [showProjects, setShowProjects] = useState(true);
	const [showNewTagForm, setShowNewTagForm] = useState(false);
	const [newTag, setNewTag] = useState('');
	const { userData, updateUserData } = useUser();
	const { tasks, filterTasks, filter, deletedTasks } = useTaskContext();
	const [selectedTagColor, setSelectedTagColor] = useColor('#6590D5');
	const [selectedTagPriority, setSelectedTagPriority] = useState('medium');
	const [lists, setLists] = useState([
		{
			name: 'My Tasks',
			ownerId: userData.id,
			tasks: tasks,
			icon: 'home',
		},
	]);
	const [selectedList, setSelectedList] = useState('my tasks');

	const getListCount = (listName) => {
		return lists.find((list) => list.name === listName).tasks.length;
	};

	const [tags, setTags] = useState(Object.values(userData?.tags || {}) || []);
	const today = new Date();
	const todayTasks = tasks.filter((task) => {
		const taskDate = new Date(task.dueDate);
		return taskDate.toDateString() === today.toDateString();
	});

	const importantTasks = tasks.filter(
		(task) => task.priority === 'high' && task.ownerId === userData.id
	);

	// create a function to get the count of tasks for each tag
	const getTagCount = (tag) => {
		return tasks.filter((task) => task.tags === tag).length;
	};

	const filterOptions = [
		{
			icon: <FiInbox />,
			label: 'All tasks',
			count: tasks.length,
		},
		{
			icon: <FiCalendar />,
			label: 'Today',
			count: todayTasks.length,
		},
		{
			icon: <FiStar />,
			label: 'Important',
			count: importantTasks.length,
		},
		{
			icon: <FiTrash2 />,
			label: 'Deleted',
			count: deletedTasks.length,
		},
	];

	const [selectedFilter, setSelectedFilter] = useState(filter);
	// const [selectedTag, setSelectedTag] = useState(null);

	useEffect(() => {
		setSelectedFilter(filter);
	}, [filter]);

	useEffect(() => {
		setTags(Object.values(userData?.tags || {}));
	}, [userData?.tags]);

	// const handleAddTag = async (tag) => {
	// 	if (!tag.trim()) return;

	// 	const newTag = {
	// 		name: tag,
	// 		color: selectedTagColor.hex,
	// 		priority: selectedTagPriority,
	// 	};

	// 	setTags([...tags, newTag]);

	// 	await updateUserData({
	// 		tags: {
	// 			...userData.tags,
	// 			[newTag.name]: newTag,
	// 		},
	// 	});
	// 	setShowNewTagForm(false);
	// };

	const handleFilter = (label) => {
		console.log('Filtering by:', label);
		setSelectedFilter(label);
		setSelectedTag(null);
		if (label === 'All tasks') {
			filterTasks(tasks, label);
		} else if (label === 'Today') {
			filterTasks(todayTasks, label);
		} else if (label === 'Important') {
			filterTasks(importantTasks, label);
		} else if (label === 'Deleted') {
			filterTasks(deletedTasks, label);
		}
	};

	// const handleFilterByTag = (tag) => {
	// 	console.log('Filtering by tag:', tag);
	// 	setSelectedTag(tag);
	// 	setSelectedFilter(null);
	// 	const filteredTasks = tasks.filter((task) => task.tags === tag);
	// 	filterTasks(filteredTasks, `Tag: ${tag}`);
	// };

	// const renderNewTagForm = () => {
	// 	return (
	// 		<div className='flex flex-col'>
	// 			<Input
	// 				type='text'
	// 				placeholder='New tag name'
	// 				value={newTag}
	// 				onChange={(e) => setNewTag(e.target.value)}
	// 			/>
	// 			{/* Color picker with consistent UI styling */}
	// 			<div className='flex items-center mt-2 mb-2'>
	// 				<label
	// 					htmlFor='colorPicker'
	// 					className='text-sm text-gray-600 dark:text-gray-400 mr-2'
	// 				>
	// 					Tag Color
	// 				</label>
	// 				<CustomColorPicker
	// 					color={selectedTagColor}
	// 					setColor={setSelectedTagColor}
	// 				/>
	// 			</div>
	// 			<div className='flex justify-start items-center'>
	// 				<label
	// 					htmlFor='colorPicker'
	// 					className='text-sm text-gray-600 dark:text-gray-400 mr-2'
	// 				>
	// 					Priority
	// 				</label>
	// 				<select
	// 					name='priority'
	// 					id='priority'
	// 					defaultValue={selectedTagPriority}
	// 					onChange={(e) => setSelectedTagPriority(e.target.value)}
	// 					className='text-md rounded-lg bg-gray-600 text-gray-600 dark:text-gray-400 mr-2 px-2 py-1'
	// 				>
	// 					<option value='high'>High</option>
	// 					<option value='medium'>Medium</option>
	// 					<option value='low'>Low</option>
	// 				</select>
	// 			</div>
	// 			<button
	// 				className='bg-blue-500 text-white mt-2 px-3 py-2 rounded-md w-24 '
	// 				onClick={() => handleAddTag(newTag)}
	// 			>
	// 				Add
	// 			</button>
	// 		</div>
	// 	);
	// };

	return (
		<aside className='w-64 bg-white rounded-lg dark:bg-gray-800 h-full border-r border-gray-200 dark:border-gray-700'>
			<div className='p-4 space-y-2'>
				{/* Filter Options */}
				<nav className='space-y-2'>
					{filterOptions.map((option, index) => (
						<button
							key={index}
							className={`flex items-center w-full px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${
								selectedFilter === option.label
									? 'bg-gray-200 dark:bg-gray-600'
									: ''
							}`}
							onClick={() => handleFilter(option.label)}
						>
							<span className='text-lg mr-3'>{option.icon}</span>
							<span className='flex-1'>{option.label}</span>
							<span className='text-sm text-gray-500'>
								{option.count}
							</span>
						</button>
					))}
				</nav>

				<SideBarGroup
					title='Lists'
					icon={<FiList />}
					items={lists}
					children={<AddNewBtn title='List' />}
				/>

				<SideBarGroup
					title='Tags'
					icon={<FiTag />}
					items={tags}
					children={<AddNewBtn title='Tag' />}
				/>
			</div>
		</aside>
	);
};

export default TasksSidebar;
