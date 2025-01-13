import { Card, CardContent, Typography, Button, CardActionArea } from '@mui/material';

const TaskCard = ({ task, onDeleteTask }) => {
  return (
    <Card elevation={3} sx={{ marginBottom: 2, borderRadius: 3 }}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h6">{task.name}</Typography>
          <Typography variant="body2" color="text.secondary">{task.description}</Typography>
        </CardContent>
        <Button color="error" onClick={() => onDeleteTask(task.id)}>
          Delete
        </Button>
      </CardActionArea>
    </Card>
  );
};
