import { createContext, useContext, useState, useEffect } from 'react';
import { listService } from '../services/listApi';
import { useUser } from './UserContext';
import { db } from '../config/firebase';
import {
	doc,
	updateDoc,
	arrayUnion,
	onSnapshot,
	query,
	where,
	collection,
	or,
} from 'firebase/firestore';

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
		if (!userData?.id) return;

		const listsQuery = query(
			collection(db, 'lists'),
			or(
				where('ownerId', '==', userData.id),
				where('sharedWith', 'array-contains', userData.id)
			)
		);

		const unsub = onSnapshot(listsQuery, (querySnapshot) => {
			const newLists = [];
			querySnapshot.forEach((doc) => {
				newLists.push({ id: doc.id, ...doc.data() });
			});
			setLists(newLists);

			// Update selectedList
			if (selectedList) {
				const updatedList = newLists.find(
					(list) => list.id === selectedList.id
				);
				if (updatedList) {
					setSelectedList(updatedList);
				}
			} else {
				const myTasksList = newLists.find(
					(list) =>
						list.name === 'My Tasks' && list.ownerId === userData.id
				);
				setSelectedList(myTasksList);
			}

			// Update other list states
			const newMyTasksList = newLists.find(
				(list) => list.name === 'My Tasks'
			);
			const newMyLists = newLists.filter(
				(list) =>
					list.name !== 'My Tasks' && list.ownerId === userData.id
			);
			const newSharedLists = newLists.filter((list) =>
				list.sharedWith.includes(userData.id)
			);

			setMyTasksList(newMyTasksList);
			setMyLists(newMyLists);
			setSharedLists(newSharedLists);
		});
		return () => unsub();
	}, [userData]);

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
	};

	return (
		<ListContext.Provider value={value}>{children}</ListContext.Provider>
	);
}

export function useListContext() {
	return useContext(ListContext);
}
