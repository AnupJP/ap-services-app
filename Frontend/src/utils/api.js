import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Your backend URL

// Axios instance with default configurations
const taskApi = axios.create({
  baseURL: `${API_URL}/tasks`,
  headers: {
    'Content-Type': 'application/json',
  },
});

taskApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Retrieve token from local storage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Set the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const authApi = axios.create({
  baseURL: `${API_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all tasks
export const getTasks = async () => {
  try {
    const response = await taskApi.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Create a new task
export const createTask = async (task) => {
  try {
    const response = await taskApi.post('/', task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Update an existing task
export const updateTask = async (id, updatedTask) => {
  try {
    const response = await taskApi.put(`/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    await taskApi.delete(`/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const signup = async (userData) => {
  const response = await authApi.post('/signup', userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await authApi.post('/login', userData);
  return response.data;
};

