const admin = require('firebase-admin');
const config = require('./dotenv.config');

// Initialize Admin SDK
const serviceAccount = require('../taskiah-53c29-firebase-adminsdk-43twl-80aa86f054.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'taskiah-53c29.firebasestorage.app',
});

const db = admin.firestore(); // Firestore via Admin SDK
const auth = admin.auth(); // Firebase Authentication via Admin SDK
const storage = admin.storage();

const bucket = storage.bucket('taskiah-53c29.firebasestorage.app');
bucket.setCorsConfiguration([
    {
        origin: [
            'http://localhost:5000', // Development
            'http://localhost:5173', // Development
            'https://taskiah-53c29.web.app', // Production
            'http://taskiah-53c29.web.app', // Production
        ],
        method: ['GET', 'POST'],
        maxAgeSeconds: 3600,
        responseHeader: ['Content-Type'],
    },
]);

module.exports = { admin, db, auth, storage, bucket };
