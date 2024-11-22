const dotenv = require('dotenv');
dotenv.config();

const dotenvConfig = {
    serverPort: process.env.SERVER_PORT || 8080,
    firebase: {
        apiKey: process.env.APP_API_KEY,
        authDomain: process.env.APP_AUTH_DOMAIN,
        projectId: process.env.APP_PROJECT_ID,
        storageBucket: process.env.APP_STORAGE_BUCKET,
    },
};

module.exports = dotenvConfig;
