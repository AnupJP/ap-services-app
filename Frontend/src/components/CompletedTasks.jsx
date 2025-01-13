import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const CompletedTasks = ({ tasks }) => (
  <List>
    {tasks.map((task) => (
      <ListItem key={task.id}>
        <ListItemText
          primary={task.name}
          secondary={task.description}
          sx={{ textDecoration: 'line-through', color: 'gray' }}
        />
      </ListItem>
    ))}
  </List>
);

export default CompletedTasks;
