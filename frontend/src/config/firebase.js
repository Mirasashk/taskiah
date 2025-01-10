import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
	// Your Firebase config object here
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

// Connect to emulators in development
if (import.meta.env.DEV) {
	// Connect to Auth emulator
	connectAuthEmulator(auth, 'http://127.0.0.1:9099', {
		disableWarnings: true,
	});

	// Connect to Storage emulator
	connectStorageEmulator(storage, '127.0.0.1', 9199);

	// Connect to Firestore emulator
	connectFirestoreEmulator(db, '127.0.0.1', 8082);
}

export { auth, storage, db };
