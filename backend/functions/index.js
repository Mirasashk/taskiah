/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');
const config = require('./config/dotenv.config');
const app = express();

// Routes
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Middleware
app.use(
    cors({
        origin: [
            'https://taskiah.web.app',
            'https://taskiah.firebaseapp.com',
            'http://localhost:5173',
            'http://localhost:5000',
            'https://taskiah-53c29.web.app',
            'https://taskiah-53c29.firebaseapp.com',
            'https://taskiah.com',
        ],
        optionsSuccessStatus: 200,
    })
);

app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
// Error handling middleware

// Add this route to simulate an error
app.get('/error', (req, res, next) => {
    // Throw an error intentionally
    throw new Error('Test error');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(config.port, () => {
    console.log(
        `Server is running on port ------------------------------------------------------- ${config.serverPort}`
    );
});

// Export the Express app as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);
