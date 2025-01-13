import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks'; // Your backend URL

// Axios instance with default configurations
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all tasks
export const getTasks = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Create a new task
export const createTask = async (task) => {
  try {
    const response = await api.post('/', task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Update an existing task
export const updateTask = async (id, updatedTask) => {
  try {
    const response = await api.put(`/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
