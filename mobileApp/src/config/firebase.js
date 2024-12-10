import {initializeApp} from 'firebase/app';
import {getAuth, connectAuthEmulator} from 'firebase/auth';
import {getFirestore, connectFirestoreEmulator} from 'firebase/firestore';
import {getStorage, connectStorageEmulator} from 'firebase/storage';
import Config from 'react-native-config';

const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
  appId: Config.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Connect to emulators in development
if (__DEV__) {
  const AUTH_EMULATOR_URL = Config.AUTH_EMULATOR_URL;
  const FIRESTORE_EMULATOR_HOST = Config.FIRESTORE_EMULATOR_HOST;
  const STORAGE_EMULATOR_HOST = Config.STORAGE_EMULATOR_HOST;

  if (AUTH_EMULATOR_URL) {
    connectAuthEmulator(auth, AUTH_EMULATOR_URL);
  }

  if (FIRESTORE_EMULATOR_HOST) {
    const [host, port] = FIRESTORE_EMULATOR_HOST.split(':');
    connectFirestoreEmulator(db, host, parseInt(port));
  }

  if (STORAGE_EMULATOR_HOST) {
    const [host, port] = STORAGE_EMULATOR_HOST.split(':');
    connectStorageEmulator(storage, host, parseInt(port));
  }
}

export default app;
