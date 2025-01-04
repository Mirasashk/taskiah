import { createContext, useContext, useState, useEffect } from 'react';
import { listService } from '../services/listApi';
import { useUser } from './UserContext';

const ListContext = createContext(null); // Initialize with null

export function ListProvider({ children }) {
	const [lists, setLists] = useState([]);
	const [myTasksList, setMyTasksList] = useState(null);
	const [sharedLists, setSharedLists] = useState([]);
	const [tags, setTags] = useState([]);
	const { userData } = useUser();

	useEffect(() => {
		if (userData) {
			getLists(userData.id);
			getSharedLists(userData.id);
			getTags(userData.id);
		}
	}, [userData]);

	const getLists = async (userId) => {
		const response = await listService.getListsByUserId(userId);
		setLists(response.data.filter((list) => list.name !== 'My Tasks'));
		setMyTasksList(response.data.find((list) => list.name === 'My Tasks'));
	};

	const getSharedLists = async (userId) => {
		const response = await listService.getSharedListsByUserId(userId);
		setSharedLists(response.data);
	};

	const getTags = async (userId) => {
		const response = await listService.getTagsByUserId(userId);
		setTags(response.data);
	};

	const refreshContext = async () => {
		await getLists(userData.id);
		await getSharedLists(userData.email);
		await getTags(userData.id);
	};

	const value = {
		lists,
		sharedLists,
		myTasksList,
		tags,
		getTags,
		getLists,
		getSharedLists,
		refreshContext,
	};

	return (
		<ListContext.Provider value={value}>{children}</ListContext.Provider>
	);
}

export function useListContext() {
	return useContext(ListContext);
}
