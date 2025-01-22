import Config from 'react-native-config';

const env = {
  // API URLs
  apiUrl: Config.API_URL,

  // Environment
  isDevelopment: Config.ENV === 'development',
  isStaging: Config.ENV === 'staging',
  isProduction: Config.ENV === 'production',
};

export default env;
