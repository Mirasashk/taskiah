import storage from '@react-native-firebase/storage';

export const getUserPhotoURL = async photoPath => {
  if (!photoPath) {
    console.log('File: UserPhoto.js, Line: 6, photoPath: ', photoPath);
    return null;
  }

  try {
    const reference = storage().ref(photoPath);
    const downloadUrl = await reference.getDownloadURL();
    console.log('File: UserPhoto.js, Line: 9, url: ', downloadUrl);
    return downloadUrl;
  } catch (error) {
    console.error('Error getting user photo URL:', error);
    return null;
  }
};
