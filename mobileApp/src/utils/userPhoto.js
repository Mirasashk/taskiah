import storage from '@react-native-firebase/storage';
import {getCachedAvatarUri} from './imageCache';
import {asyncStorage} from './secureStorage';

const URL_CACHE_KEY = 'photo_url_cache';
const URL_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const getUrlCache = async () => {
  try {
    const cache = await asyncStorage.getItem(URL_CACHE_KEY);
    return cache ? JSON.parse(cache) : {};
  } catch (error) {
    console.error('Error reading URL cache:', error);
    return {};
  }
};

const updateUrlCache = async cache => {
  try {
    await asyncStorage.setItem(URL_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Error updating URL cache:', error);
  }
};

export const getUserPhotoURL = async (photoPath, userId) => {
  if (!photoPath) {
    return null;
  }

  try {
    // Check URL cache first
    const urlCache = await getUrlCache();
    const cachedData = urlCache[photoPath];
    const now = Date.now();

    // If we have a valid cached URL, use it
    if (cachedData && now - cachedData.timestamp < URL_CACHE_DURATION) {
      return cachedData.url;
    }

    // If no valid cache, fetch from Firebase
    const reference = storage().ref(photoPath);
    const downloadUrl = await reference.getDownloadURL();

    // Update URL cache
    urlCache[photoPath] = {
      url: downloadUrl,
      timestamp: now,
    };
    await updateUrlCache(urlCache);

    return downloadUrl;
  } catch (error) {
    console.error('Error getting user photo URL:', error);
    return null;
  }
};

// New function that combines URL fetching and caching
export const getCachedUserPhoto = async (photoPath, userId) => {
  if (!photoPath || !userId) {
    return null;
  }

  try {
    const downloadUrl = await getUserPhotoURL(photoPath);
    if (!downloadUrl) {
      return null;
    }

    return await getCachedAvatarUri(downloadUrl, userId);
  } catch (error) {
    console.error('Error getting cached user photo:', error);
    return null;
  }
};
