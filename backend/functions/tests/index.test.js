const request = require('supertest');
const express = require('express');
const cors = require('cors');
const { onRequest } = require('firebase-functions/v2/https');
const taskRoutes = require('../routes/taskRoutes');
const userRoutes = require('../routes/userRoutes');
const config = require('../config/dotenv.config');

jest.mock('firebase-functions/v2/https', () => ({
    onRequest: jest.fn(),
}));

jest.mock('../routes/taskRoutes', () =>
    jest.fn((req, res, next) => next())
);
jest.mock('../routes/userRoutes', () =>
    jest.fn((req, res, next) => next())
);

describe('Express App', () => {
    let app;

    beforeAll(() => {
        app = express();
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
        app.get('/api/health', (req, res) => {
            res.status(200).json({ status: 'ok' });
        });
        app.use('/api/tasks', taskRoutes);
        app.use('/api/users', userRoutes);

        app.get('/error', (req, res, next) => {
            throw new Error('Test error');
        });
        app.use((err, req, res, next) => {
            res.status(500).json({ error: 'Something went wrong!' });
        });
    });

    it('should return health status', async () => {
        const response = await request(app).get('/api/health');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: 'ok' });
    });

    it('should use taskRoutes', async () => {
        await request(app).get('/api/tasks');
        expect(taskRoutes).toHaveBeenCalled();
    });

    it('should use userRoutes', async () => {
        await request(app).get('/api/users');
        expect(userRoutes).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
        const response = await request(app).get('/error');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: 'Something went wrong!',
        });
    });
});
