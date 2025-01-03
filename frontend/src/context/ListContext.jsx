import { createContext, useContext, useState, useEffect } from 'react';
import { listService } from '../services/listApi';
import { useUser } from './UserContext';

const ListContext = createContext(null); // Initialize with null

export function ListProvider({ children }) {
	const [lists, setLists] = useState([]);
	const [myTasksList, setMyTasksList] = useState(null);
	const [sharedLists, setSharedLists] = useState([]);
	const { userData } = useUser();

	useEffect(() => {
		if (userData) {
			getLists(userData.id);
			getSharedLists(userData.email);
		}
	}, [userData]);

	const getLists = async (userId) => {
		const response = await listService.getListsByUserId(userId);
		setLists(response.data.filter((list) => list.name !== 'My Tasks'));
		setMyTasksList(response.data.find((list) => list.name === 'My Tasks'));
	};

	const getSharedLists = async (email) => {
		const response = await listService.getSharedListsByEmail(email);
		setSharedLists(response.data);
	};

	const value = {
		lists,
		sharedLists,
		myTasksList,
		getLists,
		getSharedLists,
	};

	return (
		<ListContext.Provider value={value}>{children}</ListContext.Provider>
	);
}

export function useListContext() {
	return useContext(ListContext);
}
