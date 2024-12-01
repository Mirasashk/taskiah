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
    deleteTask: (taskId) => axiosInstance.delete(`/tasks/${taskId}`),
    updateTask: (taskId, newTaskData) =>
        axiosInstance.put(`/tasks/${taskId}`, newTaskData),
    deleteAllTasks: (userId) =>
        axiosInstance.delete(`/tasks/all/${userId}`),

    // Add other task-related API calls
};

export const notificationService = {
    addNotification: (notification, taskId, task) =>
        axiosInstance.post(`/notifications/add/${taskId}`, {
            notification,
            task,
        }),
    getNotifications: (taskId) =>
        axiosInstance.get(`/notifications/${taskId}`),
    deleteNotification: (taskId) =>
        axiosInstance.delete(`/notifications/${taskId}`),
};
