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
import { useListContext } from '../../context/ListContext';
import Modal from '../common/Modal';
import CreateListForm from './CreateListForm';
const TasksSidebar = ({ onFilterTasks }) => {
	// Contexts
	const { lists } = useListContext();
	const { userData } = useUser();
	const { tasks, filterTasks, filter, deletedTasks } = useTaskContext();

	// States
	const [tags, setTags] = useState(Object.values(userData?.tags || {}) || []);
	const [selectedFilter, setSelectedFilter] = useState(filter);
	// const [selectedTag, setSelectedTag] = useState(null);
	const [isListModalOpen, setIsListModalOpen] = useState(false);
	const [isTagModalOpen, setIsTagModalOpen] = useState(false);

	//variables
	const today = new Date();

	// Functions
	const todayTasks = tasks.filter((task) => {
		const taskDate = new Date(task.dueDate);
		return taskDate.toDateString() === today.toDateString();
	});

	const importantTasks = tasks.filter(
		(task) => task.priority === 'high' && task.ownerId === userData.id
	);

	const staticFilterOptions = [
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
	];

	useEffect(() => {
		setSelectedFilter(filter);
	}, [filter]);

	useEffect(() => {
		setTags(Object.values(userData?.tags || {}));
	}, [userData?.tags]);

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

	const renderListModal = () => {
		return (
			<Modal
				isOpen={isListModalOpen}
				onClose={() => setIsListModalOpen(false)}
				title='List'
			>
				<CreateListForm onClose={() => setIsListModalOpen(false)} />
			</Modal>
		);
	};

	const renderTagModal = () => {
		return (
			<Modal
				isOpen={isTagModalOpen}
				onClose={() => setIsTagModalOpen(false)}
				title='Tag'
			>
				<Input label='Tag Name' />
			</Modal>
		);
	};

	return (
		<aside className='w-64 bg-white rounded-lg dark:bg-gray-800 h-full border-r border-gray-200 dark:border-gray-700'>
			<div className='p-4 space-y-2'>
				{/* Filter Options */}
				<nav className='space-y-2'>
					{staticFilterOptions.map((option, index) => (
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

				<hr className='my-4 border-gray-200 dark:border-gray-700' />

				<SideBarGroup
					title='Lists'
					icon={<FiList />}
					items={lists}
				>
					<AddNewBtn
						onClick={() => setIsListModalOpen(true)}
						title='List'
					/>
				</SideBarGroup>

				<SideBarGroup
					title='Tags'
					icon={<FiTag />}
					items={tags}
					children={
						<AddNewBtn
							onClick={() => setIsTagModalOpen(true)}
							title='Tag'
						/>
					}
				/>

				<hr className='my-4 border-gray-200 dark:border-gray-700' />

				<button
					className={`flex items-center w-full px-3 py-2 text-gray-700 
						dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${
							selectedFilter === 'Deleted'
								? 'bg-gray-200 dark:bg-gray-600'
								: ''
						}`}
					onClick={() => handleFilter('Deleted')}
				>
					<span className='text-lg mr-3'>{<FiTrash2 />}</span>
					<span className='flex-1'>Deleted</span>
					<span className='text-sm text-gray-500'>
						{deletedTasks.length}
					</span>
				</button>
			</div>
			{renderListModal()}
			{renderTagModal()}
		</aside>
	);
};

export default TasksSidebar;
