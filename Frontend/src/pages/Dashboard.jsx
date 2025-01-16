import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={4}
      sx={{
        mt: 8,
        px: 3,
        justifyContent: 'center',
      }}
    >
      {/* Header */}
      <Grid item xs={12}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Dashboard
        </Typography>
      </Grid>

      {/* Card: Task Manager */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            boxShadow: 4,
            borderRadius: 2,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: 6,
            },
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight="500" gutterBottom>
              Task Manager
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Manage all your tasks efficiently and stay organized.
            </Typography>
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                borderRadius: 1,
                textTransform: 'none',
              }}
              onClick={() => navigate('/task-manager')}
            >
              Open Task Manager
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
