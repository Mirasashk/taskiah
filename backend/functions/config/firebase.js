const admin = require('firebase-admin');
const firebase = require('firebase-admin/app');
require('dotenv').config();

// Initialize Admin SDK
const serviceAccount = require('../taskiah-53c29-firebase-adminsdk-43twl-80aa86f054.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

// // Initialize Firebase App (Client-Side Features)
// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
// };

// firebase.initializeApp(firebaseConfig);

const db = admin.firestore(); // Firestore via Admin SDK
const auth = admin.auth(); // Firebase Authentication via Admin SDK
const storage = admin.storage();

const bucket = storage.bucket();
bucket.setCorsConfiguration([
    {
        origin: [
            'http://localhost:5000', // Development
            'http://localhost:5173', // Development
            'https://your-production-domain.com', // Production
        ],
        method: ['GET', 'POST'],
        maxAgeSeconds: 3600,
        responseHeader: ['Content-Type'],
    },
]);

module.exports = { firebase, admin, db, auth, storage, bucket };
