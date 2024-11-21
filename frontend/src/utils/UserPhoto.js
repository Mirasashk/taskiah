import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

export const getUserPhotoURL = async (photoPath) => {
    if (!photoPath) return null;

    try {
        const storageRef = ref(storage, photoPath);
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error('Error getting user photo URL:', error);
        return null;
    }
};
