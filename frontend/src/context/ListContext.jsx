import { createContext, useContext, useState, useEffect } from 'react';
import { listService } from '../services/listApi';
import { useUser } from './UserContext';

const ListContext = createContext(null); // Initialize with null

export function ListProvider({ children }) {
	const [lists, setLists] = useState([]);
	const { userData } = useUser();

	useEffect(() => {
		if (userData) {
			getLists(userData.id);
		}
	}, [userData]);

	const getLists = async (userId) => {
		const response = await listService.getListsByUserId(userId);
		setLists(response.data);
	};

	const value = {
		lists,
		getLists,
	};

	return (
		<ListContext.Provider value={value}>{children}</ListContext.Provider>
	);
}

export function useListContext() {
	return useContext(ListContext);
}
