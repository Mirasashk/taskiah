import { createContext, useContext, useState, useEffect } from 'react';
import { listService } from '../services/listApi';
import { useUser } from './UserContext';
import { db } from '../config/firebase';
import { onSnapshot, query, where, collection, or } from 'firebase/firestore';

const ListContext = createContext(null); // Initialize with null

export function ListProvider({ children }) {
	const [lists, setLists] = useState([]); // All lists
	const [myTasksList, setMyTasksList] = useState(null); // My Tasks list
	const [myLists, setMyLists] = useState([]); // My lists (not including My Tasks list)
	const [sharedLists, setSharedLists] = useState([]); // Shared lists
	const [tags, setTags] = useState([]);
	const [selectedList, setSelectedList] = useState(null);
	const { userData } = useUser();

	// Load saved list ID from localStorage
	const savedListId = localStorage.getItem('selectedListId');

	useEffect(() => {
		if (!userData?.id) {
			setLists([]);
			setMyLists([]);
			setSharedLists([]);
			setMyTasksList(null);
			setSelectedList(null);
			return;
		}

		try {
			const listsQuery = query(
				collection(db, 'lists'),
				or(
					where('ownerId', '==', userData.id),
					where('sharedWith', 'array-contains', userData.id)
				)
			);

			const unsub = onSnapshot(
				listsQuery,
				(querySnapshot) => {
					querySnapshot.docChanges().forEach((change) => {
						console.log('change', change);
						if (change.type === 'modified') {
							const data = {
								...change.doc.data(),
								id: change.doc.id,
							};

							setLists((prevLists) =>
								prevLists.map((list) =>
									list.id === data.id ? data : list
								)
							);
						}

						if (
							change.type === 'added' ||
							change.type === 'removed'
						) {
							const lists = [];
							const newMyTasksList = [];
							const newMyLists = [];
							const newSharedLists = [];

							querySnapshot.forEach((doc) => {
								const data = {
									...doc.data(),
									id: doc.id,
								};
								lists.push(data);
								if (data.name === 'My Tasks') {
									newMyTasksList.push(data.id);
								} else if (data.ownerId === userData.id) {
									newMyLists.push(data.id);
								} else if (
									data.sharedWith.includes(userData.id)
								) {
									newSharedLists.push(data.id);
								}
							});

							setLists(lists);

							// Set My Tasks list
							const myTasksList = lists.find(
								(list) => list.name === 'My Tasks'
							);
							setMyTasksList(myTasksList || null);

							// Set other lists
							setMyLists(newMyLists || []);
							setSharedLists(newSharedLists || []);

							// Restore selected list
							if (savedListId) {
								const savedList = lists.find(
									(list) => list.id === savedListId
								);
								if (savedList) {
									setSelectedList(savedList);
								} else {
									// If saved list not found, default to My Tasks
									setSelectedList(myTasksList || null);
								}
							} else if (!selectedList && myTasksList) {
								// If no saved list and no current selection, default to My Tasks
								setSelectedList(myTasksList);
							}
						}
					});
				},
				(error) => {
					console.error('Error in lists snapshot listener:', error);
				}
			);

			return () => unsub();
		} catch (error) {
			console.error('Error setting up lists query:', error);
		}
	}, [userData?.id]);

	// Save selected list to localStorage
	useEffect(() => {
		if (selectedList?.id) {
			localStorage.setItem('selectedListId', selectedList.id);
		}
	}, [selectedList]);

	const getTags = async (userId) => {
		const response = await listService.getTagsByUserId(userId);
		setTags(response.data);
	};

	const removeSharedUser = async (listId, userId) => {
		await listService.removeSharedUser(listId, userId);
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
		removeSharedUser,
	};

	return (
		<ListContext.Provider value={value}>{children}</ListContext.Provider>
	);
}

export function useListContext() {
	return useContext(ListContext);
}
