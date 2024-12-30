const dotenv = require('dotenv');
const path = require('path');

// Load environment variables based on NODE_ENV
const envFile =
	process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.prod';
const envPath = path.resolve(__dirname, '..', envFile);

dotenv.config({ path: envPath });

const dotenvConfig = {
	serverPort: process.env.SERVER_PORT || 8080,
	firebase: {
		apiKey: process.env.APP_API_KEY,
		authDomain: process.env.APP_AUTH_DOMAIN,
		projectId: process.env.APP_PROJECT_ID,
		storageBucket: process.env.APP_STORAGE_BUCKET,
	},
	biometricChallenge: process.env.BIOMETRIC_CHALLENGE,
};

module.exports = dotenvConfig;
