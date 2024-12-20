/**
 * Utility functions for device storage operations
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Stores data in device storage
 * @param {string} key - Storage key
 * @param {any} value - Data to store
 * @returns {Promise<void>}
 */
export const storeOnDevice = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error storing data:', error);
    throw error;
  }
};

/**
 * Retrieves data from device storage
 * @param {string} key - Storage key
 * @returns {Promise<any>} Parsed data
 */
export const getFromDevice = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error;
  }
};
