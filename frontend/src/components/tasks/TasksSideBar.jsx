import { useState, useEffect } from 'react';
import { FiInbox, FiCalendar, FiStar, FiTag, FiList } from 'react-icons/fi';
import { useTaskContext } from '../../context/TaskContext';
import { useUser } from '../../context/UserContext';
import Input from '../forms/Input';

import { useColor } from 'react-color-palette';
import CustomColorPicker from '../common/ColorPicker';
import { FiTrash2, FiShare } from 'react-icons/fi';
import SideBarGroup from './SideBarGroup';
import AddNewBtn from './AddNewBtn';
import Modal from '../common/Modal';
import CreateListForm from './CreateListForm';
import CreateTagForm from './CreateTagForm';
import { useListContext } from '../../context/ListContext';
import SideBarItem from './SideBarItem';
const TasksSidebar = ({ onFilterTasks }) => {
	// Contexts
	const { userData } = useUser();
	const { sharedLists, myLists, tags } = useListContext();
	const { tasks, filterTasks, filter, deletedTasks, setSelectedTask } =
		useTaskContext();

	// States
	const [selectedFilter, setSelectedFilter] = useState(filter);

	// const [selectedTag, setSelectedTag] = useState(null);
	const [isListModalOpen, setIsListModalOpen] = useState(false);
	const [isTagModalOpen, setIsTagModalOpen] = useState(false);

	//variables
	const today = new Date();

	useEffect(() => {
		filterTasks(tasks, selectedFilter);
		setSelectedTask(null);
	}, [selectedFilter, tasks]);

	// Functions
	const todayTasks = tasks.filter((task) => {
		const taskDate = new Date(task.dueDate);

		return (
			taskDate.toDateString() === today.toDateString() &&
			task.status !== 'deleted'
		);
	});

	const importantTasks = tasks.filter(
		(task) =>
			task.priority === 'high' &&
			task.ownerId === userData.id &&
			task.status !== 'deleted'
	);

	const staticFilterOptions = [
		{
			icon: 'inbox',
			label: 'All tasks',
			count: tasks.filter((task) => task.status !== 'deleted').length,
		},
		{
			icon: 'calendar',
			label: 'Today',
			count: todayTasks.filter((task) => task.status !== 'deleted')
				.length,
		},
		{
			icon: 'star',
			label: 'Important',
			count: importantTasks.filter((task) => task.status !== 'deleted')
				.length,
		},
	];

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
				<CreateTagForm onClose={() => setIsTagModalOpen(false)} />
			</Modal>
		);
	};

	return (
		<aside className='w-64 bg-white rounded-lg dark:bg-gray-800  border-r border-gray-200 dark:border-gray-700'>
			<div className='p-4 space-y-2'>
				{/* Filter Options */}
				<nav className='space-y-2'>
					{staticFilterOptions.map((option, index) => (
						<SideBarItem
							key={index}
							icon={option.icon}
							label={option.label}
							count={option.count}
							selected={selectedFilter === option.label}
							onClick={() => setSelectedFilter(option.label)}
						/>
					))}
				</nav>

				<hr className='my-4 border-gray-200 dark:border-gray-700' />

				<SideBarGroup
					title='My Lists'
					icon={<FiList />}
					items={myLists}
					selected={selectedFilter}
					onSelectedFilter={setSelectedFilter}
				>
					<AddNewBtn
						onClick={() => setIsListModalOpen(true)}
						title='List'
					/>
				</SideBarGroup>

				<SideBarGroup
					title='Shared with me'
					icon={<FiShare />}
					items={sharedLists}
					selected={selectedFilter}
					onSelectedFilter={setSelectedFilter}
				/>

				<SideBarGroup
					title='Tags'
					icon={<FiTag />}
					items={tags}
					selected={selectedFilter}
					onSelectedFilter={setSelectedFilter}
					children={
						<AddNewBtn
							onClick={() => setIsTagModalOpen(true)}
							title='Tag'
						/>
					}
				/>

				<hr className='my-4 border-gray-200 dark:border-gray-700' />

				<SideBarItem
					icon='trash'
					label='Deleted'
					count={deletedTasks.length}
					selected={selectedFilter === 'Deleted'}
					onClick={() => setSelectedFilter('Deleted')}
				/>
			</div>
			{renderListModal()}
			{renderTagModal()}
		</aside>
	);
};

export default TasksSidebar;
