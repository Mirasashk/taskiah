import React, { useState } from 'react';
import SideBarItem from './SideBarItem';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useTaskContext } from '../../context/TaskContext';
import { useListContext } from '../../context/ListContext';
const SideBarGroup = ({
	title,
	icon,
	items,
	children,
	selected,
	onSelectedFilter,
}) => {
	const [showProjects, setShowProjects] = useState(false);
	const { tasks } = useTaskContext();
	const { selectedList, setSelectedList } = useListContext();

	const handleOnClick = (item) => {
		setSelectedList(item);
		onSelectedFilter(item.name);
	};

	const getItemType = () => {
		switch (title) {
			case 'My Lists':
				return 'list';
			case 'Shared with me':
				return 'sharedList';
			case 'Tags':
				return 'tag';
			default:
				return null;
		}
	};

	const getItemCount = (item) => {
		if (!tasks) return 0;

		switch (getItemType()) {
			case 'list':
				const filteredTasks = tasks?.filter(
					(task) =>
						task.listId === item.id &&
						task.status !== 'deleted' &&
						task.status !== 'completed'
				);
				return filteredTasks.length || 0;
			case 'sharedList':
				return (
					tasks?.filter(
						(task) =>
							task.listId === item.id &&
							task.status !== 'deleted' &&
							task.status !== 'completed'
					).length || 0
				);
			case 'tag':
				return tasks.filter(
					(task) =>
						task.tagIds?.includes(item.id) &&
						task.status !== 'deleted'
				).length;
			default:
				return 0;
		}
	};

	return (
		<div>
			<div
				className='flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
				onClick={() => setShowProjects(!showProjects)}
			>
				{showProjects ? <FiChevronDown /> : <FiChevronRight />}
				<h3 className='text-md font-normal text-gray-700 dark:text-gray-200'>
					{title}
				</h3>
				{icon}
			</div>
			{showProjects && (
				<div className='flex justify-end'>
					<div className='w-11/12'>
						{items.map((item) => {
							return (
								<SideBarItem
									key={item.id}
									icon={item.icon}
									label={item.name}
									count={getItemCount(item)}
									selected={selected === item.name}
									onClick={() => handleOnClick(item)}
									color={item.color}
									labelStyle={item.labelStyle}
									trash={true}
									itemType={getItemType()}
									item={item}
								/>
							);
						})}
						{children}
					</div>
				</div>
			)}
		</div>
	);
};

export default SideBarGroup;
