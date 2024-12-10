// API service for making HTTP requests
import axios from 'axios';
import Config from 'react-native-config';

// Create axios instance with default config
const api = axios.create({
  baseURL: Config.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    // Add any request modifications here (like adding auth tokens)
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  response => {
    // Any status code within the range of 2xx triggers this function
    return response;
  },
  error => {
    // Any status codes outside the range of 2xx trigger this function
    return Promise.reject(error);
  },
);

export default api;
