import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask({ name: taskName, description: taskDescription });
      setTaskName('');
      setTaskDescription('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 4 }}>
      <TextField
        label="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={3}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    </Box>
  );
};

export default TaskForm;
