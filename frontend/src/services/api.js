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
    getTasks: (userId) => axiosInstance.get(`/tasks/${userId}`),
    createTask: (task) => axiosInstance.post('/tasks/add', task),
    deleteTask: (id) => axiosInstance.delete(`/tasks/${id}`),
    updateTask: (taskId, taskData) =>
        axiosInstance.put(`/tasks/${taskId}`, taskData),
    deleteAllTasks: (userId) =>
        axiosInstance.delete(`/tasks/all/${userId}`),

    // Add other task-related API calls
};
