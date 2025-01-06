import { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '../services/userApi';
import { useAuth } from './AuthContext';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const UserContext = createContext(null);

const CACHE_KEY = 'userData';
const IMAGE_CACHE_KEY = 'userImage';
const IMAGE_CACHE_EXPIRY = 1000 * 60 * 60 * 24; // 24 hours in milliseconds
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

	const [userImage, setUserImage] = useState(() => {
		const cachedImage = localStorage.getItem(IMAGE_CACHE_KEY);
		if (cachedImage) {
			return JSON.parse(cachedImage).data;
		}
		return null;
	});
	const { user } = useAuth();

	const getUserImage = async (photoURL) => {
		// Check if image is in cache
		const cachedImage = localStorage.getItem(IMAGE_CACHE_KEY);
		if (cachedImage) {
			const { data, timestamp, url } = JSON.parse(cachedImage);
			const now = Date.now();
			if (now - timestamp < IMAGE_CACHE_EXPIRY && url === photoURL) {
				setUserImage(data);
				return data;
			}
			localStorage.removeItem(IMAGE_CACHE_KEY);
		}

		try {
			const storage = getStorage();
			// Remove gs:// prefix if it exists
			const imagePath = photoURL;
			const imageRef = ref(storage, imagePath);
			const url = await getDownloadURL(imageRef);

			// Download the image using the signed URL
			const response = await fetch(url);
			const blob = await response.blob();

			// Convert blob to base64
			const reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onloadend = () => {
				const base64data = reader.result;
				localStorage.setItem(
					IMAGE_CACHE_KEY,
					JSON.stringify({
						data: base64data,
						timestamp: Date.now(),
						url: photoURL,
					})
				);
				setUserImage(base64data);
			};
		} catch (error) {
			console.error('Error fetching user image:', error);
		}
	};

	/**
	 * Updates or fetches user data
	 * @param {string|object} payload - User ID for fetching, or update data object
	 * @returns {Promise<void>}
	 */
	const updateUserData = async (payload) => {
		try {
			let response;

			// If payload is a string, it's a userId for fetching data
			if (typeof payload === 'string') {
				response = await userService.getUser(payload);
			}
			// If payload is an object, it's an update request
			else if (typeof payload === 'object') {
				response = await userService.updateUser(user.uid, payload);
			}

			if (response?.data) {
				setUserData(response.data);
				// Cache the user data with timestamp
				localStorage.setItem(
					CACHE_KEY,
					JSON.stringify({
						data: response.data,
						timestamp: Date.now(),
					})
				);
				// If user has a photo URL, get the image
				if (response.data.photoURL) {
					await getUserImage(response.data.photoURL);
				}
			}
		} catch (error) {
			console.error('Error updating/fetching user data:', error);
			throw error; // Rethrow to handle in components
		}
	};

	const clearUserData = () => {
		setUserData(null);
		setUserImage(null);
		localStorage.removeItem(CACHE_KEY);
		localStorage.removeItem(IMAGE_CACHE_KEY);
	};

	useEffect(() => {
		if (user && !userData) {
			updateUserData(user.uid);
		}
	}, [user]);

	const value = {
		userData,
		userImage,
		updateUserData,
		clearUserData,
		getUserImage,
	};

	return (
		<UserContext.Provider value={value}>{children}</UserContext.Provider>
	);
}

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};
