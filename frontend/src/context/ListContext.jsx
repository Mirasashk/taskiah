import { createContext, useContext, useState, useEffect } from 'react';
import { listService } from '../services/listApi';
import { useUser } from './UserContext';

const ListContext = createContext(null); // Initialize with null

export function ListProvider({ children }) {
	const [lists, setLists] = useState([]); // All lists
	const [myTasksList, setMyTasksList] = useState(null); // My Tasks list
	const [myLists, setMyLists] = useState([]); // My lists (not including My Tasks list)
	const [sharedLists, setSharedLists] = useState([]); // Shared lists
	const [tags, setTags] = useState([]); // Tags
	const { userData } = useUser();

	useEffect(() => {
		if (userData) {
			getLists(userData.id);
			getTags(userData.id);
		}
	}, [userData]);

	useEffect(() => {
		console.log('Lists:', lists);
	}, [lists]);

	const getLists = async (userId) => {
		const response = await listService.getListsByUserId(userId);

		//Sort the list so that My Tasks list is first
		setLists(response.data);
		setMyLists(response.data.filter((list) => list.name !== 'My Tasks'));
		setMyTasksList(response.data.find((list) => list.name === 'My Tasks'));
		getSharedLists(userData.id);
	};

	const getSharedLists = async (userId) => {
		const response = await listService.getSharedListsByUserId(userId);
		setLists((prevLists) => [...prevLists, ...response.data]);
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
		myLists,
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
