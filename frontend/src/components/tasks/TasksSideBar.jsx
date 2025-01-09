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
import { useLoading } from '../../context/LoadingContext';

const TasksSidebar = ({ onFilterTasks, isMobile = false }) => {
	// Contexts
	const { userData } = useUser();
	const {
		sharedLists,
		myLists,
		tags,
		myTasksList,
		selectedList,
		setSelectedList,
	} = useListContext();
	const { tasks, filterTasks, filter, deletedTasks, setSelectedTask } =
		useTaskContext();
	const { isLoading } = useLoading();

	// States
	const [selectedFilter, setSelectedFilter] = useState(filter);
	const [isListModalOpen, setIsListModalOpen] = useState(false);
	const [isTagModalOpen, setIsTagModalOpen] = useState(false);

	//variables
	const today = new Date();

	const filterTasksByItem = (tasks, item) => {
		if (!tasks || !item) return [];
		if (item.tasks) {
			// For lists
			return tasks.filter((task) => item.tasks.includes(task.id));
		} else if (item.id) {
			// For tags
			return tasks.filter((task) => task.tagIds?.includes(item.id));
		}
		return [];
	};

	useEffect(() => {
		filterTasks(tasks, selectedFilter);
		setSelectedTask(null);
	}, [selectedFilter, tasks]);

	// Functions
	const todayTasks =
		tasks?.filter((task) => {
			const taskDate = new Date(task.dueDate);
			return (
				taskDate.toDateString() === today.toDateString() &&
				task.status !== 'deleted'
			);
		}) || [];

	const importantTasks =
		tasks?.filter(
			(task) =>
				task.priority === 'high' &&
				task.ownerId === userData?.id &&
				task.status !== 'deleted'
		) || [];

	const staticFilterOptions = [
		{
			icon: 'inbox',
			label: 'All tasks',
			count:
				tasks?.filter((task) => task.status !== 'deleted')?.length || 0,
		},
		{
			icon: 'person',
			label: 'My tasks',
			count:
				tasks?.filter(
					(task) =>
						task.status !== 'deleted' &&
						myTasksList?.tasks?.includes(task.id)
				)?.length || 0,
		},
		{
			icon: 'calendar',
			label: 'Today',
			count:
				todayTasks?.filter((task) => task.status !== 'deleted')
					?.length || 0,
		},
		{
			icon: 'star',
			label: 'Important',
			count:
				importantTasks?.filter((task) => task.status !== 'deleted')
					?.length || 0,
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
				title='Create a Category Tag'
			>
				<CreateTagForm onClose={() => setIsTagModalOpen(false)} />
			</Modal>
		);
	};

	if (isLoading) {
		return (
			<div className='w-64 bg-white rounded-lg dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4'>
				<div className='animate-pulse space-y-4'>
					<div className='h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4'></div>
					<div className='h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2'></div>
					<div className='h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3'></div>
					<div className='h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2'></div>
				</div>
			</div>
		);
	}

	if (isMobile) {
		return (
			<>
				{/* Filter Options */}
				<nav className='flex space-x-4'>
					{/* Static Filters */}
					<div className='flex space-x-4'>
						{staticFilterOptions.map((option, index) => (
							<SideBarItem
								key={index}
								icon={option.icon}
								label={option.label}
								count={option.count}
								selected={selectedFilter === option.label}
								onClick={() => {
									setSelectedFilter(option.label);
									setSelectedList(myTasksList);
								}}
								isMobile={true}
							/>
						))}
					</div>

					{/* My Lists Section */}
					<div className='flex space-x-4'>
						<div className='flex items-center'>
							<div className='h-8 w-px bg-gray-300 dark:bg-gray-600 mx-2'></div>
						</div>

						{myLists?.map((list) => (
							<SideBarItem
								key={list.id}
								icon='list'
								label={list.name}
								count={list.tasks?.length || 0}
								selected={selectedFilter === list.name}
								onClick={() => {
									setSelectedList(list);
									setSelectedFilter(list.name);
								}}
								isMobile={true}
							/>
						))}
						<div className='flex flex-col items-center justify-start p-2 rounded-lg min-w-[80px] text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'>
							<button
								onClick={() => setIsListModalOpen(true)}
								className='flex flex-col items-center justify-start p-2 rounded-lg min-w-[80px] text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'
							>
								<div className='flex justify-center w-8 h-8 mb-1'>
									<FiList />
								</div>
								<span className='text-xs font-medium'>
									Add List
								</span>
							</button>
						</div>
					</div>

					{/* Shared Lists Section */}
					{sharedLists?.length > 0 && (
						<div className='flex space-x-4'>
							<div className='flex items-center'>
								<div className='h-8 w-px bg-gray-300 dark:bg-gray-600 mx-2'></div>
							</div>
							{sharedLists.map((list) => (
								<SideBarItem
									key={list.id}
									icon='share'
									label={list.name}
									count={list.tasks?.length || 0}
									selected={selectedFilter === list.name}
									onClick={() => {
										setSelectedList(list);
										setSelectedFilter(list.name);
									}}
									isMobile={true}
								/>
							))}
						</div>
					)}

					{/* Tags Section */}
					<div className='flex space-x-4'>
						<div className='flex items-center'>
							<div className='h-8 w-px bg-gray-300 dark:bg-gray-600 mx-2'></div>
						</div>

						{tags?.map((tag) => (
							<SideBarItem
								key={tag.id}
								icon='tag'
								label={tag.name}
								color={tag.color}
								count={
									filterTasksByItem(tasks, tag)?.length || 0
								}
								selected={selectedFilter === tag.name}
								onClick={() => {
									setSelectedFilter(tag.name);
									setSelectedList(myTasksList);
								}}
								isMobile={true}
							/>
						))}
						<div className='flex flex-col items-center justify-start p-2 rounded-lg min-w-[80px] text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'>
							<button
								onClick={() => setIsTagModalOpen(true)}
								className='flex flex-col items-center justify-start p-2 rounded-lg min-w-[80px] text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'
							>
								<div className='flex justify-center w-8 h-8 mb-1'>
									<FiTag />
								</div>
								<span className='text-xs font-medium'>
									Add Tag
								</span>
							</button>
						</div>
					</div>

					{/* Deleted Section */}
					<div className='flex space-x-4'>
						<div className='flex items-center'>
							<div className='h-8 w-px bg-gray-300 dark:bg-gray-600 mx-2'></div>
						</div>
						<SideBarItem
							icon='trash'
							label='Deleted'
							count={deletedTasks?.length || 0}
							selected={selectedFilter === 'Deleted'}
							onClick={() => {
								setSelectedFilter('Deleted');
								setSelectedList(myTasksList);
							}}
							isMobile={true}
						/>
					</div>
				</nav>
				{renderListModal()}
				{renderTagModal()}
			</>
		);
	}

	return (
		<aside className='w-64 bg-white rounded-lg dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700'>
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
							onClick={() => {
								setSelectedFilter(option.label);
								setSelectedList(myTasksList);
							}}
						/>
					))}
				</nav>

				<hr className='my-4 border-gray-200 dark:border-gray-700' />

				<SideBarGroup
					title='My Lists'
					icon={<FiList />}
					items={myLists || []}
					selected={selectedFilter}
					onSelectedFilter={setSelectedFilter}
					children={
						<AddNewBtn
							onClick={() => setIsListModalOpen(true)}
							title='List'
						/>
					}
				/>

				<SideBarGroup
					title='Shared with me'
					icon={<FiShare />}
					items={sharedLists || []}
					selected={selectedFilter}
					onSelectedFilter={setSelectedFilter}
				/>

				<SideBarGroup
					title='Tags'
					icon={<FiTag />}
					items={tags || []}
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
					count={deletedTasks?.length || 0}
					selected={selectedFilter === 'Deleted'}
					onClick={() => {
						setSelectedFilter('Deleted');
						setSelectedList(myTasksList);
					}}
				/>
			</div>
			{renderListModal()}
			{renderTagModal()}
		</aside>
	);
};

export default TasksSidebar;
