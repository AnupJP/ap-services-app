import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, ThemeProvider, CssBaseline, Button, createTheme } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import CompletedTasks from './components/CompletedTasks';
import { getTasks, createTask, updateTask, deleteTask } from './api';

let staticTasks = [
  {
    "name": "Complete React Project",
    "description": "Finish building the task manager application using React and Material UI.",
    "completed": false
  },
  {
    "name": "Write API Documentation",
    "description": "Write clear documentation for the task manager API endpoints.",
    "completed": false
  },
  {
    "name": "Fix Bugs in Dashboard",
    "description": "Address and resolve bugs in the user dashboard that were reported.",
    "completed": false
  },
  {
    "name": "Implement User Authentication",
    "description": "Set up user login, registration, and session management for the app.",
    "completed": false
  },
  {
    "name": "Refactor CSS Styles",
    "description": "Refactor and optimize the CSS styles used in the project for better performance.",
    "completed": false
  },
  {
    "name": "Update Database Schema",
    "description": "Update the MongoDB schema to include new fields for storing additional task details.",
    "completed": false
  },
  {
    "name": "Set Up MongoDB Atlas",
    "description": "Create a MongoDB Atlas cluster and connect it to the backend API.",
    "completed": true
  },
  {
    "name": "Create User Profiles Page",
    "description": "Develop the user profile page that allows users to view and update their details.",
    "completed": false
  },
  {
    "name": "Deploy Application to Heroku",
    "description": "Deploy the task manager application to Heroku for production use.",
    "completed": false
  },
  {
    "name": "Write Unit Tests for API",
    "description": "Write unit tests for the task manager API to ensure all endpoints are working as expected.",
    "completed": true
  }
]



const App = () => {
  const [tasks, setTasks] = useState([]);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  // Load tasks from API
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    };

    // staticTasks.map(task => {
    //   addTask(task)
    // })

    loadTasks();
  }, []);

  // Add a task
  const addTask = async (task) => {
    try {
      const newTask = await createTask(task);
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  // Update a task
  const updateTaskHandler = async (_id, updatedTask) => {
    try {
      const updated = await updateTask(_id, updatedTask);
      setTasks(tasks.map(task => (task._id === _id ? updated : task)));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  // Mark task as completed
  const markAsCompleted = async (_id) => {
    const taskToUpdate = tasks.find(task => task._id === _id);
    const updatedTask = { ...taskToUpdate, completed: true };
    await updateTaskHandler(_id, updatedTask);
  };

  // Delete a task
  const deleteTaskHandler = async (_id) => {
    try {
      await deleteTask(_id);
      setTasks(tasks.filter(task => task. d !== _id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button onClick={toggleDarkMode}>Toggle Dark Mode</Button>


    <Container>
      <Typography variant="h3" gutterBottom>
        Task Manager
      </Typography>
      <TaskForm onAddTask={addTask} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5">Pending Tasks</Typography>
          <TaskList
            tasks={tasks.filter(task => !task.completed)}
            onMarkAsCompleted={markAsCompleted}
            onUpdateTask={updateTaskHandler}
            onDeleteTask={deleteTaskHandler}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5">Completed Tasks</Typography>
          <CompletedTasks tasks={tasks.filter(task => task.completed)} />
        </Grid>
      </Grid>
      <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#121212', color: 'white' }}>
  <Typography variant="body2">© 2025 Your Company</Typography>
</footer>
    </Container>

    </ThemeProvider>
  );
};

export default App;