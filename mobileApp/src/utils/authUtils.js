import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Handles storage operations for user data
 * @param {Object} userProfile - The user profile to store
 * @returns {Promise<void>}
 */
export const storeUserData = async userProfile => {
  if (!userProfile) {
    await AsyncStorage.removeItem('user');
    return;
  }
  await AsyncStorage.setItem('user', JSON.stringify(userProfile));
};

/**
 * Processes Firebase user data with additional profile information
 * @param {Object} firebaseUser - Firebase user object
 * @param {Object} additionalData - Additional user profile data
 * @returns {Object} Combined user data
 */
export const processUserData = (firebaseUser, additionalData = {}) => ({
  ...firebaseUser,
  ...additionalData,
});
