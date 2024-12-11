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

// // Add auth token interceptor
// api.interceptors.request.use(async config => {
//   // Get token from secure storage and add to headers
//   const token = await getAuthToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Add request interceptor to handle errors
api.interceptors.request.use(
  config => {
    console.log('API Request:', config.url); // Add logging
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  },
);

// Add response interceptor
api.interceptors.response.use(
  response => {
    console.log('API Response:', response.data); // Add logging
    return response;
  },
  error => {
    console.error('API Response Error:', error);
    return Promise.reject(error);
  },
);

export const loginUser = async (email, password) => {
  console.log(api.baseURL);
  try {
    const response = await api.post('/auth/login', {email, password});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUserProfile = async userData => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async uid => {
  try {
    const response = await api.get(`/users/${uid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
