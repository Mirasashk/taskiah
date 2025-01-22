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
      console.log('user data in list context', user);

      // Query for lists owned by the user
      const ownedListsQuery = db
        .collection('lists')
        .where('ownerId', '==', user.id);

      // Query for lists shared with the user
      const sharedListsQuery = db
        .collection('lists')
        .where('sharedWith', 'array-contains', user.id);

      // Combine results from both queries
      const unsubOwned = ownedListsQuery.onSnapshot(
        ownedSnapshot => {
          console.log('ownedSnapshot', ownedSnapshot);
          const ownedLists = [];
          ownedSnapshot.forEach(doc => {
            ownedLists.push({...doc.data(), id: doc.id});
            console.log('ownedLists', doc.data());
          });

          const unsubShared = sharedListsQuery.onSnapshot(
            sharedSnapshot => {
              const sharedLists = [];
              sharedSnapshot.forEach(doc => {
                sharedLists.push({...doc.data(), id: doc.id});
                console.log('sharedLists', doc.data());
              });

              // Combine and deduplicate lists
              const allLists = [...ownedLists, ...sharedLists];
              const uniqueLists = Array.from(
                new Map(allLists.map(list => [list.id, list])).values(),
              );

              setLists(uniqueLists);

              // Process lists for different categories
              const myTasksList = uniqueLists.find(
                list => list.name === 'My Tasks',
              );
              const newMyLists = uniqueLists.filter(
                list => list.ownerId === user.id && list.name !== 'My Tasks',
              );
              const newSharedLists = uniqueLists.filter(list =>
                list.sharedWith.includes(user.id),
              );

              setMyTasksList(myTasksList || null);
              setMyLists(newMyLists);
              setSharedLists(newSharedLists);

              // Handle selected list
              if (savedListId) {
                const savedList = uniqueLists.find(
                  list => list.id === savedListId,
                );
                setSelectedList(savedList || myTasksList || null);
              } else if (!selectedList && myTasksList) {
                setSelectedList(myTasksList);
              }
            },
            error => {
              console.error('Error in shared lists listener:', error);
            },
          );

          return () => unsubShared();
        },
        error => {
          console.error('Error in owned lists listener:', error);
        },
      );

      return () => unsubOwned();
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
