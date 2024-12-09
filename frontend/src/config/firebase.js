import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
    // Your Firebase config object here
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

if (
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1'
) {
    // Point to the Storage emulator running on localhost.
    // connectStorageEmulator(
    //     storage,
    //     import.meta.env.VITE_EMULATOR_HOST,
    //     import.meta.env.VITE_STORAGE_EMULATOR_PORT
    // );
    connectStorageEmulator(storage, import.meta.env.VITE_EMULATOR_HOST, import.meta.env.VITE_STORAGE_EMULATOR_PORT);
    connectAuthEmulator(
        auth,
        import.meta.env.VITE_AUTH_EMULATOR_PORT
    );
}

export { auth, storage };
