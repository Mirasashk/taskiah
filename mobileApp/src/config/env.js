import Config from 'react-native-config';

const env = {
  // Firebase config
  firebase: {
    apiKey: Config.FIREBASE_API_KEY,
    authDomain: Config.FIREBASE_AUTH_DOMAIN,
    projectId: Config.FIREBASE_PROJECT_ID,
    storageBucket: Config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
    appId: Config.FIREBASE_APP_ID,
  },

  // API URLs
  apiUrl: Config.API_URL,
  storageUrl: Config.STORAGE_URL,

  // Emulator config
  emulators: {
    authUrl: Config.AUTH_EMULATOR_URL,
    firestoreHost: Config.FIRESTORE_EMULATOR_HOST,
    storageHost: Config.STORAGE_EMULATOR_HOST,
  },

  // Environment
  isDevelopment: Config.ENV === 'development',
  isStaging: Config.ENV === 'staging',
  isProduction: Config.ENV === 'production',
};

export default env;
