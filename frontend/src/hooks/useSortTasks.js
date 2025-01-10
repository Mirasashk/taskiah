import { useMemo } from 'react';

const PRIORITY_ORDER = {
	high: 3,
	medium: 2,
	low: 1,
};

const STATUS_ORDER = {
	active: 4,
	completed: 3,
	archived: 2,
	deleted: 1,
};

export const useSortTasks = (tasks, sortKey, sortAscending = false) => {
	return useMemo(() => {
		if (!tasks || !sortKey) return tasks;

		return [...tasks].sort((a, b) => {
			let comparison = 0;

			switch (sortKey) {
				case 'createdAt':
					comparison = new Date(b.createdAt) - new Date(a.createdAt);
					break;

				case 'dueDate':
					// Handle cases where dueDate might be null/undefined
					if (!a.dueDate && !b.dueDate) return 0;
					if (!a.dueDate) return 1;
					if (!b.dueDate) return -1;
					comparison = new Date(a.dueDate) - new Date(b.dueDate);
					break;

				case 'priority':
					comparison =
						(PRIORITY_ORDER[b.priority] || 0) -
						(PRIORITY_ORDER[a.priority] || 0);
					break;

				case 'status':
					comparison =
						(STATUS_ORDER[b.status] || 0) -
						(STATUS_ORDER[a.status] || 0);
					break;

				default:
					return 0;
			}

			return sortAscending ? -comparison : comparison;
		});
	}, [tasks, sortKey, sortAscending]);
};
