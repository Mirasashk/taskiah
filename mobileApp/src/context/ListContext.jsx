import {createContext, useContext, useState, useEffect} from 'react';
import {listService} from '../services/listApi';
import {db} from '../config/firebase';
import {useAuth} from './AuthContext';
import {asyncStorage} from '../utils/secureStorage';

const ListContext = createContext(null);

export function ListProvider({children}) {
  const [lists, setLists] = useState([]); // All lists
  const [myTasksList, setMyTasksList] = useState(null); // My Tasks list
  const [myLists, setMyLists] = useState([]); // My lists (not including My Tasks list)
  const [sharedLists, setSharedLists] = useState([]); // Shared lists
  const [tags, setTags] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const {user} = useAuth();

  // Load saved list ID from localStorage
  const savedListId = asyncStorage.getItem('selectedListId');

  // Helper function to update a list in state arrays
  const updateListInState = (listData, listId) => {
    const updatedList = {...listData, id: listId};

    setLists(prevLists => {
      const listIndex = prevLists.findIndex(l => l.id === listId);
      if (listIndex === -1) {
        return [...prevLists, updatedList];
      }
      const newLists = [...prevLists];
      newLists[listIndex] = updatedList;
      return newLists;
    });

    // Update myTasksList if needed
    if (listData.name === 'My Tasks' && listData.ownerId === user.id) {
      setMyTasksList(updatedList);
      if (!selectedList) {
        setSelectedList(updatedList);
      }
    }

    // Update myLists
    if (listData.ownerId === user.id && listData.name !== 'My Tasks') {
      setMyLists(prevMyLists => {
        const listIndex = prevMyLists.findIndex(l => l.id === listId);
        if (listIndex === -1) {
          return [...prevMyLists, updatedList];
        }
        const newMyLists = [...prevMyLists];
        newMyLists[listIndex] = updatedList;
        return newMyLists;
      });
    }

    // Update sharedLists
    if (listData.sharedWith?.includes(user.id)) {
      setSharedLists(prevSharedLists => {
        const listIndex = prevSharedLists.findIndex(l => l.id === listId);
        if (listIndex === -1) {
          return [...prevSharedLists, updatedList];
        }
        const newSharedLists = [...prevSharedLists];
        newSharedLists[listIndex] = updatedList;
        return newSharedLists;
      });
    }

    // Update selectedList if it's the current one
    if (selectedList?.id === listId) {
      setSelectedList(updatedList);
    }
  };

  // Helper function to remove a list from state arrays
  const removeListFromState = listId => {
    setLists(prevLists => prevLists.filter(l => l.id !== listId));
    setMyLists(prevMyLists => prevMyLists.filter(l => l.id !== listId));
    setSharedLists(prevSharedLists =>
      prevSharedLists.filter(l => l.id !== listId),
    );

    if (myTasksList?.id === listId) {
      setMyTasksList(null);
    }

    if (selectedList?.id === listId) {
      setSelectedList(myTasksList || null);
    }
  };

  useEffect(() => {
    if (!user?.id) {
      setLists([]);
      setMyLists([]);
      setSharedLists([]);
      setMyTasksList(null);
      setSelectedList(null);
      return;
    }

    try {
      // Query for lists owned by the user
      const ownedListsQuery = db
        .collection('lists')
        .where('ownerId', '==', user.id);

      // Query for lists shared with the user
      const sharedListsQuery = db
        .collection('lists')
        .where('sharedWith', 'array-contains', user.id);

      // Listen for owned lists changes
      const unsubOwned = ownedListsQuery.onSnapshot(
        snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added' || change.type === 'modified') {
              updateListInState(change.doc.data(), change.doc.id);
            } else if (change.type === 'removed') {
              removeListFromState(change.doc.id);
            }
          });
        },
        error => {
          console.error('Error in owned lists listener:', error);
        },
      );

      // Listen for shared lists changes
      const unsubShared = sharedListsQuery.onSnapshot(
        snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added' || change.type === 'modified') {
              updateListInState(change.doc.data(), change.doc.id);
            } else if (change.type === 'removed') {
              removeListFromState(change.doc.id);
            }
          });
        },
        error => {
          console.error('Error in shared lists listener:', error);
        },
      );

      return () => {
        unsubOwned();
        unsubShared();
      };
    } catch (error) {
      console.error('Error setting up lists query:', error);
    }
  }, [user?.id]);

  // Save selected list to localStorage
  useEffect(() => {
    if (selectedList?.id) {
      asyncStorage.setItem('selectedListId', selectedList.id);
    }
  }, [selectedList]);

  const getTags = async userId => {
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

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
}

export function useListContext() {
  return useContext(ListContext);
}
