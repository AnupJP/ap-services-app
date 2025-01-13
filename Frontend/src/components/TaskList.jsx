import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, TextField, Button, Box, Grow } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskCard from './TaskCard'

const TaskList = ({ tasks, onMarkAsCompleted, onUpdateTask, onDeleteTask }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState({});

  const handleEdit = (task) => {
    setEditingId(task._id);
    setEditedTask({ name: task.name, description: task.description });
  };

  const handleSave = (_id) => {
    onUpdateTask(_id, editedTask);
    setEditingId(null);
  };

  return (
    <List>
      {tasks.map((task) => (
          <Grow in={true} timeout={500} key={task.id}>
        <ListItem key={task._id} sx={{ display: 'flex', alignItems: 'center' }}>
          {editingId === task._id ? (
            <Box sx={{ width: '100%' }}>
              <TextField
                label="Task Name"
                value={editedTask.name}
                onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Task Description"
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                fullWidth
                margin="normal"
                multiline
                rows={2}
              />
              <Button variant="contained" color="primary" onClick={() => handleSave(task._id)}>
                Save
              </Button>
            </Box>
          ) : (
            <>
              <ListItemText primary={task.name} secondary={task.description} />
              <IconButton edge="end" onClick={() => handleEdit(task)}>
                <EditIcon color="primary" />
              </IconButton>
              <IconButton edge="end" onClick={() => onMarkAsCompleted(task._id)}>
                <CheckCircleIcon color="success" />
              </IconButton>
              <IconButton edge="end" onClick={() => onDeleteTask(task._id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </>
          )}
        </ListItem>
          </Grow>
      ))}
    </List>
  );
};

export default TaskList;
