import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, ThemeProvider, CssBaseline, Button, createTheme } from '@mui/material';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import CompletedTasks from '../components/CompletedTasks';
import { getTasks, createTask, updateTask, deleteTask } from '../utils/api';

const TaskManager = () => {
  // return <div>Your Task Manager Component</div>;

  const [tasks, setTasks] = useState([]);

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
      setTasks(tasks.filter(task => task.d !== _id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };



  return (
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
  );
};

export default TaskManager;
