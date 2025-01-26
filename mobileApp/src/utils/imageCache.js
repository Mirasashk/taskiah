import RNFS from 'react-native-fs';
import {Platform} from 'react-native';
import {asyncStorage} from './secureStorage';

const AVATAR_CACHE_DIR = `${RNFS.CachesDirectoryPath}/avatars/`;
const AVATAR_CACHE_KEY = 'avatar_cache_map';

// Ensure cache directory exists
const ensureCacheDir = async () => {
  try {
    const exists = await RNFS.exists(AVATAR_CACHE_DIR);
    if (!exists) {
      await RNFS.mkdir(AVATAR_CACHE_DIR);
    }
  } catch (error) {
    console.error('Error creating cache directory:', error);
  }
};

// Get cached avatar map from storage
const getCachedAvatarMap = async () => {
  try {
    const cacheMap = await asyncStorage.getItem(AVATAR_CACHE_KEY);
    return cacheMap ? JSON.parse(cacheMap) : {};
  } catch (error) {
    console.error('Error reading avatar cache map:', error);
    return {};
  }
};

// Update cached avatar map
const updateCachedAvatarMap = async avatarMap => {
  try {
    await asyncStorage.setItem(AVATAR_CACHE_KEY, JSON.stringify(avatarMap));
  } catch (error) {
    console.error('Error updating avatar cache map:', error);
  }
};

export const getCachedAvatarUri = async (photoURL, userId) => {
  if (!photoURL) return null;

  await ensureCacheDir();
  const avatarMap = await getCachedAvatarMap();

  // Check if we have a cached version and it's not expired (7 days)
  const cachedInfo = avatarMap[userId];
  const now = Date.now();
  const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

  if (
    cachedInfo &&
    cachedInfo.photoURL === photoURL &&
    now - cachedInfo.timestamp < CACHE_DURATION
  ) {
    // Check if the cached file exists
    const exists = await RNFS.exists(cachedInfo.localUri);
    if (exists) {
      return `file://${cachedInfo.localUri}`;
    }
  }

  try {
    // Download and cache the image
    const filename = `${userId}_${Date.now()}.png`;
    const localUri = `${AVATAR_CACHE_DIR}${filename}`;

    // For Android emulator, replace localhost/127.0.0.1 with 10.0.2.2
    let downloadUrl = photoURL;
    if (
      Platform.OS === 'android' &&
      (photoURL.includes('localhost') || photoURL.includes('127.0.0.1'))
    ) {
      downloadUrl = photoURL.replace(/(localhost|127\.0\.0\.1)/g, '10.0.2.2');
    }

    await RNFS.downloadFile({
      fromUrl: downloadUrl,
      toFile: localUri,
      background: true,
    }).promise;

    // Update cache map
    avatarMap[userId] = {
      photoURL,
      localUri,
      timestamp: now,
    };
    await updateCachedAvatarMap(avatarMap);

    // Clean up old cached files
    await cleanupOldCache(avatarMap);

    return `file://${localUri}`;
  } catch (error) {
    console.error('Error caching avatar:', error);
    return photoURL; // Fallback to original URL if caching fails
  }
};

// Clean up old cached files
const cleanupOldCache = async currentAvatarMap => {
  try {
    const files = await RNFS.readDir(AVATAR_CACHE_DIR);
    const currentUris = Object.values(currentAvatarMap).map(
      info => info.localUri,
    );

    for (const file of files) {
      if (!currentUris.includes(file.path)) {
        await RNFS.unlink(file.path);
      }
    }
  } catch (error) {
    console.error('Error cleaning up avatar cache:', error);
  }
};
