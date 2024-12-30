import apiInstance from '../config/apiConfig';
import {useAuth} from '../context/AuthContext';
const api = apiInstance();

export const userService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', {email, password});
    return response.data;
  },

  createProfile: async userData => {
    const response = await api.post('/users/add', userData);
    return response.data;
  },

  getProfile: async uid => {
    const response = await api.get(`/users/${uid}`);
    return response.data;
  },

  sendPublicKeyToServer: async (publicKey, userId, deviceId) => {
    const response = await api.post('/users/biometric/public-key', {
      publicKey,
      userId,
      deviceId,
    });
    return response.data;
  },

  verifySignatureWithServer: async (signature, payload, deviceId) => {
    const response = await api.post('/users/biometric/verify', {
      signature,
      payload,
      deviceId,
    });
    return response.data;
  },

  getBioChallenge: async () => {
    const response = await api.get(`/users/biometric/challenge/`);
    return response.data;
  },

  checkDeviceRegistered: async (deviceId, userId) => {
    const response = await api.get(
      `/users/biometric/check-device/${deviceId}/${userId}`,
    );
    return response.data;
  },
};

// Add named exports for individual functions
export const {login, createProfile, getProfile: getUserProfile} = userService;

export default userService;
