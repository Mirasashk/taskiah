import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@auth_token';
const SESSION_START_KEY = '@session_start';

export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const setAuthToken = async token => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error setting auth token:', error);
  }
};

export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};

export const clearStorageOnLaunch = async () => {
  try {
    const sessionStart = await AsyncStorage.getItem(SESSION_START_KEY);
    if (sessionStart) {
      const sessionAge = Date.now() - parseInt(sessionStart, 10);
      if (sessionAge > 30 * 60 * 1000) {
        // 30 minutes
        await removeAuthToken();
        await AsyncStorage.removeItem(SESSION_START_KEY);
      }
    } else {
      await AsyncStorage.setItem(SESSION_START_KEY, Date.now().toString());
    }
  } catch (error) {
    console.error('Error handling session storage:', error);
  }
};

export const refreshSession = async () => {
  try {
    await AsyncStorage.setItem(SESSION_START_KEY, Date.now().toString());
  } catch (error) {
    console.error('Error refreshing session:', error);
  }
};

export const asyncStorage = {
  getItem: async key => await AsyncStorage.getItem(key),
  setItem: async (key, value) => await AsyncStorage.setItem(key, value),
  removeItem: async key => await AsyncStorage.removeItem(key),
};
