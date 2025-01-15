import { useMemo } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useListContext } from '../context/ListContext';

export const useFilterTasks = () => {
	const { tasks, selectedFilter } = useTaskContext();
	const { selectedList, tags } = useListContext();

	return useMemo(() => {
		if (!tasks) return [];

		// Special cases that should search across all tasks
		if (
			selectedFilter === 'Today' ||
			selectedFilter === 'Important' ||
			selectedFilter === 'Deleted' ||
			selectedFilter === 'All tasks'
		) {
			switch (selectedFilter) {
				case 'All tasks':
					return tasks.filter(
						(task) =>
							task.status !== 'deleted' &&
							task.status !== 'archived'
					);

				case 'Today':
					const today = new Date();
					return tasks.filter((task) => {
						if (!task.dueDate || task.status === 'deleted')
							return false;
						const taskDate = new Date(task.dueDate);
						return taskDate.toDateString() === today.toDateString();
					});

				case 'Important':
					return tasks.filter(
						(task) =>
							task.priority === 'high' &&
							task.status !== 'deleted'
					);

				case 'Deleted':
					const sevenDaysAgo = new Date();
					sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
					return tasks.filter(
						(task) =>
							task.status === 'deleted' &&
							new Date(task.updatedAt) > sevenDaysAgo
					);
			}
		}

		// For other filters, first filter by selected list
		let filteredTasks = tasks;
		if (selectedList) {
			filteredTasks = tasks.filter(
				(task) => task.listId === selectedList.id
			);
		}

		// Then apply additional filters
		switch (selectedFilter) {
			case 'My tasks':
				return filteredTasks.filter(
					(task) =>
						task.status !== 'deleted' && task.status !== 'archived'
				);

			default:
				// Check if filter is a tag name
				const matchingTag = tags?.find(
					(tag) => tag.name === selectedFilter
				);
				if (matchingTag) {
					return filteredTasks.filter(
						(task) =>
							task.tagIds?.includes(matchingTag.id) &&
							task.status !== 'deleted'
					);
				}

				// If no specific filter matches, return tasks filtered by list only
				return filteredTasks.filter(
					(task) =>
						task.status !== 'deleted' && task.status !== 'archived'
				);
		}
	}, [tasks, selectedFilter, selectedList, tags]);
};
