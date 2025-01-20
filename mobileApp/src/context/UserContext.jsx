import {createContext, useContext, useState, useEffect} from 'react';
import {listService} from '../services/listApi';
import {db} from '../config/firebase';
import {storage} from '../config/firebase';
import {ref, getDownloadURL} from 'firebase/storage';
import {useAuth} from './AuthContext';
import {asyncStorage} from '../utils/secureStorage';
import {useListContext} from './ListContext';
import {getUserPhotoURL} from '../utils/userPhoto';

const UserContext = createContext(null);

export function UserProvider({children}) {
  const {user} = useAuth();
  const {lists} = useListContext();
  const [relationships, setRelationships] = useState(null);

  useEffect(() => {
    if (!user?.id) {
      setRelationships(null);
      return;
    }

    // Get all unique user IDs from lists where:
    // 1. User is the owner - get sharedUsers
    // 2. User is in sharedUsers - get owner and other sharedUsers
    const userIds = new Set();

    lists.forEach(list => {
      if (list.ownerId === user.id) {
        // If I'm the owner, get all shared users
        list.sharedWith?.forEach(sharedUser => {
          userIds.add(sharedUser);
        });
      } else if (list.sharedWith?.some(sharedUser => sharedUser === user.id)) {
        // If I'm a shared user, get owner and other shared users
        userIds.add(list.ownerId);
        list.sharedWith.forEach(sharedUser => {
          if (sharedUser !== user.id) {
            userIds.add(sharedUser);
          }
        });
      }
    });

    // Remove current user's ID if it's in the set
    userIds.delete(user.id);

    // Convert Set to Array
    const uniqueUserIds = Array.from(userIds);

    if (uniqueUserIds.length === 0) {
      setRelationships([]);
      return;
    }

    // Fetch user data from Firestore
    const fetchUserData = async () => {
      try {
        const usersRef = db.collection('users');
        const userSnapshots = await Promise.all(
          uniqueUserIds.map(userId => usersRef.doc(userId).get()),
        );

        const relationships = await Promise.all(
          userSnapshots
            .filter(snapshot => snapshot.exists)
            .map(async snapshot => {
              const userData = snapshot.data();
              let avatarUrl = null;
              console.log(
                'File: UserContext.jsx, Line: 71, userData: ',
                userData,
              );
              // Fetch avatar URL if photoURL exists
              if (userData.photoURL) {
                try {
                  avatarUrl = await getUserPhotoURL(userData.photoURL);
                } catch (error) {
                  console.error('Error fetching avatar URL:', error);
                }
              }

              const relatedLists = lists.filter(
                list =>
                  list.ownerId === snapshot.id ||
                  list.sharedWith?.includes(snapshot.id),
              );

              return {
                userId: snapshot.id,
                userData: {
                  ...userData,
                  avatarUrl, // Add the avatar URL to userData
                },
                sharedLists: relatedLists.map(list => ({
                  listId: list.id,
                  isOwner: list.ownerId === snapshot.id,
                })),
              };
            }),
        );

        setRelationships(relationships);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setRelationships([]);
      }
    };

    fetchUserData();
  }, [lists, user]);

  const value = {
    relationships,
    setRelationships,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}
