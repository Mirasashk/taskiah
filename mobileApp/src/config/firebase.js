import firebase from '@react-native-firebase/app';
import Config from 'react-native-config';

// Initialize Firebase with config
const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
  appId: Config.FIREBASE_APP_ID,
};

const app = firebase.app(firebaseConfig);
const auth = firebase.auth(app);
const firestore = firebase.firestore(app);
const storage = firebase.storage(app);

// Connect to emulators in development
if (__DEV__) {
  if (Config.AUTH_EMULATOR_URL) {
    auth().useEmulator(Config.AUTH_EMULATOR_URL);
  }

  if (Config.FIRESTORE_EMULATOR_HOST) {
    const [host, port] = Config.FIRESTORE_EMULATOR_HOST.split(':');
    firestore().useEmulator(host, parseInt(port));
  }

  if (Config.STORAGE_EMULATOR_HOST) {
    const [host, port] = Config.STORAGE_EMULATOR_HOST.split(':');
    storage().useEmulator(host, parseInt(port));
  }
}

export {auth, firestore, storage};
