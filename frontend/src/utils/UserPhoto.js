import { ref, getDownloadURL, listAll } from 'firebase/storage';
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

export const getAvatarURL = async (avatarNumber) => {
    //From firebase storage grab 6 random avatars from /avatars folder and return an array with the blob urls
    const storageRef = ref(storage, `avatars/`);
    const list = await listAll(storageRef);
    // pick 6 random from the list
    const randomList = list.items
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);

    const urls = await Promise.all(
        randomList.map(async (item) => {
            const url = await getDownloadURL(item);
            const urlObj = {
                path: item.fullPath,
                url: url,
            };
            return urlObj;
        })
    );

    return urls;
};
