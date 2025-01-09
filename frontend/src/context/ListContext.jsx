import { createContext, useContext, useState, useEffect } from 'react';
import { listService } from '../services/listApi';
import { useUser } from './UserContext';

const ListContext = createContext(null); // Initialize with null

export function ListProvider({ children }) {
	const [lists, setLists] = useState([]); // All lists
	const [myTasksList, setMyTasksList] = useState(null); // My Tasks list
	const [myLists, setMyLists] = useState([]); // My lists (not including My Tasks list)
	const [sharedLists, setSharedLists] = useState([]); // Shared lists
	const [tags, setTags] = useState([]);
	const [selectedList, setSelectedList] = useState(null);
	const { userData } = useUser();

	useEffect(() => {
		if (userData) {
			getLists(userData.id);
			getTags(userData.id);
		}
	}, [userData]);

	useEffect(() => {
		if (!selectedList) {
			setSelectedList(myTasksList);
		}
	}, [myTasksList, selectedList]);

	const getLists = async (userId) => {
		const response = await listService.getListsByUserId(userId);

		//Sort the list so that My Tasks list is first
		setLists(response.data);
		setMyLists(response.data.filter((list) => list.name !== 'My Tasks'));
		setMyTasksList(response.data.find((list) => list.name === 'My Tasks'));
		getSharedLists(userId);

		if (selectedList) {
			const updatedList = response.data.find(
				(list) => list.id === selectedList.id
			);
			setSelectedList(updatedList);
		}
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

	const refreshListContext = async () => {
		if (userData) {
			await getLists(userData.id);
			await getSharedLists(userData.id);
			await getTags(userData.id);

			// Update selectedList with fresh data if it exists
			if (selectedList) {
				const updatedList = lists.find(
					(list) => list.id === selectedList.id
				);
				setSelectedList(updatedList || myTasksList);
			} else {
				setSelectedList(myTasksList);
			}
		}
	};

	const value = {
		lists,
		myLists,
		sharedLists,
		myTasksList,
		tags,
		selectedList,
		setSelectedList,
		getTags,
		getLists,
		getSharedLists,
		refreshListContext,
	};

	return (
		<ListContext.Provider value={value}>{children}</ListContext.Provider>
	);
}

export function useListContext() {
	return useContext(ListContext);
}
