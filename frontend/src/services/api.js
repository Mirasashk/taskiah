import axiosInstance from '../config/axios';

export const userService = {
    createUser: (userData) =>
        axiosInstance.post('/users/add', userData),
    getUser: (userId) => axiosInstance.get(`/users/${userId}`),
    // Add other user-related API calls
};

export const todoService = {
    getTodos: () => axiosInstance.get('/todos'),
    createTodo: (todo) => axiosInstance.post('/todos', todo),
    // Add other todo-related API calls
};
