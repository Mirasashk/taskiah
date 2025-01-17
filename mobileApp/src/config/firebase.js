import {initializeApp} from '@react-native-firebase/app';
import {getAuth, connectAuthEmulator} from '@react-native-firebase/auth';
import {getFirestore} from '@react-native-firebase/firestore';
import {getStorage} from '@react-native-firebase/storage';
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Connect to emulators in development
if (__DEV__) {
  if (Config.AUTH_EMULATOR_URL) {
    connectAuthEmulator(auth, Config.AUTH_EMULATOR_URL);
  }

  if (Config.STORAGE_EMULATOR_HOST) {
    const [host, port] = Config.STORAGE_EMULATOR_HOST.split(':');
    storage.useEmulator(host, parseInt(port));
  }

  // Connect to Firestore emulator
  db.useEmulator('10.0.2.2', 8082);
}

export {auth, db, storage};
