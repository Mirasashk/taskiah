import axios from 'axios';
import env from './env';

const apiInstance = () => {
  const api = axios.create({
    baseURL: env.apiUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  api.interceptors.request.use(
    config => {
      console.log('API Request:', config);
      return config;
    },
    error => {
      console.error('API Request Error:', error);
      return Promise.reject(error);
    },
  );

  // Response interceptor
  api.interceptors.response.use(
    response => {
      console.log('API Response:', response);
      return response;
    },
    error => {
      console.error('API Response Error:', error);
      return Promise.reject(error);
    },
  );

  return api;
};

export default apiInstance;
