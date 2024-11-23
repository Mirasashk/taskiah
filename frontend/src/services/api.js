import axiosInstance from '../config/axios';

export const userService = {
    createUser: (userData) =>
        axiosInstance.post('/users/add', userData),
    getUser: (userId) => axiosInstance.get(`/users/${userId}`),
    updateUser: (userId, userData) =>
        axiosInstance.put(`/users/${userId}`, userData),
    // Add other user-related API calls
};

export const taskService = {
    getTasks: () => axiosInstance.get('/tasks'),
    createTask: (task) => axiosInstance.post('/tasks', task),
    // Add other task-related API calls
};
