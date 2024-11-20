import {
    createContext,
    useContext,
    useState,
    useEffect,
} from 'react';
import { userService } from '../services/api';
import { useAuth } from './AuthContext';

const UserContext = createContext(null);

const CACHE_KEY = 'userData';
const CACHE_EXPIRY = 1000 * 60 * 60; // 1 hour in milliseconds

export function UserProvider({ children }) {
    const [userData, setUserData] = useState(() => {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);
            const now = Date.now();
            if (now - timestamp < CACHE_EXPIRY) {
                return data;
            }
            localStorage.removeItem(CACHE_KEY);
        }
        return null;
    });

    const { user } = useAuth();

    const updateUserData = async (userId) => {
        try {
            const response = await userService.getUser(userId);
            setUserData(response.data);
            // Cache the user data with timestamp
            localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({
                    data: response.data,
                    timestamp: Date.now(),
                })
            );
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const clearUserData = () => {
        setUserData(null);
        localStorage.removeItem(CACHE_KEY);
    };

    useEffect(() => {
        if (user && !userData) {
            updateUserData(user.uid);
        }
    }, [user]);

    const value = {
        userData,
        updateUserData,
        clearUserData,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
